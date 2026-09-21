/* ==========================================================================
   Instituut Soleil — header, menu, footer, renderers en kleine interacties.
   ========================================================================== */

(function () {
  document.documentElement.classList.add("js");
  const S = window.SOLEIL, I = S.info;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const page = document.body.dataset.page || "";
  const cur = (p) => (page === p ? ' aria-current="page"' : "");
  const ext = 'target="_blank" rel="noopener"';
  const IMG = (name) => `assets/img/${name}.webp`;
  const photo = (name, alt, cls = "") => `<div class="photo ${cls}"><img src="${IMG(name)}" alt="${alt}" loading="lazy" decoding="async"></div>`;
  const from = (v) => (v == null ? "Prijs op consult" : `vanaf <b>€${v}</b>`);
  const sun = '<svg class="sun" viewBox="0 0 56 28" aria-hidden="true"><path d="M2 27 A26 26 0 0 1 54 27"/></svg>';
  window.SoleilUI = { photo, sun };

  // ---------- uren ----------
  const fmt = (s) => { const [h, m] = s.split(":"); return Number(h) + "u" + (m === "00" ? "" : m); };
  function hoursTable() {
    const today = new Date().getDay();
    return `<table class="hours"><caption class="sr">Openingsuren</caption><tbody>${[1, 2, 3, 4, 5, 6, 0].map((d) => {
      const h = S.hours.find((x) => x.d === d);
      return `<tr class="${d === today ? "today" : ""}"><th scope="row">${h.day}</th><td>${h.open ? `${fmt(h.open)} – ${fmt(h.close)}` : "Gesloten"}${h.note ? `<br><span class="small">${h.note}</span>` : ""}</td></tr>`;
    }).join("")}</tbody></table>`;
  }
  function status() {
    const now = new Date(), h = S.hours.find((x) => x.d === now.getDay());
    if (!h.open) return { open: false, text: "Vandaag gesloten" };
    const m = now.getHours() * 60 + now.getMinutes(), toM = (s) => { const [a, b] = s.split(":").map(Number); return a * 60 + b; };
    if (m >= toM(h.open) && m < toM(h.close)) return { open: true, text: `Nu open tot ${fmt(h.close)}` };
    return { open: false, text: m < toM(h.open) ? `Vandaag open vanaf ${fmt(h.open)}` : "Nu gesloten" };
  }

  // ---------- header ----------
  const hdr = $("#header");
  if (hdr) hdr.outerHTML = `
<a class="skip" href="#main">Naar inhoud</a>
<header class="hdr">
  <div class="wrap hdr-in">
    <a class="logo" href="index.html"><img src="assets/img/logo.png" alt="Soleil schoonheidsinstituut, naar home" width="181" height="110"></a>
    <nav class="nav" aria-label="Hoofdmenu"><ul>
      <li><button aria-expanded="false" aria-controls="drop"${page === "behandelingen" ? ' aria-current="page"' : ""}>Behandelingen</button></li>
      <li><a href="tarieven.html"${cur("tarieven")}>Tarieven</a></li>
      <li><a href="over-soleil.html"${cur("over")}>Over Soleil</a></li>
      <li><a href="contact.html"${cur("contact")}>Contact</a></li>
    </ul></nav>
    <a class="btn btn--sm hdr-cta" href="${I.booking}" ${ext}>Afspraak maken</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="mnav"><i aria-hidden="true"></i>Menu</button>
  </div>
  <div class="drop" id="drop" hidden>
    <div class="wrap drop-in">
      <div><h2 class="label">Huid</h2><ul>${S.skin.map((t) => `<li><a href="${t.url}">${t.name}</a></li>`).join("")}</ul></div>
      <div><h2 class="label">Verwennen</h2><ul>${S.pamper.map((p) => `<li><a href="verwennen.html#${p.id}">${p.name}</a></li>`).join("")}</ul></div>
      <a class="drop-feature" href="huidanalyse.html">
        ${photo("huidanalyse-scan", "")}
        <div class="stack-sm"><p class="label">Nieuw bij Soleil?</p><p class="d4">Elke behandeling start met een blik op je huid.</p><span class="link">Start met een huidanalyse</span></div>
      </a>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" role="dialog" aria-modal="true" aria-label="Menu" hidden>
  <div class="mnav-top"><a class="logo" href="index.html"><img src="assets/img/logo.png" alt="Soleil, naar home"></a><button class="menu-btn" style="display:inline-flex" data-close>Sluiten</button></div>
  <div class="mnav-body">
    <ul>
      <li><a href="behandelingen.html">Behandelingen</a>
        <div class="mnav-sub">${S.skin.map((t) => `<a href="${t.url}">${t.name}</a>`).join("")}<a href="verwennen.html">Verwennen</a></div></li>
      <li><a href="tarieven.html">Tarieven</a></li>
      <li><a href="over-soleil.html">Over Soleil</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <div class="mnav-meta stack-sm"><p class="js-status"></p><p>${I.street}, ${I.city}</p></div>
  </div>
</div>`;

  // ---------- footer ----------
  const ftr = $("#footer");
  if (ftr) {
    const [title, text] = (ftr.dataset.cta || "Tijd voor <em>jezelf</em>|Plan je afspraak online, wanneer het jou past.").split("|");
    ftr.outerHTML = `
<section class="cta" aria-label="Afspraak maken">
  <div class="wrap stack">
    ${sun.replace('class="sun"', 'class="sun" style="margin-inline:auto"')}
    <h2 class="d2">${title}</h2>
    <p class="lead">${text}</p>
    <div class="btns"><a class="btn btn--gold" href="${I.booking}" ${ext}>Afspraak maken</a><a class="link link--light" href="${I.phoneHref}">Of bel ${I.phone}</a></div>
  </div>
</section>
<footer class="ftr">
  <div class="wrap">
    <div class="ftr-grid">
      <div class="stack">
        <a class="logo-box" href="index.html"><img src="assets/img/logo.png" alt="Soleil, naar home"></a>
        <address>${I.street}<br>${I.city}<br><a href="${I.phoneHref}">${I.phone}</a><br><a href="mailto:${I.email}">${I.email}</a></address>
        <a class="link" href="${I.route}" ${ext}>Route plannen</a>
      </div>
      <nav aria-label="Aanbod"><h2 class="label">Aanbod</h2><ul>
        ${S.skin.map((t) => `<li><a href="${t.url}">${t.name}</a></li>`).join("")}
        <li><a href="verwennen.html">Verwennen</a></li>
      </ul></nav>
      <nav aria-label="Info"><h2 class="label">Info</h2><ul>
        <li><a href="tarieven.html">Tarieven</a></li>
        <li><a href="over-soleil.html">Over Soleil</a></li>
        <li><a href="journaal.html">Journaal</a></li>
        <li><a href="${I.webshop}" ${ext}>Webshop ↗</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul></nav>
      <div><h2 class="label">Openingsuren</h2>${hoursTable()}</div>
    </div>
    <div class="brands" aria-label="Merken"><span>Environ</span><span>Exuviance</span><span>Isov</span><span>Jane Iredale</span></div>
    <div class="ftr-bottom">
      <span>© ${new Date().getFullYear()} Instituut Soleil · BTW ${I.vat || "[te bevestigen]"}</span>
      <nav aria-label="Juridisch"><a href="#">Privacy</a><a href="#">Cookies</a><a href="${I.instagram}" ${ext}>Instagram</a><a href="${I.facebook}" ${ext}>Facebook</a></nav>
    </div>
  </div>
</footer>
<div class="mbar"><a class="btn btn--line" href="${I.phoneHref}">Bellen</a><a class="btn" href="${I.booking}" ${ext}>Afspraak maken</a></div>
<div class="cookie" id="cookie" role="dialog" aria-label="Cookies" hidden>
  <p class="label">Cookies</p>
  <p class="small muted">Ik gebruik enkel noodzakelijke cookies, tenzij je ook statistieken en de kaart toestaat.</p>
  <div class="btns" style="gap:12px"><button class="btn btn--sm" data-c>Toestaan</button><button class="btn btn--sm btn--line" data-c>Weigeren</button></div>
</div>`;
  }

  // ---------- header-gedrag ----------
  const header = $(".hdr");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 12);
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    const btn = $('[aria-controls="drop"]'), drop = $("#drop");
    const set = (o) => { drop.hidden = !o; btn.setAttribute("aria-expanded", String(o)); };
    btn.addEventListener("click", () => set(drop.hidden));
    document.addEventListener("click", (e) => { if (!header.contains(e.target)) set(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !drop.hidden) { set(false); btn.focus(); } });
    const mnav = $("#mnav"), open = $(".hdr .menu-btn");
    const setM = (o) => { mnav.hidden = !o; open.setAttribute("aria-expanded", String(o)); document.body.style.overflow = o ? "hidden" : ""; (o ? $("[data-close]", mnav) : open).focus(); };
    open.addEventListener("click", () => setM(true));
    $("[data-close]", mnav).addEventListener("click", () => setM(false));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !mnav.hidden) setM(false); });
  }

  const st = status();
  $$(".js-status").forEach((el) => { el.textContent = st.text; el.classList.add("status"); el.classList.toggle("is-open", st.open); });
  $$(".js-hours").forEach((el) => (el.innerHTML = hoursTable()));

  const cookie = $("#cookie");
  if (cookie) {
    let seen = null; try { seen = sessionStorage.getItem("soleil-c"); } catch (e) {}
    if (!seen) setTimeout(() => (cookie.hidden = false), 900);
    cookie.addEventListener("click", (e) => { if (e.target.closest("[data-c]")) { cookie.hidden = true; try { sessionStorage.setItem("soleil-c", "1"); } catch (e) {} } });
  }

  // ---------- renderers ----------
  const indexRow = (href, name, line, price, img, tag) => `<a class="index-row" href="${href}" data-img="${img}">
      <span class="name">${name}${tag ? `<span class="tag">${tag}</span>` : ""}</span><span class="line">${line}</span><span class="price">${price}</span><span class="arrow" aria-hidden="true">→</span></a>`;

  $$("[data-index]").forEach((el) => {
    el.innerHTML = el.dataset.index === "skin"
      ? S.skin.map((t) => indexRow(t.url, t.name, t.line, from(t.from), t.img, t.slug === "huidanalyse" ? "Start hier" : "")).join("")
      : S.pamper.map((p) => indexRow(el.dataset.base ? `verwennen.html#${p.id}` : `#${p.id}`, p.name, p.line, from(p.from), p.img)).join("");
  });

  const priceList = (rows) => `<ul class="prices">${rows.map(([n, d, p]) => `<li><span class="n">${n}</span><span class="dur">${d || ""}</span><span class="pr${p == null ? " ask" : ""}">${p == null ? "Op consult" : "€" + p}</span></li>`).join("")}</ul>`;
  window.SoleilPrices = priceList;
  $$("[data-prices]").forEach((el) => (el.innerHTML = priceList(S.services[el.dataset.prices])));

  $$("[data-arrangements]").forEach((el) => {
    const cards = S.arrangements.map((a) => `<article class="arr${a.name === "Soleil" ? " arr--feature" : ""} reveal">
      <div class="arr-top"><h3 class="d3">${a.name}</h3><span class="small ${a.name === "Soleil" ? "" : "muted"}">${a.duration}</span></div>
      ${a.name === "Soleil" ? '<p class="label" style="margin-top:-6px">Het signatuur-arrangement</p>' : ""}
      <ul>${a.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      <div class="arr-price"><span><strong>€${a.solo}</strong> <span class="small muted">p.p.</span></span>${a.duo ? `<span class="duo">Duo €${a.duo}</span>` : ""}</div>
    </article>`);
    cards.splice(1, 0, `<div class="arr arr-photo reveal">${photo("duo-cabine", "Twee personen ontspannen tijdens een gezichtsmassage in de duo-cabine")}</div>`);
    el.innerHTML = cards.join("");
  });

  $$("[data-options]").forEach((el) => {
    el.innerHTML = S.analyse.map((o) => `<article class="option${o.rec ? " option--rec" : ""} reveal">
      <p class="label">${o.rec ? "Aanbevolen voor je eerste bezoek" : "Optie"}</p>
      <h3 class="d3">${o.name}</h3>
      <p class="price">€${o.price}<small>${o.duration || "± 90 min"}</small></p>
      <ul class="ticks">${o.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      <p class="small muted">${o.note}</p>
      <a class="btn ${o.rec ? "btn--gold" : "btn--line"}" href="${I.booking}" ${ext}>Boek ${o.name.toLowerCase()}</a>
    </article>`).join("");
  });

  const months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
  const date = (s) => { const d = new Date(s); return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`; };
  window.SoleilDate = date;
  $$("[data-posts]").forEach((el) => {
    const n = Number(el.dataset.posts) || S.journal.length;
    el.innerHTML = S.journal.slice(0, n).map((p) => `<a class="post reveal" href="artikel.html?p=${p.slug}">
      ${photo(p.img, "")}
      <p class="label">${p.cat} · ${date(p.date)}</p><h3 class="d4">${p.title}</h3></a>`).join("");
  });

  // Behandelpagina
  const tpl = $("[data-treatment]");
  if (tpl) {
    const slug = new URLSearchParams(location.search).get("b");
    const t = S.skin.find((x) => x.slug === slug && x.intro) || S.skin.find((x) => x.slug === "gelaatsverzorging");
    document.title = `${t.name} in Beervelde · Instituut Soleil`;
    const map = {
      name: () => t.name, intro: () => t.intro, what: () => t.what,
      duration: () => t.duration, from: () => (t.from == null ? "Op consult" : "vanaf €" + t.from),
      img: () => `<img src="${IMG(t.img)}" alt="${t.name} in het instituut" decoding="async">`,
      forwho: () => t.forWho.map((x) => `<li>${x}</li>`).join(""),
      prices: () => priceList(t.prices),
      others: () => S.skin.filter((x) => x.slug !== t.slug).map((x) => indexRow(x.url, x.name, x.line, from(x.from), x.img)).join("")
    };
    $$("[data-t]").forEach((el) => { const f = map[el.dataset.t]; if (f) el.innerHTML = f(); });
  }

  // Beeldpreview bij de behandelingenlijst (desktop)
  if (matchMedia("(hover: hover) and (min-width: 1001px)").matches && $(".index")) {
    const pv = document.createElement("div");
    pv.className = "photo preview"; pv.setAttribute("aria-hidden", "true"); pv.innerHTML = '<img alt="">';
    document.body.appendChild(pv);
    const img = pv.firstChild;
    document.addEventListener("mouseover", (e) => {
      const row = e.target.closest(".index-row");
      pv.classList.toggle("is-on", !!row);
      if (row && img.dataset.src !== row.dataset.img) { img.src = IMG(row.dataset.img); img.dataset.src = row.dataset.img; }
    });
    document.addEventListener("mousemove", (e) => { pv.style.left = Math.min(e.clientX + 32, innerWidth - 270) + "px"; pv.style.top = e.clientY - 150 + "px"; });
  }

  // Sub-nav: actieve sectie
  window.SoleilSubnav = () => {
    const sub = $(".subnav"); if (!sub) return;
    const links = $$("a", sub), secs = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-40% 0px -55% 0px" });
    secs.forEach((s) => io.observe(s));
  };
  window.SoleilSubnav();

  // Reveal bij scrollen
  window.SoleilReveal = () => {
    const els = $$(".reveal:not(.is-in)");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  };
  window.SoleilReveal();

  // Formulier
  const form = $("[data-form]");
  if (form) form.addEventListener("submit", (e) => { e.preventDefault(); if (!form.reportValidity()) return; form.hidden = true; const d = $(".done"); d.hidden = false; d.focus(); });
})();
