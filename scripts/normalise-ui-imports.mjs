import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const root = process.cwd();
const replacements = new Map([
  ["@/components/ui/button", "@/components/ui/button"],
  ["@/components/ui/card", "@/components/ui/card"],
  ["@/components/ui/input", "@/components/ui/input"],
  ["@/components/ui/label", "@/components/ui/label"],
  ["@/components/ui/textarea", "@/components/ui/textarea"],
]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (["node_modules", ".next", ".git", ".vercel"].includes(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if ([".ts", ".tsx", ".mjs", ".js"].includes(extname(entry.name))) files.push(full);
  }
  return files;
}

const files = await walk(root);
let changed = 0;
for (const file of files) {
  let source = await readFile(file, "utf8");
  const before = source;
  for (const [from, to] of replacements) source = source.replaceAll(from, to);
  if (source !== before) { await writeFile(file, source); changed++; }
}
console.log(`Normalised UI import casing in ${changed} files.`);
