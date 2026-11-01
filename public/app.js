// Monta a proposta (demonstrativo geral, igual para todos os clientes) a partir de dados.js
// e calcula o total conforme os itens são ligados/desligados.
const P = window.PROPOSTA;
const $ = (s) => document.querySelector(s);
const real = (v) => "R$ " + v.toLocaleString("pt-BR");

const ICONES = {
  nota: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  nuvem: '<path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 1 0 6 17.3"/><path d="M6 19h11.5"/>',
  disp: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 18h2"/>',
  totem: '<rect x="6" y="2" width="12" height="14" rx="2"/><path d="M12 16v4M8 22h8M9 7h6M9 11h4"/>',
  loja: '<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 13v8h14v-8"/>',
  moto: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h3l3 6M9 17.5h6l-3-7H8M12 10.5 15 6"/>',
  cartao: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  balanca: '<path d="M12 3v18M5 21h14M6 7h12"/><path d="m6 7-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/>',
  wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a15 15 0 0 1 20 0"/><circle cx="12" cy="19.5" r="1"/>',
  impressora: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
  video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>',
  pincel: '<path d="M18.4 2.6a2 2 0 0 1 3 3L12 15l-4-4z"/><path d="M8 11c-2 0-4 1.5-4 4 0 1.5-1 2.5-2 3 4 1.5 9 1 10-3z"/>',
  ok: '<path d="M20 6 9 17l-5-5"/>',
  cadeado: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
const svg = (n, t = 22) => `<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONES[n]}</svg>`;

// Grupos de itens escolhíveis. "mensal" decide em qual total o valor entra.
const GRUPOS = [
  { id: "modulos", titulo: "Módulos adicionais", sub: "Recorrentes, por mês", mensal: true, itens: P.modulos },
  { id: "implantacao", titulo: "Taxas de implantação", sub: "Pagamento único", mensal: false, itens: P.implantacao },
  { id: "extras", titulo: "Serviços extras", sub: "Pagamento único", mensal: false, itens: P.extras },
];
const TODOS = Object.fromEntries(GRUPOS.flatMap((g) => g.itens.map((i) => [i.id, { ...i, mensal: g.mensal }])));

// --- estado: o que está escolhido (id -> quantidade); começa com o plano base e os itens obrigatórios ---
const escolha = Object.fromEntries(Object.values(TODOS).filter((i) => i.obrigatorio).map((i) => [i.id, 1]));

// --- montagem ---
$("#data").textContent = "Valores atualizados em " + new Date().toLocaleDateString("pt-BR");
$("#intro").textContent = P.intro;
$("#rodape").textContent = P.rodape;

const b = P.base;
let html = `
<section id="base">
  <div class="titulo"><h2>Plano Base</h2><span>Já incluso na proposta</span></div>
  <div class="base">
    <div>
      <h3>${b.nome}</h3>
      <p>${b.texto}</p>
      <ul>${b.itens.map((i) => `<li>${svg("ok", 18)}${i}</li>`).join("")}</ul>
      <div class="suporte">${svg("relogio", 20)}${b.suporte}</div>
      <div class="acerto"><span class="dia"><small>dia</small>10</span><span><b>Acerto mensal</b>${P.acerto}</span></div>
    </div>
    <div class="preco-base">
      <span class="oferta">${b.oferta}</span>
      <s>de ${real(b.precoDe)}/mês</s>
      <span class="por">por</span>
      <b>${real(b.preco)}</b><small>por mês</small>
    </div>
  </div>
</section>`;

for (const g of GRUPOS) {
  html += `<section id="${g.id}"><div class="titulo"><h2>${g.titulo}</h2><span>${g.sub}</span></div><div class="itens">`;
  for (const i of g.itens) {
    const sufixo = i.tipo === "qtd" ? ` <small>/ ${i.unidade}${g.mensal ? " /mês" : ""}</small>` : g.mensal ? " <small>/mês</small>" : "";
    html += `
    <div class="item${i.obrigatorio ? " obrigatorio" : ""}" data-id="${i.id}" ${i.obrigatorio ? "" : 'role="button" tabindex="0" aria-pressed="false"'}>
      ${i.obrigatorio ? `<span class="selo-obrig">${svg("cadeado", 13)}Obrigatório para iniciar</span>` : ""}
      <div class="cab"><span class="ico">${svg(i.icone)}</span><h4>${i.nome}</h4>${i.tipo === "qtd" || i.obrigatorio ? "" : '<span class="chave"></span>'}</div>
      <p>${i.texto}</p>
      <div class="pe"><span class="valor">${real(i.preco)}${sufixo}</span>
        ${i.tipo === "qtd" ? `<span class="qtd"><button data-d="-1" aria-label="Menos">−</button><span>0</span><button data-d="1" aria-label="Mais">+</button></span>` : ""}
      </div>
    </div>`;
  }
  html += `</div></section>`;
}
$("#conteudo").innerHTML = html;

// --- interação ---
function alternar(id, delta) {
  const i = TODOS[id];
  if (i.obrigatorio) return; // implantação e treinamento: sempre incluso
  if (i.tipo === "qtd") {
    const q = (escolha[id] || 0) + (delta ?? 1);
    if (q > 0) escolha[id] = q; else delete escolha[id];
  } else if (escolha[id]) delete escolha[id];
  else escolha[id] = 1;
  atualizar();
}

$("#conteudo").addEventListener("click", (e) => {
  const card = e.target.closest(".item");
  if (!card) return;
  const bt = e.target.closest(".qtd button");
  alternar(card.dataset.id, bt ? Number(bt.dataset.d) : undefined);
});
$("#conteudo").addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("item")) { e.preventDefault(); alternar(e.target.dataset.id); }
});

// número que "corre" até o valor novo
const atual = { mensal: 0, unico: 0, geral: 0 };
function animarNumero(el, chave, alvo) {
  const de = atual[chave];
  atual[chave] = alvo;
  if (de === alvo) return;
  el.classList.remove("pulsa"); void el.offsetWidth; el.classList.add("pulsa");
  const ini = performance.now();
  const passo = (t) => {
    const p = Math.min(1, (t - ini) / 450);
    el.textContent = real(Math.round(de + (alvo - de) * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

function atualizar() {
  let mensal = b.preco, unico = 0;
  const linhas = { m: [`<li><span>${b.nome}</span><span>${real(b.preco)}</span></li>`], u: [] };
  document.querySelectorAll(".item").forEach((card) => {
    const id = card.dataset.id, i = TODOS[id], q = escolha[id] || 0;
    card.classList.toggle("on", q > 0);
    if (!i.obrigatorio) card.setAttribute("aria-pressed", q > 0);
    const n = card.querySelector(".qtd span");
    if (n) n.textContent = q;
    if (!q) return;
    const v = i.preco * q;
    if (i.mensal) mensal += v; else unico += v;
    const nome = i.tipo === "qtd" ? `${i.nome} (${q} ${i.unidade}${q > 1 ? (i.unidade === "hora" ? "s" : "") : ""})` : i.nome;
    (i.mensal ? linhas.m : linhas.u).push(`<li><span>${nome}</span><span>${real(v)}</span></li>`);
  });
  animarNumero($("#t-mensal"), "mensal", mensal);
  animarNumero($("#t-unico"), "unico", unico);
  animarNumero($("#t-geral"), "geral", mensal + unico);
  $("#lista").innerHTML =
    '<li class="grupo">Mensal</li>' + linhas.m.join("") +
    (linhas.u.length ? '<li class="grupo">Pagamento único</li>' + linhas.u.join("") : "");
}
atualizar();

// cards aparecem ao rolar
const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("visivel"), obs.unobserve(e.target))), { threshold: 0.1 });
document.querySelectorAll(".titulo, .base, .item").forEach((el, n) => {
  el.classList.add("surge");
  el.style.transitionDelay = (n % 2) * 80 + "ms";
  obs.observe(el);
});

// tema claro/escuro e impressão
$("#tema").addEventListener("click", () => {
  const raiz = document.documentElement;
  const escuroAgora = raiz.dataset.tema ? raiz.dataset.tema === "escuro" : matchMedia("(prefers-color-scheme: dark)").matches;
  raiz.dataset.tema = escuroAgora ? "claro" : "escuro";
  try { localStorage.setItem("tema", raiz.dataset.tema); } catch (e) {}
});
$("#imprimir").addEventListener("click", () => window.print());
