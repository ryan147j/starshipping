import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import logoDark from '../src/assets/logostarshipping2.png';
import { API_BASE_URL } from '../config';

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async function (e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic front-end validation to avoid unnecessary requests
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_BASE_URL + '/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          phone: phone,
          password: password,
          confirmPassword: confirmPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data && data.message ? data.message : 'Signup failed.');
        setLoading(false);
        return;
      }

      setSuccess('Account created successfully. You can now log in.');
      setLoading(false);

      // Optional: redirect to login after a short delay
      setTimeout(function () {
        navigate('/login');
      }, 1200);
    } catch (err) {
      console.error('Signup request error:', err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <div className="signup-logo-box">
            <img src={logoDark} alt="StarShipping" className="signup-logo-icon" />
          </div>
          <div className="signup-title">Create Your Account</div>
          <p className="signup-subtitle">
            Join StarShipping to track your bookings and manage your shipments.
          </p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-fullname">
              Full Name
            </label>
            <div className="signup-input-wrapper">
              <span className="signup-input-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 12a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6.5 18.5c1.1-2.1 3.1-3.5 5.5-3.5s4.4 1.4 5.5 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                id="signup-fullname"
                type="text"
                className="signup-input"
                placeholder="Full Name"
                value={fullName}
                onChange={function (e) { setFullName(e.target.value); }}
              />
            </div>
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-email">
              Email Address
            </label>
            <div className="signup-input-wrapper">
              <span className="signup-input-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 6.5h16a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M4 8l8 4.5L20 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                id="signup-email"
                type="email"
                className="signup-input"
                placeholder="Email Address"
                value={email}
                onChange={function (e) { setEmail(e.target.value); }}
              />
            </div>
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-phone">
              Phone Number
            </label>
            <div className="signup-input-wrapper">
              <span className="signup-input-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M7 4.5h10a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 18V6A1.5 1.5 0 0 1 7 4.5z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <circle cx="12" cy="17" r="0.9" fill="currentColor" />
                </svg>
              </span>
              <input
                id="signup-phone"
                type="tel"
                className="signup-input"
                placeholder="Phone Number"
                value={phone}
                onChange={function (e) { setPhone(e.target.value); }}
              />
            </div>
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-password">
              Password
            </label>
            <div className="signup-input-wrapper">
              <span className="signup-input-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="6"
                    y="10"
                    width="12"
                    height="9"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M9 10V8a3 3 0 0 1 6 0v2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="14.5" r="1" fill="currentColor" />
                </svg>
              </span>
              <input
                id="signup-password"
                type="password"
                className="signup-input"
                placeholder="Password"
                value={password}
                onChange={function (e) { setPassword(e.target.value); }}
              />
            </div>
            <div className="signup-password-helper">Minimum 8 characters.</div>
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-confirm">
              Confirm Password
            </label>
            <div className="signup-input-wrapper">
              <span className="signup-input-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="6"
                    y="10"
                    width="12"
                    height="9"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M9 10V8a3 3 0 0 1 6 0v2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="14.5" r="1" fill="currentColor" />
                </svg>
              </span>
              <input
                id="signup-confirm"
                type="password"
                className="signup-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={function (e) { setConfirmPassword(e.target.value); }}
              />
            </div>
          </div>

          <div className="signup-terms-row">
            <input
              id="signup-terms"
              type="checkbox"
              className="signup-checkbox"
            />
            <label htmlFor="signup-terms">
              I agree to the{' '}
              <a href="#" className="signup-terms-link">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {error && (
          <div className="signup-error" style={{ color: '#dc2626', fontSize: '12px', marginTop: '6px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="signup-success" style={{ color: '#16a34a', fontSize: '12px', marginTop: '6px', textAlign: 'center' }}>
            {success}
          </div>
        )}

        <div className="signup-divider">
          <div className="signup-divider-line" />
          <div className="signup-divider-text">Already have an account?</div>
          <div className="signup-divider-line" />
        </div>

        <button
          type="button"
          className="signup-login-button"
          onClick={() => navigate('/login')}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M13 5h-2a5 5 0 0 0-5 5v4"
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M11 12h8m0 0-3-3m3 3-3 3"
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Login</span>
        </button>
      </div>
    </div>
  );
}

export default Signup;

