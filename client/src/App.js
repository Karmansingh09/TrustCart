import './App.css';
import TrustBadge from './components/TrustBadge';
import calculateTrustScore from './utils/calculateTrustScore';

const products = [
  {
    id: 1,
    name: 'Zenphone Pro',
    price: 899,
    averagePrice: 950,
    sellerRating: 4.8,
    reviews: 124,
    accent: 'blue',
  },
  {
    id: 2,
    name: 'AirSound Pods',
    price: 149,
    averagePrice: 190,
    sellerRating: 2.8,
    reviews: 54,
    accent: 'violet',
  },
  {
    id: 3,
    name: 'FitTrack Watch',
    price: 79,
    averagePrice: 180,
    sellerRating: 2.4,
    reviews: 11,
    accent: 'pink',
  },
  {
    id: 4,
    name: 'NovaBook Air',
    price: 1199,
    averagePrice: 1250,
    sellerRating: 4.6,
    reviews: 87,
    accent: 'cyan',
  },
];

const features = [
  {
    icon: 'shield',
    title: 'Fake product detection',
    description: 'Spot suspicious pricing, weak seller signals, and low-review listings early.',
  },
  {
    icon: 'score',
    title: 'Smart trust scoring',
    description: 'Every product gets a clear score based on risk signals buyers can understand.',
  },
  {
    icon: 'check',
    title: 'Safe shopping experience',
    description: 'Shop with confidence using simple badges before you add items to cart.',
  },
];

function HeroSection() {
  return (
    <section className="hero-section">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="/">
          TrustCart
        </a>
        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#why-trustcart">Why TrustCart</a>
          <a href="#footer">Contact</a>
        </div>
      </nav>

      <div className="hero-content">
        <span className="hero-kicker">Smart and secure ecommerce</span>
        <h1>Shop with Confidence</h1>
        <p>We detect risky products before you buy</p>

        <form className="search-panel" aria-label="Product search" onSubmit={(event) => event.preventDefault()}>
          <input type="search" placeholder="Search products, brands, or sellers" />
          <button type="submit">Explore Products</button>
        </form>
      </div>
    </section>
  );
}

function ProductVisual({ product }) {
  return (
    <div className={`product-visual ${product.accent}`} aria-hidden="true">
      <div className="product-device">
        <span>{product.name.charAt(0)}</span>
      </div>
      <div className="signal-row">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const trustScore = calculateTrustScore(product);

  return (
    <article className="product-card">
      <TrustBadge trustScore={trustScore} />
      <ProductVisual product={product} />

      <div className="product-info">
        <span className="product-label">Verified listing</span>
        <h3>{product.name}</h3>

        <div className="product-meta">
          <div>
            <span>Price</span>
            <strong>${product.price}</strong>
          </div>
          <div>
            <span>Reviews</span>
            <strong>{product.reviews}</strong>
          </div>
        </div>

        <button className="product-button" type="button">
          View product
        </button>
      </div>
    </article>
  );
}

function FeaturedProducts() {
  return (
    <section className="page-section" id="products">
      <div className="section-heading">
        <span className="section-kicker">Featured products</span>
        <h2>Curated picks with live trust scores</h2>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}

function FeatureIcon({ type }) {
  return (
    <span className={`feature-icon ${type}`} aria-hidden="true">
      <span />
    </span>
  );
}

function WhyTrustCart() {
  return (
    <section className="page-section" id="why-trustcart">
      <div className="section-heading">
        <span className="section-kicker">Why TrustCart</span>
        <h2>Built for safer buying decisions</h2>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <FeatureIcon type={feature.icon} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="footer">
      <strong>TrustCart</strong>
      <div className="footer-links">
        <a href="#products">Products</a>
        <a href="#why-trustcart">Trust Score</a>
        <a href="/">GitHub</a>
      </div>
    </footer>
  );
}

function App() {
  return (
    <main className="App">
      <HeroSection />
      <FeaturedProducts />
      <WhyTrustCart />
      <Footer />
    </main>
  );
}

export default App;
