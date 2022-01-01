import logo from './logo.svg';
import './App.css';

function App() {
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
            className="form-control"
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
            className="form-control"
          />
        </div>
      </form>
    </div>
  );
}

export default App;
