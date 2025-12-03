import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './About.css';
import contanershipImg from '../src/assets/contanership.jpg';
import customsupportImg from '../src/assets/customsupport.jpg';
import aboutsectionImg from '../src/assets/aboutsection.jpg';
import logoImg from '../src/assets/logostarshipping2.png';
import Footer from './Footer';

const About = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const navigate = useNavigate();

  // Nav background change on scroll
  useEffect(() => {
    const onScroll = () => setIsTransparent(window.scrollY <= 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const features = [
    {
      icon: '🛡️',
      title: 'Reliability',
      description: 'Consistent on-time delivery you can count on'
    },
    {
      icon: '⚡',
      title: 'Speed & Efficiency',
      description: 'Fast and streamlined logistics solutions'
    },
    {
      icon: '🔒',
      title: 'Safety & Security',
      description: 'Your cargo is protected with advanced security'
    },
    {
      icon: '🌍',
      title: 'Global Network',
      description: 'Worldwide coverage with local expertise'
    }
  ];

  const achievements = [
    {
      icon: '🌍',
      number: 180,
      suffix: '+',
      description: 'Countries Served'
    },
    {
      icon: '📦',
      number: 20,
      suffix: 'K+',
      description: 'Annual Shipments'
    },
    {
      icon: '⏱️',
      number: 3.2,
      suffix: '',
      description: 'Days Avg Delivery'
    },
    
  ];

  const [animatedValues, setAnimatedValues] = useState(
    achievements.map(() => 0)
  );

  // IntersectionObserver for scroll reveal + starting counters
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const achievementSection = document.querySelector('.achievements');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Counter animation triggered when achievements section enters view
    let counterObserver;
    if (achievementSection) {
      counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            counterObserver.disconnect();

            const duration = 1600;
            const start = performance.now();

            const animate = (now) => {
              const progress = Math.min((now - start) / duration, 1);

              setAnimatedValues(
                achievements.map((a) => {
                  if (a.number > 1000) {
                    return Math.floor(a.number * progress);
                  }
                  if (a.number > 10) {
                    return Math.round(a.number * progress);
                  }
                  return parseFloat((a.number * progress).toFixed(1));
                })
              );

              if (progress < 1) requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
          });
        },
        { threshold: 0.3 }
      );

      counterObserver.observe(achievementSection);
    }

    return () => {
      observer.disconnect();
      if (counterObserver) counterObserver.disconnect();
    };
  }, []);

  const leadership = [
    {
      name: 'Michael Chen',
      title: 'Chief Executive Officer',
      description: '25+ years in global logistics',
      avatar: 'MC'
    },
    {
      name: 'Sarah Martinez',
      title: 'Chief Operations Officer',
      description: 'Expert in supply chain optimization',
      avatar: 'SM'
    },
    {
      name: 'David Johnson',
      title: 'Chief Technology Officer',
      description: 'Leading digital transformation initiatives',
      avatar: 'DJ'
    },
    {
      name: 'Lisa Wang',
      title: 'Chief Financial Officer',
      description: 'Strategic financial planning expert',
      avatar: 'LW'
    }
  ];

  return (
    <div className="about-page">
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
              <Link to="/about" className="active">About</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="about-hero reveal-on-scroll">
        <div className="hero-background" style={{ backgroundImage: `url(${aboutsectionImg})` }}>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">About StarShipping</h1>
            <p className="hero-subtitle">Reliable global logistics solutions connecting businesses worldwide</p>
          </div>
        </div>
      </section>

      {/* Our Story & Mission Section */}
      <section className="story-mission reveal-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Story & Mission</h2>
            <p className="section-description">
             Founded in 2015, StarShipping has grown into a global logistics powerhouse, connecting businesses across continents with reliable, efficient, and secure shipping solutions. Over the years, we have built a reputation for excellence by consistently delivering on time, adapting to industry challenges, and investing in advanced technologies that streamline global trade. Our commitment goes beyond transportation — we partner with companies to simplify their supply chain, reduce operational stress, and create seamless trade experiences across borders.
Our mission is to make international commerce accessible, transparent, and efficient for businesses of all sizes, empowering them to grow confidently in a fast-moving global market. 
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card reveal-on-scroll">
                <div className="feature-icon">
                  <span className="icon-symbol">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Achievements Section */}
      <section className="achievements reveal-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Achievements</h2>
          </div>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card reveal-on-scroll">
                <div className="achievement-icon">
                  <span className="icon-symbol">{achievement.icon}</span>
                </div>
                <div className="achievement-number">
                  {achievement.number <= 10
                    ? `${animatedValues[index]}${achievement.suffix}`
                    : `${animatedValues[index]}${achievement.suffix}`}
                </div>
                <div className="achievement-description">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Leadership Section */}
      <section className="leadership reveal-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Leadership</h2>
            <p className="section-subtitle">Experienced professionals driving our global success</p>
          </div>
          <div className="leadership-grid">
            {leadership.map((leader, index) => (
              <div key={index} className="leadership-card reveal-on-scroll">
                <div className="leader-avatar">
                  <span className="avatar-text">{leader.avatar}</span>
                </div>
                <h3 className="leader-name">{leader.name}</h3>
                <p className="leader-title">{leader.title}</p>
                <p className="leader-description">{leader.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section reveal-on-scroll">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">🚛</div>
            <h2 className="cta-title">Want to partner with us?</h2>
            <p className="cta-description">
              Join thousands of businesses that trust StarShipping for their global logistics needs. 
              Let's discuss how we can help grow your business.
            </p>
            <button type="button" className="cta-button" onClick={() => navigate('/contact')}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
