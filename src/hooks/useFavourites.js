import { useCallback, useEffect, useState } from 'react';

const API = 'http://localhost:5000/api/favourites';

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export function useFavourites() {
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setFavs([]);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(API, { headers: headers() });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFavs(
        data.map((c) => ({
          id: c._id,
          name: c.name,
          price: c.price,
          img: c.image,
          desc: c.description,
          available: c.available,
        }))
      );
      setError('');
    } catch {
      setError('Cannot load favourites. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const isFav = (id) => favs.some((f) => f.id === id);

  const toggle = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: isFav(id) ? 'DELETE' : 'POST',
        headers: headers(),
      });
      if (res.ok) {
        await load();
      } else {
        setError('Please logout and login again.');
      }
    } catch {
      setError('Cannot connect to server.');
    }
  };

  return { favs, isFav, toggle, loading, error };
}