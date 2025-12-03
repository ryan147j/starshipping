import React from 'react';
import { NavLink } from 'react-router-dom';
import './Homepage.css';
import logoDark from '../src/assets/logostarshipping2.png';

const Footer = () => {
  return (
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

        <div className="footer__separator"></div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} StarShipping. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
