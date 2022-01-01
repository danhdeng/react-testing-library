import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import validator from 'validator';

function App() {
  const [userSignUp, setUserSignUp] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setUserSignUp({ ...userSignUp, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validator.isEmail(userSignUp.email)) {
      setErrorMsg('the email you input is invalid');
    } else if (userSignUp.password.length < 5) {
      setErrorMsg('the password length should be great than 5');
    } else if (userSignUp.password !== userSignUp.confirmPassword) {
      setErrorMsg('the passwords do not match');
    }
  };
  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            placeholder="Email"
            id="email"
            type="email"
            className="form-control"
            name="email"
            value={userSignUp.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            placeholder="password"
            id="password"
            type="password"
            name="password"
            className="form-control"
            value={userSignUp.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            placeholder="confirm password"
            id="confirm-password"
            type="password"
            name="confirmPassword"
            className="form-control"
            value={userSignUp.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errorMsg && <p>{errorMsg}</p>}
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
