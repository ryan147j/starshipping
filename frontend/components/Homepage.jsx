import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Homepage.css';
import logoDark from '../src/assets/logostarshipping2.png';
import heroImg from '../src/assets/contanership.jpg';
import service1 from '../src/assets/domesticshipping.jpg';
import service2 from '../src/assets/worldy.jpg';
import service3 from '../src/assets/specialcargo.jpg';
import speedCardImg from '../src/assets/speedcargo.jpg';
import aboutImg from '../src/assets/aboutsection.jpg';
import feature1 from '../src/assets/domesticshipping.jpg';
import feature2 from '../src/assets/airfreight.jpg';
import feature3 from '../src/assets/internationalshipping.jpg';
import feature4 from '../src/assets/customsupport.jpg';
import fiataLogo from '../src/assets/fiata.jpg';
import atlasLogo from '../src/assets/Atlas.png';
import glaLogo from '../src/assets/gla.png';

const Homepage = () => {
  const navRef = useRef(null);
  const loginRef = useRef(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return !!window.localStorage.getItem('authToken');
    } catch (e) {
      return false;
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 20) {
        navRef.current.classList.add('scrolled');
      } else {
        navRef.current.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!loginRef.current || loginRef.current.contains(e.target)) return;
      setLoginOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  function handleToggleLoginMenu() {
    setLoginOpen(!loginOpen);
  }

  function handleSignIn() {
    setLoginOpen(false);
    navigate('/login');
  }

  function handleSignUp() {
    setLoginOpen(false);
    navigate('/signup');
  }

  function handleDashboard() {
    setLoginOpen(false);
    navigate('/dashboard');
  }

  function handleLogout() {
    try {
      window.localStorage.removeItem('authToken');
    } catch (e) {}
    setIsLoggedIn(false);
    setLoginOpen(false);
  }

  return (
    <div className="homepage">
      {/* Navigation */}
      <header className="nav" ref={navRef}>
        <div className="nav__container">
          <div className="nav__logo">
            <img src={logoDark} alt="StarShipping Logo" />
            <span className="nav__brand">StarShipping</span>
          </div>
          <div className="nav__right" ref={loginRef}>
            <nav className="nav__links">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
              <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink>
              <NavLink to="/reviews" className={({ isActive }) => isActive ? 'active' : ''}>Reviews</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
            </nav>
            <button
              type="button"
              className="nav-login-icon"
              onClick={handleToggleLoginMenu}
              aria-label="Account menu"
              aria-haspopup="true"
              aria-expanded={loginOpen}
            >
              <span className="nav-login-icon-inner">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M6.5 18.2c.9-2.3 2.8-3.7 5.5-3.7s4.6 1.4 5.5 3.7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <div className={`nav-login-dropdown${loginOpen ? ' nav-login-dropdown--open' : ''}`}>
              {!isLoggedIn ? (
                <div className="nav-login-dropdown-inner">
                  <button type="button" className="nav-login-item nav-login-item-primary" onClick={handleSignIn}>
                    Sign In
                  </button>
                  <button type="button" className="nav-login-item" onClick={handleSignUp}>
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="nav-login-dropdown-inner">
                  <button type="button" className="nav-login-item" onClick={handleDashboard}>
                    Dashboard
                  </button>
                  <button type="button" className="nav-login-item nav-login-item-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero-overlay"></div>
        <div className="home-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Ship Worldwide with <span className="highlight">Confidence</span>.
            </h1>
            <p className="hero-subtitle">
              Experience fast, reliable, and cost-effective shipping solutions that connect your business to the world.
              <br />
              From small packages to large cargo, we deliver excellence across 150+ countries.
            </p>
            <div className="hero-buttons-row">
              <button
                type="button"
                className="btn-hero-yellow"
                onClick={() => navigate('/booking')}
              >
                Request a Shipment
              </button>
              <button
                type="button"
                className="btn-hero-outline"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </button>
              <button
                type="button"
                className="btn-hero-outline"
                onClick={() => navigate('/reviews')}
              >
                Reviews
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="whychoose">
        <h2 className="section__title">Why Choose StarShipping</h2>
        <p className="section__subtitle">Trusted by thousands of businesses globally for our commitment to service and reliability.</p>
        <div className="whychoose__grid">
          <NavLink to="/fast-delivery" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="whychoose__card whychoose__card--blue">
              <img src={feature1} alt="Full Delivery" />
              <div className="whychoose__card-title">Fast Delivery</div>
              <div className="whychoose__card-desc">Door-to-door, on-time, every time.</div>
            </div>
          </NavLink>
          <NavLink to="/global-coverage" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="whychoose__card whychoose__card--yellow">
              <img src={feature2} alt="Global Coverage" />
              <div className="whychoose__card-title">Global Coverage</div>
              <div className="whychoose__card-desc">150+ countries, local expertise.</div>
            </div>
          </NavLink>
          <NavLink to="/secure-handling" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="whychoose__card whychoose__card--purple">
              <img src={feature4} alt="Secure Handling" />
              <div className="whychoose__card-title">Secure Handling</div>
              <div className="whychoose__card-desc">Insured, safe, and reliable.</div>
            </div>
          </NavLink>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="services">
        <h2 className="section__title">Our Services</h2>
        <p className="section__subtitle">Complete solutions for all your shipping needs</p>
        <div className="services__grid">
          <NavLink to="/domestic-shipping" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="services__card">
              <img src={service1} alt="Domestic Shipping" />
              <div className="services__card-title">Domestic Shipping</div>
              <div className="services__card-desc">Reliable shipping within your country with real-time tracking.</div>
            </div>
          </NavLink>
          <NavLink to="/international-shipping" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="services__card">
              <img src={service2} alt="International Shipping" />
              <div className="services__card-title">International Shipping</div>
              <div className="services__card-desc">Global reach, customs support, and competitive rates.</div>
            </div>
          </NavLink>
          <NavLink to="/special-cargo" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="services__card">
              <img src={service3} alt="Special Cargo" />
              <div className="services__card-title">Special Cargo</div>
              <div className="services__card-desc">Oversized, fragile, or hazardous materials handled with care.</div>
            </div>
          </NavLink>
          <NavLink to="/speed-cargo" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="services__card">
              <img src={speedCardImg} alt="Speed Cargo" />
              <div className="services__card-title">Speed Cargo</div>
              <div className="services__card-desc">Express delivery for urgent shipments worldwide.</div>
            </div>
          </NavLink>
        </div>
        <div className="services__more">
          <NavLink to="/services" style={{ textDecoration: 'none' }}>
            <button className="services__viewmore">View More</button>
          </NavLink>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about__container">
          <div className="about__text">
            <h2 className="section__title">About StarShipping</h2>
            <p>StarShipping leads the way in global logistics, connecting businesses and people for over 10 years. Our mission is to make shipping simple, reliable, and accessible for all.</p>
            <div className="about__stats">
              <div className="about__stat"><span>10</span> Years Experience</div>
              <div className="about__stat"><span>150+</span> Countries</div>
              <div className="about__stat"><span>100K</span> Happy Customers</div>
            </div>
          </div>
          <div className="about__image">
            <img src={aboutImg} alt="About StarShipping" />
          </div>
        </div>
      </section>

      {/* Trusted Worldwide Section */}
      <section className="trusted">
        <div className="trusted__container">
          <h2 className="section__title">Trusted Worldwide</h2>
          <p className="section__subtitle">Numbers that speak for our reliability and excellence.</p>
          <div className="trusted__stats">
            <div className="trusted__stat">
              <div className="trusted__stat-number">200K+</div>
              <div className="trusted__stat-label">Packages Delivered</div>
            </div>
            <div className="trusted__stat">
              <div className="trusted__stat-number">99.9%</div>
              <div className="trusted__stat-label">On-Time Delivery</div>
            </div>
            <div className="trusted__stat">
              <div className="trusted__stat-number">150+</div>
              <div className="trusted__stat-label">Countries Served</div>
            </div>
            <div className="trusted__stat">
              <div className="trusted__stat-number">24/7</div>
              <div className="trusted__stat-label">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section__title">What Our Customers Say</h2>
        <div className="testimonials__grid">
          <div className="testimonial">
            <div className="testimonial__content">"StarShipping has been instrumental in our global expansion. Their reliable service and competitive pricing have saved us both time and money."</div>
            <div className="testimonial__author">
              <span className="testimonial__avatar">MC</span>
              <span className="testimonial__info">
                <span className="testimonial__name">Michael Chen</span>
                <span className="testimonial__role">CEO, TechStart Inc.</span>
              </span>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial__content">"The tracking system is fantastic and customer service is exceptional. We've never had any issues with our international shipments."</div>
            <div className="testimonial__author">
              <span className="testimonial__avatar">SJ</span>
              <span className="testimonial__info">
                <span className="testimonial__name">Sarah Johnson</span>
                <span className="testimonial__role">Operations Manager</span>
              </span>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial__content">"Professional, efficient, and trustworthy. StarShipping handles our most valuable cargo with the utmost care and security."</div>
            <div className="testimonial__author">
              <span className="testimonial__avatar">DR</span>
              <span className="testimonial__info">
                <span className="testimonial__name">David Rodriguez</span>
                <span className="testimonial__role">Import/Export Business</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications / Memberships Section */}
      <section className="certs">
        <div className="certs__inner">
          <h2 className="certs__title">Proudly Certified &amp; Globally Recognized</h2>
          <div className="certs__underline" />
          <div className="certs__grid">
            <div className="certs__card">
              <div className="certs__logo-wrap">
                <img src={fiataLogo} alt="FIATA" />
              </div>
              <div className="certs__name">FIATA</div>
            </div>
            <div className="certs__card">
              <div className="certs__logo-wrap">
                <img src={atlasLogo} alt="ATLAS" />
              </div>
              <div className="certs__name">ATLAS</div>
            </div>
            <div className="certs__card">
              <div className="certs__logo-wrap">
                <img src={glaLogo} alt="Global Logistics Alliance" />
              </div>
              <div className="certs__name">Global Logistics Alliance</div>
            </div>
          </div>
          <p className="certs__desc">
            These global memberships reinforce our commitment to international standards, compliance, and secure freight handling.
          </p>
        </div>
      </section>

      {/* Footer (homepage specific, improved UI without Tailwind) */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <img src={logoDark} alt="StarShipping Logo" className="footer__logo--invert" />
              <h4 className="footer__heading-sm">About StarShipping</h4>
              <p>
                We provide reliable logistics solutions across ocean, air, and road—plus warehousing and
                customs services—helping you move cargo efficiently and securely worldwide.
              </p>
            </div>

            {/* Company */}
            <div className="footer__col">
              <h4>Company</h4>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/reviews">Reviews</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>

            {/* Services */}
            <div className="footer__col">
              <h4>Services</h4>
              <NavLink to="/services#ocean">Ocean Freight</NavLink>
              <NavLink to="/services#air">Air Freight</NavLink>
              <NavLink to="/services#road">Road Transport</NavLink>
              <NavLink to="/services#customs">Customs & Clearance</NavLink>
            </div>

            {/* Connect */}
            <div className="footer__col">
              <h4>Connect</h4>
              <div className="footer__socials">
                <a href="https://facebook.com/" aria-label="Facebook" className="footer__icon-link">
                  <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.02H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.77l-.44 2.9h-2.33v7.02C18.34 21.26 22 17.09 22 12.07z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/" aria-label="LinkedIn" className="footer__icon-link">
                  <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7.5 0h3.84v1.98h.05c.54-1.02 1.86-2.1 3.83-2.1 4.1 0 4.86 2.7 4.86 6.2V23h-4v-6.28c0-1.5-.03-3.42-2.09-3.42-2.09 0-2.41 1.63-2.41 3.31V23h-4V8.5z" />
                  </svg>
                </a>
                <a href="https://instagram.com/" aria-label="Instagram" className="footer__icon-link">
                  <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .4 1.5.9.5.5.7.9.9 1.5.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.4 1-.9 1.5-.5.5-.9.7-1.5.9-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.4-1.5-.9-.5-.5-.7-.9-.9-1.5-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.4-1 .9-1.5.5-.5.9-.7 1.5-.9.4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.8.1-1 0-1.6.2-1.9.3-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.1.3-.3.9-.3 1.9-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c0 1 .2 1.6.3 1.9.2.5.4.9.8 1.3.4.4.8.6 1.3.8.3.1.9.2 1.9.3 1.3.1 1.7.1 4.9.1s3.5 0 4.8-.1c1 0 1.6-.2 1.9-.3.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.1-.3.3-.9.3-1.9.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c0-1-.2-1.6-.3-1.9-.2-.5-.4-.9-1.3-.8-.3-.1-.9-.2-1.9-.3-1.3-.1-1.7-.1-4.8-.1zm0 3.2a6.8 6.8 0 1 1 0 13.6 6.8 6.8 0 0 1 0-13.6zm0 2.1a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm5-2.6a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* separator */}
          <div className="footer__separator"></div>

          <div className="footer__bottom">
            <p>© {new Date().getFullYear()} StarShipping. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
