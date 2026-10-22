import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { cakes } from '../data/cakes';
import { gallery } from '../data/gallery';
import '../styles/categories.css';

export default function Gallery() {
  const { id } = useParams();
  const root = useRef(null);
  const cake = cakes.find((c) => c.id === Number(id));
  const photos = gallery[id] || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.title-text', { y: 40, opacity: 0, duration: 0.9 });
      gsap.from('.gallery-item', {
        scale: 0.85,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.3,
      });
    }, root);
    return () => ctx.revert();
  }, [id]);

  if (!cake) {
    return (
      <section id="Gallery">
        <div className="title-text">
          <h1>Cake not found</h1>
        </div>
        <Link className="back-link" to="/similar">← Back to Similar Categories</Link>
      </section>
    );
  }

  return (
    <section id="Gallery" ref={root}>
      <div className="title-text">
        <p>{cake.name}</p>
        <h1>More Designs</h1>
      </div>

      <div className="gallery-grid">
        {photos.map((file) => (
          <div className="gallery-item" key={file}>
            <img src={`/images/${file}`} alt={cake.name} />
          </div>
        ))}
      </div>

      <Link className="back-link" to="/similar">← Back to Similar Categories</Link>
    </section>
  );
}