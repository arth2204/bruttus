/* =====================================================================
   BRUTTUS — CONFIGURAÇÃO DA LOJA
   Tudo que muda com frequência (preço, checkout, textos, FAQ, avaliações)
   fica aqui. O app.js lê este arquivo e monta a página.
   ===================================================================== */
window.STORE = {
  brand: {
    name: "Bruttus",
    legalName: "[RAZÃO SOCIAL LTDA]",          // TODO: preencher
    cnpj: "[00.000.000/0001-00]",              // TODO: preencher
    email: "contato@bruttus.com.br",           // TODO: confirmar domínio
    hours: "Seg à Sex: 9h–18h · Sáb: 9h–13h",
    address: "[Endereço completo — Cidade/UF · CEP]" // TODO: preencher
  },

  // Fim da campanha (usado na barra de contagem e nos banners).
  // Formato ISO com fuso de Brasília.
  offerEndsAt: "2026-11-30T23:59:59-03:00",
  campaignLabel: "BLACK FRIDAY",

  product: {
    title: "Motosserra a Gasolina 52CC 20\" 3.0HP/2.2kW — Corte Profissional de Árvores, 2 Tempos",
    shortTitle: "Motosserra 52CC 20\"",
    soldCount: "7.282",
    warranty: "Garantia de 1 ano",
    images: [
      { src: "images/banners/capa-produto.png", alt: "Motosserra a gasolina 52CC Bruttus com sabre de 20 polegadas e kit completo — Black Friday" },
      { src: "images/produto/02-todas-tarefas.jpg", alt: "Motosserra cortando tronco: corte de madeira, marcenaria e poda" },
      { src: "images/produto/03-corrente.jpg", alt: "Corrente temperada afiada e resistente ao desgaste" },
      { src: "images/produto/04-partida-facil.jpg", alt: "Sistema de partida fácil por cordão retrátil" },
      { src: "images/produto/05-lubrificacao.jpg", alt: "Sistema de lubrificação automática da corrente" },
      { src: "images/produto/06-motor.jpg", alt: "Motor potente e eficiente: mais potência de corte e menos ruído" },
      { src: "images/produto/07-apresentacao.jpg", alt: "Apresentação das partes da motosserra" },
      { src: "images/produto/08-especificacoes.jpg", alt: "Especificações: 52CC, sabre 20\", 3.0HP, 2.2kW, 11.500 rpm" }
    ]
  },

  /* Ofertas (seletor tipo "Escolha seu tamanho" do funil original).
     Preço em centavos. checkoutUrl = link do checkout de cada oferta.
     ⚠️ Apenas a oferta de 1 unidade veio do site original — revise as demais. */
  offers: [
    { id: "1un", label: "1 Motosserra", detail: "Kit completo com sabre, corrente e ferramentas", price: 10999, compareAt: 39990, checkoutUrl: "#checkout-1un" },
    { id: "2un", label: "2 Motosserras", detail: "Uma para você e outra de reserva ou presente", price: 19799, compareAt: 79980, badge: "Mais vendido", checkoutUrl: "#checkout-2un" },
    { id: "1un-corrente", label: "1 Motosserra + Corrente extra", detail: "Corrente reserva 20\" para não parar o serviço", price: 13999, compareAt: 45990, checkoutUrl: "#checkout-1un-corrente" }
  ],
  defaultOffer: "1un",
  installments: 12,           // parcelas exibidas
  installmentRate: 1.2161,    // fator total das 12x (igual ao funil original: R$ 109,99 → 12x R$ 11,15)

  highlights: [
    "Frete Grátis para todo o Brasil — envio em até 48h",
    "Kit completo: sabre 20\", corrente, capa, chaves e frasco de mistura",
    "Garantia de 1 ano contra defeitos de fabricação",
    "Devolução grátis em até 7 dias após o recebimento"
  ],

  features: [
    { icon: "engine", title: "Motor 52CC 2 tempos", text: "3.0HP / 2.2kW de potência para cortes rápidos, firmes e eficientes." },
    { icon: "bar", title: "Sabre de 20 polegadas", text: "Alcança cortes maiores em troncos de até 80cm de diâmetro." },
    { icon: "fuel", title: "Funciona a gasolina", text: "Liberdade total longe da tomada: sítio, chácara, fazenda e obra." },
    { icon: "bolt", title: "Partida fácil", text: "Arranque por cordão retrátil e lubrificação automática da corrente." }
  ],

  specs: [
    ["Motor", "52CC, 2 tempos, refrigerado a ar"],
    ["Potência", "3.0HP / 2.2kW"],
    ["Rotação em marcha lenta", "11.500 rpm"],
    ["Sabre (barra guia)", "20 polegadas"],
    ["Capacidade de corte", "Árvores de até 80cm de diâmetro"],
    ["Combustível", "Gasolina + óleo 2 tempos (mistura)"],
    ["Lubrificação da corrente", "Automática"],
    ["Partida", "Manual, por cordão retrátil"],
    ["Segurança", "Freio de corrente, trava do acelerador e interruptor de segurança"],
    ["Pega", "Empunhadura em U com acabamento emborrachado"],
    ["Garantia", "1 ano"]
  ],

  boxContents: [
    "01 Motosserra a gasolina 52CC",
    "01 Sabre (barra guia) de 20 polegadas",
    "01 Corrente de aço temperado",
    "01 Capa protetora do sabre",
    "01 Frasco dosador para mistura de combustível",
    "01 Chave de vela / chave combinada",
    "02 Chaves Allen",
    "02 Chaves de fenda",
    "01 Manual do usuário em português"
  ],

  faq: [
    ["Vocês entregam para todo o Brasil?", "Sim. Entregamos em todo o território nacional com frete grátis, seguro e código de rastreio. O pedido é despachado em até 48 horas."],
    ["Tem garantia?", "Sim! A motosserra tem garantia de 1 ano contra defeitos de fabricação, além de 7 dias para devolução após o recebimento."],
    ["Tenho que pagar alguma taxa a mais?", "Não. O valor anunciado é o valor final, sem taxas futuras."],
    ["Que combustível ela usa?", "Gasolina comum misturada com óleo 2 tempos. O frasco dosador que acompanha o kit facilita fazer a mistura na proporção certa (consulte o manual)."],
    ["Ela corta árvores grandes?", "Sim. Com o sabre de 20 polegadas e o motor de 52CC ela corta troncos de até 80cm de diâmetro com o corte feito pelos dois lados."],
    ["Serve para poda?", "Sim. É ideal para poda de galhos, limpeza de terreno, corte de lenha, marcenaria doméstica e manutenção em sítios, chácaras e fazendas."],
    ["É difícil de ligar?", "Não. O sistema de partida fácil por cordão retrátil foi pensado para arrancar com poucas puxadas, mesmo para quem está começando."],
    ["Preciso comprar mais alguma coisa?", "Apenas a gasolina e o óleo 2 tempos para a mistura e o óleo para lubrificação da corrente. Sabre, corrente e ferramentas já vêm no kit."],
    ["Posso parcelar?", "Sim, em até 12x no cartão de crédito. Também aceitamos Pix."],
    ["E se eu não gostar?", "Você tem 7 dias após o recebimento para devolver, com estorno de 100% do valor."]
  ],

  /* ⚠️ AVALIAÇÕES ILUSTRATIVAS — substitua por avaliações reais de clientes
     (com foto, se possível) assim que tiver. Enquanto "illustrative" for true,
     o site mostra o selo "Avaliação ilustrativa". O resumo de notas é
     calculado a partir desta lista. */
  reviews: [
    { name: "Carlos Henrique", city: "Uberaba, MG", stars: 5, text: "Ligou na segunda puxada. Cortei um eucalipto inteiro no sítio numa tarde. Pelo preço, não esperava tanta força.", illustrative: true },
    { name: "Jéssica Andrade", city: "Chapecó, SC", stars: 5, text: "Comprei pro meu pai. Chegou rápido, bem embalada e com todas as ferramentas. Ele adorou.", illustrative: true },
    { name: "Roberto Alves", city: "Rio Verde, GO", stars: 5, text: "Uso na fazenda pra limpar cerca e cortar lenha. A corrente vem bem afiada e a lubrificação automática ajuda demais.", illustrative: true },
    { name: "Márcio Souza", city: "Feira de Santana, BA", stars: 4, text: "Boa motosserra, potente. Só achei um pouco pesada no começo, depois acostuma.", illustrative: true },
    { name: "Paulo Ricardo", city: "Londrina, PR", stars: 5, text: "Já tinha uma elétrica que vivia esquentando. Essa a gasolina é outro nível, dá pra trabalhar longe de tomada.", illustrative: true },
    { name: "Edson Lima", city: "Petrolina, PE", stars: 5, text: "Kit completo, manual em português e o frasco de mistura ajuda muito. Recomendo.", illustrative: true }
  ]
};
