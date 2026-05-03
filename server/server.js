var express = require('express');
var cors = require('cors');

var app = express();
var PORT = process.env.PORT || 5000;

// -----------------------------
// Middleware
// -----------------------------

// express.json() lets the server read JSON from request bodies.
// cors() allows the React frontend (on a different port) to call this API.
app.use(express.json());
app.use(cors());

// -----------------------------
// Product Data
// -----------------------------

// In-memory product list. Each product has:
//   name        – product display name
//   price       – current listed price
//   avgPrice    – typical market price for comparison
//   sellerRating– seller reputation score (0–5)
//   reviews     – number of customer reviews

var products = [
  {
    id: 1,
    name: 'Zenphone Pro',
    price: 899,
    avgPrice: 950,
    sellerRating: 4.8,
    reviews: 124,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
    description: 'A premium smartphone with all-day battery, fast charging, and verified seller history.',
  },
  {
    id: 2,
    name: 'AirSound Pods',
    price: 149,
    avgPrice: 190,
    sellerRating: 2.8,
    reviews: 54,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80',
    description: 'Wireless earbuds with active noise cancellation and a medium seller risk profile.',
  },
  {
    id: 3,
    name: 'FitTrack Watch',
    price: 79,
    avgPrice: 180,
    sellerRating: 2.4,
    reviews: 11,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    description: 'A fitness smartwatch with suspicious pricing and limited review history.',
  },
  {
    id: 4,
    name: 'NovaBook Air',
    price: 1199,
    avgPrice: 1250,
    sellerRating: 4.7,
    reviews: 89,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    description: 'A thin and light laptop from a highly rated seller with a strong TrustCart score.',
  },
  {
    id: 5,
    name: 'PixelBuds Lite',
    price: 39,
    avgPrice: 110,
    sellerRating: 3.7,
    reviews: 8,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
    description: 'Budget wireless earbuds with low reviews and a price far below the market range.',
  },
  {
    id: 6,
    name: 'SoundMax Headphones',
    price: 199,
    avgPrice: 220,
    sellerRating: 4.5,
    reviews: 312,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    description: 'Over-ear headphones with deep bass, long battery life, and a well-rated seller.',
  },
  {
    id: 7,
    name: 'GlowRing LED',
    price: 34,
    avgPrice: 45,
    sellerRating: 3.9,
    reviews: 28,
    category: 'Smart Home',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
    description: 'Smart LED ring light with app control and a decent seller track record.',
  },
  {
    id: 8,
    name: 'ChargePad Duo',
    price: 25,
    avgPrice: 55,
    sellerRating: 3.1,
    reviews: 14,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2e24?auto=format&fit=crop&w=900&q=80',
    description: 'Dual wireless charger pad with low reviews and suspicious pricing signals.',
  },
  {
    id: 9,
    name: 'StreamDeck Mini',
    price: 89,
    avgPrice: 100,
    sellerRating: 4.5,
    reviews: 67,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1593640408182-31c228ea2df9?auto=format&fit=crop&w=900&q=80',
    description: 'Compact macro keypad for streaming and productivity with strong seller history.',
  },
  {
    id: 10,
    name: 'VisionCam 4K',
    price: 499,
    avgPrice: 520,
    sellerRating: 4.3,
    reviews: 45,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
    description: 'Budget 4K camera phone with verified seller and a solid number of positive reviews.',
  },
  {
    id: 11,
    name: 'ProTab X10',
    price: 349,
    avgPrice: 380,
    sellerRating: 4.6,
    reviews: 98,
    category: 'Tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
    description: 'Mid-range tablet with stylus support, fast processor, and a trusted verified seller.',
  },
  {
    id: 12,
    name: 'KeyStrike Pro',
    price: 15,
    avgPrice: 80,
    sellerRating: 2.1,
    reviews: 6,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    description: 'Mechanical keyboard priced far below market average with almost no reviews — high risk.',
  },
];

// -----------------------------
// Trust Score Logic
// -----------------------------

// calculateTrustScore() takes a single product object and returns
// a score between 0 and 100 based on three risk signals.

function calculateTrustScore(product) {
  var score = 100;

  // Rule 1 – Price is suspiciously lower than average (< 60% of avgPrice)
  if (product.price < product.avgPrice * 0.6) {
    score = score - 30;
    console.log(product.name + ': price < 60% of avgPrice  →  -30 points');
  }

  // Rule 2 – Seller has a poor rating
  if (product.sellerRating < 3) {
    score = score - 25;
    console.log(product.name + ': sellerRating < 3  →  -25 points');
  }

  // Rule 3 – Very few customer reviews (hard to trust)
  if (product.reviews < 20) {
    score = score - 15;
    console.log(product.name + ': reviews < 20  →  -15 points');
  }

  // Clamp between 0 and 100 just in case multiple rules fire
  if (score < 0) score = 0;

  return score;
}

function toTitleCase(text) {
  return text
    .split(' ')
    .filter(Boolean)
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function formatCategory(category) {
  if (!category) return 'General';
  return toTitleCase(String(category).replace(/-/g, ' '));
}

function guessCategory(searchTerm) {
  if (searchTerm.includes('phone')) return 'Phones';
  if (searchTerm.includes('laptop')) return 'Laptops';
  if (searchTerm.includes('watch')) return 'Wearables';
  if (searchTerm.includes('headphone') || searchTerm.includes('earbud') || searchTerm.includes('speaker')) return 'Audio';
  if (searchTerm.includes('tablet')) return 'Tablets';
  if (searchTerm.includes('camera')) return 'Electronics';
  return 'General';
}

function getFallbackImage(category) {
  var images = {
    Audio: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    Phones: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
    Laptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    Wearables: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    Tablets: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
    General: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
  };

  return images[category] || images.General;
}

function createSearchFallbackProduct(searchTerm) {
  var category = guessCategory(searchTerm);
  var price = Math.max(19, Math.min(999, searchTerm.length * 17));

  return {
    id: 900000 + searchTerm.length,
    name: toTitleCase(searchTerm) + ' Product',
    price: price,
    avgPrice: Math.round(price * 1.25),
    sellerRating: 4.1,
    reviews: 42,
    category: category,
    image: getFallbackImage(category),
    description: 'Demo search result for "' + searchTerm + '" generated by TrustCart when no catalog match is found.',
  };
}

function convertDummyJsonProduct(product) {
  var price = Math.round(Number(product.price) || 49);
  var avgPrice = Math.round(price * 1.2);
  var sellerRating = Number(product.rating) || 4;
  var reviews = Array.isArray(product.reviews) ? Math.max(product.reviews.length, 25) : 25;
  var category = formatCategory(product.category);
  var image = product.thumbnail || (product.images && product.images[0]) || getFallbackImage(category);

  return {
    id: 100000 + Number(product.id || 0),
    name: product.title || 'External Product',
    price: price,
    avgPrice: avgPrice,
    sellerRating: sellerRating,
    reviews: reviews,
    category: category,
    image: image,
    description: product.description || 'Product result from the external product API.',
  };
}

async function fetchExternalProducts(searchTerm) {
  var url = 'https://dummyjson.com/products/search?q=' + encodeURIComponent(searchTerm) + '&limit=12';
  console.log('No local matches. Searching external API: ' + url);

  var response = await fetch(url);

  if (!response.ok) {
    throw new Error('External product API returned status ' + response.status);
  }

  var data = await response.json();
  var externalProducts = Array.isArray(data.products) ? data.products : [];

  console.log('External API matched ' + externalProducts.length + ' product(s).');
  return externalProducts.map(convertDummyJsonProduct);
}

// -----------------------------
// Routes
// -----------------------------

// Health-check route – useful for quickly verifying the server is up.
app.get('/', function (req, res) {
  res.send('✅ TrustCart API is running. Visit /api/products for product data.');
});

// Simple sanity-check route.
app.get('/api/test', function (req, res) {
  res.json({ message: 'TrustCart API is working!' });
});

// GET /api/products?search=headphones
// Optional ?search= query filters by name, category, or description (case-insensitive).
// Also supports ?category= and ?maxPrice= for server-side filtering.
app.get('/api/products', async function (req, res) {
  console.log('-------------------------------------------');
  console.log('GET /api/products called');

  var searchTerm = (req.query.search || req.query.q || '').toLowerCase().trim();
  var categoryFilter = (req.query.category || '').toLowerCase().trim();
  var maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : null;

  var filtered = products;

  // Filter by search term across name, category, and description
  if (searchTerm) {
    filtered = filtered.filter(function (product) {
      var haystack = (product.name + ' ' + product.category + ' ' + product.description).toLowerCase();
      return haystack.includes(searchTerm);
    });
    console.log('Search "' + searchTerm + '" matched ' + filtered.length + ' product(s).');
  }

  if (searchTerm && filtered.length === 0) {
    try {
      filtered = await fetchExternalProducts(searchTerm);
    } catch (error) {
      console.log('External API failed: ' + error.message);
      filtered = [];
    }
  }

  if (searchTerm && filtered.length === 0) {
    console.log('No external matches. Creating one demo result for "' + searchTerm + '".');
    filtered = [createSearchFallbackProduct(searchTerm)];
  }

  // Filter by category
  if (categoryFilter) {
    filtered = filtered.filter(function (product) {
      return product.category.toLowerCase() === categoryFilter;
    });
  }

  // Filter by max price
  if (maxPrice !== null) {
    filtered = filtered.filter(function (product) {
      return product.price <= maxPrice;
    });
  }

  var result = filtered.map(function (product) {
    var trustScore = calculateTrustScore(product);
    var warning = trustScore < 50 ? '⚠️ Suspicious product' : null;

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      avgPrice: product.avgPrice,
      sellerRating: product.sellerRating,
      reviews: product.reviews,
      category: product.category,
      image: product.image,
      description: product.description,
      trustScore: trustScore,
      warning: warning,
    };
  });

  console.log('Returning ' + result.length + ' products.');
  console.log('-------------------------------------------');

  res.json(result);
});

// -----------------------------
// Start Server
// -----------------------------

app.listen(PORT, function () {
  console.log('===========================================');
  console.log('  🛒  TrustCart server is running!');
  console.log('  🌐  http://localhost:' + PORT);
  console.log('  📦  Products API: http://localhost:' + PORT + '/api/products');
  console.log('===========================================');
});
