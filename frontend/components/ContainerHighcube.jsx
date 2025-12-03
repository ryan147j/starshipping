import React from 'react'
import './ContainerHighcube.css'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import heroImg from '../src/assets/highcube.png'

const ContainerHighcube = () => {
  const navigate = useNavigate()

  return (
    <div className="hc-page">
      <Header transparentOnTop={false} active="services" />

      

      {/* Hero */}
      <section className="hc-hero">
        <div className="container">
          <div className="hc-hero__grid">
            <div>
              <div style={{color:'#2563eb',fontWeight:800,marginBottom:6}}>Containers</div>
              <h1 className="hc-title">High Cube Container</h1>
              <p className="hc-tag">Extra height for maximum cargo capacity. Perfect for oversized shipments and specialized logistics needs.</p>

              <div className="hc-pills">
                {[{ico:'📦',t:'40 ft',d:'Standard Length'},{ico:'📏',t:"9'6\"",d:'Extra Height'},{ico:'⚖️',t:'26,580 kg',d:'Max Payload'},{ico:'🧾',t:'76.3 m³',d:'Volume Capacity'}].map((p,i)=> (
                  <div key={i} className="hc-pill"><div className="ico" aria-hidden>{p.ico}</div><div><div style={{fontWeight:800}}>{p.t}</div><div style={{color:'#64748b'}}>{p.d}</div></div></div>
                ))}
              </div>

              <div className="hc-actions">
                <button className="btn btn-primary" onClick={()=> navigate('/contact?subject=shipping-quote')}>Request Quote</button>
                <button className="btn btn-outline" onClick={()=> window.open('#','_blank')}>Download Specs</button>
              </div>
            </div>

            <div className="hc-img">
              <img src={heroImg} alt="High Cube container" />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Technical Specifications */}
        <section id="specs" className="hc-specs">
          <h2 className="section-title center">Technical Specifications</h2>
          <p className="section-sub center">Detailed dimensions and capacity information</p>

          <div className="hc-grid">
            <div className="hc-card">
              <div className="hd">📐 <span>Dimensions</span></div>
              <ul className="hc-list">
                <li>External (L × W × H): 12.192 × 2.438 × 2.896 m (40' × 8' × 9'6")</li>
                <li>Internal (L × W × H): 12.032 × 2.350 × 2.695 m (39'5" × 7'8" × 8'10")</li>
                <li>Door opening (W × H): 2.340 × 2.585 m (7'8" × 8'6")</li>
                <li>Volume Capacity: 76.3 m³ (≈ 2,695 ft³)</li>
              </ul>
            </div>

            <div className="hc-card">
              <div className="hd">🧮 <span>Weight & Capacity</span></div>
              <ul className="hc-list">
                <li>Max Gross Weight: 30,480 kg (67,200 lb)</li>
                <li>Tare Weight: 3,900–4,200 kg (8,600–9,300 lb)</li>
                <li>Max Payload: 26,580 kg (58,600 lb)</li>
                <li>Stacking: up to 8 high (standard)</li>
              </ul>
            </div>

            <div className="hc-card">
              <div className="hd">🏗️ <span>Construction & Material</span></div>
              <ul className="hc-list">
                <li>Corten Steel (weathering steel)</li>
                <li>Anti-Corrosion Coating</li>
                <li>Double Door System</li>
                <li>Stacking Capability</li>
              </ul>
            </div>

            <div className="hc-card">
              <div className="hd">✅ <span>Standards & Certification</span></div>
              <ul className="hc-list">
                <li>ISO 668 Compliant</li>
                <li>CSC Safety Approved</li>
                <li>IICL Certified</li>
                <li>Meets Maritime Standards</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Features & Highlights */}
        <section id="features" className="hc-features">
          <div className="hc-features__wrap">
            <h2 className="section-title center">Key Features & Highlights</h2>
            <p className="section-sub center">Advanced features for optimal performance and security</p>

            <div className="grid">
            {[
              {ico:'🌬️',t:'Advanced Ventilation',pts:['Improved airflow','Reduced condensation']},
              {ico:'🔐',t:'Multi-Lock Security',pts:['High-strength bars','Tamper-resistant seals']},
              {ico:'🌧️',t:'Weatherproofing',pts:['Sealed doors','Marine-grade paint']},
              {ico:'🪵',t:'Reinforced Flooring',pts:['Cross-member support','Heavy-duty floorboards']},
              {ico:'🧴',t:'Corner Castings',pts:['ISO-standard corners','Lifting and securement']},
              {ico:'🧊',t:'Insulation Options',pts:['Optional kits','Temperature stability']},
            ].map((f,i)=> (
              <div key={i} className="hc-feature">
                <div className="hd"><span>{f.ico}</span><span>{f.t}</span></div>
                <ul className="hc-list" style={{marginTop:4}}>
                  {f.pts.map(p=> (<li key={p}>{p}</li>))}
                </ul>
              </div>
            ))}
            </div>
          </div>
        </section>

        {/* Handling & Logistics */}
        <section id="logistics" className="hc-handling">
          <h2 className="section-title center">Handling & Logistics</h2>
          <p className="section-sub center">Best practices for a safe and efficient container experience</p>

          <div className="grid single">
            <div className="panel">
              <div className="hd">🛠️ Handling Methods</div>
              <ul className="hc-list">
                <li><strong>Crane Lifting</strong> — Use top corner castings for safe overhead lifting (Minimum 40-ton capacity required)</li>
                <li><strong>Forklift Operations</strong> — Bottom fork pockets for ground-level handling (Minimum 8-ton capacity recommended)</li>
                <li><strong>Reach Stacker</strong> — Ideal for port and terminal operations (Top pick attachment recommended)</li>
              </ul>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__bottom" style={{padding:'1.2rem 0'}}>
            <p>© 2025 StarShipping. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ContainerHighcube

