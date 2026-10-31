// Junta a página inteira (estilo, scripts e logo) em um único arquivo HTML para mandar por WhatsApp/e-mail.
// Uso: node gerar-arquivo.js  ->  cria "Proposta Fantoni PDV.html" nesta pasta.
const fs = require("fs");
const path = require("path");

const pasta = path.join(__dirname, "public");
const ler = (n) => fs.readFileSync(path.join(pasta, n), "utf8");
const logo = "data:image/webp;base64," + fs.readFileSync(path.join(pasta, "logo.webp")).toString("base64");

const html = ler("index.html")
  .replace('<link rel="stylesheet" href="estilo.css">', () => "<style>\n" + ler("estilo.css") + "</style>")
  .replace('<script src="dados.js"></script>', () => "<script>\n" + ler("dados.js") + "</script>")
  .replace('<script src="app.js"></script>', () => "<script>\n" + ler("app.js") + "</script>")
  .replace('src="logo.webp"', () => `src="${logo}"`);

const saida = path.join(__dirname, "Proposta Fantoni PDV.html");
fs.writeFileSync(saida, html);
console.log("Gerado: " + saida);
