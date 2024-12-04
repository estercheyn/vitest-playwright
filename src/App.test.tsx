import App from './App';
import { test, expect } from 'vitest';

import { render, screen } from '@testing-library/react';

test('render app', () => {
  render(<App />);
  const countText = screen.getByLabelText('count').textContent;
  expect(countText).toBe('count is 0');
});
