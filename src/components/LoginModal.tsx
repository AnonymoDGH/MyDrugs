interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  return (
    <div className={`modal-overlay${open ? ' open' : ''}`} onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <i className="bi bi-person-circle" style={{ fontSize: 40, color: 'var(--accent2)' }}></i>
        </div>

        <div className="modal-title" style={{ textAlign: 'center' }}>Welcome Back</div>
        <div className="modal-subtitle" style={{ textAlign: 'center' }}>
          Sign in to your encrypted account
        </div>

        <div style={{ position: 'relative', marginBottom: 14 }}>
          <i className="bi bi-person" style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)', fontSize: 16,
          }}></i>
          <input className="modal-input" type="text" placeholder="Username" style={{ paddingLeft: 42, marginBottom: 0 }} />
        </div>

        <div style={{ position: 'relative', marginBottom: 14 }}>
          <i className="bi bi-key" style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)', fontSize: 16,
          }}></i>
          <input className="modal-input" type="password" placeholder="Password" style={{ paddingLeft: 42, marginBottom: 0 }} />
        </div>

        <button className="modal-submit">
          <i className="bi bi-box-arrow-in-right"></i>
          Login
        </button>

        <p style={{
          textAlign: 'center', fontSize: 12, color: 'var(--text-muted)',
          marginTop: 22, lineHeight: 1.7,
        }}>
          Don't have an account?{' '}
          <span style={{ color: 'var(--accent2)', cursor: 'pointer', fontWeight: 600 }}>
            Register
          </span>
          <br />
          <span style={{ fontSize: 11, opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 6 }}>
            <i className="bi bi-shield-lock-fill" style={{ fontSize: 12 }}></i>
            All data is PGP encrypted
          </span>
        </p>
      </div>
    </div>
  );
}
