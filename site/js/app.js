/* =====================================================================
   BRUTTUS — monta a página a partir de window.STORE (config.js)
   ===================================================================== */
(function () {
  const S = window.STORE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const brl = (cents) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = (name) => `<svg class="icon"><use href="#i-${name}"/></svg>`;
  const setAll = (sel, val, prop = "textContent") => $$(sel).forEach((el) => (el[prop] = val));

  /* ---------- Textos básicos ---------- */
  setAll("[data-title]", S.product.title);
  setAll("[data-sticky-title]", S.product.shortTitle);
  setAll("[data-sold]", S.product.soldCount);
  setAll("[data-hours]", S.brand.hours);
  setAll("[data-legal-name]", S.brand.legalName);
  setAll("[data-cnpj]", S.brand.cnpj);
  setAll("[data-address]", S.brand.address);
  setAll("[data-year]", new Date().getFullYear());
  $$("[data-email]").forEach((a) => { a.textContent = S.brand.email; a.href = "mailto:" + S.brand.email; });

  /* ---------- Galeria ---------- */
  const track = $("[data-gallery-track]");
  const thumbs = $("[data-gallery-thumbs]");
  const counter = $("[data-gallery-counter]");
  const imgs = S.product.images;
  track.innerHTML = imgs.map((im, i) =>
    `<img src="${im.src}" alt="${esc(im.alt)}" width="800" height="800" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} data-index="${i}">`).join("");
  thumbs.innerHTML = imgs.map((im, i) =>
    `<button aria-label="Ver foto ${i + 1}" data-thumb="${i}"><img src="${im.src}" alt="" loading="lazy"></button>`).join("");
  let current = 0;
  const goTo = (i) => {
    current = (i + imgs.length) % imgs.length;
    track.scrollTo({ left: track.clientWidth * current, behavior: "smooth" });
  };
  const syncUI = () => {
    counter.textContent = `${current + 1} / ${imgs.length}`;
    $$("[data-thumb]").forEach((b, i) => b.classList.toggle("active", i === current));
    const active = $(`[data-thumb="${current}"]`);
    if (active) thumbs.scrollTo({ left: active.offsetLeft - thumbs.clientWidth / 2 + 32, behavior: "smooth" });
  };
  track.addEventListener("scroll", () => {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== current) { current = i; syncUI(); }
  }, { passive: true });
  $("[data-gallery-prev]").onclick = () => goTo(current - 1);
  $("[data-gallery-next]").onclick = () => goTo(current + 1);
  thumbs.addEventListener("click", (e) => { const b = e.target.closest("[data-thumb]"); if (b) goTo(+b.dataset.thumb); });
  syncUI();

  // Lightbox
  const lb = $("[data-lightbox]");
  track.addEventListener("click", (e) => {
    const im = e.target.closest("img"); if (!im) return;
    $("img", lb).src = im.src; $("img", lb).alt = im.alt; lb.classList.add("open");
  });
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.closest("[data-close-lightbox]")) lb.classList.remove("open"); });

  /* ---------- Ofertas e preço ---------- */
  const offersEl = $("[data-offers]");
  offersEl.innerHTML = S.offers.map((o) => `
    <button class="offer" role="radio" data-offer="${o.id}">
      ${o.badge ? `<span class="o-badge">${esc(o.badge)}</span>` : ""}
      <span class="radio"></span>
      <span><strong>${esc(o.label)}</strong><small>${esc(o.detail)}</small></span>
      <span class="o-price"><s>${brl(o.compareAt)}</s>${brl(o.price)}</span>
    </button>`).join("");

  const selectOffer = (id) => {
    const o = S.offers.find((x) => x.id === id) || S.offers[0];
    $$("[data-offer]").forEach((b) => {
      const on = b.dataset.offer === o.id;
      b.classList.toggle("selected", on);
      b.setAttribute("aria-checked", on);
    });
    const off = Math.round((1 - o.price / o.compareAt) * 100);
    const inst = (o.price * S.installmentRate) / S.installments;
    setAll("[data-price]", brl(o.price));
    setAll("[data-pix]", brl(o.price));
    setAll("[data-sticky-price]", brl(o.price));
    setAll("[data-compare]", brl(o.compareAt));
    setAll("[data-off]", `↓ ${off}%`);
    setAll("[data-inst-n]", S.installments);
    setAll("[data-inst]", brl(Math.round(inst)));
    $$("[data-buy]").forEach((a) => (a.href = o.checkoutUrl));
  };
  offersEl.addEventListener("click", (e) => { const b = e.target.closest("[data-offer]"); if (b) selectOffer(b.dataset.offer); });
  selectOffer(S.defaultOffer);

  // Maior desconto (selo da galeria / banner)
  const base = S.offers.find((x) => x.id === S.defaultOffer) || S.offers[0];
  const baseOff = Math.round((1 - base.price / base.compareAt) * 100) + "%";
  setAll("[data-off-badge]", "-" + baseOff);
  setAll("[data-off-num]", baseOff);

  /* ---------- Listas ---------- */
  $("[data-highlights]").innerHTML = S.highlights.map((h) => `<li>${icon("check")}<span>${esc(h)}</span></li>`).join("");
  $("[data-features]").innerHTML = S.features.map((f) =>
    `<div class="feature"><div class="f-icon">${icon(f.icon)}</div><div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div></div>`).join("");
  $("[data-specs]").innerHTML = "<tbody>" + S.specs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("") + "</tbody>";
  $("[data-box]").innerHTML = S.boxContents.map((b) => `<li>${icon("box")}${esc(b)}</li>`).join("");
  $("[data-faq]").innerHTML = S.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");

  /* ---------- Avaliações (resumo calculado da lista) ---------- */
  const R = S.reviews;
  const avg = R.length ? R.reduce((s, r) => s + r.stars, 0) / R.length : 0;
  const starStr = (n) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));
  setAll("[data-avg]", avg.toFixed(1).replace(".", ","));
  setAll("[data-avg-stars]", starStr(avg));
  setAll("[data-review-count]", R.length);
  $("[data-rating-bars]").innerHTML = [5, 4, 3, 2, 1].map((n) => {
    const c = R.filter((r) => r.stars === n).length;
    return `<div class="row"><span>${n}★</span><span class="bar"><i style="width:${R.length ? (c / R.length) * 100 : 0}%"></i></span><span class="muted">${c}</span></div>`;
  }).join("");
  $("[data-reviews]").innerHTML = R.map((r) => `
    <article class="review">
      <div class="review-head">
        <span class="avatar">${esc(r.name[0])}</span>
        <div><b>${esc(r.name)}</b><small>${esc(r.city)}</small></div>
        <span class="tag">${r.illustrative ? "Avaliação ilustrativa" : "Compra verificada"}</span>
      </div>
      <div class="stars" style="margin-top:8px">${starStr(r.stars)}</div>
      <p>${esc(r.text)}</p>
      ${r.photo ? `<img src="${r.photo}" alt="Foto enviada por ${esc(r.name)}" loading="lazy" style="border-radius:10px;margin-top:10px">` : ""}
    </article>`).join("");

  /* ---------- Contagem regressiva ---------- */
  setAll("[data-campaign]", S.campaignLabel);
  const end = new Date(S.offerEndsAt).getTime();
  const pad = (n) => String(n).padStart(2, "0");
  const boxes = $$("[data-countdown]");
  boxes.forEach((b) => (b.innerHTML = ["Dias", "Horas", "Min", "Seg"].map((l) => `<div><b>00</b><small>${l}</small></div>`).join("")));
  const tick = () => {
    const ms = Math.max(0, end - Date.now());
    const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
    setAll("[data-countdown-inline]", `${pad(d)}d ${pad(h)}:${pad(m)}:${pad(s)}`);
    boxes.forEach((b) => $$("b", b).forEach((el, i) => (el.textContent = pad([d, h, m, s][i]))));
  };
  tick(); setInterval(tick, 1000);

  /* ---------- Menu lateral ---------- */
  const drawer = $("[data-drawer]");
  const toggleDrawer = (open) => { drawer.classList.toggle("open", open); drawer.setAttribute("aria-hidden", !open); };
  $$("[data-open-drawer]").forEach((b) => (b.onclick = () => toggleDrawer(true)));
  $$("[data-close-drawer]").forEach((b) => b.addEventListener("click", () => toggleDrawer(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { toggleDrawer(false); lb.classList.remove("open"); } });

  /* ---------- Barra fixa de compra ---------- */
  const sticky = $("[data-sticky]");
  const mainBuy = $(".buybox [data-buy]");
  new IntersectionObserver(([e]) => sticky.classList.toggle("show", !e.isIntersecting && e.boundingClientRect.top < 0))
    .observe(mainBuy);
})();
