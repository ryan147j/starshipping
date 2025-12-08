import React, { useEffect, useState } from 'react';
import './MyBookings.css';
import { API_BASE_URL } from '../config';

function getStatusBadgeClassName(status) {
  var s = (status || '').toString().toLowerCase();
  if (s === 'delivered') return 'my-bookings-status my-bookings-status-delivered';
  if (s === 'in transit' || s === 'in_transit' || s === 'intransit') return 'my-bookings-status my-bookings-status-transit';
  if (s === 'approved') return 'my-bookings-status my-bookings-status-approved';
  if (s === 'pending') return 'my-bookings-status my-bookings-status-pending';
  return 'my-bookings-status';
}

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(function () {
    setLoading(true);
    setError('');

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
          setError('Unable to load bookings.');
          return;
        }

        var status = result.status;
        var data = result.data || {};
        if (status >= 200 && status < 400 && data && data.data && Array.isArray(data.data.bookings)) {
          setBookings(data.data.bookings);
        } else {
          setError(data && data.message ? data.message : 'Unable to load bookings.');
        }
      })
      .catch(function () {
        setError('Network error while loading bookings.');
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-bookings-page">
      <div className="my-bookings-container">
        <header className="my-bookings-header">
          <h1 className="my-bookings-title">My Bookings</h1>
          <p className="my-bookings-subtitle">Here you can view and manage all your shipments.</p>
        </header>

        <div className="my-bookings-search-card">
          <div className="my-bookings-search-left">
            <div className="my-bookings-search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M16 16l3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <input
              type="text"
              className="my-bookings-search-input"
              placeholder="Search by Booking ID, destination, or date"
              value={searchQuery}
              onChange={function (e) { setSearchQuery(e.target.value); }}
            />
          </div>
          <div className="my-bookings-search-right">
            <select className="my-bookings-status-filter">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        <div className="my-bookings-table-card">
          {error && (
            <div className="my-bookings-inline-error">{error}</div>
          )}
          <table className="my-bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Client</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings
                .filter(function (booking) {
                  var q = (searchQuery || '').toString().toLowerCase();
                  if (!q) return true;

                  var code = (booking.bookingCode || booking.id || '').toString().toLowerCase();
                  var destination = (booking.destination || '').toString().toLowerCase();

                  return code.indexOf(q) !== -1 || destination.indexOf(q) !== -1;
                })
                .map(function (booking) {
                return (
                  <tr key={booking.id}>
                    <td>#{booking.bookingCode || booking.id}</td>
                    <td>
                      <div className="my-bookings-client">
                        <div className="my-bookings-client-name">{booking.clientName || 'Client'}</div>
                        {booking.clientPhone && (
                          <div className="my-bookings-client-phone">{booking.clientPhone}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      {booking.origin}
                    </td>
                    <td>
                      {booking.destination}
                    </td>
                    <td>{(booking.date || '').toString().slice(0, 10)}</td>
                    <td>
                      <span className={getStatusBadgeClassName(booking.status)}>{booking.status}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="my-bookings-link-button"
                        onClick={function () { setSelectedBooking(booking); }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="my-bookings-footer">
            <span className="my-bookings-footer-text">
              {bookings.length === 0 && !loading
                ? 'No bookings yet.'
                : (function () {
                    var filteredCount = bookings.filter(function (booking) {
                      var q = (searchQuery || '').toString().toLowerCase();
                      if (!q) return true;
                      var code = (booking.bookingCode || booking.id || '').toString().toLowerCase();
                      var destination = (booking.destination || '').toString().toLowerCase();
                      return code.indexOf(q) !== -1 || destination.indexOf(q) !== -1;
                    }).length;
                    return 'Showing ' + (filteredCount === 0 ? 0 : 1) + ' to ' + filteredCount + ' of ' + bookings.length + ' results';
                  })()}
            </span>
            <div className="my-bookings-pagination">
              <button type="button" className="my-bookings-page-button" disabled>
                Previous
              </button>
              <button type="button" className="my-bookings-page-button my-bookings-page-button-active">1</button>
              <button type="button" className="my-bookings-page-button" disabled>
                Next
              </button>
            </div>
          </div>
        </div>

        {selectedBooking && (
          <div className="my-bookings-modal-backdrop" role="dialog" aria-modal="true">
            <div className="my-bookings-modal">
              <div className="my-bookings-modal-header">
                <div>
                  <div className="my-bookings-modal-eyebrow">Booking Details</div>
                  <div className="my-bookings-modal-title">{selectedBooking.bookingCode || ('Booking #' + selectedBooking.id)}</div>
                </div>
                <button
                  type="button"
                  className="my-bookings-modal-close"
                  onClick={function () { setSelectedBooking(null); }}
                >
                  ✕
                </button>
              </div>

              <div className="my-bookings-modal-body">
                <div className="my-bookings-modal-grid">
                  <div className="my-bookings-modal-field">
                    <div className="my-bookings-modal-label">Client</div>
                    <div className="my-bookings-modal-value">{selectedBooking.clientName || '—'}</div>
                    {selectedBooking.clientPhone && (
                      <div className="my-bookings-modal-subvalue">{selectedBooking.clientPhone}</div>
                    )}
                  </div>

                  <div className="my-bookings-modal-field">
                    <div className="my-bookings-modal-label">Origin</div>
                    <div className="my-bookings-modal-value">{selectedBooking.origin || '—'}</div>
                  </div>

                  <div className="my-bookings-modal-field">
                    <div className="my-bookings-modal-label">Destination</div>
                    <div className="my-bookings-modal-value">{selectedBooking.destination || '—'}</div>
                  </div>

                  <div className="my-bookings-modal-field">
                    <div className="my-bookings-modal-label">Preferred Date</div>
                    <div className="my-bookings-modal-value">{(selectedBooking.date || '').toString().slice(0, 10) || '—'}</div>
                  </div>

                  <div className="my-bookings-modal-field">
                    <div className="my-bookings-modal-label">Status</div>
                    <div>
                      <span className={getStatusBadgeClassName(selectedBooking.status)}>{selectedBooking.status}</span>
                    </div>
                  </div>
                </div>

                {selectedBooking.additionalNotes && (
                  <div className="my-bookings-modal-notes">
                    <div className="my-bookings-modal-label">Additional Notes</div>
                    <div className="my-bookings-modal-notes-box">{selectedBooking.additionalNotes}</div>
                  </div>
                )}
              </div>

              <div className="my-bookings-modal-footer">
                <button
                  type="button"
                  className="my-bookings-modal-secondary"
                  onClick={function () { setSelectedBooking(null); }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

