import React, { useState } from 'react'
import './Booking.css'
import Header from './Header'
import Footer from './Footer'
import visualImg from '../src/assets/booking.jpg'
import { API_BASE_URL } from '../config'

const Booking = () => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Tunisia',
    dialCode: '+216',
    localLength: 8
  })
  const [localPhone, setLocalPhone] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (isSubmitting) return

    // Validate local phone length if provided
    if (localPhone && selectedCountry.localLength && localPhone.length !== selectedCountry.localLength) {
      setSubmitError(
        'Please enter a valid phone number: ' +
          selectedCountry.dialCode +
          ' followed by exactly ' +
          selectedCountry.localLength +
          ' digits.'
      )
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    const form = e.target
    const data = {
      fullName: form.fullName.value,
      email: form.email.value,
      phone: selectedCountry.dialCode + (localPhone || ''),
      cargoType: form.cargoType.value,
      origin: form.origin.value,
      destination: form.destination.value,
      weight: form.weight.value,
      date: form.date.value,
      notes: form.notes.value
    }

    // Prepare auth header if logged in
    const headers = { 'Content-Type': 'application/json' }
    try {
      const t = window.localStorage.getItem('authToken')
      if (t) headers['Authorization'] = 'Bearer ' + t
    } catch (e) {}

    fetch(API_BASE_URL + '/api/shipping/booking-request', {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json().then((body) => ({ ok: response.ok, body }))
      })
      .then((result) => {
        if (result.ok && result.body && result.body.success) {
          setShowConfirm(true)
          form.reset()
        } else {
          setSubmitError(
            (result.body && result.body.message) ||
              'Something went wrong while submitting your booking. Please try again.'
          )
        }
      })
      .catch(() => {
        setSubmitError('Unable to submit your booking right now. Please try again later.')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleCountryChange = (e) => {
    const value = e.target.value
    const parts = value.split('|')
    const dialCode = parts[0]
    const localLength = parseInt(parts[1], 10) || 0
    const name = parts[2] || ''

    setSelectedCountry({
      name,
      dialCode,
      localLength
    })

    setLocalPhone('')
  }

  const handleLocalPhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '')
    const trimmed = selectedCountry.localLength
      ? digitsOnly.slice(0, selectedCountry.localLength)
      : digitsOnly

    setLocalPhone(trimmed)
  }

  return (
    <div className="booking-page">
      <Header transparentOnTop={false} active="services" />

      <div className="container">
        <div className="booking-hero">
          <h1 className="title">Book Your Shipment</h1>
          <p className="sub">Fast, reliable, and secure booking in just a few steps.</p>
        </div>

        <div className="booking-grid">
          {/* Left: Form card */}
          <div className="booking-card">
            <div className="card-title">Shipment Details</div>
            <form className="booking-form" onSubmit={onSubmit}>
              <div className="field">
                <label className="label" htmlFor="fullName">Full Name</label>
                <input id="fullName" name="fullName" type="text" className="input" placeholder="Your full name" required />
              </div>
              <div className="field">
                <label className="label" htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" className="input" placeholder="you@example.com" required />
              </div>

              <div className="field">
                <label className="label" htmlFor="phone">Phone Number</label>
                <div className="phone-input-row">
                  <select
                    className="country-select input"
                    value={selectedCountry.dialCode + '|' + selectedCountry.localLength + '|' + selectedCountry.name}
                    onChange={handleCountryChange}
                  >
                    <option value="+216|8|Tunisia">Tunisia (+216)</option>
                    <option value="+1|10|United States">United States (+1)</option>
                    <option value="+44|10|United Kingdom">United Kingdom (+44)</option>
                    <option value="+33|9|France">France (+33)</option>
                    <option value="+49|10|Germany">Germany (+49)</option>
                    <option value="+39|10|Italy">Italy (+39)</option>
                    <option value="+34|9|Spain">Spain (+34)</option>
                    <option value="+971|9|United Arab Emirates">United Arab Emirates (+971)</option>
                    <option value="+966|9|Saudi Arabia">Saudi Arabia (+966)</option>
                    <option value="+20|10|Egypt">Egypt (+20)</option>
                    <option value="+212|9|Morocco">Morocco (+212)</option>
                    <option value="+213|9|Algeria">Algeria (+213)</option>
                    <option value="+965|8|Kuwait">Kuwait (+965)</option>
                    <option value="+974|8|Qatar">Qatar (+974)</option>
                    <option value="+961|8|Lebanon">Lebanon (+961)</option>
                    <option value="+962|8|Jordan">Jordan (+962)</option>
                    <option value="+90|10|Turkey">Turkey (+90)</option>
                    <option value="+91|10|India">India (+91)</option>
                    <option value="+81|10|Japan">Japan (+81)</option>
                    <option value="+86|11|China">China (+86)</option>
                    <option value="+61|9|Australia">Australia (+61)</option>
                    <option value="+55|10|Brazil">Brazil (+55)</option>
                    <option value="+52|10|Mexico">Mexico (+52)</option>
                  </select>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="input phone-input"
                    placeholder={selectedCountry.dialCode + ' ' + (selectedCountry.localLength ? '•'.repeat(selectedCountry.localLength) : '')}
                    value={localPhone}
                    onChange={handleLocalPhoneChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="cargoType">Cargo Type</label>
                <select id="cargoType" name="cargoType" className="select" defaultValue="" required>
                  <option value="" disabled>Select Service</option>
                  <option>Air Freight</option>
                  <option>Ocean Freight</option>
                  <option>Road Transport</option>
                  <option>Heavy Cargo</option>
                  <option>Warehousing</option>
                  <option>Customs Clearance</option>
                </select>
              </div>

              <div className="field">
                <label className="label" htmlFor="origin">Origin</label>
                <input id="origin" name="origin" type="text" className="input" placeholder="City, Country" />
              </div>
              <div className="field">
                <label className="label" htmlFor="destination">Destination</label>
                <input id="destination" name="destination" type="text" className="input" placeholder="City, Country" />
              </div>

              <div className="field">
                <label className="label" htmlFor="weight">Cargo Weight (kg)</label>
                <input id="weight" name="weight" type="number" min="0" step="0.01" className="input" placeholder="e.g. 1200" />
              </div>
              <div className="field">
                <label className="label" htmlFor="date">Preferred Date</label>
                <input id="date" name="date" type="date" className="date" />
              </div>

              <div className="field full">
                <label className="label" htmlFor="notes">Additional Notes</label>
                <textarea id="notes" name="notes" className="textarea" placeholder="Any special handling requirements..."></textarea>
              </div>

              {submitError && (
                <div className="bk-error" style={{ color: '#dc2626', marginTop: '0.5rem' }}>
                  {submitError}
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Book Now'}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Visual */}
          <div className="booking-visual" aria-hidden="true">
            <div className="img" style={{backgroundImage:`url(${visualImg})`}} />
            <div className="overlay" />
            <div className="caption">Global logistics, simplified</div>
          </div>
        </div>
      </div>

      <Footer />

      {showConfirm && (
        <div className="bk-overlay" role="dialog" aria-modal="true" aria-labelledby="bk-title">
          <div className="bk-modal">
            <div className="bk-check">✓</div>
            <div id="bk-title" className="bk-title">Your booking request has been submitted successfully!</div>
            <div className="bk-sub">Our team will contact you shortly.</div>
            <div className="bk-close"><button className="btn-primary" type="button" onClick={()=> setShowConfirm(false)}>Close</button></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Booking

