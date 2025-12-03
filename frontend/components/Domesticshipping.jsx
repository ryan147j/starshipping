import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Domesticshipping.css';
import logoDark from '../src/assets/logostarshipping2.png';
import driverImg from '../src/assets/roadtransport.jpg';
import usMap from '../src/assets/nationwide.jpg';
import Footer from './Footer';

const Domesticshipping = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="ds-page">
      {/* Header (consistent with site) */}
      <header className={`ds-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="ds-nav__container">
          <Link to="/" className="ds-nav__brand">
            <img src={logoDark} alt="StarShipping" className="ds-nav__logo" />
            <span>StarShipping</span>
          </Link>
          <nav className="ds-nav__links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero: image left, text right on white */}
      <section className="ds-hero ds-hero--white">
        <div className="container">
          <div className="ds-hero__grid">
            <div className="ds-hero__image">
              <img src={driverImg} alt="Domestic Shipping" />
            </div>
            <div className="ds-hero__text">
              <h1>Reliable Domestic Shipping Across the Country</h1>
              <p>Fast, safe, and affordable local delivery solutions for all your shipping needs.</p>
              <div className="ds-hero__chips">
                <span className="chip"><span className="chip-ico">🚚</span>Pickup</span>
                <span className="chip"><span className="chip-ico">⚡</span>Less Days</span>
              </div>
              <Link to="/booking" className="btn-primary ds-hero__cta" style={{ textDecoration: 'none' }}>
                Book a Domestic Shipment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Domestic */}
      <section className="ds-why">
        <div className="container">
          <h2 className="center">Why Choose Our Domestic Service</h2>
          <p className="center muted">Experience the best in local shipping with our premium services</p>
          <div className="cards">
            <div className="card">
              <div className="icon">🚚</div>
              <h3>Door‑to‑Door Pickup</h3>
              <p>Convenient pickup from your location with scheduled time slots that work for you.</p>
            </div>
            <div className="card">
              <div className="icon">⚡</div>
              <h3>Next‑Day Options</h3>
              <p>Express delivery options including same‑day and next‑day shipping for urgent packages.</p>
            </div>
            <div className="card">
              <div className="icon">💳</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees, get upfront pricing with detailed cost breakdowns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="ds-coverage">
        <div className="container cov-grid">
          <div className="cov-media">
            <div className="img-card">
              <img src={usMap} alt="Nationwide Coverage" />
            </div>
          </div>
          <div className="cov-text">
            <h2>Nationwide Coverage</h2>
            <p>We cover all major regions nationwide, ensuring your packages reach every corner of the country with our extensive network.</p>
            <ul className="bullets">
              <li>50 States Coverage</li>
              <li>Major Cities & Rural Areas</li>
              <li>1000+ Distribution Centers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ds-cta">
        <div className="container cta-wrap">
          <h2>Ship anywhere locally with confidence</h2>
          <p>Join thousands of satisfied customers who trust StarShipping for their domestic delivery needs</p>
          <Link to="/booking" className="btn-white" style={{ textDecoration: 'none' }}>
            Start Domestic Shipping
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Domesticshipping;
