interface AgeGateProps {
  onAccept: () => void;
}

export default function AgeGate({ onAccept }: AgeGateProps) {
  return (
    <div className="age-gate-overlay">
      {/* Background particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            animation: `particleFloat ${8 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }} />
        ))}
      </div>

      <div className="age-gate-box">
        <div style={{ fontSize: 40, marginBottom: 16 }}>
          <i className="bi bi-shield-lock-fill" style={{ color: 'var(--accent2)' }}></i>
        </div>
        <div className="age-gate-logo">MYDRUGS</div>

        <div className="age-gate-question">
          <i className="bi bi-exclamation-triangle-fill" style={{ color: '#f59e0b', marginRight: 8, fontSize: 18 }}></i>
          Are you 18 or older?
        </div>
        <div className="age-gate-legal">
          This site contains a fictional recreation of the MyDrugs.to website
          from the Netflix series "How To Sell Drugs Online (Fast)".
          By entering you confirm you are of legal age.
        </div>
        <div className="age-gate-btns">
          <button className="age-gate-yes" onClick={onAccept}>
            <i className="bi bi-check-lg"></i>
            Yes, Enter
          </button>
          <button className="age-gate-no" onClick={() => window.location.href = 'https://www.google.com'}>
            <i className="bi bi-x-lg"></i>
            No, Leave
          </button>
        </div>
      </div>
    </div>
  );
}
