import TrustBadge from './TrustBadge';
import calculateTrustScore from '../utils/calculateTrustScore';
import { getTrustLabel } from '../utils/trustHelpers';

function ProductCard({ product, onSelect, onAddToCart }) {
  const trustScore = calculateTrustScore(product);
  const trustLabel = getTrustLabel(trustScore);

  return (
    <article className="product-card">
      <TrustBadge trustScore={trustScore} />
      <button className="product-image-button" onClick={() => onSelect(product)} type="button">
        <span className="sr-only">View {product.name}</span>
        <span className="product-image" style={{ backgroundImage: `url('${product.image}')` }} />
      </button>

      <div className="product-content">
        <p className="mono-label">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-meta">
          <div>
            <span>Price</span>
            <strong>${product.price}</strong>
          </div>
          <div>
            <span>Trust</span>
            <strong>{trustScore}/100</strong>
          </div>
        </div>

        {trustLabel === 'Risky' && <p className="warning-text">⚠️ Suspicious product detected</p>}

        <div className="card-actions">
          <button className="secondary-button" onClick={() => onSelect(product)} type="button">
            Details
          </button>
          <button className="primary-button" onClick={() => onAddToCart(product)} type="button">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
