import { useEffect, useState } from 'react';

const API = 'http://localhost:5000/api/cakes';

export function useCakes() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (cancelled) return;
        setCakes(
          data.map((c) => ({
            id: c._id,
            name: c.name,
            price: c.price,
            img: c.image,
            desc: c.description,
            available: c.available,
            featured: c.featured,
          }))
        );
      } catch {
        if (!cancelled) setError('Cannot load cakes. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { cakes, loading, error };
}