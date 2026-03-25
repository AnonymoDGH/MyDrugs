import { useMemo, useState } from 'react';

const BASE = 'https://raw.githubusercontent.com/skelettn/MyDrugs2.0/main/assets/items/';

interface CartItem { id: number; name: string; qty: number; image: string; }
interface Props {
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
}

const bundles = [
  {
    id: 101, name: 'STARTER PACK', image: BASE + 'red_pill.png',
    desc: 'Perfect for first-timers. Includes 2x Red Pill + Safety Guide.',
    btc: '0.0022', eth: '0.00882', savings: 15,
  },
  {
    id: 102, name: 'WEEKEND BUNDLE', image: BASE + 'blue_pill.png',
    desc: '4x Blue Clover. Enough for a great weekend, perfectly dosed.',
    btc: '0.0048', eth: '0.01923', savings: 20,
  },
  {
    id: 103, name: 'MIX & MATCH', image: BASE + 'purple_pill.png',
    desc: 'One of each: Red, Blue, Green, Purple. Try them all.',
    btc: '0.0050', eth: '0.02001', savings: 18,
  },
  {
    id: 104, name: 'THE CONFUSED PACK', image: BASE + 'yellow_pill.png',
    desc: "6x Confused. You won't know what hit you — in the best way.",
    btc: '0.0060', eth: '0.02402', savings: 22,
  },
];

export default function Economy({ onAddToCart, onBuyNow }: Props) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'deal' | 'btc-low' | 'btc-high'>('deal');
  const [discountFilter, setDiscountFilter] = useState<'all' | '15' | '20'>('all');
  const [currency, setCurrency] = useState<'btc' | 'eth'>('btc');
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(bundles.map(b => [b.id, 1]))
  );

  const filteredBundles = useMemo(() => {
    const bySearch = search.trim().length === 0
      ? bundles
      : bundles.filter(bundle => bundle.name.toLowerCase().includes(search.toLowerCase()));

    const byDiscount = discountFilter === 'all'
      ? bySearch
      : bySearch.filter(bundle => bundle.savings >= Number(discountFilter));

    const sorted = [...byDiscount];
    if (sortBy === 'btc-low') {
      sorted.sort((a, b) => Number(a.btc) - Number(b.btc));
    }
    if (sortBy === 'btc-high') {
      sorted.sort((a, b) => Number(b.btc) - Number(a.btc));
    }
    if (sortBy === 'deal') {
      sorted.sort((a, b) => b.savings - a.savings);
    }
    return sorted;
  }, [discountFilter, search, sortBy]);

  const increaseQty = (id: number) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decreaseQty = (id: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

  return (
    <div className="page-enter">
      <div style={{
        background: 'linear-gradient(135deg, var(--nav-bg) 0%, var(--card-bg) 100%)',
        borderBottom: '1px solid var(--border)', padding: '60px 80px 40px',
      }}>
        <div className="section-title">
          <i className="bi bi-tags-fill"></i> Save More
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <h1 className="section-heading" style={{ marginBottom: 0 }}>Economy Bundles</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, maxWidth: 400, lineHeight: 1.7 }}>
            <i className="bi bi-percent" style={{ color: 'var(--green)', marginRight: 6 }}></i>
            Get more for less. Our economy bundles offer the best value.
          </p>
        </div>
      </div>

      <div className="section">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 12,
              background: 'rgba(255,255,255,0.02)',
            }}>
              <i className="bi bi-search" style={{ color: 'var(--text-muted)', fontSize: 12 }}></i>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search bundle"
                style={{
                  background: 'transparent', border: 'none', outline: 'none', color: 'white',
                  fontSize: 12, width: 140,
                }}
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'deal' | 'btc-low' | 'btc-high')}
              style={{
                padding: '9px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)', color: 'white', fontSize: 12,
              }}
            >
              <option value="deal" style={{ color: 'black' }}>Best Deal</option>
              <option value="btc-low" style={{ color: 'black' }}>Price: Low to High</option>
              <option value="btc-high" style={{ color: 'black' }}>Price: High to Low</option>
            </select>
            <select
              value={discountFilter}
              onChange={e => setDiscountFilter(e.target.value as 'all' | '15' | '20')}
              style={{
                padding: '9px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)', color: 'white', fontSize: 12,
              }}
            >
              <option value="all" style={{ color: 'black' }}>All Discounts</option>
              <option value="15" style={{ color: 'black' }}>15%+ Savings</option>
              <option value="20" style={{ color: 'black' }}>20%+ Savings</option>
            </select>
          </div>

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
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {filteredBundles.map(b => (
            <div key={b.id} className="shop-card">
              <div style={{
                position: 'absolute', top: 14, right: 14,
                padding: '4px 12px', borderRadius: 20,
                background: 'rgba(39,174,96,0.12)',
                border: '1px solid rgba(39,174,96,0.3)',
                fontSize: 10, fontWeight: 700, color: '#2ecc71',
                letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 5, zIndex: 5,
              }}>
                <i className="bi bi-tag-fill" style={{ fontSize: 11 }}></i>
                SAVE {b.savings}%
              </div>
              <img src={b.image} alt={b.name} className="shop-card-img" />
              <div className="shop-card-name">{b.name}</div>
              <div className="shop-card-price">
                <i className="bi bi-currency-bitcoin"></i>
                {currency === 'btc' ? `${b.btc} BTC` : `${b.eth} ETH`}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center', marginBottom: 20, lineHeight: 1.6 }}>{b.desc}</p>
              <div className="shop-card-stock">
                <i className="bi bi-circle-fill"></i>
                Available
              </div>

              <div className="shop-card-qty">
                <button
                  className="qty-btn"
                  onClick={() => decreaseQty(b.id)}
                  disabled={quantities[b.id] <= 1}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="qty-num">{quantities[b.id]}</span>
                <button className="qty-btn" onClick={() => increaseQty(b.id)}>
                  <i className="bi bi-plus"></i>
                </button>
              </div>

              <button className="shop-card-atc" onClick={() => onAddToCart({ id: b.id, name: b.name, qty: quantities[b.id], image: b.image })}>
                <i className="bi bi-bag-plus"></i>
                Add Bundle
              </button>
              <button className="shop-card-buy" onClick={() => onBuyNow({ id: b.id, name: b.name, qty: quantities[b.id], image: b.image })}>
                <i className="bi bi-lightning-charge-fill"></i>
                Buy Bundle
              </button>
            </div>
          ))}
        </div>

        {filteredBundles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
            <i className="bi bi-inbox" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
            No bundles match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
