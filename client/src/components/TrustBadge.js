function TrustBadge({ trustScore }) {
  let label = 'Risky';
  let backgroundColor = '#e74c3c';
  let glowColor = 'rgba(231, 76, 60, 0.45)';

  if (trustScore >= 80) {
    label = 'Safe';
    backgroundColor = '#2ecc71';
    glowColor = 'rgba(46, 204, 113, 0.45)';
  } else if (trustScore >= 50) {
    label = 'Medium';
    backgroundColor = '#f39c12';
    glowColor = 'rgba(243, 156, 18, 0.45)';
  }

  const badgeStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    zIndex: 2,
    backgroundColor,
    color: '#ffffff',
    padding: '8px 14px',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: '700',
    boxShadow: `0 0 18px ${glowColor}, 0 8px 16px rgba(0, 0, 0, 0.22)`,
    animation: 'badgeSlideIn 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
  };

  return <span style={badgeStyle}>{label} ({trustScore})</span>;
}

export default TrustBadge;
