import React from 'react'
import Header from './Header'

const OPentopDetails = () => {
  return (
    <div className="ot-details-page">
      <Header transparentOnTop={false} active="services" />
      <section style={{padding:'40px 0'}}>
        <div className="container" style={{maxWidth:1160, margin:'0 auto', padding:'0 20px'}}>
          <h1 style={{fontSize:'1.8rem', fontWeight:900, marginBottom:8}}>Open Top Container — Full Details</h1>
          <p style={{color:'#475569'}}>Deeper specifications, options, and operational guidance will be presented here.</p>
        </div>
      </section>
    </div>
  )
}

export default OPentopDetails
