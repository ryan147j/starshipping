import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Roadtransport.css';
import headerImg from '../src/assets/roadtransport.jpg';

const Roadtransport = ({ open, onClose }) => {
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
    if (e.target.classList.contains('rt-overlay')) handleClose();
  };

  return (
    <div className={`rt-overlay ${isClosing ? 'closing' : ''}`} onMouseDown={onBackdrop}>
      <div className={`rt-modal ${isClosing ? 'closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="rt-title">
        <button className="rt-close" aria-label="Close" onClick={handleClose}>×</button>
        <div className="rt-header" style={{ backgroundImage: `url(${headerImg})` }} />
        <div className="rt-content">
          <h2 id="rt-title" className="rt-title">Road Transport Services</h2>
          <p className="rt-subtitle">Reliable and cost-effective ground logistics.</p>
          <p className="rt-desc">
            Our Road Transport services offer flexible and efficient logistics solutions across all distances. We combine modern
            trucks, expert drivers, and real-time tracking to ensure safe, punctual, and cost-effective deliveries.
          </p>
          <div className="rt-book"><button type="button" className="book-now" aria-label="Book Road Transport" onClick={()=>{ onClose?.(); navigate('/booking'); }}>Book Now</button></div>
          <div className="rt-features">
            <div className="rt-feature">
              <div className="rt-ico">🔗</div>
              <div className="rt-label">Flexible Routes</div>
              <div className="rt-note">Tailored road routes to meet unique delivery needs.</div>
            </div>
            <div className="rt-feature">
              <div className="rt-ico">🌐</div>
              <div className="rt-label">Cross-Border Expertise</div>
              <div className="rt-note">Seamless compliance and international transport.</div>
            </div>
            <div className="rt-feature">
              <div className="rt-ico">🛡️</div>
              <div className="rt-label">Cargo Protection</div>
              <div className="rt-note">Real-time monitoring and secure transport.</div>
            </div>
          </div>
          <Link className="rt-banner" to="/road-transport"><span className="truck">🚚</span> Trusted by 500+ businesses for ground logistics.</Link>
        </div>
      </div>
    </div>
  );
};

export default Roadtransport;
