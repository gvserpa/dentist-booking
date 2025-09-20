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
            <li>Treatments</li>
            <li>About</li>
            <li>Contact</li>
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
