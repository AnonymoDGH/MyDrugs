import { useMemo, useState } from 'react';

const BASE = 'https://raw.githubusercontent.com/skelettn/MyDrugs2.0/main/assets/items/';

interface CartItem { id: number; name: string; qty: number; image: string; }
interface Props {
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
}

const premiumProducts = [
  {
    id: 201, name: 'BIG BOOMER', image: BASE + 'grenade-pill.png',
    btc: '0.0020', eth: '0.00801',
    desc: 'Our strongest formula. Not for beginners. Lab-purity: 99.2%.', rating: 5,
  },
  {
    id: 202, name: 'PURPLE FLOWER', image: BASE + 'purple_pill.png',
    btc: '0.0016', eth: '0.00641',
    desc: 'A deeply euphoric experience. Premium grade MDMA. Lab-purity: 98.7%.', rating: 5,
  },
  {
    id: 203, name: 'SMILING DEVIL', image: BASE + 'pink_pill.png',
    btc: '0.0018', eth: '0.00721',
    desc: 'Intense, long-lasting. Our cult classic for veterans. Lab-purity: 98.9%.', rating: 4,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 12, alignItems: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <i key={i} className={`bi ${i <= n ? 'bi-star-fill' : 'bi-star'}`}
           style={{ color: i <= n ? '#fbbf24' : 'rgba(255,255,255,0.15)', fontSize: 14,
                    filter: i <= n ? 'drop-shadow(0 0 4px rgba(251,191,36,0.3))' : 'none' }}></i>
      ))}
      <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 6 }}>({n}.0)</span>
    </div>
  );
}

export default function Premium({ onAddToCart, onBuyNow }: Props) {
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState<'all' | '5' | '4'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'btc-low' | 'btc-high'>('featured');
  const [currency, setCurrency] = useState<'btc' | 'eth'>('btc');
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(premiumProducts.map(product => [product.id, 1]))
  );

  const filteredProducts = useMemo(() => {
    const bySearch = search.trim().length === 0
      ? premiumProducts
      : premiumProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));

    const byRating = ratingFilter === 'all'
      ? bySearch
      : bySearch.filter(product => product.rating >= Number(ratingFilter));

    const sorted = [...byRating];
    if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'btc-low') {
      sorted.sort((a, b) => Number(a.btc) - Number(b.btc));
    }
    if (sortBy === 'btc-high') {
      sorted.sort((a, b) => Number(b.btc) - Number(a.btc));
    }
    return sorted;
  }, [ratingFilter, search, sortBy]);

  const increaseQty = (id: number) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decreaseQty = (id: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

  return (
    <div className="page-enter">
      <div style={{
        background: 'linear-gradient(135deg, #140a20 0%, #22103d 100%)',
        borderBottom: '1px solid rgba(142,68,173,0.3)', padding: '60px 80px 40px',
      }}>
        <div className="section-title" style={{ color: '#9b59b6' }}>
          <i className="bi bi-gem"></i> Top Shelf
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <h1 className="section-heading" style={{ marginBottom: 0 }}>Premium Selection</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, maxWidth: 440, lineHeight: 1.7 }}>
            <i className="bi bi-award-fill" style={{ color: '#9b59b6', marginRight: 6 }}></i>
            Our finest products. Each batch is individually tested and certified.
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
                placeholder="Search premium"
                style={{
                  background: 'transparent', border: 'none', outline: 'none', color: 'white',
                  fontSize: 12, width: 140,
                }}
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'featured' | 'rating' | 'btc-low' | 'btc-high')}
              style={{
                padding: '9px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)', color: 'white', fontSize: 12,
              }}
            >
              <option value="featured" style={{ color: 'black' }}>Featured</option>
              <option value="rating" style={{ color: 'black' }}>Highest Rated</option>
              <option value="btc-low" style={{ color: 'black' }}>Price: Low to High</option>
              <option value="btc-high" style={{ color: 'black' }}>Price: High to Low</option>
            </select>
            <select
              value={ratingFilter}
              onChange={e => setRatingFilter(e.target.value as 'all' | '5' | '4')}
              style={{
                padding: '9px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)', color: 'white', fontSize: 12,
              }}
            >
              <option value="all" style={{ color: 'black' }}>All Ratings</option>
              <option value="5" style={{ color: 'black' }}>5 Stars</option>
              <option value="4" style={{ color: 'black' }}>4+ Stars</option>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
          {filteredProducts.map(p => (
            <div key={p.id} className="shop-card" style={{ borderColor: 'rgba(142,68,173,0.25)' }}>
              <div style={{
                position: 'absolute', top: 14, right: 14,
                padding: '4px 12px', borderRadius: 20,
                background: 'rgba(142,68,173,0.12)',
                border: '1px solid rgba(142,68,173,0.3)',
                fontSize: 10, fontWeight: 700, color: '#9b59b6',
                letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: 5, zIndex: 5,
              }}>
                <i className="bi bi-gem" style={{ fontSize: 11 }}></i>
                PREMIUM
              </div>
              <img src={p.image} alt={p.name} className="shop-card-img" style={{ width: 140, height: 140 }} />
              <div className="shop-card-name">{p.name}</div>
              <Stars n={p.rating} />
              <p style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center', marginBottom: 12, lineHeight: 1.6 }}>{p.desc}</p>
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
                  onClick={() => decreaseQty(p.id)}
                  disabled={quantities[p.id] <= 1}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="qty-num">{quantities[p.id]}</span>
                <button className="qty-btn" onClick={() => increaseQty(p.id)}>
                  <i className="bi bi-plus"></i>
                </button>
              </div>

              <button className="shop-card-atc" style={{ marginTop: 20 }} onClick={() => onAddToCart({ id: p.id, name: p.name, qty: quantities[p.id], image: p.image })}>
                <i className="bi bi-bag-plus"></i>
                Add to Cart
              </button>
              <button
                className="shop-card-buy"
                style={{ background: 'linear-gradient(135deg, #8e44ad, #a855f7)' }}
                onClick={() => onBuyNow({ id: p.id, name: p.name, qty: quantities[p.id], image: p.image })}
              >
                <i className="bi bi-lightning-charge-fill"></i>
                Buy Now
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
            <i className="bi bi-inbox" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
            No premium products match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
