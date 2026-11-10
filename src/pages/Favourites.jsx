import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useFavourites } from '../hooks/useFavourites';
import '../styles/favourites.css';

export default function Favourites() {
  const { favs, toggle, loading, error } = useFavourites();

  return (
    <section id="Favourites">
      <div className="fv-title">
        <p>My Favourites</p>
        <h1>Cakes You Love</h1>
      </div>

      <div className="fv-wrap">
        {loading && <p className="fv-note">Loading...</p>}
        {error && <p className="fv-error">{error}</p>}

        {!loading && !error && favs.length === 0 && (
          <p className="fv-note">
            No favourites yet. <Link to="/categories">Browse cakes</Link> and tap the heart.
          </p>
        )}

        <div className="fv-grid">
          {favs.map((c) => (
            <div className="fv-card" key={c.id}>
              <img src={c.img || '/images/c4.jpg'} alt={c.name} />
              <div className="fv-body">
                <h3>{c.name}</h3>
                <p className="fv-price">Rs.{c.price}</p>
                {!c.available && <p className="fv-na">Not available now</p>}
                <div className="fv-actions">
                  <Link to="/order" className="fv-order">Order</Link>
                  <button
                    type="button"
                    className="fv-remove"
                    onClick={() => toggle(c.id)}
                    aria-label="Remove from favourites"
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}