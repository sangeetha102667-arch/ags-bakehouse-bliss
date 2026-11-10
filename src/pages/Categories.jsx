import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCakes } from '../hooks/useCakes';
import { useFavourites } from '../hooks/useFavourites';
import '../styles/categories.css';

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const root = useRef(null);
  const [active, setActive] = useState(null);
  const { cakes, loading, error } = useCakes();
  const { isFav, toggle } = useFavourites();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.title-text', { y: 40, opacity: 0, duration: 0.9 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.set('.single-service', { opacity: 0, y: 50 });
      ScrollTrigger.batch('.single-service', {
        start: 'top 92%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }),
      });
    }, root);
    return () => ctx.revert();
  }, [loading]);

  return (
    <section id="Categories" ref={root}>
      <div className="title-text">
        <p>Categories</p>
        <h1>We Provide Better</h1>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Loading cakes...</p>}
      {error && <p style={{ textAlign: 'center', color: '#d6336c' }}>{error}</p>}

      <div className="Categories-box">
        {cakes.map((c) => (
          <div
            key={c.id}
            className={`single-service ${active === c.id ? 'active' : ''}`}
            onClick={() => setActive(active === c.id ? null : c.id)}
          >
            <img src={c.img || '/images/c4.jpg'} alt={c.name} />
            <div className="overlay"></div>

            <button
              type="button"
              className={`fav-btn ${isFav(c.id) ? 'on' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggle(c.id);
              }}
              aria-label={isFav(c.id) ? 'Remove from favourites' : 'Add to favourites'}
            >
              {isFav(c.id) ? <FaHeart /> : <FaRegHeart />}
            </button>

            <div className="service-desc">
              <h3>{c.name}</h3>
              <hr />
              <p>
                {c.desc}
                <br /><br />
                <b><i>Rs.{c.price}</i></b>
                {!c.available && (
                  <>
                    <br />
                    <b>Not available now</b>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}