import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoStarshipping2 from '../src/assets/logostarshipping2.png';
import './ClientDashboard.css';
import { API_BASE_URL } from '../config';

function ClientDashboard() {
  const [userName, setUserName] = useState('John Smith');
  const [userEmail, setUserEmail] = useState('john.smith@example.com');
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentError, setRecentError] = useState('');
  const [packagesInTransit, setPackagesInTransit] = useState(0);
  const [deliveredPackages, setDeliveredPackages] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [deliveryAnalytics, setDeliveryAnalytics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      var storedName = window.localStorage.getItem('userName');
      var storedEmail = window.localStorage.getItem('userEmail');
      if (storedName) setUserName(storedName);
      if (storedEmail) setUserEmail(storedEmail);
    } catch (e) {}
  }, []);

  useEffect(function () {
    setRecentError('');

    var authHeaders = {};
    try {
      var t = window.localStorage.getItem('authToken');
      if (t) authHeaders['Authorization'] = 'Bearer ' + t;
    } catch (e) {}

    fetch(API_BASE_URL + '/api/shipping/bookings', {
      method: 'GET',
      headers: authHeaders
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
          setRecentError('Unable to load recent bookings.');
          return;
        }

        var status = result.status;
        var data = result.data || {};
        if (status >= 200 && status < 400 && data && data.data && Array.isArray(data.data.bookings)) {
          var all = data.data.bookings || [];

          var list = all.slice(0, 3);
          setRecentBookings(list);

          var inTransit = 0;
          var delivered = 0;
          var pending = 0;

          all.forEach(function (b) {
            var st = (b.status || '').toString().toLowerCase();
            if (st === 'delivered') delivered += 1;
            else if (st === 'pending') pending += 1;
            else if (st === 'in transit' || st === 'in_transit' || st === 'intransit') inTransit += 1;
          });

          setPackagesInTransit(inTransit);
          setDeliveredPackages(delivered);
          setPendingBookings(pending);

          var sorted = all
            .slice()
            .sort(function (a, b) {
              var aTime = new Date(a.createdAt || a.date || 0).getTime();
              var bTime = new Date(b.createdAt || b.date || 0).getTime();
              return bTime - aTime;
            })
            .slice(0, 3)
            .map(function (b) {
              return {
                id: b.id,
                title: 'Booking confirmed',
                message:
                  'Booking #' + (b.bookingCode || b.id) + (b.destination ? ' to ' + b.destination : ''),
                date: (b.createdAt || b.date || '').toString().slice(0, 10),
              };
            });

          setNotifications(sorted);

          // Build delivery analytics for last 6 months based on delivered bookings
          var now = new Date();
          var buckets = [];
          for (var i = 5; i >= 0; i--) {
            var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            buckets.push({
              key: d.getFullYear() + '-' + (d.getMonth() + 1),
              label: d.toLocaleString(undefined, { month: 'short' }),
              count: 0,
            });
          }

          all.forEach(function (b) {
            var st2 = (b.status || '').toString().toLowerCase();
            if (st2 !== 'delivered') return;

            var dt = new Date(b.createdAt || b.date || Date.now());
            var key = dt.getFullYear() + '-' + (dt.getMonth() + 1);
            buckets.forEach(function (bucket) {
              if (bucket.key === key) bucket.count += 1;
            });
          });

          setDeliveryAnalytics(buckets);
        } else {
          setRecentError(data && data.message ? data.message : 'Unable to load recent bookings.');
        }
      })
      .catch(function () {
        setRecentError('Network error while loading recent bookings.');
      });
  }, []);

  useEffect(function () {
    var authHeaders = {};
    try {
      var t = window.localStorage.getItem('authToken');
      if (t) authHeaders['Authorization'] = 'Bearer ' + t;
    } catch (e) {}

    fetch(API_BASE_URL + '/api/reviews/mine', { headers: authHeaders })
      .then(function (res) {
        return res && res.ok ? res.json() : null;
      })
      .then(function (data) {
        if (data && Array.isArray(data.data)) {
          setTotalReviews(data.data.length);
        }
      })
      .catch(function () {});
  }, []);

  var firstName = (userName || '').split(' ')[0] || 'there';

  return (
    <div className="client-dashboard-page">
      <div className="client-dashboard-shell">
        {/* Sidebar */}
        <aside className="client-dashboard-sidebar">
          <div className="client-dashboard-logo">
            <div className="client-dashboard-logo-icon" aria-hidden="true">
              <img src={logoStarshipping2} alt="StarShipping" />
            </div>
            <div className="client-dashboard-logo-text">StarShipping</div>
          </div>

          <nav className="client-dashboard-nav">
            <div className="client-dashboard-nav-item client-dashboard-nav-item-active">
              <div className="client-dashboard-nav-item-icon">🏠</div>
              <span>Dashboard</span>
            </div>
            <div
              className="client-dashboard-nav-item"
              onClick={function () { navigate('/booking'); }}
              style={{ cursor: 'pointer' }}
            >
              <div className="client-dashboard-nav-item-icon">📦</div>
              <span>Book Shipment</span>
            </div>
            <div
              className="client-dashboard-nav-item"
              onClick={function () { navigate('/my-bookings'); }}
              style={{ cursor: 'pointer' }}
            >
              <div className="client-dashboard-nav-item-icon">🧾</div>
              <span>My Bookings</span>
            </div>
            <div
              className="client-dashboard-nav-item"
              onClick={function () { navigate('/my-reviews'); }}
              style={{ cursor: 'pointer' }}
            >
              <div className="client-dashboard-nav-item-icon">⭐</div>
              <span>My Reviews</span>
            </div>
            <div
              className="client-dashboard-nav-item"
              onClick={function () { navigate('/contact'); }}
              style={{ cursor: 'pointer' }}
            >
              <div className="client-dashboard-nav-item-icon">💬</div>
              <span>Support</span>
            </div>
            <div
              className="client-dashboard-nav-item"
              onClick={function () { navigate('/settings'); }}
              style={{ cursor: 'pointer' }}
            >
              <div className="client-dashboard-nav-item-icon">⚙️</div>
              <span>Settings</span>
            </div>
          </nav>
        </aside>

        {/* Main area */}
        <div className="client-dashboard-main-wrapper">
          {/* Header */}
          <header className="client-dashboard-header">
            <div className="client-dashboard-header-title">Dashboard</div>
            <div className="client-dashboard-header-right">
              <div className="client-dashboard-bell">
                🔔
                <span className="client-dashboard-bell-indicator" />
              </div>
              <div className="client-dashboard-user-info">
                <div className="client-dashboard-user-text">
                  <span className="client-dashboard-user-name">{userName}</span>
                  <span className="client-dashboard-user-tag">Premium User</span>
                </div>
                <div className="client-dashboard-user-avatar">
                  <span>{(userName || 'RS').trim().split(' ').map(function (part) { return part.charAt(0); }).join('').substring(0, 2).toUpperCase()}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="client-dashboard-content-shell">
            {/* Left content */}
            <div className="client-dashboard-content-left">
              {/* Welcome + Profile summary */}
              <div className="client-dashboard-card">
                <div className="client-dashboard-welcome">
                  <div className="client-dashboard-welcome-text">
                    <div className="client-dashboard-welcome-title">Welcome back, {firstName}!</div>
                    <div className="client-dashboard-welcome-subtitle">
                      Here is your shipping overview and recent activity.
                    </div>
                  </div>
                  <div className="client-dashboard-welcome-avatar">
                    <span>{(userName || 'RS').trim().split(' ').map(function (part) { return part.charAt(0); }).join('').substring(0, 2).toUpperCase()}</span>
                  </div>
                </div>

                <div className="client-dashboard-profile-summary">
                  <div className="client-dashboard-profile-text">
                    <strong>Profile Summary</strong>
                    <span>{userEmail}</span>
                    <span>Account type: Premium</span>
                  </div>
                  <button type="button" className="client-dashboard-profile-edit">
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="client-dashboard-stats-row">
                <div className="client-dashboard-stat-card">
                  <div className="client-dashboard-stat-icon client-dashboard-stat-icon-blue">🚚</div>
                  <div>
                    <div className="client-dashboard-stat-number">{packagesInTransit}</div>
                    <div className="client-dashboard-stat-label">Packages In Transit</div>
                  </div>
                </div>
                <div className="client-dashboard-stat-card">
                  <div className="client-dashboard-stat-icon client-dashboard-stat-icon-green">✅</div>
                  <div>
                    <div className="client-dashboard-stat-number">{deliveredPackages}</div>
                    <div className="client-dashboard-stat-label">Delivered Packages</div>
                  </div>
                </div>
                <div className="client-dashboard-stat-card">
                  <div className="client-dashboard-stat-icon client-dashboard-stat-icon-amber">🕒</div>
                  <div>
                    <div className="client-dashboard-stat-number">{pendingBookings}</div>
                    <div className="client-dashboard-stat-label">Pending Bookings</div>
                  </div>
                </div>
                <div className="client-dashboard-stat-card">
                  <div className="client-dashboard-stat-icon client-dashboard-stat-icon-yellow">⭐</div>
                  <div>
                    <div className="client-dashboard-stat-number">{totalReviews}</div>
                    <div className="client-dashboard-stat-label">Total Reviews Left</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="client-dashboard-card">
                <div className="client-dashboard-quick-actions-title">Quick Actions</div>
                <div className="client-dashboard-quick-actions-row">
                  <button
                    type="button"
                    className="client-dashboard-btn client-dashboard-btn-primary"
                    onClick={function () { navigate('/booking'); }}
                  >
                    <span>＋</span>
                    <span>Book a Shipment</span>
                  </button>
                  <button
                    type="button"
                    className="client-dashboard-btn client-dashboard-btn-ghost"
                    onClick={function () { navigate('/my-bookings'); }}
                  >
                    <span>🧾</span>
                    <span>View My Bookings</span>
                  </button>
                </div>
              </div>

              {/* Analytics */}
              <div className="client-dashboard-card">
                <div className="client-dashboard-card-header">
                  <div className="client-dashboard-quick-actions-title">Delivery Analytics</div>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Last 6 months</span>
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Deliveries by month</div>
                <div className="client-dashboard-analytics-chart">
                  <div className="client-dashboard-analytics-line" />
                </div>
                <div className="client-dashboard-analytics-months">
                  {deliveryAnalytics.map(function (m) {
                    return (
                      <div key={m.key} className="client-dashboard-analytics-month">
                        <span className="client-dashboard-analytics-month-label">{m.label}</span>
                        <span className="client-dashboard-analytics-month-count">{m.count}</span>
                      </div>
                    );
                  })}
                  {deliveryAnalytics.length === 0 && (
                    <div className="client-dashboard-analytics-empty">No delivery data yet.</div>
                  )}
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="client-dashboard-card">
                <div className="client-dashboard-table-title">Recent Bookings</div>
                <div className="client-dashboard-table-wrapper">
                  <table className="client-dashboard-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map(function (b) {
                        var status = (b.status || '').toString().toLowerCase();
                        var statusClass = 'client-dashboard-status-badge';
                        if (status === 'delivered') statusClass += ' client-dashboard-status-delivered';
                        else if (status === 'in transit' || status === 'in_transit' || status === 'intransit') statusClass += ' client-dashboard-status-transit';
                        else if (status === 'pending') statusClass += ' client-dashboard-status-pending';

                        return (
                          <tr key={b.id}>
                            <td>#{b.bookingCode || b.id}</td>
                            <td>{b.destination || '-'}</td>
                            <td>{(b.date || '').toString().slice(0, 10)}</td>
                            <td>
                              <span className={statusClass}>{b.status}</span>
                            </td>
                            <td>
                              <span className="client-dashboard-table-action">View Details</span>
                            </td>
                          </tr>
                        );
                      })}
                      {recentBookings.length === 0 && !recentError && (
                        <tr>
                          <td colSpan="5" style={{ fontSize: '12px', color: '#6b7280', padding: '10px 16px' }}>
                            No bookings yet.
                          </td>
                        </tr>
                      )}
                      {recentError && (
                        <tr>
                          <td colSpan="5" style={{ fontSize: '12px', color: '#dc2626', padding: '10px 16px' }}>
                            {recentError}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right sidebar content */}
            <div className="client-dashboard-content-right">
              {/* Recent Notifications */}
              <div className="client-dashboard-card">
                <div className="client-dashboard-right-title">Recent Notifications</div>
                <div className="client-dashboard-notifications-list">
                  {notifications.map(function (n, index) {
                    var colors = ['#2563eb', '#22c55e', '#f97316'];
                    var color = colors[index % colors.length];
                    return (
                      <div key={n.id || index} className="client-dashboard-notification-item">
                        <span className="client-dashboard-notification-dot" style={{ backgroundColor: color }} />
                        <div style={{ fontSize: '12px' }}>
                          <div>{n.title}</div>
                          <div style={{ color: '#6b7280' }}>{n.message}</div>
                        </div>
                      </div>
                    );
                  })}
                  {notifications.length === 0 && (
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      No recent notifications.
                    </div>
                  )}
                </div>
              </div>

              {/* Support */}
              <div className="client-dashboard-card">
                <div className="client-dashboard-right-title">Need help?</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                  Contact our support or open a ticket.
                </div>
                <div className="client-dashboard-support-buttons">
                  <button
                    type="button"
                    className="client-dashboard-btn client-dashboard-btn-primary"
                    style={{ width: '100%' }}
                    onClick={function () { navigate('/contact'); }}
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;

