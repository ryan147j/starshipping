import React, { useEffect, useRef, useState } from 'react';
import './RoadtransportDetails.css';
import '../components/Homepage.css';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import Header from './Header';
import logoDark from '../src/assets/logostarshipping2.png';
import roadcargo from '../src/assets/roadcargo2.mp4';

const RoadtransportDetails = () => {
  const progressRef = useRef(null);
  const heroVideoRef = useRef(null);
  const processRef = useRef(null);
  const statsRef = useRef(null);
  const [tIndex, setTIndex] = useState(0);
  const navigate = useNavigate();

  // Header scrolled state handled inside shared Header component

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.rtx-reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Scroll progress + parallax + truck movement
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = pct + '%';
      // Parallax hero video
      if (heroVideoRef.current) {
        const translate = Math.min(20, scrollTop * 0.04);
        heroVideoRef.current.style.transform = `scale(1.03) translateY(${translate}px)`;
      }
      // Truck animation along line within process section
      if (processRef.current) {
        const rect = processRef.current.getBoundingClientRect();
        const viewH = window.innerHeight || doc.clientHeight;
        const visible = Math.min(viewH, Math.max(0, viewH - Math.max(0, rect.top))) / (rect.height || 1);
        const clamped = Math.max(0, Math.min(1, visible));
        const line = processRef.current.querySelector('.rtx-steps__line');
        const truck = processRef.current.querySelector('.rtx-truck');
        if (line && truck) {
          const lineRect = line.getBoundingClientRect();
          const width = Math.max(0, lineRect.width - 28); // subtract truck size
          const x = width * clamped;
          truck.style.transform = `translateX(${x}px)`;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Count-up for stats when visible
  useEffect(() => {
    const nums = [];
    const el = statsRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll('.rtx-stat .val'));
    const parseTarget = (txt) => {
      const hasPlus = /\+$/.test(txt.trim());
      const num = parseFloat(txt.replace(/[^0-9.]/g, '')) || 0;
      const isPercent = /%/.test(txt);
      return { num, hasPlus, isPercent, suffix: txt.replace(/[0-9.]/g, '') };
    };
    const targets = items.map(i => parseTarget(i.textContent || '0'));
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // animate
          let start = null;
          const duration = 1000;
          const idx = items.indexOf(entry.target);
          const { num, hasPlus, isPercent, suffix } = targets[idx];
          const step = (ts)=>{
            if (!start) start = ts;
            const p = Math.min(1, (ts - start)/duration);
            const val = Math.floor(num * p);
            entry.target.textContent = `${val}${isPercent ? '%' : ''}${hasPlus && !isPercent ? '+' : ''}`;
            if (p < 1) requestAnimationFrame(step); else entry.target.textContent = `${num}${suffix}`;
          };
          requestAnimationFrame(step);
          io.unobserve(entry.target);
        }
      })
    },{threshold:0.4});
    items.forEach(i => io.observe(i));
    return () => io.disconnect();
  }, []);

  // Testimonials auto-rotate
  useEffect(() => {
    const id = setInterval(() => setTIndex(prev => (prev + 1) % 2), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rtx-page">
      <div className="rtx-progress" ref={progressRef} />
      <Header transparentOnTop={true} active="services" />

      {/* Hero */}
      <section className="rtx-hero">
        <video
          ref={heroVideoRef}
          className="rtx-hero__video"
          src={roadcargo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => { try { if (heroVideoRef.current) heroVideoRef.current.play(); } catch (e) {} }}
        />
        <div className="rtx-hero__overlay" />
        <div className="rtx-hero__content">
          <h1 className="rtx-hero__title rtx-fade-up">Road Transport Services</h1>
          <p className="rtx-hero__subtitle rtx-fade-up" style={{animationDelay:'120ms'}}>
            Reliable, flexible, and cost-effective ground logistics across regions.
          </p>
          <div className="rtx-hero__actions">
            <button className="btn-outline" type="button" onClick={()=> navigate('/services')}>Back to Services</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="rtx-section">
        <div className="container">
          <h2 className="center">Why Choose Our Road Transport</h2>
          <p className="center muted">Dependable delivery for regional and cross-border shipments with full visibility.</p>
          <div className="rtx-features">
            {[{ico:'🗺️',t:'Flexible Routes',d:'Custom transport plans for any distance or schedule.'},
              {ico:'🌐',t:'Cross-Border Expertise',d:'Seamless international delivery through customs.'},
              {ico:'🛡️',t:'Cargo Protection',d:'Secure handling for every shipment.'}].map((c,i)=> (
              <div className="rtx-card rtx-reveal" style={{transitionDelay:`${80*i}ms`}} key={c.t}>
                <div className="rtx-card__ico">{c.ico}</div>
                <div className="rtx-card__title">{c.t}</div>
                <div className="rtx-card__desc">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="rtx-process rtx-section" ref={processRef}>
        <div className="container">
          <h2 className="center">How It Works</h2>
          <div className="rtx-steps">
            {(() => {
              const steps = [
                { ico: '📝', t: 'Booking' },
                { ico: '📦', t: 'Loading' },
                { ico: '🚚', t: 'Transit' },
                { ico: '📬', t: 'Delivery' }
              ];
              const nodes = [];
              steps.forEach((s, i) => {
                nodes.push(
                  <div className="rtx-step rtx-reveal" style={{ transitionDelay: `${80 * i}ms` }} key={`step-${s.t}`}>
                    <div className="rtx-step__ico" aria-hidden>{s.ico}</div>
                    <div className="rtx-step__label">{s.t}</div>
                  </div>
                );
                if (i < steps.length - 1) {
                  nodes.push(
                    <div className="rtx-arrow" aria-hidden key={`arrow-${i}`}>
                      <svg viewBox="0 0 48 12" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="rtx-arrow-grad" x1="0" x2="1">
                            <stop offset="0%" stopColor="#93c5fd"/>
                            <stop offset="100%" stopColor="#60a5fa"/>
                          </linearGradient>
                        </defs>
                        <path d="M1 6 H38" stroke="url(#rtx-arrow-grad)" strokeWidth="3" strokeLinecap="round"/>
                        <path d="M38 2 L47 6 L38 10" fill="none" stroke="url(#rtx-arrow-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  );
                }
              });
              return nodes;
            })()}
          </div>
        </div>
      </section>

      {/* Stats / Testimonials */}
      <section className="rtx-stats rtx-section" ref={statsRef}>
        <div className="container rtx-stats__grid">
          {[
            {v:'98%',l:'On-Time Delivery'},
            {v:'500+',l:'Satisfied Clients'},
            {v:'120K+',l:'Yearly Truck Shipments'}
          ].map((s,i)=> (
            <div className="rtx-stat rtx-reveal" style={{transitionDelay:`${80*i}ms`}} key={s.l} data-animate="true">
              <div className="val">{s.v}</div>
              <div className="lab">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="rtx-testimonials rtx-section">
        <div className="container" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
          <h2 className="center">What Our Clients Say</h2>
          <p className="center muted">Trusted by industry leaders</p>
          <div className="rtx-t-grid">
            <div className="rtx-t-card rtx-reveal" style={{opacity: tIndex===0?1:.35}}>
              <div className="rtx-t-avatar" />
              <div className="rtx-t-body">
                <div className="name">Michael Chen</div>
                <div className="role">Supply Chain Manager</div>
                <p>“StarShipping has transformed our logistics operations. Their on-time performance and proactive communication give us complete peace of mind.”</p>
              </div>
            </div>
            <div className="rtx-t-card rtx-reveal" style={{opacity: tIndex===1?1:.35}}>
              <div className="rtx-t-avatar" />
              <div className="rtx-t-body">
                <div className="name">Sarah Williams</div>
                <div className="role">Logistics Director</div>
                <p>“Exceptional service! Their cross-border expertise keeps goods moving smoothly and on schedule.”</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rtx-cta">
        <div className="container rtx-cta__wrap rtx-reveal">
          <h2>Need your goods delivered on time? Let’s hit the road together!</h2>
          <button className="btn-blue" type="button" onClick={() => navigate('/contact')}>
            Contact Us
          </button>
        </div>
      </section>

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

export default RoadtransportDetails;
