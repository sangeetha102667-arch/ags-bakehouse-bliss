import '../styles/about.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {

const root = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.title-text', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      scrollTrigger: { trigger: '.title-text', start: 'top 85%' },
    });

    gsap.utils.toArray('.About-desc').forEach((el) => {
      gsap.from(el, {
        x: -60,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    gsap.from('.About-img img', {
      x: 80,
      opacity: 0,
      scale: 0.9,
      duration: 1,
      scrollTrigger: { trigger: '.About-img', start: 'top 85%' },
    });
  }, root);

  return () => ctx.revert();
}, []);

  return (
    <section id="About" ref={root}>
      <div className="title-text">
        <p>About</p>
        <h1>Believe. Achieve. Succeed.</h1>
      </div>
      <div className="About-box">
        <div className="About">
          <h1>Our Story</h1>
          <div className="About-desc">
            <div className="About-text">
              <p>
                At AGS Bakehouse Bliss, we believe that every celebration deserves a
                delicious centerpiece. Founded in 2024, our passion for baking began in ssS.
                From humble beginnings in our home kitchen, we've grown into a dedicated team of
                cake artists committed to crafting unforgettable desserts.
              </p>
            </div>
          </div>
          <h1>Our Mission</h1>
          <div className="About-desc">
            <div className="About-text">
              <p>
                We strive to bring joy to every occasion with our handcrafted cakes,
                made from the finest ingredients. Our mission is to create not just cakes, but
                experiences that bring people together.
              </p>
            </div>
          </div>
          <h1>Contact Us</h1>
          <div className="About-desc">
            <div className="About-text">
              <p>
                Have questions or special requests? We're here to help! Reach out to us at{' '}
                <a href="mailto:alagudhuraisangeetha2@gmail.com">alagudhuraisangeetha2@gmail.com</a>{' '}
                or <br />070-5646157.
              </p>
            </div>
          </div>
        </div>
        <div className="About-img">
          <img src="/images/s6.jpeg" alt="AGS Bakehouse Bliss" />
        </div>
      </div>
    </section>
  );
}