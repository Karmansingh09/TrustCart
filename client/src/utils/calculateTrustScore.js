function calculateTrustScore(product) {
  let score = 100;

  if (product.price < product.averagePrice * 0.7) {
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
