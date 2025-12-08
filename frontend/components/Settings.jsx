import React, { useEffect, useState } from 'react';
import './Settings.css';
import { API_BASE_URL } from '../config';

const Settings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailPrefs, setEmailPrefs] = useState({
    tracking: true,
    booking: true,
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  function handleToggleEmail(key) {
    setEmailPrefs(function (prev) {
      return { ...prev, [key]: !prev[key] };
    });
  }

  function handleSaveProfile(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (profileSaving) return;

    setProfileSaving(true);
    setProfileError('');
    setProfileSuccess('');

    var token = '';
    try {
      token = window.localStorage.getItem('authToken') || '';
    } catch (eStorage) {
      token = '';
    }

    fetch(API_BASE_URL + '/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? 'Bearer ' + token : '',
      },
      body: JSON.stringify({
        full_name: fullName,
        phone: phone,
      }),
    })
      .then(function (res) {
        var status = res.status;
        return res
          .json()
          .catch(function () { return null; })
          .then(function (data) { return { ok: res.ok, status: status, data: data }; });
      })
      .then(function (result) {
        if (!result) {
          setProfileError('Unable to save changes. Please try again.');
          return;
        }

        var status = result.status;
        var data = result.data || {};

        if (status >= 200 && status < 400) {
          var saved = data.data || {};
          if (saved.full_name) setFullName(saved.full_name);
          if (typeof saved.phone === 'string') setPhone(saved.phone);
          try {
            if (saved.full_name) window.localStorage.setItem('userName', saved.full_name);
            if (saved.email) window.localStorage.setItem('userEmail', saved.email);
          } catch (eStorage) {}
          setProfileSuccess('Changes saved successfully.');
        } else {
          setProfileError(data && data.message ? data.message : 'Unable to save changes.');
        }
      })
      .catch(function () {
        setProfileError('Network error. Please try again.');
      })
      .finally(function () {
        setProfileSaving(false);
      });
  }

  function handleUpdatePassword(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (passwordSaving) return;

    setPasswordError('');
    setPasswordSuccess('');

    if (!passwordCurrent || !passwordNew || !passwordConfirm) {
      setPasswordError('Please fill in all password fields.');
      return;
    }

    if (passwordNew !== passwordConfirm) {
      setPasswordError('New passwords do not match.');
      return;
    }

    if (passwordNew.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }

    var token = '';
    try {
      token = window.localStorage.getItem('authToken') || '';
    } catch (eStorage) {
      token = '';
    }

    if (!token) {
      setPasswordError('You must be logged in to change your password.');
      return;
    }

    setPasswordSaving(true);

    fetch(API_BASE_URL + '/api/users/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        currentPassword: passwordCurrent,
        newPassword: passwordNew,
        confirmPassword: passwordConfirm,
      }),
    })
      .then(function (res) {
        var status = res.status;
        return res
          .json()
          .catch(function () { return null; })
          .then(function (data) { return { ok: res.ok, status: status, data: data }; });
      })
      .then(function (result) {
        if (!result) {
          setPasswordError('Unable to update password. Please try again.');
          return;
        }

        var status = result.status;
        var data = result.data || {};

        if (status >= 200 && status < 400) {
          setPasswordSuccess(data && data.message ? data.message : 'Password updated successfully.');
          setPasswordCurrent('');
          setPasswordNew('');
          setPasswordConfirm('');
        } else {
          setPasswordError(data && data.message ? data.message : 'Unable to update password.');
        }
      })
      .catch(function () {
        setPasswordError('Network error while updating password.');
      })
      .finally(function () {
        setPasswordSaving(false);
      });
  }

  function handleUpdateNotifications(e) {
    if (e && e.preventDefault) e.preventDefault();
  }

  useEffect(function () {
    var token = '';
    try {
      token = window.localStorage.getItem('authToken') || '';
    } catch (eStorage) {
      token = '';
    }

    if (!token) {
      var localName = '';
      var localEmail = '';
      try {
        localName = window.localStorage.getItem('userName') || '';
        localEmail = window.localStorage.getItem('userEmail') || '';
      } catch (e2) {}

      if (localName) setFullName(localName);
      if (localEmail) setEmail(localEmail);
      return;
    }

    setProfileLoading(true);
    setProfileError('');

    fetch(API_BASE_URL + '/api/users/profile', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (res) {
        var status = res.status;
        return res
          .json()
          .catch(function () { return null; })
          .then(function (data) { return { ok: res.ok, status: status, data: data }; });
      })
      .then(function (result) {
        if (!result) {
          setProfileError('Unable to load profile.');
          return;
        }

        var status = result.status;
        var data = result.data || {};

        if (status >= 200 && status < 400) {
          var p = data.data || {};
          if (p.full_name) setFullName(p.full_name);
          if (p.email) setEmail(p.email);
          if (typeof p.phone === 'string') setPhone(p.phone);
          try {
            if (p.full_name) window.localStorage.setItem('userName', p.full_name);
            if (p.email) window.localStorage.setItem('userEmail', p.email);
          } catch (eStorage) {}
        } else {
          setProfileError(data && data.message ? data.message : 'Unable to load profile.');
        }
      })
      .catch(function () {
        setProfileError('Network error while loading profile.');
      })
      .finally(function () {
        setProfileLoading(false);
      });
  }, []);

  return (
    <div className="settings-page">
      <div className="settings-shell">
        <header className="settings-header">
          <div>
            <h1 className="settings-title">Settings</h1>
            <p className="settings-subtitle">Manage your account preferences and security settings.</p>
          </div>
        </header>

        <div className="settings-grid">
          {/* Personal Information */}
          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-card-title-wrap">
                <span className="settings-card-icon" aria-hidden="true">👤</span>
                <div>
                  <h2 className="settings-card-title">Personal Information</h2>
                  <p className="settings-card-subtitle">Basic details for your StarShipping account.</p>
                </div>
              </div>
            </div>

            <form className="settings-form" onSubmit={handleSaveProfile}>
              <div className="settings-profile-row">
                <div className="settings-avatar-block">
                  <div className="settings-avatar" aria-hidden="true">
                    <span>{(fullName || 'RS').trim().split(' ').map(function (part) { return part.charAt(0); }).join('').substring(0, 2).toUpperCase()}</span>
                  </div>
                </div>

                <div className="settings-profile-fields">
                  <div className="settings-field-row">
                    <div className="settings-field">
                      <label className="settings-label">Full Name</label>
                      <input
                        className="settings-input"
                        type="text"
                        value={fullName}
                        onChange={function (e) { setFullName(e.target.value); }}
                      />
                    </div>
                    <div className="settings-field">
                      <label className="settings-label">Email Address</label>
                      <input
                        className="settings-input settings-input-disabled"
                        type="email"
                        value={email}
                        disabled
                      />
                      <span className="settings-hint settings-hint-success">Verified</span>
                    </div>
                  </div>

                  <div className="settings-field-row">
                    <div className="settings-field">
                      <label className="settings-label">Phone Number</label>
                      <input
                        className="settings-input"
                        type="tel"
                        placeholder="+216 55 555 555"
                        value={phone}
                        onChange={function (e) { setPhone(e.target.value); }}
                      />
                    </div>
                    <div className="settings-field">
                      <label className="settings-label">Country</label>
                      <select
                        className="settings-input"
                        value={country}
                        onChange={function (e) { setCountry(e.target.value); }}
                      >
                        <option value="">Select country</option>
                        <option value="tn">Tunisia</option>
                        <option value="us">United States</option>
                        <option value="fr">France</option>
                        <option value="de">Germany</option>
                      </select>
                    </div>
                  </div>

                  <div className="settings-field">
                    <label className="settings-label">City</label>
                    <input
                      className="settings-input"
                      type="text"
                      placeholder="Sousse"
                      value={city}
                      onChange={function (e) { setCity(e.target.value); }}
                    />
                  </div>

                  <div className="settings-field">
                    <label className="settings-label">Address</label>
                    <input
                      className="settings-input"
                      type="text"
                      placeholder="Street, building, floor, postal code"
                      value={address}
                      onChange={function (e) { setAddress(e.target.value); }}
                    />
                  </div>
                </div>
              </div>

              {profileError && (
                <div className="settings-inline-error">{profileError}</div>
              )}
              {profileSuccess && !profileError && (
                <div className="settings-inline-success">{profileSuccess}</div>
              )}

              <div className="settings-actions-row">
                <button type="submit" className="btn-primary" disabled={profileSaving || profileLoading}>
                  {profileSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </section>

          {/* Account Security */}
          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-card-title-wrap">
                <span className="settings-card-icon" aria-hidden="true">🔒</span>
                <div>
                  <h2 className="settings-card-title">Account Security</h2>
                  <p className="settings-card-subtitle">Password and sign-in protection.</p>
                </div>
              </div>
            </div>

            <form className="settings-form" onSubmit={handleUpdatePassword}>
              <div className="settings-field-row">
                <div className="settings-field">
                  <label className="settings-label">Current Password</label>
                  <input
                    className="settings-input"
                    type="password"
                    placeholder="Enter current password"
                    value={passwordCurrent}
                    onChange={function (e) { setPasswordCurrent(e.target.value); }}
                  />
                </div>
              </div>
              <div className="settings-field-row">
                <div className="settings-field">
                  <label className="settings-label">New Password</label>
                  <input
                    className="settings-input"
                    type="password"
                    placeholder="Enter new password"
                    value={passwordNew}
                    onChange={function (e) { setPasswordNew(e.target.value); }}
                  />
                </div>
                <div className="settings-field">
                  <label className="settings-label">Confirm New Password</label>
                  <input
                    className="settings-input"
                    type="password"
                    placeholder="Confirm new password"
                    value={passwordConfirm}
                    onChange={function (e) { setPasswordConfirm(e.target.value); }}
                  />
                </div>
              </div>

              {passwordError && (
                <div className="settings-inline-error">{passwordError}</div>
              )}
              {passwordSuccess && !passwordError && (
                <div className="settings-inline-success">{passwordSuccess}</div>
              )}

              <div className="settings-actions-row">
                <button type="submit" className="btn-primary" disabled={passwordSaving}>
                  {passwordSaving ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>

            <div className="settings-twofa-card">
              <div className="settings-twofa-main">
                <div>
                  <h3 className="settings-twofa-title">Two-Factor Authentication</h3>
                  <p className="settings-twofa-sub">Add an extra step when logging in from new devices.</p>
                </div>
              </div>
              <button
                type="button"
                className={
                  'settings-toggle' + (twoFactorEnabled ? ' settings-toggle-on' : '')
                }
                onClick={function () {
                  setTwoFactorEnabled(!twoFactorEnabled);
                }}
                aria-pressed={twoFactorEnabled}
              >
                <span className="settings-toggle-thumb" />
              </button>
            </div>
          </section>

          {/* Notifications */}
          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-card-title-wrap">
                <span className="settings-card-icon" aria-hidden="true">📨</span>
                <div>
                  <h2 className="settings-card-title">Notifications</h2>
                  <p className="settings-card-subtitle">Stay informed about your shipments and bookings.</p>
                </div>
              </div>
            </div>

            <form className="settings-form" onSubmit={handleUpdateNotifications}>
              <div className="settings-pref-group">
                <div className="settings-pref-row">
                  <div className="settings-pref-text">
                    <div className="settings-pref-label">Shipment tracking updates</div>
                    <div className="settings-pref-sub">Email alerts when your shipment status changes.</div>
                  </div>
                  <button
                    type="button" 
                    className={'settings-toggle' + (emailPrefs.tracking ? ' settings-toggle-on' : '')}
                    onClick={function () { handleToggleEmail('tracking'); }}
                    aria-pressed={emailPrefs.tracking}
                  >
                    <span className="settings-toggle-thumb" />
                  </button>
                </div>

                <div className="settings-pref-row">
                  <div className="settings-pref-text">
                    <div className="settings-pref-label">Booking confirmation notifications</div>
                    <div className="settings-pref-sub">Confirmations when a new booking is created.</div>
                  </div>
                  <button
                    type="button"
                    className={'settings-toggle' + (emailPrefs.booking ? ' settings-toggle-on' : '')}
                    onClick={function () { handleToggleEmail('booking'); }}
                    aria-pressed={emailPrefs.booking}
                  >
                    <span className="settings-toggle-thumb" />
                  </button>
                </div>
              </div>

              <div className="settings-actions-row">
                <button type="submit" className="btn-secondary">Save Notification Settings</button>
              </div>
            </form>
          </section>

          {/* Delete Account */}
          <section className="settings-card settings-card-danger">
            <div className="settings-card-header">
              <div className="settings-card-title-wrap">
                <span className="settings-card-icon settings-card-icon-danger" aria-hidden="true">⚠️</span>
                <div>
                  <h2 className="settings-card-title">Delete Account</h2>
                  <p className="settings-card-subtitle">This action is permanent and cannot be undone.</p>
                </div>
              </div>
            </div>

            <div className="settings-danger-body">
              <p className="settings-danger-text">This action is permanent and cannot be undone.</p>
              <button
                type="button"
                className="btn-danger"
              >
                Delete My Account
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;

