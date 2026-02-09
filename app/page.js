export default function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>HealthPay.Afrika 🏥</h1>
      <div style={{ marginTop: '30px' }}>
        <a href="/merchant" style={{ display: 'block', padding: '15px', background: '#000', color: '#0f8', textDecoration: 'none', borderRadius: '8px', marginBottom: '10px' }}>
          GOTO MERCHANT TERMINAL
        </a>
        <a href="/admin" style={{ display: 'block', padding: '15px', background: '#3182ce', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>
          GOTO SME ADMIN
        </a>
      </div>
    </div>
  );
}
