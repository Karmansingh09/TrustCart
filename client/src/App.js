import { useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustEngineSection from './components/TrustEngineSection';
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import calculateTrustScore from './utils/calculateTrustScore';
import { getTrustLabel } from './utils/trustHelpers';

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
