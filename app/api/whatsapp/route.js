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
      reply = "🏢 *HealthPay Registration*\n\nPlease reply with your COMPANY NAME to start your R499 SME plan.";
    }
    else if (body.length > 2 && !['1','2','3','MENU'].includes(msg)) {
      // This catches the actual name of the company
      reply = `✅ REGISTERED: *${body}*\n\nWelcome to the network. Your SaaS fee is R150/employee. Check your dashboard at healthpay-ui.vercel.app to manage HealthCoins.`;
    }
    else {
      reply = "HealthPay.Afrika 🏥\n\n1: Check Balance\n2: Register SME (R499)\n3: Support";
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${reply}</Message></Response>`;
    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });

  } catch (err) {
    return new NextResponse('<Response><Message>System updating...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
