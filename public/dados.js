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
    { id: "disp", nome: "Dispositivo adicional", preco: 7, icone: "disp", tipo: "qtd", unidade: "disp.", unidades: "disp.", texto: "Escalabilidade para operações maiores. Custo referente ao processamento extra e suporte para múltiplos terminais (acima de 4)." },
    { id: "totem", nome: "Autoatendimento", preco: 60, icone: "totem", texto: "Permite que o próprio cliente faça o pedido e o pagamento direto no totem, reduzindo filas e liberando a equipe do balcão." },
    { id: "catalogo", nome: "Catálogo Online", preco: 30, icone: "loja", texto: "Sua loja aberta 24h. Sincronização em tempo real do estoque físico com o digital, aumentando o alcance de vendas." },
    { id: "ifood", nome: "Integração iFood", preco: 30, icone: "moto", texto: "Elimina o erro humano e o tempo perdido digitando pedidos manualmente. Integração direta entre o marketplace e sua cozinha/balcão." },
    { id: "pagto", nome: "Pagamento Integrado", preco: 20, icone: "cartao", texto: "Segurança e agilidade no checkout. Evita fraudes e erros de digitação de valores na maquininha, conciliando tudo automaticamente." },
    { id: "balanca", nome: "Balança Automática", preco: 140, icone: "balanca", texto: "Precisão absoluta para estabelecimentos que vendem por peso. Garante a leitura exata do hardware diretamente no sistema." },
  ],

  implantacao: [
    { id: "i-balanca", nome: "Implantação Balança", preco: 100, icone: "balanca", texto: "Configuração técnica e testes de comunicação." },
    { id: "i-rede", nome: "Implantação Impressora em Rede", preco: 50, icone: "wifi", texto: "Configuração de IP e comunicação via cabo/Wi-Fi." },
  ],

  extras: [
    { id: "treino", nome: "Implantação e Treinamento", preco: 120, obrigatorio: true, icone: "video", texto: "Implantação e Treinamento do Sistema, até 2 horas de configuração e treinamento guiado em ligação via Meet." },
    { id: "horas", nome: "Cadastro de Produtos / Artes / Ajustes Específicos", preco: 30, icone: "pincel", tipo: "qtd", unidade: "hora", texto: "Horas técnicas dedicadas à personalização da base de dados do cliente ou criação de materiais visuais integrados." },
  ],
};

// --- Link PRO (copiado da "Link Pro - Tabela de Precos.pdf", novembro de 2026) ---
PROPOSTAS.linkpro = {
  nome: "Link PRO",
  sigla: "LP",
  descricao: "Gestão e frente de caixa para o seu comércio",
  rodape: "Fantoni Software — Soluções Inteligentes para o Comércio Moderno",
  // no Link PRO a primeira mensalidade vence 30 dias depois que o cliente começa a usar (não no dia 10)
  acertoTitulo: "Primeira mensalidade",
  acerto: "A mensalidade só vence 30 dias depois que você começa a usar. A implantação é paga no fechamento: à vista no PIX ou em até 2x no cartão.",
  acertoSelo: ["após", "30d"],
  acertoCurto: "1ª mensalidade em 30 dias",
  intro:
    "Sistema de gestão e frente de caixa para o seu comércio. Você começa pelo Link PRO e adiciona só o que a sua operação usa.",

  telas: [
    { img: "telas/linkpro-1.webp", titulo: "Atendimento" },
    { img: "telas/linkpro-2.webp", titulo: "Resumo de vendas" },
    { img: "telas/linkpro-3.webp", titulo: "Frente de caixa" },
  ],

  base: {
    nome: "Link PRO",
    // mensalidade única, sem separar por regime (sem "regimes", a página mostra um preço só)
    preco: 139,
    nota: "Atende praticamente todos os regimes de tributação",
    texto:
      "Sistema completo com 1 caixa. Tudo o que está abaixo vem incluído no mesmo valor. " +
      "Os adicionais e os sistemas extras se ligam a ele.",
    suporte: "Suporte da Fantoni pelo WhatsApp.",
    itens: [
      "Frente de caixa com 1 licença",
      "Vendas no balcão, em mesas e comandas",
      "Várias formas de pagamento na mesma venda",
      "Abertura e fechamento de caixa, sangria e suprimento",
      "Cadastro de produtos, clientes e fornecedores",
      "NFC-e, NF-e, MDF-e e os outros modelos de nota (só a NFS-e é adicional)",
      "Controle de estoque",
      "CMV: o custo real de cada produto vendido",
      "Controle financeiro: contas a pagar e a receber",
      "Relatórios de vendas, caixa, estoque e financeiro",
    ],
  },

  // seções próprias do Link PRO (o PDV usa módulos / implantação / extras)
  grupos: [
    {
      id: "adicionais", titulo: "Adicionais do Link PRO", sub: "Por mês", mensal: true,
      nota: "Recursos que você liga no próprio Link PRO, conforme a necessidade.",
      itens: [
        { id: "caixa", nome: "Caixa adicional", preco: 29, icone: "caixa", tipo: "qtd", unidade: "caixa", texto: "Mais um ponto de venda na loja." },
        { id: "garcom", nome: "Garçom", preco: 29, icone: "garcom", tipo: "qtd", unidade: "aparelho", texto: "Pedido anotado na mesa, direto do celular." },
        { id: "movel", nome: "Link Móvel", preco: 29, icone: "disp", tipo: "qtd", unidade: "aparelho", requer: "cloud", texto: "Venda pelo celular, em qualquer lugar." },
        { id: "cloud", nome: "Cloud", preco: 79, icone: "nuvem", texto: "Seus dados na nuvem. É a base para Link Web, Catálogo, Menu Digital e Link Móvel." },
        { id: "web", nome: "Link Web", preco: 19, icone: "globo", requer: "cloud", texto: "Acesse o sistema pelo navegador, de qualquer computador." },
        { id: "catalogo", nome: "Catálogo Online", preco: 19, icone: "loja", requer: "cloud", texto: "Sua loja na internet, ligada ao estoque." },
        { id: "menu", nome: "Menu Digital", preco: 19, icone: "qr", requer: "cloud", texto: "Cardápio no celular do cliente, pelo QR Code." },
        { id: "catalogo-plus", nome: "Catálogo Online Plus", preco: 49, icone: "moto", requer: "cloud", texto: "Catálogo com o Conecta Entregador para as suas entregas." },
        { id: "pagto", nome: "Pagamento Integrado", preco: 79, icone: "cartao", texto: "O valor vai direto para a maquininha, sem digitar de novo." },
        { id: "ordem", nome: "Ordem de Pagamento", preco: 99, icone: "lista", texto: "Organize e acompanhe as ordens de pagamento no sistema." },
        { id: "nfse", nome: "NFS-e", preco: 89, icone: "nota", texto: "Nota fiscal de serviço, até 50 notas por mês. Acima disso, R$ 1 por nota." },
      ],
    },
    {
      id: "sistemas", titulo: "Sistemas extras", sub: "Por mês", mensal: true,
      nota: "Sistemas próprios, com aparelho dedicado, que trabalham conectados ao Link PRO.",
      itens: [
        { id: "cozinha", nome: "Monitor de cozinha", preco: 29, icone: "monitor", tipo: "qtd", unidade: "tela", texto: "Os pedidos aparecem na tela da cozinha, na ordem em que entram." },
        { id: "balanca", nome: "Pesagem automática", preco: 140, icone: "balanca", tipo: "qtd", unidade: "balança", texto: "A balança manda o peso direto para a venda, sem digitar." },
        { id: "consulta", nome: "Consulta preço", preco: 29, icone: "busca", tipo: "qtd", unidade: "terminal", unidades: "terminais", texto: "Terminal onde o cliente passa o código e vê o preço do produto." },
      ],
    },
    {
      id: "implantacao", titulo: "Implantação", sub: "Pagamento único", mensal: false,
      nota: "A Fantoni instala, configura e treina a sua equipe. Você começa a vender com tudo funcionando.",
      itens: [
        { id: "implantacao", nome: "Implantação Link PRO", preco: 349, obrigatorio: true, icone: "engrenagem", texto: "Instalação no primeiro caixa; configuração fiscal (certificado, NFC-e e NF-e); formas de pagamento e usuários; cadastro de até 100 produtos ou importação de planilha; 1 impressora; treinamento de 2 horas e 7 dias de acompanhamento pelo WhatsApp." },
      ],
    },
    {
      id: "avulsos", titulo: "Serviços avulsos", sub: "Pagamento único", mensal: false,
      nota: "Garçom, monitor de cozinha, consulta preço e Link Móvel são instalados sem custo.",
      itens: [
        { id: "migracao", nome: "Migração de outro sistema", preco: 199, icone: "setas", texto: "Produtos, clientes e estoque trazidos do sistema antigo." },
        { id: "i-caixa", nome: "Instalação de caixa adicional", preco: 79, icone: "caixa", tipo: "qtd", unidade: "caixa", texto: "Instalação e configuração." },
        { id: "i-balanca", nome: "Instalação da pesagem automática", preco: 150, icone: "balanca", texto: "Configuração da balança e testes." },
        { id: "i-cloud", nome: "Ativação do Cloud", preco: 99, icone: "nuvem", texto: "Configuração da conta na nuvem." },
        { id: "i-catalogo", nome: "Criação de catálogo e menu digital", preco: 99, icone: "qr", texto: "Montagem com categorias e fotos." },
        { id: "i-impressora", nome: "Impressora em rede", preco: 50, icone: "wifi", tipo: "qtd", unidade: "impressora", texto: "Configuração por IP, cabo ou Wi-Fi." },
        { id: "i-hora", nome: "Hora adicional", preco: 50, icone: "relogio", tipo: "qtd", unidade: "hora", texto: "Treinamento extra ou ajustes fora do combinado." },
        { id: "i-produtos", nome: "Cadastro de produtos", preco: 2, icone: "pincel", tipo: "qtd", unidade: "produto", passo: 10, texto: "Acima dos 100 produtos incluídos na implantação. Cada toque no + soma 10 produtos." },
      ],
    },
  ],
};
