import { useEffect, useMemo, useState } from 'react';
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
    historyScore: 92,
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
    historyScore: 64,
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
    historyScore: 38,
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
    historyScore: 88,
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
    historyScore: 51,
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
    historyScore: 79,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80',
    description: 'A compact home camera with stable seller signals and enough buyer feedback.',
  },
  {
    id: 7,
    name: 'CreatorPad 11',
    category: 'Tablets',
    price: 529,
    avgPrice: 590,
    sellerRating: 4.5,
    reviews: 76,
    historyScore: 84,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
    description: 'A lightweight tablet with a verified seller and balanced market pricing.',
  },
  {
    id: 8,
    name: 'SoundBar Mini',
    category: 'Audio',
    price: 99,
    avgPrice: 240,
    sellerRating: 2.9,
    reviews: 17,
    historyScore: 36,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80',
    description: 'A compact speaker with pricing and review signals that need extra caution.',
  },
];

const trustFilters = ['All', 'Safe', 'Medium', 'Risky'];
const categoryOptions = [...new Set(products.map((product) => product.category))];

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

const howItWorks = [
  ['Search', 'Find products by name, category, seller signal, or keyword.'],
  ['Scan', 'TrustCart compares pricing, reviews, seller rating, and history.'],
  ['Score', 'Every product gets a simple Safe, Medium, or Risky trust badge.'],
  ['Compare', 'Select up to three products and review them side-by-side.'],
  ['Buy', 'Add trusted products to cart or save items to your wishlist.'],
];

const faqs = [
  ['How is the trust score calculated?', 'The demo score checks price vs average price, seller rating, review count, and product history.'],
  ['Can a medium product still be bought?', 'Yes. Medium means you should review the seller and product details before checkout.'],
  ['Why is a product marked risky?', 'Risky products usually have suspicious pricing, low seller rating, or too few reviews.'],
  ['Does TrustCart block purchases?', 'No. It provides warnings and context so the buyer can decide.'],
  ['Is wishlist saved?', 'Yes. Wishlist ids persist in local storage on this browser.'],
  ['Can I compare more than three products?', 'This demo limits comparison to three products to keep the table readable.'],
  ['Do filters stay after refresh?', 'Yes. Search, category, rating, price, trust filter, and sorting are stored in the URL.'],
  ['Does dark mode persist?', 'Yes. The selected theme is saved in local storage.'],
];

const testimonials = [
  ['Aarav M.', 'TrustCart made it obvious which listings needed a second look.'],
  ['Nia S.', 'The side-by-side comparison is exactly how ecommerce should work.'],
  ['Karman C.', 'The trust badges make the storefront feel safer and cleaner.'],
  ['Maya R.', 'I like that risky products are not hidden, just explained clearly.'],
  ['Dev P.', 'The filters and wishlist make this feel like a real shopping app.'],
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

function calculateTrustBreakdown(product) {
  const pricePenalty = product.price < product.avgPrice * 0.7 ? 30 : 0;
  const ratingPenalty = product.sellerRating < 3 ? 30 : 0;
  const reviewPenalty = product.reviews < 20 ? 20 : 0;
  const historyPenalty = product.historyScore < 50 ? 10 : 0;
  const score = Math.max(0, Math.min(100, 100 - pricePenalty - ratingPenalty - reviewPenalty - historyPenalty));

  return {
    score,
    parts: [
      ['Price anomaly', pricePenalty, pricePenalty ? 'Large price drop detected' : 'Price is near market average'],
      ['Seller rating', ratingPenalty, ratingPenalty ? 'Seller rating is below 3' : 'Seller rating looks stable'],
      ['Review count', reviewPenalty, reviewPenalty ? 'Low review count' : 'Enough reviews available'],
      ['Product history', historyPenalty, historyPenalty ? 'Weak product history' : 'Product history looks normal'],
    ],
  };
}

function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function Header({ cartCount, wishlistCount, theme, onThemeToggle, onViewWishlist }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home">TrustCart</a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#engine">Engine</a>
        <a href="#products">Products</a>
        <a href="#calculator">Calculator</a>
        <a href="#education">Learn</a>
      </nav>
      <div className="header-actions">
        <button aria-label="Toggle dark and light mode" className="icon-button" onClick={onThemeToggle} type="button">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <button className="cart-link" onClick={onViewWishlist} type="button">
          Wishlist ({wishlistCount})
        </button>
        <a className="cart-link" href="#products">Cart ({cartCount})</a>
      </div>
    </header>
  );
}

function Hero({ featuredProduct, onAddToCart, onWishlistToggle, isWishlisted }) {
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
        <button
          aria-label={isWishlisted ? 'Remove featured product from wishlist' : 'Add featured product to wishlist'}
          className={isWishlisted ? 'wishlist-button active' : 'wishlist-button'}
          onClick={() => onWishlistToggle(featuredProduct.id)}
          type="button"
        >
          ♥
        </button>
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
    <section className="engine-section reveal" id="engine" aria-label="TrustCart AI trust engine">
      <div className="engine-header">
        <div>
          <span>02 // ENGINE</span>
          <h2>AI-Driven Trust Infrastructure</h2>
        </div>
        <div className="engine-status">
          STATUS: ONLINE
          <br />
          SYS.VER: 2.0.0
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

function SearchFilters({
  activeFilter,
  categories,
  clearFilter,
  filterPanelOpen,
  priceMax,
  ratingMin,
  searchTerm,
  selectedCategories,
  setActiveFilter,
  setFilterPanelOpen,
  setPriceMax,
  setRatingMin,
  setSearchTerm,
  setSelectedCategories,
  setSortBy,
  sortBy,
}) {
  const activeBadges = [
    searchTerm && ['Search', searchTerm, () => setSearchTerm('')],
    activeFilter !== 'All' && ['Trust', activeFilter, () => setActiveFilter('All')],
    priceMax < 2000 && ['Price', `$0 - $${priceMax}`, () => setPriceMax(2000)],
    ratingMin > 0 && ['Rating', `${ratingMin}+`, () => setRatingMin(0)],
    ...selectedCategories.map((category) => [
      'Category',
      category,
      () => setSelectedCategories((items) => items.filter((item) => item !== category)),
    ]),
  ].filter(Boolean);

  return (
    <div className="filter-shell">
      <div className="search-row">
        <label className="search-control">
          <span>Search products</span>
          <input
            aria-label="Search products"
            list="product-suggestions"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search phones, audio, seller signals..."
            type="search"
            value={searchTerm}
          />
          <datalist id="product-suggestions">
            {products.map((product) => (
              <option key={product.id} value={product.name} />
            ))}
          </datalist>
        </label>
        <button className="secondary-button mobile-filter-button" onClick={() => setFilterPanelOpen(!filterPanelOpen)} type="button">
          {filterPanelOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className={filterPanelOpen ? 'catalog-toolbar open' : 'catalog-toolbar'}>
        <div className="filter-group" aria-label="Filter by trust score">
          {trustFilters.map((filter) => (
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

        <fieldset className="category-filter">
          <legend>Categories</legend>
          {categories.map((category) => (
            <label key={category}>
              <input
                checked={selectedCategories.includes(category)}
                onChange={() =>
                  setSelectedCategories((items) =>
                    items.includes(category)
                      ? items.filter((item) => item !== category)
                      : [...items, category]
                  )
                }
                type="checkbox"
              />
              {category}
            </label>
          ))}
        </fieldset>

        <label className="range-control">
          Price up to ${priceMax}
          <input
            aria-label="Maximum price"
            max="2000"
            min="0"
            onChange={(event) => setPriceMax(Number(event.target.value))}
            step="50"
            type="range"
            value={priceMax}
          />
        </label>

        <label className="sort-control">
          Seller rating
          <select aria-label="Seller rating filter" value={ratingMin} onChange={(event) => setRatingMin(Number(event.target.value))}>
            <option value="0">Any rating</option>
            <option value="3">3+ rating</option>
            <option value="4">4+ rating</option>
            <option value="4.5">4.5+ rating</option>
          </select>
        </label>

        <label className="sort-control">
          Sort
          <select aria-label="Sort products" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price">Price: Low to High</option>
            <option value="trust">Trust Score: High to Low</option>
          </select>
        </label>
      </div>

      <div className="active-filters" aria-label="Active filters">
        {activeBadges.map(([label, value, onClear]) => (
          <button className="filter-badge" key={`${label}-${value}`} onClick={onClear} type="button">
            {label}: {value} ×
          </button>
        ))}
        {activeBadges.length > 0 && (
          <button className="filter-badge clear" onClick={clearFilter} type="button">
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  compareSelected,
  onAddToCart,
  onCompareToggle,
  onSelect,
  onWishlistToggle,
  product,
  wishlisted,
}) {
  const trustScore = calculateTrustScore(product);
  const trustLabel = getTrustLabel(trustScore);

  return (
    <article className="product-card">
      <TrustBadge trustScore={trustScore} />
      <button
        aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        className={wishlisted ? 'wishlist-button active' : 'wishlist-button'}
        onClick={() => onWishlistToggle(product.id)}
        type="button"
      >
        ♥
      </button>
      <label className="compare-check">
        <input
          aria-label={`Compare ${product.name}`}
          checked={compareSelected}
          onChange={() => onCompareToggle(product.id)}
          type="checkbox"
        />
        Compare
      </label>

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

function SkeletonGrid() {
  return (
    <div className="products-grid" aria-label="Loading products">
      {[1, 2, 3].map((item) => (
        <div className="product-card skeleton-card" key={item}>
          <span />
          <strong />
          <p />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="empty-state">
      <h3>No products match those filters.</h3>
      <p>Try clearing filters or widening your price and rating settings.</p>
      <button className="primary-button" onClick={onClear} type="button">Clear Filters</button>
    </div>
  );
}

function ProductCatalog({
  compareIds,
  isLoading,
  onAddToCart,
  onClearFilters,
  onCompareToggle,
  onSelect,
  onWishlistToggle,
  productsToShow,
  wishlistIds,
  ...filterProps
}) {
  return (
    <section className="catalog-section reveal" id="products">
      <div className="section-heading">
        <p className="mono-label">Shop verified products</p>
        <h2>Product catalog</h2>
        <p>Filter by trust level, sort by price or score, and inspect each product before buying.</p>
      </div>

      <SearchFilters clearFilter={onClearFilters} {...filterProps} />

      {isLoading && <SkeletonGrid />}
      {!isLoading && productsToShow.length === 0 && <EmptyState onClear={onClearFilters} />}
      {!isLoading && productsToShow.length > 0 && (
        <div className="products-grid" aria-label="Product results">
          {productsToShow.map((product) => (
            <ProductCard
              compareSelected={compareIds.includes(product.id)}
              key={product.id}
              onAddToCart={onAddToCart}
              onCompareToggle={onCompareToggle}
              onSelect={onSelect}
              onWishlistToggle={onWishlistToggle}
              product={product}
              wishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ProductDetail({ product, onAddToCart, onWishlistToggle, wishlisted }) {
  const trustScore = calculateTrustScore(product);
  const trustLabel = getTrustLabel(trustScore);
  const breakdown = calculateTrustBreakdown(product);

  return (
    <section className="detail-section reveal" id="details" aria-label="Selected product trust review">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="#home">Home</a>
        <span>/</span>
        <a href="#products">Products</a>
        <span>/</span>
        <strong>{product.name}</strong>
      </nav>

      <div className="detail-layout">
        <div className="detail-media" style={{ backgroundImage: `url('${product.image}')` }}>
          <TrustBadge trustScore={trustScore} />
          <button
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className={wishlisted ? 'wishlist-button active' : 'wishlist-button'}
            onClick={() => onWishlistToggle(product.id)}
            type="button"
          >
            ♥
          </button>
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

          <div className="score-breakdown">
            {breakdown.parts.map(([label, penalty, note]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{penalty ? `-${penalty}` : 'OK'}</strong>
                <small>{note}</small>
              </div>
            ))}
          </div>

          <button className="primary-button detail-button" onClick={() => onAddToCart(product)} type="button">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

function WishlistPage({ onAddToCart, onRemove, onSelect, products }) {
  return (
    <section className="wishlist-section reveal" id="wishlist">
      <div className="section-heading">
        <p className="mono-label">Saved products</p>
        <h2>Wishlist</h2>
        <p>Saved products persist in local storage on this browser.</p>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <h3>Your wishlist is empty.</h3>
          <p>Use the heart icon on product cards to save products here.</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {products.map((product) => (
            <article className="wishlist-item" key={product.id}>
              <span>{product.name}</span>
              <strong>${product.price}</strong>
              <button className="secondary-button" onClick={() => onSelect(product)} type="button">Details</button>
              <button
                className="primary-button"
                onClick={() => {
                  onAddToCart(product);
                  onRemove(product.id);
                }}
                type="button"
              >
                Move to Cart
              </button>
              <button className="ghost-button" onClick={() => onRemove(product.id)} type="button">Remove</button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function ComparisonModal({ compareProducts, onAddToCart, onClose }) {
  if (compareProducts.length < 2) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Product comparison">
      <div className="compare-modal">
        <div className="modal-header">
          <div>
            <p className="mono-label">Product comparison</p>
            <h2>Compare selected products</h2>
          </div>
          <button className="icon-button" onClick={onClose} type="button">Close</button>
        </div>

        <div className="compare-table">
          <div className="compare-row heading" style={{ '--compare-columns': compareProducts.length }}>
            <span>Metric</span>
            {compareProducts.map((product) => (
              <strong key={product.id}>{product.name}</strong>
            ))}
          </div>
          {['Price', 'Average Price', 'Trust Score', 'Seller Rating', 'Review Count', 'Category'].map((metric) => (
            <div className="compare-row" key={metric} style={{ '--compare-columns': compareProducts.length }}>
              <span>{metric}</span>
              {compareProducts.map((product) => {
                const trustScore = calculateTrustScore(product);
                const values = {
                  Price: `$${product.price}`,
                  'Average Price': `$${product.avgPrice}`,
                  'Trust Score': `${trustScore} (${getTrustLabel(trustScore)})`,
                  'Seller Rating': `${product.sellerRating}/5`,
                  'Review Count': product.reviews,
                  Category: product.category,
                };

                return <strong key={product.id}>{values[metric]}</strong>;
              })}
            </div>
          ))}
        </div>

        <div className="compare-actions">
          {compareProducts.map((product) => (
            <button className="primary-button" key={product.id} onClick={() => onAddToCart(product)} type="button">
              Add {product.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustCalculator() {
  const [demo, setDemo] = useState({
    price: 700,
    avgPrice: 900,
    sellerRating: 4,
    reviews: 45,
    historyScore: 75,
  });
  const breakdown = calculateTrustBreakdown(demo);

  function updateDemo(field, value) {
    setDemo((current) => ({ ...current, [field]: Number(value) }));
  }

  return (
    <section className="calculator-section reveal" id="calculator">
      <div className="section-heading">
        <p className="mono-label">Interactive demo</p>
        <h2>Trust score calculator</h2>
        <p>Change product signals and watch the score update in real time.</p>
      </div>

      <div className="calculator-grid">
        <form className="calculator-form">
          {[
            ['Seller rating', 'sellerRating', 1, 5, 0.1],
            ['Reviews', 'reviews', 0, 200, 1],
            ['Price', 'price', 0, 2000, 10],
            ['Average price', 'avgPrice', 0, 2000, 10],
            ['History score', 'historyScore', 0, 100, 1],
          ].map(([label, field, min, max, step]) => (
            <label key={field}>
              {label}: {demo[field]}
              <input
                max={max}
                min={min}
                onChange={(event) => updateDemo(field, event.target.value)}
                step={step}
                type="range"
                value={demo[field]}
              />
            </label>
          ))}
        </form>

        <div className="score-gauge">
          <div className="gauge-circle" style={{ '--score': `${breakdown.score * 3.6}deg` }}>
            <strong>{breakdown.score}</strong>
            <span>{getTrustLabel(breakdown.score)}</span>
          </div>
          <div className="score-breakdown">
            {breakdown.parts.map(([label, penalty, note]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{penalty ? `-${penalty}` : 'OK'}</strong>
                <small>{note}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationSections() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="education-section reveal" id="education">
      <div className="section-heading">
        <p className="mono-label">Buyer education</p>
        <h2>How TrustCart protects shoppers</h2>
      </div>

      <div className="stats-grid">
        <div><strong>42K+</strong><span>Products scanned</span></div>
        <div><strong>3.8K</strong><span>Fake items flagged</span></div>
        <div><strong>96%</strong><span>Buyer clarity score</span></div>
        <div><strong>8ms</strong><span>Score calculation</span></div>
      </div>

      <div className="how-grid">
        {howItWorks.map(([title, description], index) => (
          <article key={title}>
            <span>{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <div className="faq-grid">
        {faqs.map(([question, answer], index) => (
          <article className={openFaq === index ? 'faq-item open' : 'faq-item'} key={question}>
            <button
              aria-controls={`faq-answer-${index}`}
              aria-expanded={openFaq === index}
              onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              type="button"
            >
              {question}
            </button>
            {openFaq === index && <p id={`faq-answer-${index}`}>{answer}</p>}
          </article>
        ))}
      </div>

      <div className="testimonial-grid">
        {testimonials.map(([name, quote]) => (
          <figure key={name}>
            <div className="avatar" aria-hidden="true">{name.charAt(0)}</div>
            <blockquote>{quote}</blockquote>
            <figcaption>{name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <a className="back-to-top" href="#home" aria-label="Back to top">
      ↑
    </a>
  );
}

function App() {
  const [theme, setTheme] = useStoredState('trustcart-theme', 'dark');
  const [wishlistIds, setWishlistIds] = useStoredState('trustcart-wishlist', []);
  const [cartCount, setCartCount] = useStoredState('trustcart-cart-count', 0);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceMax, setPriceMax] = useState(2000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ratingMin, setRatingMin] = useState(0);
  const [compareIds, setCompareIds] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchTerm(params.get('q') || '');
    setSelectedFilter(params.get('trust') || 'All');
    setSortBy(params.get('sort') || 'featured');
    setPriceMax(Number(params.get('max') || 2000));
    setRatingMin(Number(params.get('rating') || 0));
    setSelectedCategories(params.get('categories') ? params.get('categories').split(',') : []);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedFilter !== 'All') params.set('trust', selectedFilter);
    if (sortBy !== 'featured') params.set('sort', sortBy);
    if (priceMax !== 2000) params.set('max', String(priceMax));
    if (ratingMin) params.set('rating', String(ratingMin));
    if (selectedCategories.length) params.set('categories', selectedCategories.join(','));

    const query = params.toString();
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
  }, [priceMax, ratingMin, searchTerm, selectedCategories, selectedFilter, sortBy]);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, [priceMax, ratingMin, searchTerm, selectedCategories, selectedFilter, sortBy]);

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
      const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm.toLowerCase());
      const matchesTrust = selectedFilter === 'All' || product.trustLabel === selectedFilter;
      const matchesPrice = product.price <= priceMax;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesRating = product.sellerRating >= ratingMin;

      return matchesSearch && matchesTrust && matchesPrice && matchesCategory && matchesRating;
    });

    return [...filteredProducts].sort((firstProduct, secondProduct) => {
      if (sortBy === 'price') return firstProduct.price - secondProduct.price;
      if (sortBy === 'trust') return secondProduct.trustScore - firstProduct.trustScore;
      return firstProduct.id - secondProduct.id;
    });
  }, [priceMax, ratingMin, searchTerm, selectedCategories, selectedFilter, sortBy]);

  const wishlistProducts = products.filter((product) => wishlistIds.includes(product.id));
  const compareProducts = products.filter((product) => compareIds.includes(product.id));

  function addToCart() {
    setCartCount((count) => count + 1);
  }

  function toggleWishlist(productId) {
    setWishlistIds((ids) =>
      ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId]
    );
  }

  function toggleCompare(productId) {
    setCompareIds((ids) => {
      if (ids.includes(productId)) {
        return ids.filter((id) => id !== productId);
      }

      if (ids.length >= 3) {
        return ids;
      }

      return [...ids, productId];
    });
  }

  function clearFilters() {
    setSearchTerm('');
    setSelectedFilter('All');
    setSortBy('featured');
    setPriceMax(2000);
    setSelectedCategories([]);
    setRatingMin(0);
  }

  return (
    <main className="App">
      <Header
        cartCount={cartCount}
        onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onViewWishlist={() => setWishlistOpen(!wishlistOpen)}
        theme={theme}
        wishlistCount={wishlistIds.length}
      />
      <Hero
        featuredProduct={products[0]}
        isWishlisted={wishlistIds.includes(products[0].id)}
        onAddToCart={addToCart}
        onWishlistToggle={toggleWishlist}
      />
      <TrustEngineSection />
      {wishlistOpen && (
        <WishlistPage
          onAddToCart={addToCart}
          onRemove={toggleWishlist}
          onSelect={setSelectedProduct}
          products={wishlistProducts}
        />
      )}
      <ProductCatalog
        activeFilter={selectedFilter}
        categories={categoryOptions}
        compareIds={compareIds}
        filterPanelOpen={filterPanelOpen}
        isLoading={isLoading}
        onAddToCart={addToCart}
        onClearFilters={clearFilters}
        onCompareToggle={toggleCompare}
        onSelect={setSelectedProduct}
        onWishlistToggle={toggleWishlist}
        priceMax={priceMax}
        productsToShow={productsToShow}
        ratingMin={ratingMin}
        searchTerm={searchTerm}
        selectedCategories={selectedCategories}
        setActiveFilter={setSelectedFilter}
        setFilterPanelOpen={setFilterPanelOpen}
        setPriceMax={setPriceMax}
        setRatingMin={setRatingMin}
        setSearchTerm={setSearchTerm}
        setSelectedCategories={setSelectedCategories}
        setSortBy={setSortBy}
        sortBy={sortBy}
        wishlistIds={wishlistIds}
      />
      <div className="compare-bar">
        <span>{compareIds.length}/3 selected for comparison</span>
        <button
          className="primary-button"
          disabled={compareIds.length < 2}
          onClick={() => setCompareOpen(true)}
          type="button"
        >
          Compare Products
        </button>
        <button className="secondary-button" onClick={() => setCompareIds([])} type="button">
          Clear
        </button>
      </div>
      <ProductDetail
        onAddToCart={addToCart}
        onWishlistToggle={toggleWishlist}
        product={selectedProduct}
        wishlisted={wishlistIds.includes(selectedProduct.id)}
      />
      <TrustCalculator />
      <EducationSections />
      {compareOpen && (
        <ComparisonModal
          compareProducts={compareProducts}
          onAddToCart={addToCart}
          onClose={() => setCompareOpen(false)}
        />
      )}
      <BackToTop />
    </main>
  );
}

export default App;
