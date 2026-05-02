import { fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import App from './App';

const mockProducts = [
  {
    id: 1,
    name: 'Zenphone Pro',
    category: 'Phones',
    price: 899,
    avgPrice: 950,
    sellerRating: 4.8,
    reviews: 124,
    historyScore: 92,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
    description: 'A premium everyday flagship with all-day battery and verified seller history.',
    trustScore: 100,
  },
  {
    id: 2,
    name: 'AirSound Pods',
    category: 'Audio',
    price: 149,
    avgPrice: 190,
    sellerRating: 2.8,
    reviews: 54,
    historyScore: 64,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80',
    description: 'Wireless earbuds with active noise reduction and a medium seller risk profile.',
    trustScore: 75,
  },
  {
    id: 3,
    name: 'FitTrack Watch',
    category: 'Wearables',
    price: 79,
    avgPrice: 180,
    sellerRating: 2.4,
    reviews: 11,
    historyScore: 38,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    description: 'A low-priced wearable with suspicious pricing and limited review history.',
    trustScore: 30,
  },
  {
    id: 4,
    name: 'NovaBook Air',
    category: 'Laptops',
    price: 1199,
    avgPrice: 1250,
    sellerRating: 4.7,
    reviews: 89,
    historyScore: 88,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    description: 'A thin laptop from a highly rated seller with a strong TrustCart score.',
    trustScore: 100,
  },
  {
    id: 5,
    name: 'PixelBuds Lite',
    category: 'Audio',
    price: 39,
    avgPrice: 110,
    sellerRating: 3.7,
    reviews: 8,
    historyScore: 51,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
    description: 'Budget earbuds with low reviews and a price far below the usual market range.',
    trustScore: 55,
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    })
  );
  localStorage.clear();
  window.history.replaceState(null, '', '/');
  document.body.dataset.theme = '';
});

afterEach(() => {
  delete global.fetch;
});

async function getProductGrid() {
  return screen.findByLabelText(/product results/i);
}

async function getCatalogCard(productName) {
  const productGrid = await getProductGrid();
  const productCards = within(productGrid).getAllByRole('article');

  return productCards.find((card) =>
    within(card).queryByRole('heading', { name: productName })
  );
}

test('renders the premium homepage, engine, and learning sections', async () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /shop smarter/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /explore products/i })).toBeInTheDocument();
  expect(screen.getByText(/02 \/\/ engine/i)).toBeInTheDocument();
  expect(screen.getByText(/ai-driven trust infrastructure/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /trust score calculator/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /how trustcart protects shoppers/i })).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /product catalog/i })).toBeInTheDocument();
});

test('renders product catalog with search, filters, and trust badges', async () => {
  render(<App />);
  const productGrid = await getProductGrid();

  expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/products');
  expect(screen.getByLabelText(/search products/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^all$/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^safe$/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^medium$/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^risky$/i })).toBeInTheDocument();
  expect(within(productGrid).getByRole('heading', { name: /zenphone pro/i })).toBeInTheDocument();
  expect(within(productGrid).getByRole('heading', { name: /fittrack watch/i })).toBeInTheDocument();
  expect(within(productGrid).getAllByText(/safe \(100\)/i)).toHaveLength(2);
  expect(within(productGrid).getByText(/risky \(30\)/i)).toBeInTheDocument();
});

test('searches and filters products dynamically', async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/search products/i), {
    target: { value: 'watch' },
  });

  await waitFor(async () => {
    const productGrid = await getProductGrid();

    expect(within(productGrid).getByRole('heading', { name: /fittrack watch/i })).toBeInTheDocument();
    expect(within(productGrid).queryByRole('heading', { name: /zenphone pro/i })).not.toBeInTheDocument();
  });

  expect(window.location.search).toContain('q=watch');
});

test('filters risky products and sorts by trust score', async () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /^risky$/i }));

  await waitFor(async () => {
    const productGrid = await getProductGrid();

    expect(within(productGrid).getByRole('heading', { name: /fittrack watch/i })).toBeInTheDocument();
    expect(within(productGrid).queryByRole('heading', { name: /zenphone pro/i })).not.toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: /clear all/i }));
  fireEvent.change(screen.getByLabelText(/sort products/i), {
    target: { value: 'trust' },
  });

  await waitFor(async () => {
    const productGrid = await getProductGrid();
    const productCards = within(productGrid).getAllByRole('article');

    expect(within(productCards[0]).getByRole('heading', { name: /zenphone pro/i })).toBeInTheDocument();
  });
});

test('supports wishlist actions and moving a saved product to the cart', async () => {
  render(<App />);

  const fitTrackCard = await getCatalogCard(/fittrack watch/i);

  fireEvent.click(within(fitTrackCard).getByRole('button', { name: /add fittrack watch to wishlist/i }));
  expect(screen.getByRole('button', { name: /wishlist \(1\)/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /wishlist \(1\)/i }));
  expect(screen.getByRole('heading', { name: /^wishlist$/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /move to cart/i }));
  expect(screen.getByRole('link', { name: /cart \(1\)/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /wishlist \(0\)/i })).toBeInTheDocument();
});

test('opens product comparison for selected products', async () => {
  render(<App />);

  const zenphoneCard = await getCatalogCard(/zenphone pro/i);
  const novaBookCard = await getCatalogCard(/novabook air/i);

  fireEvent.click(within(zenphoneCard).getByRole('checkbox'));
  fireEvent.click(within(novaBookCard).getByRole('checkbox'));
  fireEvent.click(screen.getByRole('button', { name: /compare products/i }));

  const dialog = screen.getByRole('dialog', { name: /product comparison/i });

  expect(within(dialog).getByRole('heading', { name: /compare selected products/i })).toBeInTheDocument();
  expect(within(dialog).getAllByText(/zenphone pro/i).length).toBeGreaterThan(0);
  expect(within(dialog).getAllByText(/novabook air/i).length).toBeGreaterThan(0);
  expect(within(dialog).getByText(/trust score/i)).toBeInTheDocument();
});

test('selects a product and updates the trust review panel', async () => {
  render(<App />);

  const fitTrackCard = await getCatalogCard(/fittrack watch/i);

  fireEvent.click(within(fitTrackCard).getByRole('button', { name: /details/i }));

  const detailSection = screen.getByLabelText(/selected product trust review/i);

  expect(within(detailSection).getByRole('heading', { name: /fittrack watch/i })).toBeInTheDocument();
  expect(within(detailSection).getByText(/suspicious product detected/i)).toBeInTheDocument();
});

test('toggles light mode and adds products to cart', async () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /toggle dark and light mode/i }));
  expect(screen.getByRole('button', { name: /toggle dark and light mode/i })).toHaveTextContent(/dark/i);

  const productGrid = await getProductGrid();
  fireEvent.click(within(productGrid).getAllByRole('button', { name: /add to cart/i })[0]);

  expect(screen.getByRole('link', { name: /cart \(1\)/i })).toBeInTheDocument();
});
