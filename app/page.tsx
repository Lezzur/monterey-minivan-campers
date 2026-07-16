'use client';

import { useMemo, useState } from 'react';

const WEEKDAY = 59;
const WEEKEND = 79;

function BookingCalendar() {
  // Stub availability engine — mirrors the shape of the real Google Calendar
  // free/busy check the MVP will use. No backend, no payment: proposal demo only.
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [range, setRange] = useState<{ start: number | null; end: number | null }>({
    start: null,
    end: null,
  });

  const monthName = new Date(year, month, 1).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Deterministic "already booked" days so the demo looks alive.
  const taken = useMemo(() => {
    const set = new Set<number>();
    for (let d = 1; d <= daysInMonth; d++) {
      if ((d * 7 + month * 3) % 11 === 0) set.add(d);
    }
    return set;
  }, [daysInMonth, month]);

  const isPast = (d: number) => {
    const cell = new Date(year, month, d);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return cell < t;
  };
  const isWeekend = (d: number) => {
    const dow = new Date(year, month, d).getDay();
    return dow === 0 || dow === 6;
  };

  const pick = (d: number) => {
    if (taken.has(d) || isPast(d)) return;
    if (range.start === null || (range.start !== null && range.end !== null)) {
      setRange({ start: d, end: null });
    } else if (d < range.start) {
      setRange({ start: d, end: null });
    } else {
      setRange({ start: range.start, end: d });
    }
  };

  const shift = (dir: number) => {
    let m = month + dir;
    let y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonth(m); setYear(y);
    setRange({ start: null, end: null });
  };

  const nights = useMemo(() => {
    if (range.start !== null && range.end !== null) return range.end - range.start;
    return 0;
  }, [range]);

  const total = useMemo(() => {
    if (range.start === null || range.end === null) return 0;
    let sum = 0;
    for (let d = range.start; d < range.end; d++) {
      sum += isWeekend(d) ? WEEKEND : WEEKDAY;
    }
    return sum;
  }, [range, month, year]);

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(<div key={`b${i}`} className="cal-cell blank" />);
  for (let d = 1; d <= daysInMonth; d++) {
    const classes = ['cal-cell'];
    if (taken.has(d) || isPast(d)) classes.push('taken');
    else classes.push('avail');
    if (isWeekend(d)) classes.push('wknd');
    if (range.start === d || range.end === d) classes.push('sel');
    else if (range.start !== null && range.end !== null && d > range.start && d < range.end) classes.push('inrange');
    cells.push(
      <div key={d} className={classes.join(' ')} onClick={() => pick(d)}>
        {d}
      </div>
    );
  }

  return (
    <div className="book-panel">
      <div className="cal-head">
        <b>{monthName}</b>
        <div className="cal-nav">
          <button onClick={() => shift(-1)} aria-label="Previous month">‹</button>
          <button onClick={() => shift(1)} aria-label="Next month">›</button>
        </div>
      </div>
      <div className="cal-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="cal-dow">{d}</div>
        ))}
        {cells}
      </div>
      <div className="legend">
        <span><i style={{ background: '#e8734a' }} />Selected</span>
        <span><i style={{ background: 'rgba(255,255,255,0.08)' }} />Available</span>
        <span><i style={{ background: 'rgba(255,255,255,0.03)' }} />Booked</span>
        <span><i style={{ background: 'transparent', border: '1px solid #ffd9a0' }} /><span style={{ color: '#ffd9a0' }}>Weekend $79</span></span>
      </div>
      <div className="book-summary">
        <div className="total">
          {nights > 0 ? (
            <>
              <b>${total}</b> <span>· {nights} night{nights > 1 ? 's' : ''}, no hidden fees</span>
            </>
          ) : (
            <span>Select your pick-up and drop-off dates</span>
          )}
        </div>
        <button className="btn btn-primary" disabled={nights === 0}>
          {nights > 0 ? 'Reserve these dates →' : 'Choose dates'}
        </button>
      </div>
      <p className="stub-note">
        Demo booking flow. In the live build this reads real availability from Google
        Calendar and takes secure payment via Stripe.
      </p>
    </div>
  );
}

const included = [
  ['🛏️', 'Memory-foam mattress'],
  ['🧺', 'Fresh bedding & pillows'],
  ['🪑', 'Camping chairs'],
  ['🧊', 'Cooler'],
  ['🔌', 'USB + phone charging'],
  ['🪟', 'Privacy curtains'],
  ['🍳', 'Basic cooking kit'],
  ['🧽', 'Cleaning supplies'],
];

const why = [
  ['💸', 'Lowest prices', 'Starting at $59/night — a fraction of a hotel or RV.'],
  ['🚗', 'Drives like a normal car', 'No special license, no RV anxiety. If you can drive a minivan, you can drive this.'],
  ['⛽', 'Great gas mileage', 'A Toyota Sienna sips fuel compared to a gas-guzzling RV.'],
  ['📍', 'Local pickup', 'Based right here in Monterey — grab the keys and go.'],
  ['🏕️', 'Easier than an RV', 'Bed, kitchen, and gear already set up. Just show up and explore.'],
  ['🌊', 'Built for Big Sur', 'The perfect size for Highway 1\'s curves and coastal pull-offs.'],
];

const destinations = [
  ['Big Sur', 'Rugged cliffs & redwoods', 'sh1'],
  ['Carmel-by-the-Sea', 'Storybook village & beach', 'sh2'],
  ['Bixby Bridge', 'The iconic Highway 1 shot', 'sh3'],
  ['17-Mile Drive', 'Coastline & cypress', 'sh5'],
  ['Point Lobos', 'Tide pools & sea otters', 'sh2'],
  ['Cannery Row', 'Monterey\'s waterfront', 'sh4'],
  ['Garrapata', 'Hidden beaches & trails', 'sh6'],
  ['Monterey Bay', 'Sunset over the water', 'sh1'],
];

const gallery = [
  ['Exterior', 'sh1'], ['Bed setup', 'sh2'], ['Camp kitchen', 'sh6'], ['Interior', 'sh3'],
  ['Storage', 'sh5'], ['Front seats', 'sh4'], ['Sunset camp', 'sh1'], ['Highway 1', 'sh3'],
];

const faqs = [
  ['Where do I pick up?', 'Local pickup in Monterey — exact address and a quick walkthrough are sent with your confirmation.'],
  ['How many people fit?', 'The camper comfortably sleeps two adults, with front seats for daytime driving.'],
  ['Is camping experience required?', 'None at all. The bed, curtains, and gear are ready to go. If you can pitch a picnic, you can do this.'],
  ['Where can I camp?', 'State parks, campgrounds, and designated coastal spots. We include a starter guide to the best legal overnight areas.'],
  ['What\'s included?', 'Mattress, bedding, pillows, camp chairs, cooler, cooking kit, USB charging, privacy curtains, and cleaning supplies.'],
  ['What about mileage?', 'Generous daily mileage is included — plenty for Monterey, Carmel, and a full Big Sur run.'],
  ['Are pets allowed?', 'Well-behaved dogs are welcome with a small cleaning deposit.'],
  ['Insurance & deposit?', 'A refundable security deposit applies, and short-term coverage options are offered at checkout.'],
  ['Cancellation policy?', 'Free cancellation up to 7 days before pickup. Details are shown before you pay.'],
];

export default function Page() {
  return (
    <>
      <div className="ribbon">
        Proposal preview for <strong>Monterey Minivan Campers</strong> · a live look at your future website
      </div>

      <nav className="nav">
        <div className="wrap">
          <div className="brandmark">
            <div className="logo">▲</div>
            <div>
              Monterey Minivan Campers
              <small>Explore More. Sleep Anywhere.</small>
            </div>
          </div>
          <div className="navlinks">
            <a href="#pricing">Pricing</a>
            <a href="#camper">The Camper</a>
            <a href="#explore">Explore</a>
            <a href="#book">Book</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="#book" className="btn btn-primary">Book Now</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-scene" />
        <div className="hero-sun" />
        <div className="hero-hills" />
        <div className="wrap">
          <p className="eyebrow" style={{ color: '#ffe6c9' }}>California Central Coast</p>
          <h1>Explore Monterey in a Camper Minivan</h1>
          <p className="sub">
            The most affordable camper rental on California&apos;s Central Coast.
            Big Sur, Carmel, and Highway 1 — from $59 a night.
          </p>
          <div className="cta-row">
            <a href="#book" className="btn btn-primary">Book Now →</a>
            <a href="#pricing" className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>See pricing</a>
          </div>
          <div className="pricepill">
            <b>$59</b><span>/ weekday night</span>
          </div>
        </div>
      </header>

      <div className="strip">
        <div className="wrap">
          <span>✅ No hidden fees</span>
          <span>🚗 Drives like a normal car</span>
          <span>⛽ Great gas mileage</span>
          <span>📍 Local Monterey pickup</span>
          <span>❤️ Perfect for couples & road trips</span>
        </div>
      </div>

      {/* PRICING */}
      <section className="section" id="pricing">
        <div className="wrap">
          <p className="eyebrow center">Simple, honest pricing</p>
          <h2 className="center">One low rate. No surprises.</h2>
          <div className="pricing-grid">
            <div className="price-card">
              <div className="tag">Weekdays · Sun–Thu</div>
              <div className="amt">$59<small> / night</small></div>
              <p className="price-note">Perfect for a midweek Big Sur escape when the coast is quiet.</p>
            </div>
            <div className="price-card">
              <div className="tag">Weekends · Fri–Sat</div>
              <div className="amt">$79<small> / night</small></div>
              <p className="price-note">Grab a weekend, pack a cooler, chase the sunset down Highway 1.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PAY HUNDREDS */}
      <section className="section tint">
        <div className="wrap">
          <p className="eyebrow center">Why pay hundreds?</p>
          <h2 className="center">Why spend hundreds when you can explore for less?</h2>
          <div className="compare">
            <div className="col">
              <div className="k">Hotel</div>
              <div className="v">$250+</div>
              <div className="price-note">per night, and you&apos;re stuck in one town</div>
            </div>
            <div className="col">
              <div className="k">RV Rental</div>
              <div className="v">$180–350+</div>
              <div className="price-note">per night, plus fuel and a license headache</div>
            </div>
            <div className="col win">
              <div className="badge">OUR CAMPER</div>
              <div className="k">Toyota Sienna</div>
              <div className="v">from $59</div>
              <div className="price-note" style={{ color: '#cfe3d9' }}>per night — everything included</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY RENT FROM US */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Why rent from us</p>
          <h2>Everything you need. Nothing you don&apos;t.</h2>
          <div className="grid g-3" style={{ marginTop: '2rem' }}>
            {why.map(([ic, t, d]) => (
              <div className="card" key={t}>
                <div className="ic">{ic}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE CAMPER + GALLERY */}
      <section className="section tint" id="camper">
        <div className="wrap">
          <p className="eyebrow">The camper</p>
          <h2>Your Toyota Sienna, camp-ready.</h2>
          <p className="lead" style={{ marginTop: '0.6rem' }}>
            A comfortable memory-foam bed, privacy curtains, a camp kitchen, and smart
            storage — all in a van that parks anywhere and drives like the family car you already know.
          </p>
          <div className="gallery">
            {gallery.map(([label, cls]) => (
              <div className={`shot ${cls}`} key={label}><span>{label}</span></div>
            ))}
          </div>
          <p className="stub-note" style={{ color: 'var(--muted)', marginTop: '1rem' }}>
            Placeholder frames — your real Sienna photos drop straight into these slots.
          </p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow center">What&apos;s included</p>
          <h2 className="center">Show up empty-handed. Leave with a road trip.</h2>
          <div className="grid g-3" style={{ marginTop: '2rem' }}>
            {included.map(([ic, t]) => (
              <div className="card" key={t} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="ic" style={{ margin: 0 }}>{ic}</div>
                <h3 style={{ fontSize: '1.05rem' }}>{t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="section tint-pine" id="explore">
        <div className="wrap">
          <p className="eyebrow" style={{ color: '#ffb98a' }}>Explore Monterey</p>
          <h2>The whole coast, in one tank of gas.</h2>
          <div className="dest-grid">
            {destinations.map(([name, desc, cls]) => (
              <div className={`dest ${cls}`} key={name}>
                <div className="meta">
                  <b>{name}</b>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ITINERARIES */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow center">Suggested itineraries</p>
          <h2 className="center">Not sure where to start? We are.</h2>
          <div className="itin">
            <div className="card">
              <div className="day">1-Day Adventure</div>
              <h3 style={{ margin: '0.4rem 0' }}>Carmel & 17-Mile Drive</h3>
              <p>Coffee in Carmel, the cypress coastline of 17-Mile Drive, sunset at the beach, sleep by the water.</p>
            </div>
            <div className="card">
              <div className="day">2-Day Big Sur Trip</div>
              <h3 style={{ margin: '0.4rem 0' }}>Bixby Bridge to the Redwoods</h3>
              <p>Chase Highway 1 south, stop at Bixby Bridge, camp under the stars, wake up among the redwoods.</p>
            </div>
            <div className="card">
              <div className="day">Weekend Escape</div>
              <h3 style={{ margin: '0.4rem 0' }}>The Full Central Coast</h3>
              <p>Monterey, Carmel, Point Lobos, and Big Sur across three unhurried days on the road.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section className="section" id="book">
        <div className="wrap">
          <div className="booking">
            <p className="eyebrow" style={{ color: '#ffb98a' }}>Check availability</p>
            <h2>Pick your dates. Hit the road.</h2>
            <p>Real-time availability, instant confirmation, secure payment. No phone tag, no hidden fees.</p>
            <BookingCalendar />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section tint" id="faq">
        <div className="wrap">
          <p className="eyebrow center">Good to know</p>
          <h2 className="center">Frequently asked questions</h2>
          <div className="faq">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="wrap">
          <p className="eyebrow">Get in touch</p>
          <h2>Questions? We&apos;re local and easy to reach.</h2>
          <div className="contact-grid">
            <form className="card" onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" placeholder="you@email.com" />
              </div>
              <div className="field">
                <label>Message</label>
                <textarea rows={4} placeholder="When are you thinking of traveling?" />
              </div>
              <button className="btn btn-primary" type="submit">Send message</button>
            </form>
            <div className="map-card">
              <div>
                <div className="pin">📍</div>
                <h3 style={{ color: '#fff', marginTop: '0.5rem' }}>Monterey, California</h3>
                <p style={{ color: '#cfe3d9' }}>Local pickup on the Central Coast.</p>
              </div>
              <div>
                <p style={{ color: '#eaf3ee', fontWeight: 700 }}>📞 (831) 555-0123</p>
                <p style={{ color: '#eaf3ee', fontWeight: 700 }}>✉️ hello@montereyminivancampers.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="brandmark" style={{ color: '#fff' }}>
            <div className="logo">▲</div>
            <div>
              Monterey Minivan Campers
              <small style={{ color: '#9db8ac' }}>Explore More. Sleep Anywhere.</small>
            </div>
          </div>
          <div className="social">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="TikTok">TT</a>
          </div>
          <div className="fine">
            © {new Date().getFullYear()} Monterey Minivan Campers · Affordable Toyota Sienna camper
            rentals for Monterey, Carmel &amp; Big Sur. · This is a proposal preview build.
          </div>
        </div>
      </footer>
    </>
  );
}
