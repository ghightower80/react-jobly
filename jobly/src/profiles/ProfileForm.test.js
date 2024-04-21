import React from "react";
import { render } from "@testing-library/react";
import Profile from "./ProfileForm";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
  const { asFragment } = render(
    <UserProvider>
      <Profile />
    </UserProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});

describe('ProfileForm Component', () => {
  const currentUser = {
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
  };

  const setCurrentUser = jest.fn();

  it('renders without crashing', () => {
    render(
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <ProfileForm />
      </UserContext.Provider>
    );
  });

  it('updates form fields correctly', () => {
    const { getByLabelText } = render(
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <ProfileForm />
      </UserContext.Provider>
    );

    fireEvent.change(getByLabelText('First Name'), { target: { value: 'Updated' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'User' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'updated@example.com' } });

    expect(getByLabelText('First Name')).toHaveValue('Updated');
    expect(getByLabelText('Last Name')).toHaveValue('User');
    expect(getByLabelText('Email')).toHaveValue('updated@example.com');
  });

  it('calls handleSubmit function on form submission', async () => {
    const { getByText } = render(
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <ProfileForm />
      </UserContext.Provider>
    );

    fireEvent.click(getByText('Save Changes'));

    await waitFor(() => expect(setCurrentUser).toHaveBeenCalledTimes(1));
  });
});
