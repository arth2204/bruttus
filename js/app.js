/* =====================================================================
   BRUTTUS — monta a página a partir de window.STORE (config.js)
   Seções: utilitários · textos · galeria/lightbox · ofertas · listas ·
   segurança · avaliações · vídeos · contagem · menu · barra fixa ·
   animação de entrada · cupom de saída
   ===================================================================== */
(function () {
  const S = window.STORE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const brl = (cents) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = (name) => `<svg class="icon"><use href="#i-${name}"/></svg>`;
  const setAll = (sel, val, prop = "textContent") => $$(sel).forEach((el) => (el[prop] = val));
  const offerById = (id) => S.offers.find((o) => o.id === id);
  const pctOff = (o) => Math.round((1 - o.price / o.compareAt) * 100);
  const store = { // localStorage pode falhar (aba anônima etc.)
    get: (k) => { try { return sessionStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch {} }
  };

  /* ---------- Textos básicos ---------- */
  setAll("[data-title]", S.product.title);
  setAll("[data-sticky-title]", S.product.shortTitle);
  setAll("[data-sold]", S.product.soldCount);
  setAll("[data-hours]", S.brand.hours);
  setAll("[data-legal-name]", S.brand.legalName);
  setAll("[data-cnpj]", S.brand.cnpj);
  setAll("[data-address]", S.brand.address);
  setAll("[data-email-text]", S.brand.email);
  setAll("[data-year]", new Date().getFullYear());
  setAll("[data-discount-label]", `${S.discountPercent}% OFF`);
  setAll("[data-off-num]", `${S.discountPercent}%`);
  $$("[data-email]").forEach((a) => { a.textContent = S.brand.email; a.href = "mailto:" + S.brand.email; });

  /* ---------- Modais (abrir/fechar genérico) ---------- */
  let lastFocus = null;
  const openModal = (m) => {
    lastFocus = document.activeElement;
    m.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => m.classList.add("open"));
    ($("[data-close-modal].modal-x", m) || m).focus?.();
  };
  const closeModal = (m) => {
    m.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => (m.hidden = true), 200);
    lastFocus?.focus?.();
  };
  $$(".modal").forEach((m) => m.addEventListener("click", (e) => { if (e.target.closest("[data-close-modal]")) closeModal(m); }));

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

  /* ---------- Lightbox com navegação (galeria + imagens da descrição) ---------- */
  const lb = $("[data-lightbox]");
  const lbImg = $("img", lb);
  let lbList = [], lbIndex = 0;
  const lbShow = () => {
    const im = lbList[lbIndex];
    lbImg.src = im.src; lbImg.alt = im.alt;
    $("[data-lb-counter]").textContent = `${lbIndex + 1} / ${lbList.length}`;
    $$("[data-lb-prev],[data-lb-next],[data-lb-counter]", lb).forEach((b) => (b.hidden = lbList.length < 2));
  };
  const lbOpen = (list, i) => { lbList = list; lbIndex = i; lbShow(); lb.classList.add("open"); document.body.style.overflow = "hidden"; };
  const lbClose = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  const lbStep = (d) => { lbIndex = (lbIndex + d + lbList.length) % lbList.length; lbShow(); };
  track.addEventListener("click", (e) => {
    const im = e.target.closest("img"); if (im) lbOpen(imgs, +im.dataset.index);
  });
  const descImgs = $$("#descricao .desc-img");
  descImgs.forEach((im, i) => {
    im.tabIndex = 0; im.setAttribute("role", "button"); im.title = "Clique para ampliar";
    const open = () => lbOpen(descImgs.map((d) => ({ src: d.currentSrc || d.src, alt: d.alt })), i);
    im.addEventListener("click", open);
    im.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });
  });
  $("[data-lb-prev]").onclick = (e) => { e.stopPropagation(); lbStep(-1); };
  $("[data-lb-next]").onclick = (e) => { e.stopPropagation(); lbStep(1); };
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.closest("[data-close-lightbox]")) lbClose(); });
  let touchX = null;
  lb.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX; touchX = null;
    if (Math.abs(dx) > 50) lbStep(dx < 0 ? 1 : -1);
  });

  /* ---------- Ofertas e preço ---------- */
  const offersEl = $("[data-offers]");
  offersEl.innerHTML = S.offers.map((o) => {
    const unit = o.qty > 1 ? `<small class="o-unit">${brl(Math.round(o.price / o.qty))} cada</small>` : "";
    return `
    <button class="offer" type="button" role="radio" data-offer="${o.id}">
      ${o.badge ? `<span class="o-badge">${esc(o.badge)}</span>` : ""}
      <span class="radio"></span>
      <span class="o-main"><strong>${esc(o.label)} <em class="o-off">-${pctOff(o)}%</em></strong><small>${esc(o.detail)}</small>
        <small class="o-save">Economize ${brl(o.compareAt - o.price)}</small></span>
      <span class="o-price"><s>${brl(o.compareAt)}</s>${brl(o.price)}${unit}</span>
    </button>`;
  }).join("");

  const selectOffer = (id, announce) => {
    const o = offerById(id) || S.offers[0];
    $$("[data-offer]").forEach((b) => {
      const on = b.dataset.offer === o.id;
      b.classList.toggle("selected", on);
      b.setAttribute("aria-checked", on);
    });
    const inst = (o.price * S.installmentRate) / S.installments;
    setAll("[data-price]", brl(o.price));
    setAll("[data-pix]", brl(o.price));
    setAll("[data-sticky-price]", brl(o.price));
    setAll("[data-compare]", brl(o.compareAt));
    setAll("[data-off]", `-${pctOff(o)}%`);
    setAll("[data-save]", brl(o.compareAt - o.price));
    setAll("[data-inst-n]", S.installments);
    setAll("[data-inst]", brl(Math.round(inst)));
    $$("[data-buy]").forEach((a) => (a.href = o.checkoutUrl));
    const sel = $("[data-selection]");
    sel.innerHTML = `<span class="sel-thumb"><img src="${imgs[0].src}" alt=""></span>
      <span class="sel-info"><small>Sua seleção</small><b>${esc(o.label)}</b><span>${brl(o.price)} · economia de ${brl(o.compareAt - o.price)}</span></span>
      <span class="sel-check" aria-label="Seleção confirmada">${icon("check")}</span>`;
    if (announce) { sel.classList.remove("pop"); void sel.offsetWidth; sel.classList.add("pop"); }
  };
  offersEl.addEventListener("click", (e) => { const b = e.target.closest("[data-offer]"); if (b) selectOffer(b.dataset.offer, true); });
  selectOffer(S.defaultOffer);

  /* ---------- Listas ---------- */
  $("[data-highlights]").innerHTML = S.highlights.map((h) => `<li>${icon("check")}<span>${esc(h)}</span></li>`).join("");
  $("[data-features]").innerHTML = S.features.map((f) =>
    `<div class="feature"><div class="f-icon">${icon(f.icon)}</div><div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div></div>`).join("");
  $("[data-specs]").innerHTML = "<tbody>" + S.specs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("") + "</tbody>";
  $("[data-box]").innerHTML = S.boxContents.map((b) => `<li>${icon("box")}${esc(b)}</li>`).join("");
  $("[data-faq]").innerHTML = S.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");

  /* ---------- Popup "Compra segura" ---------- */
  const secModal = $("[data-security-modal]");
  setAll("[data-sec-intro]", S.security.intro);
  $("[data-sec-list]").innerHTML = S.security.items.map((it) =>
    `<li><span class="sec-ic">${icon(it.icon)}</span><div><b>${esc(it.title)}</b><p>${esc(it.text)}</p></div></li>`).join("");
  const renderSecStatus = () => {
    // Verificação real do navegador: protocolo e contexto seguro desta página
    const https = location.protocol === "https:";
    const host = location.hostname || "este site";
    $("[data-sec-status]").innerHTML = `
      <div class="${https ? "ok" : "warn"}">${icon(https ? "lock" : "scan")}
        <span><b>${https ? "Conexão segura verificada" : "Ambiente de teste local"}</b>
        <small>${esc(host)} · ${https ? "HTTPS ativo · certificado válido" : "o HTTPS é ativado na publicação"}</small></span></div>`;
  };
  $$("[data-open-security]").forEach((b) => b.addEventListener("click", () => { renderSecStatus(); openModal(secModal); }));

  /* ---------- Avaliações ---------- */
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const fmtDate = (iso) => { const [y, m, d] = iso.split("-").map(Number); return `${d} de ${months[m - 1]}. de ${y}`; };
  const starStr = (n) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));
  const PAGE = 6;
  const reviews = S.reviews.map((r, i) => ({ ...r, _order: i }));
  let shown = PAGE, filterStars = null;

  const renderSummary = () => {
    const R = reviews;
    const avg = R.length ? R.reduce((s, r) => s + r.stars, 0) / R.length : 0;
    setAll("[data-avg]", avg.toFixed(1).replace(".", ","));
    setAll("[data-avg-stars]", starStr(avg));
    setAll("[data-review-count]", R.length);
    setAll("[data-recommend]", Math.round((R.filter((r) => r.stars >= 4).length / (R.length || 1)) * 100) + "%");
    $("[data-rating-bars]").innerHTML = [5, 4, 3, 2, 1].map((n) => {
      const c = R.filter((r) => r.stars === n).length;
      return `<button type="button" class="row${filterStars === n ? " active" : ""}" data-filter-stars="${n}" aria-label="Filtrar avaliações de ${n} estrelas">
        <span>${n}★</span><span class="bar"><i style="width:${R.length ? (c / R.length) * 100 : 0}%"></i></span><span class="muted">${c}</span></button>`;
    }).join("");
  };
  const reviewCard = (r) => {
    const offer = offerById(r.offer);
    const tag = r.mine ? "Sua avaliação" : r.illustrative ? "Avaliação ilustrativa" : "Compra verificada";
    return `
    <article class="review${r.mine ? " mine" : ""}">
      <div class="review-head">
        <span class="avatar">${esc(r.name.trim()[0] || "?").toUpperCase()}</span>
        <div><b>${esc(r.name)}</b><small>${esc(r.city)}</small></div>
        <span class="tag${!r.illustrative && !r.mine ? " ok" : ""}">${!r.illustrative && !r.mine ? icon("badge") : ""}${tag}</span>
      </div>
      <div class="stars" style="margin-top:8px" aria-label="${r.stars} de 5 estrelas">${starStr(r.stars)}</div>
      <p>${esc(r.text)}</p>
      ${r.photo ? `<button type="button" class="review-photo" data-review-photo="${esc(r.photo)}"><img src="${esc(r.photo)}" alt="Foto enviada por ${esc(r.name)}" loading="lazy"></button>` : ""}
      <div class="review-foot">${offer ? `<span class="chip">${esc(offer.label)}</span>` : "<span></span>"}<small class="muted">${r.date ? fmtDate(r.date) : ""}</small></div>
    </article>`;
  };
  const renderReviews = () => {
    const q = ($("[data-review-search]").value || "").trim().toLocaleLowerCase("pt-BR");
    const sort = $("[data-review-sort]").value;
    let list = reviews.filter((r) =>
      (!filterStars || r.stars === filterStars) &&
      (!q || `${r.name} ${r.city} ${r.text}`.toLocaleLowerCase("pt-BR").includes(q)));
    const byDate = (a, b) => (b.mine - a.mine) || (b.date || "").localeCompare(a.date || "") || a._order - b._order;
    list.sort(sort === "high" ? (a, b) => b.stars - a.stars || byDate(a, b)
      : sort === "low" ? (a, b) => a.stars - b.stars || byDate(a, b)
      : sort === "photo" ? (a, b) => (!!b.photo - !!a.photo) || byDate(a, b)
      : byDate);
    $("[data-reviews]").innerHTML = list.slice(0, shown).map(reviewCard).join("");
    $("[data-reviews-empty]").hidden = list.length > 0;
    $("[data-reviews-more]").hidden = list.length <= shown;
    $("[data-review-filter]").hidden = !filterStars;
    setAll("[data-filter-label]", `${filterStars} estrela${filterStars > 1 ? "s" : ""}`);
  };
  $("[data-rating-bars]").addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter-stars]"); if (!b) return;
    const n = +b.dataset.filterStars;
    filterStars = filterStars === n ? null : n; shown = PAGE;
    renderSummary(); renderReviews();
  });
  $("[data-clear-filter]").onclick = () => { filterStars = null; renderSummary(); renderReviews(); };
  $("[data-review-search]").addEventListener("input", () => { shown = PAGE; renderReviews(); });
  $("[data-review-sort]").addEventListener("change", renderReviews);
  $("[data-reviews-more]").onclick = () => { shown += PAGE; renderReviews(); };
  $("[data-reviews]").addEventListener("click", (e) => {
    const b = e.target.closest("[data-review-photo]"); if (!b) return;
    lbOpen([{ src: b.dataset.reviewPhoto, alt: "Foto do cliente" }], 0);
  });
  renderSummary(); renderReviews();

  // Formulário: publica só nesta página (não salva — some ao atualizar)
  const form = $("[data-review-form]");
  let rfStars = 0, rfPhoto = null;
  $("[data-rf-offer]").innerHTML = S.offers.map((o) => `<option value="${o.id}">${esc(o.label)}</option>`).join("");
  const paintStars = (n) => $$("[data-star]").forEach((b) => b.classList.toggle("on", +b.dataset.star <= n));
  $("[data-rf-stars]").addEventListener("click", (e) => { const b = e.target.closest("[data-star]"); if (b) { rfStars = +b.dataset.star; paintStars(rfStars); } });
  $("[data-rf-stars]").addEventListener("mouseover", (e) => { const b = e.target.closest("[data-star]"); if (b) paintStars(+b.dataset.star); });
  $("[data-rf-stars]").addEventListener("mouseleave", () => paintStars(rfStars));
  $("[data-rf-photo]").addEventListener("change", (e) => {
    const f = e.target.files[0];
    const prev = $("[data-rf-preview]");
    if (rfPhoto) URL.revokeObjectURL(rfPhoto);
    rfPhoto = f && f.type.startsWith("image/") ? URL.createObjectURL(f) : null;
    prev.hidden = !rfPhoto; if (rfPhoto) prev.src = rfPhoto;
    setAll("[data-rf-file-label]", f ? f.name : "Adicionar foto do produto (opcional)");
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const err = !d.get("name").trim() ? "Informe seu nome." : !d.get("city").trim() ? "Informe sua cidade e estado."
      : !rfStars ? "Escolha sua nota de 1 a 5 estrelas." : d.get("text").trim().length < 10 ? "Escreva pelo menos 10 caracteres na avaliação." : "";
    const errEl = $("[data-rf-error]");
    errEl.textContent = err; errEl.hidden = !err;
    if (err) return;
    reviews.unshift({ name: d.get("name").trim(), city: d.get("city").trim(), stars: rfStars, text: d.get("text").trim(),
      offer: d.get("offer"), photo: rfPhoto, date: new Date().toISOString().slice(0, 10), mine: true, _order: -1 });
    form.reset(); rfStars = 0; rfPhoto = null; paintStars(0);
    $("[data-rf-preview]").hidden = true; setAll("[data-rf-file-label]", "Adicionar foto do produto (opcional)");
    $("[data-review-form-wrap]").open = false;
    filterStars = null; $("[data-review-search]").value = ""; $("[data-review-sort]").value = "recent";
    renderSummary(); renderReviews();
    const ok = $("[data-rf-success]"); ok.hidden = false;
    $("[data-reviews] .review").scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => (ok.hidden = true), 6000);
  });

  /* ---------- Depoimentos em vídeo ---------- */
  if (S.videos && S.videos.length) {
    $("[data-videos]").hidden = false;
    $("[data-video-track]").innerHTML = S.videos.map((v) => `
      <figure class="video-card">
        <video src="${esc(v.src)}" ${v.poster ? `poster="${esc(v.poster)}"` : ""} playsinline controls preload="none"></video>
        <figcaption><b>${esc(v.name)}</b><span class="stars">★★★★★</span><small>${esc(v.city || "")}</small></figcaption>
      </figure>`).join("");
    // toca um por vez
    $("[data-video-track]").addEventListener("play", (e) => $$("[data-video-track] video").forEach((v) => v !== e.target && v.pause()), true);
  }

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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { toggleDrawer(false); lbClose(); $$(".modal.open").forEach(closeModal); }
    if (lb.classList.contains("open") && (e.key === "ArrowRight" || e.key === "ArrowLeft")) lbStep(e.key === "ArrowRight" ? 1 : -1);
  });

  /* ---------- Barra fixa de compra ---------- */
  const sticky = $("[data-sticky]");
  const mainBuy = $(".buybox [data-buy]");
  new IntersectionObserver(([e]) => sticky.classList.toggle("show", !e.isIntersecting && e.boundingClientRect.top < 0))
    .observe(mainBuy);

  /* ---------- Animação de entrada ao rolar ---------- */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const els = $$("main > .section, #descricao > .bnr, #descricao > .bnr-specs, #descricao > .desc-img, .trust > div");
    els.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Cupom de saída ---------- */
  const C = S.exitCoupon;
  if (C && C.enabled && !store.get("bruttus-exit-shown")) {
    const m = $("[data-exit-modal]");
    setAll("[data-exit-pct]", `${C.percent}%`);
    setAll("[data-exit-code]", C.code);
    let left = C.minutes * 60, timer = null, fired = false;
    const show = () => {
      if (fired || $(".modal.open")) return;
      fired = true; store.set("bruttus-exit-shown", "1");
      openModal(m);
      timer = setInterval(() => {
        left = Math.max(0, left - 1);
        setAll("[data-exit-timer]", `${pad(Math.floor(left / 60))}:${pad(left % 60)}`);
        if (!left) { clearInterval(timer); closeModal(m); }
      }, 1000);
    };
    document.addEventListener("mouseout", (e) => { if (!e.relatedTarget && e.clientY <= 0) show(); });
    if (matchMedia("(pointer: coarse)").matches) setTimeout(show, 40000);
    $("[data-exit-code]").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(C.code); } catch {}
      $("[data-exit-copied]").hidden = false;
    });
  }
})();
