# Bruttus Ferramentas — Loja Black Friday (Motosserra 52CC)

Funil de produto único baseado na estrutura da MarmoreFlex, com o conteúdo da motosserra (Lojas Vessari) e identidade preto + amarelo.
Publicado na Vercel a partir da raiz deste repositório (sem build).

## Estrutura
```
index.html        Página do produto (funil)
politicas.html    Garantia, troca, reembolso, privacidade, termos, contato, rastreio (MODELOS — revisar)
banners.html      Gerador de banners (HTML → PNG)
brand/            logo.svg, favicon.svg e index.html (manual da marca)
css/styles.css    Visual base (tokens de cor no topo)
css/v2.css        Componentes novos: botão compra segura, seleção, avaliações, modais, animações
js/config.js      ⭐ TUDO que você edita no dia a dia: preços, ofertas, checkout, segurança, cupom, vídeos, FAQ, avaliações
js/app.js         Monta a página a partir do config
images/produto/   Fotos originais do produto
images/banners/   Banners gerados (capa, banner principal, confiança, story, hero desktop)
tools/serve.ps1   Servidor local (preview + "Salvar no site" dos banners). Não vai para a Vercel.
```

## Ordem do funil
Barra de contagem → header (botão Compra segura) → galeria + caixa de compra (ofertas 1/2/3 com -60%, economia,
seleção confirmada, preço, 12x, Pix, frete, CTA) → 4 benefícios → descrição em banners (clique amplia com navegação)
→ comparativo → especificações → caixa → garantia → banner de confiança → pagamento seguro
→ avaliações (vídeos, resumo com filtro por estrela, escrever avaliação, busca, ordenação, ver mais) → FAQ → selos → rodapé.

## Preços (Black Friday 60% OFF)
| Oferta | Por | De (preço ÷ 0,4) | Economia | 12x |
|---|---|---|---|---|
| 1 Motosserra | R$ 189,90 | R$ 474,75 | R$ 284,85 | R$ 19,24 |
| 2 Motosserras | R$ 297,90 | R$ 744,75 | R$ 446,85 | R$ 30,19 |
| 3 Motosserras | R$ 379,90 | R$ 949,75 | R$ 569,85 | R$ 38,50 |

## Avaliações
- `reviews` no config: troque as ilustrativas por reais (`illustrative: false`, `photo` opcional em `images/avaliacoes/`).
- "Escrever uma avaliação" publica só na tela de quem escreveu: não salva e some ao atualizar (igual à MarmoreFlex).
- `videos`: adicione mp4 verticais para ativar a seção de depoimentos em vídeo.

## Antes de subir
1. `checkoutUrl` de cada oferta.
2. `brand`: razão social, CNPJ, endereço, e-mail. Revisar `politicas.html`.
3. `security.items`: confirmar com o gateway (PCI DSS, tokenização, antifraude) — o popup afirma isso ao cliente.
4. `exitCoupon.enabled: true` só depois de criar o cupom no checkout.
5. Pixels no `<head>` do `index.html` (bloco "PIXELS").
6. `offerEndsAt` define o fim da campanha.

## Banners
Rode o servidor local, abra `banners.html` e clique em **Salvar no site** (atualiza `images/banners/`) ou **Baixar PNG**.
