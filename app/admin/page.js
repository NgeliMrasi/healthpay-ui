"use client";
import { useState } from 'react';

export default function AdminDashboard() {
  const [tier, setTier] = useState('SME');

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto', color: '#1a202c' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0 }}>HealthPay.Afrika Dashboard</h1>
          <p style={{ color: '#718096' }}>Managing: {tier === 'SME' ? 'Body Repair Cartel' : 'Global Corp X'}</p>
        </div>
        <button 
          onClick={() => setTier(tier === 'SME' ? 'CORP' : 'SME')}
          style={{ padding: '10px 20px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Switch to {tier === 'SME' ? 'Corporate' : 'SME'} View
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
          <small>STAFF_COUNT</small>
          <h3>{tier === 'SME' ? '10' : '200'}</h3>
        </div>
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
          <small>MONTHLY_SAAS_FEE</small>
          <h3>R{tier === 'SME' ? '499.99' : '20,000.00'}</h3>
        </div>
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
          <small>EST. TX_REVENUE (1.5%)</small>
          <h3 style={{ color: '#38a169' }}>R{tier === 'SME' ? '75.00' : '1,500.00'}</h3>
        </div>
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
          <small>VAULT_STATUS</small>
          <h3 style={{ color: '#3182ce' }}>SECURED</h3>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#f7fafc', borderRadius: '10px' }}>
        <h4>Protocol Summary</h4>
        <p>Current configuration uses <b>Stellar Testnet</b> for all purpose-bound healthcare transfers.</p>
        <ul>
          <li>Native Currency: <b>HealthCoin (HC)</b></li>
          <li>Withdrawal: <b>Restricted (Closed Loop)</b></li>
          <li>Settlement Speed: <b>~5 Seconds</b></li>
        </ul>
      </div>
      
      <p style={{ marginTop: '20px' }}><a href="/" style={{ color: '#3182ce', textDecoration: 'none' }}>← Back to Switchboard</a></p>
    </div>
  );
}
