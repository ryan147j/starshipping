import React, { useEffect, useRef } from 'react';
import './OceanfreightDetails.css';
import { Link, useNavigate } from 'react-router-dom';
import logoDark from '../src/assets/logostarshipping2.png';
import videoSrc from '../src/assets/cagoshipsea2.mp4';
import envImg from '../src/assets/internationaltransport.jpg';

const OceanfreightDetails = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 20) navRef.current.classList.add('scrolled');
      else navRef.current.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Simple intersection observer for reveal animations
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('show');
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.ofx-reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ofx-page">
      {/* Header */}
      <header className="ofx-nav" ref={navRef}>
        <div className="ofx-nav__container">
          <Link to="/" className="ofx-nav__brand">
            <img src={logoDark} alt="StarShipping" />
            <span>StarShipping</span>
          </Link>
          <nav className="ofx-nav__links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero with video background */}
      <section className="ofx-hero">
        <video className="ofx-hero__video" src={videoSrc} autoPlay muted loop playsInline preload="metadata"></video>
        <div className="ofx-hero__overlay" />
        <div className="ofx-hero__content">
          <h1 className="ofx-hero__title ofx-fade-up">Ocean Freight — Connecting Continents Through Reliable Sea Routes.</h1>
          <p className="ofx-hero__subtitle ofx-fade-up" style={{animationDelay:'120ms'}}>Efficient, eco-conscious shipping solutions for global trade.</p>
          <div className="ofx-hero__actions ofx-fade-up" style={{animationDelay:'220ms'}}>
            <button className="btn-blue" type="button" onClick={() => navigate('/contact?subject=shipping-quote')}>Request a Quote</button>
            <button className="btn-outline" type="button" onClick={() => navigate('/services')}>Back to Services</button>
          </div>
          <div className="ofx-hero__scroll" aria-hidden>⌄</div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="ofx-why">
        <div className="container">
          <h2 className="center">Why Choose Our Ocean Freight Services</h2>
          <p className="center muted">Cinematic and reliable service with world‑class operations</p>
          <div className="ofx-why__grid">
            {[{ico:'🧭',t:'Global Port Coverage',d:'Extensive network connecting major trade lanes.'},
              {ico:'📡',t:'Real‑Time Tracking',d:'Full visibility from origin to destination.'},
              {ico:'⏱️',t:'Guaranteed Scheduling',d:'Reliable ETAs with on‑time performance.'},
              {ico:'🌱',t:'Sustainable Routes',d:'Optimized routes with greener options.'}].map((c,i)=> (
              <div className="ofx-card ofx-reveal" style={{transitionDelay:`${80*i}ms`}} key={c.t}>
                <div className="ofx-card__ico">{c.ico}</div>
                <div className="ofx-card__title">{c.t}</div>
                <div className="ofx-card__desc">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="ofx-process">
        <div className="container">
          <h2 className="center">Our Shipping Process</h2>
          <div className="ofx-steps">
            {[
              {ico:'📝',t:'Booking'},
              {ico:'🧱',t:'Loading'},
              {ico:'🚢',t:'Shipping'},
              {ico:'🛳️',t:'Unloading'},
              {ico:'📦',t:'Delivery'}
            ].map((s,i)=> (
              <div className="ofx-step ofx-reveal" style={{transitionDelay:`${80*i}ms`}} key={s.t}>
                <div className="ofx-step__ico">{s.ico}</div>
                <div className="ofx-step__label">{s.t}</div>
              </div>
            ))}
            <div className="ofx-steps__line" />
          </div>
        </div>
      </section>

      {/* Environmental Commitment */}
      <section className="ofx-env">
        <div className="container ofx-env__grid">
          <div className="ofx-env__text ofx-reveal">
            <div className="badge green">♻️ Sustainability</div>
            <h2>Our Environmental Commitment</h2>
            <p>
              We continuously optimize routes and deploy eco‑friendly vessels to reduce emissions. Our programs
              offset remaining CO₂ impact, ensuring responsible logistics for your business.
            </p>
            <div className="ofx-stats">
              <div className="stat"><span className="num" data-end="40">0</span>% CO₂ Reduction</div>
              <div className="stat"><span className="num" data-end="100">0</span>% Offset Programs</div>
              <div className="stat"><span className="num" data-end="15">0</span>+ Green Certifications</div>
            </div>
          </div>
          <div className="ofx-env__media ofx-reveal" style={{transitionDelay:'120ms'}}>
            <img src={envImg} alt="Eco routes" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ofx-cta">
        <div className="container ofx-cta__wrap ofx-reveal">
          <h2>Ready to Ship with StarShipping?</h2>
          <button className="btn-blue pulse" onClick={() => navigate('/contact?subject=shipping-quote')}>Request a Quote</button>
          <div className="ofx-cta__icons">
            <div className="ico ofx-reveal" style={{transitionDelay:'60ms'}}>🕑<span>24/7 Support</span></div>
            <div className="ico ofx-reveal" style={{transitionDelay:'120ms'}}>🛡️<span>Insured Cargo</span></div>
            <div className="ico ofx-reveal" style={{transitionDelay:'180ms'}}>⚡<span>Fast Processing</span></div>
          </div>
        </div>
      </section>

      {/* Footer (reuse site footer styles) */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__bottom" style={{padding:'1.2rem 0'}}>
            <p>© 2025 StarShipping. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OceanfreightDetails;
