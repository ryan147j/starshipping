import React from 'react';
import './Reefer.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import heroImg from '../src/assets/reefers.png';
import Footer from './Footer';

const Reefer = () => {
  const navigate = useNavigate();

  return (
    <div className="rf-page">
      <Header transparentOnTop={false} active="services" />

      {/* Hero full-width */}
      <section className="rf-hero">
        <div className="container">
          <div className="rf-hero__grid">
            <div>
              <h1 className="rf-title">Refrigerated (Reefer) Container</h1>
              <p className="rf-tag">Temperature-controlled container for perishable goods, pharmaceuticals, and sensitive cargo.</p>

              <div className="rf-pills">
                {[
                  { ico: '📏', t: 'Sizes', d: '20ft • 40ft' },
                  { ico: '⚖️', t: 'Max Load', d: '~28,000 kg' },
                  { ico: '📦', t: 'Volume', d: '28–67 m³' },
                  { ico: '🌡️', t: 'Temperature', d: '-30°C to +25°C' },
                  { ico: '🔩', t: 'Materials', d: 'Steel • Insulated' },
                  { ico: '❄️', t: 'Cooling', d: 'Built-in Unit' }
                ].map((p) => (
                  <div className="rf-pill" key={p.t}>
                    <div className="ico" aria-hidden>{p.ico}</div>
                    <div>
                      <div style={{ fontWeight: 800 }}>{p.t}</div>
                      <div style={{ opacity: .9 }}>{p.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rf-actions">
                <button className="btn btn-primary" onClick={()=> navigate('/contact?subject=shipping-quote')}>Request Quote</button>
                <button className="btn btn-outline" onClick={()=> window.open('#','_blank')}>Download Specs</button>
              </div>
            </div>

            <div className="rf-img">
              <img src={heroImg} alt="Reefer container" />
            </div>
          </div>
          {/* watermark mask */}
          <div className="rf-mask" aria-hidden="true" />
        </div>
      </section>

      <div className="container">
        {/* About */}
        <section className="rf-about">
          <h2 className="center" style={{margin:'0 0 12px', fontWeight:900}}>About Refrigerated Containers</h2>
          <div className="rf-cards">
            <div className="rf-card">
              <div style={{fontWeight:800, marginBottom:8}}>Purpose & Applications</div>
              <ul className="rf-list">
                <li>Food & beverages (meat, dairy, produce)</li>
                <li>Pharmaceuticals & vaccines</li>
                <li>Chemical products</li>
                <li>Flowers & plants</li>
              </ul>
            </div>
            <div className="rf-card blue">
              <div style={{fontWeight:800, marginBottom:8}}>Key Advantages</div>
              <ul className="rf-list">
                <li>Consistent temperature control</li>
                <li>Secure & insulated construction</li>
                <li>Energy efficient refrigeration</li>
                <li>Real-time monitoring</li>
              </ul>
            </div>
          </div>

          <div className="rf-monitor">
            <div className="note">
              <strong>Advanced Monitoring Systems:</strong> Many reefers support remote temperature, humidity, and CO₂ monitoring
              with alerts and data logging for complete cold-chain visibility.
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="rf-specs">
          <h3 className="center" style={{fontWeight:900, margin:'0 0 12px'}}>Specifications</h3>
          <div className="wrap">
            <table className="rf-table" role="table" aria-label="Reefer Specifications">
              <thead className="rf-thead">
                <tr>
                  <th scope="col">Specification</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody className="rf-tbody">
                {[
                  ['External Dimensions (L×W×H)', '20ft: 6.06 × 2.44 × 2.59 m • 40ft: 12.19 × 2.44 × 2.59 m'],
                  ['Internal Dimensions (L×W×H)', '20ft: 5.45 × 2.29 × 2.26 m • 40ft: 11.56 × 2.29 × 2.26 m'],
                  ['Door Opening (W×H)', '2.29 × 2.26 m'],
                  ['Max Gross Weight', '30,480 kg'],
                  ['Tare Weight', '20ft: ~3,100 kg • 40ft: ~4,800 kg'],
                  ['Payload Capacity', 'Up to ~28,000 kg (model dependent)'],
                  ['Volume', '20ft: ~28–29 m³ • 40ft: ~67 m³'],
                  ['Materials', 'Corten Steel / Aluminum, insulated panels'],
                  ['Floor Type', 'T-bar aluminum / marine-grade plywood (insulated)'],
                  ['Corner Castings', 'ISO standard, 8 corner fittings'],
                  ['Refrigeration Unit', 'Integrated cooling unit with variable setpoints'],
                  ['Temperature Range', '-30°C to +25°C (model dependent)'],
                  ['Monitoring & Controls', 'Digital controller, optional remote IoT monitoring'],
                  ['Power Supply', '230/400V, 3‑phase, 50/60Hz (regional variants)']
                ].map(([k,v]) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Features */}
        <section className="rf-features">
          <h3>Key Features</h3>
          <div className="rf-grid">
            {[
              ['p-blue','❄️','Temperature Control','Precise setpoints for cold-chain reliability.'],
              ['p-green','🧊','Insulated Walls','High-performance insulated panels.'],
              ['p-purple','⚡','Energy Efficient','Modern compressors reduce power usage.'],
              ['p-pink','🔒','Secure Locking','Robust doors and locking bars.'],
              ['p-orange','🌡️','Stable Range','Set and maintain target temperature.'],
              ['p-teal','🚨','Alert System','Threshold alerts and notifications.'],
              ['p-lime','🧰','Equipment Compatible','Works with standard handling gear.'],
              ['p-sky','📡','IoT Monitoring','Remote telemetry and logging.'],
            ].map(([cls,ico,t,d]) => (
              <div className={`rf-feat ${cls}`} key={t}>
                <div className="ico" aria-hidden>{ico}</div>
                <div className="t">{t}</div>
                <div className="d">{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Examples */}
        <section className="rf-usage">
          <h3 className="center" style={{fontWeight:900, margin:'0 0 12px'}}>Usage Examples</h3>
          <div className="rf-grid">
            {[
              ['Food Products',['Meat & seafood','Dairy & frozen','Fresh produce']],
              ['Pharmaceuticals',['Vaccines','Insulins','Clinical supplies']],
              ['Chemicals',['Temperature-sensitive','Stabilized materials','Lab reagents']],
              ['Flowers & Plants',['Cut flowers','Seedlings','Nursery stock']],
            ].map(([t,items]) => (
              <div className="rf-feat" key={t}>
                <div className="t" style={{marginBottom:6}}>{t}</div>
                <ul className="rf-list" style={{margin:0}}>
                  {items.map(it => (<li key={it}>{it}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Optional Add-ons & Upgrades */}
        <section className="rf-addons">
          <h3 className="center" style={{fontWeight:900, margin:'0 0 12px'}}>Optional Add-ons & Upgrades</h3>
          <div className="rf-grid">
            {[
              ['p-blue','🧊','Enhanced Insulation','Additional lining for extreme climates.'],
              ['p-sky','📡','Advanced IoT Tracking','Fleet-level visibility and analytics.'],
              ['p-green','🔌','Backup Power Supply','Redundant power for continuous cooling.']
            ].map(([cls,ico,t,d]) => (
              <div className={`rf-feat ${cls}`} key={t}>
                <div className="ico" aria-hidden>{ico}</div>
                <div className="t">{t}</div>
                <div className="d">{d}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Reefer;
