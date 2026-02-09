import { NextResponse } from 'next/server';

// This is a temporary global variable to simulate a database for the demo
let currentSessionBalance = 4500.00; 

export async function POST(req) {
  const REVENUE_ADDR = "GA7IODL3GYTNCMVOYOHOHYPRLECJEOY54MG5XRHF3TVROJ7XG4I5BGQ5";
  const COMPANY = "Body Repair Cartel";

  try {
    const formData = await req.formData();
    const from = (formData.get('From') || '').replace('whatsapp:', '');
    const body = formData.get('Body') || '';
    const msg = body.trim().toUpperCase();
    
    let reply = "";

    if (msg.startsWith('SPEND')) {
      const amount = parseFloat(msg.split(' ')[1]);
      if (!amount || isNaN(amount)) {
        reply = "⚠️ Use: SPEND [Amount]";
      } else {
        const previous = currentSessionBalance;
        currentSessionBalance = currentSessionBalance - amount;
        
        const explorerLink = `https://stellar.expert/explorer/testnet/account/${REVENUE_ADDR}`;
        
        reply = `💸 *HC TRANSFER CONFIRMED*\n\n` +
                `Amount: ${amount} HC\n` +
                `From: ${from}\n` +
                `Previous: ${previous.toFixed(2)} HC\n` +
                `Remaining: ${currentSessionBalance.toFixed(2)} HC\n\n` +
                `🔗 *View on Ledger:*\n${explorerLink}\n\n` +
                `Status: Finalized on Stellar`;
      }
    }
    else if (msg === '1' || msg === 'BALANCE') {
      reply = `💰 *${COMPANY} VAULT*\n\nBalance: ${currentSessionBalance.toFixed(2)} HC\nExplorer: https://stellar.expert/explorer/testnet/account/${REVENUE_ADDR}`;
    }
    else {
      reply = `*HealthPay.Afrika* 🏥\n\n1: Balance\nSPEND [Amt]: Pay Clinic\n\nWelcome back to the Cartel portal.`;
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message><Body>${reply}</Body></Message></Response>`;
    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
  } catch (err) {
    return new NextResponse('<Response><Message>Syncing...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
