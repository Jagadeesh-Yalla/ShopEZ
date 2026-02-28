import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [recommended, setRecommended] = useState([]); // ✅ NEW STATE

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 4));

        // ✅ Filter bangles & fashion accessories
        const recommendedItems = data.filter(
          (item) =>
            item.category?.toLowerCase().includes("bangle") ||
            item.category?.toLowerCase().includes("accessory") ||
            item.category?.toLowerCase().includes("fashion")
        );

        setRecommended(recommendedItems.slice(0, 4));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero-clean">
        <div className="hero-content">
          <h1>
            Shop<span>EZ</span>
          </h1>

          <h2>One-Stop Shop for Online Purchases</h2>

          <p>
            Experience effortless product discovery, personalized
            recommendations, and a seamless checkout process.
            Shop smart. Shop secure. Shop with confidence.
          </p>

          <button onClick={() => navigate("/products")}>
            Start Shopping
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Why Choose ShopEZ?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Effortless Product Discovery</h3>
            <p>
              Browse through a wide range of categories with smart filters
              to quickly find exactly what you need.
            </p>
          </div>

          <div className="feature-card">
            <h3>Personalized Shopping Experience</h3>
            <p>
              Get product recommendations tailored to your preferences
              and shopping history.
            </p>
          </div>

          <div className="feature-card">
            <h3>Seamless Checkout Process</h3>
            <p>
              Complete your purchases securely with a smooth and
              efficient checkout system.
            </p>
          </div>

          <div className="feature-card">
            <h3>Efficient Order Management</h3>
            <p>
              Sellers manage orders easily through a streamlined
              dashboard for faster fulfillment.
            </p>
          </div>

          <div className="feature-card">
            <h3>Insightful Business Analytics</h3>
            <p>
              Access valuable insights and performance data to
              drive smarter business decisions.
            </p>
          </div>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="trending">
        <h2>Trending Products</h2>

        <div className="product-grid-clean">
          {products.map((product) => (
            <div
              key={product._id}
              className="product-card-clean"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={
                  product.image
                    ? product.image
                    : "https://via.placeholder.com/300x200?text=ShopEZ"
                }
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ NEW RECOMMENDED SECTION */}
      <section className="trending">
        <h2>Recommended For You</h2>

        <div className="product-grid-clean">
          {recommended.map((product) => (
            <div
              key={product._id}
              className="product-card-clean"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={
                  product.image
                    ? product.image
                    : "https://via.placeholder.com/300x200?text=ShopEZ"
                }
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <h2>Ready to Experience Smart Shopping?</h2>
        <p>
          Join thousands of users enjoying a fast, secure, and
          personalized shopping journey.
        </p>
        <button onClick={() => navigate("/products")}>
          Explore All Products
        </button>
      </section>

    </div>
  );
}

export default Home;