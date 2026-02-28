import { useEffect, useState } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo?.isAdmin) return;

    fetch("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  if (!userInfo?.isAdmin) {
    return <h2 style={{ padding: "40px" }}>Access Denied</h2>;
  }

  return (
    <div style={container}>
      <h1 style={title}>Admin Dashboard</h1>

      {/* Summary Cards */}
      <div style={cardContainer}>
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <p style={cardNumber}>{users.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p style={cardNumber}>{orders.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <p style={cardNumber}>₹{totalRevenue}</p>
        </div>
      </div>

      {/* Orders Table */}
      <h2 style={sectionTitle}>Manage Orders</h2>

      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={rowStyle}>
                <td style={tdStyle}>{order.user?.name}</td>
                <td style={tdStyle}>₹{order.totalPrice}</td>
                <td style={tdStyle}>
                  <span style={getStatusStyle(order.status)}>
                    {order.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  <select
                    style={selectStyle}
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ====== STYLES ====== */

const container = {
  padding: "50px",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
};

const title = {
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "30px",
};

const cardContainer = {
  display: "flex",
  gap: "25px",
  flexWrap: "wrap",
};

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "16px",
  flex: "1",
  minWidth: "220px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  textAlign: "center",
};

const cardNumber = {
  fontSize: "28px",
  fontWeight: "700",
  marginTop: "10px",
  color: "#ff6b00",
};

const sectionTitle = {
  marginTop: "50px",
  marginBottom: "20px",
  fontSize: "22px",
  fontWeight: "600",
};

const tableWrapper = {
  background: "white",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  overflow: "hidden",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "18px",
  background: "#111827",
  color: "white",
  textAlign: "left",
  fontSize: "14px",
};

const tdStyle = {
  padding: "16px",
  borderBottom: "1px solid #f1f1f1",
};

const rowStyle = {
  transition: "0.2s ease",
};

const selectStyle = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  cursor: "pointer",
};

const getStatusStyle = (status) => {
  let color = "#f59e0b";

  if (status === "Shipped") color = "#3b82f6";
  if (status === "Delivered") color = "#10b981";

  return {
    background: color,
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  };
};

export default AdminDashboard;