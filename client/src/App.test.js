import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('renders product listing controls and cards', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /trustcart product listing/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /safe/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /medium/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /risky/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/sort products/i)).toBeInTheDocument();
  expect(screen.getByText(/zenphone pro/i)).toBeInTheDocument();
  expect(screen.getByText(/airsound pods/i)).toBeInTheDocument();
  expect(screen.getByText(/fittrack watch/i)).toBeInTheDocument();
  expect(screen.getAllByText(/safe \(100\)/i)).toHaveLength(3);
  expect(screen.getByText(/medium \(70\)/i)).toBeInTheDocument();
  expect(screen.getByText(/medium \(50\)/i)).toBeInTheDocument();
  expect(screen.getByText(/risky \(20\)/i)).toBeInTheDocument();
  expect(screen.getByText(/suspicious product detected/i)).toBeInTheDocument();
});

test('filters products by risky trust level', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /risky/i }));

  expect(screen.getByText(/fittrack watch/i)).toBeInTheDocument();
  expect(screen.queryByText(/zenphone pro/i)).not.toBeInTheDocument();
});

test('sorts products by trust score from high to low', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/sort products/i), {
    target: { value: 'trust' },
  });

  const productGrid = screen.getByLabelText(/product results/i);
  const productCards = within(productGrid).getAllByRole('article');

  expect(within(productCards[0]).getByText(/zenphone pro/i)).toBeInTheDocument();
});
