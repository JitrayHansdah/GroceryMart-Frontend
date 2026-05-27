import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import ProtectedRoute from "./routes/ProtectedRoute";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import Tracking from "./pages/Tracking";
import Orders from "./pages/Orders";
import Address from "./pages/Address";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/address" element={<Address />} />
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
        <Route
          path="/tracking"
          element={<Tracking />}
        />
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;