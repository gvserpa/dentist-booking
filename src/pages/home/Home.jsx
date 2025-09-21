import { memo } from "react";
import "./index.css";
import star from "../../assets/star-fill.png";
import arrowRight from "../../assets/arrow-right-up-line (1).png";
import consultation from "../../assets/consultation.png";
import committedPhoto from "../../assets/commited-bg.png";
import checkbox from "../../assets/checkbox-circle-fill.png";
import dentists from '../../assets/12.png'

const Home = () => {
  return (
    <main>
      <div className="main-content">
        <div className="left-right">
          <div className="rating">
            <img src={star} alt="star icon" />
            <p>5.0 (4824 Reviews)</p>
          </div>
          <div className="main-info">
            <h1>Exceptional Dental Care, Every Step Of The Way</h1>
            <p>
              Your smile deserves the best. Experience advanced dental solutions
              with a gentle touch, tailored for your comfort.
            </p>
            <div className="main-content-buttons">
              <button className="button-1">Book Appointment</button>
              <button className="button-2">Get Started Today</button>
            </div>
          </div>
          <div className="cards">
            <div className="card-1">
              <p>24/7 Service Available</p>
              <button>
                <img src={arrowRight} alt="arrow" />
              </button>
            </div>
            <div className="card-2">
              <p>Find The Best Doctors</p>
              <button>
                <img src={arrowRight} alt="arrow" />
              </button>
            </div>
          </div>
        </div>
        <div className="right-card">
          <div className="cards-right">
            <div className="card-right">
              <h2>200+</h2>
              <p>Expert Doctors</p>
            </div>
            <div className="card-right">
              <h2>400+</h2>
              <p>Recover Patient</p>
            </div>
            <div className="card-right">
              <h2>98%</h2>
              <p>Satisfied Rate</p>
            </div>
          </div>
        </div>
      </div>
      <div className="features-services">
        <div className="features">
          <h2>
            Features
            <br />& Services
          </h2>
          <div className="features-cards">
            <div className="features-card">
              <p>Expert Care</p>
              <img />
            </div>
            <div className="features-card">
              <p>Advanced Technology</p>
              <img />
            </div>
            <div className="features-card">
              <p>Affordable Plans</p>
              <img />
            </div>
            <div className="features-card">
              <p>The Best Doctors</p>
              <img />
            </div>
          </div>
        </div>
        
        <div className="consultation">
          <div className="consultation-img">
            <img src={consultation} alt="live-consultation" />
          </div>
          <div className="consultation-info">
            <h2>
              Online
              <br />
              Consultation
            </h2>
            <div className="consultation-links">
              <div className="links">
                <p>Your Gateway To Smarter, Patient-Friendly Telehealrth</p>
                <img src={arrowRight} alt="arrow icon" />
              </div>
              <hr />
              <div className="links">
                <p>Safe & Protected</p>
                <img src={arrowRight} alt="arrow icon" />
              </div>
              <hr />
              <div className="links">
                <p>24/7 Service</p>
                <img src={arrowRight} alt="arrow icon" />
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div className="section-committed">
        <div className="committed-left">
          <div className="committed-info">
            <h2>
              Committed To Your
              <br />
              Oral Health
            </h2>
            <p>
              We strive to provide exceptional dental care through advanced
              technology, personalized treatments, and a compassionate approach,
              ensuring your oral health is always our top priority for a
              brighter, healthier smile.
            </p>
            <div className="committed-links">
              <img src={checkbox} alt="check icon" />
              <p>Advanced Dental Care For Every Smile</p>
            </div>
            <div className="committed-links">
              <img src={checkbox} alt="check icon" />
              <p>Peronalized Treatments Tailored To You</p>
            </div>
            <div className="committed-links">
              <img src={checkbox} alt="check icon" />
              <p>Modern Technology For Better Results</p>
            </div>
            <div className="committed-links">
              <img src={checkbox} alt="check icon" />
              <p>Comfort, Safety, And Quality Guaranteed</p>
            </div>
            <div className="committed-links">
              <img src={checkbox} alt="check icon" />

              <p>Your Smile, Our Responsability</p>
            </div>
          </div>
        </div>
        <div className="committed-right">
          <img src={committedPhoto} alt="mosaic-photos" />
        </div>
      </div>

      <div className="get-in-touch">
        <div className="get-content">
          <h2>Get In Touch With Us </h2>
          <img src={dentists} />
          <p>120k+ Satisfied Patient</p>
          <div className="get-buttons">
            <buttons className="get-1">Book Appointment</buttons>
            <buttons className="get-2">Get Started Today</buttons>
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(Home);
