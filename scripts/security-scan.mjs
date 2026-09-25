import { readdir, readFile } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const root = process.cwd();
const patterns = [
  { label: "dangerouslySetInnerHTML", regex: /dangerouslySetInnerHTML/g },
  { label: "secret-looking public environment variable", regex: /NEXT_PUBLIC_[A-Z0-9_]*(SECRET|SERVICE_ROLE|PASSWORD|PRIVATE)[A-Z0-9_]*/g },
  { label: "hard-coded legacy JWT key", regex: /eyJ[A-Za-z0-9_-]{20,}/g },
  { label: "hard-coded Supabase secret key", regex: /sb_secret_[A-Za-z0-9_-]+/g },
];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git", ".vercel"].includes(entry.name)) continue;
    const file = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(file));
    else if ([".ts", ".tsx", ".js", ".mjs", ".json", ".env"].includes(extname(entry.name))) out.push(file);
  }
  return out;
}

const files = await walk(root);
let findings = 0;
for (const file of files) {
  if (["security-scan.mjs", "package-lock.json"].includes(basename(file))) continue;
  const source = await readFile(file, "utf8");
  for (const pattern of patterns) {
    if (pattern.regex.test(source)) {
      findings++;
      console.warn(`[review] ${pattern.label}: ${file}`);
      pattern.regex.lastIndex = 0;
    }
  }
}
if (findings) console.warn(`Security scan found ${findings} review item(s).`);
else console.log("Security source scan passed.");
