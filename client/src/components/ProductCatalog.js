import ProductCard from './ProductCard';

const filters = ['All', 'Safe', 'Medium', 'Risky'];

function ProductCatalog({ selectedFilter, setSelectedFilter, sortBy, setSortBy, productsToShow, onSelect, onAddToCart }) {
  return (
    <section className="catalog-section" id="products">
      <div className="section-heading">
        <p className="mono-label">Shop verified products</p>
        <h2>Product catalog</h2>
        <p>Filter by trust level, sort by price or score, and inspect each product before buying.</p>
      </div>

      <div className="catalog-toolbar">
        <div className="filter-group" aria-label="Filter products">
          {filters.map((filter) => (
            <button
              className={selectedFilter === filter ? 'filter-button active' : 'filter-button'}
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        <label className="sort-control">
          Sort
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price">Price: Low to High</option>
            <option value="trust">Trust Score: High to Low</option>
          </select>
        </label>
      </div>

      <div className="products-grid" aria-label="Product results">
        {productsToShow.map((product) => (
          <ProductCard
            key={product.id}
            onAddToCart={onAddToCart}
            onSelect={onSelect}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductCatalog;
