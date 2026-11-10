import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/myorders.css';

const API = 'http://localhost:5000/api/orders/my';
const STEPS = ['Pending', 'Confirmed', 'Delivered'];

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          setError('Please logout and login again.');
          return;
        }
        if (!res.ok) throw new Error();
        setOrders(await res.json());
      } catch {
        setError('Cannot load your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');

  return (
    <section id="MyOrders">
      <div className="mo-title">
        <p>My Orders</p>
        <h1>Track Your Orders</h1>
      </div>

      <div className="mo-wrap">
        {loading && <p className="mo-note">Loading...</p>}
        {error && <p className="mo-error">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p className="mo-note">
            No orders yet. <Link to="/order">Order a cake now.</Link>
          </p>
        )}

        {orders.map((o) => {
          const cancelled = o.status === 'Cancelled';
          const current = STEPS.indexOf(o.status);

          return (
            <div className="mo-card" key={o._id}>
              <div className="mo-head">
                <h3>{o.cakeType}</h3>
                <span className={`mo-badge ${cancelled ? 'cancelled' : ''}`}>{o.status}</span>
              </div>

              <p><b>Size:</b> {o.size}</p>
              <p><b>Delivery date:</b> {o.deliveryDate}</p>
              <p><b>Payment:</b> {o.paymentMethod === 'bank' ? 'Bank Transfer' : 'Cash on Delivery'}</p>
              <p><b>Ordered on:</b> {formatDate(o.createdAt)}</p>

              {cancelled ? (
                <p className="mo-cancel">This order was cancelled.</p>
              ) : (
                <div className="mo-steps">
                  {STEPS.map((s, i) => (
                    <div className={`mo-step ${i <= current ? 'done' : ''}`} key={s}>
                      <span className="mo-dot">{i <= current ? '✓' : i + 1}</span>
                      <span className="mo-label">{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}