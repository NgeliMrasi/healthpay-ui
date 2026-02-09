"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>HealthPay.Afrika 🏥</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Purpose-Bound Healthcare Rail [SYSTEM_SYNC_OK]</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px', margin: '0 auto' }}>
        <Link href="/merchant" style={{ 
          padding: '15px', backgroundColor: '#1a202c', color: '#00ff88', 
          textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', border: 'none' 
        }}>
          🏥 MERCHANT TERMINAL
        </Link>

        <Link href="/admin" style={{ 
          padding: '15px', backgroundColor: '#3182ce', color: 'white', 
          textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', border: 'none' 
        }}>
          💼 SME ADMIN PANEL
        </Link>
      </div>
    </div>
  );
}
