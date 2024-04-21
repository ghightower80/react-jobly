import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import SignupForm from './SignupForm';

describe('SignupForm Component', () => {
    it('renders without crashing', () => {
        render(
            <Router>
                <SignupForm signup={() => { }} />
            </Router>
        );
    });

    it('updates form fields correctly', () => {
        const { getByLabelText } = render(
            <Router>
                <SignupForm signup={() => { }} />
            </Router>
        );

        const usernameInput = getByLabelText('Username');
        const passwordInput = getByLabelText('Password');
        const firstNameInput = getByLabelText('First name');
        const lastNameInput = getByLabelText('Last name');
        const emailInput = getByLabelText('Email');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        expect(usernameInput).toHaveValue('testuser');
        expect(passwordInput).toHaveValue('testpassword');
        expect(firstNameInput).toHaveValue('John');
        expect(lastNameInput).toHaveValue('Doe');
        expect(emailInput).toHaveValue('test@example.com');
    });

    it('calls signup function on form submission', async () => {
        const signupMock = jest.fn(() => Promise.resolve({ success: true }));
        const { getByLabelText, getByText } = render(
            <Router>
                <SignupForm signup={signupMock} />
            </Router>
        );

        fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: 'testpassword' } });
        fireEvent.change(getByLabelText('First name'), { target: { value: 'John' } });
        fireEvent.change(getByLabelText('Last name'), { target: { value: 'Doe' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });

        fireEvent.click(getByText('Submit'));

        await waitFor(() => expect(signupMock).toHaveBeenCalledTimes(1));
    });
});
