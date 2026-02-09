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
    // 2. SPEND LOGIC (The "Medical Lock")
    else if (msg.startsWith('SPEND')) {
      const amount = msg.replace('SPEND', '').trim();
      if (!amount || isNaN(amount)) {
        reply = "⚠️ Please specify an amount. Example: SPEND 250";
      } else {
        reply = `🏥 *Payment Authorized*\n\nAmount: ${amount} HC\nMerchant: Medical Provider\nStatus: PENDING SETTLEMENT\n\nNote: This transaction is purpose-bound and cannot be reversed for cash.`;
      }
    }
    // 3. STAFF REGISTRATION
    else if (msg.startsWith('ADD')) {
      const staffNum = msg.replace('ADD', '').trim();
      reply = `👤 *Staff Registered!*\n\nPhone: ${staffNum}\nStatus: Active\nBenefit: Growth Tier (B)`;
    }
    // 4. SME TIER SELECTION
    else if (msg === '2' || msg === 'JOIN') {
      reply = "🏢 *HealthPay SME Tiers*\n\nPick your package:\nA: 1-10 Employees (R499/pm)\nB: 11-50 Employees (R1999/pm)\nC: 50+ Employees (Custom)";
    }
    // 5. MAIN MENU
    else {
      reply = "HealthPay.Afrika 🏥\n\n1: Check Balance\n2: Register SME\n3: Add Staff\n\nReply 'SPEND [Amount]' at a clinic.";
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${reply}</Message></Response>`;
    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });

  } catch (err) {
    return new NextResponse('<Response><Message>System busy...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
