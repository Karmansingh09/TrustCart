import TrustBadge from './TrustBadge';
import calculateTrustScore from '../utils/calculateTrustScore';

function Hero({ featuredProduct, onAddToCart }) {
  const trustScore = calculateTrustScore(featuredProduct);

  return (
    <section className="hero-section" id="home">
      <div className="hero-copy">
        <p className="mono-label">Verified ecommerce intelligence</p>
        <h1>Shop smarter. Avoid risky products.</h1>
        <p>
          TrustCart blends a premium storefront with real-time product risk scoring, so every
          purchase feels clearer before checkout.
        </p>
        <div className="hero-actions">
          <a className="primary-link" href="#products">Explore Products</a>
          <a className="secondary-link" href="#engine">View Trust Engine</a>
        </div>
      </div>

      <article className="hero-product">
        <TrustBadge trustScore={trustScore} />
        <div className="hero-product-image" style={{ backgroundImage: `url('${featuredProduct.image}')` }} />
        <div className="hero-product-content">
          <p className="mono-label">Featured verified pick</p>
          <h2>{featuredProduct.name}</h2>
          <p>{featuredProduct.description}</p>
          <div className="hero-price-row">
            <strong>${featuredProduct.price}</strong>
            <button className="primary-button" onClick={() => onAddToCart(featuredProduct)} type="button">
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Hero;
