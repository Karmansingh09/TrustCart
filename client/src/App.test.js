import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

function goToProductListing() {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /start shopping/i }));
  fireEvent.click(screen.getByRole('button', { name: /explore products/i }));
}

test('starts on the homepage before showing product listing', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /shop with confidence/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /start shopping/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /select a product/i })).not.toBeInTheDocument();
});

test('moves step by step from homepage to product listing', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /start shopping/i }));
  expect(screen.getByRole('heading', { name: /what are you looking for/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /explore products/i }));
  expect(screen.getByRole('heading', { name: /select a product/i })).toBeInTheDocument();
  expect(screen.getByText(/zenphone pro/i)).toBeInTheDocument();
  expect(screen.getByText(/fittrack watch/i)).toBeInTheDocument();
});

test('filters products by risky trust level on listing page', () => {
  goToProductListing();

  fireEvent.click(screen.getByRole('button', { name: /risky/i }));
  expect(screen.getByText(/fittrack watch/i)).toBeInTheDocument();
  expect(screen.queryByText(/zenphone pro/i)).not.toBeInTheDocument();
});

test('sorts products by trust score from high to low on listing page', () => {
  goToProductListing();

  fireEvent.change(screen.getByLabelText(/sort products/i), {
    target: { value: 'trust' },
  });

  const productGrid = screen.getByLabelText(/product results/i);
  const productCards = within(productGrid).getAllByRole('article');

  expect(within(productCards[0]).getByText(/zenphone pro/i)).toBeInTheDocument();
});

test('walks through a risky product decision path', () => {
  goToProductListing();

  const productGrid = screen.getByLabelText(/product results/i);
  const fitTrackCard = within(productGrid).getByText(/fittrack watch/i).closest('article');

  fireEvent.click(within(fitTrackCard).getByRole('button', { name: /select product/i }));
  expect(screen.getByRole('heading', { name: /fittrack watch/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /calculate trust score/i }));
  expect(screen.getByText(/20\/100/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /continue to decision/i }));
  expect(screen.getByRole('heading', { name: /strong warning shown/i })).toBeInTheDocument();
  expect(screen.getByText(/suspicious product detected/i)).toBeInTheDocument();
});

test('walks through a safe product checkout path', () => {
  goToProductListing();

  const productGrid = screen.getByLabelText(/product results/i);
  const zenphoneCard = within(productGrid).getByText(/zenphone pro/i).closest('article');

  fireEvent.click(within(zenphoneCard).getByRole('button', { name: /select product/i }));
  fireEvent.click(screen.getByRole('button', { name: /calculate trust score/i }));
  fireEvent.click(screen.getByRole('button', { name: /continue to decision/i }));
  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
  fireEvent.click(screen.getByRole('button', { name: /place order/i }));

  expect(screen.getByRole('heading', { name: /your trustcart order is placed/i })).toBeInTheDocument();
});
