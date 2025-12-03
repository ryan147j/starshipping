import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import './Customs.css';
import customsImg from '../src/assets/customs.jpg';

const Customs = ({ open = true, onClose }) => {
  const navigate = useNavigate();
  if (!open) return null;
  return createPortal(
    <div className="customs-overlay" role="dialog" aria-modal="true" aria-labelledby="customs-title">
      <div className="blur" aria-hidden="true" />

      <div className="customs-modal">
        <div className="customs-head">
          <button className="customs-close" aria-label="Close" onClick={onClose}>×</button>
          <img src={customsImg} alt="Customs inspection" className="customs-img" />
          <button className="customs-back" onClick={onClose}>← Back to Services</button>
        </div>

        <div className="customs-body">
          <h2 id="customs-title">Customs Clearance Services</h2>
          <p className="desc">
            Navigate international trade regulations with confidence. Our expert customs clearance services ensure your shipments move
            smoothly through borders with full compliance, accurate documentation, and minimal delays.
          </p>
          <div className="customs-book"><button type="button" className="book-now" aria-label="Book Customs Clearance" onClick={()=>{ onClose?.(); navigate('/booking'); }}>Book Now</button></div>

          <div className="customs-list">
            <div className="customs-item">
              <div className="customs-ico doc" aria-hidden="true">📄</div>
              <div>
                <div className="t">Import & Export Documentation</div>
              </div>
            </div>
            <div className="customs-item">
              <div className="customs-ico tax" aria-hidden="true">💰</div>
              <div>
                <div className="t">Duty & Tax Calculation</div>
              </div>
            </div>
            <div className="customs-item">
              <div className="customs-ico comp" aria-hidden="true">🛡️</div>
              <div>
                <div className="t">Customs Compliance Assistance</div>
              </div>
            </div>
            <div className="customs-item">
              <div className="customs-ico ff" aria-hidden="true">🚚</div>
              <div>
                <div className="t">Freight Forwarding Coordination</div>
              </div>
            </div>
            <div className="customs-item">
              <div className="customs-ico track" aria-hidden="true">📍</div>
              <div>
                <div className="t">Real-time Clearance Tracking</div>
              </div>
            </div>
          </div>

          <div className="customs-cta">
            <button className="back" onClick={() => { onClose?.(); navigate('/customs-clearance'); }}>Learn More</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Customs;
