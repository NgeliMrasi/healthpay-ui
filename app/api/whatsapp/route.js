import { NextResponse } from 'next/server';

export async function POST(req) {
  const REVENUE_ADDR = "GA7IODL3GYTNCMVOYOHOHYPRLECJEOY54MG5XRHF3TVROJ7XG4I5BGQ5";
  
  try {
    const formData = await req.formData();
    const msg = (formData.get('Body') || '').toUpperCase();
    
    // Default Menu
    let reply = "HealthPay.Afrika 🏥\n\n1: Live Balance\n2: SME Plans\n3: Contact Support";
    
    if (msg.includes('1') || msg.includes('BALANCE')) {
      try {
        // FETCH REAL DATA FROM STELLAR TESTNET
        const res = await fetch(`https://horizon-testnet.stellar.org/accounts/${REVENUE_ADDR}`);
        const data = await res.json();
        const hcAsset = data.balances.find(b => b.asset_code === 'HC');
        const liveBalance = hcAsset ? parseFloat(hcAsset.balance).toFixed(7) : "0.0000000";
        
        reply = `💰 Live Balance: ${liveBalance} HC\n\nVerified on Stellar Ledger. No withdrawal allowed. Usage: Healthcare only.`;
      } catch (stellarErr) {
        reply = "⚠️ Ledger Sync Error. Last known: 5000.00 HC. Please try again in a moment.";
      }
    } else if (msg.includes('2') || msg.includes('JOIN')) {
      reply = "📊 SME Tier: R499/mo\n- 1-10 Employees\n- Purpose-Bound Benefits\n- R150/head/month SaaS fee.";
    } else if (msg.includes('3')) {
      reply = "📩 Support: support@healthpay.afrika\nOr reply 'MENU' to return.";
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${reply}</Message></Response>`;

    return new NextResponse(twiml, {
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (err) {
    return new NextResponse('<Response><Message>Service temporarily unavailable.</Message></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}
