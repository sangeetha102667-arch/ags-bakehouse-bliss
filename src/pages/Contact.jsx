import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/contact.css';

export default function Contact() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.title-text', { y: 40, opacity: 0, duration: 0.9 });
      gsap.from('.footer-left', { x: -60, opacity: 0, duration: 0.9, delay: 0.3 });
      gsap.from('.footer-right', { x: 60, opacity: 0, duration: 0.9, delay: 0.3 });
      gsap.from('.social-media a', { scale: 0, duration: 0.6, delay: 0.7, stagger: 0.2, ease: 'back.out(2)' });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="Contact" ref={root}>
      <div className="title-text">
        <p>Contact</p>
        <h1>Visit Shop Today</h1>
      </div>

      <div className="footer-row">
        <div className="footer-left">
          <h1>Opening hours</h1>
          <p>Monday to Friday - 9am to 9pm</p>
          <p>Saturday to Sunday - 8am to 11pm</p>
        </div>
        <div className="footer-right">
          <h1>Get In Touch</h1>
          <p>Kirkoswald Lower Division, Bogawanthalawa.</p>
          <p>alagudhuraisangeetha2@gmail.com</p>
          <p>070-5646157</p>
        </div>
      </div>

      <div className="social-media">
        <a href="https://www.instagram.com/Dedicated_Diaries" target="_blank" rel="noreferrer" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://wa.me/+94769261328" target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </section>
  );
}