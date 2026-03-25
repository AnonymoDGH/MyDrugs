import { useMemo, useState, type CSSProperties } from 'react';

const BASE = 'https://raw.githubusercontent.com/skelettn/MyDrugs2.0/main/assets/items/';

interface CartItem { id: number; name: string; qty: number; image: string; }
interface ShopProps {
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
}

const products = [
  { id: 1, name: '#100', image: BASE + '100.png', btc: '0.0010', eth: '0.00401', tag: null, glow: 'rgba(255,255,255,0.38)' },
  { id: 2, name: 'BLUE CLOVER', image: BASE + 'blue_pill.png', btc: '0.0014', eth: '0.00561', tag: null, glow: 'rgba(80,130,255,0.38)' },
  { id: 3, name: 'GREEN SNOWFLAKE', image: BASE + 'green_pill.png', btc: '0.0013', eth: '0.00521', tag: null, glow: 'rgba(70,220,100,0.38)' },
  { id: 4, name: 'BIG BOOMER', image: BASE + 'grenade-pill.png', btc: '0.0020', eth: '0.00801', tag: 'PREMIUM', glow: 'rgba(190,110,255,0.34)' },
  { id: 5, name: 'SMILING DEVIL', image: BASE + 'pink_pill.png', btc: '0.0018', eth: '0.00721', tag: 'HOT', glow: 'rgba(255,75,170,0.38)' },
  { id: 6, name: 'PURPLE FLOWER', image: BASE + 'purple_pill.png', btc: '0.0016', eth: '0.00641', tag: null, glow: 'rgba(175,80,255,0.38)' },
  { id: 7, name: 'RED PILL', image: BASE + 'red_pill.png', btc: '0.0013', eth: '0.00523', tag: 'POPULAR', glow: 'rgba(255,70,70,0.36)' },
  { id: 8, name: 'CONFUSED', image: BASE + 'yellow_pill.png', btc: '0.0012', eth: '0.00481', tag: 'NEW', glow: 'rgba(255,215,70,0.36)' },
];

const TAG_CONFIG: Record<string, { bg: string; border: string; color: string; icon: string }> = {
  HOT: { bg: 'rgba(231,76,60,0.12)', border: 'rgba(231,76,60,0.3)', color: '#e74c3c', icon: 'bi-fire' },
  NEW: { bg: 'rgba(39,174,96,0.12)', border: 'rgba(39,174,96,0.3)', color: '#2ecc71', icon: 'bi-stars' },
  PREMIUM: { bg: 'rgba(142,68,173,0.12)', border: 'rgba(142,68,173,0.3)', color: '#9b59b6', icon: 'bi-gem' },
  POPULAR: { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.2)', color: '#e5e7eb', icon: 'bi-heart-fill' },
};

const FILTERS = [
  { label: 'All', icon: 'bi-grid-fill' },
  { label: 'Popular', icon: 'bi-heart-fill' },
  { label: 'Premium', icon: 'bi-gem' },
  { label: 'New', icon: 'bi-stars' },
  { label: 'Hot', icon: 'bi-fire' },
];

export default function Shop({ onAddToCart, onBuyNow }: ShopProps) {
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(products.map(p => [p.id, 1]))
  );
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'btc-low' | 'btc-high'>('featured');
  const [currency, setCurrency] = useState<'btc' | 'eth'>('btc');
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const decQty = (id: number) => setQuantities(q => ({ ...q, [id]: Math.max(1, (q[id] ?? 1) - 1) }));
  const incQty = (id: number) => setQuantities(q => ({ ...q, [id]: (q[id] ?? 1) + 1 }));

  const filtered = useMemo(() => {
    const byFilter = activeFilter === 'All'
      ? products
      : products.filter(p => p.tag?.toUpperCase() === activeFilter.toUpperCase());

    const bySearch = search.trim().length === 0
      ? byFilter
      : byFilter.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    const sorted = [...bySearch];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === 'btc-low') {
      sorted.sort((a, b) => Number(a.btc) - Number(b.btc));
    }
    if (sortBy === 'btc-high') {
      sorted.sort((a, b) => Number(b.btc) - Number(a.btc));
    }

    return sorted;
  }, [activeFilter, search, sortBy]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page-enter">
      <div style={{
        background: 'linear-gradient(135deg, var(--nav-bg) 0%, var(--card-bg) 100%)',
        borderBottom: '1px solid var(--border)',
        padding: '60px 80px 40px',
      }}>
        <div className="section-title">
          <i className="bi bi-shop"></i> Our Products
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <h1 className="section-heading" style={{ marginBottom: 0 }}>The Shop</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, maxWidth: 440, lineHeight: 1.7 }}>
            <i className="bi bi-patch-check-fill" style={{ color: 'var(--accent2)', marginRight: 6 }}></i>
            All products are lab-tested and verified. Payments accepted in BTC, ETH, XRP, and IOTA.
          </p>
        </div>
      </div>

      <div className="section" style={{ paddingTop: 48 }}>
        {/* Filter bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 16,
          marginBottom: 24,
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          }}>
            {FILTERS.map(f => (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                style={{
                  padding: '8px 20px', borderRadius: 30,
                  border: activeFilter === f.label ? '1.5px solid var(--accent2)' : '1.5px solid var(--border)',
                  background: activeFilter === f.label ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: activeFilter === f.label ? 'white' : 'var(--text-muted)',
                  fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
                  textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <i className={`bi ${f.icon}`} style={{ fontSize: 13 }}></i>
                {f.label}
              </button>
            ))}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 12,
              background: 'rgba(255,255,255,0.02)',
            }}>
              <i className="bi bi-search" style={{ color: 'var(--text-muted)', fontSize: 12 }}></i>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search product"
                style={{
                  background: 'transparent', border: 'none', outline: 'none', color: 'white',
                  fontSize: 12, width: 130,
                }}
              />
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'featured' | 'name' | 'btc-low' | 'btc-high')}
              style={{
                padding: '9px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)', color: 'white', fontSize: 12,
              }}
            >
              <option value="featured" style={{ color: 'black' }}>Featured</option>
              <option value="name" style={{ color: 'black' }}>Name A-Z</option>
              <option value="btc-low" style={{ color: 'black' }}>Price: Low to High</option>
              <option value="btc-high" style={{ color: 'black' }}>Price: High to Low</option>
            </select>

            <div style={{ display: 'inline-flex', border: '1px solid var(--border)', borderRadius: 999, overflow: 'hidden' }}>
              <button
                onClick={() => setCurrency('btc')}
                style={{
                  padding: '8px 12px', border: 'none', background: currency === 'btc' ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: currency === 'btc' ? 'white' : 'var(--text-muted)', fontSize: 11, fontWeight: 700,
                }}
              >
                BTC
              </button>
              <button
                onClick={() => setCurrency('eth')}
                style={{
                  padding: '8px 12px', border: 'none', background: currency === 'eth' ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: currency === 'eth' ? 'white' : 'var(--text-muted)', fontSize: 11, fontWeight: 700,
                }}
              >
                ETH
              </button>
            </div>

            <button
              onClick={() => {
                setSearch('');
                setSortBy('featured');
                setActiveFilter('All');
              }}
              style={{
                padding: '9px 12px', borderRadius: 12, border: '1px solid var(--border)',
                background: 'transparent', color: 'var(--text-muted)', fontSize: 12,
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="shop-grid">
          {filtered.map(p => {
            const tagConf = p.tag ? TAG_CONFIG[p.tag] : null;
            return (
              <div className="shop-card" key={p.id}>
                <button
                  onClick={() => toggleFavorite(p.id)}
                  title={favorites[p.id] ? 'Remove from favorites' : 'Add to favorites'}
                  style={{
                    position: 'absolute', top: 14, left: 14,
                    width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)',
                    background: 'rgba(0,0,0,0.4)', color: favorites[p.id] ? '#ff4d6d' : 'rgba(255,255,255,0.65)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 6,
                  }}
                >
                  <i className={`bi ${favorites[p.id] ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </button>

                {tagConf && (
                  <div style={{
                    position: 'absolute', top: 14, right: 14,
                    padding: '4px 12px', borderRadius: 20,
                    background: tagConf.bg, border: `1px solid ${tagConf.border}`,
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                    color: tagConf.color, display: 'flex', alignItems: 'center', gap: 5, zIndex: 5,
                  }}>
                    <i className={`bi ${tagConf.icon}`} style={{ fontSize: 11 }}></i>
                    {p.tag}
                  </div>
                )}

                <div className="shop-card-media" style={{ '--drug-glow': p.glow } as CSSProperties}>
                  <img src={p.image} alt={p.name} className="shop-card-img" />
                </div>
                <div className="shop-card-name">{p.name}</div>
                <div className="shop-card-price">
                  <i className="bi bi-currency-bitcoin"></i>
                  {currency === 'btc' ? `${p.btc} BTC` : `${p.eth} ETH`}
                </div>
                <div className="shop-card-stock">
                  <i className="bi bi-circle-fill"></i>
                  In Stock
                </div>

                <div className="shop-card-qty">
                  <button
                    className="qty-btn"
                    onClick={() => decQty(p.id)}
                    disabled={(quantities[p.id] ?? 1) <= 1}
                    title={(quantities[p.id] ?? 1) <= 1 ? 'Minimum quantity is 1' : 'Decrease quantity'}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="qty-num">{quantities[p.id] ?? 1}</span>
                  <button className="qty-btn" onClick={() => incQty(p.id)}>
                    <i className="bi bi-plus"></i>
                  </button>
                </div>

                <button className="shop-card-atc" onClick={() => onAddToCart({ id: p.id, name: p.name, qty: quantities[p.id] ?? 1, image: p.image })}>
                  <i className="bi bi-bag-plus"></i>
                  Add to Cart
                </button>
                <button
                  className="shop-card-buy"
                  onClick={() => onBuyNow({ id: p.id, name: p.name, qty: quantities[p.id] ?? 1, image: p.image })}
                >
                  <i className="bi bi-lightning-charge-fill"></i>
                  Buy Now
                </button>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <i className="bi bi-inbox" style={{ fontSize: 40, display: 'block', marginBottom: 12 }}></i>
            No products found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
