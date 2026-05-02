import { useState } from 'react';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success | error

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');

      return;
    }

    setStatus('success');
    setEmail('');
  }

  return (
    <section className="newsletter-section" aria-label="Newsletter signup">
      <div className="newsletter-inner">
        <div className="newsletter-copy">
          <p className="mono-label">Stay protected</p>
          <h2>Get Fraud Alerts</h2>
          <p>Subscribe to receive alerts when suspicious products hit the marketplace, plus our weekly trust score digest.</p>
        </div>

        {status === 'success' ? (
          <div className="newsletter-success" role="status">
            <span className="newsletter-success-icon">✅</span>
            <strong>You're in!</strong>
            <p>We'll send you alerts when risky products are detected.</p>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
            <div className="newsletter-input-row">
              <input
                aria-label="Email address for newsletter"
                className={`newsletter-input${status === 'error' ? ' input-error' : ''}`}
                onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                placeholder="you@example.com"
                type="email"
                value={email}
              />
              <button className="primary-button newsletter-btn" type="submit">
                Subscribe
              </button>
            </div>
            {status === 'error' && (
              <p className="newsletter-error" role="alert">Please enter a valid email address.</p>
            )}
            <p className="newsletter-disclaimer">No spam, unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
}

export default NewsletterSignup;
