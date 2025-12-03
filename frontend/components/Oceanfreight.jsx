import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Oceanfreight.css';
import oceanHero from '../src/assets/oceanfreight.jpg';

const Oceanfreight = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    // wait for exit animation, then actually close
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 350);
  }, [isClosing, onClose]);

  if (!open) return null;

  const onBackdrop = (e) => {
    if (e.target.classList.contains('ofr-overlay')) handleClose();
  };

  return (
    <div className={`ofr-overlay ${isClosing ? 'closing' : ''}`} onMouseDown={onBackdrop}>
      <div className={`ofr-modal ${isClosing ? 'closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="ofr-title">
        <button className="ofr-close" aria-label="Close" onClick={handleClose}>×</button>
        <div className="ofr-header" style={{ backgroundImage: `url(${oceanHero})` }} />
        <div className="ofr-content">
          <h2 id="ofr-title" className="ofr-title">Ocean Freight</h2>
          <p className="ofr-desc">
            Efficient, cost-effective global ocean freight solutions with reliable scheduling and real-time tracking.
            From port to port, we ensure your cargo arrives safely and on time.
          </p>
          <div className="ofr-book"><button type="button" className="book-now" aria-label="Book Ocean Freight" onClick={()=>{ onClose?.(); navigate('/booking'); }}>Book Now</button></div>
          <div className="ofr-features">
            <div className="ofr-feature">
              <div className="ofr-ico">🌊</div>
              <div className="ofr-label">Worldwide Routes</div>
            </div>
            <div className="ofr-feature">
              <div className="ofr-ico">🕒</div>
              <div className="ofr-label">On-time Delivery</div>
            </div>
            <div className="ofr-feature">
              <div className="ofr-ico">📦</div>
              <div className="ofr-label">Secure Container Handling</div>
            </div>
          </div>
          <Link className="ofr-cta" to="/ocean-freight">Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default Oceanfreight;
