import { render, screen } from '@testing-library/react';
import App from './App';

test('renders product cards with trust badges', () => {
  render(<App />);
  expect(screen.getByText(/zenphone pro/i)).toBeInTheDocument();
  expect(screen.getByText(/airsound pods/i)).toBeInTheDocument();
  expect(screen.getByText(/fittrack watch/i)).toBeInTheDocument();
  expect(screen.getByText(/safe \(85\)/i)).toBeInTheDocument();
  expect(screen.getByText(/medium \(68\)/i)).toBeInTheDocument();
  expect(screen.getByText(/risky \(42\)/i)).toBeInTheDocument();
});
