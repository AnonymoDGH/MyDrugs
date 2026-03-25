interface CartItem { id: number; name: string; qty: number; image: string; }

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, onClose, items, onRemove, onCheckout }: CartDrawerProps) {
  const total = items.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <div className={`cart-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer${open ? ' open' : ''}`}>
        <div className="cart-drawer-header">
          <span className="cart-drawer-title">
            <i className="bi bi-bag-fill"></i>
            Cart ({total})
          </span>
          <button className="cart-close-btn" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <i className="bi bi-bag-x" style={{ fontSize: 44, display: 'block', marginBottom: 14, color: 'var(--accent)' }}></i>
              <p style={{ fontWeight: 600 }}>Your cart is empty</p>
              <p style={{ fontSize: 12, marginTop: 6, color: 'var(--text-muted)' }}>Start adding some products!</p>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-qty">
                    <i className="bi bi-x-lg" style={{ fontSize: 9, marginRight: 2 }}></i>
                    {item.qty}
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  style={{
                    background: 'transparent', border: '1px solid var(--border)',
                    color: 'rgba(255,255,255,0.4)', fontSize: 14, cursor: 'pointer',
                    transition: 'all 0.3s', width: 32, height: 32, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#e74c3c'; e.currentTarget.style.borderColor = '#e74c3c'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          {items.length > 0 && (
            <button className="cart-checkout-btn" onClick={onCheckout}>
              <i className="bi bi-lock-fill"></i>
              Secure Checkout
            </button>
          )}
          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <i className="bi bi-currency-bitcoin" style={{ color: 'var(--accent2)' }}></i>
            BTC · ETH · XRP · IOTA
          </p>
        </div>
      </div>
    </>
  );
}
