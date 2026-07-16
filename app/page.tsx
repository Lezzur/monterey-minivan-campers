'use client';

import { useEffect, useMemo, useRef, useState, CSSProperties } from 'react';
import heroImg from './assets/hero.jpg';
import featureImg from './assets/feature.jpg';
import diagramImg from './assets/diagram.jpg';
import destBigSur from './assets/dest-big-sur.png';
import destPointLobos from './assets/dest-point-lobos.png';
import destCarmel from './assets/dest-carmel.png';
import dest17Mile from './assets/dest-17-mile.png';
import destPfeiffer from './assets/dest-pfeiffer.png';
import destMontereyBay from './assets/dest-monterey-bay.png';
import destAndrewMolera from './assets/dest-andrew-molera.png';
import destGarrapata from './assets/dest-garrapata.png';

const WK = 59;
const WE = 79;

const DESTS = [
  { name: 'Big Sur', hook: 'Bixby Bridge floating over morning fog', img: destBigSur },
  { name: 'Point Lobos', hook: 'Turquoise coves and wind-bent cypress', img: destPointLobos },
  { name: 'Carmel Beach', hook: 'White sand, cypress, sunset bonfires', img: destCarmel },
  { name: '17-Mile Drive', hook: 'The Lone Cypress at golden hour', img: dest17Mile },
  { name: 'Pfeiffer Beach', hook: 'Purple sand and the Keyhole Arch beam', img: destPfeiffer },
  { name: 'Monterey Bay', hook: 'Kelp forests and wharf lights at dusk', img: destMontereyBay },
  { name: 'Andrew Molera', hook: 'A meadow walk that ends at the ocean', img: destAndrewMolera },
  { name: 'Garrapata', hook: 'Calla-lily coves and wildflower bluffs', img: destGarrapata },
];

const TRIPS = [
  {
    tag: '2 nights · midweek',
    title: 'Carmel & 17-Mile Drive',
    stops: 'Carmel-by-the-Sea → 17-Mile Drive → Point Lobos → sunset on Carmel Beach.',
    note: 'Trip: Carmel & 17-Mile Drive (2-night midweek)',
  },
  {
    tag: 'Weekend',
    title: 'The Big Sur Classic',
    stops: 'Bixby Bridge → Pfeiffer Beach → Julia Pfeiffer Burns → dinner at a cliffside lookout.',
    note: 'Trip: Big Sur Classic (weekend)',
  },
  {
    tag: '3 days',
    title: 'The Full Coast',
    stops: 'Monterey Bay → Carmel → Point Lobos → deep Big Sur and back, unhurried.',
    note: 'Trip: The Full Coast (3-day)',
  },
];

const INCLUDED = [
  'Fresh bedding & pillows',
  'Camp kitchen kit',
  'Cooler',
  'Camp chairs',
  'Coast maps & guides',
  '24/7 support',
  'Free cancellation',
  'Easy Monterey pickup',
];

const FAQS: [string, string][] = [
  ['Do I need a special license?', "No — the Sienna drives like a normal minivan. Any standard driver's license works."],
  [
    'Where can I legally sleep?',
    'State and county campgrounds, private campsites, and designated overnight spots. Your welcome kit includes a map of our favorite legal places to wake up.',
  ],
  ['Is there a deposit?', 'A $250 refundable security deposit is held at pickup and released within 3 days of return.'],
  ["What's the cancellation policy?", 'Free cancellation up to 7 days before pickup. Inside 7 days, we refund 50%.'],
  ['Are pets allowed?', 'Well-behaved dogs are welcome with a $40 cleaning fee.'],
  ['Where do I pick up the van?', 'Central Monterey — five minutes from Highway 1. The exact address arrives with your confirmation.'],
  ['Am I insured?', 'Yes — every rental includes standard coverage, with upgrade options offered at checkout.'],
];

const LB_ITEMS = [
  { src: featureImg.src, label: 'Sienna at camp — hatch open, chairs & lantern' },
  { src: diagramImg.src, label: 'Interior & bed dimensions' },
  { src: heroImg.src, label: 'Camper at a coastal pull-off' },
];

const eyebrow: CSSProperties = {
  margin: '0 0 10px',
  textTransform: 'uppercase',
  letterSpacing: '.18em',
  fontSize: '12.5px',
  fontWeight: 800,
  color: '#D05F26',
};
const h2Style: CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 800,
  fontSize: 'clamp(1.8rem,3.8vw,2.7rem)',
  lineHeight: 1.12,
  letterSpacing: '-.02em',
};
const primaryBtn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: 'linear-gradient(150deg,#E8763A,#D05F26)',
  color: '#FBF8F2',
  fontWeight: 700,
  border: 'none',
  cursor: 'pointer',
};

function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true">
      <rect width="34" height="34" rx="9" fill="#2F5D50" />
      <path d="M24.5 7.5l4.2 7.5h-8.4z" fill="#8FBCA8" />
      <path d="M26 12.5l3.4 6h-6.8z" fill="#5F8F7B" />
      <rect x="5.5" y="16.5" width="17" height="7.5" rx="2.5" fill="#FBF8F2" />
      <rect x="7.5" y="18.5" width="4.5" height="3" rx="1" fill="#2F5D50" />
      <rect x="13.5" y="18.5" width="4.5" height="3" rx="1" fill="#2F5D50" />
      <circle cx="10" cy="25.5" r="2.2" fill="#22201C" stroke="#FBF8F2" strokeWidth="1.2" />
      <circle cx="18.5" cy="25.5" r="2.2" fill="#22201C" strokeWidth="1.2" stroke="#FBF8F2" />
    </svg>
  );
}

export default function Page() {
  const [vw, setVw] = useState(1200);
  const [navOn, setNavOn] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  const today = useMemo(() => new Date(), []);
  const [m, setM] = useState(today.getMonth());
  const [y, setY] = useState(today.getFullYear());
  const [s, setS] = useState<number | null>(null);
  const [e, setE] = useState<number | null>(null);
  const [calMsg, setCalMsg] = useState('');
  const [shaking, setShaking] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [cnt, setCnt] = useState(0);

  const [lb, setLb] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [tripNote, setTripNote] = useState('');

  const [fName, setFName] = useState('');
  const [fEmail, setFEmail] = useState('');
  const [fDates, setFDates] = useState('');
  const [fMsg, setFMsg] = useState('');
  const [errName, setErrName] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [sent, setSent] = useState(false);

  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchX = useRef<number | null>(null);

  const mobile = vw <= 640;

  // Scroll: nav frosting, sticky bar, scroll-spy.
  useEffect(() => {
    setVw(window.innerWidth);
    const onScroll = () => {
      const sy = window.scrollY;
      setNavOn(sy > 40);
      setShowBar(sy > window.innerHeight * 0.75);
      let cur = '';
      ['van', 'pricing', 'destinations', 'faq'].forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 150) cur = id;
      });
      setActive(cur);
    };
    const onResize = () => setVw(window.innerWidth);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Lightbox keyboard nav.
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (lb == null) return;
      if (ev.key === 'Escape') setLb(null);
      else if (ev.key === 'ArrowRight') setLb((v) => (v == null ? v : (v + 1) % LB_ITEMS.length));
      else if (ev.key === 'ArrowLeft') setLb((v) => (v == null ? v : (v - 1 + LB_ITEMS.length) % LB_ITEMS.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lb]);

  // Scroll-reveal + count-up (skipped for reduced motion).
  useEffect(() => {
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let io: IntersectionObserver | undefined;
    let io2: IntersectionObserver | undefined;
    const t1 = setTimeout(() => {
      if (!calm) {
        io = new IntersectionObserver(
          (es) =>
            es.forEach((en) => {
              if (en.isIntersecting) {
                (en.target as HTMLElement).style.opacity = '1';
                (en.target as HTMLElement).style.transform = 'none';
                io!.unobserve(en.target);
              }
            }),
          { threshold: 0.12 }
        );
        document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
          if (el.getBoundingClientRect().top > window.innerHeight) {
            const d = (i % 5) * 80;
            el.style.opacity = '0';
            el.style.transform = 'translateY(16px)';
            el.style.transition = `opacity .65s ease ${d}ms, transform .65s ease ${d}ms`;
            io!.observe(el);
          }
        });
      }
      const b = document.getElementById('book');
      if (b) {
        io2 = new IntersectionObserver(
          (es) =>
            es.forEach((en) => {
              if (en.isIntersecting) {
                io2!.disconnect();
                const t0 = performance.now();
                const tick = (t: number) => {
                  const p = Math.min(1, (t - t0) / 1200);
                  setCnt(Math.round(500 * (1 - Math.pow(1 - p, 3))));
                  if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
              }
            }),
          { threshold: 0.15 }
        );
        io2.observe(b);
      }
    }, 450);
    return () => {
      clearTimeout(t1);
      io?.disconnect();
      io2?.disconnect();
    };
  }, []);

  const taken = (d: number) => {
    if ((d * 7 + m * 3) % 11 === 0) return true;
    const a = m % 2 === 0 ? 12 : 19;
    return d >= a && d <= a + 2;
  };
  const isPast = (d: number) => new Date(y, m, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const shake = (msg: string) => {
    setCalMsg(msg);
    setShaking(true);
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
    shakeTimer.current = setTimeout(() => setShaking(false), 520);
  };

  const pick = (d: number) => {
    if (isPast(d)) return shake('That date has passed.');
    if (taken(d)) return shake('That night is already booked — pick another.');
    if (s == null || e != null) {
      setS(d);
      setE(null);
      setCalMsg('Now pick your drop-off date.');
      setReserved(false);
      return;
    }
    if (d <= s) {
      shake('Drop-off must be after pick-up — restarting from this date.');
      setS(d);
      setE(null);
      return;
    }
    for (let x = s; x < d; x++) if (taken(x)) return shake('That range includes booked nights — try different dates.');
    setE(d);
    setCalMsg('');
    setReserved(false);
  };

  const shiftM = (dir: number) => {
    let nm = m + dir;
    let ny = y;
    if (nm < 0) {
      nm = 11;
      ny--;
    }
    if (nm > 11) {
      nm = 0;
      ny++;
    }
    const now = new Date();
    if (ny < now.getFullYear() || (ny === now.getFullYear() && nm < now.getMonth())) return;
    setM(nm);
    setY(ny);
    setS(null);
    setE(null);
    setCalMsg('');
    setReserved(false);
  };

  const price = useMemo(() => {
    if (s == null || e == null) return null;
    let wk = 0;
    let we = 0;
    for (let d = s; d < e; d++) {
      const dow = new Date(y, m, d).getDay();
      if (dow === 5 || dow === 6) we++;
      else wk++;
    }
    const sub = wk * WK + we * WE;
    const fee = Math.round((sub * 0.029 + 0.3) * 100) / 100;
    return { wk, we, sub, fee, total: Math.round((sub + fee) * 100) / 100, nights: e - s };
  }, [s, e, m, y]);

  const scrollToBook = () => {
    setMenuOpen(false);
    const el = document.getElementById('book');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };

  const sendForm = () => {
    const badName = !fName.trim();
    const badEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail);
    if (badName || badEmail) {
      setErrName(badName);
      setErrEmail(badEmail);
      return;
    }
    setSent(true);
  };

  const lbShift = (dir: number) => setLb((v) => (v == null ? v : (v + dir + LB_ITEMS.length) % LB_ITEMS.length));

  // Calendar cells.
  const monthName = new Date(y, m, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const firstDow = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cellBase: CSSProperties = {
    aspectRatio: '1',
    borderRadius: '10px',
    display: 'grid',
    placeItems: 'center',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    background: 'rgba(251,248,242,.09)',
    color: '#EFE6D5',
    userSelect: 'none',
    minHeight: '38px',
  };
  const calCells: { key: string; label: string; style: CSSProperties; onClick?: () => void; pickable: boolean }[] = [];
  for (let i = 0; i < firstDow; i++)
    calCells.push({
      key: `b${i}`,
      label: '',
      style: { ...cellBase, background: 'transparent', cursor: 'default' },
      pickable: false,
    });
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(y, m, d).getDay();
    const wknd = dow === 5 || dow === 6;
    let st: CSSProperties = { ...cellBase };
    let pickable = true;
    if (wknd) st.color = '#FFD9A0';
    if (isPast(d)) {
      st = { ...st, opacity: 0.3, cursor: 'default', background: 'transparent' };
      pickable = false;
    } else if (taken(d)) {
      st = {
        ...st,
        cursor: 'not-allowed',
        color: 'rgba(239,230,213,.4)',
        background: 'repeating-linear-gradient(45deg,rgba(239,230,213,.05) 0 4px,rgba(239,230,213,.16) 4px 6px)',
      };
      pickable = false;
    }
    if (s === d || e === d) st = { ...st, background: '#E8763A', color: '#FBF8F2', fontWeight: 700, cursor: 'pointer' };
    else if (s != null && e != null && d > s && d < e) st = { ...st, background: 'rgba(232,118,58,.35)', color: '#FBF8F2' };
    const dd = d;
    calCells.push({ key: `d${d}`, label: String(d), style: st, onClick: () => pick(dd), pickable });
  }

  const priceLines: { k: string; v: string }[] = [];
  if (price) {
    if (price.wk) priceLines.push({ k: `${price.wk} weeknight${price.wk > 1 ? 's' : ''} × $${WK}`, v: `$${price.wk * WK}` });
    if (price.we) priceLines.push({ k: `${price.we} weekend night${price.we > 1 ? 's' : ''} × $${WE}`, v: `$${price.we * WE}` });
    priceLines.push({ k: 'Subtotal', v: `$${price.sub}` });
    priceLines.push({ k: 'Stripe fee (passed through)', v: `$${price.fee.toFixed(2)}` });
  }

  const navLinkStyle = (id: string): CSSProperties => ({ color: active === id ? '#D05F26' : '#22201C', transition: 'color .2s' });

  const wrap = (w: number): CSSProperties => ({ width: `min(${w}px,94vw)`, margin: '0 auto' });
  const sectionPad: CSSProperties = { padding: 'clamp(56px,8vw,96px) 0' };

  return (
    <>
      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(250,246,239,.9)',
            backdropFilter: 'saturate(1.3) blur(12px)',
            WebkitBackdropFilter: 'saturate(1.3) blur(12px)',
            borderBottom: '1px solid #E7DCC8',
            transition: 'opacity .25s ease',
            opacity: navOn || menuOpen ? 1 : 0,
          }}
        />
        <div
          style={{
            position: 'relative',
            ...wrap(1140),
            height: 68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#22201C' }}>
            <Logo />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
              <b style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, letterSpacing: '-0.01em' }}>Monterey Minivan Campers</b>
              <small style={{ fontSize: 10.5, fontWeight: 700, color: '#8A7B62', letterSpacing: '.05em' }}>EXPLORE MORE. SLEEP ANYWHERE.</small>
            </span>
          </a>
          {!mobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 26, fontSize: 14.5, fontWeight: 700 }}>
              <a href="#van" className="tm-link" style={navLinkStyle('van')}>
                Vans
              </a>
              <a href="#pricing" className="tm-link" style={navLinkStyle('pricing')}>
                Pricing
              </a>
              <a href="#destinations" className="tm-link" style={navLinkStyle('destinations')}>
                Destinations
              </a>
              <a href="#faq" className="tm-link" style={navLinkStyle('faq')}>
                FAQ
              </a>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a
              href="#book"
              className="tm-primary"
              style={{
                ...primaryBtn,
                fontSize: 14,
                padding: '11px 20px',
                borderRadius: 999,
                boxShadow: '0 4px 16px rgba(208,95,38,.35)',
              }}
            >
              Book now
            </a>
            {mobile && (
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Menu"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: '1px solid #D9CBB2',
                  background: '#FBF8F2',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2F5D50" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 5h14M3 10h14M3 15h14" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </nav>

      {mobile && menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 68,
            left: 0,
            right: 0,
            zIndex: 59,
            background: '#FBF8F2',
            borderBottom: '1px solid #E7DCC8',
            boxShadow: '0 18px 40px rgba(34,32,28,.16)',
            padding: '10px 4vw 18px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {[
            ['#van', 'Vans'],
            ['#pricing', 'Pricing'],
            ['#destinations', 'Destinations'],
            ['#faq', 'FAQ'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{ padding: '14px 8px', fontWeight: 700, fontSize: 17, borderBottom: '1px solid #EDE4D2', color: '#22201C' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setMenuOpen(false)}
            style={{ ...primaryBtn, marginTop: 14, justifyContent: 'center', padding: 14, borderRadius: 999 }}
          >
            Book now
          </a>
        </div>
      )}

      {/* HERO */}
      <header id="top" style={{ position: 'relative', overflow: 'hidden', padding: '132px 0 78px', background: '#EFE6D5' }}>
        <svg
          viewBox="0 0 1440 760"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5, pointerEvents: 'none' }}
        >
          <g fill="none" stroke="#2F5D50" strokeOpacity=".14" strokeWidth="1.6">
            <path d="M-40 190 C 320 110,560 280,860 170 S 1380 90,1500 220" />
            <path d="M-40 270 C 340 180,600 360,900 250 S 1400 160,1500 300" />
            <path d="M-40 360 C 360 260,640 450,940 340 S 1420 240,1500 390" />
            <path d="M-40 460 C 380 350,680 560,980 440 S 1440 330,1500 490" />
            <path d="M-40 570 C 380 450,700 660,1000 540 S 1440 430,1500 600" />
          </g>
        </svg>
        <div
          style={{
            position: 'relative',
            ...wrap(1140),
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : '1.05fr .95fr',
            gap: 'clamp(24px,4vw,52px)',
            alignItems: 'center',
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-block',
                textTransform: 'uppercase',
                letterSpacing: '.2em',
                fontSize: 12.5,
                fontWeight: 800,
                color: '#D05F26',
                animation: 'tmRise .7s cubic-bezier(.2,.7,.2,1) both',
              }}
            >
              Monterey · Carmel · Big Sur
            </span>
            <h1
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(2.6rem,6vw,4.4rem)',
                lineHeight: 1.04,
                letterSpacing: '-.02em',
                color: '#22201C',
                margin: '14px 0 0',
              }}
            >
              <span style={{ display: 'inline-block', animation: 'tmRise .7s cubic-bezier(.2,.7,.2,1) both', animationDelay: '.06s' }}>Explore</span>{' '}
              <span style={{ display: 'inline-block', animation: 'tmRise .7s cubic-bezier(.2,.7,.2,1) both', animationDelay: '.12s' }}>More.</span>
              <br />
              <span style={{ display: 'inline-block', animation: 'tmRise .7s cubic-bezier(.2,.7,.2,1) both', animationDelay: '.18s' }}>Sleep</span>{' '}
              <span style={{ display: 'inline-block', color: '#E8763A', animation: 'tmRise .7s cubic-bezier(.2,.7,.2,1) both', animationDelay: '.24s' }}>
                Anywhere.
              </span>
            </h1>
            <p
              style={{
                color: '#5C6B64',
                fontSize: 'clamp(1.05rem,2vw,1.28rem)',
                maxWidth: '38ch',
                margin: '16px 0 0',
                animation: 'tmRise .7s cubic-bezier(.2,.7,.2,1) both',
                animationDelay: '.32s',
              }}
            >
              Affordable Toyota Sienna camper rentals for the Monterey coast — from <b style={{ color: '#22201C' }}>${WK} a night</b>.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 26, animation: 'tmRise .7s cubic-bezier(.2,.7,.2,1) both', animationDelay: '.42s' }}>
              <a href="#book" className="tm-primary" style={{ ...primaryBtn, fontSize: 16, padding: '15px 26px', borderRadius: 999, boxShadow: '0 8px 24px rgba(208,95,38,.35)' }}>
                Check availability →
              </a>
              <a
                href="#van"
                className="tm-ghost"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1.5px solid #CBBEA6',
                  color: '#2F5D50',
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '15px 24px',
                  borderRadius: 999,
                }}
              >
                See the van
              </a>
            </div>
            <p style={{ margin: '24px 0 0', fontSize: 13.5, fontWeight: 700, color: '#5C6B64', animation: 'tmRise .7s cubic-bezier(.2,.7,.2,1) both', animationDelay: '.5s' }}>
              <span style={{ color: '#E8763A' }}>★★★★★</span> · Free cancellation · Insured · Monterey local
            </p>
          </div>
          <div style={{ position: 'relative', animation: 'tmRise .8s cubic-bezier(.2,.7,.2,1) both', animationDelay: '.2s' }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(31,61,52,.24)',
                transform: 'rotate(1.6deg)',
              }}
            >
              <img
                src={heroImg.src}
                alt="Sienna camper at a coastal pull-off, golden hour"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                left: -18,
                bottom: 26,
                background: '#FBF8F2',
                border: '1px solid #E7DCC8',
                borderRadius: 14,
                padding: '13px 17px',
                boxShadow: '0 14px 34px rgba(34,32,28,.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div style={{ borderRight: '2px dashed #D9CBB2', paddingRight: 14 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.14em', color: '#9A8C74' }}>FROM</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 30, color: '#22201C', lineHeight: 1 }}>${WK}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#5C6B64', lineHeight: 1.35 }}>
                per weeknight
                <br />
                <span style={{ color: '#9A8C74', fontWeight: 600 }}>${WE} Fri–Sat</span>
              </div>
            </div>
          </div>
        </div>
        <a href="#value" style={{ position: 'absolute', left: '50%', bottom: 14, transform: 'translateX(-50%)', animation: 'tmBob 1.8s ease-in-out infinite' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2F5D50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </header>

      {/* VALUE STRIP */}
      <section id="value" style={{ background: '#FBF8F2', borderTop: '1px solid #E7DCC8', borderBottom: '1px solid #E7DCC8' }}>
        <div style={{ ...wrap(1140), padding: '24px 0', display: 'flex', flexWrap: 'wrap', gap: '18px 42px', justifyContent: 'center' }}>
          {[
            {
              icon: (
                <path d="M12 3v18M16.5 7.2c0-1.8-2-3.2-4.5-3.2S7.5 5.4 7.5 7.2c0 1.9 1.7 2.7 4.5 3.3 2.8.6 4.5 1.5 4.5 3.4 0 1.8-2 3.1-4.5 3.1s-4.5-1.3-4.5-3.1" />
              ),
              label: `From $${WK}/night`,
            },
            {
              icon: (
                <>
                  <path d="M3 7v12M3 15h18v4M3 12h9v3M21 15v-3a3 3 0 0 0-3-3h-6" />
                  <circle cx="6.5" cy="9.5" r="1.6" />
                </>
              ),
              label: 'Sleeps 2',
            },
            {
              icon: (
                <>
                  <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </>
              ),
              label: 'Sleep anywhere legal',
            },
            {
              icon: (
                <>
                  <path d="M2.5 15.5V10a2 2 0 0 1 2-2h9l3.5 3h3a1.5 1.5 0 0 1 1.5 1.5v3h-2.3M2.5 15.5h2.3m4.4 0h5.6" />
                  <circle cx="7" cy="16" r="2" />
                  <circle cx="17" cy="16" r="2" />
                </>
              ),
              label: 'No RV license needed',
            },
          ].map((it, i) => (
            <div key={i} data-reveal style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F5D50" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                {it.icon}
              </svg>
              <span style={{ fontWeight: 700, fontSize: 15 }}>{it.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section style={sectionPad}>
        <div style={wrap(1140)}>
          <p data-reveal style={{ ...eyebrow, textAlign: 'center' }}>
            Do the math
          </p>
          <h2 data-reveal style={{ ...h2Style, margin: '0 auto', textAlign: 'center', maxWidth: '22ch' }}>
            Why spend hundreds when the coast is from ${WK} a night?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 44, alignItems: 'stretch' }}>
            {[
              {
                name: 'Hotel',
                price: '$250+',
                rows: [
                  ['Mobility', 'Stuck in one town'],
                  ['Parking', '$30 valet'],
                  ['Setup', 'Check-in lines'],
                  ['Wake up to', 'A hallway'],
                ],
              },
              {
                name: 'RV rental',
                price: '$180–350',
                rows: [
                  ['Mobility', 'Bulky on Hwy 1'],
                  ['Parking', 'RV lots only'],
                  ['Setup', '45+ minutes'],
                  ['Wake up to', 'A hookup pad'],
                ],
              },
            ].map((c) => (
              <div key={c.name} data-reveal style={{ background: '#FBF8F2', border: '1px solid #E7DCC8', borderRadius: 18, padding: 26 }}>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 18 }}>{c.name}</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 34, margin: '4px 0 16px' }}>
                  {c.price}
                  <small style={{ fontSize: 14, fontWeight: 600, color: '#6B7A72' }}> /night</small>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14.5 }}>
                  {c.rows.map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid #EDE4D2', paddingTop: 11 }}>
                      <span style={{ color: '#6B7A72' }}>{k}</span>
                      <b>{v}</b>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div
              data-reveal
              style={{
                position: 'relative',
                background: 'linear-gradient(165deg,#2F5D50,#1F3D34)',
                color: '#FBF8F2',
                border: '2px solid #E8763A',
                borderRadius: 18,
                padding: 26,
                boxShadow: '0 16px 44px rgba(31,61,52,.28)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: -13,
                  left: 24,
                  background: 'linear-gradient(150deg,#E8763A,#D05F26)',
                  color: '#FBF8F2',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '.12em',
                  padding: '5px 14px',
                  borderRadius: 999,
                }}
              >
                BEST VALUE
              </span>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 18 }}>Our Sienna camper</div>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 34, margin: '4px 0 16px', color: '#FFC488' }}>
                from ${WK}
                <small style={{ fontSize: 14, fontWeight: 600, color: '#BCD2C8' }}> /night</small>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14.5 }}>
                {[
                  ['Mobility', 'Fits any lane'],
                  ['Parking', 'Any legal spot'],
                  ['Setup', "Zero — bed's made"],
                  ['Wake up to', 'The coast itself'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid rgba(251,248,242,.15)', paddingTop: 11 }}>
                    <span style={{ color: '#BCD2C8' }}>{k}</span>
                    <b>{v}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <svg viewBox="0 0 1440 44" preserveAspectRatio="none" aria-hidden="true" style={{ display: 'block', width: '100%', height: 44 }}>
        <path d="M0 24 C 90 8, 180 38, 300 22 S 520 6, 660 24 S 900 40, 1040 20 S 1300 8, 1440 26" fill="none" stroke="#2F5D50" strokeOpacity="0.24" strokeWidth="1.5" />
        <path d="M0 32 C 120 18, 240 44, 380 30 S 640 14, 800 32 S 1080 46, 1240 28 S 1380 18, 1440 34" fill="none" stroke="#E8763A" strokeOpacity="0.42" strokeWidth="1.5" />
      </svg>

      {/* MEET THE VAN */}
      <section id="van" style={{ background: '#FBF8F2', ...sectionPad, scrollMarginTop: 80 }}>
        <div style={{ ...wrap(1140), display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 38, alignItems: 'center' }}>
          <div data-reveal style={{ position: 'relative', aspectRatio: '3/2', borderRadius: 22, overflow: 'hidden', boxShadow: '0 20px 52px rgba(31,61,52,.16)' }}>
            <img src={featureImg.src} alt="Sienna at camp, hatch open, chairs and lantern" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <button
              onClick={() => setLb(0)}
              aria-label="Expand photo"
              style={{ position: 'absolute', top: 12, right: 12, width: 38, height: 38, borderRadius: 10, border: 'none', background: 'rgba(34,32,28,.5)', color: '#FBF8F2', cursor: 'pointer', fontSize: 16 }}
            >
              ⤢
            </button>
          </div>
          <div>
            <p data-reveal style={eyebrow}>
              Meet the van
            </p>
            <h2 data-reveal style={h2Style}>
              Your home on wheels.
            </h2>
            <p data-reveal style={{ margin: '14px 0 0', color: '#5C6B64', fontSize: 17, maxWidth: '52ch' }}>
              A Toyota Sienna with a real platform bed, a compact two-burner galley, and smart storage — in a van that parks anywhere and drives like the family car you already know.
            </p>
            <div data-reveal style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['Sleeps 2', '2-burner galley', 'Cooler', 'Bedding included', 'Phone charging', 'Easy to drive'].map((t) => (
                <span key={t} style={{ background: '#EFE6D5', border: '1px solid #E2D8C4', color: '#2F5D50', fontWeight: 700, fontSize: 13.5, padding: '8px 15px', borderRadius: 999 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEASURED */}
      <section style={sectionPad}>
        <div style={wrap(1060)}>
          <p data-reveal style={{ ...eyebrow, textAlign: 'center' }}>
            Every inch accounted for
          </p>
          <h2 data-reveal style={{ ...h2Style, margin: '0 auto 8px', textAlign: 'center' }}>
            Your Sienna, measured.
          </h2>
          <p data-reveal style={{ margin: '0 auto', maxWidth: '56ch', textAlign: 'center', color: '#5C6B64', fontSize: 16 }}>
            A full-size platform bed, real under-bed storage, and 44–46″ of sit-up headroom. Here&apos;s exactly what you&apos;re sleeping in.
          </p>
          <div
            data-reveal
            onClick={() => setLb(1)}
            style={{ position: 'relative', marginTop: 30, borderRadius: 20, overflow: 'hidden', border: '1px solid #E7DCC8', boxShadow: '0 18px 46px rgba(31,61,52,.14)', cursor: 'zoom-in' }}
          >
            <img src={diagramImg.src} alt="Toyota Sienna interior & bed dimensions diagram" style={{ width: '100%', display: 'block' }} />
          </div>
          <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginTop: 16 }}>
            {[
              ['48×72″', 'Full-size bed, fits comfortably'],
              ['44–46″', 'Interior sit-up height'],
              ['12–14″', 'Under-bed storage clearance'],
            ].map(([big, small]) => (
              <div key={big} style={{ background: '#FBF8F2', border: '1px solid #E7DCC8', borderRadius: 14, padding: 16 }}>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 24, color: '#2F5D50' }}>{big}</div>
                <div style={{ fontSize: 13, color: '#6B7A72' }}>{small}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: '#FBF8F2', ...sectionPad, scrollMarginTop: 80 }}>
        <div style={wrap(900)}>
          <p data-reveal style={{ ...eyebrow, textAlign: 'center' }}>
            Simple, honest pricing
          </p>
          <h2 data-reveal style={{ ...h2Style, margin: '0 auto', textAlign: 'center' }}>
            Two rates. No surprises.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginTop: 40 }}>
            {[
              { badge: 'Weeknights · Sun–Thu', badgeColor: '#2F5D50', border: '1px solid #E2D8C4', rate: WK, blurb: 'A midweek Big Sur escape, when the coast is quiet.' },
              { badge: 'Weekends · Fri–Sat', badgeColor: '#D05F26', border: '1.5px solid #E8763A', rate: WE, blurb: 'Pack a cooler, chase the sunset down Highway 1.' },
            ].map((c) => (
              <div key={c.badge} data-reveal className="tm-pulse" style={{ background: '#EFE6D5', border: c.border, borderRadius: 18, padding: 28, transition: 'box-shadow .2s' }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.14em', color: c.badgeColor, textTransform: 'uppercase' }}>{c.badge}</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 46, margin: '6px 0 2px' }}>
                  ${c.rate}
                  <small style={{ fontSize: 16, fontWeight: 600, color: '#6B7A72' }}> /night</small>
                </div>
                <p style={{ margin: '0 0 16px', color: '#5C6B64', fontSize: 14.5 }}>{c.blurb}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14.5, color: '#22201C' }}>
                  <span>✓ Bedding &amp; pillows</span>
                  <span>✓ Camp kitchen kit</span>
                  <span>✓ Local miles included</span>
                  <span>✓ Roadside assistance</span>
                </div>
                <a href="#book" style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#D05F26' }}>
                  Pick your dates →
                </a>
              </div>
            ))}
          </div>
          <p data-reveal style={{ margin: '16px 0 0', textAlign: 'center', fontSize: 13, color: '#6B7A72' }}>
            Stripe processing fees are passed through at checkout — itemized before you pay.
          </p>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" style={{ ...sectionPad, scrollMarginTop: 80 }}>
        <div style={wrap(1140)}>
          <p data-reveal style={eyebrow}>
            Destinations
          </p>
          <h2 data-reveal style={h2Style}>
            Where you&apos;ll wake up.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 16, marginTop: 34 }}>
            {DESTS.map((d) => (
              <div
                key={d.name}
                data-reveal
                className="tm-lift"
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid #E2D8C4',
                  background: 'linear-gradient(160deg,#3F6B5C,#1F3D34)',
                }}
              >
                <img
                  src={d.img.src}
                  alt={`${d.name} — ${d.hook}`}
                  loading="lazy"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '44px 16px 14px', background: 'linear-gradient(180deg,rgba(20,30,26,0),rgba(20,30,26,.82))', pointerEvents: 'none' }}>
                  <b style={{ fontFamily: "'Poppins',sans-serif", fontSize: 17, color: '#FBF8F2' }}>{d.name}</b>
                  <p style={{ margin: '2px 0 0', fontSize: 13, color: '#E7EEE9' }}>{d.hook}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ITINERARIES */}
      <section style={{ background: '#FBF8F2', ...sectionPad }}>
        <div style={wrap(1140)}>
          <p data-reveal style={{ ...eyebrow, textAlign: 'center' }}>
            Trip ideas
          </p>
          <h2 data-reveal style={{ ...h2Style, margin: '0 auto', textAlign: 'center' }}>
            Not sure where to start? We are.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginTop: 40 }}>
            {TRIPS.map((t) => (
              <div key={t.title} data-reveal className="tm-card-lift" style={{ display: 'flex', flexDirection: 'column', background: '#EFE6D5', border: '1px solid #E2D8C4', borderRadius: 18, padding: 26 }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.14em', color: '#D05F26', textTransform: 'uppercase' }}>{t.tag}</div>
                <h3 style={{ margin: '6px 0 12px', fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 21, lineHeight: 1.2 }}>{t.title}</h3>
                <svg viewBox="0 0 260 40" style={{ width: '100%', height: 40 }} aria-hidden="true">
                  <path d="M8 30 C 50 8, 90 36, 130 20 S 210 6, 252 24" fill="none" stroke="#2F5D50" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="8" cy="30" r="4" fill="#E8763A" />
                  <circle cx="130" cy="20" r="4" fill="#2F5D50" />
                  <circle cx="252" cy="24" r="4" fill="#E8763A" />
                </svg>
                <p style={{ margin: '10px 0 0', fontSize: 14.5, color: '#5C6B64', flex: 1 }}>{t.stops}</p>
                <button
                  onClick={() => {
                    setTripNote(t.note);
                    scrollToBook();
                  }}
                  style={{ marginTop: 18, alignSelf: 'flex-start', border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontWeight: 700, fontSize: 15, color: '#D05F26' }}
                >
                  Book this route →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={sectionPad}>
        <div style={wrap(1140)}>
          <p data-reveal style={{ ...eyebrow, textAlign: 'center' }}>
            What&apos;s included
          </p>
          <h2 data-reveal style={{ ...h2Style, margin: '0 auto', textAlign: 'center', maxWidth: '24ch' }}>
            Show up empty-handed. Leave with a road trip.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 12, marginTop: 40 }}>
            {INCLUDED.map((inc) => (
              <div key={inc} data-reveal style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FBF8F2', border: '1px solid #E7DCC8', borderRadius: 14, padding: '14px 18px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F5D50" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{inc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" style={{ background: '#FBF8F2', ...sectionPad, scrollMarginTop: 80 }}>
        <div style={wrap(1140)}>
          <div style={{ background: 'linear-gradient(160deg,#2F5D50,#1F3D34)', color: '#FBF8F2', borderRadius: 24, padding: 'clamp(24px,4vw,44px)', boxShadow: '0 24px 60px rgba(31,61,52,.3)' }}>
            <p style={{ margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '.18em', fontSize: 12.5, fontWeight: 800, color: '#FFB98A' }}>Check availability &amp; book</p>
            <h2 style={{ ...h2Style, fontSize: 'clamp(1.7rem,3.4vw,2.5rem)' }}>Pick your dates. Hit the road.</h2>
            <p style={{ margin: '10px 0 0', color: '#BCD2C8', fontSize: 15.5 }}>
              Real availability, instant total, secure Stripe checkout. <b style={{ color: '#FFC488' }}>{cnt}+ nights booked</b> on the Monterey coast.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(310px,1fr))', gap: 20, marginTop: 26, alignItems: 'start' }}>
              {/* Calendar */}
              <div
                style={{
                  background: 'rgba(251,248,242,.06)',
                  border: '1px solid rgba(251,248,242,.14)',
                  borderRadius: 16,
                  padding: 20,
                  animation: shaking ? 'tmShake .45s ease' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <b style={{ fontFamily: "'Poppins',sans-serif", fontSize: 17 }}>{monthName}</b>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => shiftM(-1)} aria-label="Previous month" style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid rgba(251,248,242,.25)', background: 'rgba(251,248,242,.06)', color: '#FBF8F2', cursor: 'pointer', fontSize: 16 }}>
                      ‹
                    </button>
                    <button onClick={() => shiftM(1)} aria-label="Next month" style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid rgba(251,248,242,.25)', background: 'rgba(251,248,242,.06)', color: '#FBF8F2', cursor: 'pointer', fontSize: 16 }}>
                      ›
                    </button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dw, i) => (
                    <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 800, color: '#9DB8AC', paddingBottom: 4 }}>
                      {dw}
                    </div>
                  ))}
                  {calCells.map((c) => (
                    <div key={c.key} className={`tm-cal-cell${c.pickable ? ' pickable' : ''}`} style={c.style} onClick={c.onClick}>
                      {c.label}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 14, fontSize: 12, color: '#BCD2C8' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <i style={{ width: 12, height: 12, borderRadius: 4, background: '#E8763A', display: 'inline-block' }} />
                    Selected
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <i style={{ width: 12, height: 12, borderRadius: 4, background: 'rgba(251,248,242,.12)', display: 'inline-block' }} />
                    Available
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <i style={{ width: 12, height: 12, borderRadius: 4, background: 'repeating-linear-gradient(45deg,rgba(239,230,213,.08) 0 3px,rgba(239,230,213,.25) 3px 5px)', display: 'inline-block' }} />
                    Booked
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#FFD9A0' }}>Fri–Sat = ${WE}</span>
                </div>
                {calMsg && <p style={{ margin: '12px 0 0', fontSize: 13.5, fontWeight: 700, color: '#FFD9A0' }}>{calMsg}</p>}
              </div>
              {/* Trip summary */}
              <div style={{ background: 'rgba(251,248,242,.06)', border: '1px solid rgba(251,248,242,.14)', borderRadius: 16, padding: 22 }}>
                <b style={{ fontFamily: "'Poppins',sans-serif", fontSize: 17 }}>Your trip</b>
                <input
                  value={tripNote}
                  onChange={(ev) => setTripNote(ev.target.value)}
                  placeholder="Add a note — e.g. Big Sur Classic route"
                  style={{ marginTop: 12, width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(251,248,242,.25)', background: 'rgba(251,248,242,.08)', color: '#FBF8F2', fontSize: 14, outline: 'none' }}
                />
                {price ? (
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14.5 }}>
                    {priceLines.map((ln) => (
                      <div key={ln.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                        <span style={{ color: '#BCD2C8' }}>{ln.k}</span>
                        <b>{ln.v}</b>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid rgba(251,248,242,.18)', paddingTop: 12, alignItems: 'baseline' }}>
                      <span style={{ color: '#BCD2C8' }}>
                        Total · {price.nights} night{price.nights > 1 ? 's' : ''}
                      </span>
                      <b style={{ fontFamily: "'Poppins',sans-serif", fontSize: 26, color: '#FFC488' }}>${price.total.toFixed(2)}</b>
                    </div>
                  </div>
                ) : (
                  <p style={{ margin: '16px 0 0', fontSize: 14.5, color: '#BCD2C8' }}>
                    Select your pick-up date, then your drop-off date on the calendar. Weeknights ${WK} · weekend nights ${WE}.
                  </p>
                )}
                <button
                  onClick={() => {
                    if (!price) return shake('Pick your dates on the calendar first.');
                    setReserved(true);
                  }}
                  style={{
                    marginTop: 18,
                    width: '100%',
                    minHeight: 48,
                    border: 'none',
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 15.5,
                    cursor: price && !reserved ? 'pointer' : 'default',
                    background: price ? 'linear-gradient(150deg,#E8763A,#D05F26)' : 'rgba(251,248,242,.12)',
                    color: price ? '#FBF8F2' : 'rgba(251,248,242,.5)',
                    boxShadow: price ? '0 8px 24px rgba(208,95,38,.4)' : 'none',
                    transition: 'transform .15s,box-shadow .2s',
                  }}
                >
                  {reserved ? '✓ Dates held' : price ? `Reserve · ${price.nights} night${price.nights > 1 ? 's' : ''} — $${price.total.toFixed(2)}` : 'Choose dates to reserve'}
                </button>
                {reserved && <p style={{ margin: '12px 0 0', fontSize: 14, fontWeight: 700, color: '#9FE0B8' }}>✓ Dates held — in the live build this opens Stripe Checkout.</p>}
                <p style={{ margin: '14px 0 0', fontSize: 12, color: '#9DB8AC' }}>
                  Demo booking flow. The live build reads availability from Google Calendar and takes secure payment via Stripe — fees passed through at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: 'clamp(56px,8vw,96px) 0 clamp(40px,6vw,72px)', scrollMarginTop: 80 }}>
        <div style={wrap(780)}>
          <p data-reveal style={{ ...eyebrow, textAlign: 'center' }}>
            Good to know
          </p>
          <h2 data-reveal style={{ ...h2Style, margin: '0 auto 34px', textAlign: 'center' }}>
            Questions, answered.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map(([q, a], i) => {
              const open = faqOpen === i;
              return (
                <div key={q} data-reveal style={{ background: '#FBF8F2', border: '1px solid #E7DCC8', borderRadius: 14, padding: '0 20px' }}>
                  <button
                    onClick={() => setFaqOpen(open ? null : i)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, background: 'none', border: 'none', cursor: 'pointer', padding: '17px 0', fontWeight: 700, fontSize: 16, textAlign: 'left', color: '#22201C', minHeight: 44 }}
                  >
                    <span>{q}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D05F26" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s', flex: 'none' }}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div style={{ overflow: 'hidden', maxHeight: open ? 220 : 0, opacity: open ? 1 : 0, transition: 'max-height .35s ease, opacity .3s ease' }}>
                    <p style={{ margin: 0, padding: '0 0 17px', color: '#5C6B64', fontSize: 15 }}>{a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT + FOOTER */}
      <section id="contact" style={{ background: 'linear-gradient(170deg,#2F5D50,#24473C)', color: '#FBF8F2', padding: 'clamp(56px,8vw,96px) 0 0' }}>
        <div style={{ ...wrap(1140), paddingBottom: 'clamp(56px,8vw,90px)' }}>
          <h2 data-reveal style={h2Style}>
            Your coast trip starts here.
          </h2>
          <p data-reveal style={{ margin: '10px 0 0', color: '#BCD2C8', fontSize: 16 }}>
            We&apos;re local and easy to reach — ask us anything.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, marginTop: 32, alignItems: 'start' }}>
            <div data-reveal style={{ background: '#FBF8F2', color: '#22201C', borderRadius: 18, padding: 26 }}>
              {!sent ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13, fontWeight: 800, color: '#2F5D50' }}>
                    Name
                    <input
                      value={fName}
                      onChange={(ev) => {
                        setFName(ev.target.value);
                        setErrName(false);
                      }}
                      placeholder="Your name"
                      style={{ padding: '12px 14px', borderRadius: 11, border: `1px solid ${errName ? '#C4432B' : '#E2D8C4'}`, fontSize: 15, outline: 'none', background: '#FFFFFF' }}
                    />
                    {errName && <span style={{ color: '#C4432B', fontWeight: 600, fontSize: 12.5 }}>Please add your name.</span>}
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13, fontWeight: 800, color: '#2F5D50' }}>
                    Email
                    <input
                      value={fEmail}
                      onChange={(ev) => {
                        setFEmail(ev.target.value);
                        setErrEmail(false);
                      }}
                      placeholder="you@email.com"
                      style={{ padding: '12px 14px', borderRadius: 11, border: `1px solid ${errEmail ? '#C4432B' : '#E2D8C4'}`, fontSize: 15, outline: 'none', background: '#FFFFFF' }}
                    />
                    {errEmail && <span style={{ color: '#C4432B', fontWeight: 600, fontSize: 12.5 }}>That email doesn&apos;t look right.</span>}
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13, fontWeight: 800, color: '#2F5D50' }}>
                    Dates you&apos;re eyeing
                    <input value={fDates} onChange={(ev) => setFDates(ev.target.value)} placeholder="e.g. Sep 18–21" style={{ padding: '12px 14px', borderRadius: 11, border: '1px solid #E2D8C4', fontSize: 15, outline: 'none', background: '#FFFFFF' }} />
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13, fontWeight: 800, color: '#2F5D50' }}>
                    Message
                    <textarea value={fMsg} onChange={(ev) => setFMsg(ev.target.value)} rows={3} placeholder="When are you thinking of traveling?" style={{ padding: '12px 14px', borderRadius: 11, border: '1px solid #E2D8C4', fontSize: 15, outline: 'none', resize: 'vertical', background: '#FFFFFF' }} />
                  </label>
                  <button onClick={sendForm} className="tm-primary" style={{ ...primaryBtn, alignSelf: 'flex-start', fontSize: 15, padding: '13px 26px', borderRadius: 999, minHeight: 44 }}>
                    Send message
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '28px 8px' }}>
                  <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#2F5D50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12.5l2.5 2.5L16 9" />
                  </svg>
                  <h3 style={{ margin: '10px 0 4px', fontFamily: "'Poppins',sans-serif", fontWeight: 700 }}>Message sent!</h3>
                  <p style={{ margin: 0, color: '#5C6B64', fontSize: 15 }}>We&apos;ll get back to you within a few hours — usually faster.</p>
                </div>
              )}
            </div>
            <div data-reveal style={{ background: 'rgba(251,248,242,.06)', border: '1px solid rgba(251,248,242,.14)', borderRadius: 18, padding: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFC488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <h3 style={{ margin: '8px 0 2px', fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 19 }}>Monterey, California</h3>
                <p style={{ margin: 0, color: '#BCD2C8', fontSize: 14.5 }}>Easy pickup five minutes from Highway 1.</p>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <a href="tel:+18315550123" style={{ color: '#FBF8F2' }}>
                  (831) 555-0123
                </a>
                <a href="mailto:hello@montereyminivancampers.com" style={{ color: '#FBF8F2' }}>
                  hello@montereyminivancampers.com
                </a>
              </div>
              <a href="#book" className="tm-primary" style={{ ...primaryBtn, alignSelf: 'flex-start', fontSize: 15, padding: '13px 26px', borderRadius: 999 }}>
                Check availability →
              </a>
            </div>
          </div>
        </div>
        <footer style={{ background: '#1B352C' }}>
          <div style={{ ...wrap(1140), padding: '32px 0 40px', display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center', color: '#9DB8AC' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#FBF8F2' }}>
              <Logo size={30} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 14.5 }}>Monterey Minivan Campers</span>
            </div>
            <div style={{ display: 'flex', gap: 22, fontSize: 13.5, fontWeight: 700 }}>
              <a href="#van" style={{ color: '#BCD2C8' }}>
                Vans
              </a>
              <a href="#pricing" style={{ color: '#BCD2C8' }}>
                Pricing
              </a>
              <a href="#destinations" style={{ color: '#BCD2C8' }}>
                Destinations
              </a>
              <a href="#faq" style={{ color: '#BCD2C8' }}>
                FAQ
              </a>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['IG', 'FB', 'TT'].map((s) => (
                <a key={s} href="#top" aria-label={s} style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(251,248,242,.08)', color: '#FBF8F2', fontWeight: 700, fontSize: 12 }}>
                  {s}
                </a>
              ))}
            </div>
            <div style={{ width: '100%', borderTop: '1px solid rgba(251,248,242,.1)', paddingTop: 16, fontSize: 12.5 }}>
              © 2026 Monterey Minivan Campers · Affordable Toyota Sienna camper rentals for Monterey, Carmel &amp; Big Sur · Explore More. Sleep Anywhere.
            </div>
          </div>
        </footer>
      </section>

      {/* LIGHTBOX */}
      {lb != null && (
        <div
          onClick={(ev) => {
            if (ev.target === ev.currentTarget) setLb(null);
          }}
          onTouchStart={(ev) => {
            touchX.current = ev.touches ? ev.touches[0].clientX : null;
          }}
          onTouchEnd={(ev) => {
            if (touchX.current == null || !ev.changedTouches) return;
            const dx = ev.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) lbShift(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(20,26,23,.93)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }}
        >
          <img src={LB_ITEMS[lb].src} alt={LB_ITEMS[lb].label} style={{ maxWidth: '90vw', maxHeight: '76vh', borderRadius: 14, boxShadow: '0 30px 80px rgba(0,0,0,.5)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: '#FBF8F2' }}>
            <button onClick={(ev) => { ev.stopPropagation(); lbShift(-1); }} aria-label="Previous" style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid rgba(251,248,242,.3)', background: 'rgba(251,248,242,.08)', color: '#FBF8F2', cursor: 'pointer', fontSize: 18 }}>
              ‹
            </button>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{LB_ITEMS[lb].label}</span>
            <button onClick={(ev) => { ev.stopPropagation(); lbShift(1); }} aria-label="Next" style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid rgba(251,248,242,.3)', background: 'rgba(251,248,242,.08)', color: '#FBF8F2', cursor: 'pointer', fontSize: 18 }}>
              ›
            </button>
          </div>
          <button onClick={() => setLb(null)} aria-label="Close" style={{ position: 'absolute', top: 18, right: 18, width: 44, height: 44, borderRadius: 12, border: 'none', background: 'rgba(251,248,242,.12)', color: '#FBF8F2', cursor: 'pointer', fontSize: 20 }}>
            ×
          </button>
        </div>
      )}

      {/* MOBILE STICKY BAR */}
      {mobile && showBar && lb == null && !menuOpen && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 70,
            background: '#FBF8F2',
            borderTop: '1px solid #E2D8C4',
            boxShadow: '0 -10px 30px rgba(34,32,28,.15)',
            padding: '10px 16px calc(10px + env(safe-area-inset-bottom))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div style={{ lineHeight: 1.25 }}>
            <b style={{ fontFamily: "'Poppins',sans-serif", fontSize: 16 }}>from ${WK}/night</b>
            <br />
            <small style={{ color: '#6B7A72', fontSize: 12 }}>Free cancellation</small>
          </div>
          <a href="#book" style={{ ...primaryBtn, padding: '13px 22px', borderRadius: 999, minHeight: 44, boxSizing: 'border-box' }}>
            Check availability
          </a>
        </div>
      )}
    </>
  );
}
