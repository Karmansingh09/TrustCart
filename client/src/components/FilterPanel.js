const CATEGORIES = ['All', 'Phones', 'Audio', 'Wearables', 'Laptops', 'Smart Home', 'Accessories'];

function FilterPanel({ priceRange, onPriceRange, category, onCategory, minSellerRating, onMinSellerRating, onReset }) {
  return (
    <div className="filter-panel" aria-label="Advanced filters">
      <div className="filter-panel-header">
        <span className="mono-label">Advanced Filters</span>
        <button className="filter-reset-btn" onClick={onReset} type="button">
          Reset
        </button>
      </div>

      <div className="filter-row">
        <label className="filter-label" htmlFor="fp-min-price">
          Price Range: <strong>${priceRange[0]} – ${priceRange[1]}</strong>
        </label>
        <div className="price-range-row">
          <input
            className="range-slider"
            id="fp-min-price"
            max={priceRange[1]}
            min="0"
            onChange={(e) => onPriceRange([Number(e.target.value), priceRange[1]])}
            step="10"
            type="range"
            value={priceRange[0]}
          />
          <input
            aria-label="Maximum price"
            className="range-slider"
            max="2000"
            min={priceRange[0]}
            onChange={(e) => onPriceRange([priceRange[0], Number(e.target.value)])}
            step="10"
            type="range"
            value={priceRange[1]}
          />
        </div>
      </div>

      <div className="filter-row">
        <label className="filter-label" htmlFor="fp-category">
          Category
        </label>
        <select
          className="filter-select"
          id="fp-category"
          onChange={(e) => onCategory(e.target.value)}
          value={category}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-row">
        <label className="filter-label" htmlFor="fp-rating">
          Min Seller Rating: <strong>{minSellerRating}+</strong>
        </label>
        <input
          className="range-slider"
          id="fp-rating"
          max="5"
          min="0"
          onChange={(e) => onMinSellerRating(Number(e.target.value))}
          step="0.5"
          type="range"
          value={minSellerRating}
        />
      </div>
    </div>
  );
}

export default FilterPanel;
