// Proposta Fantoni PDV: servidor local sem dependências (só serve a pasta public).
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORTA = Number(process.env.PORT) || 3002;
const PASTA = path.join(__dirname, "public");
const TIPOS = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp" };

http
  .createServer((req, res) => {
    const nome = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const arquivo = path.join(PASTA, nome === "/" ? "index.html" : nome);
    if (!arquivo.startsWith(PASTA)) { res.writeHead(403); return res.end(); }
    fs.readFile(arquivo, (erro, dados) => {
      if (erro) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); return res.end("Não encontrado"); }
      res.writeHead(200, { "Content-Type": TIPOS[path.extname(arquivo)] || "application/octet-stream", "Cache-Control": "no-cache" });
      res.end(dados);
    });
  })
  .listen(PORTA, () => console.log("Proposta rodando em http://localhost:" + PORTA));
