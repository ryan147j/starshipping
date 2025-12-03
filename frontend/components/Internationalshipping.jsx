import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Internationalshipping.css';
import logoDark from '../src/assets/logostarshipping2.png';
import intlHero from '../src/assets/internationalship.jpg';
import Footer from './Footer';

const Internationalshipping = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="is-page">
      {/* Header (kept consistent with other components) */}
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

      {/* Hero: text left, image right */}
      <section className="is-hero">
        <div className="container">
          <div className="is-hero__grid">
            <div className="is-hero__text">
              <h1>Global Shipping, Simplified.</h1>
              <p>Connecting you to over 120 destinations worldwide.</p>
              <div className="is-hero__chips">
                <span className="is-chip"><span className="is-chip-ico">🌐</span> Global Reach</span>
                <span className="is-chip"><span className="is-chip-ico">🧾</span> Customs Assistance</span>
              </div>
              <Link to="/booking" className="btn-yellow" style={{ textDecoration: 'none' }}>
                Start International Shipment
              </Link>
            </div>
            <div className="is-hero__image">
              <img src={intlHero} alt="International Shipping" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="is-why">
        <div className="container">
          <h2>Why Choose Our International Service</h2>
          <p className="muted">Comprehensive solutions for all your global shipping needs</p>
          <div className="is-why__grid">
            <div className="is-why__card">
              <div className="is-why__icon">🌍</div>
              <div>
                <h3>Worldwide Coverage</h3>
                <p>Ship to over 120 international destinations with our global network and trusted partnerships.</p>
              </div>
            </div>
            <div className="is-why__card">
              <div className="is-why__icon">🧾</div>
              <div>
                <h3>Customs Assistance</h3>
                <p>Simplified import/export documentation with our expert team handling all customs requirements.</p>
              </div>
            </div>
            <div className="is-why__card">
              <div className="is-why__icon">🛡️</div>
              <div>
                <h3>Shipment Insurance</h3>
                <p>Comprehensive cargo protection to ensure your valuable shipments are covered throughout transit.</p>
              </div>
            </div>
            <div className="is-why__card">
              <div className="is-why__icon">📞</div>
              <div>
                <h3>24/7 Support</h3>
                <p>Always available to help you ship confidently with round‑the‑clock support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="is-stats">
        <div className="container is-stats__grid">
          <div className="is-stat">
            <div className="num">+120</div>
            <div className="lbl">Countries Served</div>
          </div>
          <div className="is-stat">
            <div className="num">98%</div>
            <div className="lbl">On‑Time Delivery</div>
          </div>
          <div className="is-stat">
            <div className="num">24h</div>
            <div className="lbl">Global Support</div>
          </div>
          <div className="is-stat">
            <div className="num">100%</div>
            <div className="lbl">Tracking Coverage</div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="is-steps">
        <div className="container">
          <h2>How International Shipping Works</h2>
          <p className="muted">Simple steps to get your package delivered worldwide</p>
          <div className="is-steps__grid">
            <div className="is-step">
              <div className="circle">1</div>
              <h4>Submit Details</h4>
              <p>Provide your shipment information and destination details.</p>
            </div>
            <div className="is-step">
              <div className="circle">2</div>
              <h4>Customs Prep</h4>
              <p>We handle customs documentation and requirements.</p>
            </div>
            <div className="is-step">
              <div className="circle">3</div>
              <h4>Global Transit</h4>
              <p>Shipment moves quickly through our international network.</p>
            </div>
            <div className="is-step">
              <div className="circle">4</div>
              <h4>Final Delivery</h4>
              <p>Delivery at your recipient’s doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="is-cta">
        <div className="container">
          <h2>Ship Beyond Borders with StarShipping</h2>
          <p>Join thousands of businesses who trust us with their international shipping needs</p>
          <Link to="/booking" className="btn-yellow" style={{ textDecoration: 'none' }}>
            Book Your Shipment Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Internationalshipping;
