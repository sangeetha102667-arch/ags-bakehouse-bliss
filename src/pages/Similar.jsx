import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { cakes } from '../data/cakes';
import '../styles/categories.css';

const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 19];

export default function Similar() {
  const root = useRef(null);
  const items = ids.map((id) => cakes.find((c) => c.id === id));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.title-text', { y: 40, opacity: 0, duration: 0.9 });
      gsap.from('.similar-item', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.3,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="Similar" ref={root}>
      <div className="title-text">
        <p>Similar Categories</p>
        <h1>We Provide Better</h1>
      </div>

      <div className="similar-grid">
        {items.map((c) => (
          <Link to={`/similar/${c.id}`} className="similar-item" key={c.id}>
            <img src={c.img} alt={c.name} className="image-link" />
            <span>{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}