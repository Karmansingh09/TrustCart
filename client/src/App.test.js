import { fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState(null, '', '/');
  document.body.dataset.theme = '';
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

  expect(screen.getByLabelText(/search products/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^all$/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^safe$/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^medium$/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^risky$/i })).toBeInTheDocument();
  expect(within(productGrid).getByRole('heading', { name: /zenphone pro/i })).toBeInTheDocument();
  expect(within(productGrid).getByRole('heading', { name: /fittrack watch/i })).toBeInTheDocument();
  expect(within(productGrid).getAllByText(/safe \(100\)/i)).toHaveLength(4);
  expect(within(productGrid).getAllByText(/risky \(20\)/i)).toHaveLength(2);
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
