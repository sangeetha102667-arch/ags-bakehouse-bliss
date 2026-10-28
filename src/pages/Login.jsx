import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const API = 'http://localhost:5000/api/auth';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const data = Object.fromEntries(new FormData(e.target));
    const url = mode === 'login' ? `${API}/login` : `${API}/register`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        setMessage(result.message || 'Something went wrong');
      } else if (mode === 'register') {
        setMessage('Registered successfully! Please login.');
        setMode('login');
      } else {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/');
      }
    } catch (err) {
      setMessage('Cannot connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
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
            {message && <p style={{ color: '#e5127d' }}>{message}</p>}
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : 'Login'}
            </button>
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setMessage(''); setMode('register'); }}>
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
              <input type="password" id="register-password" name="password" required minLength={6} />
            </div>
            {message && <p style={{ color: '#e5127d' }}>{message}</p>}
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : 'Register'}
            </button>
            <p>
              Already have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setMessage(''); setMode('login'); }}>
                Login
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}