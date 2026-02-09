import { NextResponse } from 'next/server';

export async function POST(req) {
  const REVENUE_ADDR = "GA7IODL3GYTNCMVOYOHOHYPRLECJEOY54MG5XRHF3TVROJ7XG4I5BGQ5";
  
  try {
    const formData = await req.formData();
    const body = formData.get('Body') || '';
    const msg = body.trim().toUpperCase();
    
    let reply = "";

    // 1. BALANCE CHECK
    if (msg === '1' || msg === 'BALANCE') {
      const res = await fetch(`https://horizon-testnet.stellar.org/accounts/${REVENUE_ADDR}`);
      const data = await res.json();
      const hcAsset = data.balances.find(b => b.asset_code === 'HC');
      const liveBalance = hcAsset ? parseFloat(hcAsset.balance).toFixed(7) : "0.0000000";
      reply = `💰 Live Balance: ${liveBalance} HC\n\nVerified on Stellar Ledger. No withdrawal allowed.`;
    } 
    // 2. SME TIER SELECTION
    else if (msg === '2' || msg === 'JOIN') {
      reply = "🏢 *HealthPay SME Tiers*\n\nPick your package:\nA: 1-10 Employees (R499/pm)\nB: 11-50 Employees (R1999/pm)\nC: 50+ Employees (Custom)\n\nReply with 'COMPANY NAME + TIER'";
    }
    // 3. STAFF REGISTRATION (The New Part)
    else if (msg.startsWith('ADD')) {
      const staffNum = msg.replace('ADD', '').trim();
      reply = `👤 *Staff Registered!*\n\nPhone: ${staffNum}\nStatus: Active\nBenefit: Purpose-Bound HealthCoins\n\nThis employee can now check their medical balance.`;
    }
    // 4. REGISTRATION CATCH-ALL
    else if (body.length > 5 && !['1','2','3','MENU'].includes(msg)) {
      reply = `✅ REGISTERED: *${body}*\n\nTier Active. No per-employee fees. To add staff, reply: ADD [Phone Number]`;
    }
    // 5. MAIN MENU
    else {
      reply = "HealthPay.Afrika 🏥\n\n1: Check Balance\n2: Register SME\n3: Add Staff Member\n\nReply 'ADD [Number]' to onboard employees.";
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${reply}</Message></Response>`;
    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });

  } catch (err) {
    return new NextResponse('<Response><Message>System updating...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
