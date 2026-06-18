#!/usr/bin/env node
/**
 * design-lint — fast, static design-token drift detector (no deps, no browser).
 *
 * Flags hardcoded colors (hex / rgb() / rgba() / hsl()) used OUTSIDE the token
 * definition file, i.e. drift away from the `:root` design-token system.
 * The token file itself (globals.css) is where colors are allowed to be literal.
 *
 * Usage:   node scripts/design-lint.mjs [projectDir]
 * Exit:    0 = clean, 1 = drift found (so it can gate CI).
 * Suppress a line with a trailing `/* design-lint-ok *\/` (or // design-lint-ok).
 *
 * It's intentionally conservative (colors only) to avoid false positives on px.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, basename } from "node:path";

const ROOT = process.argv[2] || ".";
const EXT = new Set([".css", ".tsx", ".jsx", ".ts", ".js"]);
const SKIP_DIR = new Set(["node_modules", ".next", ".git", "dist", "build", "out", "coverage"]);
// Files where literal colors are allowed (the token source of truth):
const TOKEN_FILES = [/globals\.css$/, /tokens\.css$/];
const ALLOW = /\b(transparent|currentColor|inherit|none|unset)\b/i;
const COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\s*\(/g;

let files = 0, hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (EXT.has(extname(name))) scan(p);
  }
}

function scan(file) {
  if (TOKEN_FILES.some((re) => re.test(file))) return; // token file: literals allowed
  files++;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/design-lint-ok/.test(line)) return;
    const stripped = line.replace(ALLOW, "");
    const m = stripped.match(COLOR);
    if (m) hits.push({ file, line: i + 1, text: line.trim().slice(0, 100), tokens: m });
  });
}

try { walk(ROOT); } catch (e) { console.error("design-lint: cannot scan", ROOT, e.message); process.exit(2); }

if (hits.length === 0) {
  console.log(`✅ design-lint: no color drift across ${files} files — all colors come from tokens.`);
  process.exit(0);
}
console.log(`⚠️  design-lint: ${hits.length} hardcoded color(s) found (should use :root tokens):\n`);
for (const h of hits) console.log(`  ${h.file}:${h.line}  ${h.text}`);
console.log(`\nFix: move these into the :root token system and reference var(--…). Suppress a deliberate one with /* design-lint-ok */.`);
process.exit(1);
