export default function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2d3748' }}>HealthPay.Afrika 🏥</h1>
      <p>Purpose-Bound Healthcare Rail</p>
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
        <a href="/merchant" style={{ width: '250px', padding: '15px', background: '#1a202c', color: '#00ff88', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', border: '1px solid #00ff88' }}>
          🏥 MERCHANT TERMINAL
        </a>
        <a href="/admin" style={{ width: '250px', padding: '15px', background: '#3182ce', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
          💼 SME ADMIN PANEL
        </a>
      </div>
    </div>
  );
}
