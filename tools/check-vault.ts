#!/usr/bin/env node
// Checks the notebook's structure: frontmatter, relative links and heading anchors,
// reachability from README.md, cited C- and Q-numbers, glossary homes, and the
// absence of conversational provenance. Run: npm run check [vault_dir]
// It does not check external URLs or the truth of any claim.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { toString as mdToString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";
import { parse as parseYaml } from "yaml";
import type { Root, Link, Heading, Definition } from "mdast";

const STATUSES = new Set([
  "user-intent", "position", "proposal", "survey", "experiment", "open", "editorial",
]);

// Tokens that would mean conversation history has crept back into the vault.
const FORBIDDEN: Array<[RegExp, string]> = [
  [/\bS(0[1-9]|1[0-9])(\.\d\d)?\b/, "archived source id"],
  [/\bsource_ids\b/, "source_ids field"],
  [/\bFable\b/, "assistant name"],
  [/\bAstra\b/, "assistant name"],
  [/\bthe thread\b(?! model)/i, "conversation reference"],
  [/\bfollow-up session\b/i, "conversation reference"],
  [/\bboth assistants\b/i, "conversation reference"],
  [/\bthe conversation\b/i, "conversation reference"],
  [/\bclaims ledger\b/i, "removed note"],
  [/\bsources\//, "removed folder"],
];

type Note = {
  path: string;      // vault-relative, posix
  abs: string;
  text: string;
  tree: Root;
  frontmatter: Record<string, unknown> | null;
  headings: Set<string>;
};

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(process.argv[2] ?? join(here, ".."));
const errors: string[] = [];
const err = (m: string) => { errors.push(m); };

function* walk(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (name.endsWith(".md")) yield p;
  }
}

const processor = unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]).use(remarkGfm);

function load(abs: string): Note {
  const text = readFileSync(abs, "utf8");
  const tree = processor.parse(text) as Root;
  let frontmatter: Record<string, unknown> | null = null;
  const slugger = new GithubSlugger();
  const headings = new Set<string>();
  visit(tree, (node) => {
    if (node.type === "yaml") {
      try { frontmatter = parseYaml((node as { value: string }).value) ?? {}; }
      catch (e) { err(`${rel(abs)}: frontmatter is not YAML (${(e as Error).message})`); frontmatter = {}; }
    }
    if (node.type === "heading") headings.add(slugger.slug(mdToString(node as Heading)));
  });
  return { path: rel(abs), abs, text, tree, frontmatter, headings };
}

function rel(abs: string): string { return relative(root, abs).split(sep).join("/"); }

const notes = new Map<string, Note>();
for (const abs of walk(root)) { const n = load(abs); notes.set(n.path, n); }

// 1. Frontmatter (README and AGENTS excepted for AGENTS; README has frontmatter).
for (const n of notes.values()) {
  if (n.path === "AGENTS.md") continue;
  if (!n.frontmatter) { err(`${n.path}: missing frontmatter`); continue; }
  const fm = n.frontmatter;
  if (typeof fm.title !== "string" || !fm.title) err(`${n.path}: frontmatter needs a title`);
  if (typeof fm.status !== "string" || !STATUSES.has(fm.status)) err(`${n.path}: status must be one of ${[...STATUSES].join(" | ")}`);
  if (!(fm.updated instanceof Date) && !/^\d{4}-\d\d-\d\d$/.test(String(fm.updated ?? ""))) err(`${n.path}: updated must be a YYYY-MM-DD date`);
  for (const k of Object.keys(fm)) if (!["title", "status", "updated"].includes(k)) err(`${n.path}: unexpected frontmatter key ${k}`);
}

// 2. Links: relative targets exist, anchors resolve, nothing escapes the vault.
let linksChecked = 0;
const inbound = new Map<string, number>();
for (const n of notes.values()) {
  const defs = new Map<string, string>();
  visit(n.tree, "definition", (d: Definition) => { defs.set(d.identifier, d.url); });
  const urls: string[] = [];
  visit(n.tree, "link", (l: Link) => { urls.push(l.url); });
  visit(n.tree, "linkReference", (l: { identifier: string }) => { const u = defs.get(l.identifier); if (u) urls.push(u); });
  for (const raw of urls) {
    const url = raw.trim();
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)) continue; // external
    const [pathPart, anchor] = url.split("#", 2);
    linksChecked++;
    let target: Note | undefined;
    if (pathPart === "") target = n;
    else {
      const abs = resolve(dirname(n.abs), decodeURIComponent(pathPart));
      if (!abs.startsWith(root + sep) && abs !== root) { err(`${n.path}: link escapes the vault: ${url}`); continue; }
      if (!existsSync(abs)) { err(`${n.path}: broken link: ${url}`); continue; }
      const r = rel(abs);
      inbound.set(r, (inbound.get(r) ?? 0) + 1);
      target = notes.get(r);
    }
    if (anchor !== undefined && target && !target.headings.has(anchor)) err(`${n.path}: missing heading anchor: ${url}`);
  }
}

// 3. Reachability from README.md over .md links.
{
  const seen = new Set<string>();
  const queue = ["README.md"];
  while (queue.length) {
    const p = queue.shift()!;
    if (seen.has(p)) continue;
    seen.add(p);
    const n = notes.get(p); if (!n) continue;
    visit(n.tree, "link", (l: Link) => {
      if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(l.url)) return;
      const abs = resolve(dirname(n.abs), decodeURIComponent(l.url.split("#")[0] || n.path));
      if (existsSync(abs) && abs.endsWith(".md")) queue.push(rel(abs));
    });
  }
  for (const p of notes.keys()) if (!seen.has(p)) err(`${p}: not reachable from README.md`);
}

// 4. Cited C- and Q-numbers exist in the record.
{
  const positions = notes.get("record/positions.md")?.text ?? "";
  const questions = notes.get("record/open-questions.md")?.text ?? "";
  const definedC = new Set([...positions.matchAll(/^\| (C[-\w]+) \|/gm)].map((m) => m[1]));
  const definedQ = new Set([...questions.matchAll(/\*\*(Q\d\d)\*\*/g)].map((m) => m[1]));
  for (const n of notes.values()) {
    for (const m of n.text.matchAll(/\b(C(?:\d\d|-v[12]|-store))\b/g)) if (!definedC.has(m[1])) err(`${n.path}: cites ${m[1]}, not defined in record/positions.md`);
    for (const m of n.text.matchAll(/\b(Q\d\d)\b/g)) if (!definedQ.has(m[1])) err(`${n.path}: cites ${m[1]}, not defined in record/open-questions.md`);
  }
}

// 5. Glossary: every row has a home link (checked by the link pass) and terms are sorted.
{
  const g = notes.get("glossary.md");
  if (g) {
    const terms = [...g.text.matchAll(/^\| \*\*(.+?)\*\* \|/gm)].map((m) => m[1]);
    const key = (t: string) => t.replace(/^the /i, "").toLowerCase();
    for (let i = 1; i < terms.length; i++) if (key(terms[i - 1]) > key(terms[i])) err(`glossary.md: terms out of order near "${terms[i]}"`);
  }
}

// 6. No conversational provenance anywhere in the vault.
for (const n of notes.values()) {
  const body = n.text.replace(/```[\s\S]*?```/g, "");
  for (const [re, why] of FORBIDDEN) {
    const m = re.exec(body);
    if (m) err(`${n.path}: ${why}: "${m[0]}"`);
  }
}

const result = { ok: errors.length === 0, notes: notes.size, linksChecked, errors };
console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
