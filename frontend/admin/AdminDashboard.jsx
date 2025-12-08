import React, { useState, useEffect } from 'react';
import './Admin.css';
import { API_BASE_URL } from '../config';

const SECTIONS = {
  DASHBOARD: 'dashboard',
  BOOKINGS: 'bookings',
  CLIENTS: 'clients',
  REVIEWS: 'reviews',
  LOGISTICS: 'logistics',
  CMS: 'cms',
  SETTINGS: 'settings'
};

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState(SECTIONS.DASHBOARD);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(function () {
    var rawUser = null;
    var user = null;
    var t = null;
    try {
      rawUser = window.localStorage.getItem('authUser');
      user = rawUser ? JSON.parse(rawUser) : null;
      t = window.localStorage.getItem('authToken');
    } catch (e) {
      user = null;
      t = null;
    }

    if (!user || user.role !== 'admin') {
      window.location.replace('/');
      return;
    }

    if (!t) {
      window.location.replace('/login');
      return;
    }

    setToken(t);
    loadDashboard(t);
  }, []);

  function loadDashboard(t) {
    setLoading(true);
    setError('');

    fetch(API_BASE_URL + '/api/admin/dashboard', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + t }
    })
      .then(function (res) {
        var status = res.status;
        return res
          .json()
          .catch(function () { return {}; })
          .then(function (body) { return { status: status, body: body }; });
      })
      .then(function (result) {
        if (!result) {
          setError('Unable to load admin dashboard.');
          return;
        }
        if (result.status === 401) {
          setError('Session expired. Please login again.');
          try {
            window.localStorage.removeItem('authToken');
            window.localStorage.removeItem('authUser');
          } catch (e) {}
          setTimeout(function () { window.location.replace('/login'); }, 1500);
          return;
        }
        if (result.status === 403) {
          setError('Access denied. Admin only.');
          setTimeout(function () { window.location.replace('/'); }, 1500);
          return;
        }
        setData(result.body && result.body.data ? result.body.data : null);
      })
      .catch(function () {
        setError('Network error while loading admin dashboard.');
      })
      .finally(function () {
        setLoading(false);
      });
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo-mark">S</div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-title">StarShipping</span>
            <span className="sidebar-logo-subtitle">Admin Portal</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button
            type="button"
            className={`sidebar-link ${activeSection === SECTIONS.DASHBOARD ? 'active' : ''}`}
            onClick={function () { setActiveSection(SECTIONS.DASHBOARD); }}
          >
            <span className="sidebar-link-icon">🏠</span>
            <span className="label">Dashboard</span>
          </button>
          <button
            type="button"
            className={`sidebar-link ${activeSection === SECTIONS.BOOKINGS ? 'active' : ''}`}
            onClick={function () { setActiveSection(SECTIONS.BOOKINGS); }}
          >
            <span className="sidebar-link-icon">📦</span>
            <span className="label">Bookings</span>
          </button>
          <button
            type="button"
            className={`sidebar-link ${activeSection === SECTIONS.CLIENTS ? 'active' : ''}`}
            onClick={function () { setActiveSection(SECTIONS.CLIENTS); }}
          >
            <span className="sidebar-link-icon">👥</span>
            <span className="label">Clients</span>
          </button>
          <button
            type="button"
            className={`sidebar-link ${activeSection === SECTIONS.REVIEWS ? 'active' : ''}`}
            onClick={function () { setActiveSection(SECTIONS.REVIEWS); }}
          >
            <span className="sidebar-link-icon">⭐</span>
            <span className="label">Reviews</span>
          </button>
          <button
            type="button"
            className={`sidebar-link ${activeSection === SECTIONS.LOGISTICS ? 'active' : ''}`}
            onClick={function () { setActiveSection(SECTIONS.LOGISTICS); }}
          >
            <span className="sidebar-link-icon">🚚</span>
            <span className="label">Logistics Data</span>
          </button>
          <button
            type="button"
            className={`sidebar-link ${activeSection === SECTIONS.CMS ? 'active' : ''}`}
            onClick={function () { setActiveSection(SECTIONS.CMS); }}
          >
            <span className="sidebar-link-icon">📝</span>
            <span className="label">Website Content</span>
          </button>
          <button
            type="button"
            className={`sidebar-link ${activeSection === SECTIONS.SETTINGS ? 'active' : ''}`}
            onClick={function () { setActiveSection(SECTIONS.SETTINGS); }}
          >
            <span className="sidebar-link-icon">⚙️</span>
            <span className="label">Settings</span>
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">Confidential pricing and revenue overview.</p>
          </div>
        </header>

        <div className="admin-content-scroll">
          {loading && (
            <div className="card">
              <div className="section-header-main">
                <h2 className="section-header-main-title">Loading admin data…</h2>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="card">
              <div className="section-header-main">
                <h2 className="section-header-main-title">Admin error</h2>
                <p className="section-header-main-subtitle">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && activeSection === SECTIONS.DASHBOARD && (
            <DashboardOverview stats={data && data.stats} />
          )}

          {!loading && !error && activeSection === SECTIONS.BOOKINGS && (
            <BookingsPricing
              pending={data && data.pendingBookings}
              priced={data && data.pricedBookings}
              token={token}
              onRefresh={function () { if (token) loadDashboard(token); }}
            />
          )}

          {!loading && !error && activeSection === SECTIONS.CLIENTS && <ClientsSection />}
          {!loading && !error && activeSection === SECTIONS.REVIEWS && <ReviewsSection />}
          {!loading && !error && activeSection === SECTIONS.LOGISTICS && <LogisticsSection />}
          {!loading && !error && activeSection === SECTIONS.CMS && <CmsSection />}
          {!loading && !error && activeSection === SECTIONS.SETTINGS && <SettingsSection />}
        </div>
      </main>
    </div>
  );
}

function DashboardOverview(props) {
  var stats = props.stats || {};
  var totalBookings = typeof stats.totalBookings === 'number' ? stats.totalBookings : 0;
  var pendingPriceCount = typeof stats.pendingPriceCount === 'number' ? stats.pendingPriceCount : 0;
  var pricedCount = typeof stats.pricedCount === 'number' ? stats.pricedCount : 0;
  var totalRevenue = typeof stats.totalRevenue === 'number' ? stats.totalRevenue : 0;
  var totalProfit = typeof stats.totalProfit === 'number' ? stats.totalProfit : 0;

  return (
    <div>
      <div className="section-header-main">
        <h2 className="section-header-main-title">Today&apos;s Snapshot</h2>
        <p className="section-header-main-subtitle">Key metrics, shipments and client activity across StarShipping.</p>
      </div>
      <div className="kpi-grid">
        <div className="card card-kpi">
          <div className="card-kpi-main">
            <div>
              <div className="card-kpi-label">Total Bookings</div>
              <div className="card-kpi-value">{totalBookings}</div>
            </div>
            <div className="card-kpi-icon">📦</div>
          </div>
        </div>
        <div className="card card-kpi">
          <div className="card-kpi-main">
            <div>
              <div className="card-kpi-label">Pending Price</div>
              <div className="card-kpi-value">{pendingPriceCount}</div>
            </div>
            <div className="card-kpi-icon">⏳</div>
          </div>
        </div>
        <div className="card card-kpi">
          <div className="card-kpi-main">
            <div>
              <div className="card-kpi-label">Priced Bookings</div>
              <div className="card-kpi-value">{pricedCount}</div>
            </div>
            <div className="card-kpi-icon">✅</div>
          </div>
        </div>
        <div className="card card-kpi">
          <div className="card-kpi-main">
            <div>
              <div className="card-kpi-label">Total Revenue</div>
              <div className="card-kpi-value">${totalRevenue.toFixed(2)}</div>
            </div>
            <div className="card-kpi-icon">💰</div>
          </div>
        </div>
        <div className="card card-kpi">
          <div className="card-kpi-main">
            <div>
              <div className="card-kpi-label">Total Profit</div>
              <div className="card-kpi-value">${totalProfit.toFixed(2)}</div>
            </div>
            <div className="card-kpi-icon">📈</div>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="card">
          <div className="analytics-card-header">
            <div>
              <div className="analytics-title">Weekly Shipments</div>
              <div className="analytics-subtitle">Outbound freight volume over the last 7 days.</div>
            </div>
            <span className="tag-pill">Last 7 days</span>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars">
              <div className="chart-bar" style={{ height: '40%' }} />
              <div className="chart-bar" style={{ height: '70%' }} />
              <div className="chart-bar" style={{ height: '55%' }} />
              <div className="chart-bar" style={{ height: '85%' }} />
              <div className="chart-bar" style={{ height: '60%' }} />
              <div className="chart-bar" style={{ height: '50%' }} />
              <div className="chart-bar" style={{ height: '68%' }} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="analytics-card-header">
            <div>
              <div className="analytics-title">Shipment Status Distribution</div>
              <div className="analytics-subtitle">Live breakdown across all active bookings.</div>
            </div>
            <span className="tag-pill">Live</span>
          </div>
          <div className="chart-placeholder">
            <div className="chart-pie" />
            <div className="chart-legend">
              <div className="chart-legend-item">
                <span className="chart-legend-dot" style={{ background: '#1a73e8' }} />
                <span>In Transit</span>
              </div>
              <div className="chart-legend-item">
                <span className="chart-legend-dot" style={{ background: '#22c55e' }} />
                <span>Delivered</span>
              </div>
              <div className="chart-legend-item">
                <span className="chart-legend-dot" style={{ background: '#f97316' }} />
                <span>Pending</span>
              </div>
              <div className="chart-legend-item">
                <span className="chart-legend-dot" style={{ background: '#e5e7eb' }} />
                <span>Canceled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="card">
          <div className="analytics-card-header">
            <div>
              <div className="analytics-title">Revenue Growth</div>
              <div className="analytics-subtitle">Month-over-month net freight revenue.</div>
            </div>
            <span className="tag-pill">This year</span>
          </div>
          <div className="chart-placeholder">
            <div className="chart-line" />
          </div>
        </div>

        <div className="card card-with-table">
          <div className="analytics-card-header">
            <div>
              <div className="analytics-title">Recent Activity</div>
              <div className="analytics-subtitle">Latest events across bookings, clients and operations.</div>
            </div>
          </div>
          <ul className="activity-list">
            <li className="activity-item">
              <span className="activity-icon primary" />
              <div>
                <div className="activity-text-title">New booking created</div>
                <div className="activity-text-subtitle">Booking #BK-2847 from Acme Corp</div>
                <div className="activity-text-meta">2 minutes ago</div>
              </div>
            </li>
            <li className="activity-item">
              <span className="activity-icon success" />
              <div>
                <div className="activity-text-title">Shipment delivered</div>
                <div className="activity-text-subtitle">Booking #BK-2840 successfully delivered</div>
                <div className="activity-text-meta">15 minutes ago</div>
              </div>
            </li>
            <li className="activity-item">
              <span className="activity-icon info" />
              <div>
                <div className="activity-text-title">New client onboarded</div>
                <div className="activity-text-subtitle">TechStart Inc joined StarShipping</div>
                <div className="activity-text-meta">1 hour ago</div>
              </div>
            </li>
            <li className="activity-item">
              <span className="activity-icon warning" />
              <div>
                <div className="activity-text-title">Delay detected</div>
                <div className="activity-text-subtitle">Weather disruption on EU–US lane</div>
                <div className="activity-text-meta">2 hours ago</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function BookingsPricing(props) {
  var pending = Array.isArray(props.pending) ? props.pending : [];
  var priced = Array.isArray(props.priced) ? props.priced : [];
  var token = props.token;
  var onRefresh = props.onRefresh;

  var [selected, setSelected] = useState(null);
  var [price, setPrice] = useState('');
  var [cost, setCost] = useState('');
  var [saving, setSaving] = useState(false);
  var [modalError, setModalError] = useState('');

  function openModal(booking) {
    setSelected(booking);
    setPrice('');
    setCost('');
    setModalError('');
  }

  function closeModal() {
    if (saving) return;
    setSelected(null);
  }

  function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!selected || !token) return;
    if (!price) {
      setModalError('Price is required');
      return;
    }
    setSaving(true);
    setModalError('');

    fetch(API_BASE_URL + '/api/admin/bookings/' + selected.id + '/set-price', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ price: price, internal_cost: cost })
    })
      .then(function (res) {
        var status = res.status;
        return res
          .json()
          .catch(function () { return {}; })
          .then(function (body) { return { status: status, body: body }; });
      })
      .then(function (result) {
        if (!result) {
          setModalError('Unable to save price');
          return;
        }
        if (result.status >= 400) {
          setModalError(result.body && result.body.message ? result.body.message : 'Failed to set price');
          return;
        }
        closeModal();
        if (onRefresh) onRefresh();
      })
      .catch(function () {
        setModalError('Network error while saving price');
      })
      .finally(function () {
        setSaving(false);
      });
  }

  return (
    <div>
      <div className="section-header-main">
        <h2 className="section-header-main-title">Bookings Pending Price</h2>
        <p className="section-header-main-subtitle">Only admins see and edit prices.</p>
      </div>

      <div className="card card-with-table" style={{ marginBottom: '1.5rem' }}>
        <div className="analytics-card-header">
          <div>
            <div className="analytics-title">Pending Pricing</div>
            <div className="analytics-subtitle">New bookings waiting for a price.</div>
          </div>
        </div>

        <div className="table-header-row" style={{ gridTemplateColumns: '0.8fr 1.5fr 1.4fr 1.4fr 1fr 0.8fr' }}>
          <span>ID</span>
          <span>Client</span>
          <span>Origin</span>
          <span>Destination</span>
          <span>Date</span>
          <span>Action</span>
        </div>

        {pending.length === 0 && (
          <div className="table-row" style={{ gridTemplateColumns: '1fr' }}>
            <span>No bookings waiting for price.</span>
          </div>
        )}

        {pending.map(function (b) {
          return (
            <div
              key={b.id}
              className="table-row"
              style={{ gridTemplateColumns: '0.8fr 1.5fr 1.4fr 1.4fr 1fr 0.8fr' }}
            >
              <span>#{b.id}</span>
              <span>{b.client_name || '-'}</span>
              <span>{b.origin || '-'}</span>
              <span>{b.destination || '-'}</span>
              <span>{b.preferred_date || b.createdAt}</span>
              <span>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={function () { openModal(b); }}
                >
                  Set price
                </button>
              </span>
            </div>
          );
        })}
      </div>

      <div className="card card-with-table">
        <div className="analytics-card-header">
          <div>
            <div className="analytics-title">Priced Bookings</div>
            <div className="analytics-subtitle">Revenue and profit per booking.</div>
          </div>
        </div>

        <div className="table-header-row" style={{ gridTemplateColumns: '0.8fr 1.5fr 1.4fr 1.4fr 1fr 1fr 1fr' }}>
          <span>ID</span>
          <span>Client</span>
          <span>Origin</span>
          <span>Destination</span>
          <span>Status</span>
          <span>Price</span>
          <span>Profit</span>
        </div>

        {priced.length === 0 && (
          <div className="table-row" style={{ gridTemplateColumns: '1fr' }}>
            <span>No priced bookings yet.</span>
          </div>
        )}

        {priced.map(function (b) {
          var priceText = b.price != null ? '$' + parseFloat(b.price).toFixed(2) : '-';
          var profitText = b.profit != null ? '$' + parseFloat(b.profit).toFixed(2) : '-';
          return (
            <div
              key={b.id}
              className="table-row"
              style={{ gridTemplateColumns: '0.8fr 1.5fr 1.4fr 1.4fr 1fr 1fr 1fr' }}
            >
              <span>#{b.id}</span>
              <span>{b.client_name || '-'}</span>
              <span>{b.origin || '-'}</span>
              <span>{b.destination || '-'}</span>
              <span>{b.status || 'priced'}</span>
              <span>{priceText}</span>
              <span>{profitText}</span>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="admin-modal-backdrop">
          <div className="card" style={{ maxWidth: '420px', margin: '10vh auto' }}>
            <div className="section-header-main">
              <h2 className="section-header-main-title">Set price for booking #{selected.id}</h2>
              <p className="section-header-main-subtitle">Only admins see this pricing.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label>Price (required)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={function (e) { setPrice(e.target.value); }}
                />
              </div>
              <div className="form-field">
                <label>Internal Cost (optional)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={cost}
                  onChange={function (e) { setCost(e.target.value); }}
                />
              </div>
              {modalError && (
                <div className="section-header-main-subtitle" style={{ color: '#b91c1c', marginTop: '0.5rem' }}>
                  {modalError}
                </div>
              )}
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={closeModal} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : 'Save price'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ClientsSection() {
  return (
    <div>
      <div className="section-header-main">
        <h2 className="section-header-main-title">Clients Management</h2>
        <p className="section-header-main-subtitle">Monitor key customers, profiles and booking activity.</p>
      </div>

      <div className="card card-with-table">
        <div className="analytics-card-header">
          <div className="admin-header-actions">
            <div className="admin-search" style={{ maxWidth: '260px' }}>
              <input type="text" placeholder="Search clients…" />
            </div>
          </div>
        </div>

        <div className="table-header-row" style={{ gridTemplateColumns: '1.5fr 2fr 1.5fr 1.2fr 1fr' }}>
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Total Bookings</span>
          <span>Actions</span>
        </div>

        {[['Acme Corporation', 'ops@acme.com', '+1 555 0123', '58'],
          ['Global Trade Ltd', 'logistics@globaltrade.com', '+44 20 1234 5678', '42'],
          ['TechStart Inc', 'shipping@techstart.io', '+1 555 9876', '31']].map(function (row) {
          var name = row[0];
          var email = row[1];
          var phone = row[2];
          var total = row[3];
          return (
            <div
              key={name}
              className="table-row"
              style={{ gridTemplateColumns: '1.5fr 2fr 1.5fr 1.2fr 1fr' }}
            >
              <span>{name}</span>
              <span>{email}</span>
              <span>{phone}</span>
              <span>{total}</span>
              <span>
                <button type="button" className="btn-ghost" style={{ marginRight: '0.25rem' }}>
                  View profile
                </button>
                <button type="button" className="btn-secondary">Deactivate</button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReviewsSection() {
  var _a = useState([]);
  var reviews = _a[0];
  var setReviews = _a[1];
  var _b = useState(false);
  var loading = _b[0];
  var setLoading = _b[1];
  var _c = useState('');
  var error = _c[0];
  var setError = _c[1];

  useEffect(function () {
    loadReviews();
  }, []);

  function getToken() {
    var t = null;
    try {
      t = window.localStorage.getItem('authToken');
    } catch (e) {
      t = null;
    }
    return t;
  }

  function loadReviews() {
    var token = getToken();
    if (!token) return;

    setLoading(true);
    setError('');

    fetch(API_BASE_URL + '/api/admin/reviews', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(function (res) {
        var status = res.status;
        return res
          .json()
          .catch(function () { return {}; })
          .then(function (body) { return { status: status, body: body }; });
      })
      .then(function (result) {
        if (!result) {
          setError('Unable to load reviews');
          return;
        }
        if (result.status >= 400) {
          var msg = result.body && result.body.message ? result.body.message : 'Failed to load reviews';
          setError(msg);
          return;
        }
        var items = result.body && result.body.data ? result.body.data : [];
        setReviews(Array.isArray(items) ? items : []);
      })
      .catch(function () {
        setError('Network error while loading reviews');
      })
      .finally(function () {
        setLoading(false);
      });
  }

  function approveReview(id) {
    var token = getToken();
    if (!token) return;

    fetch(API_BASE_URL + '/api/admin/reviews/' + id + '/approve', {
      method: 'PUT',
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(function (res) {
        if (res.status >= 400) {
          return res
            .json()
            .catch(function () { return {}; })
            .then(function (body) {
              var msg = body && body.message ? body.message : 'Failed to approve review';
              throw new Error(msg);
            });
        }
      })
      .then(function () {
        loadReviews();
      })
      .catch(function (err) {
        setError(err && err.message ? err.message : 'Failed to approve review');
      });
  }

  function deleteReview(id) {
    var token = getToken();
    if (!token) return;

    fetch(API_BASE_URL + '/api/admin/reviews/' + id, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(function (res) {
        if (res.status >= 400 && res.status !== 404) {
          return res
            .json()
            .catch(function () { return {}; })
            .then(function (body) {
              var msg = body && body.message ? body.message : 'Failed to delete review';
              throw new Error(msg);
            });
        }
      })
      .then(function () {
        loadReviews();
      })
      .catch(function (err) {
        setError(err && err.message ? err.message : 'Failed to delete review');
      });
  }

  return (
    <div>
      <div className="section-header-main">
        <h2 className="section-header-main-title">Reviews Management</h2>
        <p className="section-header-main-subtitle">Moderate customer feedback and keep your ratings healthy.</p>
      </div>

      <div className="card card-with-table">
        <div className="table-header-row" style={{ gridTemplateColumns: '0.6fr 2fr 1.2fr 1fr 1fr' }}>
          <span>Rating</span>
          <span>Review</span>
          <span>Client</span>
          <span>Date</span>
          <span>Actions</span>
        </div>

        {loading && (
          <div className="table-row" style={{ gridTemplateColumns: '1fr' }}>
            <span>Loading reviews…</span>
          </div>
        )}

        {!loading && !reviews.length && !error && (
          <div className="table-row" style={{ gridTemplateColumns: '1fr' }}>
            <span>No reviews found.</span>
          </div>
        )}

        {error && (
          <div className="table-row" style={{ gridTemplateColumns: '1fr' }}>
            <span>{error}</span>
          </div>
        )}

        {reviews.map(function (r) {
          var stars = '';
          var i;
          for (i = 0; i < (r.rating || 0); i++) {
            stars += '★';
          }
          return (
            <div
              key={r.id}
              className="table-row"
              style={{ gridTemplateColumns: '0.6fr 2fr 1.2fr 1fr 1fr' }}
            >
              <span>{stars || '–'}</span>
              <span>{r.comment}</span>
              <span>{r.User && r.User.full_name ? r.User.full_name : 'Client #' + r.user_id}</span>
              <span>{r.createdAt}</span>
              <span>
                {!r.approved && (
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ marginRight: '0.25rem' }}
                    onClick={function () { approveReview(r.id); }}
                  >
                    Approve
                  </button>
                )}
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={function () { deleteReview(r.id); }}
                >
                  Delete
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LogisticsSection() {
  return (
    <div>
      <div className="section-header-main">
        <h2 className="section-header-main-title">Logistics Data</h2>
        <p className="section-header-main-subtitle">Maintain routes, zones, partners and pricing frameworks.</p>
      </div>

      <div className="analytics-grid">
        <div className="card">
          <div className="analytics-card-header">
            <div>
              <div className="analytics-title">Shipping Routes</div>
              <div className="analytics-subtitle">Key lanes and transit promises.</div>
            </div>
            <button type="button" className="btn-primary">Add Route</button>
          </div>
          <ul className="generic-list">
            <li>EU ⇄ US — Priority Air (3–5 days)</li>
            <li>Asia ⇄ EU — Ocean Freight (22–30 days)</li>
            <li>US Domestic — Road Network (1–3 days)</li>
          </ul>
        </div>

        <div className="card">
          <div className="analytics-card-header">
            <div>
              <div className="analytics-title">Country Zones &amp; Pricing</div>
              <div className="analytics-subtitle">Define surcharges by region.</div>
            </div>
            <button type="button" className="btn-secondary">Manage</button>
          </div>
          <ul className="generic-list">
            <li>Zone 1 — North America</li>
            <li>Zone 2 — Western Europe</li>
            <li>Zone 3 — APAC</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="analytics-card-header">
          <div>
            <div className="analytics-title">Transportation Partners</div>
            <div className="analytics-subtitle">Airlines, ocean carriers and last‑mile providers.</div>
          </div>
          <button type="button" className="btn-primary">Add Partner</button>
        </div>
        <ul className="generic-list">
          <li>SkyLine Air — Global Air Partner</li>
          <li>BlueWave Lines — Primary Ocean Carrier</li>
          <li>SwiftRoute — EU Last‑Mile Network</li>
        </ul>
      </div>
    </div>
  );
}

function CmsSection() {
  return (
    <div>
      <div className="section-header-main">
        <h2 className="section-header-main-title">Website Content</h2>
        <p className="section-header-main-subtitle">Control the public StarShipping website content and assets.</p>
      </div>

      <div className="analytics-grid">
        <div className="card">
          <div className="analytics-card-header">
            <div>
              <div className="analytics-title">Homepage Content</div>
              <div className="analytics-subtitle">Hero headline, subcopy and primary CTA.</div>
            </div>
          </div>

          <div className="form-field">
            <label>Hero Title</label>
            <input defaultValue="Global logistics, made effortless." />
          </div>
          <div className="form-field">
            <label>Hero Subtitle</label>
            <textarea
              rows={3}
              defaultValue="Connect your business to every major trade lane with real‑time visibility and predictable delivery."
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary">Discard</button>
            <button type="button" className="btn-primary">Save Homepage</button>
          </div>
        </div>

        <div className="card">
          <div className="analytics-card-header">
            <div>
              <div className="analytics-title">About &amp; Footer</div>
              <div className="analytics-subtitle">Company story, contact details and legal links.</div>
            </div>
          </div>

          <div className="form-grid-two" style={{ marginBottom: '0.75rem' }}>
            <div className="form-field">
              <label>Support Email</label>
              <input defaultValue="support@starshipping.com" />
            </div>
            <div className="form-field">
              <label>Sales Email</label>
              <input defaultValue="sales@starshipping.com" />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input defaultValue="+1 (555) 013‑4567" />
            </div>
            <div className="form-field">
              <label>Headquarters</label>
              <input defaultValue="New York, USA" />
            </div>
          </div>

          <div className="form-field" style={{ marginBottom: '0.75rem' }}>
            <label>FAQ Content</label>
            <div className="wysiwyg-shell">
              <div className="wysiwyg-toolbar">
                <button type="button" className="btn-secondary">B</button>
                <button type="button" className="btn-secondary">I</button>
                <button type="button" className="btn-secondary">•</button>
              </div>
              <div className="wysiwyg-area">FAQ editor preview…</div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary">Discard</button>
            <button type="button" className="btn-primary">Save Content</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div>
      <div className="section-header-main">
        <h2 className="section-header-main-title">Settings</h2>
        <p className="section-header-main-subtitle">Manage profile, security, notifications and API access.</p>
      </div>

      <div className="analytics-grid">
        <div className="card">
          <div className="analytics-card-header">
            <div>
              <div className="analytics-title">Profile</div>
              <div className="analytics-subtitle">Update your name and contact details.</div>
            </div>
          </div>
          <div className="form-grid-two">
            <div className="form-field">
              <label>Full Name</label>
              <input defaultValue="John Anderson" />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input defaultValue="admin@starshipping.com" />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-primary">Save Profile</button>
          </div>
        </div>

        <div className="card">
          <div className="analytics-card-header">
            <div>
              <div className="analytics-title">Security</div>
              <div className="analytics-subtitle">Change password and enable additional checks.</div>
            </div>
          </div>
          <div className="form-grid-two">
            <div className="form-field">
              <label>Current Password</label>
              <input type="password" />
            </div>
            <div className="form-field">
              <label>New Password</label>
              <input type="password" />
            </div>
            <div className="form-field">
              <label>Confirm Password</label>
              <input type="password" />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-primary">Update Password</button>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="analytics-card-header">
          <div>
            <div className="analytics-title">API &amp; Notifications</div>
            <div className="analytics-subtitle">Control API keys and system alerts.</div>
          </div>
        </div>
        <div className="form-grid-two">
          <div className="form-field">
            <label>Primary API Key</label>
            <input defaultValue="sk_live_••••••••••••" />
          </div>
          <div className="form-field">
            <label>Notification Emails</label>
            <select defaultValue="all">
              <option value="all">All activity</option>
              <option value="important">Only important</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary">Reset</button>
          <button type="button" className="btn-primary">Save Settings</button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
