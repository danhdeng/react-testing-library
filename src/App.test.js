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
  render(<App />);
});

afterEach(() => {
  console.log('after each test');
});

test('textbox intial value should be empty', () => {
  // 1. rendering the component that we want to test
  // render(<App />);

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
  // 1. rendering the component that we want to test
  // render(<App />);

  // 2. find the element that we want to test
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });

  // 3. use the user event to simulate the test
  userEvent.type(emailInputElement, 'dan@test.com');

  // 4. assertion
  expect(emailInputElement.value).toBe('dan@test.com');
});

test('user should be able to type an password', () => {
  // 1. rendering the component that we want to test
  // render(<App />);

  // 2. find the element that we want to test
  const passwordInputElement = screen.getByLabelText('Password');

  // 3. use the user event to simulate the test
  userEvent.type(passwordInputElement, 'password1234');

  // 4. assertion
  expect(passwordInputElement.value).toBe('password1234');
});

test('user should be able to type a confirm password', () => {
  // 1. rendering the component that we want to test
  // render(<App />);

  // 2. find the element that we want to test
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  // 3. use the user event to simulate the test
  userEvent.type(confirmPasswordInputElement, 'password1234');

  // 4. assertion
  expect(confirmPasswordInputElement.value).toBe('password1234');
});

test('should show error message for invalid email', () => {
  // 1. rendering the component that we want to test
  // render(<App />);

  let emailErrorElement = screen.queryByText(/the email you input is invalid/i);

  expect(emailErrorElement).not.toBeInTheDocument();
  // 2. find the element that we want to test
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });

  // 3. use the user event to simulate the test
  userEvent.type(emailInputElement, 'dantest.com');

  userEvent.click(submitBtnElement);

  emailErrorElement = screen.queryByText(/the email you input is invalid/i);

  // 4. assertion
  expect(emailErrorElement).toBeInTheDocument();
});

test('the password length should be great than 5', () => {
  // 1. rendering the component that we want to test
  // render(<App />);

  let passErrorElement = screen.queryByText(
    /the password length should be great than 5/i
  );

  expect(passErrorElement).not.toBeInTheDocument();
  // 2. find the element that we want to test
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  const passwordInputElement = screen.getByLabelText('Password');

  // 3. use the user event to simulate the test
  userEvent.type(passwordInputElement, '1234');
  userEvent.type(emailInputElement, 'dantest@test.com');

  userEvent.click(submitBtnElement);

  passErrorElement = screen.queryByText(
    /the password length should be great than 5/i
  );

  // 4. assertion
  expect(passErrorElement).toBeInTheDocument();
});

test('the confirm password does not match', () => {
  // 1. rendering the component that we want to test
  // render(<App />);

  let confirmPasswordErrorElement = screen.queryByText(
    /the passwords do not match/i
  );

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
  // 2. find the element that we want to test
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  // 3. use the user event to simulate the test
  userEvent.type(confirmPasswordInputElement, 'password123');
  userEvent.type(passwordInputElement, 'password1234');
  userEvent.type(emailInputElement, 'dantest@test.com');

  userEvent.click(submitBtnElement);

  confirmPasswordErrorElement = screen.queryByText(
    /the passwords do not match/i
  );

  // 4. assertion
  expect(confirmPasswordErrorElement).toBeInTheDocument();
});

test('should pass all the tests', () => {
  // 1. rendering the component that we want to test
  // render(<App />);

  // 2. find the element that we want to test
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  // 3. use the user event to simulate the test
  userEvent.type(confirmPasswordInputElement, 'password1234');
  userEvent.type(passwordInputElement, 'password1234');
  userEvent.type(emailInputElement, 'dantest@test.com');

  userEvent.click(submitBtnElement);

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
