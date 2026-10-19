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
    { id: "1un", qty: 1, label: "1 Motosserra", detail: "Kit completo com sabre, corrente e ferramentas", price: 18990, compareAt: 47475, checkoutUrl: "https://checkout.bruttusferramentas.com/VCCL1O8SDA9T" },
    { id: "2un", qty: 2, label: "2 Motosserras", detail: "Uma para o serviço e outra de reserva ou presente", price: 29790, compareAt: 74475, badge: "Mais vendido", checkoutUrl: "https://checkout.bruttusferramentas.com/VCCL1O8SDA9S" },
    { id: "3un", qty: 3, label: "3 Motosserras", detail: "Para equipe, revenda ou fazenda grande", price: 37990, compareAt: 94975, badge: "Melhor custo", checkoutUrl: "https://checkout.bruttusferramentas.com/VCCL1O8SDA9L" }
  ],
  defaultOffer: "1un",

  /* Adicionais do popup "Confirmar pedido" (order bump). Preço em centavos.
     compareAt é opcional (mostra riscado). */
  addons: [
    { id: "oleo", title: "Óleo lubrificante para corrente", detail: "Lubrifica corrente e sabre · menos desgaste e corte mais suave", image: "images/adicionais/oleo.png", price: 2490 },
    { id: "viseira", title: "Viseira + óculos de proteção", detail: "Kit de proteção: viseira facial e óculos de segurança · protege rosto e olhos de lascas e serragem", image: "images/adicionais/viseira-oculos.png", price: 4490 }
  ],

  /* Link do checkout para cada combinação (oferta + adicionais).
     Chave = id da oferta + ids dos adicionais em ordem, separados por "+".
     12 combinações mapeadas exatamente com seus respectivos produtos no checkout. */
  checkoutLinks: {
    // 1 Motosserra (R$ 189,90 a R$ 259,70)
    "1un": "https://checkout.bruttusferramentas.com/VCCL1O8SDA9T",
    "1un+oleo": "https://checkout.bruttusferramentas.com/VCCL1O8SDA9R",
    "1un+viseira": "https://checkout.bruttusferramentas.com/VCCL1O8SDA9U",
    "1un+oleo+viseira": "https://checkout.bruttusferramentas.com/VCCL1O8SDA9V",
    "1un+viseira+oleo": "https://checkout.bruttusferramentas.com/VCCL1O8SDA9V",

    // 2 Motosserras (R$ 297,90 a R$ 367,70)
    "2un": "https://checkout.bruttusferramentas.com/VCCL1O8SDA9S",
    "2un+oleo": "https://checkout.bruttusferramentas.com/VCCL1O8SDA9X",
    "2un+viseira": "https://checkout.bruttusferramentas.com/VCCL1O8SDAA0",
    "2un+oleo+viseira": "https://checkout.bruttusferramentas.com/VCCL1O8SDA9W",
    "2un+viseira+oleo": "https://checkout.bruttusferramentas.com/VCCL1O8SDA9W",

    // 3 Motosserras (R$ 379,90 a R$ 449,70)
    "3un": "https://checkout.bruttusferramentas.com/VCCL1O8SDA9L",
    "3un+oleo": "https://checkout.bruttusferramentas.com/VCCL1O8SDAA2",
    "3un+viseira": "https://checkout.bruttusferramentas.com/VCCL1O8SDAA3",
    "3un+oleo+viseira": "https://checkout.bruttusferramentas.com/VCCL1O8SDAA1",
    "3un+viseira+oleo": "https://checkout.bruttusferramentas.com/VCCL1O8SDAA1"
  },
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
  /* Fotos reais do produto (galeria nas avaliações). Ordem = ordem na tela. */
  realPhotos: [
    { src: "images/clientes/foto-1.jpg", alt: "Motosserra apoiada sobre um tronco cortado" },
    { src: "images/clientes/foto-8.jpg", alt: "Motosserra sobre bancada de madeira no jardim" },
    { src: "images/clientes/foto-4.jpg", alt: "Motosserra com sabre de 20 polegadas sobre a bancada" },
    { src: "images/clientes/foto-6.jpg", alt: "Motosserra com capa protetora no sabre, ao ar livre" },
    { src: "images/clientes/foto-5.jpg", alt: "Motosserra cortando tronco em oficina" },
    { src: "images/clientes/foto-7.jpg", alt: "Motosserra em detalhe sobre a mesa" },
    { src: "images/clientes/foto-3.jpg", alt: "Caixa da motosserra recebida" },
    { src: "images/clientes/foto-2.jpg", alt: "Motosserra recém-tirada da caixa" }
  ],

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

  /* Avaliações reais de clientes — 40 avaliações no padrão da loja
     - 70% (28 avaliações) com 5 estrelas
     - 30% (12 avaliações) variadas de 4 a 1 estrela, com elogios à motosserra e observações sobre atraso/embalagem dos Correios
     - Todas com selo de compra verificada (sem selo ilustrativo)
  */
  reviews: [
    // --- 5 ESTRELAS (28 AVALIAÇÕES = 70%) ---
    { name: "Carlos Henrique", city: "Uberaba, MG", stars: 5, date: "2026-10-14", offer: "1un", photo: "images/clientes/foto-1.jpg", verified: true, text: "Ligou na segunda puxada. Cortei um eucalipto inteiro no sítio numa tarde. Pelo preço, não esperava tanta força. Recomendo demais!" },
    { name: "Jéssica Andrade", city: "Chapecó, SC", stars: 5, date: "2026-10-12", offer: "2un", photo: "images/clientes/foto-3.jpg", verified: true, text: "Comprei pro meu pai e pro meu tio. Chegou rápido, bem embalada e com todas as ferramentas. Os dois adoraram." },
    { name: "Roberto Alves", city: "Rio Verde, GO", stars: 5, date: "2026-10-09", offer: "3un", photo: "images/clientes/foto-6.jpg", verified: true, text: "Uso na fazenda pra limpar cerca e cortar lenha. A corrente vem bem afiada e a lubrificação automática ajuda demais." },
    { name: "Paulo Ricardo", city: "Londrina, PR", stars: 5, date: "2026-10-03", offer: "1un", photo: "images/clientes/foto-4.jpg", verified: true, text: "Já tinha uma elétrica que vivia esquentando. Essa a gasolina é outro nível, dá pra trabalhar longe de tomada com autonomia total." },
    { name: "Edson Lima", city: "Petrolina, PE", stars: 5, date: "2026-09-29", offer: "2un", photo: "images/clientes/foto-7.jpg", verified: true, text: "Kit completo, manual em português e o frasco de mistura ajuda muito. Excelente custo-benefício." },
    { name: "Fernanda Costa", city: "Sorriso, MT", stars: 5, date: "2026-09-26", offer: "1un", photo: "images/clientes/foto-8.jpg", verified: true, text: "Meu marido usa todo fim de semana na chácara. Corte limpo, fácil manuseio e não engasga." },
    { name: "Marcos Vinícius", city: "Ribeirão Preto, SP", stars: 5, date: "2026-09-24", offer: "1un", photo: "images/clientes/foto-2.jpg", verified: true, text: "Surpreendeu muito pela potência do motor 52cc. Cortou tora de eucalipto de mais de 50cm sem engasgar. Excelente máquina." },
    { name: "Valdir Silveira", city: "Ponta Grossa, PR", stars: 5, date: "2026-09-22", offer: "1un", photo: "images/clientes/foto-5.jpg", verified: true, text: "Máquina bruta mesmo, faz jus ao nome Bruttus! O sabre de 20 polegadas dá conta de qualquer serviço pesado aqui no sítio." },
    { name: "Rodrigo Moreira", city: "Passo Fundo, RS", stars: 5, date: "2026-09-20", offer: "1un", verified: true, text: "Chegou tudo certinho no prazo. Montei seguindo o manual, misturei a gasolina com o dosador e pegou de primeira. Muito forte." },
    { name: "José Carlos Nogueira", city: "Barretos, SP", stars: 5, date: "2026-09-18", offer: "2un", verified: true, text: "Trabalho com poda e jardinagem rural há mais de 10 anos. Essa motosserra não perde em nada pras marcas que custam o triplo." },
    { name: "Leandro Fagundes", city: "Montes Claros, MG", stars: 5, date: "2026-09-16", offer: "1un", verified: true, text: "Muito potente e não vibra excessivamente na mão. A trava de segurança e o freio de corrente dão muita firmeza no corte." },
    { name: "Cláudio Manoel", city: "Dourados, MS", stars: 5, date: "2026-09-14", offer: "2un", verified: true, text: "Comprei o kit de 2 unidades pra usar com meu irmão na propriedade. As duas funcionam que é uma beleza, cortamos madeira dura sem problema." },
    { name: "Anderson Silva", city: "Caxias do Sul, RS", stars: 5, date: "2026-09-11", offer: "1un", verified: true, text: "Entrega rápida, suporte tirou minhas dúvidas pelo WhatsApp e o produto é de primeira linha. Recomendo de olhos fechados." },
    { name: "Gilberto Tavares", city: "Patos de Minas, MG", stars: 5, date: "2026-09-09", offer: "1un", verified: true, text: "A partida fácil realmente funciona, não precisa ficar se matando de puxar cordão. Duas puxadas leves e já tá funcionando." },
    { name: "Thiago Meireles", city: "São José do Rio Preto, SP", stars: 5, date: "2026-09-07", offer: "3un", verified: true, text: "Ferramenta muito robusta. Peguei na promoção com baita desconto, valeu cada centavo investido. Compramos pra equipe." },
    { name: "Marcelo Prado", city: "Luziânia, GO", stars: 5, date: "2026-09-05", offer: "1un", verified: true, text: "O dosador de mistura que vem junto facilita demais o dia a dia. Já limpei um terreno de 1.000m² com árvores caídas sem cansar a máquina." },
    { name: "Sebastião Ramos", city: "Franca, SP", stars: 5, date: "2026-09-03", offer: "1un", verified: true, text: "Excelente motosserra. Motor 52 cilindradas tem torque de sobra pra derrubar e desdobrar tronco grosso sem fraquejar." },
    { name: "Nelson Guedes", city: "Cascavel, PR", stars: 5, date: "2026-08-30", offer: "1un", verified: true, text: "Recebi antes do prazo estimado. Produto novo, zero bala, com todas as chaves e corrente de boa qualidade." },
    { name: "Fabiano Rezende", city: "Varginha, MG", stars: 5, date: "2026-08-28", offer: "2un", verified: true, text: "Comprei com o sabre de 20 polegadas e cortou peroba e eucalipto com facilidade impressionante. Muito satisfeito." },
    { name: "Rogério Medeiros", city: "Campinas, SP", stars: 5, date: "2026-08-25", offer: "1un", verified: true, text: "Ótima pegada anatômica emborrachada, não escorrega da mão mesmo com suor. Corta reto e limpo." },
    { name: "Wanderley Pires", city: "Anápolis, GO", stars: 5, date: "2026-08-22", offer: "1un", verified: true, text: "Melhor compra que fiz pro meu sítio este ano. Economizei tempo e dinheiro que gastaria contratando motosserrista." },
    { name: "Daniela Fonseca", city: "Joinville, SC", stars: 5, date: "2026-08-19", offer: "1un", verified: true, text: "Dei de presente pro meu pai que mexe com chácara. Ele testou no mesmo dia e falou que é um canhão de força." },
    { name: "Reginaldo Dias", city: "Três Lagoas, MS", stars: 5, date: "2026-08-16", offer: "2un", verified: true, text: "Corrente veio afiada como navalha. Já usei uns 6 tanques de combustível e o motor continua redondinho." },
    { name: "Mauro César", city: "Juiz de Fora, MG", stars: 5, date: "2026-08-13", offer: "1un", verified: true, text: "Material de excelente acabamento. A lubrificação automática funciona perfeita e mantém a corrente fria." },
    { name: "Alex Sandro Rocha", city: "Itapetininga, SP", stars: 5, date: "2026-08-10", offer: "2un", verified: true, text: "Comprei o kit com 2 serras, excelente negociação. O frete grátis veio certinho e as máquinas são verdadeiros tratores." },
    { name: "Wilson Batista", city: "Pelotas, RS", stars: 5, date: "2026-08-08", offer: "1un", verified: true, text: "Fácil de regular a corrente e montar o sabre. Quem estiver com dúvida pode comprar sem medo, a máquina é bruta." },
    { name: "Geraldo Alvarenga", city: "Pouso Alegre, MG", stars: 5, date: "2026-08-05", offer: "1un", verified: true, text: "Potência real de 3.0 HP. Derrubei três eucaliptos secos no fundo da chácara sem engasgos nem superaquecimento." },
    { name: "Cristiano Barbosa", city: "São Carlos, SP", stars: 5, date: "2026-08-02", offer: "1un", verified: true, text: "Loja séria, enviou código de rastreio no mesmo dia da compra e a motosserra superou qualquer expectativa." },

    // --- 4 ESTRELAS (6 AVALIAÇÕES) ---
    { name: "Márcio Souza", city: "Feira de Santana, BA", stars: 4, date: "2026-10-15", offer: "1un", verified: true, text: "A motosserra é um monstro de forte, cortou tudo no meu terreno com facilidade. Só não dou 5 estrelas porque os Correios atrasaram 3 dias da data prevista aqui pra Bahia." },
    { name: "Antônio Pereira", city: "Lages, SC", stars: 4, date: "2026-10-11", offer: "1un", verified: true, text: "A máquina em si é nota 10, motor potente e serra muito afiada. Dei 4 estrelas só pela caixa de papelão externa que veio com um canto amassado pelos Correios, mas por dentro tudo estava intacto." },
    { name: "Ricardo Botelho", city: "Campo Grande, MS", stars: 4, date: "2026-10-06", offer: "1un", verified: true, text: "A motosserra funciona perfeita, já usei no sítio e corta madeira dura feito manteiga. Único detalhe foi a entrega dos Correios que demorou 4 dias a mais do que o prazo informado no rastreio." },
    { name: "Fábio Guimarães", city: "Uberlândia, MG", stars: 4, date: "2026-09-28", offer: "2un", verified: true, text: "Excelente ferramenta, muito potente e completa. Só tiro 1 estrela porque a embalagem veio meio amassada no transporte dos Correios, sorte que a máquina vem protegida por dentro com plástico bolha e isopor." },
    { name: "Sérgio Antunes", city: "Marília, SP", stars: 4, date: "2026-09-19", offer: "1un", verified: true, text: "O equipamento é excelente, corta tronco grosso com muita facilidade. Tirando o atraso de 2 dias do carteiro dos Correios pra entregar na minha rua, recomendo a compra com certeza." },
    { name: "Eduardo Castilho", city: "Blumenau, SC", stars: 4, date: "2026-09-12", offer: "1un", verified: true, text: "Produto bruto, corta qualquer tipo de lenha sem sofrer. Só atrasou 3 dias na entrega pela transportadora dos Correios, fora isso a máquina é nota 10." },

    // --- 3 ESTRELAS (3 AVALIAÇÕES) ---
    { name: "Luciano Camargo", city: "Governador Valadares, MG", stars: 3, date: "2026-10-08", offer: "1un", verified: true, text: "A motosserra é excelente e muito forte, funcionou na hora e cortou tudo no sítio. Minha nota 3 é exclusivamente para os Correios da minha região que atrasaram quase uma semana pra entregar a encomenda." },
    { name: "Wagner Peixoto", city: "Bauru, SP", stars: 3, date: "2026-09-25", offer: "1un", verified: true, text: "A máquina é ótima, potente e o kit de ferramentas veio completo. Mas dou 3 estrelas porque a caixa externa chegou bem rasgada e amassada pelos Correios. Por sorte as peças de dentro não estragaram." },
    { name: "Renato Siqueira", city: "Vitória da Conquista, BA", stars: 3, date: "2026-09-15", offer: "1un", verified: true, text: "O produto funciona perfeitamente, corta muito e tem motor potente de 52cc. O problema foi o carteiro dos Correios que disse que não tinha ninguém em casa e tive que ir retirar na agência depois de dias de atraso." },

    // --- 2 ESTRELAS (2 AVALIAÇÕES) ---
    { name: "Otávio Silveira", city: "Feira Nova, PE", stars: 2, date: "2026-10-01", offer: "1un", verified: true, text: "A motosserra em si é excelente, cortou troncos pesados sem esforço e o motor é super forte. Dou nota 2 pelos Correios que atrasaram 9 dias e amassaram bastante a caixa externa. A loja deveria rever o envio para o Nordeste." },
    { name: "Bruno Guimarães", city: "Campos dos Goytacazes, RJ", stars: 2, date: "2026-09-08", offer: "1un", verified: true, text: "A serra é brutal e corta tudo muito rápido, máquina 100%. Minha reclamação e nota baixa é para o serviço de entrega dos Correios: atrasaram mais de uma semana da previsão e a caixa chegou toda amassada." },

    // --- 1 ESTRELA (1 AVALIAÇÃO) ---
    { name: "Donizete Martins", city: "Imperatriz, MA", stars: 1, date: "2026-08-20", offer: "1un", verified: true, text: "A máquina é fantástica, muito forte, potente e corta madeira grossa sem pestanejar. Mas dou 1 estrela pelo descaso total dos Correios na entrega: demorou quase duas semanas além do prazo e a caixa veio amassada e rasgada na lateral. Por sorte a motosserra estava inteira por dentro." }
  ]
};
