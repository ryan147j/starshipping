import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Myreviews.css';

const demoReviews = [
  {
    id: 1,
    title: 'Excellent Shipping Service',
    service: 'Heavy Cargo Transport',
    iconType: 'truck',
    rating: 5.0,
    text:
      'Outstanding service from start to finish. The heavy cargo was handled with extreme care and delivered exactly on time. The tracking system was very reliable and the customer support team was always available to answer questions.',
    dateLabel: 'March 15, 2024',
  },
  {
    id: 2,
    title: 'Great Warehousing Solution',
    service: 'Warehousing & Storage',
    iconType: 'warehouse',
    rating: 4.0,
    text:
      'Very satisfied with the warehousing facilities. Clean, secure, and well-organized storage space. The inventory management system is efficient and the staff is professional. Would definitely use again for future storage needs.',
    dateLabel: 'February 28, 2024',
  },
  {
    id: 3,
    title: 'Smooth Customs Process',
    service: 'Customs Clearance',
    iconType: 'shield',
    rating: 5.0,
    text:
      'Exceptional customs clearance service. The team handled all documentation perfectly and the process was much faster than expected. Great communication throughout and no hidden fees. Highly recommended!',
    dateLabel: 'January 12, 2024',
  },
  {
    id: 4,
    title: 'Fast Air Freight',
    service: 'Air Freight Services',
    iconType: 'plane',
    rating: 4.0,
    text:
      'Good air freight service with competitive pricing. Delivery was on schedule and the cargo arrived in perfect condition. The only minor issue was the initial response time, but overall very satisfied with the service quality.',
    dateLabel: 'December 8, 2023',
  },
];

function Myreviews() {
  const [reviews, setReviews] = useState(demoReviews);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [savingId, setSavingId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(function () {
    setLoading(true);

    var authHeaders = {};
    try {
      var t = window.localStorage.getItem('authToken');
      if (t) authHeaders['Authorization'] = 'Bearer ' + t;
    } catch (e) {}

    fetch('/api/reviews/mine', { headers: authHeaders })
      .then(function (res) { return res ? res.json().catch(function(){return null;}).then(function(body){ return { ok: res.ok, status: res.status, body: body }; }) : null; })
      .then(function (result) {
        if (!result) return;
        if (!result.ok) return;
        var body = result.body || {};
        var items = Array.isArray(body.data) ? body.data : (Array.isArray(body.reviews) ? body.reviews : []);
        if (!items.length) return;
        var mapped = items.map(function (r, index) {
          var rating = r.rating || 5;
          var text = r.comment || r.text || '';
          var baseTitle = r.company || r.role || 'Customer Review';
          var service = r.company || 'StarShipping Customer';
          var rawDate = r.createdAt || r.updatedAt || r.date;
          var dateLabel = rawDate ? rawDate.toString().slice(0, 10) : 'Recent';

          return {
            id: r.id || index + 1,
            title: baseTitle,
            service: service,
            iconType: 'truck',
            rating: rating,
            text: text,
            dateLabel: dateLabel,
          };
        });
        setReviews(mapped);
      })
      .catch(function () {})
      .finally(function () {
        setLoading(false);
      });
  }, []);

  function startEdit(review) {
    setEditingId(review.id);
    setEditText(review.text || '');
    setEditRating(review.rating || 5);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText('');
    setEditRating(5);
  }

  function saveEdit(id) {
    if (!editText) {
      return;
    }

    setSavingId(id);

    fetch('/api/reviews/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rating: editRating,
        comment: editText,
      }),
    })
      .then(function (res) {
        var ok = res && res.ok;
        return res
          .json()
          .catch(function () { return null; })
          .then(function (data) { return { ok: ok, data: data }; });
      })
      .then(function (result) {
        if (!result || !result.ok || !result.data || !result.data.review) {
          return;
        }

        var updated = result.data.review;
        setReviews(function (prev) {
          return prev.map(function (r) {
            if (r.id !== id) return r;
            return Object.assign({}, r, {
              text: updated.comment || updated.text || r.text,
              rating: typeof updated.rating === 'number' ? updated.rating : r.rating,
              dateLabel: updated.updatedAt || updated.createdAt || r.dateLabel,
            });
          });
        });

        setEditingId(null);
        setEditText('');
        setEditRating(5);
      })
      .catch(function () {})
      .finally(function () {
        setSavingId(null);
      });
  }

  function deleteReview(id) {
    if (!window.confirm('Delete this review?')) return;

    setDeletingId(id);
    setMenuOpenId(null);

    fetch('/api/reviews/' + id, {
      method: 'DELETE',
    })
      .then(function (res) {
        if (!res || !res.ok) return;
        setReviews(function (prev) {
          return prev.filter(function (r) { return r.id !== id; });
        });
        if (editingId === id) {
          cancelEdit();
        }
      })
      .catch(function () {})
      .finally(function () {
        setDeletingId(null);
      });
  }

  var total = reviews.length;
  var avg = total
    ? (
        reviews.reduce(function (sum, r) { return sum + (r.rating || 0); }, 0) /
        total
      ).toFixed(1)
    : '0.0';

  return (
    <div className="myreviews-page">
      <Header transparentOnTop={false} active="reviews" />

      <main className="myreviews-main">
        <div className="myreviews-header-block">
          <h1 className="myreviews-title">My Reviews</h1>
          <p className="myreviews-subtitle">View and manage all the feedback you have shared.</p>
        </div>

        <div className="myreviews-summary-row">
          <div className="myreviews-pill">
            <span className="myreviews-pill-icon myreviews-pill-icon-gold">★</span>
            <span className="myreviews-pill-label">Average Rating: {avg}</span>
          </div>
          <div className="myreviews-pill">
            <span className="myreviews-pill-icon myreviews-pill-icon-blue">💬</span>
            <span className="myreviews-pill-label">{total} Reviews</span>
          </div>
        </div>

        <section className="myreviews-grid" aria-label="My reviews list">
          {reviews.map(function (review) {
            var iconClass = 'myreviews-service-icon ';
            var iconSymbol = '🚚';
            if (review.iconType === 'warehouse') {
              iconClass += 'myreviews-service-icon-green';
              iconSymbol = '🏬';
            } else if (review.iconType === 'shield') {
              iconClass += 'myreviews-service-icon-purple';
              iconSymbol = '🛡️';
            } else if (review.iconType === 'plane') {
              iconClass += 'myreviews-service-icon-orange';
              iconSymbol = '✈️';
            } else {
              iconClass += 'myreviews-service-icon-blue';
              iconSymbol = '🚚';
            }

            return (
              <article key={review.id} className="myreviews-card">
                <div className="myreviews-card-header">
                  <div className="myreviews-service">
                    <div className={iconClass}>{iconSymbol}</div>
                    <div>
                      <div className="myreviews-service-text-main">{review.title}</div>
                      <div className="myreviews-service-text-sub">{review.service}</div>
                    </div>
                  </div>
                  <div
                    className="myreviews-card-menu"
                    style={{ position: 'relative', cursor: 'pointer' }}
                    onClick={function (e) {
                      e.stopPropagation();
                      setMenuOpenId(menuOpenId === review.id ? null : review.id);
                    }}
                    aria-hidden="true"
                  >
                    ⋯
                    {menuOpenId === review.id && (
                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: '120%',
                          backgroundColor: '#111827',
                          color: '#f9fafb',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          fontSize: '11px',
                          boxShadow: '0 10px 30px rgba(15,23,42,0.4)',
                          zIndex: 10,
                        }}
                      >
                        <button
                          type="button"
                          onClick={function (e) {
                            e.stopPropagation();
                            deleteReview(review.id);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'transparent',
                            border: 'none',
                            color: 'inherit',
                            cursor: deletingId === review.id ? 'default' : 'pointer',
                            opacity: deletingId === review.id ? 0.6 : 1,
                          }}
                          disabled={deletingId === review.id}
                        >
                          <span>🗑️</span>
                          <span>Delete review</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="myreviews-rating-row">
                  <div className="myreviews-stars">{'★★★★★'.slice(0, Math.round(review.rating || 0))}</div>
                  <div className="myreviews-rating-value">{review.rating.toFixed(1)}</div>
                </div>

                {editingId === review.id ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={function (e) { setEditText(e.target.value); }}
                      style={{
                        width: '100%',
                        minHeight: '72px',
                        fontSize: '13px',
                        padding: '8px 10px',
                        borderRadius: '10px',
                        border: '1px solid #e5e7eb',
                        resize: 'vertical',
                        marginTop: '4px',
                        marginBottom: '8px',
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>Rating:</span>
                      <select
                        value={editRating}
                        onChange={function (e) { setEditRating(parseInt(e.target.value, 10) || 5); }}
                        style={{ fontSize: '12px', padding: '3px 6px', borderRadius: '999px', border: '1px solid #e5e7eb' }}
                      >
                        {[1, 2, 3, 4, 5].map(function (v) {
                          return (
                            <option key={v} value={v}>{v}</option>
                          );
                        })}
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={function () { saveEdit(review.id); }}
                        disabled={savingId === review.id}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '999px',
                          border: 'none',
                          fontSize: '12px',
                          backgroundColor: '#2563eb',
                          color: '#fff',
                          cursor: savingId === review.id ? 'default' : 'pointer',
                        }}
                      >
                        {savingId === review.id ? 'Saving...' : 'Save changes'}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '999px',
                          border: '1px solid #e5e7eb',
                          fontSize: '12px',
                          backgroundColor: '#fff',
                          color: '#374151',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="myreviews-body-text">{review.text}</p>
                )}

                <div className="myreviews-card-footer">
                  <div className="myreviews-date">
                    <span className="myreviews-date-icon">📅</span>
                    <span>{review.dateLabel}</span>
                  </div>
                  <button
                    type="button"
                    className="myreviews-edit-btn"
                    onClick={function () { startEdit(review); }}
                  >
                    <span>✎</span>
                    <span>Edit Review</span>
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        <div className="myreviews-load-more">
          <button type="button" disabled={loading}>{loading ? 'Loading reviews...' : '+ Load More Reviews'}</button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Myreviews;

