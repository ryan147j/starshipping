import React, { useEffect } from 'react';
import './StandardContainer.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import logoDark from '../src/assets/logostarshipping2.png';
import heroImg from '../src/assets/containerblue.jpg';

const StandardContainer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
    },{threshold:0.12});
    document.querySelectorAll('.sc-reveal').forEach(el=> io.observe(el));
    return ()=> io.disconnect();
  },[]);

  return (
    <div className="sc-page">
      <Header transparentOnTop={false} active="services" />

      {/* Breadcrumbs removed per request */}

      {/* Hero */}
      <section className="sc-hero sc-reveal">
        <div className="container sc-hero__grid">
          <div>
            <div className="sc-hero__title">Standard (Dry) Container</div>
            <div className="sc-hero__tag">General-purpose container for most cargo, weatherproof, stackable.</div>
            <div className="sc-hero__quick">
              {[{ico:'📏',t:'Sizes',d:'20ft • 40ft • 45ft'},{ico:'⚖️',t:'Max Load',d:'28,000 kg'},{ico:'📦',t:'Volume',d:'33 m³ / 67 m³'},{ico:'🔩',t:'Materials',d:'Steel • Aluminum'}].map((p)=> (
                <div className="sc-pill" key={p.t}>
                  <div className="ico" aria-hidden>{p.ico}</div>
                  <div>
                    <div style={{fontWeight:800}}>{p.t}</div>
                    <div style={{opacity:.9}}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sc-hero__image">
            <img src={heroImg} alt="Standard container" />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="sc-about">
        <div className="container">
          <h2>About Standard Containers</h2>
          <p>
            Standard (dry) containers are the most common unit used in containerized shipping, ideal for transporting a wide
            range of general cargo. Built from durable steel or aluminum, these units are fully enclosed and weatherproof to
            protect goods against the elements. Their ISO‑standardized dimensions make them compatible with global handling
            equipment and enable reliable stackability aboard vessels, trucks, and trains.
          </p>
        </div>
      </section>

      {/* Specs highlights */}
      <section className="sc-specs">
        <div className="container">
          <div className="sc-specs__cards">
            {[{ico:'2️⃣',t:'20ft Container',d:'Internal volume ~33 m³'},{ico:'4️⃣',t:'40ft Container',d:'Internal volume ~67 m³'},{ico:'➕',t:'45ft Container',d:'For additional length & capacity'}].map((s)=> (
              <div className="sc-spec sc-reveal" key={s.t}>
                <div className="ico" aria-hidden>{s.ico}</div>
                <div>
                  <div className="t">{s.t}</div>
                  <div className="d">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="sc-tech">
        <div className="container">
          <h3>Technical Specifications</h3>
          <div className="card sc-reveal">
            <table className="sc-table" role="table" aria-label="Technical Specifications">
              <thead className="sc-thead">
                <tr>
                  <th scope="col">Specification</th>
                  <th scope="col">20ft Container</th>
                  <th scope="col">40ft Container</th>
                  <th scope="col">45ft Container</th>
                </tr>
              </thead>
              <tbody className="sc-tbody">
                {[{ico:'📏',b:'External Dimensions (L×W×H)',s20:'6.06 × 2.44 × 2.59 m',s40:'12.19 × 2.44 × 2.59 m',s45:'13.72 × 2.44 × 2.59 m'},
                  {ico:'📐',b:'Internal Dimensions (L×W×H)',s20:'5.90 × 2.35 × 2.39 m',s40:'12.03 × 2.35 × 2.39 m',s45:'13.56 × 2.35 × 2.39 m'},
                  {ico:'🚪',b:'Door Opening (W×H)',s20:'2.34 × 2.28 m',s40:'2.34 × 2.28 m',s45:'2.34 × 2.28 m'},
                  {ico:'⚖️',b:'Tare Weight',s20:'~2,200 kg',s40:'~3,800 kg',s45:'~4,200 kg'},
                  {ico:'📊',b:'Max Gross Weight',s20:'30,480 kg',s40:'30,480 kg',s45:'32,500 kg'},
                  {ico:'🧮',b:'Max Payload',s20:'~28,000 kg',s40:'~26,680 kg',s45:'~28,300 kg'},
                  {ico:'🔩',b:'Materials',s20:'Corten Steel / Aluminum',s40:'Corten Steel / Aluminum',s45:'Corten Steel / Aluminum'},
                  {ico:'🪵',b:'Floor Type',s20:'Marine plywood / Bamboo',s40:'Marine plywood / Bamboo',s45:'Marine plywood / Bamboo'},
                  {ico:'🧱',b:'Corner Castings',s20:'ISO compliant (top/bottom)',s40:'ISO compliant (top/bottom)',s45:'ISO compliant (top/bottom)'},
                  {ico:'🔒',b:'Locking System',s20:'Standard cargo door cams',s40:'Standard cargo door cams',s45:'Standard cargo door cams'}
                ].map((r)=> (
                  <tr key={r.b}>
                    <td><div className="sc-speccell"><div className="ico" aria-hidden>{r.ico}</div><span>{r.b}</span></div></td>
                    <td>{r.s20}</td>
                    <td>{r.s40}</td>
                    <td>{r.s45}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="sc-features">
        <div className="container">
          <h3>Key Features & Benefits</h3>
          <div className="sc-feat-grid">
            {[{ico:'🧱',t:'Stackable',d:'ISO-standardized design enables safe stacking across modes.'},
              {ico:'🌧️',t:'Weatherproof',d:'Sealed, corrosion-resistant body protects against elements.'},
              {ico:'🧰',t:'Easy Handling',d:'Compatible with cranes, forklifts, and spreaders globally.'},
              {ico:'🛡️',t:'Exceptional Durability',d:'Rugged build quality for long service life.'},
              {ico:'🔒',t:'Maximum Security',d:'Reinforced doors with lock compatibility.'},
              {ico:'🌐',t:'Global Standard',d:'Universally accepted dimensions and fittings.'}].map((f)=> (
              <div className="sc-feat sc-reveal" key={f.t}>
                <div className="ico" aria-hidden>{f.ico}</div>
                <div className="t">{f.t}</div>
                <div className="d">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="sc-usage">
        <div className="container">
          <h3>Common Usage Examples</h3>
          <div className="sc-usage-grid">
            {[{ico:'💻',t:'Electronics'},{ico:'👕',t:'Clothing & Textiles'},{ico:'🛋️',t:'Furniture'},{ico:'📦',t:'General Cargo'}].map((u)=> (
              <div className="sc-usage-card sc-reveal" key={u.t}>
                <div className="ico" aria-hidden>{u.ico}</div>
                <div className="t">{u.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons section removed per request */}

      {/* CTA */}
      <section className="sc-cta">
        <div className="container">
          <div className="wrap sc-reveal">
            <button className="btn btn-white" onClick={()=> navigate('/contact?subject=shipping-quote')}>Request a Quote</button>
            <button className="btn btn-outline" onClick={()=> navigate('/contact')}>Contact Sales</button>
            <button className="btn btn-outline" onClick={()=> window.open('#','_blank')}>Download Full Specs PDF</button>
          </div>
        </div>
      </section>

      {/* Footer (compact reuse) */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__bottom" style={{padding:'1.2rem 0'}}>
            <p>© 2025 StarShipping. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StandardContainer;
