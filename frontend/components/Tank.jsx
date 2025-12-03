import React from 'react'
import './Tank.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import heroImg from '../src/assets/tankcontainer.png'

const Tank = () => {
  const navigate = useNavigate()

  return (
    <div className="tk-page">
      <Header transparentOnTop={false} active="services" />

      {/* Hero */}
      <section className="tk-hero">
        <div className="container">
          <div className="tk-hero__grid">
            <div>
              <h1 className="tk-title">Tank Container</h1>
              <p className="tk-tag">Specialized ISO tank containers designed for safe and efficient transport of liquids, chemicals, and gases. Built to the highest safety standards with advanced containment systems and pressure management capabilities.</p>
              <div className="tk-actions">
                <button className="btn btn-primary" onClick={()=> navigate('/contact?subject=shipping-quote')}>Request Quote</button>
                <button className="btn btn-outline" onClick={()=> window.open('#','_blank')}>Learn More</button>
              </div>
            </div>
            <div className="img">
              <img src={heroImg} alt="Tank container" />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Technical Specifications */}
        <section className="tk-specs">
          <h2 className="section-title">Technical Specifications</h2>
          <p className="section-sub">Critical specifications for ISO tank containers</p>
          <div className="tk-specs grid">
            {/* Dimensions & Capacity */}
            <div className="tk-card">
              <div className="hdr"><div className="ico b-blue">📏</div><div className="t">Dimensions & Capacity</div></div>
              <div className="kv-row"><div className="k">External Length</div><div className="v">6.06 m (19’10”)</div></div>
              <div className="kv-row"><div className="k">External Width</div><div className="v">2.44 m (8’0”)</div></div>
              <div className="kv-row"><div className="k">External Height</div><div className="v">2.59 m (8’6”)</div></div>
              <div className="kv-row"><div className="k">Tank Capacity</div><div className="v">21,000 – 26,000 L</div></div>
              <div className="kv-row"><div className="k">Tare Weight</div><div className="v">3,200 – 4,500 kg</div></div>
              <div className="kv-row"><div className="k">Max Gross Weight</div><div className="v">30,480 kg</div></div>
            </div>
            {/* Technical Features */}
            <div className="tk-card">
              <div className="hdr"><div className="ico b-green">⚙️</div><div className="t">Technical Features</div></div>
              <div className="kv-row"><div className="k">Material</div><div className="v">Stainless Steel 316L</div></div>
              <div className="kv-row"><div className="k">Tank Type</div><div className="v">ISO T11 / T14</div></div>
              <div className="kv-row"><div className="k">Pressure Rating</div><div className="v">2.65 bar / 6 bar</div></div>
              <div className="kv-row"><div className="k">Temperature Range</div><div className="v">-40°C to +130°C</div></div>
              <div className="kv-row"><div className="k">Insulation</div><div className="v">Optional Polyurethane</div></div>
              <div className="kv-row"><div className="k">Safety Valves</div><div className="v">Pressure Relief System</div></div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="tk-features">
          <h2 className="section-title">Key Features</h2>
          <p className="section-sub">Advanced engineering that ensures safety and performance</p>
          <div className="grid">
            {[
              ['🛡️','Safety Compliance','ISO standard compliance for intermodal transport'],
              ['🧱','Stackable Design','Strong frame with corner castings'],
              ['🌡️','Temperature Control','Optional insulation/heating for sensitive cargo'],
              ['🔧','Advanced Valving','Safety valves, pressure relief, secure manholes'],
              ['⬆️','Easy Loading','Efficient loading/unloading ports'],
              ['🧪','Chemical Resistant','Safe transport of liquids, chemicals, hazardous materials'],
            ].map(([ico,t,d]) => (
              <div className="tk-feature" key={t}>
                <div className="ico" aria-hidden>{ico}</div>
                <div className="t">{t}</div>
                <div className="d">{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="tk-apps">
          <h2 className="section-title">Applications</h2>
          <p className="section-sub">Versatile solutions across chemical and food industries</p>
          <div className="tk-apps grid">
            {[
              ['Chemicals & Industrial Liquids',['Solvents','Acids','Bases']],
              ['Food-Grade Liquids',['Oils','Alcohols','Juices']],
              ['Fuels & Gases',['Light fuels','LPG (where permitted)']],
              ['ISO Compliance Transport',['Intermodal','Sea/Rail/Road']],
            ].map(([t,items]) => (
              <div className="tk-app" key={t}>
                <div className="t" style={{fontWeight:800, marginBottom:6}}>{t}</div>
                <ul style={{margin:0, padding:'0 0 0 18px'}}>
                  {items.map(it => (<li key={it}>{it}</li>))}
                </ul>
              </div>
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

export default Tank

