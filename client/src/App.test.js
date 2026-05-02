import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

function getCatalogCard(productName) {
  const productGrid = screen.getByLabelText(/product results/i);
  const productCards = within(productGrid).getAllByRole('article');

  return productCards.find((card) =>
    within(card).queryByRole('heading', { name: productName })
  );
}

test('renders the ecommerce homepage and TrustCart engine', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /shop smarter/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /explore products/i })).toBeInTheDocument();
  expect(screen.getByText(/02 \/\/ engine/i)).toBeInTheDocument();
  expect(screen.getByText(/ai-driven trust infrastructure/i)).toBeInTheDocument();
  expect(screen.getByText(/fake product signals/i)).toBeInTheDocument();
});

test('renders product catalog with filters and trust badges', () => {
  render(<App />);
  const productGrid = screen.getByLabelText(/product results/i);
  const filterGroup = screen.getByLabelText(/filter products/i);

  expect(screen.getByRole('heading', { name: /product catalog/i })).toBeInTheDocument();
  expect(within(filterGroup).getByRole('button', { name: /all/i })).toBeInTheDocument();
  expect(within(filterGroup).getByRole('button', { name: /safe/i })).toBeInTheDocument();
  expect(within(filterGroup).getByRole('button', { name: /medium/i })).toBeInTheDocument();
  expect(within(filterGroup).getByRole('button', { name: /risky/i })).toBeInTheDocument();
  expect(within(productGrid).getByRole('heading', { name: /zenphone pro/i })).toBeInTheDocument();
  expect(within(productGrid).getByRole('heading', { name: /fittrack watch/i })).toBeInTheDocument();
  expect(within(productGrid).getAllByText(/safe \(100\)/i)).toHaveLength(3);
  expect(within(productGrid).getByText(/risky \(20\)/i)).toBeInTheDocument();
});

test('filters products by risky trust level', () => {
  render(<App />);
  const productGrid = screen.getByLabelText(/product results/i);
  const filterGroup = screen.getByLabelText(/filter products/i);

  fireEvent.click(within(filterGroup).getByRole('button', { name: /risky/i }));
  expect(within(productGrid).getByRole('heading', { name: /fittrack watch/i })).toBeInTheDocument();
  expect(within(productGrid).queryByRole('heading', { name: /zenphone pro/i })).not.toBeInTheDocument();
});

test('sorts products by trust score from high to low', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/sort/i), {
    target: { value: 'trust' },
  });

  const productGrid = screen.getByLabelText(/product results/i);
  const productCards = within(productGrid).getAllByRole('article');

  expect(within(productCards[0]).getByRole('heading', { name: /zenphone pro/i })).toBeInTheDocument();
});

test('selects a product and updates the trust review panel', () => {
  render(<App />);

  const fitTrackCard = getCatalogCard(/fittrack watch/i);

  fireEvent.click(within(fitTrackCard).getByRole('button', { name: /details/i }));

  const detailSection = screen.getByLabelText(/selected product trust review/i);

  expect(within(detailSection).getByRole('heading', { name: /fittrack watch/i })).toBeInTheDocument();
  expect(within(detailSection).getByText(/suspicious product detected/i)).toBeInTheDocument();
});

test('adds products to cart', () => {
  render(<App />);

  fireEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);
  expect(screen.getByRole('link', { name: /cart \(1\)/i })).toBeInTheDocument();
});
