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
const steps = [
  'Homepage',
  'Search / Explore',
  'Product Listing',
  'Product Detail',
  'Trust Score',
  'Decision',
  'Checkout',
  'Order Placed',
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

function StepProgress({ currentStep }) {
  return (
    <div className="step-progress" aria-label="Shopping flow progress">
      {steps.map((step, index) => (
        <span className={index <= currentStep ? 'step-pill active' : 'step-pill'} key={step}>
          {index + 1}. {step}
        </span>
      ))}
    </div>
  );
}

function ProductCard({ product, onSelect }) {
  const trustScore = calculateTrustScore(product);
  const trustLabel = getTrustLabel(trustScore);

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

        {trustLabel === 'Risky' && <p className="warning-text">⚠️ Suspicious product detected</p>}

        <button className="primary-button" onClick={() => onSelect(product)} type="button">
          Select Product
        </button>
      </div>
    </article>
  );
}

function HomePage({ onStart }) {
  return (
    <section className="hero-page">
      <div className="hero-copy">
        <p className="page-kicker">TrustCart marketplace</p>
        <h1>Shop with Confidence</h1>
        <p>We detect risky products before you buy, then guide you through each purchase step.</p>
        <button className="primary-button hero-button" onClick={onStart} type="button">
          Start Shopping
        </button>
      </div>

      <div className="hero-panel" aria-hidden="true">
        <div className="score-orbit">
          <span>Safe</span>
          <strong>100</strong>
        </div>
      </div>
    </section>
  );
}

function SearchExplorePage({ onContinue }) {
  return (
    <section className="flow-card narrow">
      <p className="page-kicker">Search / Explore Products</p>
      <h1>What are you looking for?</h1>
      <p>Search by product, seller, or category. For now, continue to explore dummy products.</p>

      <form className="search-box" onSubmit={(event) => event.preventDefault()}>
        <input type="search" placeholder="Search phones, earbuds, watches..." />
        <button className="primary-button" onClick={onContinue} type="button">
          Explore Products
        </button>
      </form>
    </section>
  );
}

function ProductListingPage({ onSelectProduct }) {
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
    <section className="listing-page">
      <header className="page-header">
        <div>
          <p className="page-kicker">Product Listing Page</p>
          <h1>Select a product</h1>
          <p>Filter and sort products, then select one to view its detail page.</p>
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
          <ProductCard product={product} key={product.id} onSelect={onSelectProduct} />
        ))}
      </section>
    </section>
  );
}

function ProductDetailPage({ product, onCalculate }) {
  return (
    <section className="flow-card product-detail-card">
      <p className="page-kicker">Product Detail Page</p>
      <h1>{product.name}</h1>
      <p>Review the product signals before TrustCart calculates its safety score.</p>

      <div className="detail-grid">
        <div>
          <span>Product Price</span>
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

      <button className="primary-button" onClick={onCalculate} type="button">
        Calculate Trust Score
      </button>
    </section>
  );
}

function TrustScorePage({ product, onContinue }) {
  const trustScore = calculateTrustScore(product);
  const trustLabel = getTrustLabel(trustScore);

  return (
    <section className="flow-card product-detail-card">
      <p className="page-kicker">Trust Score Calculation</p>
      <h1>{trustLabel} product signal</h1>

      <div className="score-result">
        <TrustBadge trustScore={trustScore} />
        <strong>{trustScore}/100</strong>
        <span>{product.name}</span>
      </div>

      <div className="detail-grid">
        <div>
          <span>Price vs Average</span>
          <strong>{product.price < product.avgPrice * 0.7 ? 'Risk found' : 'Looks normal'}</strong>
        </div>
        <div>
          <span>Seller Rating</span>
          <strong>{product.sellerRating < 3 ? 'Low rating' : 'Good rating'}</strong>
        </div>
        <div>
          <span>Review Count</span>
          <strong>{product.reviews < 20 ? 'Low reviews' : 'Enough reviews'}</strong>
        </div>
      </div>

      <button className="primary-button" onClick={onContinue} type="button">
        Continue to Decision
      </button>
    </section>
  );
}

function DecisionPage({ product, onCheckout, onSkip }) {
  const trustScore = calculateTrustScore(product);
  const trustLabel = getTrustLabel(trustScore);

  if (trustLabel === 'Safe') {
    return (
      <section className="flow-card narrow">
        <p className="page-kicker">Is Product Safe?</p>
        <h1>Yes, this product looks safe.</h1>
        <p>TrustCart recommends adding this product to cart.</p>
        <button className="primary-button" onClick={onCheckout} type="button">
          Add to Cart
        </button>
      </section>
    );
  }

  if (trustLabel === 'Medium') {
    return (
      <section className="flow-card narrow">
        <p className="page-kicker">Is Product Safe?</p>
        <h1>Medium risk detected.</h1>
        <p>TrustCart shows a warning, but you can still choose to continue.</p>
        <p className="medium-warning">Review seller details carefully before checkout.</p>
        <button className="primary-button" onClick={onCheckout} type="button">
          Show Warning + Allow Buy
        </button>
      </section>
    );
  }

  return (
    <section className="flow-card narrow">
      <p className="page-kicker">Is Product Safe?</p>
      <h1>Strong warning shown.</h1>
      <p className="warning-text">⚠️ Suspicious product detected</p>
      <p>This product has multiple risk signals. You can skip it or buy anyway.</p>

      <div className="button-row">
        <button className="secondary-button" onClick={onSkip} type="button">
          Skip Product
        </button>
        <button className="primary-button" onClick={onCheckout} type="button">
          Buy Anyway
        </button>
      </div>
    </section>
  );
}

function CheckoutPage({ product, onOrderPlaced }) {
  return (
    <section className="flow-card narrow">
      <p className="page-kicker">Checkout</p>
      <h1>Ready to place order?</h1>
      <p>{product.name} has been added to your cart.</p>
      <button className="primary-button" onClick={onOrderPlaced} type="button">
        Place Order
      </button>
    </section>
  );
}

function OrderPlacedPage({ onRestart }) {
  return (
    <section className="flow-card narrow">
      <p className="page-kicker">Order Placed</p>
      <h1>Your TrustCart order is placed.</h1>
      <p>The step-by-step product safety flow is complete.</p>
      <button className="primary-button" onClick={onRestart} type="button">
        Back to Homepage
      </button>
    </section>
  );
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  function selectProduct(product) {
    setSelectedProduct(product);
    setCurrentStep(3);
  }

  function restartFlow() {
    setSelectedProduct(products[0]);
    setCurrentStep(0);
  }

  return (
    <main className="App">
      <StepProgress currentStep={currentStep} />

      {currentStep === 0 && <HomePage onStart={() => setCurrentStep(1)} />}
      {currentStep === 1 && <SearchExplorePage onContinue={() => setCurrentStep(2)} />}
      {currentStep === 2 && <ProductListingPage onSelectProduct={selectProduct} />}
      {currentStep === 3 && (
        <ProductDetailPage product={selectedProduct} onCalculate={() => setCurrentStep(4)} />
      )}
      {currentStep === 4 && (
        <TrustScorePage product={selectedProduct} onContinue={() => setCurrentStep(5)} />
      )}
      {currentStep === 5 && (
        <DecisionPage
          product={selectedProduct}
          onCheckout={() => setCurrentStep(6)}
          onSkip={() => setCurrentStep(2)}
        />
      )}
      {currentStep === 6 && (
        <CheckoutPage product={selectedProduct} onOrderPlaced={() => setCurrentStep(7)} />
      )}
      {currentStep === 7 && <OrderPlacedPage onRestart={restartFlow} />}
    </main>
  );
}

export default App;
