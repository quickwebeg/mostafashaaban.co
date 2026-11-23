/* ==========================================================================
   MOSTAFA SHAABAN — site behaviour
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const body = document.body;

  const ICON = {
    arrow: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 10h13M11 5l5 5-5 5"/></svg>',
    arrowUpRight:
      '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 14L14 6M7 6h7v7"/></svg>',
    close:
      '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M5 5l10 10M15 5L5 15"/></svg>',
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
    grid:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    image:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="4" width="18" height="16"/><circle cx="9" cy="10" r="2"/><path d="M3 17l6-5 5 4 3-2 4 4"/></svg>',
    book:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 4h7a3 3 0 013 3v13a2 2 0 00-2-2H4z"/><path d="M20 4h-7a3 3 0 00-3 3v13a2 2 0 012-2h8z"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="5" width="18" height="14"/><path d="M3 7l9 6 9-6"/></svg>',
    home:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/></svg>',
    chevron:
      '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M2 4l4 4 4-4"/></svg>',
  };

  const money = (n) => "EGP " + n.toLocaleString("en-US");
  const styleName = (id) => {
    const s = (window.SITE.styles || []).find((x) => x.id === id);
    return s ? s.name : id;
  };

  /* ---------------------------------------------------------------- Header */
  const header = $(".site-header");
  const isDarkPage = body.dataset.header === "overlay";

  function onScrollHeader() {
    if (!header) return;
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    if (isDarkPage) {
      const threshold = Math.max(360, window.innerHeight * 0.72);
      header.classList.toggle("on-dark", y < threshold);
    }
    const bar = $(".scroll-progress");
    if (bar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
    }
  }

  /* -------------------------------------------------------- Mega dropdown */
  const megaItem = $(".nav__item.has-mega");
  if (megaItem) {
    const trigger = $(".nav__link", megaItem);
    const siteHeaderEl = $(".site-header");
    let closeTimer;

    const open = () => {
      clearTimeout(closeTimer);
      megaItem.classList.add("is-open");
      if (siteHeaderEl) siteHeaderEl.classList.add("is-mega-open");
      trigger.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      megaItem.classList.remove("is-open");
      if (siteHeaderEl) siteHeaderEl.classList.remove("is-mega-open");
      trigger.setAttribute("aria-expanded", "false");
    };
    megaItem.addEventListener("mouseenter", () => {
      if (fine) open();
    });
    megaItem.addEventListener("mouseleave", () => {
      if (fine) closeTimer = setTimeout(close, 220);
    });
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      megaItem.classList.contains("is-open") ? close() : open();
    });
    megaItem.addEventListener("focusin", open);
    megaItem.addEventListener("focusout", (e) => {
      if (!megaItem.contains(e.relatedTarget)) close();
    });
    $$(".mega a", megaItem).forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* ----------------------------------------------------------- Mobile nav */
  const burger = $(".burger");
  const mobileMenu = $(".mobile-menu");
  if (burger && mobileMenu) {
    const setMenu = (open) => {
      body.classList.toggle("menu-open", open);
      body.classList.toggle("is-locked", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      $$(".mobile-menu__link", mobileMenu).forEach((el, i) => {
        el.style.transitionDelay = open ? 0.12 + i * 0.06 + "s" : "0s";
      });
    };
    burger.addEventListener("click", () =>
      setMenu(!body.classList.contains("menu-open"))
    );
    $$("a", mobileMenu).forEach((a) =>
      a.addEventListener("click", () => setMenu(false))
    );
    $$("[data-accordion-btn]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".mobile-menu__item");
        const isOpen = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ------------------------------------------------------------ Intro */
  const intro = $(".intro");
  const startIntro = () => {
    let seen = null;
    try { seen = sessionStorage.getItem("ms-intro"); } catch (err) {}
    const remember = () => { try { sessionStorage.setItem("ms-intro", "1"); } catch (err) {} };
    if (!intro || reduced || seen) {
      if (intro) intro.remove();
      body.classList.add("is-ready");
      body.classList.remove("is-locked");
      return;
    }
    body.classList.add("is-locked");
    remember();
    let skipped = false;

    const finish = () => {
      intro.classList.add("is-done");
      body.classList.add("is-ready");
      window.setTimeout(() => {
        intro.remove();
        body.classList.remove("is-locked");
      }, 1250);
    };
    const reveal = () => {
      if (skipped) return;
      skipped = true;
      intro.classList.add("is-revealing");
      window.setTimeout(finish, 520);
    };

    window.setTimeout(reveal, 3050);
    if (!reduced) {
      const skip = () => reveal();
      intro.addEventListener("click", skip);
      document.addEventListener("keydown", skip, { once: true });
      window.addEventListener("wheel", skip, { once: true, passive: true });
    }
  };
  startIntro();

  /* --------------------------------------------------------- Reveal in view */
  const revealEls = $$("[data-reveal], [data-reveal-img]");
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ------------------------------------------------------- Scrub words */
  const scrubEls = $$("[data-scrub]");
  scrubEls.forEach((el) => {
    if (reduced) return;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) if (n.nodeValue.trim()) nodes.push(n);
    nodes.forEach((node) => {
      const frag = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach((chunk) => {
        if (!chunk.trim()) {
          frag.appendChild(document.createTextNode(chunk));
        } else {
          const s = document.createElement("span");
          s.textContent = chunk;
          frag.appendChild(s);
        }
      });
      node.parentNode.replaceChild(frag, node);
    });
    el.classList.add("scrub-words");
  });

  const scrubWords = $$(".scrub-words span");
  if (scrubWords.length && !reduced) {
    let ticking = false;
    const updateScrub = () => {
      ticking = false;
      const vh = window.innerHeight;
      $$(".scrub-words").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const start = vh * 0.88;
        const end = vh * 0.35;
        const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height * 0.65)));
        const words = $$("span", el);
        const count = Math.floor(progress * words.length + 0.0001);
        words.forEach((w, i) => w.classList.toggle("is-lit", i < count));
      });
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateScrub);
        }
      },
      { passive: true }
    );
    updateScrub();
  }

  /* -------------------------------------------------------- Parallax media */
  const parallaxEls = $$("[data-parallax]");
  if (parallaxEls.length && !reduced) {
    let raf = null;
    const update = () => {
      raf = null;
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const speed = parseFloat(el.dataset.parallax) || 0.12;
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!raf) raf = requestAnimationFrame(update);
      },
      { passive: true }
    );
    update();
  }

  /* Hero mouse drift */
  const hero = $(".hero");
  if (hero && fine && !reduced) {
    const media = $(".hero__media", hero);
    let tx = 0, ty = 0, cx = 0, cy = 0, active = false;
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 18;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 14;
      active = true;
    });
    const loop = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (active && media && window.scrollY < window.innerHeight) {
        media.style.transform =
          "translate3d(" + cx.toFixed(2) + "px," + cy.toFixed(2) + "px,0)";
      }
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ------------------------------------------------------------- Counters */
  const counters = $$("[data-count]");
  if (counters.length) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const dur = 1600;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        el.textContent = val.toLocaleString("en-US") + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window && !reduced) {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              run(e.target);
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.5 }
      );
      counters.forEach((c) => io.observe(c));
    } else {
      counters.forEach((c) => {
        c.textContent = parseFloat(c.dataset.count).toLocaleString("en-US") + (c.dataset.suffix || "");
      });
    }
  }

  /* ---------------------------------------------------------- Testimonials */
  const quotes = $$(".quote");
  if (quotes.length > 1) {
    const nav = $(".quotes__nav");
    let idx = 0;
    let timer;
    quotes.forEach((q, i) => {
      if (nav) {
        const b = document.createElement("button");
        b.className = "quotes__dot" + (i === 0 ? " is-active" : "");
        b.setAttribute("aria-label", "Testimonial " + (i + 1));
        b.addEventListener("click", () => show(i, true));
        nav.appendChild(b);
      }
    });
    const dots = nav ? $$(".quotes__dot", nav) : [];
    function show(i, manual) {
      idx = i % quotes.length;
      quotes.forEach((q, k) => q.classList.toggle("is-active", k === idx));
      dots.forEach((d, k) => {
        d.classList.remove("is-active");
        if (k === idx) {
          d.classList.remove("is-active");
          void d.offsetWidth;
          d.classList.add("is-active");
        }
      });
      if (manual) schedule();
    }
    const schedule = () => {
      clearTimeout(timer);
      if (!reduced) timer = setTimeout(() => show(idx + 1), 7200);
    };
    const stage = $(".testimonials");
    if (stage) {
      stage.addEventListener("mouseenter", () => clearTimeout(timer));
      stage.addEventListener("mouseleave", schedule);
    }
    schedule();
  }

  /* ------------------------------------------------------- Drag scroller */
  $$(".scroller").forEach((sc) => {
    let down = false, startX = 0, startLeft = 0, moved = 0;
    sc.addEventListener("dragstart", (e) => e.preventDefault());
    sc.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = 0;
      startX = e.clientX;
      startLeft = sc.scrollLeft;
      sc.classList.add("is-dragging");
      try { sc.setPointerCapture(e.pointerId); } catch (err) {}
    });
    sc.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.abs(dx);
      sc.scrollLeft = startLeft - dx;
    });
    const end = (e) => {
      if (!down) return;
      down = false;
      sc.classList.remove("is-dragging");
      try { sc.releasePointerCapture(e.pointerId); } catch (err) {}
    };
    sc.addEventListener("pointerup", end);
    sc.addEventListener("pointerleave", end);
    sc.addEventListener("click", (e) => {
      if (moved > 8) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  });

  /* ------------------------------------------------------------- Accordion */
  $$(".faq__q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq__item");
      const open = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ----------------------------------------------------------- Small forms */
  $$("[data-newsletter]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("input", form);
      const note = $(".form-note", form);
      if (!input.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        if (note) {
          note.textContent = "That email doesn't look quite right.";
          note.style.color = "#9c4b37";
        }
        input.focus();
        return;
      }
      if (note) {
        note.textContent = "Thank you — you're on the list.";
        note.style.color = "";
        note.style.opacity = "1";
      }
      input.value = "";
    });
  });

  /* ---------------------------------------------------------- Contact form */
  const contactForm = $("#contact-form");
  if (contactForm) {
    const success = $("#form-success");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      $$("[required]", contactForm).forEach((field) => {
        const wrap = field.closest(".field");
        const err = $(".err", wrap);
        let msg = "";
        if (!field.value.trim()) msg = "This field is required.";
        else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value))
          msg = "Please enter a valid email address.";
        wrap.classList.toggle("is-invalid", !!msg);
        if (err) err.textContent = msg;
        if (msg) valid = false;
      });
      if (!valid) return;
      contactForm.style.display = "none";
      if (success) {
        success.classList.add("is-visible");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  /* ------------------------------------------------------------ FAQ filter */
  $$("[data-gallery-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.galleryFilter;
      $$("[data-gallery-filter]").forEach((b) =>
        b.classList.toggle("is-active", b === btn)
      );
      $$(".gallery-card").forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.style.display = show ? "" : "none";
      });
      const count = $("[data-gallery-count]");
      if (count) count.textContent = $$(".gallery-card").filter((c) => c.style.display !== "none").length;
    });
  });

  /* --------------------------------------------------------- Product cards */
  function productCard(p) {
    return (
      '<article class="product-card" data-reveal>' +
      '<div class="product-card__media">' +
      '<a href="products.html?p=' + p.id + '" aria-label="' + p.name + '">' +
      '<img src="' + p.image + '" alt="' + p.name + ' — ' + p.materials + '" width="1000" height="1250" loading="lazy" decoding="async">' +
      "</a>" +
      (p.badge ? '<span class="product-card__badge">' + p.badge + "</span>" : "") +
      '<button class="product-card__quick" data-quick="' + p.id + '">Quick view' + ICON.arrowUpRight + "</button>" +
      "</div>" +
      '<div class="product-card__body">' +
      '<div class="product-card__top">' +
      '<h3 class="product-card__name"><a href="products.html?p=' + p.id + '">' + p.name + "</a></h3>" +
      '<span class="product-card__price">' + money(p.price) + "</span>" +
      "</div>" +
      '<span class="product-card__style">' + styleName(p.style) + " · " + p.category + "</span>" +
      "</div></article>"
    );
  }
  window.productCard = productCard;

  /* ================================================================ SEARCH */
  const searchIndex = [];
  (window.SITE.products || []).forEach((p) => {
    searchIndex.push({
      kind: "Piece",
      title: p.name,
      meta: styleName(p.style) + " · " + p.category,
      price: money(p.price),
      image: p.image,
      url: "products.html?p=" + p.id,
      haystack: [p.name, p.style, styleName(p.style), p.category, p.materials, p.finish, p.blurb]
        .join(" ")
        .toLowerCase(),
      product: p,
    });
  });
  (window.SITE.styles || []).forEach((s) => {
    searchIndex.push({
      kind: "Collection",
      title: s.name,
      meta: s.tagline,
      image: s.image,
      url: "products.html?style=" + s.id,
      haystack: (s.name + " " + s.tagline + " " + s.blurb).toLowerCase(),
    });
  });
  (window.SITE.pages || []).forEach((p) => {
    searchIndex.push({
      kind: "Page",
      title: p.title,
      meta: p.meta,
      icon: p.icon,
      url: p.url,
      haystack: (p.title + " " + p.meta).toLowerCase(),
    });
  });

  const norm = (s) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function searchEngine(query) {
    const q = norm(query.trim());
    if (!q) return [];
    const tokens = q.split(/\s+/).filter(Boolean);
    return searchIndex
      .map((item) => {
        const hay = norm(item.haystack);
        const title = norm(item.title);
        let score = 0;
        if (title === q) score += 220;
        if (title.startsWith(q)) score += 140;
        if (title.includes(q)) score += 90;
        tokens.forEach((t) => {
          if (title.includes(t)) score += 34;
          else if (hay.includes(t)) score += 14;
          else if (t.length > 3 && hay.split(/\s+/).some((w) => w.startsWith(t))) score += 10;
        });
        const matchedAll = tokens.every((t) => hay.includes(t));
        if (!matchedAll) score = score * 0.35;
        if (item.kind === "Piece") score += 6;
        return { item, score };
      })
      .filter((r) => r.score > 12)
      .sort((a, b) => b.score - a.score)
      .slice(0, 9)
      .map((r) => r.item);
  }

  function highlight(text, query) {
    const q = query.trim();
    if (!q) return text;
    const tokens = q.split(/\s+/).filter((t) => t.length > 1).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!tokens.length) return text;
    return text.replace(new RegExp("(" + tokens.join("|") + ")", "ig"), "<mark>$1</mark>");
  }

  const searchEl = document.createElement("div");
  searchEl.className = "search";
  searchEl.id = "site-search";
  searchEl.setAttribute("role", "dialog");
  searchEl.setAttribute("aria-modal", "true");
  searchEl.setAttribute("aria-label", "Search the atelier");
  searchEl.innerHTML =
    '<div class="search__head">' +
    '<div class="search__top">' +
    '<span class="search__label">Search the atelier</span>' +
    '<button class="search__close" data-search-close>' + ICON.close + "Close <span class='search__kbd'>esc</span></button>" +
    "</div>" +
    '<div class="search__field">' +
    ICON.search +
    '<input type="search" id="search-input" placeholder="Try “walnut”, “boho”, “sofa”…" autocomplete="off" aria-controls="search-results" aria-autocomplete="list">' +
    "</div></div>" +
    '<div class="search__body"><div class="search__inner">' +
    '<div class="search__group" data-search-default>' +
    '<h4>Popular</h4><div class="search__chips">' +
    ["walnut", "bouclé sofa", "boho", "marble", "classic", "leather"]
      .map((t) => '<button class="search__chip" data-search-term="' + t + '">' + t + "</button>")
      .join("") +
    "</div></div>" +
    '<div class="search__group" data-search-recent hidden><h4>Recent</h4><div class="search__chips" data-recent-chips></div></div>' +
    '<div id="search-results" class="search__group" hidden><h4 data-results-label>Results</h4><div class="search__results" data-results></div></div>' +
    "</div></div>";
  document.body.appendChild(searchEl);

  const searchInput = $("#search-input", searchEl);
  const resultsWrap = $("[data-results]", searchEl);
  const resultsGroup = $("#search-results", searchEl);
  const resultsLabel = $("[data-results-label]", searchEl);
  const defaultGroup = $("[data-search-default]", searchEl);
  const recentGroup = $("[data-search-recent]", searchEl);
  let activeIndex = -1;

  function openSearch() {
    searchEl.classList.add("is-open");
    body.classList.add("is-locked");
    renderRecent();
    setTimeout(() => searchInput.focus(), 180);
    if (searchInput.value) runSearch(searchInput.value);
  }
  function closeSearch() {
    searchEl.classList.remove("is-open");
    body.classList.remove("is-locked");
    activeIndex = -1;
  }

  function renderRecent() {
    let recent = [];
    try {
      recent = JSON.parse(localStorage.getItem("ms-recent") || "[]");
    } catch (e) {}
    if (!recent.length) {
      recentGroup.hidden = true;
      return;
    }
    recentGroup.hidden = false;
    $("[data-recent-chips]", searchEl).innerHTML = recent
      .map((t) => '<button class="search__chip" data-search-term="' + t + '">' + t + "</button>")
      .join("");
  }

  function pushRecent(term) {
    if (!term.trim()) return;
    let recent = [];
    try {
      recent = JSON.parse(localStorage.getItem("ms-recent") || "[]");
    } catch (e) {}
    recent = [term.trim()].concat(recent.filter((r) => r !== term.trim())).slice(0, 4);
    localStorage.setItem("ms-recent", JSON.stringify(recent));
  }

  function resultMarkup(item, query) {
    const thumb = item.image
      ? '<span class="s-result__thumb"><img src="' + item.image + '" alt="" loading="lazy"></span>'
      : '<span class="s-result__thumb s-result__thumb--icon">' + (ICON[item.icon] || ICON.grid) + "</span>";
    return (
      '<a class="s-result" href="' + item.url + '" data-result>' +
      thumb +
      '<span class="s-result__main">' +
      '<span class="s-result__name">' + highlight(item.title, query) + "</span>" +
      '<span class="s-result__meta">' + item.kind + " · " + item.meta + "</span>" +
      "</span>" +
      (item.price ? '<span class="s-result__price">' + item.price + "</span>" : "") +
      ICON.arrowUpRight.replace("<svg", '<svg class="s-result__go"') +
      "</a>"
    );
  }

  function runSearch(value) {
    const query = value.trim();
    activeIndex = -1;
    if (!query) {
      resultsGroup.hidden = true;
      defaultGroup.hidden = false;
      renderRecent();
      return;
    }
    defaultGroup.hidden = true;
    recentGroup.hidden = true;
    const results = searchEngine(query);
    resultsGroup.hidden = false;
    resultsLabel.textContent = results.length
      ? results.length + (results.length === 1 ? " result" : " results") + " for “" + query + "”"
      : "No results for “" + query + "”";
    if (!results.length) {
      resultsWrap.innerHTML =
        '<div class="search__empty"><h3>Nothing under that name — yet.</h3>' +
        "<p>Try a material, a style, or tell us what you have in mind and we will make it.</p>" +
        '<div class="search__chips">' +
        ["classic", "modern", "contemporary", "boho", "rustic", "industrial"]
          .map((t) => '<button class="search__chip" data-search-term="' + t + '">' + t + "</button>")
          .join("") +
        "</div></div>";
      return;
    }
    resultsWrap.innerHTML = results.map((r) => resultMarkup(r, query)).join("");
  }

  searchEl.addEventListener("input", (e) => {
    if (e.target === searchInput) runSearch(searchInput.value);
  });
  searchEl.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-search-term]");
    if (chip) {
      searchInput.value = chip.dataset.searchTerm;
      runSearch(searchInput.value);
      searchInput.focus();
    }
    if (e.target.closest("[data-search-close]")) closeSearch();
    if (e.target.closest("[data-result]")) {
      pushRecent(searchInput.value);
    }
  });
  searchEl.addEventListener("submit", (e) => e.preventDefault());

  $$("[data-search-open]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openSearch();
    })
  );

  document.addEventListener("keydown", (e) => {
    const isOpen = searchEl.classList.contains("is-open");
    const target = e.target;
    const typing = target && /INPUT|TEXTAREA|SELECT/.test(target.tagName);
    if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      isOpen ? closeSearch() : openSearch();
      return;
    }
    if (e.key === "/" && !typing && !isOpen) {
      e.preventDefault();
      openSearch();
      return;
    }
    if (!isOpen) return;
    if (e.key === "Escape") {
      closeSearch();
      return;
    }
    const items = $$(".s-result", searchEl);
    if (!items.length) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex =
        e.key === "ArrowDown"
          ? (activeIndex + 1) % items.length
          : (activeIndex - 1 + items.length) % items.length;
      items.forEach((it, i) => it.classList.toggle("is-active", i === activeIndex));
      items[activeIndex].scrollIntoView({ block: "nearest" });
    }
    if (e.key === "Enter" && activeIndex > -1) {
      e.preventDefault();
      pushRecent(searchInput.value);
      window.location.href = items[activeIndex].getAttribute("href");
    } else if (e.key === "Enter" && items.length === 1) {
      pushRecent(searchInput.value);
      window.location.href = items[0].getAttribute("href");
    }
  });

  /* -------------------------------------------------------- Quick view modal */
  const modalRoot = $("#quick-view");
  function openQuickView(id) {
    const p = (window.SITE.products || []).find((x) => x.id === id);
    if (!p || !modalRoot) return false;
    modalRoot.innerHTML =
      '<div class="modal__scrim" data-close></div>' +
      '<div class="modal__panel" role="dialog" aria-modal="true" aria-label="' + p.name + '">' +
      '<button class="modal__close" data-close aria-label="Close">' + ICON.close + "</button>" +
      '<div class="modal__media"><img src="' + p.image + '" alt="' + p.name + '"></div>' +
      '<div class="modal__body">' +
      '<span class="eyebrow">' + styleName(p.style) + " · " + p.category + "</span>" +
      '<h2 class="modal__title">' + p.name + "</h2>" +
      '<p class="modal__price">' + money(p.price) + " · made to order in 6–8 weeks</p>" +
      '<p class="modal__desc">' + p.blurb + "</p>" +
      '<dl class="spec">' +
      "<div><dt>Materials</dt><dd>" + p.materials + "</dd></div>" +
      "<div><dt>Dimensions</dt><dd>" + p.dimensions + "</dd></div>" +
      "<div><dt>Finish</dt><dd>" + p.finish + "</dd></div>" +
      "<div><dt>Delivery</dt><dd>Across Egypt, white-glove</dd></div>" +
      "</dl>" +
      '<div class="modal__actions">' +
      '<a class="btn btn--solid" href="contact.html?piece=' + encodeURIComponent(p.name) + '"><span>Enquire about this piece</span>' + ICON.arrow + "</a>" +
      '<button class="btn btn--outline" data-close><span>Keep looking</span></button>' +
      "</div></div></div>";
    modalRoot.classList.add("is-open");
    modalRoot.removeAttribute("hidden");
    body.classList.add("is-locked");
    const close = $(".modal__close", modalRoot);
    if (close) close.focus();
    return true;
  }
  function closeQuickView() {
    if (!modalRoot) return;
    modalRoot.classList.remove("is-open");
    body.classList.remove("is-locked");
    if (location.search.indexOf("p=") > -1) {
      const params = new URLSearchParams(location.search);
      params.delete("p");
      const qs = params.toString();
      history.replaceState({}, "", location.pathname + (qs ? "?" + qs : ""));
    }
    if (modalRoot.dataset.clear !== "keep") {
      window.setTimeout(() => {
        if (!modalRoot.classList.contains("is-open")) modalRoot.innerHTML = "";
      }, 400);
    }
  }
  window.openQuickView = openQuickView;

  if (modalRoot) {
    modalRoot.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeQuickView();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalRoot.classList.contains("is-open")) closeQuickView();
    });
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-quick]");
    if (btn) {
      e.preventDefault();
      const id = btn.dataset.quick;
      if ($("#catalog-grid")) {
        openQuickView(id);
        const params = new URLSearchParams(location.search);
        params.set("p", id);
        history.replaceState({}, "", location.pathname + "?" + params.toString());
      } else {
        window.location.href = "products.html?p=" + id;
      }
    }
  });

  /* --------------------------------------------------------- Contact prefill */
  const piece = new URLSearchParams(location.search).get("piece");
  if (piece) {
    const subject = $("#interest");
    const message = $("#message");
    if (message && !message.value) {
      message.value = "Hello, I would like to enquire about the " + piece + ".";
    }
    if (subject && !subject.value) subject.value = "A specific piece";
  }

  /* -------------------------------------------------------------- Cursor */
  if (fine && !reduced) {
    const ring = document.createElement("div");
    const dot = document.createElement("div");
    ring.className = "cursor";
    dot.className = "cursor-dot";
    document.body.append(ring, dot);
    let mx = 0, my = 0, rx = 0, ry = 0, seen = false;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!seen) {
        seen = true;
        ring.classList.add("is-visible");
        dot.classList.add("is-visible");
      }
      dot.style.transform = "translate3d(" + (mx - 2) + "px," + (my - 2) + "px,0)";
    });
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = "translate3d(" + (rx - 17) + "px," + (ry - 17) + "px,0)";
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("mouseover", (e) => {
      const hit = e.target.closest("a, button, .product-card, .style-card, .gallery-card, input, select, textarea, .scroller");
      ring.classList.toggle("is-hover", !!hit);
    });
    document.addEventListener("mouseleave", () => {
      ring.classList.remove("is-visible");
      dot.classList.remove("is-visible");
    });
  }

  /* ------------------------------------------------------- Page transitions */
  const veil = document.createElement("div");
  veil.className = "page-veil";
  document.body.appendChild(veil);
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || reduced) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) return;
    if (a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (href.startsWith("products.html?")) {
      // allow instant navigation for filters/quick views
    }
    e.preventDefault();
    veil.classList.add("is-out");
    window.setTimeout(() => {
      window.location.href = href;
    }, 420);
  });
  window.addEventListener("pageshow", () => veil.classList.remove("is-out"));

  /* ------------------------------------------------------------ Footer year */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ------------------------------------------------------- Loaded state */
  requestAnimationFrame(() => {
    const imgsReady = new Promise((resolve) => {
      const heroImg = $(".hero__media img");
      if (!heroImg) return resolve();
      if (heroImg.complete) return resolve();
      heroImg.addEventListener("load", resolve, { once: true });
      heroImg.addEventListener("error", resolve, { once: true });
      setTimeout(resolve, 1200);
    });
    imgsReady.then(() => {
      if (!intro) body.classList.add("is-ready");
    });
  });

  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();
})();
