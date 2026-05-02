import { platformStats } from '../utils/mockData';

function ProductStats() {
  return (
    <section className="stats-section" aria-label="Platform statistics">
      <div className="stats-inner">
        {platformStats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-icon" aria-hidden="true">{stat.icon}</span>
            <strong className="stat-value">{stat.value}</strong>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductStats;
