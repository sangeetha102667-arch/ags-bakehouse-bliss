import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/payment.css';

export default function Payment() {
  const root = useRef(null);
  const { state } = useLocation();
  const order = state?.order;
  const orderId = state?.order?.orderId;

  const [method, setMethod] = useState('cod');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!orderId) {
      setError('No order found. Please place your order first.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/payment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethod: method }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Could not save payment.');
      } else {
        setDone(true);
      }
    } catch {
      setError('Cannot connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.title-text', { y: 40, opacity: 0, duration: 0.9 });
      gsap.from('.pay-form', { y: 50, opacity: 0, duration: 0.9, delay: 0.3 });
    }, root);
    return () => ctx.revert();
  }, [done]);

  if (done) {
    return (
      <section id="Payment" ref={root}>
        <div className="title-text">
          <p>Payment</p>
          <h1>Thank You!</h1>
        </div>

        <div className="pay-wrap">
          <div className="pay-form pay-done">
            <h2>Order placed successfully</h2>
            <p>
              Payment method: <b>{method === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</b>
            </p>
            <Link to="/" className="pay-link">Back to Home</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="Payment" ref={root}>
      <div className="title-text">
        <p>Payment</p>
        <h1>Quick Checkout</h1>
      </div>

      <div className="pay-wrap">
        <form className="pay-form" onSubmit={handleSubmit}>
          {order ? (
            <div className="pay-summary">
              <h3 className="pay-title">Order Summary</h3>
              <p><span>Cake:</span> {order.cakeType}</p>
              <p><span>Size:</span> {order.size}</p>
              <p><span>Delivery date:</span> {order.deliveryDate}</p>
              {order.message && <p><span>Message:</span> {order.message}</p>}
            </div>
          ) : (
            <p className="pay-note">
              No order details. <Link to="/order">Go to the Order page.</Link>
            </p>
          )}

          <div className="pay-row">
            <div className="pay-col">
              <h3 className="pay-title">Billing Address</h3>
              <div className="field">
                <span>Full Name</span>
                <input type="text" defaultValue={order?.name || ''} required />
              </div>
              <div className="field">
                <span>Email</span>
                <input type="email" defaultValue={order?.email || ''} required />
              </div>
              <div className="field">
                <span>Address</span>
                <input type="text" defaultValue={order?.address || ''} required />
              </div>
              <div className="field">
                <span>City</span>
                <input type="text" placeholder="Hatton" required />
              </div>
              <div className="pay-flex">
                <div className="field">
                  <span>Province</span>
                  <input type="text" placeholder="Central" />
                </div>
                <div className="field">
                  <span>Postal Code</span>
                  <input type="text" placeholder="22000" />
                </div>
              </div>
            </div>

            <div className="pay-col">
              <h3 className="pay-title">Payment Method</h3>

              <label className={`method ${method === 'cod' ? 'on' : ''}`}>
                <input type="radio" name="method" checked={method === 'cod'} onChange={() => setMethod('cod')} />
                Cash on Delivery
              </label>

              <label className={`method ${method === 'bank' ? 'on' : ''}`}>
                <input type="radio" name="method" checked={method === 'bank'} onChange={() => setMethod('bank')} />
                Bank Transfer
              </label>

              {method === 'bank' && (
                <div className="bank-info">
                  <p><span>Bank:</span> BOC</p>
                  <p><span>Account Name:</span> A.Sangeetha</p>
                  <p><span>Account No:</span> 123654789</p>
                  <div className="field">
                    <span>Upload payment receipt</span>
                    <input type="file" accept="image/*,.pdf" required />
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && <p style={{ color: '#d6336c', marginTop: '12px' }}>{error}</p>}

          <button type="submit" className="pay-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Place Order'}
          </button>
        </form>
      </div>
    </section>
  );
}