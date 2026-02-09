import { NextResponse } from 'next/server';

export async function POST(req) {
  const REVENUE_ADDR = "GA7IODL3GYTNCMVOYOHOHYPRLECJEOY54MG5XRHF3TVROJ7XG4I5BGQ5";
  
  try {
    const formData = await req.formData();
    const body = formData.get('Body') || '';
    const msg = body.trim().toUpperCase();
    
    let reply = "";

    if (msg === '1' || msg === 'BALANCE') {
      const res = await fetch(`https://horizon-testnet.stellar.org/accounts/${REVENUE_ADDR}`);
      const data = await res.json();
      const hcAsset = data.balances.find(b => b.asset_code === 'HC');
      const liveBalance = hcAsset ? parseFloat(hcAsset.balance).toFixed(7) : "0.0000000";
      reply = `💰 Live Balance: ${liveBalance} HC\n\nVerified on Stellar Ledger.`;
    } 
    else if (msg === '2' || msg === 'JOIN') {
      reply = "🏢 *HealthPay SME Tiers*\n\nPick your package:\nA: 1-10 Employees (R499/pm)\nB: 11-50 Employees (R1999/pm)\nC: 50+ Employees (Custom)\n\nReply with 'COMPANY NAME + TIER' (e.g., Body Repair Cartel A)";
    }
    else if (body.length > 3 && !['1','2','3','MENU'].includes(msg)) {
      reply = `✅ REGISTERED: *${body}*\n\nYour selected tier is active. No per-employee SaaS fees applied. Purpose-bound HealthCoins are now ready for distribution!`;
    }
    else {
      reply = "HealthPay.Afrika 🏥\n\n1: Check Balance\n2: Pick SME Package & Register\n3: Support";
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${reply}</Message></Response>`;
    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });

  } catch (err) {
    return new NextResponse('<Response><Message>Updating logic...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
