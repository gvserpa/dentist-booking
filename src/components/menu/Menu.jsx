import { memo, useState } from "react";
import "./index.css";
import { useNavigate, Link } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

    const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); 
  };

  return (
    <header>
      <div className="header">
        <div className="logo">
          <Link to="/">Dentist-booking.com</Link>
        </div>

        {/* Botão do menu hamburguer */}
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`menu-nav ${isOpen ? "open" : ""}`}>
          <ul>
            <li onClick={() => handleScroll("home")}><span>Home</span></li>
            <li onClick={() => handleScroll("services")}>Services</li>
            <li onClick={() => handleScroll("online-consultation")}>Online Consultation</li>
            <li onClick={() => handleScroll("get-in-touch")}>Get in Touch</li>
          </ul> 
          <button onClick={handleLogin}>Log In</button>
          <div className="signin-btn">
            <button className="signin-btn">
              <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Menu);
