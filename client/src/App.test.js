import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TrustCart homepage sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /shop with confidence/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /explore products/i })).toBeInTheDocument();
  expect(screen.getByText(/fake product detection/i)).toBeInTheDocument();
  expect(screen.getByText(/zenphone pro/i)).toBeInTheDocument();
  expect(screen.getByText(/airsound pods/i)).toBeInTheDocument();
  expect(screen.getByText(/fittrack watch/i)).toBeInTheDocument();
  expect(screen.getAllByText(/safe \(100\)/i)).toHaveLength(2);
  expect(screen.getByText(/medium \(70\)/i)).toBeInTheDocument();
  expect(screen.getByText(/risky \(20\)/i)).toBeInTheDocument();
});
