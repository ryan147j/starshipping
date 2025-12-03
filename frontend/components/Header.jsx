import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import logoDark from '../src/assets/logostarshipping2.png';
import ProfileMenu from './ProfileMenu';

const Header = ({ transparentOnTop = true, active = '' }) => {
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      const scrolled = window.scrollY > 20;
      if (scrolled) navRef.current.classList.add('scrolled');
      else navRef.current.classList.remove('scrolled');
      if (transparentOnTop) {
        if (!scrolled) navRef.current.classList.add('transparent');
        else navRef.current.classList.remove('transparent');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [transparentOnTop]);

  return (
    <header className={`site-nav${transparentOnTop ? ' transparent' : ''}`} ref={navRef}>
      <div className="site-nav__container">
        <Link to="/" className="site-nav__brand">
          <img src={logoDark} alt="StarShipping" className="site-nav__logo" />
          <span>StarShipping</span>
        </Link>
        <div className="site-nav__right">
          <nav className="site-nav__links">
            <NavLink to="/" className={({isActive}) => isActive || active==='home' ? 'active' : ''}>Home</NavLink>
            <NavLink to="/services" className={({isActive}) => isActive || active==='services' ? 'active' : ''}>Services</NavLink>
            <NavLink to="/reviews" className={({isActive}) => isActive || active==='reviews' ? 'active' : ''}>Reviews</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive || active==='about' ? 'active' : ''}>About</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive || active==='contact' ? 'active' : ''}>Contact</NavLink>
          </nav>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
