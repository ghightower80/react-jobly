import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

it("renders without crashing", function () {
  render(<App />);
});

// Mock JoblyApi module
jest.mock('./api/api', () => ({
  getCurrentUser: jest.fn(),
  signup: jest.fn(),
  login: jest.fn(),
  applyToJob: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.removeItem(TOKEN_STORAGE_ID);
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it('shows loading spinner initially', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders navigation after loading', async () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => expect(queryByTestId('loading-spinner')).not.toBeInTheDocument());
    expect(getByTestId('navigation')).toBeInTheDocument();
  });

});
