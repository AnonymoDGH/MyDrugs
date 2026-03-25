import { useState, useEffect, useRef, type CSSProperties } from 'react';

const LOGO_URL = 'https://raw.githubusercontent.com/skelettn/MyDrugs2.0/main/assets/logo.png';
const BASE = 'https://raw.githubusercontent.com/skelettn/MyDrugs2.0/main/assets/items/';

interface CartItem { id: number; name: string; qty: number; image: string; }

interface HeroProps {
  onAddToCart: (item: CartItem) => void;
  onShop: () => void;
}

const slides = [
  {
    id: 7, name: 'RED PILL', subtitle: 'YOUR TICKET TO WONDERLAND',
    desc: 'Great quality at an affordable price. Recommended for beginners: the red pill will take you to wonderland. Clean, high quality MDMA guaranteed.',
    image: BASE + 'red_pill.png', btc: '0.0013', eth: '0.00523', stars: 4,
    bg: 'slide-red', glowColor: 'rgba(220,50,50,0.25)', accent: '#c0392b',
  },
  {
    id: 2, name: 'BLUE CLOVER', subtitle: 'FIND YOUR LUCK',
    desc: 'The classic. Pure, tested MDMA in the iconic Blue Clover shape. Trusted by thousands. Made for those who know what they want.',
    image: BASE + 'blue_pill.png', btc: '0.0014', eth: '0.00561', stars: 5,
    bg: 'slide-blue', glowColor: 'rgba(110,130,180,0.2)', accent: '#9ca3af',
  },
  {
    id: 6, name: 'PURPLE FLOWER', subtitle: 'BLOOM INTO THE NIGHT',
    desc: 'Our premium Purple Flower is crafted for experienced users seeking a rich, long-lasting experience. Pure MDMA, lab-tested.',
    image: BASE + 'purple_pill.png', btc: '0.0016', eth: '0.00641', stars: 5,
    bg: 'slide-purple', glowColor: 'rgba(140,50,220,0.25)', accent: '#8e44ad',
  },
  {
    id: 3, name: 'GREEN SNOWFLAKE', subtitle: 'COOL. CLEAN. CRISP.',
    desc: 'The Green Snowflake delivers a fresh, smooth experience. Ideal for festivals and long nights. Always tested, always safe.',
    image: BASE + 'green_pill.png', btc: '0.0013', eth: '0.00521', stars: 4,
    bg: 'slide-green', glowColor: 'rgba(50,200,80,0.25)', accent: '#27ae60',
  },
  {
    id: 5, name: 'SMILING DEVIL', subtitle: 'DARE TO SMILE',
    desc: 'Not for the faint of heart. The Smiling Devil is our strongest formula, designed for experienced users who want to push boundaries.',
    image: BASE + 'pink_pill.png', btc: '0.0018', eth: '0.00721', stars: 4,
    bg: 'slide-pink', glowColor: 'rgba(220,50,150,0.25)', accent: '#e91e8c',
  },
  {
    id: 8, name: 'CONFUSED', subtitle: "WHAT'S REAL ANYWAY?",
    desc: 'The yellow one. Hard to describe, easy to enjoy. Confused by name, crystal clear in quality. Our most mysterious product.',
    image: BASE + 'yellow_pill.png', btc: '0.0012', eth: '0.00481', stars: 3,
    bg: 'slide-yellow', glowColor: 'rgba(220,200,50,0.25)', accent: '#f39c12',
  },
];

function Stars({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <div className="hero-stars">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`hero-star ${i < count ? 'filled' : 'empty'}`}>
          <i className={`bi ${i < count ? 'bi-star-fill' : 'bi-star'}`}></i>
        </span>
      ))}
      <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8, fontWeight: 600 }}>
        ({count}.0)
      </span>
    </div>
  );
}

export default function Hero({ onAddToCart, onShop }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 7000;

  const resetTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    let p = 0;
    progressRef.current = setInterval(() => {
      p += 100 / (DURATION / 50);
      if (p >= 100) p = 100;
      setProgress(p);
    }, 50);

    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
      setAnimKey(k => k + 1);
      setProgress(0);
      p = 0;
    }, DURATION);
  };

  useEffect(() => {
    resetTimers();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
    // eslint-disable-next-line
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setAnimKey(k => k + 1);
    resetTimers();
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className={`hero hero-v2 ${slide.bg}`}>
      <div className="hero-slide hero-stage" style={{ position: 'relative' }}>
        <div className="hero-watermark">MYDRUGS</div>

        <img
          src={LOGO_URL}
          alt=""
          aria-hidden="true"
          className="hero-bg-logo"
        />

        <div className="hero-copy hero-copy-left">
          <h1 className="hero-title" key={`title-${animKey}`} style={{ animation: 'fadeSlideUp 0.6s ease' }}>
            {slide.name}
          </h1>
          <p className="hero-subtitle" key={`sub-${animKey}`} style={{ animation: 'fadeSlideUp 0.6s ease 0.1s both' }}>
            {slide.subtitle}
          </p>
          <Stars count={slide.stars} />

          <div className="hero-nav-inline">
            <button className="hero-arrow" onClick={prev}>
              <i className="bi bi-chevron-left"></i>
            </button>
            <button className="hero-arrow" onClick={next}>
              <i className="bi bi-chevron-right"></i>
            </button>
            <button className="hero-view-all" onClick={onShop}>
              <i className="bi bi-grid-fill"></i>
              Shop
            </button>
          </div>
        </div>

        <div
          className="hero-pill-stage"
          style={{
            '--pill-accent': slide.accent,
            '--pill-glow': slide.glowColor,
          } as CSSProperties}
        >
          <div className="hero-pill-glow" style={{ background: slide.glowColor }} />
          <img
            src={slide.image}
            alt={slide.name}
            className="hero-pill-img"
            key={`pill-${animKey}`}
            style={{
              animation: 'float 4s ease-in-out infinite, pillEnter 0.7s ease',
              filter: `drop-shadow(0 18px 36px rgba(0,0,0,0.75)) drop-shadow(0 0 38px ${slide.glowColor}) saturate(1.26)`,
            }}
          />
        </div>

        <div className="hero-copy hero-copy-right">
          <p className="hero-price" key={`price-${animKey}`} style={{ animation: 'fadeSlideUp 0.5s ease 0.2s both' }}>
            <i className="bi bi-currency-bitcoin"></i>
            <span>{slide.btc} BTC</span> / <span>{slide.eth} ETH</span>
          </p>

          <p className="hero-desc" key={`desc-${animKey}`} style={{ animation: 'fadeSlideUp 0.5s ease 0.3s both' }}>
            {slide.desc}
          </p>

          <div className="hero-actions" key={`btns-${animKey}`}>
            <button
              className="hero-add-btn"
              onClick={() => onAddToCart({ id: slide.id, name: slide.name, qty: 1, image: slide.image })}
              title="Add to cart"
            >
              <i className="bi bi-plus-lg"></i>
            </button>
            <button
              className="hero-buy-btn"
              onClick={() => onAddToCart({ id: slide.id, name: slide.name, qty: 1, image: slide.image })}
            >
              <i className="bi bi-bag-plus-fill"></i>
              Buy Now
            </button>
          </div>
        </div>

        <div className="slide-dots">
          {slides.map((_, i) => (
            <button key={i} className={`slide-dot${i === current ? ' active' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>

        <div className="hero-counter">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>

        <div className="slide-progress" style={{ width: `${progress}%` }} />
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pillEnter {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}
