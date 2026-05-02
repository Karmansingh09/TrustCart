import calculateTrustScore from '../utils/calculateTrustScore';

function Wishlist({ products, onClose, onAddToCart, onRemove }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Wishlist">
      <div className="wishlist-panel">
        <div className="wishlist-header">
          <h2>❤️ My Wishlist <span className="wishlist-count">({products.length})</span></h2>
          <button aria-label="Close wishlist" className="modal-close" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        {products.length === 0 ? (
          <div className="wishlist-empty">
            <p>💔 No saved products yet.</p>
            <p className="wishlist-empty-hint">Tap the ♡ on any product to save it here.</p>
          </div>
        ) : (
          <ul className="wishlist-list">
            {products.map((product) => {
              const score = calculateTrustScore(product);
              const scoreColor = score >= 80 ? '#4ade80' : score >= 50 ? '#f59e0b' : '#f87171';

              return (
                <li className="wishlist-item" key={product.id}>
                  <div
                    className="wishlist-thumb"
                    style={{ backgroundImage: `url('${product.image}')` }}
                    aria-hidden="true"
                  />
                  <div className="wishlist-info">
                    <strong>{product.name}</strong>
                    <span className="wishlist-price">${product.price}</span>
                    <span className="wishlist-score" style={{ color: scoreColor }}>
                      Trust: {score}/100
                    </span>
                  </div>
                  <div className="wishlist-actions">
                    <button
                      className="primary-button wishlist-cart-btn"
                      onClick={() => onAddToCart(product)}
                      type="button"
                    >
                      Add to Cart
                    </button>
                    <button
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="wishlist-remove-btn"
                      onClick={() => onRemove(product.id)}
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
