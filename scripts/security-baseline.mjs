import fs from "node:fs";
import path from "node:path";

const read = (filePath) => fs.readFileSync(path.resolve(filePath), "utf8");

const scan = (pattern, content) => (content.match(pattern) || []).length;

const srcFiles = walk("src").filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

const srcJoined = srcFiles.map((file) => read(file)).join("\n");
const indexHtml = read("index.html");
const headersFile = read("public/_headers");

const styleInlineCount = scan(/style=\{\{/g, srcJoined);
const dangerousHtmlCount = scan(/dangerouslySetInnerHTML/g, srcJoined);
const evalLikeCount = scan(/\beval\s*\(|\bnew Function\s*\(|document\.write\s*\(/g, srcJoined);

const failures = [];

if (styleInlineCount > 124) {
  failures.push(`Inline style usage increased: ${styleInlineCount} > 124`);
}

if (dangerousHtmlCount > 1) {
  failures.push(`dangerouslySetInnerHTML usage increased: ${dangerousHtmlCount} > 1`);
}

if (evalLikeCount > 0) {
  failures.push("Detected eval/new Function/document.write usage.");
}

if (indexHtml.includes("script-src 'self' 'unsafe-inline'")) {
  failures.push("CSP in index.html allows unsafe-inline scripts.");
}

if (headersFile.includes("script-src 'self' 'unsafe-inline'")) {
  failures.push("CSP in public/_headers allows unsafe-inline scripts.");
}

if (headersFile.includes("img-src 'self' data: https://cdn.simpleicons.org https:")) {
  failures.push("CSP in public/_headers has wildcard https in img-src.");
}

const requiredTokens = [
  "frame-ancestors 'none'",
  "X-Frame-Options: DENY",
  "Strict-Transport-Security:",
  "Content-Security-Policy:",
];

for (const token of requiredTokens) {
  if (!headersFile.includes(token)) {
    failures.push(`Missing required security token in public/_headers: ${token}`);
  }
}

if (failures.length > 0) {
  console.error("Security baseline check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Security baseline check passed.");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }
    files.push(fullPath);
  }

  return files;
}
