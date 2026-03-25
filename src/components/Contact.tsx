const contributors = [
  {
    name: 'popbob',
    role: 'Lead Developer',
    initial: 'P',
    avatar: 'https://cdn.discordapp.com/avatars/858819825099079690/4a2671baedee962a0b9701add6669c0a.png?size=1024',
    links: [
      { label: 'GitHub', url: 'https://github.com/AnonymoDGH', icon: 'bi-github' },
      { label: 'Discord: P1bub', url: 'https://discord.com/users/858819825099079690', icon: 'bi-discord' },
    ],
  },
  {
    name: 'empy',
    role: 'Developer',
    initial: 'E',
    links: [
      { label: 'GitHub', url: '#', icon: 'bi-github' },
      { label: 'Discord', url: '#', icon: 'bi-discord' },
    ],
  },
  {
    name: 'empy',
    role: 'Developer',
    initial: 'E',
    links: [
      { label: 'GitHub', url: '#', icon: 'bi-github' },
      { label: 'Discord', url: '#', icon: 'bi-discord' },
    ],
  },
  {
    name: 'empy',
    role: 'Designer',
    initial: 'E',
    links: [
      { label: 'GitHub', url: '#', icon: 'bi-github' },
      { label: 'Discord', url: '#', icon: 'bi-discord' },
    ],
  },
  {
    name: 'empy',
    role: 'Developer',
    initial: 'E',
    links: [
      { label: 'GitHub', url: '#', icon: 'bi-github' },
      { label: 'Discord', url: '#', icon: 'bi-discord' },
    ],
  },
];

export default function Contact() {
  return (
    <div className="page-enter">
      <div style={{
        background: 'linear-gradient(135deg, var(--nav-bg) 0%, var(--card-bg) 100%)',
        borderBottom: '1px solid var(--border)', padding: '60px 80px 40px',
      }}>
        <div className="section-title">
          <i className="bi bi-people-fill"></i> The Team
        </div>
        <h1 className="section-heading" style={{ marginBottom: 8 }}>Contact</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 500, lineHeight: 1.7 }}>
          MyDrugs 2.0 is a fan-made recreation of the fictional website from
          "How To Sell Drugs Online (Fast)" on Netflix. Made with{' '}
          <i className="bi bi-heart-fill" style={{ color: '#e74c3c', fontSize: 12 }}></i> by the community.
        </p>
      </div>

      <div className="section">
        <div className="contact-grid">
          {contributors.map((c, index) => (
            <div className="contact-card" key={`${c.name}-${index}`}>
              <div className="contact-avatar" style={{ overflow: 'hidden' }}>
                {c.avatar ? (
                  <img
                    src={c.avatar}
                    alt={c.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  c.initial
                )}
              </div>
              <div className="contact-name">{c.name}</div>
              <div className="contact-role">{c.role}</div>
              <div className="contact-links">
                {c.links.map(l => (
                  <a
                    key={l.label}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-btn"
                  >
                    <i className={`bi ${l.icon}`}></i>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: 60, padding: '28px 32px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 18, maxWidth: 700,
          display: 'flex', gap: 16, alignItems: 'flex-start',
        }}>
          <i className="bi bi-info-circle-fill" style={{ fontSize: 22, color: 'var(--accent2)', flexShrink: 0, marginTop: 2 }}></i>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: 10 }}>
              Disclaimer
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              This is a fan-made project and is not affiliated with or endorsed by Netflix, the creators of
              "How To Sell Drugs Online (Fast)", or any related entity. No real drugs are sold here.
              This site is for educational and entertainment purposes only. All content is purely fictional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
