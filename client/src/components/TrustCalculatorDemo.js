import { useState, useMemo } from 'react';
import calculateTrustScore from '../utils/calculateTrustScore';

function getTrustLabel(score) {
  if (score >= 80) return 'Safe';
  if (score >= 50) return 'Medium';
  return 'Risky';
}

function getTrustColor(score) {
  if (score >= 80) return '#4ade80';
  if (score >= 50) return '#f59e0b';
  return '#f87171';
}

function TrustCalculatorDemo() {
  const [sellerRating, setSellerRating] = useState(3.5);
  const [reviews, setReviews] = useState(40);
  const [priceRatio, setPriceRatio] = useState(90);

  const score = useMemo(() => {
    const price = 100;
    const avgPrice = Math.round(100 / (priceRatio / 100));
    const product = { price, avgPrice, sellerRating, reviews };

    return calculateTrustScore(product);
  }, [sellerRating, reviews, priceRatio]);

  const label = getTrustLabel(score);
  const color = getTrustColor(score);

  return (
    <section className="calculator-section" aria-label="Interactive trust calculator">
      <div className="section-heading">
        <p className="mono-label">Try it yourself</p>
        <h2>Trust Score Calculator</h2>
        <p>Adjust the sliders to see how different product signals affect the trust score in real time.</p>
      </div>

      <div className="calculator-grid">
        <div className="calculator-controls">
          <div className="calc-row">
            <label className="calc-label" htmlFor="calc-seller">
              Seller Rating: <strong>{sellerRating.toFixed(1)}/5</strong>
            </label>
            <input
              className="range-slider"
              id="calc-seller"
              max="5"
              min="0"
              onChange={(e) => setSellerRating(Number(e.target.value))}
              step="0.1"
              type="range"
              value={sellerRating}
            />
            <div className="calc-hint-row">
              <span className="calc-hint red">0 – Suspicious</span>
              <span className="calc-hint green">5 – Trusted</span>
            </div>
          </div>

          <div className="calc-row">
            <label className="calc-label" htmlFor="calc-reviews">
              Review Count: <strong>{reviews}</strong>
            </label>
            <input
              className="range-slider"
              id="calc-reviews"
              max="500"
              min="0"
              onChange={(e) => setReviews(Number(e.target.value))}
              step="1"
              type="range"
              value={reviews}
            />
            <div className="calc-hint-row">
              <span className="calc-hint red">0 – Unverified</span>
              <span className="calc-hint green">500+ – Established</span>
            </div>
          </div>

          <div className="calc-row">
            <label className="calc-label" htmlFor="calc-price">
              Price vs. Market Average: <strong>{priceRatio}%</strong>
            </label>
            <input
              className="range-slider"
              id="calc-price"
              max="150"
              min="10"
              onChange={(e) => setPriceRatio(Number(e.target.value))}
              step="1"
              type="range"
              value={priceRatio}
            />
            <div className="calc-hint-row">
              <span className="calc-hint red">10% – Too cheap</span>
              <span className="calc-hint green">100%+ – Market rate</span>
            </div>
          </div>
        </div>

        <div className="calculator-result">
          <p className="calc-result-label">Predicted Score</p>
          <div className="calc-score-circle" style={{ borderColor: color, boxShadow: `0 0 40px ${color}44` }}>
            <span className="calc-score-number" style={{ color }}>{score}</span>
            <span className="calc-score-max">/100</span>
          </div>
          <div className="calc-label-badge" style={{ background: `${color}22`, borderColor: `${color}66`, color }}>
            {label}
          </div>
          <p className="calc-explain">
            {label === 'Safe' && '✅ Strong signals. This product would be recommended.'}
            {label === 'Medium' && '⚠️ Some flags raised. Review before buying.'}
            {label === 'Risky' && '🚫 Multiple risk signals detected. Consider skipping.'}
          </p>
        </div>
      </div>
    </section>
  );
}

export default TrustCalculatorDemo;
