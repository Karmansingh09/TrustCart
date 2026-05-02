export const extraProducts = [
  {
    id: 7,
    name: 'GlowRing LED',
    category: 'Smart Home',
    price: 34,
    avgPrice: 45,
    sellerRating: 3.9,
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
    description: 'Smart LED ring with app control. Decent seller track record.',
    fakeReviewRisk: 'Low',
  },
  {
    id: 8,
    name: 'ChargePad Duo',
    category: 'Accessories',
    price: 25,
    avgPrice: 55,
    sellerRating: 3.1,
    reviews: 14,
    image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2e24?auto=format&fit=crop&w=900&q=80',
    description: 'Dual wireless charger with low reviews and suspicious pricing.',
    fakeReviewRisk: 'High',
  },
  {
    id: 9,
    name: 'StreamDeck Mini',
    category: 'Accessories',
    price: 89,
    avgPrice: 100,
    sellerRating: 4.5,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1593640408182-31c228ea2df9?auto=format&fit=crop&w=900&q=80',
    description: 'Compact macro keypad with strong seller history and good reviews.',
    fakeReviewRisk: 'Low',
  },
  {
    id: 10,
    name: 'VisionCam 4K',
    category: 'Phones',
    price: 499,
    avgPrice: 520,
    sellerRating: 4.3,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
    description: 'Budget 4K camera phone with verified seller and positive reviews.',
    fakeReviewRisk: 'Low',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah K.',
    role: 'Verified Buyer',
    avatar: 'https://i.pravatar.cc/80?img=1',
    text: 'TrustCart saved me from buying a fake smartwatch. The Trust Score was 22 — I almost clicked "Buy"!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Raj M.',
    role: 'Tech Reviewer',
    avatar: 'https://i.pravatar.cc/80?img=3',
    text: 'I use TrustCart before every online purchase. The seller rating breakdown is genuinely useful.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily T.',
    role: 'Frequent Shopper',
    avatar: 'https://i.pravatar.cc/80?img=5',
    text: 'The comparison feature helped me pick the right laptop. Side-by-side trust data is a game changer.',
    rating: 4,
  },
  {
    id: 4,
    name: 'Carlos D.',
    role: 'Small Business Owner',
    avatar: 'https://i.pravatar.cc/80?img=7',
    text: 'As a reseller, I vet suppliers through TrustCart. The score breakdown tells me exactly what to watch.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Priya S.',
    role: 'Student',
    avatar: 'https://i.pravatar.cc/80?img=9',
    text: 'Found a great budget phone that I would have skipped without TrustCart confirming the seller was legit.',
    rating: 4,
  },
  {
    id: 6,
    name: 'David W.',
    role: 'Verified Buyer',
    avatar: 'https://i.pravatar.cc/80?img=11',
    text: 'The fake review detection is impressive. It flagged a product I almost bought for my kid.',
    rating: 5,
  },
];

export const faqs = [
  {
    id: 1,
    question: 'How is the Trust Score calculated?',
    answer:
      'The Trust Score is a 0–100 rating based on three key signals: price deviation from market average (a price far below average is a red flag), seller rating (below 3.0 triggers a penalty), and review count (fewer than 20 reviews reduces confidence). All three factors are combined to produce the final score.',
  },
  {
    id: 2,
    question: 'What does a "Risky" score mean?',
    answer:
      'A Risky score (below 50) means the product has multiple red flags — it could be a counterfeit, the seller may have a poor history, or there are very few verified reviews. We strongly advise reviewing the product carefully before purchasing.',
  },
  {
    id: 3,
    question: 'Can I trust a "Safe" product completely?',
    answer:
      'A Safe score (80+) means all signals look positive: the price is in line with the market, the seller has a high rating, and there are enough reviews to build confidence. While no system is perfect, Safe products carry a much lower risk of being counterfeit or fraudulent.',
  },
  {
    id: 4,
    question: 'How does the Wishlist work?',
    answer:
      "Click the heart icon on any product card to save it to your Wishlist. You can access all saved items via the heart icon in the header. Wishlist items are saved in your browser session so they persist as you browse.",
  },
  {
    id: 5,
    question: 'How do I compare products?',
    answer:
      'Check the compare checkbox on any 2–3 product cards, then click the "Compare" button that appears in the catalog toolbar. A side-by-side comparison table will show Trust Score, price, seller rating, and more.',
  },
  {
    id: 6,
    question: 'Is TrustCart free to use?',
    answer:
      'Yes, TrustCart is completely free for shoppers. Our trust scoring engine is always on and available for every product in our catalog.',
  },
  {
    id: 7,
    question: 'How accurate is the fake review detection?',
    answer:
      'Our fake review risk indicator flags products where review patterns appear suspicious (e.g., sudden spikes in positive reviews, reviews from unverified buyers). It is a heuristic indicator, not a guarantee, but it adds another layer of protection.',
  },
];

export const platformStats = [
  { label: 'Products Analyzed', value: '2.4M+', icon: '📦' },
  { label: 'Fake Products Caught', value: '187K+', icon: '🛡️' },
  { label: 'Verified Sellers', value: '34K+', icon: '✅' },
  { label: 'Buyers Protected', value: '890K+', icon: '👥' },
];
