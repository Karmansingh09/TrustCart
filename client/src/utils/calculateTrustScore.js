function calculateTrustScore(product) {
  // Start from a perfect score and subtract points for risky product signals.
  let score = 100;
  const averagePrice = product.avgPrice || product.averagePrice;

  if (product.price < averagePrice * 0.7) {
    score -= 30;
  }

  if (product.sellerRating < 3) {
    score -= 30;
  }

  if (product.reviews < 20) {
    score -= 20;
  }

  if (score < 0) {
    return 0;
  }

  if (score > 100) {
    return 100;
  }

  return score;
}

export default calculateTrustScore;
