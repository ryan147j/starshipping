import React from 'react'
import './Insulated.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import heroImg from '../src/assets/insualted.png'

const Insulated = () => {
  const navigate = useNavigate()

  return (
    <div className="in-page">
      <Header transparentOnTop={false} active="services" />

      {/* Hero */}
      <section className="in-hero">
        <div className="container">
          <div className="in-hero__grid">
            <div>
              <h1 className="in-title">Insulated Container</h1>
              <div className="in-tag">Reliable temperature control for temperature-sensitive goods without active refrigeration.</div>
              <p style={{color:'#475569',margin:'8px 0 12px'}}>Insulated containers are designed to maintain a stable internal temperature, protecting goods such as food, beverages, chemicals, and pharmaceuticals from extreme external heat or cold. Ideal for medium-distance transport where constant cooling or heating isn’t required.</p>
              <div className="in-actions">
                <button className="btn btn-primary" onClick={()=> navigate('/contact?subject=shipping-quote')}>Request Quote</button>
                <button className="btn btn-outline" onClick={()=> window.open('#','_blank')}>Download Specs</button>
              </div>
            </div>
            <div className="img">
              <img src={heroImg} alt="Insulated container" />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Technical Specifications */}
        <section className="in-specs">
          <h2 className="section-title">Technical Specifications</h2>
          <p className="section-sub">Detailed specifications for our 20ft insulated containers.</p>
          <div className="in-specs grid">
            <div className="in-card">
              <div className="hdr"><div className="ico">📏</div><div className="t">Dimensions & Weight</div></div>
              <div className="kv-row"><div className="k">External (L × W × H)</div><div className="v">6.058m × 2.438m × 2.591m</div></div>
              <div className="kv-row"><div className="k">Internal (L × W × H)</div><div className="v">5.698m × 2.270m × 2.260m</div></div>
              <div className="kv-row"><div className="k">Tare Weight</div><div className="v">2,950 kg</div></div>
              <div className="kv-row"><div className="k">Max Cargo Weight</div><div className="v">28,530 kg</div></div>
              <div className="kv-row"><div className="k">Max Gross Weight</div><div className="v">30,480 kg</div></div>
            </div>
            <div className="in-card">
              <div className="hdr"><div className="ico">🧪</div><div className="t">Materials & Performance</div></div>
              <div className="kv-row"><div className="k">Material</div><div className="v">Stainless steel inner walls</div></div>
              <div className="kv-row"><div className="k">Outer Shell</div><div className="v">Aluminum construction</div></div>
              <div className="kv-row"><div className="k">Insulation Type</div><div className="v">Polyurethane foam</div></div>
              <div className="kv-row"><div className="k">Insulation Thickness</div><div className="v">75 mm</div></div>
              <div className="kv-row"><div className="k">Thermal Efficiency</div><div className="v">±5°C for up to 20 days</div></div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="in-features">
          <h2 className="section-title">Key Features</h2>
          <p className="section-sub">Why choose our insulated containers.</p>
          <div className="grid">
            {[
              ['🌡️','Temperature Control','Maintains consistent internal temperature without active cooling systems.'],
              ['📦','Versatile Cargo','Suitable for food, beverages, chemicals, pharmaceuticals, and electronics.'],
              ['💧','Moisture Protection','Prevents condensation and humidity damage to sensitive goods.'],
              ['🧰','Easy Maintenance','Corrosion-resistant materials and easy-to-clean inner surfaces.'],
              ['✅','ISO Standards','Built to ISO standards for intermodal transport compatibility.'],
              ['🧱','Stackable Design','Available in 20ft and 40ft models with stackable configurations.'],
            ].map(([ico,t,d]) => (
              <div className="in-feature" key={t}>
                <div className="ico" aria-hidden>{ico}</div>
                <div className="t">{t}</div>
                <div className="d">{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="in-apps">
          <h2 className="section-title">Applications</h2>
          <p className="section-sub">Industries that rely on our insulated containers.</p>
          <div className="in-apps grid">
            {[
              ['Food & Beverage',['Milk, wine, chocolate, juice','Perishable goods transport']],
              ['Pharmaceuticals',['Temperature-sensitive medications','Medical supplies']],
              ['Electronics',['Sensitive components','Precision instruments']],
              ['Chemicals',['Laboratory supplies','Temperature‑sensitive chemicals']],
            ].map(([t,items])=> (
              <div className="in-app" key={t}>
                <div className="t" style={{fontWeight:800, marginBottom:6}}>{t}</div>
                <ul style={{margin:0, padding:'0 0 0 18px'}}>
                  {items.map(it => (<li key={it}>{it}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Compare Insulated vs Reefer */}
        <section className="in-compare">
          <h2 className="section-title">Insulated vs Reefer Containers</h2>
          <p className="section-sub">Choose the right container for your needs.</p>
          <div style={{overflowX:'auto'}}>
            <table className="in-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Insulated Container</th>
                  <th>Reefer Container</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Active Cooling</td><td>❌ No</td><td>✅ Yes</td></tr>
                <tr><td>Temperature Stability</td><td>±5°C</td><td>Precise control</td></tr>
                <tr><td>Energy Usage</td><td>None</td><td>High</td></tr>
                <tr><td>Cost</td><td>Lower</td><td>Higher</td></tr>
                <tr><td>Duration</td><td>Medium-term</td><td>Long-term</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="in-cta">
          <div className="wrap">
            <div>
              <div className="big">Need a reliable temperature-controlled shipping solution?</div>
              <div className="small">Get a custom quote for your insulated container requirements today.</div>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button className="btn btn-primary" onClick={()=> navigate('/contact?subject=shipping-quote')}>Request a Quote</button>
              <button className="btn btn-outline" onClick={()=> navigate('/contact')}>Contact Us</button>
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

export default Insulated

