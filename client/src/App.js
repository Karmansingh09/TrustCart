import './App.css';
import TrustBadge from './components/TrustBadge';
import calculateTrustScore from './utils/calculateTrustScore';

function App() {
  const products = [
    {
      id: 1,
      name: 'Zenphone Pro',
      price: 899,
      averagePrice: 950,
      sellerRating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: 'AirSound Pods',
      price: 149,
      averagePrice: 190,
      sellerRating: 2.8,
      reviews: 54,
    },
    {
      id: 3,
      name: 'FitTrack Watch',
      price: 79,
      averagePrice: 180,
      sellerRating: 2.4,
      reviews: 11,
    },
  ];

  return (
    <main className="App">
      <section className="products-section" aria-label="TrustCart products">
        <div className="section-header">
          <span className="eyebrow">TrustCart picks</span>
          <h1>Shop with confidence</h1>
          <p>Compare product trust scores before adding items to your cart.</p>
        </div>

        <div className="products-grid">
          {products.map((product) => {
            const trustScore = calculateTrustScore(product);

            return (
              <article className="product-card" key={product.id}>
                <TrustBadge trustScore={trustScore} />

                <div className="product-image" aria-hidden="true">
                  <span>{product.name.charAt(0)}</span>
                </div>

                <div className="product-info">
                  <p className="product-category">Verified product</p>
                  <h2>{product.name}</h2>

                  <div className="price-row">
                    <span>Price</span>
                    <strong>${product.price}</strong>
                  </div>

                  <button className="cart-button" type="button">
                    Add to cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
