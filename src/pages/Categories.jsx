import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cakes } from '../data/cakes';
import '../styles/categories.css';

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const root = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.title-text', { y: 40, opacity: 0, duration: 0.9 });

      gsap.set('.single-service', { opacity: 0, y: 50 });
      ScrollTrigger.batch('.single-service', {
        start: 'top 92%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="Categories" ref={root}>
      <div className="title-text">
        <p>Categories</p>
        <h1>We Provide Better</h1>
      </div>

      <div className="Categories-box">
        {cakes.map((c) => (
          <div
            key={c.id}
            className={`single-service ${active === c.id ? 'active' : ''}`}
            onClick={() => setActive(active === c.id ? null : c.id)}
          >
            <img src={c.img} alt={c.name} />
            <div className="overlay"></div>
            <div className="service-desc">
              <h3>{c.name}</h3>
              <hr />
              <p>
                {c.desc}
                <br /><br />
                <b><i>Rs.{c.price}</i></b>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}