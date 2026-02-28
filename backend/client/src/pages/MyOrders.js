import { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const response = await fetch(
          "http://localhost:5000/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          const sortedOrders = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setOrders(sortedOrders);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Delivered") return "#22c55e";
    if (status === "Shipped") return "#3b82f6";
    return "#f59e0b";
  };

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>🧾 My Orders</h2>

      {loading ? (
        <div style={centerStyle}>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div style={centerStyle}>No orders found 😢</div>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={orderCard}>

            {/* HEADER */}
            <div style={orderHeader}>
              <div>
                <h4 style={{ margin: 0 }}>Order ID</h4>
                <p style={orderIdStyle}>{order._id}</p>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0 }}>
                  🗓 {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <h3 style={totalStyle}>₹{order.totalPrice}</h3>
              </div>
            </div>

            {/* STATUS BADGES */}
            <div style={badgeContainer}>
              <span
                style={{
                  ...badgeStyle,
                  background: getStatusColor(order.orderStatus),
                }}
              >
                {order.orderStatus || "Processing"}
              </span>

              <span
                style={{
                  ...badgeStyle,
                  background: order.isPaid ? "#22c55e" : "#ef4444",
                }}
              >
                {order.isPaid ? "Paid" : "Not Paid"}
              </span>
            </div>

            {/* SHIPPING + PAYMENT */}
            <div style={infoSection}>
              <div style={infoBox}>
                <h4>🚚 Shipping Address</h4>
                {order.shippingAddress ? (
                  <p style={infoText}>
                    {order.shippingAddress.address} <br />
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode} <br />
                    {order.shippingAddress.country}
                  </p>
                ) : (
                  <p style={{ color: "#888" }}>Not available</p>
                )}
              </div>

              <div style={infoBox}>
                <h4>💳 Payment Method</h4>
                <p style={infoText}>
                  {order.paymentMethod || "Not specified"}
                </p>
              </div>
            </div>

            {/* ORDER ITEMS */}
            <h4 style={{ marginTop: "25px" }}>📦 Order Items</h4>

            <div style={{ marginTop: "10px" }}>
              {order.orderItems.map((item, index) => (
                <div key={index} style={itemCard}>
                  <div>
                    <strong>{item.name}</strong>
                    <p style={{ margin: 0 }}>
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
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

const centerStyle = {
  textAlign: "center",
  marginTop: "100px",
};

const orderCard = {
  background: "white",
  padding: "30px",
  marginBottom: "30px",
  borderRadius: "20px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
};

const orderHeader = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "20px",
};

const orderIdStyle = {
  fontSize: "12px",
  color: "#666",
  wordBreak: "break-all",
};

const totalStyle = {
  color: "#ff6b00",
  margin: "5px 0 0 0",
};

const badgeContainer = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
};

const badgeStyle = {
  color: "white",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "600",
};

const infoSection = {
  display: "flex",
  gap: "40px",
  flexWrap: "wrap",
  marginTop: "20px",
};

const infoBox = {
  flex: 1,
  minWidth: "250px",
};

const infoText = {
  lineHeight: "1.6",
  color: "#444",
};

const itemCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#f9fafb",
  padding: "12px 15px",
  borderRadius: "12px",
  marginBottom: "10px",
};

export default MyOrders;