import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Specialcargo.css';
import logoDark from '../src/assets/logostarshipping2.png';
import cargoImg from '../src/assets/specialcargo.jpg';

const Specialcargo = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="sc-page">
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
            <Link to="/reviews">Reviews</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Split Hero: gradient left, thin white divider, image right */}
      <section className="sc-hero">
        <div className="container">
          <div className="sc-hero__wrap">
            <div className="sc-hero__left">
              <h1>Special Cargo, Exceptional Care.</h1>
              <p>
                From fragile instruments to oversized freight — we handle every shipment with unmatched precision.
              </p>
              <Link to="/contact" className="sc-hero__cta" style={{ textDecoration: 'none' }}>
                Request Special Handling
              </Link>
            </div>
            <div className="sc-hero__divider" aria-hidden="true"></div>
            <div className="sc-hero__right">
              <img src={cargoImg} alt="Special Cargo Handling" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Specialized Capabilities */}
      <section className="sc-caps">
        <div className="container">
          <h2 className="center">Our Specialized Capabilities</h2>
          <div className="muted center">Comprehensive solutions for your most demanding cargo</div>
          <div className="sc-caps__grid">
            <div className="sc-cap">
              <div className="ico">🛡️</div>
              <h3>Fragile & Sensitive Goods</h3>
              <p>White‑glove handling and dedicated teams for delicate items requiring extra protection.</p>
            </div>
            <div className="sc-cap">
              <div className="ico">🏗️</div>
              <h3>Heavy Lift Operations</h3>
              <p>Industrial machinery and heavy‑duty equipment with specialized gear.</p>
            </div>
            <div className="sc-cap">
              <div className="ico">📦</div>
              <h3>Oversized Equipment Transport</h3>
              <p>Custom solutions for large items that exceed standard dimensions.</p>
            </div>
            <div className="sc-cap">
              <div className="ico">⚡</div>
              <h3>Time‑Critical Deliveries</h3>
              <p>Express handling for urgent shipments with 24/7 coordination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="sc-stats">
        <div className="container sc-stats__grid">
          <div className="sc-stat"><div className="num">10000+</div><div className="lbl">Special Cargo Shipments</div></div>
          <div className="sc-stat"><div className="num">100%</div><div className="lbl">Damage‑Free Guarantee</div></div>
          <div className="sc-stat"><div className="num">24/7</div><div className="lbl">Live Monitoring</div></div>
        </div>
      </section>

      {/* Handling Process */}
      <section className="sc-steps">
        <div className="container">
          <h2 className="center">Our Handling Process</h2>
          <div className="muted center">Simple steps for reliable special cargo delivery</div>
          <div className="sc-steps__grid">
            <div className="sc-step"><div className="circle">🔍</div><h4>Assessment</h4><p>Detailed evaluation of cargo requirements and special handling needs.</p></div>
            <div className="sc-step"><div className="circle">🛠️</div><h4>Preparation</h4><p>Custom packaging and specialized equipment setup for safe transport.</p></div>
            <div className="sc-step"><div className="circle">🚚</div><h4>Transport</h4><p>Secure movement with real‑time monitoring and expert handling.</p></div>
            <div className="sc-step"><div className="circle">📄</div><h4>Delivery Confirmation</h4><p>End‑to‑end delivery with complete documentation and inspection.</p></div>
          </div>
        </div>
      </section>

      {/* Protection band */}
      <section className="sc-protect">
        <div className="container">
          <h2 className="center">Every Shipment, Fully Protected.</h2>
          <p className="muted center">Certifications and compliance that safeguard your special cargo at every step.</p>
          <div className="sc-protect__chips">
            <span className="chip">IATA Certified</span>
            <span className="chip">ISO Compliant</span>
            <span className="chip">DG Handling</span>
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="sc-cta">
        <div className="container sc-cta__wrap">
          <h2>Ready to Move Something Big?</h2>
          <p>Contact our special cargo experts today.</p>
          <div className="sc-cta__actions">
            <Link to="/contact" className="btn-yellow" style={{ textDecoration: 'none' }}>
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Footer same as other pages */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__top">
            <div className="footer__brand">
              <img src={logoDark} alt="StarShipping Logo" />
              <p>Reliable shipping solutions for businesses and individuals worldwide.</p>
            </div>
            <div className="footer__links">
              <div className="footer__col">
                <h4>Services</h4>
                <Link to="/services">Domestic Shipping</Link>
                <Link to="/services">International</Link>
                <Link to="/services">Express Delivery</Link>
              </div>
              <div className="footer__col">
                <h4>Support</h4>
                <a href="#">Track Package</a>
                <a href="#">Help Center</a>
                <Link to="/contact">Contact Us</Link>
              </div>
              <div className="footer__col">
                <h4>Company</h4>
                <Link to="/about">About Us</Link>
                <a href="#">Careers</a>
                <a href="#">Privacy Policy</a>
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

export default Specialcargo;
