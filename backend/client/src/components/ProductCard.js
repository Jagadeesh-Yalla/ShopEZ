import React from "react";

function ProductCard({ product, addToCart }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h3>{product.name}</h3>
      <p style={{ color: "green", fontWeight: "bold" }}>
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        style={{
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Add to Cart 🛒
      </button>
    </div>
  );
}

export default ProductCard;