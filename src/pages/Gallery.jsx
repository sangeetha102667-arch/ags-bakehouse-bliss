import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { cakes as oldCakes } from '../data/cakes';
import { gallery } from '../data/gallery';
import { useCakes } from '../hooks/useCakes';
import '../styles/categories.css';

// gallery.js number id-la irukku, adhai cake peyar-oda match pannurom
const photosByName = {};
Object.keys(gallery).forEach((key) => {
  const old = oldCakes.find((c) => c.id === Number(key));
  if (old) photosByName[old.name] = gallery[key];
});

export default function Gallery() {
  const { id } = useParams();
  const root = useRef(null);
  const { cakes, loading } = useCakes();
  const cake = cakes.find((c) => c.id === id);

  let photos = [];
  if (cake) {
    if (photosByName[cake.name]) {
      photos = photosByName[cake.name].map((f) => `/images/${f}`);
    } else if (cake.img) {
      photos = [cake.img];
    }
  }

  useEffect(() => {
    if (loading || !cake) return;
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
  }, [id, loading, cake?.id]);

  if (loading) {
    return (
      <section id="Gallery">
        <div className="title-text">
          <h1>Loading...</h1>
        </div>
      </section>
    );
  }

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
        {photos.map((src) => (
          <div className="gallery-item" key={src}>
            <img src={src} alt={cake.name} />
          </div>
        ))}
      </div>

      <Link className="back-link" to="/similar">← Back to Similar Categories</Link>
    </section>
  );
}