/* ==========================================================================
   MOSTAFA SHAABAN — content model
   ========================================================================== */
(function () {
  "use strict";

  const styles = [
    {
      id: "classic",
      name: "Classic",
      tagline: "Inherited proportions, gently modernised.",
      image: "assets/img/styles/classic.jpg",
      blurb: "Fluted walnut, hand-buttoned velvet and the quiet confidence of Georgian proportions.",
    },
    {
      id: "modern",
      name: "Modern",
      tagline: "Less, but considered.",
      image: "assets/img/styles/modern.jpg",
      blurb: "Clean shells, honest materials and an almost architectural sense of rest.",
    },
    {
      id: "contemporary",
      name: "Contemporary",
      tagline: "Sculptural, warm, unrepeatable.",
      image: "assets/img/styles/contemporary.jpg",
      blurb: "Soft curves, stone and brushed brass, shaped by light and movement.",
    },
    {
      id: "boho",
      name: "Boho",
      tagline: "Texture, travel, sunlight.",
      image: "assets/img/styles/boho.jpg",
      blurb: "Hand-woven cane, layered wool and the relaxed luxury of things made by hand.",
    },
    {
      id: "rustic",
      name: "Rustic",
      tagline: "Wood with a memory.",
      image: "assets/img/styles/rustic.jpg",
      blurb: "Live edges, stone walls and timber that keeps the marks of its own history.",
    },
    {
      id: "industrial",
      name: "Industrial",
      tagline: "Steel, leather, and long shadows.",
      image: "assets/img/styles/industrial.jpg",
      blurb: "Blackened steel and full-grain leather, softened for the way we live now.",
    },
  ];

  const products = [
    {
      id: "verdant-wingback-chair",
      name: "Verdant Wingback Chair",
      style: "classic",
      category: "Seating",
      price: 48900,
      image: "assets/img/products/verdant-wingback-chair.jpg",
      badge: "Signature",
      materials: "Camel velvet, solid walnut",
      dimensions: "W 82 · D 88 · H 104 cm",
      finish: "Hand-buttoned, walnut legs",
      featured: true,
      blurb:
        "A deep, sheltering wingback built on a walnut frame that was dried for nine months before it was cut. Every button is set by hand, so no two chairs fall exactly alike.",
    },
    {
      id: "aurelia-carved-console",
      name: "Aurelia Carved Console",
      style: "classic",
      category: "Storage",
      price: 74500,
      image: "assets/img/products/aurelia-carved-console.jpg",
      materials: "Walnut, Carrara marble, brass",
      dimensions: "W 160 · D 45 · H 85 cm",
      finish: "Hand-carved relief, marble top",
      blurb:
        "Carved by one hand from a single walnut board, then set on turned brass legs. The marble top is cut from a single slab so the veining runs uninterrupted across the console.",
    },
    {
      id: "rosaline-velvet-chair",
      name: "Rosaline Velvet Chair",
      style: "classic",
      category: "Seating",
      price: 39800,
      image: "assets/img/products/rosaline-velvet-chair.jpg",
      materials: "Silk-blend velvet, beech",
      dimensions: "W 78 · D 82 · H 96 cm",
      finish: "Hand-polished beech, brass castors",
      badge: "New",
      blurb:
        "Dusty rose velvet over a hand-polished beech frame with brass castors — a small chair that behaves like a piece of jewellery.",
    },
    {
      id: "linea-boucle-sofa",
      name: "Linea Bouclé Sofa",
      style: "modern",
      category: "Seating",
      price: 128000,
      image: "assets/img/products/linea-boucle-sofa.jpg",
      badge: "Signature",
      featured: true,
      materials: "Ivory bouclé, solid oak",
      dimensions: "W 240 · D 95 · H 72 cm",
      finish: "Fluted upholstery, oak plinth",
      blurb:
        "Low, long and softly fluted. The Linea is built in our atelier on a kiln-dried oak frame, then upholstered in a wool bouclé woven for us in Faiyum.",
    },
    {
      id: "pereda-oval-table",
      name: "Pereda Oval Coffee Table",
      style: "modern",
      category: "Tables",
      price: 56400,
      image: "assets/img/products/pereda-oval-table.jpg",
      featured: true,
      materials: "Arabescato marble",
      dimensions: "W 140 · D 70 · H 36 cm",
      finish: "Honed marble, hand-chiselled base",
      blurb:
        "One block of Arabescato, cut twice: an honest slab above, a sculptural monolith below. Every table carries its own geology.",
    },
    {
      id: "arco-brass-lamp",
      name: "Arco Brass Floor Lamp",
      style: "modern",
      category: "Lighting",
      price: 24800,
      image: "assets/img/products/arco-brass-lamp.jpg",
      materials: "Solid brass, linen, marble",
      dimensions: "H 210 · Reach 92 cm",
      finish: "Unlacquered brass, marble base",
      blurb:
        "An unbroken brass arc balanced on a marble base. We leave the brass unlacquered so it patinates with the room.",
    },
    {
      id: "studio-lounge-chair",
      name: "Studio Lounge Chair",
      style: "contemporary",
      category: "Seating",
      price: 42600,
      image: "assets/img/products/studio-lounge-chair.jpg",
      featured: true,
      materials: "Wool bouclé, solid oak",
      dimensions: "W 74 · D 78 · H 80 cm",
      finish: "Sculpted shell, oak legs",
      blurb:
        "A single sculpted shell that holds you at exactly the right angle. The Studio is the chair our clients ask for twice.",
    },
    {
      id: "meridian-buffet",
      name: "Meridian Buffet",
      style: "contemporary",
      category: "Storage",
      price: 96000,
      image: "assets/img/products/meridian-buffet.jpg",
      materials: "Solid oak, blackened steel",
      dimensions: "W 180 · D 45 · H 82 cm",
      finish: "Brushed oak, leather pulls",
      blurb:
        "A long, low horizon of oak with leather pulls and a blackened steel base — generous storage that reads as architecture.",
    },
    {
      id: "atlas-console",
      name: "Atlas Walnut Console",
      style: "contemporary",
      category: "Tables",
      price: 52300,
      image: "assets/img/products/atlas-console.jpg",
      materials: "American walnut",
      dimensions: "W 120 · D 40 · H 80 cm",
      finish: "Oiled walnut, brass knobs",
      blurb:
        "Two shallow drawers, splayed legs and a top thin enough to disappear. Cut from one walnut board so the grain runs the full length.",
    },
    {
      id: "sorrento-rattan-chair",
      name: "Sorrento Rattan Chair",
      style: "boho",
      category: "Seating",
      price: 28700,
      image: "assets/img/products/sorrento-rattan-chair.jpg",
      materials: "Natural rattan, linen cushion",
      dimensions: "W 74 · D 76 · H 86 cm",
      finish: "Hand-woven, natural oil",
      blurb:
        "Woven over three days by a single maker, the Sorrento is light enough to move with the sun and strong enough for a lifetime.",
    },
    {
      id: "cane-dining-chair",
      name: "Cane Dining Chair",
      style: "boho",
      category: "Seating",
      price: 14900,
      image: "assets/img/products/cane-dining-chair.jpg",
      materials: "Solid ash, cane webbing",
      dimensions: "W 46 · D 52 · H 84 cm",
      finish: "Bleached ash, natural cane",
      blurb:
        "A quiet everyday chair: solid ash, hand-woven cane and a seat that gets more comfortable with use.",
    },
    {
      id: "souk-arch-mirror",
      name: "Souk Arched Mirror",
      style: "boho",
      category: "Objects",
      price: 21400,
      image: "assets/img/products/souk-arch-mirror.jpg",
      badge: "New",
      materials: "Ash frame, bevelled glass",
      dimensions: "W 90 · H 150 cm",
      finish: "Limewashed ash",
      blurb:
        "An arch borrowed from old Cairo doorways, scaled for the hallway. The frame is limewashed by hand so the grain stays visible.",
    },
    {
      id: "harvest-live-edge-table",
      name: "Harvest Live-Edge Table",
      style: "rustic",
      category: "Tables",
      price: 112000,
      image: "assets/img/products/harvest-live-edge-table.jpg",
      badge: "One of one",
      featured: true,
      materials: "Single-slab oak, steel base",
      dimensions: "W 220 · D 100 · H 76 cm",
      finish: "Natural oil, hand-finished edge",
      blurb:
        "A single slab, air-dried for two years and finished only with oil. The blackened steel base is made to measure so the top appears to float.",
    },
    {
      id: "farmhouse-weathered-sideboard",
      name: "Farmhouse Weathered Sideboard",
      style: "rustic",
      category: "Storage",
      price: 61500,
      image: "assets/img/products/farmhouse-weathered-sideboard.jpg",
      materials: "Reclaimed pine, iron hardware",
      dimensions: "W 150 · D 45 · H 85 cm",
      finish: "Hand-waxed reclaimed timber",
      blurb:
        "Built from timber recovered from old Delta farmhouses. The knots and nail marks are left exactly where we found them.",
    },
    {
      id: "orchard-dining-setting",
      name: "Orchard Dining Setting",
      style: "rustic",
      category: "Tables",
      price: 146000,
      image: "assets/img/products/orchard-dining-setting.jpg",
      materials: "Oak, cane seats",
      dimensions: "Table W 240 · seats 6–8",
      finish: "Brushed oak, natural cane",
      blurb:
        "A long oak table with six hand-woven seats, made for Fridays that run into the evening. Sold as a complete setting.",
    },
    {
      id: "forge-leather-sofa",
      name: "Forge Leather Sofa",
      style: "industrial",
      category: "Seating",
      price: 142000,
      image: "assets/img/products/forge-leather-sofa.jpg",
      badge: "Signature",
      featured: true,
      materials: "Full-grain leather, beech",
      dimensions: "W 230 · D 95 · H 74 cm",
      finish: "Hand-dyed cognac leather",
      blurb:
        "Full-grain leather, hand-dyed in cognac and stitched with waxed linen thread. The Forge is built to record every year it spends with you.",
    },
    {
      id: "atelier-walnut-desk",
      name: "Atelier Walnut Desk",
      style: "industrial",
      category: "Tables",
      price: 46500,
      image: "assets/img/products/atelier-walnut-desk.jpg",
      materials: "Solid walnut, steel",
      dimensions: "W 120 · D 55 · H 76 cm",
      finish: "Oiled walnut, powder-coated steel",
      blurb:
        "A working desk with a thin walnut top on blackened steel legs — the same bench we build on in the atelier.",
    },
    {
      id: "girder-shelving",
      name: "Girder Shelving Unit",
      style: "industrial",
      category: "Storage",
      price: 34200,
      image: "assets/img/products/girder-shelving.jpg",
      materials: "Blackened steel, solid oak",
      dimensions: "W 90 · D 35 · H 190 cm",
      finish: "Blackened steel, oiled oak shelves",
      blurb:
        "An open steel frame with solid oak shelves — five tiers of quiet, structural storage that can be added to over time.",
    },
  ];

  const gallery = [
    { image: "assets/img/gallery/the-nil-suite.jpg", title: "The Nile Suite", place: "Zamalek, Cairo", category: "Living" },
    { image: "assets/img/gallery/warm-minimal.jpg", title: "Warm Minimal", place: "Sheikh Zayed", category: "Living" },
    { image: "assets/img/gallery/villa-sharq.jpg", title: "Villa Sharq", place: "New Cairo", category: "Living" },
    { image: "assets/img/gallery/walnut-salon.jpg", title: "Walnut Salon", place: "Garden City", category: "Living" },
    { image: "assets/img/gallery/downtown-loft.jpg", title: "Downtown Loft", place: "Alexandria", category: "Studio" },
    { image: "assets/img/gallery/souk-house.jpg", title: "Souk House", place: "Maadi, Cairo", category: "Living" },
    { image: "assets/img/gallery/palm-courtyard.jpg", title: "Palm Courtyard", place: "El Gouna", category: "Living" },
    { image: "assets/img/gallery/farmhouse-dining.jpg", title: "Farmhouse Dining", place: "Fayoum", category: "Dining" },
    { image: "assets/img/gallery/marble-apartment.jpg", title: "Marble Apartment", place: "Heliopolis", category: "Living" },
    { image: "assets/img/gallery/linen-bedroom.jpg", title: "Linen Bedroom", place: "Maadi", category: "Bedroom" },
    { image: "assets/img/gallery/stone-bedroom.jpg", title: "Stone Bedroom", place: "New Zayed", category: "Bedroom" },
    { image: "assets/img/gallery/brass-residence.jpg", title: "Brass Residence", place: "San Stefano", category: "Living" },
  ];

  const pages = [
    { title: "Home", meta: "Page", url: "index.html", icon: "home" },
    { title: "Products — The Collection", meta: "Page", url: "products.html", icon: "grid" },
    { title: "Gallery — Rooms we have furnished", meta: "Page", url: "gallery.html", icon: "image" },
    { title: "About — Since 1998", meta: "Page", url: "story.html", icon: "book" },
    { title: "Contact Us — Showroom in Cairo", meta: "Page", url: "contact.html", icon: "mail" },
  ];

  const testimonials = [
    {
      text: "They measured the room three times and the sofa arrived on the exact millimetre. Two years later it still feels like the first week.",
      by: "Nour & Karim — Zamalek",
    },
    {
      text: "We asked for a table long enough for eleven people and warm enough that nobody wants to leave it. That is precisely what we got.",
      by: "Layla Farid — Sheikh Zayed",
    },
    {
      text: "The atelier let us sit in the workshop while the frame was being joined. You do not forget who made your furniture after that.",
      by: "Omar H.— Garden City",
    },
  ];

  /* Category menu shown in the Products dropdown — names are the atelier's
     planned pieces, searchable and linked to the collection for now. */
  const catalogue = [
    { cat: "Chairs", items: ["VELORA", "CORVEN", "ELORA", "AVENOR", "MAROVA", "ORVANO", "MADERO", "MOREVA"] },
    { cat: "Sofas", items: ["BRAM", "REBA", "MERA", "KOVA", "LOIRE", "LENO", "BLOCE"] },
    { cat: "Coffee tables", items: ["OCTARO", "OVARO", "MAVRO", "OFFSET", "KURO", "ECLIPSE", "CASCADE"] },
    { cat: "Dining tables", items: ["DORIAN", "CORBEL", "ROVE", "DOWEL", "HALDEN"] },
    { cat: "Consoles", items: ["VERTUS", "KAEL", "ELBA", "VANE"] },
    { cat: "Nightstands", items: ["VESPER", "SOREN", "NOLAN", "TARO", "ORION", "TOVA", "AIDER", "RHEA"] },
    { cat: "Beds", items: ["AUREN", "ORVESSA"] },
  ];

  window.SITE = { styles, products, gallery, pages, testimonials, catalogue };
})();
