import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation bar', () => {
  render(<App />);
  const navbar = screen.get("[data-testid='navigation-bar']");
  expect(navbar).toBeInTheDocument();
});
