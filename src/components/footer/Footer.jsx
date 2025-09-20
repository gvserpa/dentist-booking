import { memo } from "react";
import linkedin from "../../assets/linkedin-line.png";
import insta from "../../assets/instagram-line (2).png";
import facebook from "../../assets/facebook-line.png";
import twitter from "../../assets/twitter-x-line (1).png";

import "./index.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="footer-top">
        <div className="footer-left">
          <h2>Dentist-booking.com</h2>
          <p>Caring for You, Every Step of the Way.</p>
          <div className="input">
            <input placeholder="Email Address" />
            <button>Subscribe</button>
          </div>
          <div className="social-media">
            <img src={linkedin} alt="social-media-icon" />
            <img src={insta} alt="social-media-icon" />
            <img src={facebook} alt="social-media-icon" />
            <img src={twitter} alt="social-media-icon" />
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-links">
            <h2>Quick Links</h2>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Doctors</li>
              <li>Appointments</li>
            </ul>
          </div>
          <div className="footer-links">
            <h2> Solutions</h2>
            <ul>
              <li>Preventive Care</li>
              <li>Cosmetic Dentistry</li>
              <li>Orthodontcs</li>
              <li>Dental Implants</li>
              <li>Teeth Whitening</li>
            </ul>
          </div>
          <div className="footer-links">
            <h2>Features</h2>
            <ul>
              <li>Expert Care</li>
              <li>Advanced Technology</li>
              <li>Affordable Plans</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="bottom-links">
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Cookies Settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
