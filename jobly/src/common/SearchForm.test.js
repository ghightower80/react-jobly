import React from "react";
import { render } from "@testing-library/react";
import SearchForm from "./SearchForm";

it("matches snapshot", function () {
  const { asFragment } = render(<SearchForm />);
  expect(asFragment()).toMatchSnapshot();
});

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchForm from './SearchForm';

describe('SearchForm Component', () => {
  it('renders without crashing', () => {
    render(<SearchForm searchFor={() => { }} />);
  });

  it('updates search term correctly', () => {
    const { getByPlaceholderText } = render(<SearchForm searchFor={() => { }} />);
    const searchInput = getByPlaceholderText('Enter search term..');

    fireEvent.change(searchInput, { target: { value: 'test term' } });

    expect(searchInput).toHaveValue('test term');
  });

  it('calls searchFor function on form submission', async () => {
    const searchForMock = jest.fn();
    const { getByText, getByPlaceholderText } = render(<SearchForm searchFor={searchForMock} />);
    const searchInput = getByPlaceholderText('Enter search term..');
    const submitButton = getByText('Submit');

    fireEvent.change(searchInput, { target: { value: 'test term' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(searchForMock).toHaveBeenCalledWith('test term'));
  });

  it('calls searchFor function with undefined when search term is empty', async () => {
    const searchForMock = jest.fn();
    const { getByText } = render(<SearchForm searchFor={searchForMock} />);
    const submitButton = getByText('Submit');

    fireEvent.click(submitButton);

    await waitFor(() => expect(searchForMock).toHaveBeenCalledWith(undefined));
  });
});
