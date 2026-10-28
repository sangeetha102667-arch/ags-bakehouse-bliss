import { useEffect, useState } from 'react';
import '../styles/admin.css';

const API = 'http://localhost:5000/api/orders';
const STATUSES = ['Pending', 'Confirmed', 'Delivered', 'Cancelled'];

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      if (!res.ok) throw new Error();
      setOrders(await res.json());
      setError('');
    } catch {
      setError('Cannot load orders. Check that the server and database are running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    loadOrders();
  };

  const removeOrder = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadOrders();
  };

  return (
    <section id="Admin">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className="active">Orders</li>
          <li>Cakes</li>
          <li>Customers</li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Orders</h1>
        <p className="admin-count">Total orders: {orders.length}</p>

        {loading && <p>Loading...</p>}
        {error && <p className="admin-error">{error}</p>}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Cake</th>
                <th>Size</th>
                <th>Delivery</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.name}</td>
                  <td>{o.phone}</td>
                  <td>{o.cakeType}</td>
                  <td>{o.size}</td>
                  <td>{o.deliveryDate}</td>
                  <td>
                    <select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)}>
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="del-btn" onClick={() => removeOrder(o._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {!loading && orders.length === 0 && !error && (
                <tr><td colSpan="7">No orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
}