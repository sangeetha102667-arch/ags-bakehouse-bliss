import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const API = 'http://localhost:5000/api/orders';
const USERS_API = 'http://localhost:5000/api/users';
const CAKES_API = 'http://localhost:5000/api/cakes';
const FEEDBACK_API = 'http://localhost:5000/api/feedback';
const STATUSES = ['Pending', 'Confirmed', 'Delivered', 'Cancelled'];

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('orders');

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [cakes, setCakes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [cakeForm, setCakeForm] = useState({ name: '', price: '', image: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const authError = 'Please logout and login again as admin.';

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

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(USERS_API, { headers: authHeaders() });
      if (res.status === 401 || res.status === 403) {
        setError(authError);
        return;
      }
      if (!res.ok) throw new Error();
      setUsers(await res.json());
      setError('');
    } catch {
      setError('Cannot load customers. Check that the server and database are running.');
    } finally {
      setLoading(false);
    }
  };

  const loadCakes = async () => {
    try {
      setLoading(true);
      const res = await fetch(CAKES_API);
      if (!res.ok) throw new Error();
      setCakes(await res.json());
      setError('');
    } catch {
      setError('Cannot load cakes. Check that the server and database are running.');
    } finally {
      setLoading(false);
    }
  };

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await fetch(FEEDBACK_API);
      if (!res.ok) throw new Error();
      setFeedbacks(await res.json());
      setError('');
    } catch {
      setError('Cannot load feedback. Check that the server and database are running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError('');
    if (tab === 'orders') loadOrders();
    if (tab === 'customers') loadUsers();
    if (tab === 'cakes') loadCakes();
    if (tab === 'feedback') loadFeedbacks();
  }, [tab]);

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

  const handleCakeChange = (e) =>
    setCakeForm({ ...cakeForm, [e.target.name]: e.target.value });

  const addCake = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(CAKES_API, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ ...cakeForm, price: Number(cakeForm.price) }),
      });
      if (res.status === 401 || res.status === 403) {
        setError(authError);
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Could not add cake.');
        return;
      }
      setCakeForm({ name: '', price: '', image: '', description: '' });
      loadCakes();
    } catch {
      setError('Cannot connect to server.');
    }
  };

  const toggleAvailable = async (cake) => {
    const res = await fetch(`${CAKES_API}/${cake._id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ available: !cake.available }),
    });
    if (res.status === 401 || res.status === 403) {
      setError(authError);
      return;
    }
    loadCakes();
  };

  const removeCake = async (id) => {
    if (!window.confirm('Delete this cake?')) return;
    const res = await fetch(`${CAKES_API}/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.status === 401 || res.status === 403) {
      setError(authError);
      return;
    }
    loadCakes();
  };

  const removeFeedback = async (id) => {
    if (!window.confirm('Delete this feedback?')) return;
    const res = await fetch(`${FEEDBACK_API}/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.status === 401 || res.status === 403) {
      setError(authError);
      return;
    }
    loadFeedbacks();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');
  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

  return (
    <section id="Admin">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>Orders</li>
          <li className={tab === 'cakes' ? 'active' : ''} onClick={() => setTab('cakes')}>Cakes</li>
          <li className={tab === 'customers' ? 'active' : ''} onClick={() => setTab('customers')}>Customers</li>
          <li className={tab === 'feedback' ? 'active' : ''} onClick={() => setTab('feedback')}>Feedback</li>
        </ul>

        <div className="admin-actions">
          <button type="button" className="side-btn" onClick={() => navigate('/')}>
            View Website
          </button>
          <button type="button" className="side-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {tab === 'orders' && (
          <>
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
                    <th>Payment</th>
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
                      <td>{o.paymentMethod === 'bank' ? 'Bank Transfer' : 'Cash on Delivery'}</td>
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
                    <tr><td colSpan="8">No orders yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'cakes' && (
          <>
            <h1>Cakes</h1>
            <p className="admin-count">Total cakes: {cakes.length}</p>

            <form className="cake-form" onSubmit={addCake}>
              <input name="name" placeholder="Cake name" value={cakeForm.name} onChange={handleCakeChange} required />
              <input name="price" type="number" min="0" placeholder="Price (Rs.)" value={cakeForm.price} onChange={handleCakeChange} required />
              <input name="image" placeholder="Image URL (optional)" value={cakeForm.image} onChange={handleCakeChange} />
              <input name="description" placeholder="Short description (optional)" value={cakeForm.description} onChange={handleCakeChange} />
              <button type="submit" className="add-btn">Add Cake</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="admin-error">{error}</p>}

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Availability</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cakes.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>Rs. {c.price}</td>
                      <td>{c.description || '-'}</td>
                      <td>
                        <button
                          type="button"
                          className={`avail-btn ${c.available ? 'on' : 'off'}`}
                          onClick={() => toggleAvailable(c)}
                        >
                          {c.available ? 'Available' : 'Not available'}
                        </button>
                      </td>
                      <td>
                        <button className="del-btn" onClick={() => removeCake(c._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {!loading && cakes.length === 0 && !error && (
                    <tr><td colSpan="5">No cakes added yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'customers' && (
          <>
            <h1>Customers</h1>
            <p className="admin-count">Total customers: {users.length}</p>

            {loading && <p>Loading...</p>}
            {error && <p className="admin-error">{error}</p>}

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role || 'user'}</td>
                      <td>{formatDate(u.createdAt)}</td>
                    </tr>
                  ))}
                  {!loading && users.length === 0 && !error && (
                    <tr><td colSpan="4">No customers yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'feedback' && (
          <>
            <h1>Feedback</h1>
            <p className="admin-count">Total feedback: {feedbacks.length}</p>

            {loading && <p>Loading...</p>}
            {error && <p className="admin-error">{error}</p>}

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((f) => (
                    <tr key={f._id}>
                      <td>{f.name}</td>
                      <td>{stars(f.rating)}</td>
                      <td>{f.comment}</td>
                      <td>{formatDate(f.createdAt)}</td>
                      <td>
                        <button className="del-btn" onClick={() => removeFeedback(f._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {!loading && feedbacks.length === 0 && !error && (
                    <tr><td colSpan="5">No feedback yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </section>
  );
}