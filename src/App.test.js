import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

beforeEach(() => {
  console.log('before each test');
  // 1. rendering the component that we want to test
  render(<App />);
});

afterEach(() => {
  console.log('after each test');
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitBtnElement);
};

test('textbox intial value should be empty', () => {
  // 2.find the element that we want to test
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  // 3. assertion
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('user should be able to type an email in the textbox', () => {
  // 2. find the element that we want to test

  // 3. use the user event to simulate the test

  // 4. assertion
  const { emailInputElement } = typeIntoForm({ email: 'dan@test.com' });
  expect(emailInputElement.value).toBe('dan@test.com');
});

test('user should be able to type an password', () => {
  // 2. find the element that we want to test
  const { passwordInputElement } = typeIntoForm({ password: 'password1234' });

  // 4. assertion
  expect(passwordInputElement.value).toBe('password1234');
});

test('user should be able to type a confirm password', () => {
  const { confirmPasswordInputElement } = typeIntoForm({
    confirmPassword: 'password1234',
  });

  // 4. assertion
  expect(confirmPasswordInputElement.value).toBe('password1234');
});

test('should show error message for invalid email', () => {
  let emailErrorElement = screen.queryByText(/the email you input is invalid/i);

  expect(emailErrorElement).not.toBeInTheDocument();
  // 2. find the element that we want to test
  typeIntoForm({ email: 'dantest.com' });
  clickOnSubmitButton();

  emailErrorElement = screen.queryByText(/the email you input is invalid/i);

  // 4. assertion
  expect(emailErrorElement).toBeInTheDocument();
});

test('the password length should be great than 5', () => {
  let passErrorElement = screen.queryByText(
    /the password length should be great than 5/i
  );

  expect(passErrorElement).not.toBeInTheDocument();
  // 2. find the element that we want to test
  typeIntoForm({ email: 'dan@test.com', password: '1234' });
  clickOnSubmitButton();

  passErrorElement = screen.queryByText(
    /the password length should be great than 5/i
  );

  // 4. assertion
  expect(passErrorElement).toBeInTheDocument();
});

test('the confirm password does not match', () => {
  let confirmPasswordErrorElement = screen.queryByText(
    /the passwords do not match/i
  );

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  typeIntoForm({
    confirmPassword: 'password123',
    password: '12345',
    email: 'dan@test.com',
  });
  clickOnSubmitButton();

  confirmPasswordErrorElement = screen.queryByText(
    /the passwords do not match/i
  );

  // 4. assertion
  expect(confirmPasswordErrorElement).toBeInTheDocument();
});

test('should pass all the tests', () => {
  typeIntoForm({
    confirmPassword: 'password123',
    password: 'password123',
    email: 'dan@test.com',
  });
  clickOnSubmitButton();

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const passwordErrorElement = screen.queryByText(
    /the password length should be great than 5/i
  );

  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords do not match/i
  );

  // 4. assertion
  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});
