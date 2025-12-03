import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logoDark from '../src/assets/logostarshipping2.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || loading) return;

    setLoading(true);
    setError('');

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(function (res) {
        var status = res.status;
        return res
          .json()
          .catch(function () {
            return null;
          })
          .then(function (data) {
            return { ok: res.ok, status: status, data: data };
          });
      })
      .then(function (result) {
        if (!result) {
          setError('Unable to login. Please try again.');
          return;
        }

        var status = result.status;
        var data = result.data || {};

        // Treat any non-error status (200-399) as a successful login
        if (status >= 200 && status < 400) {
          var token = data && data.data && data.data.token ? data.data.token : 'demo-token';
          var userObj = data && data.data && data.data.user ? data.data.user : null;
          var userName = userObj && (userObj.full_name || userObj.firstName || userObj.email) || '';
          var userEmail = userObj && userObj.email ? userObj.email : '';
          try {
            window.localStorage.setItem('authToken', token);
            if (userObj) {
              window.localStorage.setItem('authUser', JSON.stringify(userObj));
            }
            if (userName) window.localStorage.setItem('userName', userName);
            if (userEmail) window.localStorage.setItem('userEmail', userEmail);
          } catch (e) {}

          // Redirect based on role so admin and client see different dashboards
          if (userObj && userObj.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/dashboard');
          }
        } else {
          setError(data && data.message ? data.message : 'Invalid email or password');
        }
      })
      .catch(function () {
        setError('Network error. Please try again.');
      })
      .finally(function () {
        setLoading(false);
      });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-box">
            <img src={logoDark} alt="StarShipping" className="login-logo-icon" />
          </div>
          <div className="login-title">Welcome Back</div>
          <p className="login-subtitle">
            Log in to access your bookings, tracking, and account.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label" htmlFor="login-email">
              Email Address
            </label>
            <div className="login-input-wrapper">
              <span className="login-input-icon">
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
                id="login-email"
                type="email"
                className="login-input"
                placeholder="you@example.com"
                value={email}
                onChange={function (e) { setEmail(e.target.value); }}
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="login-password">
              Password
            </label>
            <div className="login-input-wrapper">
              <span className="login-input-icon">
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
                id="login-password"
                type="password"
                className="login-input"
                placeholder="••••••••"
                value={password}
                onChange={function (e) { setPassword(e.target.value); }}
              />
            </div>
          </div>

          {error && (
            <div className="login-error-msg">
              {error}
            </div>
          )}

          <div className="login-forgot-row">
            <a href="#" className="login-forgot">
              Forgot your password?
            </a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="login-separator">
            <div className="login-separator-line" />
            <div className="login-separator-text">Or continue with</div>
            <div className="login-separator-line" />
          </div>

          <div className="login-social-row">
            <button type="button" className="login-social-btn login-social-google">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M21 12.23c0-.64-.06-1.25-.18-1.84H12v3.48h5.04a4.29 4.29 0 0 1-1.86 2.82v2.34h3.02C20.1 17.5 21 15.1 21 12.23z"
                  fill="currentColor"
                />
                <path
                  d="M12 21c2.43 0 4.47-.8 5.96-2.17l-3.02-2.34c-.84.56-1.93.9-2.94.9-2.26 0-4.18-1.52-4.86-3.56H4.03v2.4A8.99 8.99 0 0 0 12 21z"
                  fill="currentColor"
                  opacity="0.7"
                />
                <path
                  d="M7.14 13.83A5.4 5.4 0 0 1 6.85 12c0-.64.11-1.26.29-1.83V7.77H4.03A9 9 0 0 0 3 12c0 1.42.33 2.76.93 3.95l3.21-2.12z"
                  fill="currentColor"
                  opacity="0.5"
                />
                <path
                  d="M12 6.58c1.32 0 2.51.45 3.45 1.34l2.57-2.57A8.96 8.96 0 0 0 12 3 8.99 8.99 0 0 0 4.03 7.77l3.11 2.4C7.82 8.1 9.74 6.58 12 6.58z"
                  fill="currentColor"
                  opacity="0.9"
                />
              </svg>
            </button>

            <button type="button" className="login-social-btn login-social-facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M14.5 8.5H16V5.75h-1.5c-2.35 0-3.75 1.4-3.75 3.75V12H8v2.75h2.75V21h2.75v-6.25H16V12h-2.5V9.5c0-.7.3-1 1-1z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </form>

        <div className="login-footer-text">
          Don&apos;t have an account?
          <a href="/signup" className="login-footer-link">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;

