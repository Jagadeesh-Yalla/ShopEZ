import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (!user) return;

        setUserInfo(user);

        const res = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        setCartItems(data);
      } catch (error) {
        console.log("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) return;

      await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const res = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      setCartItems(data);
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.product?.price || 0) * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      if (!userInfo) {
        alert("Please login first");
        return;
      }

      if (!address || !city || !postalCode || !country) {
        alert("Please fill all shipping details");
        return;
      }

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems.map((item) => ({
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            product: item.product._id,
          })),
          shippingAddress: {
            address,
            city,
            postalCode,
            country,
          },
          paymentMethod,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order failed");
      }

      alert("Order placed successfully ✅");
      setCartItems([]);
      setAddress("");
      setCity("");
      setPostalCode("");
      setCountry("");
    } catch (error) {
      console.error(error);
      alert("Order failed ❌");
    }
  };

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div style={emptyStyle}>
          <h3>Your cart is empty 😢</h3>
        </div>
      ) : (
        <div style={layoutStyle}>
          {/* LEFT SIDE - CART ITEMS */}
          <div style={itemsSection}>
            {cartItems.map((item) => (
              <div key={item._id} style={cardStyle}>
                <img
                  src={
                    item.product?.image ||
                    "https://via.placeholder.com/120x120?text=ShopEZ"
                  }
                  alt={item.product?.name}
                  style={imageStyle}
                />

                <div style={{ flex: 1 }}>
                  <h3>{item.product?.name}</h3>
                  <p style={{ color: "#ff6b00", fontWeight: "600" }}>
                    ₹{item.product?.price}
                  </p>

                  <div style={{ marginTop: "10px" }}>
                    <button
                      style={qtyBtn}
                      onClick={() => decreaseQty(item._id)}
                    >
                      -
                    </button>
                    <span style={{ margin: "0 12px", fontWeight: "600" }}>
                      {item.quantity}
                    </span>
                    <button
                      style={qtyBtn}
                      onClick={() => increaseQty(item._id)}
                    >
                      +
                    </button>
                  </div>

                  <p style={{ marginTop: "10px", fontWeight: "600" }}>
                    Subtotal: ₹
                    {Number(item.product?.price || 0) * item.quantity}
                  </p>

                  <button
                    style={removeBtn}
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div style={summarySection}>
            <h3>Order Summary</h3>
            <hr />
            <h2 style={{ color: "#ff6b00" }}>Total: ₹{totalPrice}</h2>

            <h3 style={{ marginTop: "20px" }}>Shipping Details 🚚</h3>

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={inputStyle}
            />

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={inputStyle}
            >
              <option value="Cash on Delivery">
                Cash on Delivery
              </option>
              <option value="Credit Card">Credit Card</option>
            </select>

            <button onClick={placeOrder} style={placeOrderBtn}>
              🚀 Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  padding: "80px 8%",
  background: "#f8fafc",
  minHeight: "100vh",
};

const titleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "40px",
};

const layoutStyle = {
  display: "flex",
  gap: "40px",
  flexWrap: "wrap",
};

const itemsSection = {
  flex: 2,
};

const summarySection = {
  flex: 1,
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
  height: "fit-content",
};

const cardStyle = {
  display: "flex",
  gap: "20px",
  background: "white",
  padding: "20px",
  borderRadius: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  marginBottom: "20px",
};

const imageStyle = {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "15px",
};

const qtyBtn = {
  padding: "6px 14px",
  borderRadius: "20px",
  border: "none",
  background: "#ff6b00",
  color: "white",
  cursor: "pointer",
};

const removeBtn = {
  marginTop: "10px",
  padding: "6px 14px",
  borderRadius: "20px",
  border: "none",
  background: "#ef4444",
  color: "white",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const placeOrderBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "14px",
  borderRadius: "30px",
  border: "none",
  background: "linear-gradient(45deg,#ff6b00,#ff8c32)",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

const emptyStyle = {
  textAlign: "center",
  marginTop: "100px",
};

export default Cart;