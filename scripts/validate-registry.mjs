#!/usr/bin/env node
// Cross-checks src/registry/ids.ts against src/registry/registry.json:
//   - every ID/pattern in ids.ts has a registry.json entry, and vice versa
//   - no duplicate ID strings within ids.ts
//   - every ID/pattern in ids.ts is actually referenced by some component
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const idsPath = path.join(ROOT, "src/registry/ids.ts");
const registryPath = path.join(ROOT, "src/registry/registry.json");

const idsSource = readFileSync(idsPath, "utf8");
const registry = JSON.parse(readFileSync(registryPath, "utf8"));

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (full === idsPath || full === registryPath) continue;
    const stats = statSync(full);
    if (stats.isDirectory()) walk(full, files);
    else if (/\.(tsx?|jsx?)$/.test(entry)) files.push(full);
  }
  return files;
}

// Parse ids.ts: track namespace nesting by brace depth, capture leaf entries.
const lines = idsSource.split("\n");
const stack = [];
const entries = []; // { accessPath, key, kind: 'static' | 'pattern', value }

for (const rawLine of lines) {
  const line = rawLine.trim();

  const nsOpen = line.match(/^([A-Za-z0-9_]+):\s*\{$/);
  if (nsOpen) {
    stack.push(nsOpen[1]);
    continue;
  }
  if (line === "},") {
    stack.pop();
    continue;
  }

  const staticMatch = line.match(/^([A-Za-z0-9_]+):\s*"(xc-[a-zA-Z0-9.\-]*)"/);
  if (staticMatch && stack.length > 0) {
    const [, key, value] = staticMatch;
    entries.push({
      accessPath: `IDS.${stack.join(".")}.${key}`,
      kind: "static",
      value,
    });
    continue;
  }

  const patternMatch = line.match(
    /^([A-Za-z0-9_]+):\s*\(n: number\) => `(xc-[a-zA-Z0-9.\-]*)\$\{/,
  );
  if (patternMatch && stack.length > 0) {
    const [, key, prefix] = patternMatch;
    entries.push({
      accessPath: `IDS.${stack.join(".")}.${key}`,
      kind: "pattern",
      value: `${prefix}*`,
    });
  }
}

const errors = [];

// Duplicate ID string check.
const valueCounts = new Map();
for (const e of entries) {
  valueCounts.set(e.value, (valueCounts.get(e.value) ?? 0) + 1);
}
for (const [value, count] of valueCounts) {
  if (count > 1) errors.push(`Duplicate ID "${value}" defined ${count} times in ids.ts`);
}

// ids.ts -> registry.json coverage.
const registryKeys = new Set(Object.keys(registry));
for (const e of entries) {
  if (!registryKeys.has(e.value)) {
    errors.push(`"${e.value}" (${e.accessPath}) has no entry in registry.json`);
  }
}

// registry.json -> ids.ts coverage (orphaned entries).
const idsValues = new Set(entries.map((e) => e.value));
for (const key of registryKeys) {
  if (!idsValues.has(key)) {
    errors.push(`registry.json has "${key}" with no matching definition in ids.ts`);
  }
}

// registry.json file references must exist.
for (const [key, meta] of Object.entries(registry)) {
  if (meta.file && !existsSync(path.join(ROOT, meta.file))) {
    errors.push(`registry.json "${key}" references missing file: ${meta.file}`);
  }
  if (!Array.isArray(meta.changelog) || meta.changelog.length === 0) {
    errors.push(`registry.json "${key}" has an empty or missing changelog`);
  }
}

// Usage check: every accessPath should appear in some component file.
const componentFiles = walk(path.join(ROOT, "src"));
const componentSource = componentFiles.map((f) => readFileSync(f, "utf8")).join("\n");
for (const e of entries) {
  if (!componentSource.includes(e.accessPath)) {
    errors.push(`${e.accessPath} is defined in ids.ts but never used in any component`);
  }
}

if (errors.length > 0) {
  console.error(`✗ Registry validation failed with ${errors.length} issue(s):\n`);
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}

console.log(`✓ Registry valid: ${entries.length} ID(s)/pattern(s) in sync across ids.ts, registry.json, and components.`);
