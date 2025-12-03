import React, { useEffect, useState } from 'react';
import './Review.css';
import Header from './Header';
import Footer from './Footer';

const initialReviews = [
  {
    id: 1,
    name: 'Person 1',
    role: 'CEO, TechCorp',
    rating: 5,
    text:
      'StarShipping has transformed our logistics operations. Their reliability and customer service are unmatched.',
  },
  {
    id: 2,
    name: 'Person 2',
    role: 'Operations Manager',
    rating: 5,
    text:
      'Excellent tracking system and professional handling of our shipments. They keep us informed at every step.',
  },
  {
    id: 3,
    name: 'Person 3',
    role: 'Supply Chain Director',
    rating: 5,
    text:
      'Great service overall. Pricing is competitive and delivery times are consistent with our expectations.',
  },
  {
    id: 4,
    name: 'Person 4',
    role: 'Logistics Coordinator',
    rating: 5,
    text:
      'Their team is proactive and always available to help. We have seen significant improvements in delivery times.',
  },
  {
    id: 5,
    name: 'Person 5',
    role: 'E-commerce Manager',
    rating: 5,
    text:
      'Perfect fit for our growing business. Shipments arrive on time and in perfect condition.',
  },
  {
    id: 6,
    name: 'Person 6',
    role: 'Warehouse Manager',
    rating: 5,
    text:
      'Professional and reliable partner for our international shipments. Highly recommended.',
  },
];

function Review() {
  const [reviews, setReviews] = useState(initialReviews);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(function () {
    setLoading(true);
    fetch('/api/reviews')
      .then(function (res) {
        return res && res.ok ? res.json() : null;
      })
      .then(function (data) {
        if (data && Array.isArray(data.reviews)) {
          setReviews(
            data.reviews.map(function (r, idx) {
              var maskedName = 'Person ' + (idx + 1);
              return {
                id: r.id,
                name: maskedName,
                role: r.company || r.role,
                rating: r.rating,
                text: r.comment || r.text,
              };
            })
          );
        }
      })
      .catch(function () {})
      .finally(function () {
        setLoading(false);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !rating || !text) return;

    setSubmitSuccess('');
    setSubmitError('');
    setSubmitting(true);

    var payload = {
      name: name,
      company: company,
      rating: rating,
      comment: text,
    };

    // Attach auth token if available so the backend can associate the review to the user
    var headers = { 'Content-Type': 'application/json' };
    try {
      var t = window.localStorage.getItem('authToken');
      if (t) headers['Authorization'] = 'Bearer ' + t;
    } catch (e) {}

    fetch('/api/reviews', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        var ok = res && res.ok;
        return res
          .json()
          .catch(function () {
            return null;
          })
          .then(function (data) {
            return { ok: ok, data: data };
          });
      })
      .then(function (result) {
        if (!result) {
          setSubmitError('Something went wrong. Please try again.');
          return;
        }

        if (!result.ok) {
          var msg =
            result.data && result.data.message
              ? result.data.message
              : 'Unable to submit your review. Please try again.';
          setSubmitError(msg);
          return;
        }

        var data = result.data || {};
        var newReview = data.review;
        if (newReview) {
          setReviews(function (prev) {
            var mapped = {
              id: newReview.id,
              name: 'Person ' + (prev.length + 1),
              role: newReview.company || newReview.role,
              rating: newReview.rating,
              text: newReview.comment || newReview.text,
            };
            return [mapped].concat(prev);
          });
        }

        setSubmitSuccess('Thank you! Your review has been submitted.');
      })
      .catch(function () {
        setSubmitError('Network error while submitting your review.');
      })
      .finally(function () {
        setSubmitting(false);
      });

    setName('');
    setCompany('');
    setRating(0);
    setText('');
  }

  var avgRating = reviews.length
    ? (
        reviews.reduce(function (sum, r) {
          return sum + (r.rating || 0);
        }, 0) / reviews.length
      ).toFixed(1)
    : '4.8';

  return (
    <div className="reviews-page">
      <Header transparentOnTop={false} active="reviews" />

      <main className="reviews-main">
        <section className="reviews-header">
          <h1 className="reviews-header-title">Customer Reviews</h1>
          <p className="reviews-header-sub">
            See what our clients say about our shipping services.
          </p>
        </section>

        <section className="review-stats-wrap" aria-label="Review summary">
          <div className="review-stats-card">
            <div className="review-score-main">
              <div className="review-score-value">{avgRating}</div>
              <div className="review-stars">★★★★★</div>
              <div className="review-score-caption">
                Based on <span>{reviews.length}</span> reviews
              </div>
            </div>

            <div className="review-bars">
              {[5, 4, 3, 2, 1].map(function (star) {
                var count = reviews.filter(function (r) {
                  return r.rating === star;
                }).length;
                var percent = reviews.length
                  ? Math.round((count / reviews.length) * 100)
                  : star === 5
                  ? 78
                  : 4;

                return (
                  <div className="review-bar-row" key={star}>
                    <div className="review-bar-label">{star}</div>
                    <div className="review-bar-track">
                      <div
                        className="review-bar-fill"
                        style={{ width: percent + '%' }}
                      />
                    </div>
                    <div className="review-bar-percent">{percent}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="reviews-grid" aria-label="Customer reviews list">
          {reviews.slice(0, 6).map(function (r) {
            var initials = (r.name || '')
              .split(' ')
              .filter(Boolean)
              .map(function (p) {
                return p[0];
              })
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <article className="review-card" key={r.id}>
                <div className="review-card-header">
                  <div className="review-avatar" aria-hidden="true">
                    {initials || 'SS'}
                  </div>
                  <div className="review-meta">
                    <div className="review-name">{r.name}</div>
                    {r.role && <div className="review-role">{r.role}</div>}
                  </div>
                  <div className="review-card-stars">
                    {'★★★★★'.slice(0, r.rating || 5)}
                  </div>
                </div>
                <p className="review-text">{r.text}</p>
                <div className="review-footer-row">2 weeks ago</div>
              </article>
            );
          })}
        </section>

        <section className="review-form-wrap" aria-label="Leave a review">
          <form className="review-form-card" onSubmit={handleSubmit}>
            <div className="review-form-header">
              <h2 className="review-form-title">Leave a Review</h2>
              <p className="review-form-sub">
                Share your experience with StarShipping.
              </p>
            </div>

            <div className="review-form-grid">
              <div className="review-field">
                <label className="review-label" htmlFor="rev-name">
                  Your Name
                </label>
                <input
                  id="rev-name"
                  className="review-input"
                  type="text"
                  value={name}
                  onChange={function (e) {
                    setName(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="review-field">
                <label className="review-label" htmlFor="rev-company">
                  Company
                </label>
                <input
                  id="rev-company"
                  className="review-input"
                  type="text"
                  value={company}
                  onChange={function (e) {
                    setCompany(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="review-rating-row">
              <span>Rating</span>
              <div className="review-stars-select">
                {[1, 2, 3, 4, 5].map(function (star) {
                  var active = star <= rating;
                  return (
                    <span
                      key={star}
                      className={active ? 'active' : ''}
                      onClick={function () {
                        setRating(star);
                      }}
                    >
                      ★
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="review-field">
              <label className="review-label" htmlFor="rev-text">
                Your Review
              </label>
              <textarea
                id="rev-text"
                className="review-textarea"
                value={text}
                onChange={function (e) {
                  setText(e.target.value);
                }}
                placeholder="Tell us about your experience with StarShipping..."
                required
              />
            </div>

            <div className="review-form-actions">
              <button
                type="submit"
                className="review-submit-btn"
                disabled={loading || submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
            {submitSuccess && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#16a34a' }}>
                {submitSuccess}
              </div>
            )}
            {submitError && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#dc2626' }}>
                {submitError}
              </div>
            )}
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Review;

