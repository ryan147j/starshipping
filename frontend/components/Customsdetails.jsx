import React, { useEffect } from 'react';
import './CustomsDetails.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import customsPoster from '../src/assets/customs.jpg';
// Serve large media from public to avoid bundling issues in production
const VIDEO_URL = '/media/customss.mp4';

const Customsdetails = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.cdx-reveal, .cdx-fade-up').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="cdx-page">
      <Header transparentOnTop={true} active="services" />

      {/* Hero band */}
      <section className="cdx-hero">
        <video className="cdx-hero__video" src={VIDEO_URL} poster={customsPoster} autoPlay muted loop playsInline preload="metadata" />
        <div className="cdx-hero__overlay" />
        <div className="container center">
          <h1 className="cdx-title cdx-fade-up">Customs Clearance</h1>
          <p className="cdx-sub cdx-fade-up" style={{animationDelay:'100ms'}}>Streamlining your import and export process with complete regulatory support.</p>
          <button className="cdx-back cdx-fade-up" style={{animationDelay:'180ms'}} onClick={() => navigate('/services')}>Back to Services</button>
        </div>
      </section>

      {/* Intro white card */}
      <section className="cdx-intro">
        <div className="container">
          <div className="card cdx-reveal">
            <h3>Seamless Customs Solutions</h3>
            <p>
              Navigating the complexities of international trade regulations can be challenging. Our comprehensive customs clearance
              services ensure your goods move across borders with full compliance and minimal delays. We handle documentation,
              duty calculation, and regulatory submissions—allowing you to focus on your core operations.
            </p>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="cdx-services">
        <div className="container">
          <h2 className="section-title center">Key Services</h2>
          <p className="section-sub center">Comprehensive customs support tailored to your needs</p>
          <div className="cdx-grid">
            {[
              {ico:'📄',t:'Document Verification',d:'Thorough review and preparation of import/export forms to avoid delays and discrepancies.'},
              {ico:'💰',t:'Duty & Tax Calculation',d:'Transparent, accurate duties and taxes with drawback and exemptions guidance.'},
              {ico:'🛡️',t:'Customs Compliance',d:'End-to-end compliance with HS codes, valuation, and licensing requirements.'},
              {ico:'🌍',t:'Import/Export Consulting',d:'Strategic guidance on trade routes, restrictions, and best practices.'}
            ].map((c,i)=> (
              <div className="cdx-s-card cdx-reveal" style={{transitionDelay:`${80*i}ms`}} key={c.t}>
                <div className="ico" aria-hidden>{c.ico}</div>
                <div className="t">{c.t}</div>
                <div className="d">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assistance band */}
      <section className="cdx-assist">
        <div className="container">
          <div className="wrap">
            <div className="ico" aria-hidden>🎧</div>
            <div className="txt">24/7 Assistance from Our Customs Specialists</div>
            <button className="btn" onClick={()=> navigate('/contact')}>Contact Us</button>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="cdx-process">
        <div className="container">
          <h2 className="center" style={{marginBottom:'18px'}}>Our Clearance Process</h2>
          <div className="cdx-steps">
            {[{n:1,l:'Document Submission',d:'Submit your shipping documents and we verify they meet requirements.'},
              {n:2,l:'Processing & Filing',d:'We handle HS classification, declarations and regulatory submissions.'},
              {n:3,l:'Clearance & Delivery',d:'Your cargo is cleared and ready for final delivery or distribution.'}
            ].map((s,i)=> (
              <div className="cdx-step cdx-reveal" style={{transitionDelay:`${80*i}ms`}} key={s.l}>
                <div className="ball" aria-hidden>{s.n}</div>
                <div className="lab">{s.l}</div>
                <div className="desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cdx-cta-band">
        <div className="container center">
          <div className="lead">Ready to Simplify Your Customs Process?</div>
          <div className="sub">Let our experts handle the complexities while you focus on growing your business.</div>
          <div className="actions">
            <button className="btn btn-primary" onClick={()=> navigate('/contact?subject=shipping-quote')}>Request a Quote</button>
            <button className="btn btn-outline" onClick={()=> navigate('/services')}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default Customsdetails;
