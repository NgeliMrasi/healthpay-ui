"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <header style={{ marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', color: '#2d3748', marginBottom: '10px' }}>HealthPay.Afrika</h1>
        <p style={{ fontSize: '1.2rem', color: '#718096' }}>The Health Operating System for Africa's SMEs.</p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '50px' }}>
        <div style={{ padding: '30px', border: '2px solid #e2e8f0', borderRadius: '15px', textAlign: 'left' }}>
          <h3 style={{ marginTop: 0 }}>For Employers</h3>
          <p style={{ fontSize: '14px', color: '#4a5568' }}>Eliminate health-related absenteeism for just <b>R499.99/mo</b>. No manual claims, no cash leakage.</p>
          <Link href="/admin" style={{ display: 'inline-block', marginTop: '10px', padding: '10px 20px', backgroundColor: '#3182ce', color: '#white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            Open Admin Panel
          </Link>
        </div>

        <div style={{ padding: '30px', border: '2px solid #e2e8f0', borderRadius: '15px', textAlign: 'left' }}>
          <h3 style={{ marginTop: 0 }}>For Providers</h3>
          <p style={{ fontSize: '14px', color: '#4a5568' }}>Get paid instantly. 1.5% transaction fee. Zero paperwork. Powered by Stellar Testnet.</p>
          <Link href="/merchant" style={{ display: 'inline-block', marginTop: '10px', padding: '10px 20px', backgroundColor: '#38a169', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            Merchant Terminal
          </Link>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p style={{ fontSize: '12px', color: '#a0aec0' }}>Native Currency: HealthCoin (HC) | Protocol: Purpose-Bound Liquidity</p>
      </footer>
    </div>
  );
}
