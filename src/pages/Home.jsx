import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Logo from '../components/Logo';
import '../styles/style.css';

// 
const slides = ['/images/hp7.jpeg', '/images/hp8.jpeg', '/images/hp9.jpeg', '/images/hp11.jpeg','/images/hp10.jpeg'];

export default function Home() {
  const root = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // GSAP text animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.logo', { scale: 0, rotation: -20, duration: 0.8, ease: 'back.out(1.7)' });
      gsap.from('.banner-text h1', { y: 60, opacity: 0, duration: 1 });
      gsap.from('.banner-text p', { y: 40, opacity: 0, duration: 1, delay: 0.3 });
      gsap.from('.banner-btn a', { y: 30, opacity: 0, duration: 0.8, delay: 0.6, stagger: 0.2 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="banner" ref={root}>
      {slides.map((src, i) => (
        <div
          key={src}
          className={`hero-slide ${i === current ? 'active' : ''}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url('${src}')`,
          }}
        />
      ))}

      <div className="main">
        <div className="navbar">
          <div className="icon">
            <div className="logo"><Logo size={50} /></div>
            <div className="banner-text">
              <h1>AGS Bakehouse Bliss</h1>
              <p>
                At AGS Bakehouse Bliss, we believe that every celebration deserves a
                delicious centerpiece.<br /> Specializing in custom cakes for all occasions
                birthdays, weddings, anniversaries, <br />and more we combine artistry and
                flavor to create unforgettable treats.
              </p>
              <div className="banner-btn">
                <Link to="/categories"><span></span>Order Now</Link>
                <Link to="/about"><span></span>Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}