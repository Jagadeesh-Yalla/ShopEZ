import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  const addToCart = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      await res.json();
      navigate("/cart");
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  if (!product)
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>Loading Product...</h2>
      </div>
    );

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        
        {/* IMAGE */}
        <div style={imageSection}>
          <img
            src={
              product.image
                ? product.image
                : "https://via.placeholder.com/400x400?text=ShopEZ"
            }
            alt={product.name}
            style={imageStyle}
          />
        </div>

        {/* DETAILS */}
        <div style={detailsSection}>
          <h1 style={titleStyle}>{product.name}</h1>
          <h2 style={priceStyle}>₹{product.price}</h2>
          <p style={descStyle}>{product.description}</p>
          <p style={stockStyle}>
            ✅ In Stock: {product.countInStock}
          </p>

          <button
            style={buttonStyle}
            onClick={addToCart}
          >
            🛒 Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const containerStyle = {
  padding: "80px 10%",
  background: "#f8fafc",
  minHeight: "100vh",
};

const cardStyle = {
  display: "flex",
  gap: "60px",
  alignItems: "center",
  background: "white",
  padding: "50px",
  borderRadius: "25px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
  flexWrap: "wrap",
};

const imageSection = {
  flex: 1,
  textAlign: "center",
};

const imageStyle = {
  width: "100%",
  maxWidth: "400px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const detailsSection = {
  flex: 1,
  minWidth: "300px",
};

const titleStyle = {
  fontSize: "36px",
  fontWeight: "700",
  marginBottom: "15px",
  color: "#111827",
};

const priceStyle = {
  fontSize: "28px",
  color: "#ff6b00",
  marginBottom: "20px",
};

const descStyle = {
  fontSize: "16px",
  color: "#4b5563",
  marginBottom: "20px",
  lineHeight: "1.6",
};

const stockStyle = {
  fontWeight: "600",
  color: "green",
  marginBottom: "30px",
};

const buttonStyle = {
  padding: "14px 28px",
  background: "#ff6b00",
  color: "white",
  border: "none",
  borderRadius: "30px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.3s",
};

const loaderStyle = {
  textAlign: "center",
  padding: "100px",
};

export default ProductDetails;