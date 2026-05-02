import { useMemo, useState } from 'react';
import './App.css';
import TrustBadge from './components/TrustBadge';
import calculateTrustScore from './utils/calculateTrustScore';

const products = [
  {
    id: 1,
    name: 'Zenphone Pro',
    category: 'Phones',
    price: 899,
    avgPrice: 950,
    sellerRating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
    description: 'A premium everyday flagship with all-day battery and verified seller history.',
  },
  {
    id: 2,
    name: 'AirSound Pods',
    category: 'Audio',
    price: 149,
    avgPrice: 190,
    sellerRating: 2.8,
    reviews: 54,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80',
    description: 'Wireless earbuds with active noise reduction and a medium seller risk profile.',
  },
  {
    id: 3,
    name: 'FitTrack Watch',
    category: 'Wearables',
    price: 79,
    avgPrice: 180,
    sellerRating: 2.4,
    reviews: 11,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    description: 'A low-priced wearable with suspicious pricing and limited review history.',
  },
  {
    id: 4,
    name: 'NovaBook Air',
    category: 'Laptops',
    price: 1199,
    avgPrice: 1250,
    sellerRating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    description: 'A thin laptop from a highly rated seller with a strong TrustCart score.',
  },
  {
    id: 5,
    name: 'PixelBuds Lite',
    category: 'Audio',
    price: 39,
    avgPrice: 110,
    sellerRating: 3.7,
    reviews: 8,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
    description: 'Budget earbuds with low reviews and a price far below the usual market range.',
  },
  {
    id: 6,
    name: 'HomeCam Secure',
    category: 'Smart Home',
    price: 129,
    avgPrice: 150,
    sellerRating: 4.2,
    reviews: 33,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80',
    description: 'A compact home camera with stable seller signals and enough buyer feedback.',
  },
];

const filters = ['All', 'Safe', 'Medium', 'Risky'];

const engineCards = [
  {
    number: '01',
    label: 'ANALYZE',
    title: 'Fake Product Signals',
    description: 'TrustCart scans suspicious pricing, seller rating drops, and low-review listings.',
    tag: 'SCAN: ACTIVE',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
  },
  {
    number: '02',
    label: 'SCORE',
    title: 'Trust Score Engine',
    description: 'Every product receives a simple safety score before the buyer reaches checkout.',
    tag: 'MODEL: TRUST',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80',
  },
  {
    number: '03',
    label: 'WARN',
    title: 'Buyer Risk Alerts',
    description: 'Safe, medium, and risky product states help shoppers decide what to do next.',
    tag: 'ALERTS: LIVE',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80',
  },
];

function getTrustLabel(score) {
  if (score >= 80) {
    return 'Safe';
  }

  if (score >= 50) {
    return 'Medium';
  }

  return 'Risky';
}

function getTrustMessage(score) {
  if (score >= 80) {
    return 'Recommended to buy';
  }

  if (score >= 50) {
    return 'Review seller details';
  }

  return 'Suspicious product detected';
}

function Header({ cartCount }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home">TrustCart</a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#engine">Engine</a>
        <a href="#products">Products</a>
        <a href="#details">Trust Review</a>
      </nav>
      <a className="cart-link" href="#products">Cart ({cartCount})</a>
    </header>
  );
}

function Hero({ featuredProduct, onAddToCart }) {
  const trustScore = calculateTrustScore(featuredProduct);

  return (
    <section className="hero-section" id="home">
      <div className="hero-copy">
        <p className="mono-label">Verified ecommerce intelligence</p>
        <h1>Shop smarter. Avoid risky products.</h1>
        <p>
          TrustCart blends a premium storefront with real-time product risk scoring, so every
          purchase feels clearer before checkout.
        </p>
        <div className="hero-actions">
          <a className="primary-link" href="#products">Explore Products</a>
          <a className="secondary-link" href="#engine">View Trust Engine</a>
        </div>
      </div>

      <article className="hero-product">
        <TrustBadge trustScore={trustScore} />
        <div className="hero-product-image" style={{ backgroundImage: `url('${featuredProduct.image}')` }} />
        <div className="hero-product-content">
          <p className="mono-label">Featured verified pick</p>
          <h2>{featuredProduct.name}</h2>
          <p>{featuredProduct.description}</p>
          <div className="hero-price-row">
            <strong>${featuredProduct.price}</strong>
            <button className="primary-button" onClick={() => onAddToCart(featuredProduct)} type="button">
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

function TrustEngineSection() {
  return (
    <section className="engine-section" id="engine" aria-label="TrustCart AI trust engine">
      <div className="engine-header">
        <div>
          <span>02 // ENGINE</span>
          <h2>AI-Driven Trust Infrastructure</h2>
        </div>
        <div className="engine-status">
          STATUS: ONLINE
          <br />
          SYS.VER: 1.0.0
        </div>
      </div>

      <div className="engine-grid">
        {engineCards.map((card) => (
          <article className="engine-card" key={card.label}>
            <div className="engine-card-label">
              <span>{card.number}</span> {card.label}
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className="engine-image" style={{ backgroundImage: `url('${card.image}')` }}>
              <span>{card.tag}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

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

function App() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [cartCount, setCartCount] = useState(0);

  const productsToShow = useMemo(() => {
    const scoredProducts = products.map((product) => {
      const trustScore = calculateTrustScore(product);

      return {
        ...product,
        trustScore,
        trustLabel: getTrustLabel(trustScore),
      };
    });

    const filteredProducts = scoredProducts.filter((product) => {
      if (selectedFilter === 'All') {
        return true;
      }

      return product.trustLabel === selectedFilter;
    });

    return [...filteredProducts].sort((firstProduct, secondProduct) => {
      if (sortBy === 'price') {
        return firstProduct.price - secondProduct.price;
      }

      if (sortBy === 'trust') {
        return secondProduct.trustScore - firstProduct.trustScore;
      }

      return firstProduct.id - secondProduct.id;
    });
  }, [selectedFilter, sortBy]);

  function addToCart() {
    setCartCount((count) => count + 1);
  }

  function selectProduct(product) {
    setSelectedProduct(product);
  }

  return (
    <main className="App">
      <Header cartCount={cartCount} />
      <Hero featuredProduct={products[0]} onAddToCart={addToCart} />
      <TrustEngineSection />
      <ProductCatalog
        onAddToCart={addToCart}
        onSelect={selectProduct}
        productsToShow={productsToShow}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
      <ProductDetail onAddToCart={addToCart} product={selectedProduct} />
    </main>
  );
}

export default App;
