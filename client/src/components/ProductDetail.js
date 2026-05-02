import TrustBadge from './TrustBadge';
import calculateTrustScore from '../utils/calculateTrustScore';
import { getTrustLabel, getTrustMessage } from '../utils/trustHelpers';

function ProductDetail({ product, onAddToCart }) {
  const trustScore = calculateTrustScore(product);
  const trustLabel = getTrustLabel(trustScore);

  return (
    <section className="detail-section" id="details" aria-label="Selected product trust review">
      <div className="detail-media" style={{ backgroundImage: `url('${product.image}')` }}>
        <TrustBadge trustScore={trustScore} />
      </div>

      <div className="detail-panel">
        <p className="mono-label">Trust review</p>
        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <div className="detail-grid">
          <div>
            <span>Price</span>
            <strong>${product.price}</strong>
          </div>
          <div>
            <span>Average Price</span>
            <strong>${product.avgPrice}</strong>
          </div>
          <div>
            <span>Seller Rating</span>
            <strong>{product.sellerRating}/5</strong>
          </div>
          <div>
            <span>Reviews</span>
            <strong>{product.reviews}</strong>
          </div>
        </div>

        <div className={`trust-summary ${trustLabel.toLowerCase()}`}>
          <strong>{getTrustMessage(trustScore)}</strong>
          <span>
            {trustLabel === 'Safe' && 'This product has strong seller and review signals.'}
            {trustLabel === 'Medium' && 'This product can be bought, but review the seller first.'}
            {trustLabel === 'Risky' && 'This product has multiple risk signals. Consider skipping it.'}
          </span>
        </div>

        <button className="primary-button detail-button" onClick={() => onAddToCart(product)} type="button">
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductDetail;
