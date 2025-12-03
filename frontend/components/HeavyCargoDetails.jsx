import React, { useEffect, useRef } from 'react';
import './HeavyCargoDetails.css';
import '../components/Homepage.css';
import Header from './Header';
import { Link, NavLink } from 'react-router-dom';
import logoDark from '../src/assets/logostarshipping2.png';
import videoSrc from '../src/assets/cargooo.mp4';

// Full-width details page matching the other services pages
const HeavyCargoDetails = () => {
  const navRef = useRef(null);
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

  return (
    <div className="hcd-page">
      {/* Header */}
      <Header transparentOnTop={true} active="services" />
      {/* Hero */}
      <section className="hcd-hero">
        <video className="hcd-video" src={videoSrc} autoPlay muted loop playsInline preload="metadata" />
        <div className="hcd-hero__content hcd-reveal">
          <h1 className="hcd-title">Heavy Cargo Expertise</h1>
          <p className="hcd-sub">From oversized loads to delicate machinery — we move it all with precision and safety.</p>
          <div className="hcd-hero__actions">
            <Link to="/services" className="hcd-back">← Back to Services</Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="hcd-stats">
        <div className="hcd-stat hcd-reveal" style={{animationDelay:'40ms'}}>
          <div className="val">10,000+</div>
          <div className="lab">Tons shipped yearly</div>
        </div>
        <div className="hcd-stat hcd-reveal" style={{animationDelay:'120ms'}}>
          <div className="val">Specialized</div>
          <div className="lab">Equipment fleet</div>
        </div>
        <div className="hcd-stat hcd-reveal" style={{animationDelay:'200ms'}}>
          <div className="val">Worldwide</div>
          <div className="lab">Project logistics</div>
        </div>
      </section>

      {/* Solutions section */}
      <section className="hcd-solutions">
        <div className="hcd-container">
          <div className="hcd-solgrid">
            <div className="hcd-soltext hcd-reveal">
              <h2>Exceptional Heavy Cargo Solutions</h2>
              <p>
                StarShipping specializes in transporting oversized, heavy, and high‑value cargo across the globe. Our experienced team
                handles everything from industrial machinery to construction equipment with the highest safety standards and precision.
              </p>
              <p>
                With our state‑of‑the‑art equipment fleet and certified partners, we ensure your valuable cargo reaches its destination
                safely and on time, every time.
              </p>
            </div>
            <div className="hcd-solfeatures">
              <div className="hcd-item hcd-reveal" style={{animationDelay:'60ms'}}>
                <div className="hcd-ico">🛡️</div>
                <div>
                  <div className="t">Maximum Reliability</div>
                  <div className="d">Comprehensive tracking and real‑time updates throughout the journey.</div>
                </div>
              </div>
              <div className="hcd-item hcd-reveal" style={{animationDelay:'100ms'}}>
                <div className="hcd-ico">🧭</div>
                <div>
                  <div className="t">Custom Route Planning</div>
                  <div className="d">Special routing considering weight restrictions and clearances.</div>
                </div>
              </div>
              <div className="hcd-item hcd-reveal" style={{animationDelay:'140ms'}}>
                <div className="hcd-ico">📄</div>
                <div>
                  <div className="t">Full Insurance Support</div>
                  <div className="d">Coverage options tailored to your cargo value with claims support.</div>
                </div>
              </div>
              <div className="hcd-item hcd-reveal" style={{animationDelay:'180ms'}}>
                <div className="hcd-ico">⚙️</div>
                <div>
                  <div className="t">Certified Partners</div>
                  <div className="d">Global network with specialized equipment and trained crews.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="hcd-caps">
        <div className="hcd-container">
          <h2 className="center">Our Heavy Cargo Capabilities</h2>
          <p className="center muted">From project cargo to breakbulk shipments, we handle the most challenging requirements.</p>
          <div className="hcd-capgrid">
            {[
              {ico:'🏭',t:'Industrial Equipment',d:'Heavy machinery, generators, transformers, and manufacturing equipment.'},
              {ico:'🏗️',t:'Construction Materials',d:'Steel structures, precast concrete, cranes, and building components.'},
              {ico:'⚡',t:'Energy & Oil',d:'Pipeline sections, drilling equipment, wind turbines, and refinery machinery.'},
              {ico:'🔬',t:'High‑Tech Equipment',d:'Precision instruments, semiconductors, and sensitive technology.'}
            ].map((c,i)=> (
              <div className="hcd-capcard hcd-reveal" style={{transitionDelay:`${80*i}ms`}} key={c.t}>
                <div className="ico">{c.ico}</div>
                <div className="title">{c.t}</div>
                <div className="desc">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="hcd-cta">
        <div className="hcd-container hcd-cta__wrap">
          <h2>Ready to Move Your Heavy Cargo?</h2>
          <p>Get a customized quote for your heavy cargo shipment. Our experts will design the perfect logistics solution.</p>
        </div>
      </section>

      {/* Footer (shared layout) */}
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

export default HeavyCargoDetails;
