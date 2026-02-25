const fs = require("fs");
const path = require("path");

const chunksDir = path.join(__dirname, "..", "out", "_next", "static", "chunks");
if (!fs.existsSync(chunksDir)) {
  console.warn("copy-main-app: out/_next/static/chunks not found, skipping");
  process.exit(0);
}

const files = fs.readdirSync(chunksDir);
const mainApp = files.find((f) => f.startsWith("main-app-") && f.endsWith(".js"));
if (!mainApp) {
  console.warn("copy-main-app: main-app-*.js not found, skipping");
  process.exit(0);
}

const src = path.join(chunksDir, mainApp);
const dest = path.join(chunksDir, "main-app.js");
fs.copyFileSync(src, dest);
console.log("copy-main-app: copied", mainApp, "-> main-app.js");
