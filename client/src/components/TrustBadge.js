function TrustBadge({ trustScore }) {
  let label = 'Risky';
  let backgroundColor = '#e74c3c';

  if (trustScore >= 80) {
    label = 'Safe';
    backgroundColor = '#2ecc71';
  } else if (trustScore >= 50) {
    label = 'Medium';
    backgroundColor = '#f39c12';
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
    boxShadow: '0 6px 14px rgba(0, 0, 0, 0.2)',
  };

  return <span style={badgeStyle}>{label} ({trustScore})</span>;
}

export default TrustBadge;
