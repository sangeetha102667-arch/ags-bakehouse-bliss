import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { cakes } from '../data/cakes';
import '../styles/order.css';

export default function Order() {
  const root = useRef(null);
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cakeType: cakes[0].name,
    size: 'medium',
    message: '',
    deliveryDate: '',
    address: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { order: form } });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.title-text', { y: 40, opacity: 0, duration: 0.9 });
      gsap.from('.order-card', { y: 50, opacity: 0, duration: 0.9, delay: 0.3 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="Order" ref={root}>
      <div className="title-text">
        <p>Order Details</p>
        <h1>Precision and Care.</h1>
      </div>

      <div className="order-card">
        <header>
          <h2>Order Your Cake Online</h2>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name:</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />

          <label htmlFor="email">Email Address:</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />

          <label htmlFor="phone">Phone Number:</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />

          <label htmlFor="cakeType">Select Cake Type:</label>
          <select id="cakeType" name="cakeType" value={form.cakeType} onChange={handleChange} required>
            {cakes.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
            <option value="Custom Design">Custom Design</option>
          </select>

          <label htmlFor="size">Cake Size:</label>
          <select id="size" name="size" value={form.size} onChange={handleChange} required>
            <option value="small">Small (6")</option>
            <option value="medium">Medium (8")</option>
            <option value="large">Large (10")</option>
          </select>

          <label htmlFor="message">Special Message on Cake:</label>
          <textarea id="message" name="message" rows="3" placeholder="Enter your message here" value={form.message} onChange={handleChange} />

          <label htmlFor="deliveryDate">Delivery Date:</label>
          <input id="deliveryDate" name="deliveryDate" type="date" min={today} value={form.deliveryDate} onChange={handleChange} required />

          <label htmlFor="address">Delivery Address:</label>
          <textarea id="address" name="address" rows="3" placeholder="Enter delivery address" value={form.address} onChange={handleChange} required />

          <button type="submit">Continue to Payment</button>
        </form>
      </div>
    </section>
  );
}