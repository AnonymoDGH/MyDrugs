import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AgeGate from './components/AgeGate';
import Header from './components/Header';
import Hero from './components/Hero';
import Shop from './components/Shop';
import FAQ from './components/FAQ';
import Safety from './components/Safety';
import Contact from './components/Contact';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import Economy from './components/Economy';
import Premium from './components/Premium';
import Packs from './components/Packs';

interface CartItem { id: number; name: string; qty: number; image: string; }

type Page = 'home' | 'shop' | 'economy' | 'premium' | 'packs' | 'safety' | 'faq' | 'contact';

const PAGE_PATHS: Record<Page, string> = {
  home: '/',
  shop: '/shop',
  economy: '/economy',
  premium: '/premium',
  packs: '/packs',
  safety: '/safety',
  faq: '/faq',
  contact: '/contact',
};

const PATH_TO_PAGE: Record<string, Page> = {
  '/': 'home',
  '/home': 'home',
  '/shop': 'shop',
  '/economy': 'economy',
  '/premium': 'premium',
  '/packs': 'packs',
  '/safety': 'safety',
  '/faq': 'faq',
  '/contact': 'contact',
};

const LOGO_URL = 'https://raw.githubusercontent.com/skelettn/MyDrugs2.0/main/assets/logo.png';
const BASE = 'https://raw.githubusercontent.com/skelettn/MyDrugs2.0/main/assets/items/';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [ageAccepted, setAgeAccepted] = useState(() => {
    return localStorage.getItem('md_age') === 'yes';
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [tickerVisible, setTickerVisible] = useState(true);

  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  const page = PATH_TO_PAGE[normalizedPath] ?? 'home';

  const handleAcceptAge = () => {
    localStorage.setItem('md_age', 'yes');
    setAgeAccepted(true);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i);
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const handleBuyNow = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i);
      }
      return [...prev, item];
    });
    // Buy Now jumps directly to checkout/login flow.
    setLoginOpen(true);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setLoginOpen(true);
  };

  const navigateTo = (p: string) => {
    const target = (p in PAGE_PATHS ? (p as Page) : 'home');
    navigate(PAGE_PATHS[target]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [normalizedPath]);

  useEffect(() => {
    if (!PATH_TO_PAGE[normalizedPath]) {
      navigate('/', { replace: true });
    }
  }, [normalizedPath, navigate]);

  if (!ageAccepted) {
    return <AgeGate onAccept={handleAcceptAge} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        page={page}
        setPage={navigateTo}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onLoginOpen={() => setLoginOpen(true)}
        onTickerVisibleChange={setTickerVisible}
      />

      <main style={{ flex: 1, marginTop: page === 'home' ? (tickerVisible ? 36 : 0) : (tickerVisible ? 96 : 60) }}>
        {page === 'home' && (
          <>
            <Hero onAddToCart={handleAddToCart} onShop={() => navigateTo('shop')} />

            {/* Features strip */}
            <div className="features-strip">
              <div className="feature-item">
                <i className="bi bi-shield-lock-fill"></i>
                <span className="feature-item-text">PGP Encrypted</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-currency-bitcoin"></i>
                <span className="feature-item-text">Crypto Only</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-flask" style={{ fontFamily: 'bootstrap-icons' }}></i>
                <span className="feature-item-text">Lab Tested</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-globe2"></i>
                <span className="feature-item-text">Worldwide Shipping</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-arrow-repeat"></i>
                <span className="feature-item-text">Reship Guarantee</span>
              </div>
            </div>

            {/* Mini shop preview */}
            <div style={{ background: 'var(--nav-bg)', padding: '80px 80px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div className="section-title">
                    <i className="bi bi-fire"></i> Top Sellers
                  </div>
                  <h2 style={{ fontSize: 34, fontWeight: 900, letterSpacing: '-0.02em' }}>Featured Products</h2>
                </div>
                <button
                  onClick={() => navigateTo('shop')}
                  style={{
                    padding: '10px 24px', border: '1.5px solid var(--border)',
                    borderRadius: 30, background: 'transparent',
                    color: 'var(--text-muted)', fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <i className="bi bi-grid-fill" style={{ fontSize: 14 }}></i>
                  View All
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
                {[
                  { id: 7, name: 'RED PILL', image: BASE + 'red_pill.png', btc: '0.0013', eth: '0.00523', tag: 'POPULAR', tagIcon: 'bi-heart-fill', tagColor: '#e5e7eb', tagBg: 'rgba(255,255,255,0.08)', tagBorder: 'rgba(255,255,255,0.2)' },
                  { id: 2, name: 'BLUE CLOVER', image: BASE + 'blue_pill.png', btc: '0.0014', eth: '0.00561', tag: null, tagIcon: '', tagColor: '', tagBg: '', tagBorder: '' },
                  { id: 6, name: 'PURPLE FLOWER', image: BASE + 'purple_pill.png', btc: '0.0016', eth: '0.00641', tag: 'PREMIUM', tagIcon: 'bi-gem', tagColor: '#9b59b6', tagBg: 'rgba(142,68,173,0.12)', tagBorder: 'rgba(142,68,173,0.3)' },
                  { id: 8, name: 'CONFUSED', image: BASE + 'yellow_pill.png', btc: '0.0012', eth: '0.00481', tag: 'NEW', tagIcon: 'bi-stars', tagColor: '#2ecc71', tagBg: 'rgba(39,174,96,0.12)', tagBorder: 'rgba(39,174,96,0.3)' },
                ].map(p => (
                  <div className="shop-card" key={p.id}>
                    {p.tag && (
                      <div style={{
                        position: 'absolute', top: 14, right: 14,
                        padding: '4px 12px', borderRadius: 20,
                        background: p.tagBg, border: `1px solid ${p.tagBorder}`,
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                        color: p.tagColor, display: 'flex', alignItems: 'center', gap: 5, zIndex: 5,
                      }}>
                        <i className={`bi ${p.tagIcon}`} style={{ fontSize: 11 }}></i>
                        {p.tag}
                      </div>
                    )}
                    <img src={p.image} alt={p.name} className="shop-card-img" />
                    <div className="shop-card-name">{p.name}</div>
                    <div className="shop-card-price">
                      <i className="bi bi-currency-bitcoin"></i>
                      {p.btc} BTC / {p.eth} ETH
                    </div>
                    <div className="shop-card-stock" style={{ marginBottom: 20 }}>
                      <i className="bi bi-circle-fill"></i>
                      In Stock
                    </div>
                    <button
                      className="shop-card-atc"
                      onClick={() => handleAddToCart({ id: p.id, name: p.name, qty: 1, image: p.image })}
                    >
                      <i className="bi bi-bag-plus"></i>
                      Add to Cart
                    </button>
                    <button
                      className="shop-card-buy"
                      onClick={() => handleBuyNow({ id: p.id, name: p.name, qty: 1, image: p.image })}
                    >
                      <i className="bi bi-lightning-charge-fill"></i>
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats section */}
            <div style={{ padding: '80px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {[
                { num: '99.2%', label: 'Average Purity', icon: 'bi-patch-check-fill' },
                { num: '50K+', label: 'Happy Customers', icon: 'bi-people-fill' },
                { num: '3–5 days', label: 'Avg. Delivery', icon: 'bi-truck' },
                { num: '100%', label: 'Discreet Packaging', icon: 'bi-box-seam-fill' },
              ].map(s => (
                <div className="stat-card" key={s.label}>
                  <div className="stat-icon"><i className={`bi ${s.icon}`}></i></div>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Trust section */}
            <div style={{
              padding: '60px 80px', background: 'var(--nav-bg)',
              borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                <div className="section-title" style={{ justifyContent: 'center' }}>
                  <i className="bi bi-shield-fill-check"></i> Why Choose Us
                </div>
                <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 48, letterSpacing: '-0.02em' }}>
                  Built on Trust & Security
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
                  {[
                    { icon: 'bi-lock-fill', title: 'End-to-End Encryption', desc: 'All communications and transactions are encrypted using military-grade PGP.' },
                    { icon: 'bi-eye-slash-fill', title: 'Zero Knowledge', desc: 'We never store personal data. All info is purged after order dispatch.' },
                    { icon: 'bi-fingerprint', title: 'Anonymous Access', desc: 'No registration required. Access via Tor or VPN for maximum privacy.' },
                  ].map(t => (
                    <div key={t.title} style={{ padding: '24px', textAlign: 'center' }}>
                      <div style={{
                        width: 56, height: 56, borderRadius: 16,
                        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                      }}>
                        <i className={`bi ${t.icon}`} style={{ fontSize: 24, color: '#f5f5f5' }}></i>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{t.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {page === 'shop' && <Shop onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />}
        {page === 'economy' && <Economy onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />}
        {page === 'premium' && <Premium onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />}
        {page === 'packs' && <Packs onAddToCart={handleAddToCart} />}
        {page === 'faq' && <FAQ />}
        {page === 'safety' && <Safety />}
        {page === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-name">
              <img src={LOGO_URL} alt="MyDrugs" />
              MYDRUGS
            </div>
            <div className="footer-brand-desc">
              Created by{' '}
              <a
                href="https://discord.gg/a9FZRegynz"
                target="_blank"
                rel="noreferrer"
                className="footer-credit-link"
              >
                Popbob
              </a>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Navigation</div>
            <span className="footer-col-link" onClick={() => navigateTo('home')}>
              <i className="bi bi-house-fill" style={{ marginRight: 8, fontSize: 12 }}></i>Home
            </span>
            <span className="footer-col-link" onClick={() => navigateTo('shop')}>
              <i className="bi bi-shop" style={{ marginRight: 8, fontSize: 12 }}></i>Shop
            </span>
            <span className="footer-col-link" onClick={() => navigateTo('faq')}>
              <i className="bi bi-question-circle" style={{ marginRight: 8, fontSize: 12 }}></i>FAQ
            </span>
            <span className="footer-col-link" onClick={() => navigateTo('contact')}>
              <i className="bi bi-envelope" style={{ marginRight: 8, fontSize: 12 }}></i>Contact
            </span>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Products</div>
            <span className="footer-col-link" onClick={() => navigateTo('economy')}>
              <i className="bi bi-tags-fill" style={{ marginRight: 8, fontSize: 12 }}></i>Economy
            </span>
            <span className="footer-col-link" onClick={() => navigateTo('premium')}>
              <i className="bi bi-gem" style={{ marginRight: 8, fontSize: 12 }}></i>Premium
            </span>
            <span className="footer-col-link" onClick={() => navigateTo('packs')}>
              <i className="bi bi-box-seam-fill" style={{ marginRight: 8, fontSize: 12 }}></i>Party Packs
            </span>
            <span className="footer-col-link" onClick={() => navigateTo('safety')}>
              <i className="bi bi-shield-check" style={{ marginRight: 8, fontSize: 12 }}></i>Safety
            </span>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Security</div>
            <span className="footer-col-link">
              <i className="bi bi-lock-fill" style={{ marginRight: 8, fontSize: 12 }}></i>PGP Encryption
            </span>
            <span className="footer-col-link">
              <i className="bi bi-currency-bitcoin" style={{ marginRight: 8, fontSize: 12 }}></i>Crypto Only
            </span>
            <span className="footer-col-link">
              <i className="bi bi-incognito" style={{ marginRight: 8, fontSize: 12 }}></i>Anonymous
            </span>
            <span className="footer-col-link">
              <i className="bi bi-shield-fill-check" style={{ marginRight: 8, fontSize: 12 }}></i>Verified
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            <i className="bi bi-c-circle" style={{ marginRight: 6 }}></i>
            2024 MyDrugs 2.0 · Fan Project · Not affiliated with Netflix
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="footer-socials">
              <a href="https://github.com/TheOneWhoWill/Mydrugs" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                <i className="bi bi-github"></i>
              </a>
              <button className="footer-social-btn">
                <i className="bi bi-discord"></i>
              </button>
              <button className="footer-social-btn">
                <i className="bi bi-reddit"></i>
              </button>
              <button className="footer-social-btn">
                <i className="bi bi-twitter-x"></i>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Login Modal */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </div>
  );
}
