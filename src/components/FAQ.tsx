import { useState } from 'react';

const faqs = [
  {
    q: 'Is my purchase completely secure through your shop?',
    a: 'Yes. Just add the desired quantity to the cart and enter your address at the checkout. Your personal data is automatically encrypted using PGP and deleted after the order is dispatched. Our team of professionals then packs the goods in clean-room conditions, and ensures smooth and secure processing.',
    icon: 'bi-shield-lock-fill',
  },
  {
    q: 'Can I really only pay with cryptocurrency?',
    a: 'Yes. We only accept payments in Bitcoin, Ripple, IOTA, and Ethereum. The payment procedure is not complicated. You just need to set up a suitable wallet. We do not offer Payback or other bonus systems.',
    icon: 'bi-currency-bitcoin',
  },
  {
    q: 'How can I receive my order anonymously?',
    a: 'Our shipping department operates around the clock to ensure fast and risk-free shipping. The delivery usually arrives within a few days. Your order can be sent to any valid postal address, PO box, or package station. Thanks to our highly complex and decentralized system, the transfer to the logistics service provider is already anonymous and cannot be traced back.',
    icon: 'bi-truck',
  },
  {
    q: 'Is your product safe?',
    a: 'Nobody has claimed that doing drugs was safe. However as long as you follow the guide in the Safety section there should not be any issues. Do not take MDMA if you are also under any prescriptions or doing any other drugs. It is also recommended not to take MDMA with any sort of alcohol.',
    icon: 'bi-heart-pulse-fill',
  },
  {
    q: 'What happens if my package is seized by customs?',
    a: 'In the unlikely event of a seizure, we offer a full reship guarantee. Simply contact us through our encrypted support channel with your order ID and we will resolve the situation discreetly and promptly. No questions asked.',
    icon: 'bi-arrow-repeat',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship worldwide. However, delivery times and risk levels vary by country. We recommend using a PO box or alternative address for maximum security. All packages are vacuum-sealed and stealth-shipped to avoid detection.',
    icon: 'bi-globe2',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="page-enter">
      <div style={{
        background: 'linear-gradient(135deg, var(--nav-bg) 0%, var(--card-bg) 100%)',
        borderBottom: '1px solid var(--border)', padding: '60px 80px 40px',
      }}>
        <div className="section-title">
          <i className="bi bi-question-circle-fill"></i> Got Questions?
        </div>
        <h1 className="section-heading" style={{ marginBottom: 0 }}>FAQ</h1>
      </div>

      <div className="section">
        <div className="faq-list">
          {faqs.map((item, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <i className={`bi ${item.icon}`} style={{ fontSize: 18, color: 'var(--accent2)', flexShrink: 0 }}></i>
                  {item.q}
                </span>
                <i className={`bi bi-chevron-down${open === i ? ' open' : ''}`}
                   style={{ transition: 'transform 0.4s', transform: open === i ? 'rotate(180deg)' : 'none', color: open === i ? 'var(--accent2)' : 'var(--text-muted)' }}></i>
              </button>
              <div className={`faq-answer${open === i ? ' open' : ''}`}>
                {item.a}
              </div>
            </div>
          ))}
        </div>

        {/* Support card */}
        <div style={{
          marginTop: 60, padding: '28px 32px',
          background: 'var(--card-bg)', border: '1px solid var(--border)',
          borderRadius: 18, maxWidth: 760, display: 'flex',
          alignItems: 'center', gap: 20, flexWrap: 'wrap',
        }}>
          <i className="bi bi-headset" style={{ fontSize: 32, color: 'var(--accent2)' }}></i>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Still have questions?</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Our support team is available 24/7 through encrypted channels.
            </div>
          </div>
          <button style={{
            padding: '10px 24px', borderRadius: 30,
            background: 'linear-gradient(135deg, #8f8f8f, #d4d4d4)',
            border: 'none', color: 'white', fontSize: 12,
            fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <i className="bi bi-chat-dots-fill"></i>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
