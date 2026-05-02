import calculateTrustScore from '../utils/calculateTrustScore';

const FIELDS = [
  { key: 'price', label: 'Price', format: (v) => `$${v}` },
  { key: 'avgPrice', label: 'Avg Market Price', format: (v) => `$${v}` },
  { key: 'category', label: 'Category', format: (v) => v },
  { key: 'sellerRating', label: 'Seller Rating', format: (v) => `${v}/5` },
  { key: 'reviews', label: 'Review Count', format: (v) => v },
];

function TrustBar({ score }) {
  const color = score >= 80 ? '#4ade80' : score >= 50 ? '#f59e0b' : '#f87171';

  return (
    <div className="compare-trust-bar" aria-label={`Trust score ${score}`}>
      <div className="compare-trust-fill" style={{ width: `${score}%`, background: color }} />
      <span>{score}/100</span>
    </div>
  );
}

function ProductComparison({ products, onClose }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Product comparison">
      <div className="comparison-modal">
        <div className="comparison-header">
          <h2>Product Comparison</h2>
          <button aria-label="Close comparison" className="modal-close" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                {products.map((p) => (
                  <th key={p.id}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="trust-row">
                <td>Trust Score</td>
                {products.map((p) => {
                  const score = calculateTrustScore(p);

                  return (
                    <td key={p.id}>
                      <TrustBar score={score} />
                    </td>
                  );
                })}
              </tr>
              {FIELDS.map((field) => (
                <tr key={field.key}>
                  <td>{field.label}</td>
                  {products.map((p) => (
                    <td key={p.id}>{field.format(p[field.key])}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <td>Review Risk</td>
                {products.map((p) => (
                  <td key={p.id} className={`review-risk-${(p.fakeReviewRisk || 'Low').toLowerCase()}`}>
                    {p.fakeReviewRisk || 'Low'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductComparison;
