var express = require('express');
var cors = require('cors');

var app = express();
var PORT = process.env.PORT || 5000;

// -----------------------------
// Middleware
// -----------------------------

// Middleware lets the API read JSON data and accept requests from the React app.
app.use(express.json());
app.use(cors());

// -----------------------------
// Product Data
// -----------------------------

// Simple in-memory product list. Later, this can be replaced with MongoDB.
var products = [
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
];

// -----------------------------
// Trust Score Logic
// -----------------------------

function calculateTrustScore(product) {
  var score = 100;

  if (product.price < product.avgPrice * 0.6) {
    score = score - 30;
    console.log(product.name + ': price is much lower than average, -30');
  }

  if (product.sellerRating < 3) {
    score = score - 25;
    console.log(product.name + ': seller rating below 3, -25');
  }

  if (product.reviews < 20) {
    score = score - 15;
    console.log(product.name + ': review count below 20, -15');
  }

  return score;
}

// -----------------------------
// Routes
// -----------------------------

// Basic health route for checking if the server is running.
app.get('/', function (req, res) {
  console.log('GET / called');
  res.send('TrustCart API running');
});

// Simple API test route.
app.get('/api/test', function (req, res) {
  console.log('GET /api/test called');
  res.json({ message: 'API working' });
});

// Product API route. Trust score is calculated every time this route is called.
app.get('/api/products', function (req, res) {
  console.log('GET /api/products called');

  var productsWithTrustScore = products.map(function (product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      avgPrice: product.avgPrice,
      sellerRating: product.sellerRating,
      reviews: product.reviews,
      trustScore: calculateTrustScore(product),
    };
  });

  console.log('Sending ' + productsWithTrustScore.length + ' products');
  res.json(productsWithTrustScore);
});

// -----------------------------
// Start Server
// -----------------------------

app.listen(PORT, function () {
  console.log('TrustCart server running on port ' + PORT);
});
