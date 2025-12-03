import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Airfreight.css';
import headerImg from '../src/assets/airfreight.jpg';

const Airfreight = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => { setIsClosing(false); onClose(); }, 360);
  }, [isClosing, onClose]);

  if (!open) return null;

  const onBackdrop = (e) => {
    if (e.target.classList.contains('af-overlay')) handleClose();
  };

  return (
    <div className={`af-overlay ${isClosing ? 'closing' : ''}`} onMouseDown={onBackdrop}>
      <div className={`af-modal ${isClosing ? 'closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="af-title">
        <button className="af-close" aria-label="Close" onClick={handleClose}>×</button>
        <div className="af-header" style={{ backgroundImage: `url(${headerImg})` }} />
        <div className="af-content">
          <h2 id="af-title" className="af-title">Air Freight Services</h2>
          <p className="af-subtitle">Fast, secure, and global air cargo solutions.</p>
          <p className="af-desc">
            Our Air Freight services ensure rapid and reliable delivery for your most time-sensitive shipments. With a global
            network of partners and state-of-the-art tracking technology, we guarantee your cargo reaches its destination
            safely and on schedule, no matter where in the world it needs to go.
          </p>
          <div className="af-book"><button type="button" className="book-now" aria-label="Book Air Freight" onClick={()=>{ onClose?.(); navigate('/booking'); }}>Book Now</button></div>
          <div className="af-features">
            <div className="af-feature">
              <div className="af-ico">✈️</div>
              <div className="af-label">Express Delivery</div>
              <div className="af-note">Fast air transport for urgent shipments.</div>
            </div>
            <div className="af-feature">
              <div className="af-ico">🌍</div>
              <div className="af-label">Worldwide Network</div>
              <div className="af-note">Global coverage with trusted partners.</div>
            </div>
            <div className="af-feature">
              <div className="af-ico">📦</div>
              <div className="af-label">Real-Time Tracking</div>
              <div className="af-note">24/7 monitoring with instant updates.</div>
            </div>
          </div>
          <Link className="af-cta" to="/air-freight">Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default Airfreight;
