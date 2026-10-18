# Bruttus Ferramentas — Loja Black Friday (Motosserra 52CC)

Funil de produto único baseado na estrutura da MarmoreFlex, com o conteúdo da motosserra (Lojas Vessari) e identidade preto + amarelo.

## Estrutura
```
index.html        Página do produto (funil)
politicas.html    Garantia, troca, reembolso, privacidade, termos, contato, rastreio (MODELOS — revisar)
banners.html      Gerador de banners (HTML → PNG)
brand/            logo.svg, favicon.svg e index.html (manual da marca)
css/styles.css    Todo o visual (tokens de cor no topo)
js/config.js      ⭐ TUDO que você edita no dia a dia: preços, ofertas, links de checkout, FAQ, avaliações, data da campanha
js/app.js         Monta a página a partir do config (galeria, ofertas, contagem, avaliações...)
images/produto/   Fotos originais do produto
images/banners/   Banners gerados (capa, banner principal, confiança, story, hero desktop)
```

## Ordem do funil (igual ao validado)
Barra de contagem → header → galeria + caixa de compra (ofertas, preço, 12x, Pix, frete, garantias, CTA)
→ 4 benefícios → descrição em banners → comparativo → especificações → o que vem na caixa → selo de garantia
→ banner de confiança → pagamento seguro → avaliações → FAQ → selos → rodapé + barra fixa de compra (mobile).

## Antes de subir
1. `js/config.js`: colocar os **links de checkout** (`checkoutUrl`) de cada oferta e revisar os preços das ofertas 2 e 3 (só a de 1 unidade veio do site original).
2. Preencher razão social, CNPJ, endereço e e-mail (`brand` no config) e revisar `politicas.html`.
3. Trocar as **avaliações ilustrativas** por avaliações reais (com foto, se possível) e `illustrative: false`.
4. Colar os pixels no `<head>` do `index.html` (bloco "PIXELS").
5. `offerEndsAt` define o fim da campanha (contagem regressiva).

## Banners
Abra `banners.html` com o servidor local rodando e clique em **Salvar no site** (atualiza `images/banners/`) ou **Baixar PNG**.
Para editar um banner, altere o HTML dele em `banners.html` e salve de novo.
