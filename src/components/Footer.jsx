import { useLocation } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import '../styles/footer.css';

export default function Footer() {
  const { pathname } = useLocation();
  const hideFooter = ['/', '/login', '/register', '/admin'].includes(pathname);
  if (hideFooter) return null;

  return (
    <footer id="Footer">
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://wa.me/94705646157" target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <FaWhatsapp />
        </a>
      </div>

      <p className="footer-copy">
        &copy; {new Date().getFullYear()} AGS Bakehouse Bliss. All rights reserved.
      </p>
    </footer>
  );
}