import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Login / Register / Admin skip
  if (pathname === '/login' || pathname === '/register' || pathname === '/admin') return null;

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setOpen(false);
    navigate('/');
  };

  const isDash = pathname.startsWith('/dashboard');
  const pos = isDash ? 'dash' : '';

  return (
    <>
      <div id="sideNav" className={`${pos} ${open ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
            {user && (
              <li><a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a></li>
            )}
            <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link to="/categories" onClick={() => setOpen(false)}>Categories</Link></li>
            <li><Link to="/similar" onClick={() => setOpen(false)}>Similar Categories</Link></li>
            <li><Link to="/order" onClick={() => setOpen(false)}>Order Details</Link></li>
            <li><Link to="/my-orders" onClick={() => setOpen(false)}>My Orders</Link></li>
            <li><Link to="/favourites" onClick={() => setOpen(false)}>Favourites</Link></li>
            <li><Link to="/feedback" onClick={() => setOpen(false)}>Feedback</Link></li>
            <li><Link to="/payment" onClick={() => setOpen(false)}>Payment</Link></li>
            <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
          </ul>
        </nav>
      </div>
      <div id="menuBtn" className={pos} onClick={() => setOpen(!open)}>
        <img src={open ? '/images/close.png' : '/images/menu.png'} id="menu" alt="menu" />
      </div>
    </>
  );
}