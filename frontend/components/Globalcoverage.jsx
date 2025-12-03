import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Globalcoverage.css';
import logoDark from '../src/assets/logostarshipping2.png';
import heroMap from '../src/assets/internationalshipping.jpg';
import planeImg from '../src/assets/airfreight.jpg';
import worldImg from '../src/assets/internationaltransport.jpg';
import Footer from './Footer';

const Globalcoverage = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="gc-page">
      {/* Header */}
      <header className={`gc-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="gc-nav__container">
          <Link to="/" className="gc-nav__brand">
            <img src={logoDark} alt="StarShipping" className="gc-nav__logo" />
            <span>StarShipping</span>
          </Link>
          <nav className="gc-nav__links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero (kept consistent with other components) */}
      <section className="gc-hero" style={{ backgroundImage: `url(${heroMap})` }}>
        <div className="gc-hero__overlay" />
        <div className="container">
          <div className="gc-hero__content">
            <h1 className="gc-hero__title">Global Coverage</h1>
            <p className="gc-hero__subtitle">Connected continents, reliable deliveries, everywhere.</p>
            <div className="gc-hero__actions">
              <Link to="/booking" className="btn-outline" style={{ textDecoration: 'none' }}>
                Talk to an Agent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro split */}
      <section className="gc-intro">
        <div className="container split">
          <div className="split__text">
            <h2>Worldwide Logistics, Simplified</h2>
            <p>
              We deliver to 150+ countries through our trusted global partners and regional hubs. From
              customs and compliance to last‑mile delivery, our teams coordinate every step to keep your
              supply chain moving smoothly.
            </p>
            <ul className="gc-list">
              <li>Door‑to‑door solutions</li>
              <li>Customs clearance and documentation</li>
              <li>Reliable transit times with live tracking</li>
            </ul>
          </div>
          <div className="split__media">
            <img src={planeImg} alt="Air and ocean logistics" />
          </div>
        </div>
      </section>

      {/* Regions grid */}
      <section className="gc-regions">
        <div className="container">
          <h2 className="center">Our Main Regions of Operation</h2>
          <div className="regions-grid">
            {[
              { icon: '🌍', title: 'Africa', desc: 'Key corridors and reliable inland networks.' },
              { icon: '🏗️', title: 'Europe', desc: 'Dense network with multimodal options.' },
              { icon: '🏝️', title: 'Middle East', desc: 'Strategic hubs connecting east and west.' },
              { icon: '🗺️', title: 'Asia', desc: 'High‑frequency lanes across major ports.' },
            ].map((r, i) => (
              <div className="region-card" key={i}>
                <div className="region-icon">{r.icon}</div>
                <div className="region-title">{r.title}</div>
                <div className="region-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map showcase */}
      <section className="gc-map">
        <div className="container">
          <h2 className="center">We Operate Across the Globe</h2>
          <div className="map-card">
            <img src={worldImg} alt="Global network" />
          </div>
        </div>
      </section>

      {/* Logos + stats */}
      <section className="gc-stats">
        <div className="container stats-wrap">
          <div className="logos">
            <span className="logo-box">DHL</span>
            <span className="logo-box">FEDEX</span>
            <span className="logo-box">MSC</span>
          </div>
          <div className="numbers">
            <div className="num"><div className="val">45+</div><div className="lbl">Ocean carriers</div></div>
            <div className="num"><div className="val">120+</div><div className="lbl">Global hubs</div></div>
            <div className="num"><div className="val">95%</div><div className="lbl">On‑time SLAs</div></div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="gc-quote">
        <div className="container">
          <div className="quote-card">
            <p className="quote-text">“Their coverage and responsiveness give us predictable lead times in every season.”</p>
            <div className="quote-author">
              <img src={logoDark} alt="avatar" className="avatar" />
              <div>
                <div className="name">Alex Brown</div>
                <div className="role">Supply Chain Lead</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gc-cta">
        <div className="container cta-wrap">
          <h2>Expand Your Reach with StarShipping</h2>
          <p>Let’s build a global logistics program that scales with your growth.</p>
          <Link to="/contact" className="btn-white" style={{ textDecoration: 'none' }}>
            Contact Our Team
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Globalcoverage;
