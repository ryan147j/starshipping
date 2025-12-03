import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Fastdelivery.css';
import logoDark from '../src/assets/logostarshipping2.png';
import heroTruck from '../src/assets/roadtransport.jpg';
import sectionImg from '../src/assets/wearhosuing.jpg';
import Footer from './Footer';

const Fastdelivery = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fast-page">
      {/* Header */}
      <header className={`fast-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="fast-nav__container">
          <Link to="/" className="fast-nav__brand">
            <img src={logoDark} alt="StarShipping" className="fast-nav__logo" />
            <span>StarShipping</span>
          </Link>
          <nav className="fast-nav__links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="fast-hero" style={{ backgroundImage: `url(${heroTruck})` }}>
        <div className="fast-hero__overlay" />
        <div className="container">
          <div className="fast-hero__content">
            <h1 className="fast-hero__title">Fast Delivery</h1>
            <p className="fast-hero__subtitle">Your goods, delivered on-time, every time.</p>
            <div className="fast-hero__actions">
              <Link to="/booking" className="btn-yellow" style={{ textDecoration: 'none' }}>
                Request a Shipment
              </Link>
              <Link to="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro split section */}
      <section className="fast-intro">
        <div className="container split">
          <div className="split__text">
            <h2>Reliable Shipping You Can Count On</h2>
            <p>
              StarShipping’s Fast Delivery service keeps your cargo moving when every minute matters. From
              pickup to final mile, our network and real‑time tracking minimize delays and maximize efficiency.
            </p>
            <p>
              Whether it’s a small parcel or palletized freight, we tailor a plan that meets your deadline and budget.
            </p>
          </div>
          <div className="split__media">
            <img src={sectionImg} alt="Fast Delivery operations" />
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="fast-features">
        <div className="container">
          <h2 className="center">What Makes Our Fast Delivery Stand Out</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3>Real‑Time Tracking</h3>
              <p>Know where your shipment is at every step.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Nationwide Coverage</h3>
              <p>Fast delivery solutions across major routes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Dedicated Support</h3>
              <p>24/7 assistance from our operations team.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Guaranteed Timelines</h3>
              <p>Committed pick-up and delivery windows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="fast-steps">
        <div className="container">
          <h2 className="center">How It Works</h2>
          <div className="steps">
            <div className="step"><span>📦</span>Book your shipment</div>
            <div className="step"><span>🚚</span>We pick up your cargo</div>
            <div className="step"><span>🛰️</span>Real‑time tracking</div>
            <div className="step"><span>🏁</span>Safe and on‑time delivery</div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="fast-quote">
        <div className="container">
          <div className="quote-card">
            <p className="quote-text">“StarShipping’s Fast Delivery helped us meet impossible deadlines without a single issue.”</p>
            <div className="quote-author">
              <img src={logoDark} alt="avatar" className="avatar" />
              <div>
                <div className="name">Sara Jensen</div>
                <div className="role">Operations Manager</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fast-cta">
        <div className="container cta-wrap">
          <h2>Ready to Ship Fast?</h2>
          <p>Join thousands of businesses trusting StarShipping for their express deliveries.</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Fastdelivery;
