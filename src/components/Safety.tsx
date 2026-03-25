export default function Safety() {
  return (
    <div className="page-enter">
      <div style={{
        background: 'linear-gradient(135deg, var(--nav-bg) 0%, var(--card-bg) 100%)',
        borderBottom: '1px solid var(--border)', padding: '60px 80px 40px',
      }}>
        <div className="section-title">
          <i className="bi bi-shield-fill-check"></i> Your Wellbeing Matters
        </div>
        <h1 className="section-heading" style={{ marginBottom: 8 }}>Safety Guide</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, maxWidth: 500, lineHeight: 1.7 }}>
          <i className="bi bi-info-circle-fill" style={{ color: 'var(--accent2)', marginRight: 6 }}></i>
          Harm reduction is at the core of everything we do. Stay safe, stay informed.
        </p>
      </div>

      <div className="section">
        <div className="safety-content">

          <div className="safety-section">
            <div className="safety-section-title">
              <i className="bi bi-droplet-half"></i> What is MDMA?
            </div>
            <div className="safety-section-body">
              MDMA (3,4-methylenedioxymethamphetamine) is a synthetic drug that alters mood and perception.
              It is chemically similar to both stimulants and hallucinogens, producing feelings of increased energy,
              pleasure, emotional warmth, and distorted sensory and time perception.
            </div>
          </div>

          <div className="safety-section">
            <div className="safety-section-title">
              <i className="bi bi-clipboard2-check-fill"></i> Before You Take
            </div>
            <div className="safety-section-body">
              <p style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--green)', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>Test your substance.</strong> Always use a reagent test kit (Marquis, Mecke, Simon's) before consuming anything.</span>
              </p>
              <p style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--green)', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>Know your dose.</strong> A standard recreational dose is 75–125mg. Start low, especially if you're new.</span>
              </p>
              <p style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-check-circle-fill" style={{ color: 'var(--green)', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>Check for interactions.</strong> MDMA is dangerous with MAOIs, SSRIs, lithium, tramadol, and many other medications.</span>
              </p>
              <p style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-x-circle-fill" style={{ color: '#e74c3c', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>Don't mix.</strong> Avoid alcohol, cocaine, ketamine, or any other substances.</span>
              </p>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-heart-pulse-fill" style={{ color: '#e74c3c', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>Know your health.</strong> Avoid if you have heart conditions, high blood pressure, epilepsy, or liver/kidney problems.</span>
              </p>
            </div>
          </div>

          <div className="safety-section">
            <div className="safety-section-title">
              <i className="bi bi-lightning-charge-fill"></i> During
            </div>
            <div className="safety-section-body">
              <p style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-droplet-fill" style={{ color: 'var(--accent2)', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>Stay hydrated, but don't over-drink.</strong> Sip water slowly — about 500ml per hour if dancing, less if resting.</span>
              </p>
              <p style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-thermometer-half" style={{ color: 'var(--accent2)', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>Keep cool.</strong> MDMA raises body temperature. Take regular breaks if dancing.</span>
              </p>
              <p style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-people-fill" style={{ color: 'var(--accent2)', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>Have a sober friend.</strong> Never use alone. Make sure someone you trust knows what you took.</span>
              </p>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-clock-fill" style={{ color: 'var(--accent2)', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>Redosing.</strong> If you redose, use half your initial dose within 90 minutes. Avoid redosing more than once.</span>
              </p>
            </div>
          </div>

          <div className="safety-section">
            <div className="safety-section-title">
              <i className="bi bi-moon-stars-fill"></i> After
            </div>
            <div className="safety-section-body">
              <p style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-brightness-alt-high-fill" style={{ color: '#f59e0b', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>Rest.</strong> Sleep is crucial for recovery. Don't fight the comedown.</span>
              </p>
              <p style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-egg-fill" style={{ color: '#f59e0b', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>Nutrition.</strong> Eat light, nutritious meals. Vitamin C and antioxidants may help with recovery.</span>
              </p>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="bi bi-calendar3" style={{ color: '#f59e0b', flexShrink: 0, marginTop: 3 }}></i>
                <span><strong>3 month rule.</strong> Allow at least 3 months between uses to reduce neurotoxicity and dependence.</span>
              </p>
            </div>
          </div>

          <div className="safety-section" style={{ borderColor: 'rgba(255,80,80,0.2)' }}>
            <div className="safety-section-title" style={{ color: '#e74c3c' }}>
              <i className="bi bi-exclamation-triangle-fill"></i> Emergency Signs
            </div>
            <div className="safety-section-body">
              Seek immediate help if you or someone else experiences:
              high body temperature, confusion, seizures, loss of consciousness, severe headache, or chest pain.
            </div>
            <div className="safety-warning">
              <i className="bi bi-exclamation-octagon-fill"></i>
              <span>
                <strong>Disclaimer:</strong> This information is provided for harm reduction purposes only.
                MyDrugs 2.0 is a fictional fan-made recreation of the Netflix series "How To Sell Drugs Online (Fast)".
                We do not condone, encourage, or facilitate the use of illegal substances.
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
