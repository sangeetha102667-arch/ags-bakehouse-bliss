import { useState } from 'react';
import '../styles/login.css';

export default function Login() {
  const [mode, setMode] = useState('login');

  const handleSubmit = (e) => {
    e.preventDefault();
    // backend connect pannum bodhu inga API call varum
  };

  return (
    <section id="Login">
      <div className="title-text">
        <p>Login</p>
        <h1>We Provide Better</h1>
      </div>

      <div className="container">
        {mode === 'login' ? (
          <form className="form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <input type="email" id="login-email" name="email" required />
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input type="password" id="login-password" name="password" required />
            </div>
            <button className="btn" type="submit">Login</button>
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setMode('register'); }}>
                Register
              </a>
            </p>
          </form>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="input-group">
              <label htmlFor="register-name">Name</label>
              <input type="text" id="register-name" name="name" required />
            </div>
            <div className="input-group">
              <label htmlFor="register-email">Email</label>
              <input type="email" id="register-email" name="email" required />
            </div>
            <div className="input-group">
              <label htmlFor="register-password">Password</label>
              <input type="password" id="register-password" name="password" required />
            </div>
            <button className="btn" type="submit">Register</button>
            <p>
              Already have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setMode('login'); }}>
                Login
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}