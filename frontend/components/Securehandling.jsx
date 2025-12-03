import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Securehandling.css';
import logoDark from '../src/assets/logostarshipping2.png';
import heroSecure from '../src/assets/securehandling.jpg';
import safetyImg from '../src/assets/heavycargo.jpg';

const Securehandling = () => {
  const [scrolled, setScrolled] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);
  const onTimeRef = useRef(null);
  const opsRef = useRef(null);
  const damageRef = useRef(null);
  const statsRef = useRef(null);
  const scrollTopBtnRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fade-in on load for hero text
  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.querySelector('.sh-hero__content');
      if (el) el.classList.add('enter');
    }, 50);
    return () => clearTimeout(t);
  }, []);

  // Intersection animations for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Animated counters for stats
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !countersStarted) {
            setCountersStarted(true);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [countersStarted]);

  useEffect(() => {
    if (!countersStarted) return;
    const animate = (el, end, suffix = '', duration = 1200) => {
      if (!el) return;
      const start = 0;
      const startTs = performance.now();
      const animateStep = (now) => {
        const p = Math.min(1, (now - startTs) / duration);
        const value = Math.floor(start + (end - start) * p);
        el.textContent = `${value}${suffix}`;
        if (p < 1) requestAnimationFrame(animateStep);
      };
      requestAnimationFrame(animateStep);
    };
    animate(onTimeRef.current, 95, '%');
    animate(opsRef.current, 24, '/7');
    animate(damageRef.current, 99, '.7%');
  }, [countersStarted]);

  // Scroll to top button visibility & action
  useEffect(() => {
    const btn = scrollTopBtnRef.current;
    if (!btn) return;
    const onScroll = () => {
      if (window.scrollY > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="sh-page">
      {/* Header (same structure as others, without extra CTA button) */}
      <header className={`sh-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="sh-nav__container">
          <Link to="/" className="sh-nav__brand">
            <img src={logoDark} alt="StarShipping" className="sh-nav__logo" />
            <span>StarShipping</span>
          </Link>
          <nav className="sh-nav__links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero (keep consistent with other components) */}
      <section className="sh-hero" style={{ backgroundImage: `url(${heroSecure})` }}>
        <div className="sh-hero__overlay" />
        <div className="hero-decor">
          <div className="float-icon f1">📦</div>
          <div className="float-icon f2">🚢</div>
          <div className="float-icon f3">🛡️</div>
        </div>
        <div className="container">
          <div className="sh-hero__content fade-on-load">
            <h1 className="sh-hero__title">Your Cargo, Our Responsibility</h1>
            <p className="sh-hero__subtitle">Every shipment is handled with care to ensure it arrives safely & on time.</p>
            <div className="sh-hero__actions">
              <Link to="/booking" className="btn-dark" style={{ textDecoration: 'none' }}>
                Talk to an Agent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Security Features */}
      <section className="sh-features reveal-on-scroll">
        <div className="container">
          <h2 className="center">Advanced Security Features</h2>
          <p className="center muted">Controls in place to protect your cargo at every step of the journey</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📡</div>
              <h3>Real-Time Tracking</h3>
              <div className="feature-tagline">Never lose sight of your shipment.</div>
              <p>Monitor your delivery status and location in real time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>24/7 Surveillance</h3>
              <div className="feature-tagline">Facilities monitored around the clock.</div>
              <p>Secure facilities with monitored access control.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Tamper-Proof Packaging</h3>
              <div className="feature-tagline">Sealed and verified at every handoff.</div>
              <p>Sealed, documented, and verified at each handoff.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Certified Procedures</h3>
              <div className="feature-tagline">Audited, standardized SOPs.</div>
              <p>Standardized SOPs audited across our global network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Checks split section */}
      <section className="sh-safety reveal-on-scroll">
        <div className="container split">
          <div className="split__media">
            <img src={safetyImg} alt="Safety inspections" />
          </div>
          <div className="split__text text-panel">
            <h2 className="safety-title">Rigorous Safety Checks</h2>
            <p className="subtext safety-intro">
              Our multi-layer inspection protocol ensures every shipment meets strict safety standards from pickup to final delivery.
            </p>
            <ul className="checklist">
              <li className="checklist-item">
                <span className="bullet-icon">🛡️</span>
                <span className="bullet-text">Multi-point inspection before dispatch</span>
              </li>
              <li className="checklist-item">
                <span className="bullet-icon">✅</span>
                <span className="bullet-text">Sealed verification at each stage</span>
              </li>
              <li className="checklist-item">
                <span className="bullet-icon">🔍</span>
                <span className="bullet-text">On-site monitoring and review</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline: How we secure your shipment */}
      <section className="sh-timeline reveal-on-scroll">
        <div className="container">
          <h2 className="center">How We Secure Your Shipment</h2>
          <div className="timeline">
            <div className="t-step">
              <div className="t-icon">📦</div>
              <div className="t-title">Pickup</div>
              <div className="t-desc">Cargo collected and verified.</div>
            </div>
            <div className="t-step">
              <div className="t-icon">🛡️</div>
              <div className="t-title">Inspection</div>
              <div className="t-desc">Security checks and sealing.</div>
            </div>
            <div className="t-step">
              <div className="t-icon">🛰️</div>
              <div className="t-title">Tracking</div>
              <div className="t-desc">Real‑time visibility.</div>
            </div>
            <div className="t-step">
              <div className="t-icon">🏁</div>
              <div className="t-title">Delivery</div>
              <div className="t-desc">Signed, confirmed, complete.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="sh-stats reveal-on-scroll" ref={statsRef}>
        <div className="container stats-wrap">
          <div className="numbers">
            <div className="num"><div className="val with-icon">⏱️ <span ref={onTimeRef}>0%</span></div><div className="lbl">On-time arrival</div></div>
            <div className="num"><div className="val with-icon">🎧 <span ref={opsRef}>0/7</span></div><div className="lbl">Ops coverage</div></div>
            <div className="num"><div className="val with-icon">🛡️ <span ref={damageRef}>0%</span></div><div className="lbl">Damage-free rate</div></div>
          </div>
        </div>
      </section>

      {/* CTA (no user review section per request) */}
      <section className="sh-cta">
        <div className="container cta-wrap">
          <h2>Ship Securely with StarShipping Today</h2>
          <p>Join thousands who trust us with their most valuable shipments.</p>
          <Link to="/booking" className="btn-white" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Start Shipping
          </Link>
        </div>
      </section>

      {/* Footer same as homepage */}
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
                <Link to="/services">Domestic Shipping</Link>
                <Link to="/services">International Shipping</Link>
                <Link to="/services">Express Delivery</Link>
                <Link to="/services">Special Cargo</Link>
              </div>
              <div className="footer__col">
                <h4>Company</h4>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
                <a href="#">Careers</a>
                <a href="#">News</a>
              </div>
              <div className="footer__col">
                <h4>Connect</h4>
                <div className="footer__socials">
                  <a href="#">📘</a>
                  <a href="#">🐦</a>
                  <a href="#">💼</a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p>© 2025 StarShipping. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        ref={scrollTopBtnRef}
        className="scroll-top"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >↑</button>
    </div>
  );
};

export default Securehandling;
