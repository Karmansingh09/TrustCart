import { testimonials } from '../utils/mockData';

function StarRating({ rating }) {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section className="testimonials-section" aria-label="Customer testimonials">
      <div className="section-heading">
        <p className="mono-label">Trusted by shoppers</p>
        <h2>What Buyers Say</h2>
        <p>Real feedback from people who trust TrustCart before every purchase.</p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <article className="testimonial-card" key={t.id}>
            <StarRating rating={t.rating} />
            <blockquote className="testimonial-text">"{t.text}"</blockquote>
            <div className="testimonial-author">
              <img
                alt={`${t.name} avatar`}
                className="testimonial-avatar"
                height="40"
                loading="lazy"
                src={t.avatar}
                width="40"
              />
              <div>
                <strong>{t.name}</strong>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
