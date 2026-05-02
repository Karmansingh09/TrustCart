const STEPS = [
  {
    number: '01',
    icon: '🔍',
    title: 'Browse Products',
    description: 'Search and filter our catalog of verified products. Use categories, price range, and seller rating to narrow down your choices.',
  },
  {
    number: '02',
    icon: '🛡️',
    title: 'Check the Trust Score',
    description: 'Every product displays a real-time Trust Score (0–100) based on pricing signals, seller history, and review patterns.',
  },
  {
    number: '03',
    icon: '📊',
    title: 'Read the Breakdown',
    description: 'Hover the ? icon for a full score breakdown. See exactly how pricing, seller rating, and review count each contribute.',
  },
  {
    number: '04',
    icon: '🛒',
    title: 'Buy with Confidence',
    description: 'Add Safe or Medium products to your cart knowing TrustCart has already screened them for common fraud signals.',
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works-section" aria-label="How TrustCart works">
      <div className="section-heading">
        <p className="mono-label">Simple process</p>
        <h2>How It Works</h2>
        <p>Four steps to smarter, safer shopping with TrustCart.</p>
      </div>

      <div className="steps-grid">
        {STEPS.map((step, index) => (
          <div className="step-card" key={step.number}>
            <div className="step-connector" aria-hidden="true">
              {index < STEPS.length - 1 && <div className="step-line" />}
            </div>
            <div className="step-icon-wrap">
              <span className="step-icon" aria-hidden="true">{step.icon}</span>
              <span className="step-number mono-label">{step.number}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
