import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.css';

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    function listener(event) {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    }
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return !!window.localStorage.getItem('authToken');
    } catch (e) {
      return false;
    }
  });
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useOnClickOutside(wrapperRef, () => setOpen(false));

  useEffect(() => {
    // Re-check auth token whenever the menu is opened
    if (open) {
      try {
        setIsLoggedIn(!!window.localStorage.getItem('authToken'));
      } catch (e) {}
    }
  }, [open]);

  function toggleOpen() {
    setOpen(!open);
  }

  function handleSignup() {
    setOpen(false);
    navigate('/signup');
  }

  function handleDashboard() {
    setOpen(false);
    navigate('/dashboard');
  }

  function handleBookings() {
    setOpen(false);
    navigate('/booking');
  }

  function handleProfile() {
    setOpen(false);
    navigate('/profile');
  }

  function handleLogout() {
    setOpen(false);
    try {
      window.localStorage.removeItem('authToken');
    } catch (e) {}
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <div className="profile-menu-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="profile-trigger-button"
        onClick={toggleOpen}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="profile-trigger-inner">
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

      <div className={`profile-dropdown ${open ? 'profile-dropdown--open' : ''}`}>
        {!isLoggedIn ? (
          <div className="profile-dropdown-inner">
            <button
              type="button"
              className="profile-primary-btn"
              onClick={function () {
                setOpen(false);
                navigate('/login');
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className="profile-secondary-btn"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="profile-dropdown-inner">
            <button type="button" className="profile-item" onClick={handleDashboard}>
              <span className="profile-item-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h7v7H4zM13 4h7v5h-7zM13 11h7v9h-7zM4 13h7v7H4z" />
                </svg>
              </span>
              <span className="profile-item-label">Dashboard</span>
            </button>
            <div className="profile-divider" />
            <button type="button" className="profile-item profile-item--danger" onClick={handleLogout}>
              <span className="profile-item-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M10 5h3v2h-3v10h3v2h-3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
                  <path d="M14 11h5v2h-5l1.8 1.8-1.4 1.4L10.4 12l4-4.2 1.4 1.4z" />
                </svg>
              </span>
              <span className="profile-item-label">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
