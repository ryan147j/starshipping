import React from 'react'
import './OPentop.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import heroImg from '../src/assets/opentopy.png'

const OPentop = () => {
  const navigate = useNavigate()

  return (
    <div className="ot-page">
      <Header transparentOnTop={false} active="services" />

      {/* Hero */}
      <section className="ot-hero">
        <div className="container">
          <div className="ot-hero__grid">
            <div>
              <h1 className="ot-title">Open Top Shipping Container</h1>
              <p className="ot-tag">Versatile container with a removable top for effortless loading of oversized or tall cargo.</p>
              <div className="ot-actions">
                <button className="btn btn-primary" onClick={()=> navigate('/contact?subject=shipping-quote')}>Request Quote</button>
                <button className="btn btn-outline" onClick={()=> window.open('#', '_blank')}>Download Specs</button>
              </div>
            </div>
            <div className="img">
              <img src={heroImg} alt="Open Top container" />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Technical Specifications */}
        <section className="ot-specs">
          <h2 className="section-title">Technical Specifications</h2>
          <p className="section-sub">Detailed dimensions and capacity information</p>
          <div className="ot-specs grid">
            {/* External Dimensions */}
            <div className="ot-card">
              <div className="hdr"><div className="ico b-blue">📏</div><div className="t">External Dimensions</div></div>
              <div className="kv-row"><div className="k">Length</div><div className="v">40' / 12.06 m</div></div>
              <div className="kv-row"><div className="k">Width</div><div className="v">8' / 2.44 m</div></div>
              <div className="kv-row"><div className="k">Height</div><div className="v">8'6" / 2.59 m</div></div>
            </div>
            {/* Internal Dimensions */}
            <div className="ot-card">
              <div className="hdr"><div className="ico b-green">🧭</div><div className="t">Internal Dimensions</div></div>
              <div className="kv-row"><div className="k">Length</div><div className="v">39'4" / 11.98 m</div></div>
              <div className="kv-row"><div className="k">Width</div><div className="v">7'8" / 2.35 m</div></div>
              <div className="kv-row"><div className="k">Height</div><div className="v">7'8" / 2.35 m</div></div>
            </div>
            {/* Door Opening */}
            <div className="ot-card">
              <div className="hdr"><div className="ico b-purple">🚪</div><div className="t">Door Opening</div></div>
              <div className="kv-row"><div className="k">Width</div><div className="v">7'8" / 2.34 m</div></div>
              <div className="kv-row"><div className="k">Height</div><div className="v">7'6" / 2.28 m</div></div>
            </div>
            {/* Weight Capacity */}
            <div className="ot-card">
              <div className="hdr"><div className="ico b-orange">⚖️</div><div className="t">Weight Capacity</div></div>
              <div className="kv-row"><div className="k">Tare Weight</div><div className="v">~3,900 kg</div></div>
              <div className="kv-row"><div className="k">Max Gross Weight</div><div className="v">30,480 kg</div></div>
              <div className="kv-row"><div className="k">Payload Capacity</div><div className="v">~26,500 kg</div></div>
            </div>
            {/* Material & Roof Type */}
            <div className="ot-card">
              <div className="hdr"><div className="ico b-red">🧱</div><div className="t">Material & Roof Type</div></div>
              <div className="kv-row"><div className="k">Construction</div><div className="v">Corten Steel</div></div>
              <div className="kv-row"><div className="k">Roof Type</div><div className="v">Removable Tarpaulin</div></div>
            </div>
            {/* Stacking Capacity */}
            <div className="ot-card">
              <div className="hdr"><div className="ico b-sky">🧱</div><div className="t">Stacking Capacity</div></div>
              <div className="kv-row"><div className="k">Maximum Stack</div><div className="v">7 High (Loaded)</div></div>
            </div>
          </div>
        </section>

        {/* Key Features & Benefits */}
        <section className="ot-features">
          <h2 className="section-title">Key Features & Benefits</h2>
          <p className="section-sub">Designed for versatility and efficiency in handling oversized cargo</p>
          <div className="grid">
            {[
              ['p-blue','⬆️','Open Roof Access','Easy top loading and unloading for oversized cargo that cannot fit through standard doors'],
              ['p-green','🛡️','Flexible Protection','Removable tarpaulin or hard roof options provide weather protection and cargo security'],
              ['p-purple','🎛️','Oversized Cargo','Ideal for tall machinery, construction materials, logs, pipes, and industrial equipment'],
              ['p-orange','⠿','Structural Strength','Reinforced steel corner posts ensure structural integrity for heavy and bulky loads'],
              ['p-red','🌧️','Weather Protection','Heavy-duty tarpaulin cover provides excellent protection against rain and environmental elements'],
              ['p-sky','⚙️','Versatile Loading','Multiple loading options including crane, forklift, or overhead loading equipment']
            ].map(([cls,ico,t,d]) => (
              <div className={`ot-feature ${cls}`} key={t}>
                <div className="ico" aria-hidden>{ico}</div>
                <div className="t">{t}</div>
                <div className="d">{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Use Cases */}
        <section className="ot-use">
          <h2 className="section-title">Common Use Cases</h2>
          <p className="section-sub">Where Open Top containers deliver the best operational advantages.</p>
          <div className="ot-use grid">
            <div className="card">
              <div className="hd">Construction Materials</div>
              <ul className="ot-list">
                <li>Steel beams, rebar, and timber</li>
                <li>Bulk materials requiring crane loading</li>
              </ul>
            </div>
            <div className="card">
              <div className="hd">Heavy Machinery</div>
              <ul className="ot-list">
                <li>Excavators, loaders, and track equipment</li>
                <li>Top-loaded via crane for safe placement</li>
              </ul>
            </div>
            <div className="card">
              <div className="hd">Industrial Equipment</div>
              <ul className="ot-list">
                <li>Large tanks, transformers, and modules</li>
                <li>Height-restricted or non-standard cargo</li>
              </ul>
            </div>
            <div className="card">
              <div className="hd">Bulk Cargo Top Access</div>
              <ul className="ot-list">
                <li>Scrap, waste, and recyclables</li>
                <li>Aggregates and other bulk goods</li>
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

export default OPentop

