import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({
      products: [{ id: 1, title: 'Phone' }],
    }),
  });
});

test('selects a suggestion and only closes suggestions for non-input clicks', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Search your product...');

  fireEvent.focus(input);
  const suggestion = await screen.findByText('Phone');
  expect(suggestion).toBeInTheDocument();
  fireEvent.click(input);
  expect(screen.getByText('Phone')).toBeInTheDocument();

  fireEvent.click(suggestion);
  expect(input).toHaveValue('Phone');
  expect(screen.queryByText('Phone')).not.toBeInTheDocument();

  fireEvent.focus(input);
  expect(await screen.findByText('Phone')).toBeInTheDocument();
  fireEvent.click(document.body);
  expect(screen.queryByText('Phone')).not.toBeInTheDocument();
});
