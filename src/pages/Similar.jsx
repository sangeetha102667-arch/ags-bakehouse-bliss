import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCakes } from '../hooks/useCakes';
import '../styles/categories.css';

export default function Similar() {
  const root = useRef(null);
  const { cakes, loading, error } = useCakes();
  const items = cakes.filter((c) => c.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.title-text', { y: 40, opacity: 0, duration: 0.9 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.from('.similar-item', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.1,
      });
    }, root);
    return () => ctx.revert();
  }, [loading]);

  return (
    <section id="Similar" ref={root}>
      <div className="title-text">
        <p>Similar Categories</p>
        <h1>We Provide Better</h1>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Loading cakes...</p>}
      {error && <p style={{ textAlign: 'center', color: '#d6336c' }}>{error}</p>}

      <div className="similar-grid">
        {items.map((c) => (
          <Link to={`/similar/${c.id}`} className="similar-item" key={c.id}>
            <img src={c.img || '/images/c4.jpg'} alt={c.name} className="image-link" />
            <span>{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}