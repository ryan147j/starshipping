import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Services.css';
import contanershipImg from '../src/assets/contanership.jpg';
import highcubeImg from '../src/assets/highcube.png';
import airfreightImg from '../src/assets/airfreight.jpg';
import heavycargoImg from '../src/assets/heavycargo.jpg';
import oceanfreightImg from '../src/assets/ocenafreight .jpg';
import opentopCardImg from '../src/assets/opentop.jpg';
import roadfreightImg from '../src/assets/roadtransport.jpg';
import warehousingImg from '../src/assets/warehousy1.jpg';
import internationaltransportImg from '../src/assets/internationaltransport.jpg';
import flatrack2Img from '../src/assets/flatrack2.jpg';
import tankImg from '../src/assets/tank.jpg';
import insulatedCardImg from '../src/assets/insulated2.jpg';
import logoImg from '../src/assets/logostarshipping2.png';
import Oceanfreight from './Oceanfreight';
import Airfreight from './Airfreight';
import Roadtransport from './Roadtransport';
import Heavycargo from './Heavycargo';
import Warehouse from './Warehouse';
import Customs from './Customs';
import Footer from './Footer';

const Services = () => {
  const navigate = useNavigate();
  const [isTransparent, setIsTransparent] = useState(true);
  const [showOcean, setShowOcean] = useState(false);
  const [showAir, setShowAir] = useState(false);
  const [showRoad, setShowRoad] = useState(false);
  const [showHeavy, setShowHeavy] = useState(false);
  const [showWarehouse, setShowWarehouse] = useState(false);
  const [showCustoms, setShowCustoms] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsTransparent(window.scrollY <= 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent background scroll when any modal is open
  useEffect(() => {
    const anyOpen = showOcean || showAir || showRoad || showHeavy || showWarehouse || showCustoms;
    const body = document.body;
    if (anyOpen) body.classList.add('modal-open');
    else body.classList.remove('modal-open');
    return () => body.classList.remove('modal-open');
  }, [showOcean, showAir, showRoad, showHeavy, showWarehouse, showCustoms]);

  const services = [
    {
      image: oceanfreightImg,
      title: 'Ocean Freight',
      description: 'Cost-effective shipping solutions for large cargo volumes with FCL and LCL options.'
    },
    {
      image: airfreightImg,
      title: 'Air Freight',
      description: 'Fast and reliable air cargo services for time-sensitive shipments worldwide.'
    },
    {
      image: roadfreightImg,
      title: 'Road Transport',
      description: 'Flexible ground transportation with real-time tracking capabilities.'
    },
    {
      image: heavycargoImg,
      title: 'Heavy Cargo',
      description: 'Specialized handling for oversized and heavy shipments with expert care.'
    },
    {
      image: warehousingImg,
      title: 'Warehousing',
      description: 'Secure storage facilities with inventory management and distribution services.'
    },
    {
      image: contanershipImg,
      title: 'Customs Clearance',
      description: 'Expert customs brokerage ensuring smooth clearance and compliance.'
    }
  ];

  const containerTypes = [
    {
      image: contanershipImg,
      title: 'Standard Container',
      description: 'The most common container type, perfect for general cargo with standard dimensions and weather protection.'
    },
    {
      image: opentopCardImg,
      title: 'Open Top Container',
      description: 'Ideal for oversized cargo that cannot fit through standard doors, with removable top for easy loading.'
    },
    {
      image: flatrack2Img,
      title: 'Flat Rack Container',
      description: 'Open-sided container perfect for heavy machinery, vehicles, and oversized equipment that needs side access.'
    },
    {
      image: tankImg,
      title: 'Tank Container',
      description: 'ISO tanks for liquids, chemicals, and gases with industry-grade safety and containment.'
    },
    {
      image: insulatedCardImg,
      title: 'Insulated Container',
      description: 'Stable internal temperature without active refrigeration for sensitive cargo.'
    },
    {
      image: highcubeImg,
      title: 'High Cube Container',
      description: 'Extra height for maximum cargo capacity. Perfect for oversized shipments and stacked pallets.'
    },
    {
      image: airfreightImg,
      title: 'Refrigerated Container',
      description: 'Temperature-controlled containers for perishable goods, pharmaceuticals, and temperature-sensitive cargo.'
    }
  ];

  return (
    <div className="services-page">
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
              <Link to="/services" className="active">Services</Link>
              <Link to="/reviews">Reviews</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
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
      <section className="services-hero">
        <div className="hero-background" style={{ backgroundImage: `url(${internationaltransportImg})` }}>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Our Services</h1>
            <p className="hero-subtitle">Reliable global logistics solutions tailored for your business</p>
          </div>
        </div>
      </section>

      {/* Comprehensive Logistics Solutions Section */}
      <section className="logistics-solutions">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Comprehensive Logistics Solutions</h2>
            <p className="section-subtitle">
              From ocean freight to last-mile delivery, we provide end-to-end shipping services designed to meet your unique business requirements.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card"
                onClick={
                  service.title === 'Ocean Freight'
                    ? () => setShowOcean(true)
                    : service.title === 'Air Freight'
                    ? () => setShowAir(true)
                    : service.title === 'Road Transport'
                    ? () => setShowRoad(true)
                    : service.title === 'Heavy Cargo'
                    ? () => setShowHeavy(true)
                    : service.title === 'Warehousing'
                    ? () => setShowWarehouse(true)
                    : service.title === 'Customs Clearance'
                    ? () => setShowCustoms(true)
                    : undefined
                }
                style={
                  service.title === 'Ocean Freight' || service.title === 'Air Freight' || service.title === 'Road Transport' || service.title === 'Heavy Cargo'
                    ? { cursor: 'pointer' }
                    : service.title === 'Warehousing'
                    ? { cursor: 'pointer' }
                    : service.title === 'Customs Clearance'
                    ? { cursor: 'pointer' }
                    : undefined
                }
              >
                <div className="service-image-container">
                  <img src={service.image} alt={service.title} className="service-image" />
                  <div className="service-overlay">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Shipping Containers Section */}  
      <section className="container-types">
        
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Types of Shipping Containers</h2>
            <p className="section-subtitle">
              Choose the right container type based on your shipping needs. Our diverse fleet ensures your cargo is transported safely and efficiently.
            </p>
          </div>
          <div className="container-grid">
            {containerTypes.map((container, index) => (
              <div
                key={index}
                className="container-card"
                onClick={
                  container.title === 'Standard Container'
                    ? () => navigate('/container/standard')
                  : container.title === 'Refrigerated Container'
                    ? () => navigate('/container/reefer')
                  : container.title === 'High Cube Container'
                    ? () => navigate('/container/high-cube')
                  : container.title === 'Flat Rack Container'
                    ? () => navigate('/container/flatrack')
                  : container.title === 'Open Top Container'
                    ? () => navigate('/container/open-top')
                  : container.title === 'Tank Container'
                    ? () => navigate('/container/tank')
                  : container.title === 'Insulated Container'
                    ? () => navigate('/container/insulated')
                  : undefined
                }
                style={
                  container.title === 'Standard Container' || container.title === 'Refrigerated Container' || container.title === 'High Cube Container' || container.title === 'Flat Rack Container' || container.title === 'Open Top Container' || container.title === 'Tank Container' || container.title === 'Insulated Container'
                    ? { cursor: 'pointer' }
                    : undefined
                }
              >
                <div className="container-image-container">
                  <img src={container.image} alt={container.title} className="container-image" />
                  <div className="container-overlay">
                    <h3 className="container-title">{container.title}</h3>
                    <p className="container-description">{container.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to ship with confidence?</h2>
            <p className="cta-subtitle">Join thousands of businesses who trust us with their global logistics needs</p>
            <div className="cta-buttons">
              {/* Removed Get a Quote per request */}
              <button className="btn-cta-secondary">
                <span className="btn-icon">+</span>
                Create Shipment
              </button>
          </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <Oceanfreight open={showOcean} onClose={() => setShowOcean(false)} />
      <Airfreight open={showAir} onClose={() => setShowAir(false)} />
      <Roadtransport open={showRoad} onClose={() => setShowRoad(false)} />
      <Heavycargo open={showHeavy} onClose={() => setShowHeavy(false)} />
      <Warehouse open={showWarehouse} onClose={() => setShowWarehouse(false)} />
      <Customs open={showCustoms} onClose={() => setShowCustoms(false)} />
    </div>
  );
};

export default Services;
