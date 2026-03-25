import { useState, useEffect } from 'react';

const LOGO_URL = 'https://raw.githubusercontent.com/skelettn/MyDrugs2.0/main/assets/logo.png';

interface HeaderProps {
  page: string;
  setPage: (p: string) => void;
  cartCount: number;
  onCartOpen: () => void;
  onLoginOpen: () => void;
  onTickerVisibleChange?: (visible: boolean) => void;
}

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'bi-house-fill' },
  { key: 'shop', label: 'Shop', icon: 'bi-shop' },
  { key: 'economy', label: 'Economy', icon: 'bi-tags-fill' },
  { key: 'premium', label: 'Premium', icon: 'bi-gem' },
  { key: 'packs', label: 'Party Packs', icon: 'bi-box-seam-fill' },
  { key: 'safety', label: 'Safety', icon: 'bi-shield-check' },
  { key: 'faq', label: 'FAQ', icon: 'bi-question-circle-fill' },
  { key: 'contact', label: 'Contact', icon: 'bi-envelope-fill' },
];

export default function Header({ page, setPage, cartCount, onCartOpen, onLoginOpen, onTickerVisibleChange }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTicker, setShowTicker] = useState(true);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    onTickerVisibleChange?.(true);
    const timeout = window.setTimeout(() => {
      setShowTicker(false);
      onTickerVisibleChange?.(false);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [onTickerVisibleChange]);

  return (
    <>
      {/* Ticker Banner */}
      {showTicker && (
        <div className="ticker-banner">
          <div className="ticker-track">
            {[...Array(3)].map((_, rep) => (
              <span key={rep} style={{ display: 'inline-flex' }}>
                <span className="ticker-item">
                  <i className="bi bi-lock-fill"></i>
                  All transactions are encrypted
                </span>
                <span className="ticker-item">
                  <span className="ticker-dot" />
                </span>
                <span className="ticker-item">
                  <i className="bi bi-globe2"></i>
                  Worldwide shipping
                </span>
                <span className="ticker-item">
                  <span className="ticker-dot" />
                </span>
                <span className="ticker-item">
                  <i className="bi bi-headset"></i>
                  24/7 Support
                </span>
                <span className="ticker-item">
                  <span className="ticker-dot" />
                </span>
                <span className="ticker-item">
                  <i className="bi bi-shield-fill-check"></i>
                  Lab tested products
                </span>
                <span className="ticker-item">
                  <span className="ticker-dot" />
                </span>
                <span className="ticker-item">
                  <i className="bi bi-currency-bitcoin"></i>
                  Crypto payments only
                </span>
                <span className="ticker-item">
                  <span className="ticker-dot" />
                </span>
                <span className="ticker-item">
                  <i className="bi bi-box-seam-fill"></i>
                  Discreet packaging
                </span>
                <span className="ticker-item">
                  <span className="ticker-dot" />
                </span>
                <span className="ticker-item">
                  <i className="bi bi-arrow-repeat"></i>
                  Reship guarantee
                </span>
                <span className="ticker-item">
                  <span className="ticker-dot" />
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Nav */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}${showTicker ? ' with-ticker' : ''}`}>
        {/* Left links */}
        <div className="nav-links">
          {NAV_ITEMS.slice(0, 4).map(item => (
            <button
              key={item.key}
              className={`nav-link${page === item.key ? ' active' : ''}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setPage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Center logo */}
        <button
          className="nav-logo"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setPage('home')}
        >
          <img src={LOGO_URL} alt="MyDrugs" />
          <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-0.02em' }}>MYDRUGS</span>
        </button>

        {/* Right links */}
        <div className="nav-links">
          {NAV_ITEMS.slice(4).map(item => (
            <button
              key={item.key}
              className={`nav-link${page === item.key ? ' active' : ''}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setPage(item.key)}
            >
              {item.label}
            </button>
          ))}
          {/* Cart */}
          <button className="nav-cart-btn" onClick={onCartOpen}>
            <i className="bi bi-bag-fill"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          {/* Login */}
          <button className="nav-login-btn" onClick={onLoginOpen}>
            <i className="bi bi-person-fill"></i>
            Login
          </button>
        </div>

        {/* Mobile burger */}
        <button
          style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: 22, cursor: 'pointer' }}
          className="hamb-btn"
          onClick={() => setMobileOpen(true)}
        >
          <i className="bi bi-list"></i>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu-panel" onClick={e => e.stopPropagation()}>
            <button
              style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}
              onClick={() => setMobileOpen(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
            {NAV_ITEMS.map(item => (
              <button
                key={item.key}
                className={`mobile-menu-link${page === item.key ? ' active' : ''}`}
                onClick={() => { setPage(item.key); setMobileOpen(false); }}
              >
                <i className={`bi ${item.icon}`}></i>
                {item.label}
              </button>
            ))}
            <button
              className="mobile-menu-link"
              onClick={() => { onCartOpen(); setMobileOpen(false); }}
            >
              <i className="bi bi-bag-fill"></i>
              Cart {cartCount > 0 ? `(${cartCount})` : ''}
            </button>
            <button className="nav-login-btn" style={{ marginTop: 8, justifyContent: 'center' }} onClick={() => { onLoginOpen(); setMobileOpen(false); }}>
              <i className="bi bi-person-fill"></i>
              Login
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav .nav-links { display: none !important; }
          .hamb-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
