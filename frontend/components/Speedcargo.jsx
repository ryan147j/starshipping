import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Speedcargo.css';
import logoDark from '../src/assets/logostarshipping2.png';
import speedImg from '../src/assets/speedcargo.jpg';

const Speedcargo = () => {
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef(null);
  const revealsRef = useRef([]);
  const imgRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal on view
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
        }
      });
    }, { threshold: 0.15 });

    revealsRef.current.forEach(el => el && io.observe(el));
    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll('.scg-stat');
      cards.forEach((c, i) => {
        setTimeout(() => c.classList.add('show'), 120 + i * 120);
      });
    }
    return () => io.disconnect();
  }, []);

  // Parallax on hero image
  useEffect(() => {
    const handler = () => {
      if (!imgRef.current) return;
      const y = window.scrollY;
      const t = Math.min(20, y * 0.06);
      imgRef.current.style.transform = `translateY(${t}px)`;
    };
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const setRevealRef = (el) => {
    if (el && !revealsRef.current.includes(el)) revealsRef.current.push(el);
  };

  return (
    <div className="scg-page scg-bg">
      {/* Header */}
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

      {/* Hero */}
      <section className="scg-hero">
        <div className="container scg-hero__grid">
          <div>
            <h1 className="scg-hero__title reveal" ref={setRevealRef}>Speed Cargo, Delivered in Record Time</h1>
            <p className="scg-hero__subtitle reveal" ref={setRevealRef}>Premium express air delivery with guaranteed arrival. Trust SpeedCargo to get there in time and faster than ever before.</p>
            <div className="scg-cta-row reveal" ref={setRevealRef}>
              <Link to="/booking" className="btn-yellow" style={{ textDecoration: 'none' }}>
                Book Express Delivery
              </Link>
            </div>
          </div>
          <div className="scg-hero__image" ref={setRevealRef}>
            <img ref={imgRef} src={speedImg} alt="Speed Cargo" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="scg-features">
        <div className="container">
          <h2>Lightning‑Fast Features</h2>
          <div className="scg-features__grid">
            <div className="scg-feature reveal" ref={setRevealRef}><div className="ico">⚡</div><div className="ttl">Priority Dispatch</div><div className="txt">First‑in‑line processing for premium shipments.</div></div>
            <div className="scg-feature reveal" ref={setRevealRef}><div className="ico">🌍</div><div className="ttl">Global Express Network</div><div className="txt">Worldwide routes for fastest delivery.</div></div>
            <div className="scg-feature reveal" ref={setRevealRef}><div className="ico">🛰️</div><div className="ttl">Real‑Time Tracking</div><div className="txt">Live location updates every step.</div></div>
            <div className="scg-feature reveal" ref={setRevealRef}><div className="ico">✅</div><div className="ttl">Guaranteed Timelines</div><div className="txt">Delivery commitments you can rely on.</div></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="scg-stats">
        <div className="container scg-stats__grid" ref={statsRef}>
          <div className="scg-stat"><div className="num">98%</div><div className="lbl">On‑Time Delivery</div></div>
          <div className="scg-stat"><div className="num">24h</div><div className="lbl">Domestic Delivery</div></div>
          <div className="scg-stat"><div className="num">120+</div><div className="lbl">Countries Active</div></div>
        </div>
      </section>

      {/* Steps */}
      <section className="scg-steps">
        <div className="container">
          <h2>Express Delivery Process</h2>
          <div className="scg-steps__grid">
            <div className="scg-step reveal" ref={setRevealRef}><div className="circle">📨</div><div className="t">Pickup Request</div><div className="txt">Schedule a convenient pickup.</div></div>
            <div className="scg-step reveal" ref={setRevealRef}><div className="circle">📦</div><div className="t">Priority Packaging</div><div className="txt">Optimized packing for speed.</div></div>
            <div className="scg-step reveal" ref={setRevealRef}><div className="circle">✈️</div><div className="t">Express Routing</div><div className="txt">Fastest air routes selected.</div></div>
            <div className="scg-step reveal" ref={setRevealRef}><div className="circle">✅</div><div className="t">Delivery Confirmation</div><div className="txt">Proof of delivery and updates.</div></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="scg-cta">
        <div className="waves" aria-hidden="true" />
        <div className="container content">
          <h2>Need it there now?</h2>
          <p>Choose StarShipping Speed Cargo</p>
          <div className="scg-cta-row">
            <Link to="/booking" className="btn-yellow" style={{textDecoration:'none'}}>Talk to an Agent</Link>
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

export default Speedcargo;
