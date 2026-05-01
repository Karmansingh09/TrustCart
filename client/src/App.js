import { useState } from 'react';
import './App.css';
import TrustBadge from './components/TrustBadge';
import calculateTrustScore from './utils/calculateTrustScore';

const products = [
  {
    id: 1,
    name: 'Zenphone Pro',
    price: 899,
    avgPrice: 950,
    sellerRating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'AirSound Pods',
    price: 149,
    avgPrice: 190,
    sellerRating: 2.8,
    reviews: 54,
  },
  {
    id: 3,
    name: 'FitTrack Watch',
    price: 79,
    avgPrice: 180,
    sellerRating: 2.4,
    reviews: 11,
  },
  {
    id: 4,
    name: 'NovaBook Air',
    price: 1199,
    avgPrice: 1250,
    sellerRating: 4.7,
    reviews: 89,
  },
  {
    id: 5,
    name: 'PixelBuds Lite',
    price: 39,
    avgPrice: 110,
    sellerRating: 3.7,
    reviews: 8,
  },
  {
    id: 6,
    name: 'HomeCam Secure',
    price: 129,
    avgPrice: 150,
    sellerRating: 4.2,
    reviews: 33,
  },
];

const filters = ['All', 'Safe', 'Medium', 'Risky'];

function getTrustLabel(score) {
  if (score >= 80) {
    return 'Safe';
  }

  if (score >= 50) {
    return 'Medium';
  }

  return 'Risky';
}

function ProductCard({ product }) {
  const trustScore = calculateTrustScore(product);
  const trustLabel = getTrustLabel(trustScore);
  const isRisky = trustLabel === 'Risky';

  return (
    <article className="product-card">
      <TrustBadge trustScore={trustScore} />

      <div className="product-visual" aria-hidden="true">
        <span>{product.name.charAt(0)}</span>
      </div>

      <div className="product-content">
        <p className="product-eyebrow">TrustCart verified</p>
        <h2>{product.name}</h2>

        <div className="product-details">
          <div>
            <span>Price</span>
            <strong>${product.price}</strong>
          </div>
          <div>
            <span>Reviews</span>
            <strong>{product.reviews}</strong>
          </div>
        </div>

        {isRisky && <p className="warning-text">⚠️ Suspicious product detected</p>}

        <button className="add-button" type="button">
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('price');

  const productsWithScores = products.map((product) => {
    const trustScore = calculateTrustScore(product);

    return {
      ...product,
      trustScore,
      trustLabel: getTrustLabel(trustScore),
    };
  });

  const filteredProducts = productsWithScores.filter((product) => {
    if (activeFilter === 'All') {
      return true;
    }

    return product.trustLabel === activeFilter;
  });

  const sortedProducts = [...filteredProducts].sort((firstProduct, secondProduct) => {
    if (sortBy === 'trust') {
      return secondProduct.trustScore - firstProduct.trustScore;
    }

    return firstProduct.price - secondProduct.price;
  });

  return (
    <main className="App">
      <section className="listing-page">
        <header className="page-header">
          <div>
            <p className="page-kicker">TrustCart marketplace</p>
            <h1>TrustCart Product Listing</h1>
            <p>
              Browse products with dynamic trust scores before adding anything to your cart.
            </p>
          </div>
        </header>

        <section className="toolbar" aria-label="Product filters and sorting">
          <div className="filter-group" aria-label="Filter products">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? 'filter-button active' : 'filter-button'}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>

          <label className="sort-control">
            Sort products
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="price">Price: Low to High</option>
              <option value="trust">Trust Score: High to Low</option>
            </select>
          </label>
        </section>

        <section className="products-grid" aria-label="Product results">
          {sortedProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </section>
      </section>
    </main>
  );
}

export default App;
