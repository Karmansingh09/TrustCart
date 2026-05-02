import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import './styles/animations.css';
import TrustBadge from './components/TrustBadge';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ProductComparison from './components/ProductComparison';
import Wishlist from './components/Wishlist';
import TrustScoreBreakdown from './components/TrustScoreBreakdown';
import TrustCalculatorDemo from './components/TrustCalculatorDemo';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import HowItWorks from './components/HowItWorks';
import NewsletterSignup from './components/NewsletterSignup';
import ProductStats from './components/ProductStats';
import calculateTrustScore from './utils/calculateTrustScore';
import { extraProducts } from './utils/mockData';

const baseProducts = [
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
    fakeReviewRisk: 'Low',
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
    fakeReviewRisk: 'Medium',
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
    fakeReviewRisk: 'High',
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
    fakeReviewRisk: 'Low',
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
    fakeReviewRisk: 'High',
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
    fakeReviewRisk: 'Low',
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

function StarRating({ rating }) {
  return (
    <div className="star-rating" aria-label={`Seller rating ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? 'star filled' : 'star'} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewRiskBadge({ risk }) {
  if (!risk) return null;
  const cls = `review-risk-badge review-risk-${risk.toLowerCase()}`;

  return <span className={cls} aria-label={`Fake review risk: ${risk}`}>{risk} Risk</span>;
}

function Header({ cartCount, darkMode, onToggleDark, wishlistCount, onOpenWishlist }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home">TrustCart</a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#how-it-works">How It Works</a>
        <a href="#engine">Engine</a>
        <a href="#products">Products</a>
        <a href="#details">Trust Review</a>
        <a href="#calculator">Calculator</a>
      </nav>
      <div className="header-actions">
        <button
          aria-label={darkMode ? 'Switch to dark mode' : 'Switch to light mode'}
          className="icon-btn dark-toggle"
          onClick={onToggleDark}
          type="button"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
        <button
          aria-label={`Wishlist (${wishlistCount} items)`}
          className="icon-btn wishlist-toggle"
          onClick={onOpenWishlist}
          type="button"
        >
          ❤️{wishlistCount > 0 && <span className="header-badge">{wishlistCount}</span>}
        </button>
        <a className="cart-link" href="#products">Cart ({cartCount})</a>
      </div>
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
        <div className="hero-stats">
          <div className="hero-stat">
            <strong>2.4M+</strong>
            <span>Products scored</span>
          </div>
          <div className="hero-stat">
            <strong>187K+</strong>
            <span>Fakes caught</span>
          </div>
          <div className="hero-stat">
            <strong>890K+</strong>
            <span>Buyers protected</span>
          </div>
        </div>
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
          <StarRating rating={featuredProduct.sellerRating} />
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
              <div className="engine-card-viz" aria-hidden="true">
                <div className="viz-bar" />
                <div className="viz-bar" />
                <div className="viz-bar" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, onSelect, onAddToCart, isWishlisted, onToggleWishlist, isInCompare, onToggleCompare }) {
  const trustScore = calculateTrustScore(product);
  const trustLabel = getTrustLabel(trustScore);

  return (
    <article className="product-card">
      <TrustBadge trustScore={trustScore} />

      <div className="card-top-actions">
        <button
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
          className={`wishlist-btn${isWishlisted ? ' active' : ''}`}
          onClick={() => onToggleWishlist(product.id)}
          type="button"
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      <button className="product-image-button" onClick={() => onSelect(product)} type="button">
        <span className="sr-only">View {product.name}</span>
        <span className="product-image" style={{ backgroundImage: `url('${product.image}')` }} />
      </button>

      <div className="product-content">
        <p className="mono-label">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <StarRating rating={product.sellerRating} />

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

        {product.fakeReviewRisk && <ReviewRiskBadge risk={product.fakeReviewRisk} />}

        {trustLabel === 'Risky' && <p className="warning-text">⚠️ Suspicious product detected</p>}

        <div className="card-compare-row">
          <label className="compare-check-label">
            <input
              aria-label={`Compare ${product.name}`}
              checked={isInCompare}
              className="compare-checkbox"
              disabled={!isInCompare && onToggleCompare === null}
              onChange={() => onToggleCompare(product.id)}
              type="checkbox"
            />
            Compare
          </label>
          <TrustScoreBreakdown product={product} />
        </div>

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

function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-image" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-line short" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line medium" />
        <div className="skeleton skeleton-line short" />
      </div>
    </div>
  );
}

function ProductCatalog({
  selectedFilter, setSelectedFilter,
  sortBy, setSortBy,
  searchQuery, onSearchChange,
  priceRange, onPriceRange,
  categoryFilter, onCategoryFilter,
  minSellerRating, onMinSellerRating,
  onResetFilters,
  showFilters, onToggleFilters,
  productsToShow, allProductsCount,
  onSelect, onAddToCart,
  wishlist, onToggleWishlist,
  compareList, onToggleCompare,
  onCompareOpen, onLoadMore, hasMore,
  loading,
}) {
  const canCompare = compareList.length >= 2;

  return (
    <section className="catalog-section" id="products">
      <div className="section-heading">
        <p className="mono-label">Shop verified products</p>
        <h2>Product catalog</h2>
        <p>Filter by trust level, sort by price or score, and inspect each product before buying.</p>
      </div>

      <SearchBar onChange={onSearchChange} value={searchQuery} />

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

        <div className="toolbar-right">
          <button
            aria-expanded={showFilters}
            aria-label="Toggle advanced filters"
            className={`secondary-button${showFilters ? ' active' : ''}`}
            onClick={onToggleFilters}
            type="button"
          >
            ⚙️ Filters
          </button>

          {canCompare && (
            <button className="primary-button compare-open-btn" onClick={onCompareOpen} type="button">
              Compare ({compareList.length})
            </button>
          )}

          <label className="sort-control">
            Sort
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price">Price: Low to High</option>
              <option value="trust">Trust Score: High to Low</option>
            </select>
          </label>
        </div>
      </div>

      {showFilters && (
        <FilterPanel
          category={categoryFilter}
          minSellerRating={minSellerRating}
          onCategory={onCategoryFilter}
          onMinSellerRating={onMinSellerRating}
          onPriceRange={onPriceRange}
          onReset={onResetFilters}
          priceRange={priceRange}
        />
      )}

      {loading ? (
        <div className="products-grid" aria-label="Product results">
          {[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
        </div>
      ) : productsToShow.length === 0 ? (
        <div className="empty-state" role="status">
          <p className="empty-icon" aria-hidden="true">🔍</p>
          <strong>No products match your filters.</strong>
          <p>Try adjusting your search or filter criteria.</p>
          <button className="secondary-button" onClick={onResetFilters} type="button">Clear all filters</button>
        </div>
      ) : (
        <>
          <div className="products-grid" aria-label="Product results">
            {productsToShow.map((product) => (
              <ProductCard
                compareList={compareList}
                isInCompare={compareList.includes(product.id)}
                isWishlisted={wishlist.includes(product.id)}
                key={product.id}
                onAddToCart={onAddToCart}
                onSelect={onSelect}
                onToggleCompare={compareList.length < 3 || compareList.includes(product.id) ? onToggleCompare : null}
                onToggleWishlist={onToggleWishlist}
                product={product}
              />
            ))}
          </div>
          <div className="catalog-footer">
            <p className="catalog-count">
              Showing {productsToShow.length} of {allProductsCount} products
            </p>
            {hasMore && (
              <button className="secondary-button load-more-btn" onClick={onLoadMore} type="button">
                Load More Products
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}

function ProductDetail({ product, onAddToCart, wishlist, onToggleWishlist }) {
  const trustScore = calculateTrustScore(product);
  const trustLabel = getTrustLabel(trustScore);
  const isWishlisted = wishlist.includes(product.id);
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="detail-section" id="details" aria-label="Selected product trust review">
      <div className="detail-media" style={{ backgroundImage: `url('${product.image}')` }}>
        <TrustBadge trustScore={trustScore} />
      </div>

      <div className="detail-panel">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="#home">Home</a>
          <span aria-hidden="true"> / </span>
          <a href="#products">Products</a>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <p className="mono-label">Trust review</p>
        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <StarRating rating={product.sellerRating} />

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

        {product.fakeReviewRisk && (
          <div className="detail-review-risk">
            <span>Review Authenticity: </span>
            <ReviewRiskBadge risk={product.fakeReviewRisk} />
          </div>
        )}

        <div className={`trust-summary ${trustLabel.toLowerCase()}`}>
          <div className="trust-summary-header">
            <strong>{getTrustMessage(trustScore)}</strong>
            <TrustScoreBreakdown product={product} />
          </div>
          <span>
            {trustLabel === 'Safe' && 'This product has strong seller and review signals.'}
            {trustLabel === 'Medium' && 'This product can be bought, but review the seller first.'}
            {trustLabel === 'Risky' && 'This product has multiple risk signals. Consider skipping it.'}
          </span>
        </div>

        <div className="detail-actions">
          <div className="quantity-selector" aria-label="Product quantity">
            <button
              aria-label="Decrease quantity"
              className="qty-btn"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              type="button"
            >
              −
            </button>
            <span className="qty-value" aria-live="polite">{quantity}</span>
            <button
              aria-label="Increase quantity"
              className="qty-btn"
              onClick={() => setQuantity((q) => q + 1)}
              type="button"
            >
              +
            </button>
          </div>

          <button className="primary-button detail-button" onClick={() => { for (let i = 0; i < quantity; i++) onAddToCart(product); }} type="button">
            Add {quantity > 1 ? `(${quantity}) ` : ''}to Cart
          </button>

          <button
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            aria-pressed={isWishlisted}
            className={`secondary-button${isWishlisted ? ' wishlisted' : ''}`}
            onClick={() => onToggleWishlist(product.id)}
            type="button"
          >
            {isWishlisted ? '❤️ Saved' : '🤍 Save'}
          </button>
        </div>
      </div>
    </section>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Back to top"
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      type="button"
    >
      ↑
    </button>
  );
}

const PRODUCTS_PER_PAGE = 6;
const allProducts = [...baseProducts, ...extraProducts];

function App() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(baseProducts[0]);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [minSellerRating, setMinSellerRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const scoredProducts = useMemo(
    () =>
      allProducts.map((product) => {
        const trustScore = calculateTrustScore(product);

        return { ...product, trustScore, trustLabel: getTrustLabel(trustScore) };
      }),
    [],
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return scoredProducts.filter((product) => {
      if (selectedFilter !== 'All' && product.trustLabel !== selectedFilter) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (categoryFilter !== 'All' && product.category !== categoryFilter) return false;
      if (product.sellerRating < minSellerRating) return false;
      if (query && !product.name.toLowerCase().includes(query) && !product.category.toLowerCase().includes(query)) return false;

      return true;
    });
  }, [scoredProducts, selectedFilter, searchQuery, priceRange, categoryFilter, minSellerRating]);

  const sortedProducts = useMemo(
    () =>
      [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'trust') return b.trustScore - a.trustScore;

        return a.id - b.id;
      }),
    [filteredProducts, sortBy],
  );

  const productsToShow = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  const addToCart = useCallback(() => {
    setCartCount((count) => count + 1);
  }, []);

  const addMultipleToCart = useCallback((product, qty) => {
    setCartCount((count) => count + qty);
  }, []);

  const selectProduct = useCallback((product) => {
    setSelectedProduct(product);
    setTimeout(() => {
      document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const toggleCompare = useCallback((id) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;

      return [...prev, id];
    });
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedFilter('All');
    setSortBy('featured');
    setSearchQuery('');
    setPriceRange([0, 2000]);
    setCategoryFilter('All');
    setMinSellerRating(0);
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, []);

  const compareProducts = allProducts.filter((p) => compareList.includes(p.id));
  const wishlistProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <main className={`App${darkMode ? ' light-mode' : ''}`}>
      <Header
        cartCount={cartCount}
        darkMode={darkMode}
        onOpenWishlist={() => setShowWishlist(true)}
        onToggleDark={() => setDarkMode((d) => !d)}
        wishlistCount={wishlist.length}
      />
      <Hero featuredProduct={baseProducts[0]} onAddToCart={addToCart} />
      <HowItWorks />
      <TrustEngineSection />
      <ProductStats />
      <ProductCatalog
        allProductsCount={sortedProducts.length}
        categoryFilter={categoryFilter}
        compareList={compareList}
        hasMore={hasMore}
        loading={false}
        minSellerRating={minSellerRating}
        onAddToCart={addToCart}
        onCategoryFilter={setCategoryFilter}
        onCompareOpen={() => setShowComparison(true)}
        onLoadMore={() => setVisibleCount((v) => v + PRODUCTS_PER_PAGE)}
        onMinSellerRating={setMinSellerRating}
        onPriceRange={setPriceRange}
        onResetFilters={resetFilters}
        onSearchChange={setSearchQuery}
        onSelect={selectProduct}
        onToggleCompare={toggleCompare}
        onToggleFilters={() => setShowFilters((s) => !s)}
        onToggleWishlist={toggleWishlist}
        priceRange={priceRange}
        productsToShow={productsToShow}
        searchQuery={searchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        setSortBy={setSortBy}
        showFilters={showFilters}
        sortBy={sortBy}
        wishlist={wishlist}
      />
      <ProductDetail
        onAddToCart={(product) => {
          const qty = 1;
          addMultipleToCart(product, qty);
        }}
        onToggleWishlist={toggleWishlist}
        product={selectedProduct}
        wishlist={wishlist}
      />
      <TrustCalculatorDemo />
      <Testimonials />
      <FAQ />
      <NewsletterSignup />

      {showComparison && compareProducts.length >= 2 && (
        <ProductComparison onClose={() => setShowComparison(false)} products={compareProducts} />
      )}
      {showWishlist && (
        <Wishlist
          onAddToCart={(product) => { addToCart(); setShowWishlist(false); }}
          onClose={() => setShowWishlist(false)}
          onRemove={toggleWishlist}
          products={wishlistProducts}
        />
      )}

      <BackToTop />
    </main>
  );
}

export default App;
