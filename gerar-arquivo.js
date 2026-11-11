// Junta a página inteira (estilo, scripts, logo e prints das telas) em um único arquivo HTML para mandar por WhatsApp/e-mail.
// Uso: node gerar-arquivo.js  ->  cria "Proposta Fantoni PDV.html" nesta pasta.
const fs = require("fs");
const path = require("path");

const pasta = path.join(__dirname, "public");
const ler = (n) => fs.readFileSync(path.join(pasta, n), "utf8");
const embutir = (f) => `"data:image/webp;base64,${fs.readFileSync(path.join(pasta, f)).toString("base64")}"`;
const logo = "data:image/webp;base64," + fs.readFileSync(path.join(pasta, "logo.webp")).toString("base64");

const html = ler("index.html")
  .replace('<link rel="stylesheet" href="estilo.css">', () => "<style>\n" + ler("estilo.css") + "</style>")
  .replace('<script src="dados.js"></script>', () => "<script>\n" + ler("dados.js").replace(/"(telas\/[^"]+\.webp)"/g, (_, f) => embutir(f)) + "</script>")
  .replace('<script src="app.js"></script>', () => "<script>\n" + ler("app.js") + "</script>")
  .replace('src="logo.webp"', () => `src="${logo}"`);

const saida = path.join(__dirname, "Proposta Fantoni PDV.html");
fs.writeFileSync(saida, html);
console.log("Gerado: " + saida);

// mesma página em docs/index.html, que é o que o GitHub Pages publica (bruno139.github.io/proposta-fantoni)
fs.mkdirSync(path.join(__dirname, "docs"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "docs", "index.html"), html);
console.log("Gerado: docs/index.html");
