const engineCards = [
  {
    number: '01',
    label: 'ANALYZE',
    title: 'Fake Product Signals',
    description: 'TrustCart scans suspicious pricing, seller rating drops, and low-review listings.',
    tag: 'SCAN: ACTIVE',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
  },
  {
    number: '02',
    label: 'SCORE',
    title: 'Trust Score Engine',
    description: 'Every product receives a simple safety score before the buyer reaches checkout.',
    tag: 'MODEL: TRUST',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80',
  },
  {
    number: '03',
    label: 'WARN',
    title: 'Buyer Risk Alerts',
    description: 'Safe, medium, and risky product states help shoppers decide what to do next.',
    tag: 'ALERTS: LIVE',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80',
  },
];

function TrustEngineSection() {
  return (
    <section className="engine-section" id="engine" aria-label="TrustCart AI trust engine">
      <div className="engine-header">
        <div>
          <span>02 // ENGINE</span>
          <h2>AI-Driven Trust Infrastructure</h2>
        </div>
        <div className="engine-status">
          STATUS: ONLINE
          <br />
          SYS.VER: 1.0.0
        </div>
      </div>

      <div className="engine-grid">
        {engineCards.map((card) => (
          <article className="engine-card" key={card.label}>
            <div className="engine-card-label">
              <span>{card.number}</span> {card.label}
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className="engine-image" style={{ backgroundImage: `url('${card.image}')` }}>
              <span>{card.tag}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TrustEngineSection;
