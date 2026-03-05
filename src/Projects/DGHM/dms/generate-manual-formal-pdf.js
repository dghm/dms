const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { execFileSync } = require("child_process");
const { marked } = require("marked");

const docsDir = path.join(
  __dirname,
  "docs",
  "產品操作手冊",
  "TailorMed Tracking System"
);
const args = process.argv.slice(2);
const inputFileName = args[0] || "Manual.md";
const outputBaseName = args[1] || "Manual-Formal";
const coverSubtitle = args[2] || "使用者操作手冊（正式文件版）";
const footerText = args[3] || "TailorMed Tracking System Manual";
const coverTitle = args[4] || "TailorMed Tracking System";

const inputMd = path.join(docsDir, inputFileName);
const outputHtml = path.join(docsDir, `${outputBaseName}.html`);
const outputPdf = path.join(docsDir, `${outputBaseName}.pdf`);
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const inputDir = path.dirname(inputMd);

let markdown = fs.readFileSync(inputMd, "utf8");
const coverMetaRows = [];

// If markdown starts with title + metadata lines, move them into cover box.
{
  const lines = markdown.split(/\r?\n/);
  const hasTopTitle = lines[0]?.startsWith("# ");
  const metadataLineRegex = /^\*\*([^*]+)\*\*\s*(.+)\s*$/;
  const metadataRows = [];
  let i = 1;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (line.trim() === "---") {
      break;
    }
    const m = line.match(metadataLineRegex);
    if (m) {
      const label = m[1].trim().replace(/[:：]\s*$/, "");
      const value = m[2].trim();
      metadataRows.push({ label, value });
      i += 1;
      continue;
    }
    break;
  }

  if (hasTopTitle && metadataRows.length >= 2) {
    coverMetaRows.push(...metadataRows);
    // Remove top heading + metadata block + immediate separator from body
    let cut = i;
    while (cut < lines.length && !lines[cut].trim()) cut += 1;
    if (lines[cut]?.trim() === "---") cut += 1;
    while (cut < lines.length && !lines[cut].trim()) cut += 1;
    markdown = lines.slice(cut).join("\n");
  }
}

const renderer = new marked.Renderer();
renderer.image = (tokenOrHref, maybeTitle, maybeText) => {
  const href =
    typeof tokenOrHref === "string" ? tokenOrHref : tokenOrHref?.href;
  const title =
    typeof tokenOrHref === "string" ? maybeTitle : tokenOrHref?.title;
  const text =
    typeof tokenOrHref === "string" ? maybeText : tokenOrHref?.text;

  if (!href) return "";
  const isAbsolute =
    /^([a-z]+:)?\/\//i.test(href) || href.startsWith("data:");
  const resolvedHref = isAbsolute
    ? href
    : pathToFileURL(path.resolve(inputDir, href)).href;
  const titleAttr = title ? ` title="${title}"` : "";
  const alt = text || "";
  return `<img src="${resolvedHref}" alt="${alt}"${titleAttr}>`;
};
const bodyHtml = marked.parse(markdown, { renderer });
const now = new Date();
const dateText = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
  2,
  "0"
)}-${String(now.getDate()).padStart(2, "0")}`;

const html = `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${coverTitle} 文件</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
    }
    :root {
      --text: #1f2937;
      --title: #0f172a;
      --muted: #6b7280;
      --line: #d1d5db;
      --brand: #1d4ed8;
      --bg-soft: #f8fafc;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC",
        "Noto Sans TC", "Microsoft JhengHei", Arial, sans-serif;
      color: var(--text);
      font-size: 11pt;
      line-height: 1.75;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cover {
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 24px;
      margin-bottom: 28px;
      background: linear-gradient(180deg, #ffffff 0%, var(--bg-soft) 100%);
    }
    .cover h1 {
      margin: 0 0 10px;
      font-size: 23pt;
      color: var(--title);
      line-height: 1.25;
    }
    .cover .subtitle {
      font-size: 12pt;
      color: #334155;
      margin: 0 0 20px;
    }
    .cover .meta {
      display: grid;
      gap: 6px;
      color: var(--muted);
      font-size: 10pt;
      border-top: 1px solid var(--line);
      padding-top: 12px;
    }
    .content h1, .content h2, .content h3 {
      color: var(--title);
      margin-top: 1.3em;
      margin-bottom: 0.5em;
      line-height: 1.4;
      page-break-after: avoid;
      break-after: avoid-page;
    }
    .content h1 { font-size: 18pt; border-bottom: 2px solid var(--line); padding-bottom: 0.25em; }
    .content h2 { font-size: 14pt; border-left: 4px solid var(--brand); padding-left: 10px; }
    .content h3 { font-size: 12pt; }
    .content p { margin: 0.35em 0 0.75em; }
    .content ul, .content ol { margin: 0.4em 0 0.9em 1.3em; }
    .content li { margin: 0.2em 0; }
    .content hr {
      border: 0;
      border-top: 1px dashed var(--line);
      margin: 18px 0;
    }
    .content blockquote {
      margin: 0.8em 0;
      padding: 10px 12px;
      background: var(--bg-soft);
      border-left: 4px solid var(--brand);
    }
    .content img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 10px auto 14px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .content code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 10pt;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 1px 4px;
    }
    .content table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 16px;
      font-size: 10.5pt;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .content th,
    .content td {
      border: 1px solid #9ca3af;
      padding: 8px 10px;
      vertical-align: top;
      text-align: left;
    }
    .content thead th,
    .content tr:first-child th {
      background: #e5e7eb;
      font-weight: 700;
      color: #111827;
    }
    .content tbody tr:nth-child(even) td {
      background: #f9fafb;
    }
    .no-page-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .compact-image-row {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      page-break-inside: avoid;
      break-inside: avoid;
      margin: 8px 0 10px;
    }
    .compact-image-row img {
      width: calc(50% - 5px);
      max-height: 150px;
      object-fit: contain;
      margin: 0;
    }
    .footer {
      margin-top: 26px;
      padding-top: 10px;
      border-top: 1px solid var(--line);
      color: var(--muted);
      font-size: 9pt;
      text-align: right;
    }
  </style>
</head>
<body>
  <section class="cover">
    <h1>${coverTitle}</h1>
    <p class="subtitle">${coverSubtitle}</p>
    <div class="meta">
      ${coverMetaRows.map((m) => `<div>${m.label}：${m.value}</div>`).join("\n      ")}
    </div>
  </section>
  <main class="content">
    ${bodyHtml}
  </main>
  <div class="footer">${footerText}</div>
</body>
</html>`;

fs.writeFileSync(outputHtml, html, "utf8");

execFileSync(
  chromePath,
  [
    "--headless",
    "--disable-gpu",
    "--allow-file-access-from-files",
    "--print-to-pdf-no-header",
    "--no-pdf-header-footer",
    `--print-to-pdf=${outputPdf}`,
    `file://${outputHtml}`,
  ],
  { stdio: "pipe" }
);

console.log(`已輸出：${outputPdf}`);
