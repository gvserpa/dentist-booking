import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/Home";
import Menu from "./components/menu/Menu";
import Register from "./pages/register/Register";
import Login from "./pages/login/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminPanel from './pages/admin/AdminPanel'
import Footer from "./components/footer/Footer";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Menu />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
