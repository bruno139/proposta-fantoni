// Conteúdo das propostas, uma por sistema. Para mudar preço ou texto, edite só aqui.
// Preço null aparece como "A definir" na página.
window.PROPOSTAS = {};

// --- Fantoni PDV (copiado do PDF "Sistema Fantoni PDV.pdf") ---
PROPOSTAS.pdv = {
  nome: "Fantoni PDV",
  sigla: "PDV",
  descricao: "Frente de caixa para bares, restaurantes e varejo",
  slogan: "Excelência em Automação Comercial",
  rodape: "Fantoni Software — Soluções Inteligentes para o Comércio Moderno",
  acerto: "O acerto mensal é realizado todo dia 10 de cada mês.",
  intro:
    "Este documento detalha o investimento necessário para a implementação e manutenção do sistema Fantoni PDV. " +
    "Nossa precificação é baseada no valor agregado de cada módulo, garantindo que sua empresa pague apenas pelo que " +
    "realmente otimiza sua operação, com tecnologia de ponta e suporte especializado.",

  // telas em 3D no topo da página (prints salvos na pasta public/telas); sem o arquivo, aparece uma janela provisória
  telas: [
    { img: "telas/pdv-1.webp", titulo: "Negociação" },
    { img: "telas/pdv-2.webp", titulo: "Pagamento" },
    { img: "telas/pdv-3.webp", titulo: "Evolução de vendas" },
  ],

  base: {
    nome: "Sistema PDV (Base)",
    // preço mensal para iniciar só com o sistema, conforme o regime da empresa (o primeiro é o que abre marcado)
    regimes: [
      { id: "mei", nome: "MEI", preco: 89 },
      { id: "simples", nome: "Simples Nacional", preco: 99 },
    ],
    texto:
      "Core do sistema que abrange frente de caixa, controle de estoque básico, fechamento de caixa e relatórios essenciais. " +
      "Este valor sustenta as atualizações contínuas de segurança e melhorias de performance.",
    suporte: "Suporte das 09:00 até 18:00 e Plantão até as 22:00.",
    itens: ["Frente de caixa", "Controle de estoque básico", "Fechamento de caixa", "Relatórios essenciais"],
  },

  // tipo "qtd": cobra por unidade (o cliente escolhe quantas)
  modulos: [
    { id: "nfe", nome: "Nota Fiscal", preco: 20, icone: "nota", texto: "Garante conformidade legal total com a SEFAZ. Automação de envio, armazenamento e segurança jurídica para sua empresa." },
    { id: "nuvem", nome: "Banco de Dados em Nuvem", preco: 40, icone: "nuvem", texto: "Segurança extrema contra perda de dados local. Permite sincronização em até 4 dispositivos simultâneos com backup automático." },
    { id: "disp", nome: "Dispositivo adicional", preco: 7, icone: "disp", tipo: "qtd", unidade: "disp.", texto: "Escalabilidade para operações maiores. Custo referente ao processamento extra e suporte para múltiplos terminais (acima de 4)." },
    { id: "totem", nome: "Autoatendimento", preco: 60, icone: "totem", texto: "Permite que o próprio cliente faça o pedido e o pagamento direto no totem, reduzindo filas e liberando a equipe do balcão." },
    { id: "catalogo", nome: "Catálogo Online", preco: 30, icone: "loja", texto: "Sua loja aberta 24h. Sincronização em tempo real do estoque físico com o digital, aumentando o alcance de vendas." },
    { id: "ifood", nome: "Integração iFood", preco: 30, icone: "moto", texto: "Elimina o erro humano e o tempo perdido digitando pedidos manualmente. Integração direta entre o marketplace e sua cozinha/balcão." },
    { id: "pagto", nome: "Pagamento Integrado", preco: 20, icone: "cartao", texto: "Segurança e agilidade no checkout. Evita fraudes e erros de digitação de valores na maquininha, conciliando tudo automaticamente." },
    { id: "balanca", nome: "Balança Automática", preco: 140, icone: "balanca", texto: "Precisão absoluta para estabelecimentos que vendem por peso. Garante a leitura exata do hardware diretamente no sistema." },
  ],

  implantacao: [
    { id: "i-balanca", nome: "Implantação Balança", preco: 100, icone: "balanca", texto: "Configuração técnica e testes de comunicação." },
    { id: "i-rede", nome: "Implantação Impressora em Rede", preco: 50, icone: "wifi", texto: "Configuração de IP e comunicação via cabo/Wi-Fi." },
    { id: "i-local", nome: "Implantação Impressora Local", preco: 20, icone: "impressora", texto: "Instalação física e driver via USB." },
  ],

  extras: [
    { id: "treino", nome: "Implantação e Treinamento", preco: 120, obrigatorio: true, icone: "video", texto: "Implantação e Treinamento do Sistema, até 2 horas de configuração e treinamento guiado em ligação via Meet." },
    { id: "horas", nome: "Cadastro de Produtos / Artes / Ajustes Específicos", preco: 30, icone: "pincel", tipo: "qtd", unidade: "hora", texto: "Horas técnicas dedicadas à personalização da base de dados do cliente ou criação de materiais visuais integrados." },
  ],
};

// --- Link PRO: estrutura pronta, aguardando textos e valores ---
PROPOSTAS.linkpro = {
  nome: "Link PRO",
  sigla: "LP",
  descricao: "Proposta do sistema Link PRO",
  rodape: "Fantoni Software — Soluções Inteligentes para o Comércio Moderno",
  acerto: "O acerto mensal é realizado todo dia 10 de cada mês.",
  intro:
    "Este documento detalha o investimento necessário para a implementação e manutenção do sistema Link PRO. " +
    "Os valores de cada item serão confirmados nesta proposta.",

  // telas em 3D no topo da página (prints salvos na pasta public/telas); sem o arquivo, aparece uma janela provisória
  telas: [
    { img: "telas/linkpro-1.webp", titulo: "Atendimento" },
    { img: "telas/linkpro-2.webp", titulo: "Resumo de vendas" },
    { img: "telas/linkpro-3.webp", titulo: "Frente de caixa" },
  ],

  base: {
    nome: "Link PRO (Base)",
    // mensalidade única, sem separar por regime (sem "regimes", a página mostra um preço só)
    preco: null,
    nota: "Atende praticamente todos os regimes de tributação",
    texto: "Descrição do plano base do Link PRO.",
    suporte: "Horário de suporte a definir.",
    itens: [],
  },

  modulos: [],
  implantacao: [],
  extras: [],
};
