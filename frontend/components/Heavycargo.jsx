import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Heavycargo.css';
import headerImg from '../src/assets/heavycargo.jpg';

const Heavycargo = ({ open, onClose }) => {
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
    setTimeout(() => { setIsClosing(false); onClose && onClose(); }, 360);
  }, [isClosing, onClose]);

  if (!open) return null;

  const onBackdrop = (e) => {
    if (e.target.classList.contains('hc-overlay')) handleClose();
  };

  return (
    <div className={`hc-overlay ${isClosing ? 'closing' : ''}`} onMouseDown={onBackdrop}>
      <div className={`hc-modal ${isClosing ? 'closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="hc-title">
        <button className="hc-close" aria-label="Close" onClick={handleClose}>×</button>

        {/* Header with background image and overlay */}
        <div className="hc-header" style={{ backgroundImage: `url(${headerImg})` }}>
          <div className="hc-head__content">
            <h2 id="hc-title" className="hc-title">Heavy Cargo Transport</h2>
            <p className="hc-sub">
              Experience unparalleled reliability in heavy cargo logistics. Our specialized fleet and expert team ensure your oversized
              freight reaches its destination safely and on time, anywhere in the world.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="hc-body">
          <div className="hc-book"><button type="button" className="book-now" aria-label="Book Heavy Cargo" onClick={()=>{ onClose?.(); navigate('/booking'); }}>Book Now</button></div>
          <div className="hc-features">
            <div className="hc-feature">
              <div className="hc-f-ico">💪</div>
              <div>
                <div className="hc-f-title">Heavy Load Expertise</div>
                <div className="hc-f-desc">Specialized handling for oversized freight.</div>
              </div>
            </div>
            <div className="hc-feature">
              <div className="hc-f-ico">🌎</div>
              <div>
                <div className="hc-f-title">Global Reach</div>
                <div className="hc-f-desc">Worldwide coverage through our partners.</div>
              </div>
            </div>
            <div className="hc-feature">
              <div className="hc-f-ico">🚛</div>
              <div>
                <div className="hc-f-title">Safe & Efficient Delivery</div>
                <div className="hc-f-desc">Secure transport with real-time visibility.</div>
              </div>
            </div>
          </div>

          <div className="hc-actions">
            <Link className="hc-btn ghost" to="/heavy-cargo">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heavycargo;
    