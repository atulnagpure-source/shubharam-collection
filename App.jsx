import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Instagram,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";

/* ============================================================================
   SHUBHARAM COLLECTION — single-file storefront
   Styles, product data and every component live in this one file.
   To go live: change `whatsapp` below to the business number
   (country code + number, digits only) and swap product photos if needed.
   ========================================================================== */

const STORE = {
  name: "Shubharam Collection",
  whatsapp: "919000000000", // ← replace with the real business WhatsApp number
  instagram: "https://www.instagram.com/",
  email: "care@shubharamcollection.com",
  city: "Maharashtra",
  hours: "Mon – Sat · 10 am to 8 pm IST",
};

const PRODUCTS = [
  {
    id: "saffron-zardozi-saree",
    name: "Saffron Zardozi Saree",
    detail: "Hand-embroidered zardozi on pure silk",
    price: 24500,
    mrp: 28900,
    category: "Sarees",
    tag: "Signature",
    sizes: ["Free Size"],
    colour: "Saffron gold",
    image: "https://media.base44.com/images/public/6ae6e65977dda432763374b3/9345cd93f_generated_f644c490.png",
    note:
      "Six weeks of hand work by our Jaipur karigars. Pure mulberry silk with a gold zardozi border, finished with a hand-rolled pico. Comes with an unstitched blouse piece.",
  },
  {
    id: "ivory-chanderi-set",
    name: "Ivory Chanderi Set",
    detail: "Silver thread work · Kurta, palazzo, dupatta",
    price: 18200,
    category: "Suits & Kurtas",
    tag: "New",
    sizes: ["XS", "S", "M", "L", "XL"],
    colour: "Ivory",
    image: "https://media.base44.com/images/public/6ae6e65977dda432763374b3/b70332d10_generated_b7cbb881.png",
    note:
      "Feather-light Chanderi silk with delicate silver buti. Cut for warm days — breathable, unlined and easy to travel with.",
  },
  {
    id: "basalt-midnight-kurta",
    name: "Basalt Midnight Kurta",
    detail: "Raw silk texture · Hand-finished placket",
    price: 12000,
    category: "Suits & Kurtas",
    sizes: ["S", "M", "L", "XL"],
    colour: "Charcoal",
    image: "https://media.base44.com/images/public/6ae6e65977dda432763374b3/ef69e9c85_generated_9f4a67a3.png",
    note:
      "A quiet, sculptural kurta in raw silk that holds its shape. Mother-of-pearl buttons and a narrow mandarin collar.",
  },
  {
    id: "emerald-heritage-wrap",
    name: "Emerald Heritage Wrap",
    detail: "Pashmina blend · Woven paisley border",
    price: 32000,
    mrp: 36500,
    category: "Dupattas & Shawls",
    tag: "Limited",
    sizes: ["Free Size"],
    colour: "Emerald",
    image: "https://media.base44.com/images/public/6ae6e65977dda432763374b3/d3a8293f1_generated_8bb46f9e.png",
    note:
      "Woven on handlooms in Kashmir, with a fine gold paisley border. Warm enough for December evenings, light enough to fold into a tote.",
  },
  {
    id: "rani-pink-lehenga",
    name: "Rani Pink Lehenga",
    detail: "Zardozi & sequin · Made to measure",
    price: 46500,
    category: "Lehengas",
    tag: "Bridal",
    sizes: ["XS", "S", "M", "L", "XL"],
    colour: "Rani pink",
    image: "https://media.base44.com/images/public/6ae6e65977dda432763374b3/a4e034208_generated_c5a90b77.png",
    note:
      "Our most requested wedding piece, stitched to your measurements in 12–14 days. Includes blouse and dupatta. Sizing call arranged on WhatsApp.",
  },
  {
    id: "pearl-kota-dupatta",
    name: "Pearl Kota Dupatta",
    detail: "Kota doria · Gold zari border",
    price: 6800,
    category: "Dupattas & Shawls",
    sizes: ["Free Size"],
    colour: "Ivory gold",
    image: "https://media.base44.com/images/public/6ae6e65977dda432763374b3/b7176a7ef_generated_53c16b9e.png",
    note:
      "The easiest way to finish a plain kurta. Airy Kota doria with a hand-woven zari edge, 2.5 metres.",
  },
];

const IMG = {
  hero: "https://media.base44.com/images/public/6ae6e65977dda432763374b3/29ddee151_generated_252ade55.png",
  atelier: "https://media.base44.com/images/public/6ae6e65977dda432763374b3/323b66055_generated_f7b67209.png",
};

const money = (n) => "₹" + n.toLocaleString("en-IN");
const wa = (text) => `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;

const CARD_SPAN = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const CARD_OFFSET = ["", "md:mt-24", "", "md:-mt-16"];
const CARD_RATIO = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[3/4]", "aspect-[4/5]"];

const REVIEWS = [
  {
    name: "Ananya R.",
    place: "Bengaluru",
    text: "Ordered the saffron saree for my sister's mehendi. The zardozi is even finer in person — and the team sent videos before shipping.",
  },
  {
    name: "Meera & Kabir",
    place: "Mumbai",
    text: "The lehenga was stitched to my measurements without a single fitting. Everything was coordinated on WhatsApp in a day.",
  },
  {
    name: "Shalini K.",
    place: "Delhi",
    text: "Ivory Chanderi set is now my go-to for every summer function. Light, beautifully finished, and it arrived in four days.",
  },
];

/* ------------------------------- primitives ------------------------------ */

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(26px)",
        transition:
          "opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function WhatsAppCta({ text, label = "Enquire on WhatsApp", tone = "dark", className = "" }) {
  const base =
    "inline-flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] px-6 py-3.5 transition-colors duration-300";
  const tones = {
    dark: "bg-[#1A1A1A] text-[#FCF9F0] hover:bg-[#AF835E]",
    light: "border border-[#1A1A1A]/25 text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FCF9F0]",
    green: "bg-[#25D366] text-[#0B2E1B] hover:bg-[#1FBE59] font-semibold",
  };
  return (
    <a
      href={wa(text)}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${tones[tone]} ${className}`}
    >
      <MessageCircle className="w-4 h-4 shrink-0" />
      {label}
    </a>
  );
}

/* --------------------------------- header -------------------------------- */

function Header({ count, onBag, scrolled }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Collection", "#collection"],
    ["Atelier", "#atelier"],
    ["Reviews", "#reviews"],
    ["Visit", "#visit"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="bg-[#1A1A1A] text-[#FCF9F0]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-2 flex items-center justify-center gap-3 text-center">
          <Sparkles className="w-3 h-3 shrink-0 text-[#AF835E]" />
          <p className="text-[9px] md:text-[10px] tracking-[0.24em] uppercase truncate">
            Handwoven in India · Complimentary shipping · Order on WhatsApp
          </p>
        </div>
      </div>

      <div
        className={
          "transition-all duration-500 " +
          (scrolled
            ? "bg-[#FCF9F0]/95 backdrop-blur-md border-b border-[#1A1A1A]/10"
            : "bg-[#FCF9F0]/60 backdrop-blur-sm border-b border-transparent")
        }
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4">
          <a href="#top" className="leading-none shrink-0">
            <span className="serif block text-lg md:text-2xl tracking-[0.02em]">SHUBHARAM</span>
            <span className="block text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-[#AF835E] mt-1">
              Collection
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="nav-underline text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A]/75 hover:text-[#1A1A1A]"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <WhatsAppCta
              text={`Hello ${STORE.name}! I'd like to know more about your collection.`}
              label="WhatsApp"
              tone="green"
              className="hidden sm:inline-flex !px-4 !py-2.5 !text-[10px]"
            />
            <button
              onClick={onBag}
              className="relative inline-flex items-center gap-2 border border-[#1A1A1A]/20 rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] hover:border-[#1A1A1A] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#AF835E] text-[#FCF9F0] text-[10px] leading-[18px] text-center">
                {count}
              </span>
            </button>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 -mr-2"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#FCF9F0] px-6 py-6 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="serif text-lg tracking-[0.02em]">SHUBHARAM</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="mt-14 flex flex-col gap-7">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="serif text-3xl"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <WhatsAppCta
              text={`Hello ${STORE.name}! I'd like to know more about your collection.`}
              label="Chat on WhatsApp"
              tone="green"
              className="w-full !py-4"
            />
            <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-[#1A1A1A]/45">
              {STORE.city}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------- hero --------------------------------- */

function Hero() {
  return (
    <section id="top" className="pt-[104px] md:pt-[124px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="md:col-span-7">
            <p className="eyebrow rise">Est. 2019 · Maharashtra</p>
            <h1 className="serif mt-5 text-[clamp(2.7rem,8.4vw,6.6rem)] leading-[0.92] rise" style={{ animationDelay: "80ms" }}>
              The <em className="italic text-[#AF835E]">auspicious</em>
              <br />
              beginnings.
            </h1>
          </div>

          <div className="md:col-span-5 md:pb-4">
            <p className="rise text-[15px] md:text-lg leading-relaxed text-[#1A1A1A]/70 max-w-md" style={{ animationDelay: "180ms" }}>
              A considered anthology of hand-woven heritage and modern
              silhouettes — sarees, suits and lehengas made in small batches by
              our own karigars.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "280ms" }}>
              <a
                href="#collection"
                className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#FCF9F0] text-[11px] uppercase tracking-[0.2em] px-7 py-4 hover:bg-[#AF835E] transition-colors duration-300"
              >
                Explore the collection
                <ArrowRight className="w-4 h-4" />
              </a>
              <WhatsAppCta
                text={`Hello ${STORE.name}! I'd like to order. Could you help me choose?`}
                label="Order on WhatsApp"
                tone="light"
                className="!py-4"
              />
            </div>
            <div className="rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[10px] uppercase tracking-[0.18em] text-[#1A1A1A]/55" style={{ animationDelay: "360ms" }}>
              <span className="inline-flex items-center gap-2">
                <Star className="w-3.5 h-3.5 fill-[#AF835E] text-[#AF835E]" /> 4.9 / 5 · 800+ orders
              </span>
              <span className="inline-flex items-center gap-2">
                <Truck className="w-3.5 h-3.5" /> India-wide delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 md:mt-14 relative">
        <img
          src={IMG.hero}
          alt="Model in a saffron gold zardozi silk saree in a sunlit Jaipur courtyard"
          className="w-full h-[52vh] md:h-[82vh] object-cover object-center fade"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A1A1A]/70 via-[#1A1A1A]/10 to-transparent h-40 md:h-56 pointer-events-none" />
        <div className="absolute bottom-6 md:bottom-10 left-5 md:left-10 right-5 md:right-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-sm">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#FCF9F0]/70">The Wedding Edit</p>
            <p className="serif text-2xl md:text-4xl text-[#FCF9F0] mt-2 leading-tight">
              Saffron, emerald &amp; moonlit gold
            </p>
          </div>
          <a
            href="#collection"
            className="inline-flex items-center gap-2 bg-[#FCF9F0] text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] px-6 py-3.5 hover:bg-[#AF835E] hover:text-[#FCF9F0] transition-colors"
          >
            Shop the edit
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- trust bar ------------------------------- */

function TrustBar() {
  const items = [
    "Hand-woven, never mass produced",
    "Made-to-measure at no extra cost",
    "Videos before we ship",
    "14-day easy returns",
  ];
  return (
    <div className="border-y border-[#1A1A1A]/10 mt-14 md:mt-20 bg-[#F6F1E5]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {items.map((t) => (
          <span key={t} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#1A1A1A]/65">
            <Check className="w-3.5 h-3.5 text-[#AF835E]" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- collection ------------------------------ */

function ProductCard({ product, index, onOpen }) {
  const span = CARD_SPAN[index % 4];
  const offset = CARD_OFFSET[index % 4];
  const ratio = CARD_RATIO[index % 4];

  return (
    <Reveal className={`${span} ${offset}`} delay={(index % 2) * 90}>
      <article className="group">
        <div className={`relative overflow-hidden bg-[#EFE9DC] ${ratio}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          {product.tag && (
            <span className="absolute top-4 left-4 bg-[#FCF9F0]/95 text-[9px] uppercase tracking-[0.2em] px-3 py-1.5">
              {product.tag}
            </span>
          )}
          <button
            onClick={() => onOpen(product)}
            className="hidden md:block absolute inset-x-3 bottom-3 bg-[#FCF9F0]/95 backdrop-blur text-[10px] uppercase tracking-[0.22em] py-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
          >
            Quick view
          </button>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="serif text-xl md:text-[26px] leading-tight">{product.name}</h3>
            <p className="text-[12.5px] text-[#1A1A1A]/50 mt-1.5">{product.detail}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="serif text-lg">{money(product.price)}</p>
            {product.mrp && (
              <p className="text-[11px] line-through text-[#1A1A1A]/35 mt-0.5">{money(product.mrp)}</p>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => onOpen(product)}
            className="flex-1 border border-[#1A1A1A]/20 hover:border-[#1A1A1A] py-3 text-[10px] uppercase tracking-[0.2em] transition-colors"
          >
            Details
          </button>
          <a
            href={wa(
              `Hello ${STORE.name}! I'm interested in the ${product.name} (${money(
                product.price
              )}). Is it available?`
            )}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-[#FCF9F0] hover:bg-[#AF835E] py-3 text-[10px] uppercase tracking-[0.2em] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Enquire
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function Collection({ filter, setFilter, categories, shown, onOpen }) {
  return (
    <section id="collection" className="scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 pt-20 md:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#1A1A1A]/10 pb-6">
          <div>
            <p className="eyebrow">The Atelier Grid</p>
            <h2 className="serif text-[clamp(2.1rem,5vw,3.6rem)] leading-none mt-4">
              The Collection
            </h2>
          </div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#1A1A1A]/45">
            {String(shown.length).padStart(2, "0")} pieces available
          </p>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto hide-scroll pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={
                "shrink-0 px-4 py-2 rounded-full border text-[10px] uppercase tracking-[0.18em] transition-colors " +
                (filter === c
                  ? "bg-[#1A1A1A] text-[#FCF9F0] border-[#1A1A1A]"
                  : "border-[#1A1A1A]/20 text-[#1A1A1A]/70 hover:border-[#1A1A1A]")
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-14 md:gap-y-6">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} index={PRODUCTS.indexOf(p)} onOpen={onOpen} />
          ))}
        </div>

        <div className="mt-20 md:mt-28 border border-[#1A1A1A]/12 bg-[#F6F1E5] px-6 py-10 md:px-14 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="serif text-2xl md:text-4xl leading-tight">
              Looking for something made to measure?
            </h3>
            <p className="mt-3 text-[14px] text-[#1A1A1A]/60 max-w-lg">
              Share a photo or a reference on WhatsApp — we will send fabric
              options, timelines and pricing within a day.
            </p>
          </div>
          <WhatsAppCta
            text={`Hello ${STORE.name}! I'd like something made to measure. Here is my reference:`}
            label="Start on WhatsApp"
            className="shrink-0"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- quick view ------------------------------ */

function QuickView({ product, onClose, onAdd }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[#1A1A1A]/55 backdrop-blur-sm fade"
      />
      <div className="absolute inset-0 overflow-y-auto p-0 md:p-8 flex items-start md:items-center justify-center">
        <div className="relative w-full max-w-4xl bg-[#FCF9F0] shadow-2xl">
          <button
            onClick={onClose}
            aria-label="Close product"
            className="absolute top-3 right-3 z-10 bg-[#FCF9F0]/90 rounded-full p-2.5 hover:bg-[#1A1A1A] hover:text-[#FCF9F0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid md:grid-cols-2">
            <div className="aspect-[4/5] bg-[#EFE9DC] md:aspect-auto md:h-full md:min-h-[520px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-10 md:max-h-[82vh] md:overflow-y-auto">
              <p className="eyebrow">{product.category}</p>
              <h3 className="serif text-3xl md:text-4xl leading-tight mt-3">{product.name}</h3>
              <p className="mt-2 text-[13px] text-[#1A1A1A]/55">{product.detail}</p>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="serif text-2xl">{money(product.price)}</span>
                {product.mrp && (
                  <span className="text-[12px] line-through text-[#1A1A1A]/35">
                    {money(product.mrp)}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#AF835E]">
                  incl. taxes
                </span>
              </div>

              <p className="mt-5 text-[14px] leading-relaxed text-[#1A1A1A]/70">{product.note}</p>

              <div className="mt-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/50">
                  Size
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={
                        "px-4 py-2 border text-[11px] uppercase tracking-[0.12em] transition-colors " +
                        (size === s
                          ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#FCF9F0]"
                          : "border-[#1A1A1A]/20 hover:border-[#1A1A1A]")
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center border border-[#1A1A1A]/20">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-3 hover:text-[#AF835E]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-[13px]">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="p-3 hover:text-[#AF835E]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-[#1A1A1A]/50 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" /> Dispatched in 3–5 days
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-2.5">
                <a
                  href={wa(
                    `Hello ${STORE.name}! I'd like to order:\n\n${product.name}\nSize: ${size}\nQuantity: ${qty}\nPrice: ${money(
                      product.price * qty
                    )}\n\nPlease confirm availability and share payment details.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-[#0B2E1B] font-semibold hover:bg-[#1FBE59] transition-colors px-6 py-4 text-[11px] uppercase tracking-[0.2em]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </a>
                <button
                  onClick={() => {
                    onAdd(product, size, qty);
                    onClose();
                  }}
                  className="inline-flex items-center justify-center gap-2 border border-[#1A1A1A]/25 hover:border-[#1A1A1A] px-6 py-4 text-[11px] uppercase tracking-[0.2em] transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to bag
                </button>
              </div>

              <p className="mt-5 text-[11px] leading-relaxed text-[#1A1A1A]/45">
                Every piece is checked and photographed before dispatch. Custom
                stitching and blouse measurements are arranged on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- bag drawer ----------------------------- */

function BagDrawer({ open, bag, onClose, onQty, onRemove, onOrder }) {
  const total = bag.reduce((s, i) => s + (PRODUCTS.find((p) => p.id === i.id)?.price || 0) * i.qty, 0);

  return (
    <>
      <div
        onClick={onClose}
        className={
          "fixed inset-0 z-50 bg-[#1A1A1A]/50 transition-opacity duration-500 " +
          (open ? "opacity-100" : "opacity-0 pointer-events-none")
        }
      />
      <aside
        className={
          "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#FCF9F0] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
          (open ? "translate-x-0" : "translate-x-full")
        }
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1A1A1A]/10">
          <div>
            <p className="eyebrow">Your selection</p>
            <h3 className="serif text-2xl mt-1">The Bag</h3>
          </div>
          <button onClick={onClose} aria-label="Close bag" className="p-2 -mr-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {bag.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-8 h-8 text-[#1A1A1A]/20" />
              <p className="serif text-xl mt-4">Your bag is empty</p>
              <p className="text-[13px] text-[#1A1A1A]/50 mt-2 max-w-[240px]">
                Add a piece to send your selection straight to our WhatsApp
                concierge.
              </p>
              <button
                onClick={onClose}
                className="mt-6 border border-[#1A1A1A]/25 hover:border-[#1A1A1A] px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors"
              >
                Browse collection
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {bag.map((item) => {
                const p = PRODUCTS.find((x) => x.id === item.id);
                if (!p) return null;
                return (
                  <li key={item.id + item.size} className="flex gap-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-20 h-24 object-cover bg-[#EFE9DC] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-3">
                        <h4 className="serif text-[17px] leading-tight truncate">{p.name}</h4>
                        <button
                          onClick={() => onRemove(item.id, item.size)}
                          aria-label={`Remove ${p.name}`}
                          className="text-[#1A1A1A]/35 hover:text-[#1A1A1A] shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#1A1A1A]/45 mt-1">
                        Size {item.size}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-[#1A1A1A]/20">
                          <button
                            onClick={() => onQty(item.id, item.size, -1)}
                            className="p-2 hover:text-[#AF835E]"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-[12px]">{item.qty}</span>
                          <button
                            onClick={() => onQty(item.id, item.size, 1)}
                            className="p-2 hover:text-[#AF835E]"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[13px]">{money(p.price * item.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {bag.length > 0 && (
          <div className="border-t border-[#1A1A1A]/10 px-6 py-6">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/55">
                Subtotal
              </span>
              <span className="serif text-2xl">{money(total)}</span>
            </div>
            <button
              onClick={onOrder}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-[#0B2E1B] font-semibold hover:bg-[#1FBE59] transition-colors px-6 py-4 text-[11px] uppercase tracking-[0.2em]"
            >
              <MessageCircle className="w-4 h-4" />
              Send order on WhatsApp
            </button>
            <p className="mt-3 text-[11px] text-center text-[#1A1A1A]/45">
              No online payment here — we confirm stock and share a secure
              payment link on chat.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

/* -------------------------------- atelier -------------------------------- */

function Atelier() {
  return (
    <section id="atelier" className="scroll-mt-32 mt-20 md:mt-32 bg-[#F6F1E5] py-16 md:py-28">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <Reveal className="md:col-span-6">
          <div className="aspect-[3/2] overflow-hidden bg-[#EFE9DC]">
            <img
              src={IMG.atelier}
              alt="Artisan hands embroidering gold zardozi on saffron silk"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal className="md:col-span-6" delay={120}>
          <p className="eyebrow">Inside the atelier</p>
          <h2 className="serif text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] mt-4">
            Made by hand, one
            <br />
            needle at a time.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-[#1A1A1A]/65 max-w-lg">
            Shubharam began with a small workroom in Jaipur — twelve karigars, a
            shared chai table and a belief that an heirloom should be lived in,
            not locked away. Every saree is finished by the same hands that
            wove it.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              ["12", "karigars"],
              ["6 wks", "per saree"],
              ["800+", "orders shipped"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="serif text-2xl md:text-3xl">{n}</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/45 mt-1.5">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- reviews -------------------------------- */

function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-20 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#1A1A1A]/10 pb-6">
          <div>
            <p className="eyebrow">Kind words</p>
            <h2 className="serif text-[clamp(2rem,4.6vw,3.4rem)] leading-none mt-4">
              Worn &amp; loved
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/50">
            <span className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#AF835E] text-[#AF835E]" />
              ))}
            </span>
            4.9 average
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-8 md:gap-10">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 90}>
              <figure className="h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-[#AF835E] text-[#AF835E]" />
                  ))}
                </div>
                <blockquote className="serif text-lg md:text-[21px] leading-[1.5] text-[#1A1A1A]/85">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-auto pt-6 text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/45">
                  {r.name} · {r.place}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- visit --------------------------------- */

function Visit() {
  return (
    <section id="visit" className="scroll-mt-32 bg-[#1A1A1A] text-[#FCF9F0]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-28 grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-7">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[#AF835E]">Talk to us</p>
          <h2 className="serif text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.03] mt-4">
            One message is all
            <br />
            it takes.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-[#FCF9F0]/65 max-w-lg">
            Ask for a video of any piece, request custom measurements, or place
            your order — our team replies within a few hours on WhatsApp.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <WhatsAppCta
              text={`Hello ${STORE.name}! I'd like to place an order.`}
              label="Chat on WhatsApp"
              tone="green"
              className="!py-4"
            />
            <a
              href={`mailto:${STORE.email}`}
              className="inline-flex items-center gap-2 border border-[#FCF9F0]/25 hover:border-[#FCF9F0] text-[11px] uppercase tracking-[0.2em] px-6 py-4 transition-colors"
            >
              Email us
            </a>
          </div>
        </div>

        <div className="md:col-span-5 md:pl-10 md:border-l md:border-[#FCF9F0]/15">
          <dl className="space-y-7">
            {[
              ["WhatsApp", "Tap to start a chat"],
              ["Studio", STORE.city],
              ["Hours", STORE.hours],
              ["Email", STORE.email],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[9px] uppercase tracking-[0.28em] text-[#FCF9F0]/40">{k}</dt>
                <dd className="mt-2 text-[15px] text-[#FCF9F0]/90">{v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={STORE.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#FCF9F0]/70 hover:text-[#AF835E] transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Follow the atelier
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- footer -------------------------------- */

function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#FCF9F0]/70 border-t border-[#FCF9F0]/10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-12 md:py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <p className="serif text-2xl text-[#FCF9F0] tracking-[0.02em]">SHUBHARAM</p>
          <p className="text-[8px] tracking-[0.4em] uppercase text-[#AF835E] mt-1">Collection</p>
          <p className="mt-5 text-[13px] leading-relaxed max-w-xs">
            Handcrafted ethnic wear from Jaipur, made for life's most auspicious
            moments.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#FCF9F0]/35">Explore</p>
          <ul className="mt-4 space-y-3 text-[13px]">
            {[
              ["Collection", "#collection"],
              ["Atelier", "#atelier"],
              ["Reviews", "#reviews"],
              ["Visit", "#visit"],
            ].map(([l, h]) => (
              <li key={l}>
                <a href={h} className="hover:text-[#FCF9F0] transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#FCF9F0]/35">Connect</p>
          <ul className="mt-4 space-y-3 text-[13px]">
            <li>
              <a
                href={wa(`Hello ${STORE.name}!`)}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FCF9F0] transition-colors"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={STORE.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FCF9F0] transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a href={`mailto:${STORE.email}`} className="hover:text-[#FCF9F0] transition-colors">
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#FCF9F0]/10">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-5 flex flex-wrap items-center justify-between gap-2 text-[9px] uppercase tracking-[0.22em] text-[#FCF9F0]/35">
          <span>© {new Date().getFullYear()} {STORE.name}</span>
          <span>Made in India · Direct-to-artisan</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- page --------------------------------- */

export default function Home() {
  const [bag, setBag] = useState([]);
  const [filter, setFilter] = useState("All");
  const [quick, setQuick] = useState(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const locked = Boolean(quick) || bagOpen;
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);

  const categories = useMemo(() => ["All", ...new Set(PRODUCTS.map((p) => p.category))], []);
  const shown = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
  const count = bag.reduce((s, i) => s + i.qty, 0);

  const addToBag = (product, size, qty = 1) => {
    setBag((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id && i.size === size);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { id: product.id, size, qty }];
    });
    setToast(`${product.name} added to your bag`);
  };

  const changeQty = (id, size, delta) => {
    setBag((prev) =>
      prev
        .map((i) => (i.id === id && i.size === size ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id, size) => setBag((prev) => prev.filter((i) => !(i.id === id && i.size === size)));

  const sendBagOrder = () => {
    const lines = bag.map((i) => {
      const p = PRODUCTS.find((x) => x.id === i.id);
      return `• ${p.name} — ${i.size} × ${i.qty} — ${money(p.price * i.qty)}`;
    });
    const total = bag.reduce(
      (s, i) => s + (PRODUCTS.find((p) => p.id === i.id)?.price || 0) * i.qty,
      0
    );
    const text = [
      `Hello ${STORE.name}! I'd like to place this order:`,
      "",
      ...lines,
      "",
      `Order total: ${money(total)}`,
      "",
      "Please confirm availability and share the payment link.",
    ].join("\n");
    window.open(wa(text), "_blank", "noopener");
  };

  return (
    <div className="shub min-h-screen overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');

        .shub {
          --parchment: #FCF9F0;
          --basalt: #1A1A1A;
          --saffron: #AF835E;
          background-color: #FCF9F0;
          color: #1A1A1A;
          font-family: 'Inter', system-ui, -apple-system, Segoe UI, sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        .shub .serif {
          font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        .shub .eyebrow {
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #AF835E;
        }
        .shub ::selection { background: #AF835E; color: #FCF9F0; }
        .shub .nav-underline { position: relative; }
        .shub .nav-underline::after {
          content: '';
          position: absolute;
          left: 0; bottom: -5px;
          height: 1px; width: 0;
          background: #1A1A1A;
          transition: width .45s cubic-bezier(.16,1,.3,1);
        }
        .shub .nav-underline:hover::after { width: 100%; }
        .shub .hide-scroll::-webkit-scrollbar { display: none; }
        .shub .hide-scroll { scrollbar-width: none; }

        @keyframes sh-rise {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sh-fade { from { opacity: 0; } to { opacity: 1; } }
        .shub .rise { animation: sh-rise .95s cubic-bezier(.16,1,.3,1) both; }
        .shub .fade { animation: sh-fade 1.1s ease both; }

        @media (prefers-reduced-motion: reduce) {
          .shub *, .shub *::before, .shub *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <Header count={count} onBag={() => setBagOpen(true)} scrolled={scrolled} />

      <main>
        <Hero />
        <TrustBar />
        <Collection
          filter={filter}
          setFilter={setFilter}
          categories={categories}
          shown={shown}
          onOpen={setQuick}
        />
        <Atelier />
        <Reviews />
        <Visit />
      </main>

      <Footer />

      {quick && (
        <QuickView
          key={quick.id}
          product={quick}
          onClose={() => setQuick(null)}
          onAdd={addToBag}
        />
      )}

      <BagDrawer
        open={bagOpen}
        bag={bag}
        onClose={() => setBagOpen(false)}
        onQty={changeQty}
        onRemove={removeItem}
        onOrder={sendBagOrder}
      />

      {/* floating WhatsApp */}
      {!locked && (
        <a
          href={wa(`Hello ${STORE.name}! I'd like to order from your collection.`)}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2.5 bg-[#25D366] text-[#0B2E1B] font-semibold shadow-lg hover:bg-[#1FBE59] transition-all px-4 py-3.5 rounded-full text-[10px] uppercase tracking-[0.18em]"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Order on WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 bg-[#1A1A1A] text-[#FCF9F0] px-5 py-3 text-[11px] uppercase tracking-[0.16em] fade">
          {toast}
        </div>
      )}
    </div>
  );
}
