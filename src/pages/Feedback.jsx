import { useEffect, useState } from 'react';
import '../styles/feedback.css';

const API = 'http://localhost:5000/api/feedback';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const loadList = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error();
      setList(await res.json());
    } catch {
      setError('Cannot load feedback right now.');
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!rating) {
      setError('Please select a rating.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();

      if (res.status === 401) {
        setError('Please logout and login again.');
      } else if (!res.ok) {
        setError(data.message || 'Could not send feedback.');
      } else {
        setSuccess('Thank you for your feedback!');
        setRating(0);
        setComment('');
        loadList();
      }
    } catch {
      setError('Cannot connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '');

  return (
    <section id="Feedback">
      <div className="fb-title">
        <p>Feedback</p>
        <h1>Tell Us What You Think</h1>
      </div>

      <div className="fb-wrap">
        <form className="fb-form" onSubmit={handleSubmit}>
          <h3>Your Rating</h3>
          <div className="fb-stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                className={n <= rating ? 'on' : ''}
                onClick={() => setRating(n)}
                aria-label={`${n} star`}
              >
                ★
              </button>
            ))}
          </div>

          <h3>Your Comment</h3>
          <textarea
            rows="4"
            maxLength="500"
            placeholder="Share your experience with our cakes and service"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          {error && <p className="fb-error">{error}</p>}
          {success && <p className="fb-success">{success}</p>}

          <button type="submit" className="fb-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Submit Feedback'}
          </button>
        </form>

        <div className="fb-list">
          <h3>What Our Customers Say</h3>
          {list.length === 0 && <p className="fb-note">No feedback yet. Be the first!</p>}
          {list.map((f) => (
            <div className="fb-card" key={f._id}>
              <div className="fb-head">
                <b>{f.name}</b>
                <span className="fb-rate">{stars(f.rating)}</span>
              </div>
              <p>{f.comment}</p>
              <small>{formatDate(f.createdAt)}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}