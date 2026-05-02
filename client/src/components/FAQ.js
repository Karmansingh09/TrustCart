import { useState } from 'react';
import { faqs } from '../utils/mockData';

function FAQ() {
  const [openId, setOpenId] = useState(null);

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="faq-section" aria-label="Frequently asked questions">
      <div className="section-heading">
        <p className="mono-label">Need answers?</p>
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know about how TrustCart scores and protects your purchases.</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div className={`faq-item${isOpen ? ' open' : ''}`} key={faq.id}>
              <button
                aria-controls={`faq-answer-${faq.id}`}
                aria-expanded={isOpen}
                className="faq-question"
                onClick={() => toggle(faq.id)}
                type="button"
              >
                <span>{faq.question}</span>
                <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              <div
                className="faq-answer"
                id={`faq-answer-${faq.id}`}
                role="region"
                hidden={!isOpen}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;
