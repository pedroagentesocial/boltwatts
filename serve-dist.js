import http from "http";
import fs from "fs";
import path from "path";

const port = Number(process.argv[2] || 4822);
const rootDir = path.resolve(process.argv[3] || "dist");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function safeResolve(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const cleanPath = decoded.replace(/^\/+/, "");
  const resolved = path.resolve(rootDir, cleanPath);
  if (!resolved.startsWith(rootDir)) return null;
  return resolved;
}

function send404(res) {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
}

const server = http.createServer((req, res) => {
  const requested = req.url || "/";
  let target = safeResolve(requested);
  if (!target) return send404(res);

  if (requested === "/" || requested === "") {
    target = path.join(rootDir, "en", "index.html");
  } else if (!path.extname(target)) {
    target = path.join(target, "index.html");
  }

  fs.stat(target, (err, stat) => {
    if (err || !stat.isFile()) return send404(res);
    const ext = path.extname(target).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType, "Cache-Control": "no-cache" });
    fs.createReadStream(target).pipe(res);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static server ready at http://localhost:${port}/en/`);
});
