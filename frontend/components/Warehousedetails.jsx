import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Warehousedetails.css';
import './Homepage.css';
import { NavLink } from 'react-router-dom';
import logoDark from '../src/assets/logostarshipping2.png';
// Serve large media from public to avoid bundling issues in production
const VIDEO_URL = '/media/warehousing.mp4';
import imgA from '../src/assets/wearhosuing.jpg';
import imgB from '../src/assets/warehousy1.jpg';
import imgC from '../src/assets/warehousy2.jpg';

const Warehousedetails = () => {
  const navigate = useNavigate();

  return (
    <div className="wdl-light">
      {/* Video Hero at top with overlayed title + paragraph */}
      <section className="wdl-hero" aria-label="Warehousing video">
        <video className="wdl-video" src={VIDEO_URL} poster={imgA} autoPlay muted loop playsInline />
        <div className="wdl-hero-overlay" />
        <div className="wdl-hero-content">
          <h1 className="wdl-hero-title">Warehousing Services</h1>
          <p className="wdl-hero-sub">
            Our warehousing solutions provide modern, secure, and efficient storage facilities. From advanced tracking systems to
            climate-controlled spaces, we ensure every item is managed with precision.
          </p>
          <div className="wdl-hero-actions">
            <button className="wdl-hero-back" onClick={() => navigate('/services')}>← Back to Services</button>
          </div>
        </div>
      </section>


      {/* Intro band (kept subtle as in screenshot) */}
      <section className="wdl-intro">
        <div className="container">
          <p>
            Explore our warehouse facilities with detailed specifications, security measures, and storage options. Each warehouse is
            designed for efficiency, safety, and optimal storage conditions.
          </p>
        </div>
      </section>

      {/* Feature cards */}
      <section className="wdl-features container" aria-label="Key facility features">
        <div className="wdl-grid">
          <article className="wdl-card light">
            <div className="wdl-ico loc" aria-hidden="true" />
            <div className="wdl-txt">
              <h3>Location</h3>
              <p>Prime logistics hubs near major networks for efficient distribution.</p>
            </div>
          </article>
          <article className="wdl-card light">
            <div className="wdl-ico cap" aria-hidden="true" />
            <div className="wdl-txt">
              <h3>Capacity</h3>
              <p>Up to 10,000 items with scalable storage solutions.</p>
            </div>
          </article>
          <article className="wdl-card light">
            <div className="wdl-ico shield" aria-hidden="true" />
            <div className="wdl-txt">
              <h3>Security</h3>
              <p>24/7 monitoring with controlled access and surveillance.</p>
            </div>
          </article>
          <article className="wdl-card light">
            <div className="wdl-ico facility" aria-hidden="true" />
            <div className="wdl-txt">
              <h3>Facilities</h3>
              <p>Climate-controlled areas and modern handling equipment.</p>
            </div>
          </article>
        </div>
      </section>

      {/* Gallery */}
      <section className="wdl-gallery container" aria-label="Warehouse gallery">
        <h2>Warehouse Gallery</h2>
        <p className="wdl-g-sub">Take a closer look at our state-of-the-art facilities</p>
        <div className="wdl-g-grid">
          <img src={imgA} alt="Warehouse aisle" />
          <img src={imgB} alt="Loading area" />
          <img src={imgC} alt="Storage corridor" />
        </div>
      </section>

      {/* Testimonial */}
      <section className="wdl-quote container" aria-label="Customer testimonial">
        <div className="wdl-quote-card">
          <h3>Customer Testimonial</h3>
          <p className="q">
            “Exceptional warehouse facilities with top-notch security and climate control. Our products are always in perfect
            condition.”
          </p>
          <p className="qa">— Michael Johnson, Supply Chain Director</p>
        </div>
      </section>

      {/* Footer CTAs */}
      <section className="wdl-actions">
        <div className="container wdl-actions-row">
          <button className="wdl-act primary" onClick={() => navigate('/contact')}>
            Contact Sales
          </button>
        </div>
      </section>

      {/* Shared Footer */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__top">
            <div className="footer__brand">
              <img src={logoDark} alt="StarShipping Logo" />
              <p>Your trusted partner for global shipping solutions, connecting businesses worldwide with reliability and excellence.</p>
            </div>
            <div className="footer__links">
              <div className="footer__col">
                <h4>Services</h4>
                <NavLink to="/services">Domestic Shipping</NavLink>
                <NavLink to="/services">International Shipping</NavLink>
                <NavLink to="/services">Express Delivery</NavLink>
                <NavLink to="/services">Special Cargo</NavLink>
              </div>
              <div className="footer__col">
                <h4>Company</h4>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/services">Careers</NavLink>
                <NavLink to="/services">Blog</NavLink>
              </div>
              <div className="footer__col">
                <h4>Support</h4>
                <NavLink to="/contact">Help Center</NavLink>
                <NavLink to="/contact">Get a Quote</NavLink>
                <NavLink to="/services">Tracking</NavLink>
                <NavLink to="/services">Terms & Privacy</NavLink>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p>© 2025 StarShipping. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Warehousedetails;
