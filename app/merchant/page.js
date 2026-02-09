"use client";
export default function Merchant() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#00ff88', fontFamily: 'monospace' }}>
      <h1>🏥 CLINIC_101 TERMINAL</h1>
      <p style={{ color: '#888' }}>Status: NODE_ONLINE</p>
      <hr style={{ border: '1px solid #333' }} />
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #00ff88' }}>
        <h3>LIVE_BALANCE: 5000.00 HC</h3>
        <p>Purpose: Healthcare Only (No Withdrawal)</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h4>RECENT_STREAMS:</h4>
        <p>> +350 HC from +27648782381</p>
        <p>> +750 HC from +27648782381</p>
      </div>
      <footer style={{ marginTop: '50px', color: '#444', fontSize: '10px' }}>HEALTHPAY.AFRIKA // 2026</footer>
    </div>
  );
}
