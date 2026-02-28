import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(user);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cart");
    setUserInfo(null);
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <div
  style={{ ...logoStyle, cursor: "pointer" }}
  onClick={() => navigate("/")}
>
  Shop<span style={{ fontWeight: "800" }}>EZ</span>
</div>

      <div style={navLinks}>
        <Link style={linkStyle} to="/products">Products</Link>
        <Link style={linkStyle} to="/cart">Cart</Link>

        {userInfo && (
          <Link style={linkStyle} to="/myorders">My Orders</Link>
        )}

        {/* ✅ ADMIN DASHBOARD LINK */}
        {userInfo?.isAdmin && (
          <Link style={linkStyle} to="/admin/dashboard">
            Admin Dashboard
          </Link>
        )}
      </div>

      <div>
        {userInfo ? (
          <>
            <span style={{ marginRight: "15px", fontWeight: "500" }}>
              👤 {userInfo.name}
            </span>
            <button onClick={logoutHandler} style={logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <Link style={loginButton} to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 60px",
  background: "#ff6b00",
  color: "white",
  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
};

const logoStyle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "white",
};

const navLinks = {
  display: "flex",
  gap: "30px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "15px",
};

const logoutButton = {
  background: "white",
  color: "#ff6b00",
  border: "none",
  padding: "8px 18px",
  borderRadius: "25px",
  cursor: "pointer",
  fontWeight: "600",
};

const loginButton = {
  background: "white",
  color: "#ff6b00",
  padding: "8px 18px",
  borderRadius: "25px",
  textDecoration: "none",
  fontWeight: "600",
};

export default Navbar;