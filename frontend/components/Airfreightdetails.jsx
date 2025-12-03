import React, { useEffect, useRef } from 'react';
import './AirfreightDetails.css';
import { Link, useNavigate } from 'react-router-dom';
import logoDark from '../src/assets/logostarshipping2.png';
import videoSrc from '../src/assets/aircargo.mp4';
import planeImg from '../src/assets/airfreight.jpg';
import Footer from './Footer';

const AirfreightDetails = () => {
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

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('show');
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.afx-reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="afx-page">
      <header className="afx-nav" ref={navRef}>
        <div className="afx-nav__container">
          <Link to="/" className="afx-nav__brand">
            <img src={logoDark} alt="StarShipping" />
            <span>StarShipping</span>
          </Link>
          <nav className="afx-nav__links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="afx-hero">
        <video className="afx-hero__video" src={videoSrc} autoPlay muted loop playsInline preload="metadata" />
        <div className="afx-hero__overlay" />
        <div className="afx-hero__content">
          <h1 className="afx-hero__title afx-fade-up">Air Freight — Delivering Speed, Safety, and Global Reach</h1>
          <p className="afx-hero__subtitle afx-fade-up" style={{animationDelay:'120ms'}}>Efficient and reliable air cargo solutions connecting businesses worldwide.</p>
          <div className="afx-hero__actions afx-fade-up" style={{animationDelay:'220ms'}}>
            <button className="btn-blue" type="button" onClick={() => navigate('/contact?subject=shipping-quote')}>Request a Quote</button>
            <button className="btn-outline" type="button" onClick={() => navigate('/services')}>Back to Services</button>
          </div>
          <div className="afx-hero__scroll" aria-hidden>⌄</div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="afx-why">
        <div className="container">
          <h2 className="center">Why Choose Our Air Freight</h2>
          <p className="center muted">Global coverage, real-time tracking, and priority handling for urgent shipments.</p>
          <div className="afx-why__grid">
            {[{ico:'⚡',t:'Fast Transit Times',d:'Priority routing for time-critical cargo.'},
              {ico:'📡',t:'Real-Time Tracking',d:'Know where your shipment is—always.'},
              {ico:'🧾',t:'Customs Expertise',d:'Seamless clearance and documentation.'},
              {ico:'🛡️',t:'Secure Handling',d:'Advanced packaging and security.'}].map((c,i)=> (
              <div className="afx-card afx-reveal" style={{transitionDelay:`${80*i}ms`}} key={c.t}>
                <div className="afx-card__ico">{c.ico}</div>
                <div className="afx-card__title">{c.t}</div>
                <div className="afx-card__desc">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="afx-stats">
        <div className="container afx-stats__grid">
          {[
            {v:'200+',l:'Global Airports Connected'},
            {v:'99.5%',l:'On-time Deliveries'},
            {v:'25K+',l:'Annual Air Shipments'}
          ].map((s,i)=> (
            <div className="afx-stat afx-reveal" style={{transitionDelay:`${80*i}ms`}} key={s.l}>
              <div className="val">{s.v}</div>
              <div className="lab">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="afx-process">
        <div className="container">
          <h2 className="center">Our Air Freight Process</h2>
          <div className="afx-steps">
            {[
              {ico:'📝',t:'Booking'},
              {ico:'📦',t:'Pickup'},
              {ico:'✈️',t:'Flight & Tracking'},
              {ico:'📬',t:'Arrival & Delivery'}
            ].map((s,i)=> (
              <div className="afx-step afx-reveal" style={{transitionDelay:`${80*i}ms`}} key={s.t}>
                <div className="afx-step__ico">{s.ico}</div>
                <div className="afx-step__label">{s.t}</div>
              </div>
            ))}
            <div className="afx-steps__line" />
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="afx-env">
        <div className="container afx-env__grid">
          <div className="afx-env__text afx-reveal">
            <div className="badge green">♻️ Sustainability</div>
            <h2>Our Commitment to Sustainable Air Logistics</h2>
            <p>
              StarShipping reduces emissions by using optimized routes and fuel‑efficient aircraft, and participates in carbon offset programs.
            </p>
            <div className="afx-metrics">
              <div className="metric"><span className="num">35%</span> Fuel Savings</div>
              <div className="metric"><span className="num">100%</span> Offset Flights</div>
              <div className="metric"><span className="num">15+</span> Partner Airlines</div>
            </div>
          </div>
          <div className="afx-env__media afx-reveal" style={{transitionDelay:'120ms'}}>
            <img src={planeImg} alt="Air sustainability" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="afx-cta">
        <div className="container afx-cta__wrap afx-reveal">
          <h2>Ready to Ship by Air with StarShipping?</h2>
          <p className="sub">Join thousands of businesses that trust us for fast and secure air freight deliveries.</p>
          <button className="btn-blue pulse" onClick={() => navigate('/contact?subject=shipping-quote')}>Request a Quote</button>
          <div className="afx-cta__icons">
            <div className="ico afx-reveal" style={{transitionDelay:'60ms'}}>🕑<span>24/7 Support</span></div>
            <div className="ico afx-reveal" style={{transitionDelay:'120ms'}}>🛡️<span>Insured Cargo</span></div>
            <div className="ico afx-reveal" style={{transitionDelay:'180ms'}}>🌐<span>Global Coverage</span></div>
            <div className="ico afx-reveal" style={{transitionDelay:'240ms'}}>⚡<span>Fast Processing</span></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AirfreightDetails;
