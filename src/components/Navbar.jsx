import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Login / Register page-la sidebar vendaam
  if (pathname === '/login' || pathname === '/register' || pathname === '/admin') return null;

  // Dashboard-la sidebar left side-la
  const isDash = pathname.startsWith('/dashboard');
  const pos = isDash ? 'dash' : '';

  return (
    <>
      <div id="sideNav" className={`${pos} ${open ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
            <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link to="/categories" onClick={() => setOpen(false)}>Categories</Link></li>
            <li><Link to="/similar" onClick={() => setOpen(false)}>Similar Categories</Link></li>
            <li><Link to="/order" onClick={() => setOpen(false)}>Order Details</Link></li>
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