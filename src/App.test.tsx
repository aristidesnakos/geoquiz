import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GeoQuiz header', () => {
  render(<App />);
  const headerElement = screen.getByText(/GeoQuiz/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders instruction text', () => {
  render(<App />);
  const instructionElement = screen.getByText(/Click on a country and guess its name!/i);
  expect(instructionElement).toBeInTheDocument();
});
