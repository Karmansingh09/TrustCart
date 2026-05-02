export function getTrustLabel(score) {
  if (score >= 80) {
    return 'Safe';
  }

  if (score >= 50) {
    return 'Medium';
  }

  return 'Risky';
}

export function getTrustMessage(score) {
  if (score >= 80) {
    return 'Recommended to buy';
  }

  if (score >= 50) {
    return 'Review seller details';
  }

  return 'Suspicious product detected';
}
