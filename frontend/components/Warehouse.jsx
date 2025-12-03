import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './Warehouse.css';
import warehouseImg from '../src/assets/wearhosuing.jpg';

const Warehouse = ({ open = true, onClose }) => {
  const navigate = useNavigate();
  if (!open) return null;
  return createPortal(
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-labelledby="warehouse-title">
      <div className="popup-blur" aria-hidden="true" />
      <div className="popup-container">
        <button className="close-btn" aria-label="Close" onClick={onClose}>×</button>

        <div className="popup-header">
          <img src={warehouseImg} alt="Warehousing" className="popup-image" />
          <button className="popup-back" onClick={onClose} aria-label="Back to Services">
            <span className="popup-back-arrow" aria-hidden="true">←</span>
            Back to Services
          </button>
        </div>

        <div className="popup-content">
          <h2 id="warehouse-title">Warehousing Services</h2>
          <p>
            Our warehousing solutions provide modern, secure, and efficient storage facilities. From advanced tracking systems to
            climate-controlled spaces, we ensure every item is managed with precision.
          </p>
          <div className="w-book"><button type="button" className="book-now" aria-label="Book Warehousing" onClick={()=>{ onClose?.(); navigate('/booking'); }}>Book Now</button></div>

          <div className="popup-features premium w-features">
            <div className="w-feature-card">
              <span className="w-ico shield" aria-hidden="true" />
              <div className="w-txt">
                <div className="t">24/7 Security</div>
                <div className="d">Round-the-clock protection.</div>
              </div>
            </div>
            <div className="w-feature-card">
              <span className="w-ico inventory" aria-hidden="true" />
              <div className="w-txt">
                <div className="t">Smart Inventory Tracking</div>
                <div className="d">Real-time monitoring.</div>
              </div>
            </div>
            <div className="w-feature-card">
              <span className="w-ico climate" aria-hidden="true" />
              <div className="w-txt">
                <div className="t">Climate Controlled</div>
                <div className="d">Optimal storage conditions.</div>
              </div>
            </div>
            <div className="w-feature-card">
              <span className="w-ico distribution" aria-hidden="true" />
              <div className="w-txt">
                <div className="t">Quick Distribution</div>
                <div className="d">Fast and efficient delivery.</div>
              </div>
            </div>
          </div>

          <div className="popup-cta">
            <button type="button" className="learn-btn" aria-label="Learn more about Warehousing Services" onClick={() => { onClose?.(); navigate('/warehouse-details'); }}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Warehouse;
