import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} /> {/* Add this */}

          <Route
         path="/products"
         element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
    }
  />

    <Route
  path="/cart"
  element={
    <PrivateRoute>
      <Cart />
    </PrivateRoute>
  }
/>

<Route
  path="/cart/:id"
  element={
    <PrivateRoute>
      <Cart />
    </PrivateRoute>
  }
/>

    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }
    />
    <Route path="/myorders" element={<MyOrders />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/product/:id" element={<ProductDetails />} />
  </Routes>
    </BrowserRouter>
  );
}

export default App;