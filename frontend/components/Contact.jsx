import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Contact.css';
import contanershipImg from '../src/assets/contanership.jpg';
import customsupportImg from '../src/assets/customsupport.jpg';
import logoImg from '../src/assets/logostarshipping2.png';
import facebookLogo from '../src/assets/facebooklogo.png';
import linkedInLogo from '../src/assets/linkdin.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const location = useLocation();
  const navigate = useNavigate();

  const [isTransparent, setIsTransparent] = useState(true);
  const [officeLocation, setOfficeLocation] = useState(null);
  const [mapError, setMapError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // success or error message
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Tunisia',
    dialCode: '+216',
    localLength: 8
  });
  const [localPhone, setLocalPhone] = useState('');
  useEffect(() => {
    const onScroll = () => setIsTransparent(window.scrollY <= 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Load office location for map from backend
    fetch('/api/shipping/office-location')
      .then(response => response.json())
      .then(data => {
        if (data && data.success) {
          setOfficeLocation(data.data);
        } else {
          setMapError('Unable to load map location.');
        }
      })
      .catch(() => {
        setMapError('Unable to load map location.');
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subjectParam = params.get('subject');

    if (subjectParam === 'shipping-quote') {
      setFormData(prev => ({
        ...prev,
        subject: 'Shipping Quote'
      }));
    }
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    const parts = value.split('|');
    const dialCode = parts[0];
    const localLength = parseInt(parts[1], 10) || 0;
    const name = parts[2] || '';

    setSelectedCountry({
      name,
      dialCode,
      localLength
    });

    // Reset local phone when changing country
    setLocalPhone('');
    setFormData(prev => ({
      ...prev,
      phone: ''
    }));
  };

  const handleLocalPhoneChange = (e) => {
    // Allow only digits in the local part
    const digitsOnly = e.target.value.replace(/\D/g, '');
    const trimmed = selectedCountry.localLength
      ? digitsOnly.slice(0, selectedCountry.localLength)
      : digitsOnly;

    setLocalPhone(trimmed);
    setFormData(prev => ({
      ...prev,
      phone: selectedCountry.dialCode + (trimmed ? trimmed : '')
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    // Simple front-end validation for phone length when provided
    if (localPhone && selectedCountry.localLength && localPhone.length !== selectedCountry.localLength) {
      setSubmitStatus(
        'Please enter a valid phone number: ' +
          selectedCountry.dialCode +
          ' followed by exactly ' +
          selectedCountry.localLength +
          ' digits.'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    fetch('/api/contact/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, data: data };
        });
      })
      .then(function (result) {
        if (result.ok && result.data && result.data.success) {
          setSubmitStatus('Message sent successfully. We will get back to you soon.');
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            subject: 'General Inquiry',
            message: ''
          });
          setLocalPhone('');
        } else {
          setSubmitStatus(
            (result.data && result.data.message) ||
              'Something went wrong while sending your message. Please try again.'
          );
        }
      })
      .catch(function () {
        setSubmitStatus('Unable to send your message right now. Please try again later.');
      })
      .finally(function () {
        setIsSubmitting(false);
      });
  };

  const contactInfo = [
    {
      icon: '📞',
      title: '+216 58543830 / 58543831 / 58543832',
      subtitle: 'Tel | Fax: 73 200 954'
    },
    {
      icon: '✉️',
      title: 'contact1@starshipping.com',
      subtitle: "We'll respond within 24 hours"
    },
    {
      icon: '📍',
      title: 'B51 - 5th - imm Bochra',
      subtitle: "À côté de l'institut des Beaux Arts",
      additional: 'Bab Bhar, 4000 Sousse, Tunisia'
    },
    {
      icon: '🌐',
      title: 'www.starshipping.com',
      subtitle: 'Track shipments online 24/7'
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', image: linkedInLogo, href: '#' },
    { name: 'Facebook', image: facebookLogo, href: '#' }
  ];

  return (
    <div className="contact-page">
      {/* Header/Navigation */}
      <header className={`header${isTransparent ? ' transparent' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="logo">
              <img src={logoImg} alt="StarShipping Logo" className="logo-icon" />
              <span className="logo-text">StarShipping</span>
            </Link>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/reviews">Reviews</Link>
              <Link to="/about">About</Link>
              <Link to="/contact" className="active">Contact</Link>
            </nav>
            <button
              type="button"
              className="header-user-icon"
              aria-label="Account"
              onClick={() => navigate('/login')}
            >
              <span className="header-user-icon-inner">
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-background" style={{ backgroundImage: `url(${customsupportImg})` }}>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Get in Touch</h1>
            <p className="hero-subtitle">We're here to help you with your shipping needs. Reach out anytime!</p>
            <div className="hero-icons">
              <div className="hero-icon">📞</div>
              <div className="hero-icon">✉️</div>
              <div className="hero-icon">📍</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="main-content">
        <div className="container">
          <div className="content-card">
            <div className="content-columns">
              {/* Left Column - Contact Form */}
              <div className="form-column">
                <h2 className="form-title">Send us a Message</h2>
                <p className="form-description">Fill out the form below and we'll get back to you within 24 hours.</p>
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="phone-input-row">
                      <select
                        className="country-select"
                        value={selectedCountry.dialCode + '|' + selectedCountry.localLength + '|' + selectedCountry.name}
                        onChange={handleCountryChange}
                      >
                        {/* A scrollable list of countries with dialing codes */}
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
                        {/* You can add more countries here as needed */}
                      </select>

                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="phone-input"
                        placeholder={selectedCountry.dialCode + ' ' + (selectedCountry.localLength ? '•'.repeat(selectedCountry.localLength) : '')}
                        value={localPhone}
                        onChange={handleLocalPhoneChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Shipping Quote">Shipping Quote</option>
                      <option value="Track Shipment">Track Shipment</option>
                      <option value="Customer Support">Customer Support</option>
                      <option value="Partnership">Partnership</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your shipping requirements..."
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  {submitStatus && (
                    <p
                      className="form-description"
                      style={{ marginTop: '0.5rem', color: submitStatus.indexOf('successfully') !== -1 ? '#16a34a' : '#dc2626' }}
                    >
                      {submitStatus}
                    </p>
                  )}

                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    <span className="button-icon">✈️</span>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Right Column - Contact Information */}
              <div className="info-column">
                <h2 className="info-title">Contact Information</h2>
                
                <div className="contact-info-list">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="contact-info-item">
                      <div className="info-icon">
                        <span className="icon-symbol">{info.icon}</span>
                      </div>
                      <div className="info-content">
                        <div className="info-title-text">{info.title}</div>
                        <div className="info-subtitle">{info.subtitle}</div>
                        {info.additional && (
                          <div className="info-additional">{info.additional}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="follow-us">
                  <h3 className="follow-title">Follow Us</h3>
                  <div className="social-links">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="social-link"
                      >
                        <img src={social.image} alt={social.name + ' logo'} className="social-icon" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-header">
            <h2 className="map-title">Find Our Location</h2>
            <p className="map-subtitle">Visit our headquarters for in-person consultations and shipping services.</p>
          </div>
          {/* Text block above the bordered card */}
          <div className="map-content">
            <div className="map-title-text">Interactive Map</div>
            <div className="map-description">Embedded map showing our office location</div>
            <div className="map-address">
              {officeLocation
                ? `${officeLocation.addressLine1}, ${officeLocation.addressLine2}`
                : '1234 Harbor Drive, Port City, NY 10001'}
            </div>
          </div>

          {/* Dashed border card now wraps ONLY the map itself */}
          <div className="map-placeholder">
            <div className="map-pin">📍</div>
            <div className="map-embed-wrapper">
              {officeLocation && officeLocation.mapEmbedUrl && !mapError ? (
                <iframe
                  title="StarShipping Office Map"
                  src={officeLocation.mapEmbedUrl}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="map-fallback-text">
                  {mapError || 'Map is loading...'}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
