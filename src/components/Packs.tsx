const BASE = 'https://raw.githubusercontent.com/skelettn/MyDrugs2.0/main/assets/items/';

interface CartItem { id: number; name: string; qty: number; image: string; }
interface Props { onAddToCart: (item: CartItem) => void; }

const packs = [
  {
    id: 301, name: 'FESTIVAL PACK',
    images: [BASE + 'blue_pill.png', BASE + 'green_pill.png', BASE + 'red_pill.png'],
    primary: BASE + 'blue_pill.png', btc: '0.0035', eth: '0.01401',
    desc: 'Everything you need for a 3-day festival. 2x Blue Clover, 2x Green Snowflake, 2x Red Pill.',
    pills: '6 units', color: '#2980b9', icon: 'bi-music-note-beamed',
  },
  {
    id: 302, name: 'RAVE PACK',
    images: [BASE + 'pink_pill.png', BASE + 'purple_pill.png'],
    primary: BASE + 'pink_pill.png', btc: '0.0032', eth: '0.01281',
    desc: 'Built for the rave. 3x Smiling Devil, 3x Purple Flower. Maximum energy.',
    pills: '6 units', color: '#e91e8c', icon: 'bi-lightning-charge-fill',
  },
  {
    id: 303, name: 'CHILL PACK',
    images: [BASE + 'yellow_pill.png', BASE + 'red_pill.png'],
    primary: BASE + 'yellow_pill.png', btc: '0.0024', eth: '0.00961',
    desc: 'For a calm, relaxed evening. 3x Confused, 2x Red Pill. Perfect for small gatherings.',
    pills: '5 units', color: '#f39c12', icon: 'bi-moon-stars-fill',
  },
  {
    id: 304, name: 'THE FULL COLLECTION',
    images: [BASE + 'red_pill.png', BASE + 'blue_pill.png', BASE + 'purple_pill.png'],
    primary: BASE + '100.png', btc: '0.0080', eth: '0.03203',
    desc: 'One of every product we carry. The ultimate party pack.',
    pills: '8 units', color: '#b7b7b7', icon: 'bi-collection-fill',
  },
];

export default function Packs({ onAddToCart }: Props) {
  return (
    <div className="page-enter">
      <div style={{
        background: 'linear-gradient(135deg, var(--nav-bg) 0%, var(--card-bg) 100%)',
        borderBottom: '1px solid var(--border)', padding: '60px 80px 40px',
      }}>
        <div className="section-title">
          <i className="bi bi-box-seam-fill"></i> Group Orders
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <h1 className="section-heading" style={{ marginBottom: 0 }}>Party Packs</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, maxWidth: 440, lineHeight: 1.7 }}>
            <i className="bi bi-box-seam" style={{ color: 'var(--accent2)', marginRight: 6 }}></i>
            Curated packs for every occasion. All packs ship in a single discreet parcel.
          </p>
        </div>
      </div>

      <div className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {packs.map(p => (
            <div key={p.id} className="shop-card" style={{ borderColor: `${p.color}30` }}>
              {/* Pack type indicator */}
              <div style={{
                position: 'absolute', top: 14, left: 14,
                width: 36, height: 36, borderRadius: 12,
                background: `${p.color}18`, border: `1px solid ${p.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5,
              }}>
                <i className={`bi ${p.icon}`} style={{ fontSize: 16, color: p.color }}></i>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 8, marginTop: 8 }}>
                {p.images.map((img, i) => (
                  <img key={i} src={img} alt="" style={{
                    width: 36, height: 36, objectFit: 'contain', opacity: 0.7,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                  }} />
                ))}
              </div>
              <img src={p.primary} alt={p.name} className="shop-card-img" style={{ width: 100, height: 100 }} />
              <div className="shop-card-name">{p.name}</div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: p.color,
                letterSpacing: '0.1em', marginBottom: 6,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <i className="bi bi-stack" style={{ fontSize: 12 }}></i>
                {p.pills}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center', marginBottom: 14, lineHeight: 1.6 }}>{p.desc}</p>
              <div className="shop-card-price">
                <i className="bi bi-currency-bitcoin"></i>
                {p.btc} BTC / {p.eth} ETH
              </div>
              <div className="shop-card-stock" style={{ marginBottom: 20 }}>
                <i className="bi bi-circle-fill"></i>
                Ready to Ship
              </div>
              <button className="shop-card-atc" onClick={() => onAddToCart({ id: p.id, name: p.name, qty: 1, image: p.primary })}>
                <i className="bi bi-bag-plus"></i>
                Add Pack
              </button>
              <button className="shop-card-buy" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)` }}>
                <i className="bi bi-lightning-charge-fill"></i>
                Order Pack
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
