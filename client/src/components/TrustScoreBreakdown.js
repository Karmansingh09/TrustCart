import { useState } from 'react';
import calculateTrustScore from '../utils/calculateTrustScore';

function ScoreBar({ label, score, max = 100, color }) {
  const pct = Math.round((score / max) * 100);

  return (
    <div className="breakdown-row">
      <span className="breakdown-label">{label}</span>
      <div className="breakdown-bar-wrap">
        <div className="breakdown-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="breakdown-value">{score}/{max}</span>
    </div>
  );
}

function TrustScoreBreakdown({ product }) {
  const [visible, setVisible] = useState(false);

  const totalScore = calculateTrustScore(product);
  const averagePrice = product.avgPrice || product.averagePrice;
  const priceScore = product.price >= averagePrice * 0.7 ? 30 : 0;
  const sellerScore = product.sellerRating >= 3 ? 30 : 0;
  const reviewScore = product.reviews >= 20 ? 20 : 0;
  const baseScore = 20;

  return (
    <div
      className="trust-breakdown-wrap"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <button
        aria-label="Show trust score breakdown"
        aria-expanded={visible}
        className="breakdown-trigger"
        type="button"
      >
        <span className="breakdown-help-icon">?</span>
      </button>

      {visible && (
        <div className="breakdown-popup" role="tooltip">
          <p className="breakdown-title">Score Breakdown — {totalScore}/100</p>
          <ScoreBar color="#5e6ad2" label="Base" max={20} score={baseScore} />
          <ScoreBar color="#4ade80" label="Price Signal" max={30} score={priceScore} />
          <ScoreBar color="#f59e0b" label="Seller Rating" max={30} score={sellerScore} />
          <ScoreBar color="#38bdf8" label="Review Count" max={20} score={reviewScore} />
          <p className="breakdown-note">
            Seller: {product.sellerRating}/5 · Reviews: {product.reviews} · Price vs avg: {
              Math.round((product.price / averagePrice) * 100)
            }%
          </p>
        </div>
      )}
    </div>
  );
}

export default TrustScoreBreakdown;
