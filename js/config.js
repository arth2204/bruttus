/* =====================================================================
   BRUTTUS — CONFIGURAÇÃO DA LOJA
   Tudo que muda com frequência (preço, checkout, textos, FAQ, avaliações)
   fica aqui. O app.js lê este arquivo e monta a página.
   ===================================================================== */
window.STORE = {
  brand: {
    name: "Bruttus",
    // Dados do Comprovante de Inscrição e Situação Cadastral (Receita Federal)
    legalName: "FERNANDO BARBOSA GABRIEL E CIA LTDA",
    cnpj: "04.316.293/0001-71",
    openedAt: "2001-02-20",
    status: "Ativa",
    legalNature: "Sociedade Empresária Limitada",
    activity: "Comércio e manutenção de máquinas e equipamentos agropecuários",
    address: "Av. Paulo Ribeiro do Valle, 1140 — Japy, Guaxupé/MG · CEP 37836-680",
    phone: "(35) 3551-2290",
    email: "contato@bruttus.com.br",           // TODO: confirmar se este e-mail existe
    hours: "Seg à Sex: 9h–18h · Sáb: 9h–13h"
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
     Desconto de Black Friday: 60% → compareAt = price / 0,4
       189,90 / 0,4 = 474,75 · 297,90 / 0,4 = 744,75 · 379,90 / 0,4 = 949,75 */
  discountPercent: 60,
  offers: [
    { id: "1un", qty: 1, label: "1 Motosserra", detail: "Kit completo com sabre, corrente e ferramentas", price: 18990, compareAt: 47475, checkoutUrl: "#checkout-1un" },
    { id: "2un", qty: 2, label: "2 Motosserras", detail: "Uma para o serviço e outra de reserva ou presente", price: 29790, compareAt: 74475, badge: "Mais vendido", checkoutUrl: "#checkout-2un" },
    { id: "3un", qty: 3, label: "3 Motosserras", detail: "Para equipe, revenda ou fazenda grande", price: 37990, compareAt: 94975, badge: "Melhor custo", checkoutUrl: "#checkout-3un" }
  ],
  defaultOffer: "1un",
  installments: 12,           // parcelas exibidas
  installmentRate: 1.2161,    // fator total das 12x (taxa do funil original). R$ 189,90 → 12x R$ 19,24

  /* Popup "Compra segura" (botão do escudo no topo).
     ⚠️ Confirme cada item com a sua plataforma de checkout/gateway antes de publicar. */
  security: {
    intro: "Seus dados e seu pagamento são protegidos por camadas de segurança em todas as etapas da compra.",
    items: [
      { icon: "lock", title: "Criptografia TLS 1.3 (HTTPS)", text: "Toda a comunicação entre o seu navegador e a loja é criptografada ponta a ponta com chave de 256 bits (AES-256-GCM). Ninguém consegue ler os dados no caminho." },
      { icon: "card", title: "Pagamento em ambiente PCI DSS", text: "O pagamento é processado pelo gateway em ambiente certificado PCI DSS, o padrão internacional de segurança de cartões. Não armazenamos o número do seu cartão." },
      { icon: "key", title: "Tokenização do cartão", text: "Os dados do cartão são convertidos em um token criptografado no momento do pagamento. O número real nunca trafega pelos nossos servidores." },
      { icon: "scan", title: "Análise antifraude", text: "Cada transação passa por verificação automática de risco para proteger você contra uso indevido do cartão." },
      { icon: "shield", title: "LGPD — Lei 13.709/2018", text: "Coletamos apenas os dados necessários para entregar seu pedido. Você pode pedir acesso, correção ou exclusão a qualquer momento." },
      { icon: "refresh", title: "Código de Defesa do Consumidor", text: "Direito de arrependimento de 7 dias após o recebimento (art. 49) e garantia de 1 ano contra defeitos de fabricação." }
    ]
  },

  /* Popup de cupom ao tentar sair da página (desktop) ou após 40s (celular).
     ⚠️ Só ative depois de criar o cupom no checkout. */
  exitCoupon: { enabled: false, code: "BRUTTUS10", percent: 10, minutes: 10 },

  /* Depoimentos em vídeo (mp4 vertical). Vazio = seção escondida.
     Ex.: { src: "media/depoimento-1.mp4", poster: "media/poster-1.jpg", name: "João", city: "Goiânia - GO" } */
  videos: [],

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
     calculado a partir desta lista.
     Campos: name, city, stars (1–5), text, date (AAAA-MM-DD), offer (id da oferta),
     photo (opcional, ex.: "images/avaliacoes/joao.jpg"), illustrative (true/false). */
  reviews: [
    { name: "Carlos Henrique", city: "Uberaba, MG", stars: 5, date: "2026-10-14", offer: "1un", text: "Ligou na segunda puxada. Cortei um eucalipto inteiro no sítio numa tarde. Pelo preço, não esperava tanta força.", illustrative: true },
    { name: "Jéssica Andrade", city: "Chapecó, SC", stars: 5, date: "2026-10-12", offer: "2un", text: "Comprei pro meu pai e pro meu tio. Chegou rápido, bem embalada e com todas as ferramentas. Os dois adoraram.", illustrative: true },
    { name: "Roberto Alves", city: "Rio Verde, GO", stars: 5, date: "2026-10-09", offer: "3un", text: "Uso na fazenda pra limpar cerca e cortar lenha. A corrente vem bem afiada e a lubrificação automática ajuda demais.", illustrative: true },
    { name: "Márcio Souza", city: "Feira de Santana, BA", stars: 4, date: "2026-10-07", offer: "1un", text: "Boa motosserra, potente. Só achei um pouco pesada no começo, depois acostuma.", illustrative: true },
    { name: "Paulo Ricardo", city: "Londrina, PR", stars: 5, date: "2026-10-03", offer: "1un", text: "Já tinha uma elétrica que vivia esquentando. Essa a gasolina é outro nível, dá pra trabalhar longe de tomada.", illustrative: true },
    { name: "Edson Lima", city: "Petrolina, PE", stars: 5, date: "2026-09-29", offer: "2un", text: "Kit completo, manual em português e o frasco de mistura ajuda muito. Recomendo.", illustrative: true },
    { name: "Fernanda Costa", city: "Sorriso, MT", stars: 5, date: "2026-09-26", offer: "1un", text: "Meu marido usa todo fim de semana na chácara. Corte limpo e não engasga.", illustrative: true },
    { name: "Antônio Pereira", city: "Lages, SC", stars: 4, date: "2026-09-21", offer: "1un", text: "Faz o serviço bem. Recomendo ler o manual da mistura antes de usar a primeira vez.", illustrative: true }
  ]
};
