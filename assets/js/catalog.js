/* ==========================================================================
   Collection page — filtering, search, sorting, quick view routing
   ========================================================================== */
(function () {
  "use strict";

  const grid = document.getElementById("catalog-grid");
  if (!grid) return;

  const SITE = window.SITE;
  const empty = document.getElementById("catalog-empty");
  const countLabel = document.querySelector("[data-count-label]");
  const searchInput = document.getElementById("catalog-search");
  const sortSelect = document.getElementById("catalog-sort");
  const chips = Array.from(document.querySelectorAll("[data-style]"));
  const params = new URLSearchParams(location.search);

  const state = {
    style: params.get("style") || "all",
    q: params.get("q") || "",
    sort: "featured",
  };

  /* counts on chips */
  chips.forEach((chip) => {
    const id = chip.dataset.style;
    const n =
      id === "all"
        ? SITE.products.length
        : SITE.products.filter((p) => p.style === id).length;
    const c = chip.querySelector(".chip__count");
    if (c) c.textContent = n;
  });

  const money = (n) => "EGP " + n.toLocaleString("en-US");
  const styleLabel = (id) => {
    const s = SITE.styles.find((x) => x.id === id);
    return s ? s.name : id;
  };

  const norm = (s) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function matches(p, q) {
    if (!q) return true;
    const hay = norm(
      [p.name, p.style, styleLabel(p.style), p.category, p.materials, p.finish, p.blurb].join(" ")
    );
    return norm(q)
      .split(/\s+/)
      .filter(Boolean)
      .every((t) => hay.includes(t));
  }

  function sorted(list) {
    const l = list.slice();
    switch (state.sort) {
      case "price-asc":
        return l.sort((a, b) => a.price - b.price);
      case "price-desc":
        return l.sort((a, b) => b.price - a.price);
      case "az":
        return l.sort((a, b) => a.name.localeCompare(b.name));
      case "za":
        return l.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return l.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }

  function render() {
    const list = sorted(
      SITE.products.filter(
        (p) =>
          (state.style === "all" || p.style === state.style) && matches(p, state.q)
      )
    );

    grid.classList.add("is-swapping");
    window.setTimeout(() => {
      grid.innerHTML = list
        .map(
          (p, i) =>
            window
              .productCard(p)
              .replace('class="product-card"', 'class="product-card" style="animation-delay:' + i * 45 + 'ms"')
        )
        .join("");
      grid.classList.remove("is-swapping");
      if (empty) empty.hidden = list.length > 0;
      if (countLabel) {
        const label =
          "Showing <strong>" + list.length + "</strong> " + (list.length === 1 ? "piece" : "pieces");
        countLabel.innerHTML = label;
      }
    }, 60);

    chips.forEach((chip) => {
      const on = chip.dataset.style === state.style;
      chip.classList.toggle("is-active", on);
      chip.setAttribute("aria-selected", on ? "true" : "false");
    });

    const q = new URLSearchParams();
    if (state.style !== "all") q.set("style", state.style);
    if (state.q) q.set("q", state.q);
    const currentPiece = new URLSearchParams(location.search).get("p");
    if (currentPiece) q.set("p", currentPiece);
    const qs = q.toString();
    history.replaceState({}, "", location.pathname + (qs ? "?" + qs : ""));
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      state.style = chip.dataset.style;
      render();
    });
  });

  let timer;
  if (searchInput) {
    searchInput.value = state.q;
    searchInput.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        state.q = searchInput.value;
        render();
      }, 140);
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      state.sort = sortSelect.value;
      render();
    });
  }

  document.addEventListener("click", (e) => {
    const reset = e.target.closest("[data-reset]");
    if (reset) {
      state.style = "all";
      state.q = "";
      if (searchInput) searchInput.value = "";
      render();
    }
  });

  /* clicking a card opens the piece without reloading the page */
  grid.addEventListener("click", (e) => {
    const link = e.target.closest(".product-card__media a");
    if (!link) return;
    const match = link.getAttribute("href").match(/p=([^&]+)/);
    if (!match) return;
    e.preventDefault();
    e.stopPropagation();
    if (window.openQuickView) window.openQuickView(decodeURIComponent(match[1]));
  });

  render();

  /* deep link straight into a piece */
  const p = params.get("p");
  if (p && typeof window.openQuickView === "function") {
    window.setTimeout(() => window.openQuickView(p), 320);
  }
})();
