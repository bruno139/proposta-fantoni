// Monta a proposta (demonstrativo geral, igual para todos os clientes) a partir de dados.js
// e calcula o total conforme os itens são ligados/desligados.
// Há uma proposta por sistema (PDV e Link PRO); o sistema aberto fica no endereço (#pdv ou #linkpro).
const $ = (s) => document.querySelector(s);
const real = (v) => (v == null ? "A definir" : "R$ " + v.toLocaleString("pt-BR"));
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
  caixa: '<rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V5h10v5M7 14h2M11 14h2M15 14h2M7 17h10"/>',
  garcom: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 6h4M10 10h4M10 14h2"/>',
  globo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M17 21h4v-4M14 21v-3"/>',
  lista: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  monitor: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4M6 9h6M6 12h4"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4M8 9v4M11 9v4M14 9v4"/>',
  setas: '<path d="M4 7h14l-3-3M20 17H6l3 3"/>',
  engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
};
const svg = (n, t = 22) => `<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONES[n]}</svg>`;

// Estado da proposta aberta; render() refaz tudo ao trocar de sistema.
let sistema, P, b, GRUPOS, TODOS, regime, escolha;

function render(id) {
  sistema = PROPOSTAS[id] ? id : "pdv";
  P = PROPOSTAS[sistema];
  b = P.base;
  document.documentElement.dataset.sistema = sistema;
  document.title = "Proposta " + P.nome;

  // Grupos de itens escolhíveis. "mensal" decide em qual total o valor entra.
  // Um sistema pode trazer as próprias seções em "grupos"; senão usa módulos / implantação / extras.
  GRUPOS = P.grupos || [
    { id: "modulos", titulo: "Módulos adicionais", sub: "Recorrentes, por mês", mensal: true, itens: P.modulos },
    { id: "implantacao", titulo: "Taxas de implantação", sub: "Pagamento único", mensal: false, itens: P.implantacao },
    { id: "extras", titulo: "Serviços extras", sub: "Pagamento único", mensal: false, itens: P.extras },
  ];
  TODOS = Object.fromEntries(GRUPOS.flatMap((g) => g.itens.map((i) => [i.id, { ...i, mensal: g.mensal }])));

  // o que está escolhido (id -> quantidade): começa com o plano base e os itens obrigatórios
  // sem "regimes" nos dados, o sistema tem mensalidade única
  regime = b.regimes ? b.regimes[0] : { id: "unico", nome: "", preco: b.preco };
  escolha = Object.fromEntries(Object.values(TODOS).filter((i) => i.obrigatorio).map((i) => [i.id, 1]));

  $("#nome-sistema").textContent = P.nome;
  // última palavra do nome em verde-água, como pede o design system ("Fantoni PDV", "Link PRO")
  $("#titulo").innerHTML = P.nome.replace(/(\S+)$/, "<em>$1</em>");
  $("#data").textContent = "Valores atualizados em " + new Date().toLocaleDateString("pt-BR");
  $("#intro").textContent = P.intro;
  // telas em 3D: a primeira começa na frente e a cada 7 s a da frente vai para trás;
  // se o print não existir, vira uma janela provisória com o nome da tela
  const telas = P.telas || [];
  document.querySelector(".hero").classList.toggle("com-telas", telas.length > 0);
  $("#telas").innerHTML = telas.map((t) => `
    <figure class="tela"><div class="cartao">
      <div class="janela"><i></i><i></i><i></i><span>${t.titulo}</span></div>
      <img src="${t.img}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('div'), { className: 'vazia', textContent: 'Print da tela: ${t.titulo}' }))">
    </div></figure>`).join("");
  girarTelas(true);
  $("#rodape").textContent = P.rodape;
  $("#acerto-curto").textContent = P.acertoCurto || "Acerto todo dia 10";
  $("#menu-sistemas").innerHTML =
    '<div class="rotulo">Trocar de sistema</div>' +
    Object.entries(PROPOSTAS).map(([k, s]) =>
      `<a href="#${k}"><span class="bola ${k}">${s.sigla}</span><span><span class="n1">${s.nome}</span><span class="n2">${s.descricao}</span></span>${k === sistema ? '<span class="atual">atual</span>' : ""}</a>`
    ).join("");

  let html = `
<section id="base">
  <div class="titulo"><h2>Plano Base</h2><span>Já incluso na proposta</span></div>
  <div class="base">
    <div>
      <h3>${b.nome}</h3>
      <p>${b.texto}</p>
      ${b.itens.length ? `<ul>${b.itens.map((i) => `<li>${svg("ok", 18)}${i}</li>`).join("")}</ul>` : ""}
      <div class="suporte">${svg("relogio", 20)}${b.suporte}</div>
      <div class="acerto"><span class="dia"><small>${(P.acertoSelo || ["dia", "10"])[0]}</small>${(P.acertoSelo || ["dia", "10"])[1]}</span><span><b>${P.acertoTitulo || "Acerto mensal"}</b>${P.acerto}</span></div>
    </div>
    <div class="preco-base">
      <span class="oferta">Para iniciar só com o sistema</span>
      ${b.regimes ? `<div class="regimes" role="radiogroup" aria-label="Regime da empresa">
        ${b.regimes.map((r) => `<button class="regime" role="radio" data-regime="${r.id}"><span>${r.nome}</span><b>${real(r.preco)}</b>${r.preco == null ? "" : "<small>por mês</small>"}</button>`).join("")}
      </div>` : `<div class="preco-unico"><span>Mensalidade única</span><b>${real(b.preco)}</b>${b.preco == null ? "" : "<small>por mês</small>"}${b.nota ? `<em>${b.nota}</em>` : ""}</div>`}
    </div>
  </div>
</section>`;

  for (const g of GRUPOS) {
    html += `<section id="${g.id}"><div class="titulo"><h2>${g.titulo}</h2><span>${g.sub}</span></div>${g.nota ? `<p class="nota-grupo">${g.nota}</p>` : ""}`;
    if (!g.itens.length) {
      html += `<div class="aguardando"><span class="ico">${svg("relogio", 24)}</span><span><b>Itens em definição</b>Os itens e valores desta parte entram aqui em breve.</span></div></section>`;
      continue;
    }
    html += `<div class="itens">`;
    for (const i of g.itens) {
      const sufixo = i.preco == null ? "" : i.tipo === "qtd" ? ` <small>/ ${i.unidade}${g.mensal ? " /mês" : ""}</small>` : g.mensal ? " <small>/mês</small>" : "";
      html += `
    <div class="item${i.obrigatorio ? " obrigatorio" : ""}" data-id="${i.id}" ${i.obrigatorio ? "" : 'role="button" tabindex="0" aria-pressed="false"'}>
      ${i.obrigatorio ? `<span class="selo-obrig">${svg("cadeado", 13)}Obrigatório para iniciar</span>` : ""}
      <div class="cab"><span class="ico">${svg(i.icone)}</span><h4>${i.nome}${i.requer ? `<span class="tag">exige ${TODOS[i.requer].nome}</span>` : ""}</h4>${i.tipo === "qtd" || i.obrigatorio ? "" : '<span class="chave"></span>'}</div>
      <p>${i.texto}</p>
      <div class="pe"><span class="valor">${real(i.preco)}${sufixo}</span>
        ${i.tipo === "qtd" ? `<span class="qtd"><button data-d="-1" aria-label="Menos">−</button><span>0</span><button data-d="1" aria-label="Mais">+</button></span>` : ""}
      </div>
    </div>`;
    }
    html += `</div></section>`;
  }
  $("#conteudo").innerHTML = html;
  atualizar();

  // cards aparecem ao rolar
  document.querySelectorAll(".titulo, .base, .item, .aguardando").forEach((el, n) => {
    el.classList.add("surge");
    el.style.transitionDelay = (n % 2) * 80 + "ms";
    obs.observe(el);
  });
}

// --- interação ---
function alternar(id, delta) {
  const i = TODOS[id];
  if (i.obrigatorio) return; // implantação e treinamento: sempre incluso
  if (i.tipo === "qtd") {
    const q = (escolha[id] || 0) + (delta ?? 1) * (i.passo || 1);
    if (q > 0) escolha[id] = q; else delete escolha[id];
  } else if (escolha[id]) delete escolha[id];
  else escolha[id] = 1;
  // "exige Cloud": ligar o item liga o que ele exige; desligar o exigido desliga quem depende dele
  if (escolha[id] && i.requer && !escolha[i.requer]) escolha[i.requer] = 1;
  if (!escolha[id]) Object.values(TODOS).forEach((o) => { if (o.requer === id) delete escolha[o.id]; });
  atualizar();
}

$("#conteudo").addEventListener("click", (e) => {
  const bt = e.target.closest(".regime");
  if (bt) { regime = b.regimes.find((r) => r.id === bt.dataset.regime); atualizar(); return; }
  const card = e.target.closest(".item");
  if (!card) return;
  const mais = e.target.closest(".qtd button");
  alternar(card.dataset.id, mais ? Number(mais.dataset.d) : undefined);
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
  // se a animação não rodar (aba em segundo plano), o valor final aparece mesmo assim
  setTimeout(() => { if (atual[chave] === alvo) el.textContent = real(alvo); }, 500);
}

function atualizar() {
  document.querySelectorAll(".regime").forEach((el) => el.setAttribute("aria-checked", el.dataset.regime === regime.id));
  let mensal = regime.preco || 0, unico = 0;
  const linhas = { m: [`<li><span>${b.nome}${regime.nome ? " · " + regime.nome : ""}</span><span>${real(regime.preco)}</span></li>`], u: [] };
  document.querySelectorAll(".item").forEach((card) => {
    const id = card.dataset.id, i = TODOS[id], q = escolha[id] || 0;
    card.classList.toggle("on", q > 0);
    if (!i.obrigatorio) card.setAttribute("aria-pressed", q > 0);
    const n = card.querySelector(".qtd span");
    if (n) n.textContent = q;
    if (!q) return;
    const v = i.preco == null ? null : i.preco * q;
    if (i.mensal) mensal += v || 0; else unico += v || 0;
    const nome = i.tipo === "qtd" ? `${i.nome} (${q} ${q > 1 ? i.unidades || i.unidade + "s" : i.unidade})` : i.nome;
    (i.mensal ? linhas.m : linhas.u).push(`<li><span>${nome}</span><span>${real(v)}</span></li>`);
  });
  animarNumero($("#t-mensal"), "mensal", mensal);
  animarNumero($("#t-unico"), "unico", unico);
  animarNumero($("#t-geral"), "geral", mensal + unico);
  $("#lista").innerHTML =
    '<li class="grupo">Mensal</li>' + linhas.m.join("") +
    (linhas.u.length ? '<li class="grupo">Pagamento único</li>' + linhas.u.join("") : "");
}
// troca de sistema: clique no nome do topo abre o menu; o endereço (#pdv / #linkpro) guarda a escolha
const botaoSistema = $("#nome-site"), menu = $("#menu-sistemas");
function abrirMenu(aberto) { menu.classList.toggle("aberto", aberto); botaoSistema.setAttribute("aria-expanded", aberto); }
botaoSistema.addEventListener("click", (e) => { e.stopPropagation(); abrirMenu(!menu.classList.contains("aberto")); });
document.addEventListener("click", (e) => { if (!menu.contains(e.target)) abrirMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") abrirMenu(false); });
menu.addEventListener("click", () => abrirMenu(false));
addEventListener("hashchange", () => { render(location.hash.slice(1)); scrollTo({ top: 0 }); });

// posição de cada tela na pilha (t1 = frente); "volta" conta quantas vezes já girou
let volta = 0, relogioTelas;
function girarTelas(reiniciar) {
  const figs = [...document.querySelectorAll("#telas .tela")];
  if (reiniciar) { volta = 0; clearInterval(relogioTelas); if (figs.length > 1) relogioTelas = setInterval(() => girarTelas(), 7000); }
  else volta++;
  figs.forEach((f, n) => (f.className = "tela t" + (((n - volta) % figs.length + figs.length) % figs.length + 1)));
}

const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("visivel"), obs.unobserve(e.target))), { threshold: 0.1 });
render(location.hash.slice(1));

// tema claro/escuro e impressão
$("#tema").addEventListener("click", () => {
  const raiz = document.documentElement;
  const escuroAgora = raiz.dataset.tema ? raiz.dataset.tema === "escuro" : matchMedia("(prefers-color-scheme: dark)").matches;
  raiz.dataset.tema = escuroAgora ? "claro" : "escuro";
  try { localStorage.setItem("tema", raiz.dataset.tema); } catch (e) {}
});
$("#imprimir").addEventListener("click", () => window.print());
