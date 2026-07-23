import React, { useState, useMemo } from 'react';
import {
  Wrench, Gauge, Droplet, HardHat, AlertTriangle, Flame,
  ShoppingCart, X, Plus, Minus, Menu, ChevronRight, ChevronLeft,
  Check, Phone, Mail, MapPin, MessageCircle, Search, ArrowRight, ShieldCheck
} from 'lucide-react';

/* ---------------------------------- TOKENS ---------------------------------- */
const C = {
  navy: '#16324F',
  navyDark: '#0F2438',
  orange: '#E85B2C',
  orangeDark: '#C4471F',
  cream: '#F3F1EA',
  paper: '#FBFAF6',
  charcoal: '#23272B',
  steel: '#8C97A3',
  steelLight: '#D8DDE2',
  yellow: '#F2B705',
  white: '#FFFFFF',
};

const FONT_DISPLAY = "'Oswald', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

/* ---------------------------------- DATA ---------------------------------- */
const CATEGORIES = [
  { id: 'fs', code: 'FS', name: 'Fire Safety Equipment', icon: Flame, desc: 'Helmets, suppression systems & fire gear' },
  { id: 'ig', code: 'IG', name: 'Instrumentation & Gauges', icon: Gauge, desc: 'Pressure gauges & calibration instruments' },
  { id: 'mt', code: 'MT', name: 'Measuring & Hand Tools', icon: Wrench, desc: 'Calipers, tapes, levels & fitting tools' },
  { id: 'pf', code: 'PF', name: 'Pipe Fittings & Fluid Handling', icon: Droplet, desc: 'Flanges, strapping & pipe hardware' },
];

const PRODUCTS = [
  { id: 'FS-001', cat: 'fs', name: "Firefighter Safety Helmet with Heat-Reflective Neck Shield", size: 'Yellow Shell, Adjustable', price: 55000, stock: 'In Stock', specs: [['Shell Material', 'High-impact polymer'], ['Neck Shield', 'Aluminized heat-reflective foil'], ['Chin Strap', 'Adjustable buckle'], ['Use', 'Firefighting & high-heat environments']] },
  { id: 'FS-002', cat: 'fs', name: 'Multi-Port Fire Suppression Distribution Manifold', size: 'Multi-Outlet, Threaded Ports', price: 550000, stock: 'In Stock', specs: [['Body', 'Steel, powder-coated'], ['Outlets', 'Multiple threaded ports'], ['Mounting', 'Bracket-mounted stand'], ['Use', 'Sprinkler / hose line distribution']] },
  { id: 'IG-001', cat: 'ig', name: 'Industrial Pressure Gauge', size: '0-10 kg/cm², Flanged Stem', price: 40000, stock: 'In Stock', specs: [['Range', '0-10 kg/cm²'], ['Dial', 'Analog, glass face'], ['Mount', 'Flanged stem'], ['Use', 'Process pressure monitoring']] },
  { id: 'MT-001', cat: 'mt', name: 'Vernier Caliper, Large Format', size: 'Stainless Steel, Cased', price: 85000, stock: 'In Stock', specs: [['Material', 'Stainless steel'], ['Case', 'Hard carry case included'], ['Use', 'Precision measurement'], ['Scale', 'Metric / Imperial']] },
  { id: 'MT-002', cat: 'mt', name: "Pipe Fitter's Protractor & Centering Head Level", size: '0-90° Dial, Bubble Level', price: 85000, stock: 'In Stock', specs: [['Angle Range', '0-90°'], ['Level', 'Built-in bubble vial'], ['Material', 'Aluminum alloy'], ['Use', 'Pipe alignment & cut marking']] },
  { id: 'MT-003', cat: 'mt', name: 'Chalk Line Reel Set', size: '30m/100ft, w/ Blue Chalk', price: 20000, stock: 'In Stock', specs: [['Length', '30m / 100ft'], ['Level', 'Built-in bubble level'], ['Chalk', '115g blue chalk included'], ['Brand', 'Stanley']] },
  { id: 'MT-004', cat: 'mt', name: 'Powerwinder 100m Long Measure Tape', size: 'Fiberglass Blade, Fast Rewind', price: 55000, stock: 'In Stock', specs: [['Length', '100m / 330ft'], ['Blade', 'Fiberglass, non-conductive'], ['Rewind', 'Powerwinder fast rewind'], ['Brand', 'Stanley']] },
  { id: 'PF-001', cat: 'pf', name: 'Weld Neck Flange, 3-inch Class 600', size: 'Schedule 80, Carbon Steel', price: 48000, stock: 'In Stock', specs: [['Size', '3 inch'], ['Class', '600'], ['Schedule', '80'], ['Material', 'Carbon steel, A105']] },
  { id: 'PF-002', cat: 'pf', name: 'Stainless Steel Strapping Coil', size: '1/2 inch, C204 EDP 13204', price: 35000, stock: 'In Stock', specs: [['Width', '1/2 inch'], ['Material', 'Stainless steel'], ['Part No.', 'C204 EDP 13204'], ['Use', 'Pipe & hose banding / clamping']] },
];

const formatPrice = (n) => `\u20A6${n.toLocaleString('en-NG')}`;

/* ---------------------------------- SMALL PIECES ---------------------------------- */
function Fonts() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
      * { box-sizing: border-box; }
      .blueprint-bg {
        background-image:
          linear-gradient(${C.navyDark}00 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 100% 100%, 32px 32px, 32px 32px;
      }
      .tag-corner { position: absolute; width: 7px; height: 7px; border-radius: 50%; background: ${C.steelLight}; }
      @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; transition: none !important; }
      }
    `}</style>
  );
}

function EyebrowLabel({ children, dark }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 mb-4"
      style={{
        fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em',
        color: dark ? C.cream : C.orangeDark,
        border: `1px solid ${dark ? 'rgba(243,241,234,0.35)' : C.orange}`,
      }}
    >
      <span style={{ width: 6, height: 6, background: C.orange, display: 'inline-block' }} />
      {children.toUpperCase()}
    </div>
  );
}

function ProductCard({ product, onView, onAdd }) {
  const cat = CATEGORIES.find((c) => c.id === product.cat);
  return (
    <div
      className="relative flex flex-col"
      style={{ background: C.paper, border: `1px solid ${C.steelLight}` }}
    >
      <span className="tag-corner" style={{ top: 6, left: 6 }} />
      <span className="tag-corner" style={{ top: 6, right: 6 }} />
      <span className="tag-corner" style={{ bottom: 6, left: 6 }} />
      <span className="tag-corner" style={{ bottom: 6, right: 6 }} />

      <div className="px-4 pt-4 flex items-center justify-between">
        <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.steel, letterSpacing: '0.05em' }}>
          {product.id}
        </span>
        {product.stock === 'Low Stock' ? (
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.orangeDark, letterSpacing: '0.05em' }}>
            LOW STOCK
          </span>
        ) : (
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.steel, letterSpacing: '0.05em' }}>
            IN STOCK
          </span>
        )}
      </div>

      <div className="px-4 pt-3 pb-4 flex-1 flex flex-col">
        <div
          className="w-full flex items-center justify-center mb-4"
          style={{ height: 108, background: C.navy, backgroundImage: `linear-gradient(135deg, ${C.navy}, ${C.navyDark})` }}
        >
          {cat && <cat.icon size={40} color={C.cream} strokeWidth={1.4} />}
        </div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 17, color: C.charcoal, lineHeight: 1.25 }}>
          {product.name}
        </h3>
        <p style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.steel, marginTop: 4 }}>{product.size}</p>

        <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: `1px dashed ${C.steelLight}` }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 17, fontWeight: 700, color: C.navy }}>
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => onView(product.id)}
            style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.orangeDark, letterSpacing: '0.04em' }}
            className="hover:underline"
          >
            SPECS →
          </button>
        </div>
        <button
          onClick={() => onAdd(product.id)}
          className="mt-3 w-full py-2.5 flex items-center justify-center gap-2"
          style={{ background: C.orange, color: C.white, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.08em' }}
        >
          <Plus size={14} /> ADD TO CART
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- MAIN APP ---------------------------------- */
export default function App() {
  const [page, setPage] = useState('home');
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderNo, setOrderNo] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', payment: 'COD', notes: '' });

  const go = (p) => { setPage(p); setMenuOpen(false); setCartOpen(false); window.scrollTo?.(0, 0); };

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const setQty = (id, qty) => setCart((c) => {
    if (qty <= 0) { const n = { ...c }; delete n[id]; return n; }
    return { ...c, [id]: qty };
  });
  const removeFromCart = (id) => setCart((c) => { const n = { ...c }; delete n[id]; return n; });

  const cartItems = useMemo(() => Object.entries(cart).map(([id, qty]) => ({
    ...PRODUCTS.find((p) => p.id === id), qty,
  })), [cart]);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0);

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    if (activeCat !== 'all') list = list.filter((p) => p.cat === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
    }
    return list;
  }, [activeCat, query]);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedId);

  const placeOrder = (e) => {
    e.preventDefault();
    const no = 'MTS-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNo(no);
    setCart({});
    go('confirmation');
  };

  /* ------------------------ HEADER ------------------------ */
  const Header = () => (
    <header style={{ background: C.navyDark, borderBottom: `3px solid ${C.orange}` }} className="sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <button onClick={() => go('home')} className="flex items-center gap-2.5">
          <img src="https://raw.githubusercontent.com/nancydibeashi9-stack/mosco-technical-safety-site-/main/logo.jpg" alt="Mosco Technical and Safety Tools" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 4 }} />
          <div className="text-left leading-none">
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, color: C.white, fontWeight: 600, letterSpacing: '0.02em' }}>MOSCO</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 8.5, color: C.orange, letterSpacing: '0.15em' }}>TECHNICAL &amp; SAFETY TOOLS</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {[['home', 'Home'], ['shop', 'Shop'], ['about', 'About'], ['contact', 'Contact']].map(([id, label]) => (
            <button
              key={id}
              onClick={() => { setActiveCat('all'); go(id); }}
              style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.06em', color: page === id ? C.orange : C.steelLight }}
              className="hover:text-white transition-colors"
            >
              {label.toUpperCase()}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => setCartOpen(true)} className="relative p-2" aria-label="Open cart">
            <ShoppingCart size={20} color={C.white} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 flex items-center justify-center"
                style={{ width: 17, height: 17, borderRadius: '50%', background: C.orange, color: C.white, fontSize: 10, fontFamily: FONT_MONO }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setMenuOpen((m) => !m)} aria-label="Menu">
            <Menu size={22} color={C.white} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-3" style={{ borderTop: `1px solid rgba(255,255,255,0.1)` }}>
          {[['home', 'Home'], ['shop', 'Shop'], ['about', 'About'], ['contact', 'Contact']].map(([id, label]) => (
            <button key={id} onClick={() => { setActiveCat('all'); go(id); }} className="text-left pt-3"
              style={{ fontFamily: FONT_MONO, fontSize: 13, color: C.steelLight, letterSpacing: '0.06em' }}>
              {label.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </header>
  );

  /* ------------------------ FOOTER ------------------------ */
  const Footer = () => (
    <footer style={{ background: C.navyDark }} className="mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: C.white, fontWeight: 600 }}>MOSCO</div>
          <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.steel, marginTop: 8, lineHeight: 1.6 }}>
            Technical and safety tools for industrial teams that can't afford downtime.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.orange, letterSpacing: '0.1em' }} className="mb-3">SHOP</div>
          {CATEGORIES.slice(0, 4).map((c) => (
            <button key={c.id} onClick={() => { setActiveCat(c.id); go('shop'); }} className="block mb-2 text-left"
              style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.steelLight }}>{c.name}</button>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.orange, letterSpacing: '0.1em' }} className="mb-3">COMPANY</div>
          <button onClick={() => go('about')} className="block mb-2 text-left" style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.steelLight }}>About Us</button>
          <button onClick={() => go('contact')} className="block mb-2 text-left" style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.steelLight }}>Contact</button>
        </div>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.orange, letterSpacing: '0.1em' }} className="mb-3">GET IN TOUCH</div>
          <div className="flex items-center gap-2 mb-2" style={{ color: C.steelLight, fontFamily: FONT_BODY, fontSize: 13 }}><Phone size={14} /> 0704 364 7182 / 0905 845 5496</div>
          <div className="flex items-center gap-2 mb-2" style={{ color: C.steelLight, fontFamily: FONT_BODY, fontSize: 13 }}><Mail size={14} /> moscotech22@gmail.com</div>
          <div className="flex items-center gap-2" style={{ color: C.steelLight, fontFamily: FONT_BODY, fontSize: 13 }}><MapPin size={14} /> Building Materials, Mile 3, Port Harcourt, Rivers State</div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} className="py-4 text-center">
        <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.steel }}>© 2026 MOSCO TECHNICAL AND SAFETY TOOLS. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );

  /* ------------------------ CART DRAWER ------------------------ */
  const CartDrawer = () => (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,36,56,0.55)' }} onClick={() => setCartOpen(false)}>
      <div className="w-full max-w-sm h-full flex flex-col" style={{ background: C.paper }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4" style={{ background: C.navyDark }}>
          <span style={{ fontFamily: FONT_DISPLAY, color: C.white, fontSize: 16, letterSpacing: '0.03em' }}>YOUR CART ({cartCount})</span>
          <button onClick={() => setCartOpen(false)}><X size={20} color={C.white} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <p style={{ fontFamily: FONT_BODY, color: C.steel, fontSize: 14 }}>Your cart is empty. Add some equipment to get started.</p>
          ) : cartItems.map((item) => (
            <div key={item.id} className="flex gap-3 mb-4 pb-4" style={{ borderBottom: `1px dashed ${C.steelLight}` }}>
              <div className="flex-1">
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.steel }}>{item.id}</div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: C.charcoal }}>{item.name}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => setQty(item.id, item.qty - 1)} style={{ border: `1px solid ${C.steelLight}` }} className="w-6 h-6 flex items-center justify-center"><Minus size={12} /></button>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 13 }}>{item.qty}</span>
                  <button onClick={() => setQty(item.id, item.qty + 1)} style={{ border: `1px solid ${C.steelLight}` }} className="w-6 h-6 flex items-center justify-center"><Plus size={12} /></button>
                  <button onClick={() => removeFromCart(item.id)} style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.orangeDark }} className="ml-auto">REMOVE</button>
                </div>
              </div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 13, color: C.navy, fontWeight: 700 }}>{formatPrice(item.price * item.qty)}</div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <div className="px-5 py-4" style={{ borderTop: `2px solid ${C.navyDark}` }}>
            <div className="flex justify-between mb-3">
              <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: C.steel }}>SUBTOTAL</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 17, fontWeight: 700, color: C.navy }}>{formatPrice(cartTotal)}</span>
            </div>
            <button onClick={() => go('checkout')} className="w-full py-3 flex items-center justify-center gap-2"
              style={{ background: C.orange, color: C.white, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.08em' }}>
              CHECKOUT <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  /* ------------------------ HOME ------------------------ */
  const Home = () => (
    <>
      <section className="blueprint-bg" style={{ background: C.navyDark }}>
        <div className="max-w-6xl mx-auto px-5 py-24 md:py-32">
          <EyebrowLabel dark>Industrial Supply · Est. Manila</EyebrowLabel>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(36px,6vw,64px)', color: C.white, fontWeight: 600, lineHeight: 1.05, maxWidth: 720 }}>
            Equipment your crew can trust on shift <span style={{ color: C.orange }}>one.</span>
          </h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.steelLight, maxWidth: 520, marginTop: 20, lineHeight: 1.6 }}>
            Fire safety equipment, industrial gauges, precision measuring tools, and pipe fittings stocked and ready to ship anywhere in Nigeria. Order online, pick up, or have it delivered to site.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <button onClick={() => go('shop')} className="px-6 py-3 flex items-center gap-2" style={{ background: C.orange, color: C.white, fontFamily: FONT_MONO, fontSize: 12.5, letterSpacing: '0.08em' }}>
              BROWSE CATALOG <ArrowRight size={15} />
            </button>
            <button onClick={() => go('contact')} className="px-6 py-3" style={{ border: `1px solid ${C.steel}`, color: C.white, fontFamily: FONT_MONO, fontSize: 12.5, letterSpacing: '0.08em' }}>
              REQUEST QUOTE
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <EyebrowLabel>Catalog</EyebrowLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: C.charcoal, fontWeight: 600 }}>Shop by category</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => { setActiveCat(c.id); go('shop'); }}
              className="text-left p-5 flex flex-col"
              style={{ background: C.paper, border: `1px solid ${C.steelLight}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div style={{ width: 42, height: 42, background: C.navy }} className="flex items-center justify-center">
                  <c.icon size={20} color={C.cream} />
                </div>
                <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.steel }}>{c.code}</span>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: C.charcoal, fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.steel, marginTop: 4 }}>{c.desc}</div>
              <div className="mt-4 flex items-center gap-1" style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.orangeDark }}>
                VIEW ITEMS <ChevronRight size={13} />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section style={{ background: C.cream }} className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <EyebrowLabel>Why Mosco</EyebrowLabel>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: C.charcoal, fontWeight: 600, marginBottom: 32 }}>Built for uptime</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              [ShieldCheck, 'Certified stock', 'Every unit ships with spec sheets and calibration certificates where applicable.'],
              [Gauge, 'Fast turnaround', 'Same-day pull for in-stock items, nationwide delivery within 2-5 business days.'],
              [Wrench, 'Technical support', 'Our team helps you match the right part number to your actual jobsite.'],
            ].map(([Icon, title, body], i) => (
              <div key={i}>
                <Icon size={26} color={C.orange} />
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: C.charcoal, marginTop: 12, fontWeight: 500 }}>{title}</div>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13.5, color: C.steel, marginTop: 6, lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <EyebrowLabel>In demand</EyebrowLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: C.charcoal, fontWeight: 600 }}>Frequently ordered</h2>
          </div>
          <button onClick={() => go('shop')} style={{ fontFamily: FONT_MONO, fontSize: 12, color: C.orangeDark }} className="hidden sm:flex items-center gap-1">
            FULL CATALOG <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} onView={(id) => { setSelectedId(id); go('product'); }} onAdd={addToCart} />
          ))}
        </div>
      </section>
    </>
  );

  /* ------------------------ SHOP ------------------------ */
  const Shop = () => (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <EyebrowLabel>Full Catalog</EyebrowLabel>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: C.charcoal, fontWeight: 600 }}>
        {activeCat === 'all' ? 'All products' : CATEGORIES.find((c) => c.id === activeCat)?.name}
      </h1>
      <div className="flex items-center gap-2 mt-6 mb-8" style={{ border: `1px solid ${C.steelLight}`, background: C.paper }}>
        <Search size={16} color={C.steel} className="ml-3" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or part code..."
          className="flex-1 py-2.5 px-2 bg-transparent outline-none"
          style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.charcoal }}
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-10">
        <button onClick={() => setActiveCat('all')} className="px-3.5 py-1.5"
          style={{ fontFamily: FONT_MONO, fontSize: 11.5, letterSpacing: '0.05em', background: activeCat === 'all' ? C.navy : 'transparent', color: activeCat === 'all' ? C.white : C.charcoal, border: `1px solid ${activeCat === 'all' ? C.navy : C.steelLight}` }}>
          ALL
        </button>
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setActiveCat(c.id)} className="px-3.5 py-1.5"
            style={{ fontFamily: FONT_MONO, fontSize: 11.5, letterSpacing: '0.05em', background: activeCat === c.id ? C.navy : 'transparent', color: activeCat === c.id ? C.white : C.charcoal, border: `1px solid ${activeCat === c.id ? C.navy : C.steelLight}` }}>
            {c.code}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <p style={{ fontFamily: FONT_BODY, color: C.steel }}>No items match "{query}". Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onView={(id) => { setSelectedId(id); go('product'); }} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  );

  /* ------------------------ PRODUCT DETAIL ------------------------ */
  const ProductDetail = () => {
    if (!selectedProduct) return null;
    const cat = CATEGORIES.find((c) => c.id === selectedProduct.cat);
    return (
      <div className="max-w-6xl mx-auto px-5 py-12">
        <button onClick={() => go('shop')} className="flex items-center gap-1 mb-8" style={{ fontFamily: FONT_MONO, fontSize: 12, color: C.steel }}>
          <ChevronLeft size={14} /> BACK TO CATALOG
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-center justify-center" style={{ height: 360, background: C.navy, backgroundImage: `linear-gradient(135deg, ${C.navy}, ${C.navyDark})` }}>
            {cat && <cat.icon size={90} color={C.cream} strokeWidth={1.2} />}
          </div>
          <div>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: C.steel }}>{selectedProduct.id} · {cat?.name}</span>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: C.charcoal, fontWeight: 600, marginTop: 6 }}>{selectedProduct.name}</h1>
            <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.steel, marginTop: 4 }}>{selectedProduct.size}</p>
            <div style={{ fontFamily: FONT_MONO, fontSize: 30, fontWeight: 700, color: C.navy, marginTop: 20 }}>{formatPrice(selectedProduct.price)}</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: selectedProduct.stock === 'Low Stock' ? C.orangeDark : C.steel, marginTop: 6, letterSpacing: '0.05em' }}>
              {selectedProduct.stock.toUpperCase()}
            </div>

            <button onClick={() => addToCart(selectedProduct.id)} className="mt-6 px-8 py-3 flex items-center gap-2"
              style={{ background: C.orange, color: C.white, fontFamily: FONT_MONO, fontSize: 12.5, letterSpacing: '0.08em' }}>
              <Plus size={15} /> ADD TO CART
            </button>

            <div className="mt-10 pt-6" style={{ borderTop: `1px dashed ${C.steelLight}` }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.orangeDark, letterSpacing: '0.1em' }} className="mb-4">SPECIFICATIONS</div>
              <table className="w-full">
                <tbody>
                  {selectedProduct.specs.map(([label, value]) => (
                    <tr key={label} style={{ borderTop: `1px solid ${C.steelLight}` }}>
                      <td style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.steel, padding: '10px 0' }}>{label}</td>
                      <td style={{ fontFamily: FONT_MONO, fontSize: 13, color: C.charcoal, padding: '10px 0', textAlign: 'right' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ------------------------ CHECKOUT ------------------------ */
  const Checkout = () => (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <EyebrowLabel>Secure Order</EyebrowLabel>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: C.charcoal, fontWeight: 600, marginBottom: 32 }}>Checkout</h1>
      {cartItems.length === 0 ? (
        <div className="py-16 text-center">
          <p style={{ fontFamily: FONT_BODY, color: C.steel, marginBottom: 16 }}>Your cart is empty.</p>
          <button onClick={() => go('shop')} style={{ fontFamily: FONT_MONO, fontSize: 12, color: C.orangeDark }}>BROWSE CATALOG →</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <form onSubmit={placeOrder} className="md:col-span-3 flex flex-col gap-4">
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.orangeDark, letterSpacing: '0.1em' }}>DELIVERY DETAILS</div>
            {[
              ['name', 'Full name', true], ['phone', 'Phone number', true], ['email', 'Email address', true],
            ].map(([key, label, req]) => (
              <div key={key}>
                <label style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.charcoal }}>{label}{req && ' *'}</label>
                <input required={req} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.steelLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.charcoal }}>Delivery address *</label>
              <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full mt-1 px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.steelLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
            </div>
            <div>
              <label style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.charcoal }}>City *</label>
              <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full mt-1 px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.steelLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
            </div>

            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.orangeDark, letterSpacing: '0.1em' }} className="mt-4">PAYMENT METHOD</div>
            <div className="flex flex-col gap-2">
              {['Cash on Delivery', 'Bank Transfer', 'GCash'].map((m) => (
                <label key={m} className="flex items-center gap-2 px-3 py-2.5" style={{ border: `1px solid ${form.payment === m ? C.orange : C.steelLight}`, cursor: 'pointer' }}>
                  <input type="radio" name="payment" checked={form.payment === m} onChange={() => setForm({ ...form, payment: m })} />
                  <span style={{ fontFamily: FONT_BODY, fontSize: 13.5, color: C.charcoal }}>{m}</span>
                </label>
              ))}
            </div>

            <div>
              <label style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.charcoal }}>Order notes (optional)</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                className="w-full mt-1 px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.steelLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
            </div>

            <button type="submit" className="mt-4 py-3.5 flex items-center justify-center gap-2"
              style={{ background: C.orange, color: C.white, fontFamily: FONT_MONO, fontSize: 13, letterSpacing: '0.08em' }}>
              PLACE ORDER <ArrowRight size={15} />
            </button>
          </form>

          <div className="md:col-span-2">
            <div style={{ background: C.paper, border: `1px solid ${C.steelLight}` }} className="p-5">
              <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.orangeDark, letterSpacing: '0.1em' }} className="mb-4">ORDER SUMMARY</div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2.5">
                  <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.charcoal }}>{item.name} × {item.qty}</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: C.navy }}>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="flex justify-between mt-4 pt-4" style={{ borderTop: `1px solid ${C.steelLight}` }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: C.steel }}>SHIPPING</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: C.navy }}>Calculated on confirmation</span>
              </div>
              <div className="flex justify-between mt-2">
                <span style={{ fontFamily: FONT_MONO, fontSize: 14, color: C.charcoal, fontWeight: 700 }}>TOTAL</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 18, color: C.navy, fontWeight: 700 }}>{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /* ------------------------ CONFIRMATION ------------------------ */
  const Confirmation = () => (
    <div className="max-w-2xl mx-auto px-5 py-24 text-center">
      <div className="mx-auto mb-6 flex items-center justify-center" style={{ width: 56, height: 56, background: C.orange, borderRadius: '50%' }}>
        <Check size={28} color={C.white} />
      </div>
      <EyebrowLabel>Order Received</EyebrowLabel>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: C.charcoal, fontWeight: 600 }}>Thanks, we've got your order.</h1>
      <p style={{ fontFamily: FONT_MONO, fontSize: 15, color: C.navy, marginTop: 12, fontWeight: 700 }}>{orderNo}</p>
      <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.steel, marginTop: 12, lineHeight: 1.6 }}>
        We'll text and email you a confirmation with delivery timing shortly. Save your order number for reference.
      </p>
      <button onClick={() => go('shop')} className="mt-8 px-6 py-3" style={{ background: C.navy, color: C.white, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.08em' }}>
        CONTINUE SHOPPING
      </button>
    </div>
  );

  /* ------------------------ ABOUT ------------------------ */
  const About = () => (
    <div>
      <section style={{ background: C.navyDark }} className="blueprint-bg py-20">
        <div className="max-w-4xl mx-auto px-5">
          <EyebrowLabel dark>Our Story</EyebrowLabel>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 40, color: C.white, fontWeight: 600 }}>Built by technicians, stocked for technicians.</h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-5 py-16">
        <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.charcoal, lineHeight: 1.8, marginBottom: 20 }}>
          Mosco Technical and Safety Tools supplies industrial and safety equipment to plants, contractors, and workshops across Port Harcourt and beyond. From fire safety gear to precision measuring tools and pipe fittings, we stock the equipment technical teams rely on to get the job done right.
        </p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.charcoal, lineHeight: 1.8, marginBottom: 20 }}>
          We supply fire safety equipment, industrial gauges, precision measuring tools, and pipe fittings to businesses across Rivers State and beyond. Every listing on this site reflects stock we can actually pull and ship — no ghost inventory.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {[['9+', 'Products in stock'], ['4', 'Equipment categories'], ['PH', 'Based in Port Harcourt']].map(([num, label]) => (
            <div key={label} style={{ borderLeft: `3px solid ${C.orange}`, paddingLeft: 16 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 34, color: C.navy, fontWeight: 600 }}>{num}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.steel }}>{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  /* ------------------------ CONTACT ------------------------ */
  const Contact = () => (
    <div className="max-w-6xl mx-auto px-5 py-16">
      <EyebrowLabel>Get In Touch</EyebrowLabel>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: C.charcoal, fontWeight: 600, marginBottom: 32 }}>Talk to our technical team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          {[[Phone, 'Call or text', '0704 364 7182 / 0905 845 5496'], [Mail, 'Email', 'moscotech22@gmail.com'], [MapPin, 'Warehouse', 'Building Materials, Mile 3, Port Harcourt, Rivers State'], [MessageCircle, 'Business hours', 'Mon–Sat, 8:00 AM – 6:00 PM']].map(([Icon, label, val], i) => (
            <div key={i} className="flex items-start gap-3">
              <div style={{ width: 38, height: 38, background: C.navy }} className="flex items-center justify-center shrink-0"><Icon size={18} color={C.cream} /></div>
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.steel, letterSpacing: '0.05em' }}>{label.toUpperCase()}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 15, color: C.charcoal }}>{val}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent — we\'ll get back to you shortly.'); }} className="flex flex-col gap-4">
          <input required placeholder="Your name" className="px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.steelLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
          <input required type="email" placeholder="Email address" className="px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.steelLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
          <textarea required rows={5} placeholder="What are you looking for?" className="px-3 py-2.5 outline-none" style={{ border: `1px solid ${C.steelLight}`, fontFamily: FONT_BODY, fontSize: 14, background: C.paper }} />
          <button type="submit" className="py-3 flex items-center justify-center gap-2" style={{ background: C.orange, color: C.white, fontFamily: FONT_MONO, fontSize: 12.5, letterSpacing: '0.08em' }}>
            SEND MESSAGE <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );

  const PAGES = { home: Home, shop: Shop, product: ProductDetail, checkout: Checkout, confirmation: Confirmation, about: About, contact: Contact };
  const CurrentPage = PAGES[page] || Home;

  return (
    <div style={{ background: C.cream, minHeight: '100vh', fontFamily: FONT_BODY }} className="flex flex-col">
      <Fonts />
      <Header />
      <main className="flex-1">
        <CurrentPage />
      </main>
      <Footer />
      {cartOpen && <CartDrawer />}
    </div>
  );
}
