import calculateTrustScore from './calculateTrustScore';

test('returns 100 for a trusted product', () => {
  const product = {
    price: 900,
    averagePrice: 1000,
    sellerRating: 4.5,
    reviews: 120,
  };

  expect(calculateTrustScore(product)).toBe(100);
});

test('reduces score for low price, low seller rating, and low reviews', () => {
  const product = {
    price: 400,
    averagePrice: 1000,
    sellerRating: 2.5,
    reviews: 8,
  };

  expect(calculateTrustScore(product)).toBe(20);
});

test('keeps score between 0 and 100', () => {
  const product = {
    price: 0,
    averagePrice: 1000,
    sellerRating: 1,
    reviews: 0,
  };

  expect(calculateTrustScore(product)).toBeGreaterThanOrEqual(0);
  expect(calculateTrustScore(product)).toBeLessThanOrEqual(100);
});
