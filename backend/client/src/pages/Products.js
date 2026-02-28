import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  const navigate = useNavigate();

  const addToCart = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1,
        }),
      });

      await res.json();
      navigate("/cart");
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>🛍 Explore Products</h2>

      {/* SEARCH + SORT */}
      <div style={filterContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={inputStyle}
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div style={gridStyle}>
        {filteredProducts.map((product) => (
          <div
  key={product._id}
  style={cardStyle}
>
  {/* CLICKABLE IMAGE + NAME */}
  <div
    style={{ cursor: "pointer" }}
    onClick={() => navigate(`/product/${product._id}`)}
  >
    {/* IMAGE */}
    <div style={imageContainer}>
      <img
        src={
          product.image ||
          "https://via.placeholder.com/300x200?text=ShopEZ"
        }
        alt={product.name}
        style={imageStyle}
      />

      {/* PRICE BADGE */}
      <div style={priceBadge}>
        ₹{product.price}
      </div>
    </div>

    {/* PRODUCT NAME */}
    <h3 style={productName}>{product.name}</h3>
  </div>

  {/* ADD BUTTON (SEPARATE FROM NAVIGATION) */}
  <button
    onClick={() => addToCart(product._id)}
    style={buttonStyle}
  >
    ➕ Add To Cart
  </button>
</div>
        ))}
      </div>
    </div>
  );
}

export default Products;

/* ================== UI STYLES ================== */

const pageStyle = {
  padding: "70px 8%",
  background: "#f8fafc",
  minHeight: "100vh",
};

const titleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "30px",
};

const filterContainer = {
  display: "flex",
  gap: "20px",
  marginBottom: "40px",
  flexWrap: "wrap",
};

const inputStyle = {
  padding: "12px 18px",
  borderRadius: "30px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "30px",
};

const cardStyle = {
  background: "white",
  borderRadius: "20px",
  padding: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  transition: "0.3s",
  cursor: "pointer",
};

const imageContainer = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "15px",
};

const imageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  transition: "0.4s",
};

const priceBadge = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "#ff6b00",
  color: "white",
  padding: "6px 14px",
  borderRadius: "20px",
  fontWeight: "600",
  fontSize: "14px",
};

const productName = {
  marginTop: "15px",
  fontSize: "18px",
  fontWeight: "600",
};

const buttonStyle = {
  marginTop: "15px",
  width: "100%",
  padding: "10px",
  background: "linear-gradient(45deg,#ff6b00,#ff8c32)",
  color: "white",
  border: "none",
  borderRadius: "25px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.3s",
};