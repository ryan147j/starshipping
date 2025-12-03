import React from 'react'
import './Flatrack.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import heroImg from '../src/assets/flatrack.jpg'
import heroImg2 from '../src/assets/flatrack2.jpg'

const Flatrack = () => {
  const navigate = useNavigate()

  return (
    <div className="fr-page">
      <Header transparentOnTop={false} active="services" />

      {/* Hero */}
      <section className="fr-hero">
        <div className="container">
          <div className="fr-hero__grid">
            <div>
              <h1 className="fr-title">Flat Rack Container</h1>
              <p className="fr-tag">Open-frame design for oversized and heavy cargo requiring maximum flexibility.</p>

              <div className="fr-pills" aria-label="Quick specs">
                {[
                  ['📏','Length','20ft / 40ft'],
                  ['↔️','External Width','2.44 m'],
                  ['↕️','Height','2.59 m'],
                  ['⚖️','Max Payload','40,000 kg'],
                  ['🪶','Tare Weight','5,200 kg'],
                  ['📦','Volume Capacity','62.0 m³'],
                ].map(([ico,t,d]) => (
                  <div className="fr-pill" key={t}>
                    <div className="ico" aria-hidden>{ico}</div>
                    <div>
                      <div style={{fontWeight:800}}>{t}</div>
                      <div style={{opacity:.9}}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="fr-actions">
                <button className="btn btn-primary" onClick={()=> navigate('/contact?subject=shipping-quote')}>Request Quote</button>
                <button className="btn btn-outline" onClick={()=> window.open('#','_blank')}>Download Specs</button>
              </div>
            </div>

            <div className="fr-img">
              <img src={heroImg} alt="Flat Rack container" />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Technical Specifications */}
        <section className="fr-specs">
          <h2 className="section-title">Technical Specifications</h2>
          <p className="section-sub">Detailed measurements, capacity, and standards compliance.</p>
          <div className="fr-specs grid">
            <div className="fr-card">
              <div className="hd">Dimensions</div>
              <ul className="fr-list">
                <li><strong>External (L × W × H):</strong> 12.192 × 2.438 × 2.591 m (40’ × 8’ × 8’6”)</li>
                <li><strong>Internal (L × W × H):</strong> 11.650 × 2.286 × 2.265 m</li>
                <li><strong>Door Opening:</strong> N/A (open ends)</li>
                <li><strong>Floor Height:</strong> 0.6 m</li>
              </ul>
            </div>
            <div className="fr-card">
              <div className="hd">Weight & Capacity</div>
              <ul className="fr-list">
                <li><strong>Max Gross Weight:</strong> 45,000 kg</li>
                <li><strong>Tare Weight:</strong> 5,200 kg</li>
                <li><strong>Max Payload:</strong> 39,800 kg</li>
                <li><strong>Stackable:</strong> up to 8 high</li>
              </ul>
            </div>

            <div className="fr-card">
              <div className="hd">Construction & Material</div>
              <ul className="fr-list">
                <li>Corten steel frame</li>
                <li>Timber or steel floor</li>
                <li>Collapsible/fixed end walls</li>
                <li>Anti‑corrosion coating</li>
              </ul>
            </div>
            <div className="fr-card">
              <div className="hd">Standards & Certification</div>
              <ul className="fr-list">
                <li>ISO 668</li>
                <li>CSC Safety Approved</li>
                <li>IICL Certified</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Handling & Use Cases */}
        <section className="fr-handling">
          <h2 className="section-title">Handling & Use Cases</h2>
          <p className="section-sub">Built for over‑dimension cargo and heavy‑duty transport.</p>
          <div className="fr-handling grid">
            <div className="panel">
              <div className="hd">Handling Methods</div>
              <ul className="fr-list">
                <li><strong>Crane Lifting:</strong> Top corner castings for overhead operations.</li>
                <li><strong>Forklift Operations:</strong> Bottom fork pockets for ground handling (minimum 8‑ton capacity).</li>
                <li><strong>Reach Stacker:</strong> Suitable for port terminals and heavy cargo yards.</li>
              </ul>
            </div>
            <div className="panel imgpanel" aria-hidden="true">
              <img src={heroImg2} alt="Flat rack use case" />
            </div>
          </div>
        </section>

        {/* Key Features & Highlights */}
        <section className="fr-features">
          <h2 className="section-title">Key Features & Highlights</h2>
          <p className="section-sub">Advanced features for secure lashing and robust longevity.</p>
          <div className="grid">
            {[
              'Collapsible Ends for space-saving',
              'Reinforced Steel Base',
              'Lashing Rings for secure tie-downs',
              'Over-Width Cargo Compatibility',
              'Forklift & Crane Access',
              'ISO Certified Structure',
            ].map((t)=> (
              <div className="fr-feature" key={t}>{t}</div>
            ))}
          </div>
        </section>

        {/* Optional Add-ons & Customization */}
        <section className="fr-addons">
          <h2 className="section-title">Optional Add-ons & Customization</h2>
          <p className="section-sub">Tailor your Flat Rack to your cargo and route needs.</p>
          <div className="grid">
            {[
              'Custom Flooring (Timber or Steel)',
              'Removable Posts',
              'Branding & Color Customization',
              'Lashing Kits & Chains',
              'Protective Tarps',
              'Locking Mechanisms',
            ].map((t)=> (
              <div className="fr-addon" key={t}>{t}</div>
            ))}
          </div>
        </section>

        {/* Safety & Compliance */}
        <section className="fr-safety">
          <h2 className="section-title">Safety & Compliance</h2>
          <p className="section-sub">White cards with minimal icons and strict standards.</p>
          <div className="grid">
            {[
              'ISO 668 & CSC Certified',
              'Regular Inspection Schedule',
              'Meets IICL Standards',
              'Verified Structural Integrity',
            ].map((t)=> (
              <div className="fr-safe" key={t}>{t}</div>
            ))}
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

export default Flatrack

