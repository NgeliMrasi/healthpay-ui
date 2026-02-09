import { NextResponse } from 'next/server';

export async function POST(req) {
  const REVENUE_ADDR = "GA7IODL3GYTNCMVOYOHOHYPRLECJEOY54MG5XRHF3TVROJ7XG4I5BGQ5";
  
  try {
    const formData = await req.formData();
    const body = formData.get('Body') || '';
    const msg = body.trim().toUpperCase();
    
    let reply = "";
    let mediaUrl = "";

    if (msg === '1' || msg === 'BALANCE') {
      reply = "💰 *Live Ledger Balance*\n\nFetching data from Stellar Testnet...";
    } 
    // FIXED QR COMMAND
    else if (msg === 'QR' || msg === 'CODE') {
      reply = "🏥 *Your HealthPay ID*\n\nScan this at any registered clinic to authorize payment from the Body Repair Cartel pool.";
      mediaUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${REVENUE_ADDR}`;
    }
    else if (msg.startsWith('SPEND')) {
      const amount = msg.replace('SPEND', '').trim();
      reply = `🏥 *Payment Authorized*\nAmount: ${amount} HC\nStatus: PENDING\n\nVerified Purpose-Bound Transaction.`;
    }
    else if (msg.startsWith('ADD')) {
      const staffNum = msg.replace('ADD', '').trim();
      reply = `👤 *Staff Member Registered: ${staffNum}*\n\nThey can now use 'QR' to get their ID.`;
    }
    else {
      reply = "HealthPay.Afrika 🏥\n\n1: Check Balance\nQR: Get your QR ID\nADD [Num]: Register Staff\nSPEND [Amt]: Clinic Payment";
    }

    // Standard Twilio XML Response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Message>
        <Body>${reply}</Body>
        ${mediaUrl ? `<Media>${mediaUrl}</Media>` : ''}
      </Message>
    </Response>`;
    
    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });

  } catch (err) {
    return new NextResponse('<Response><Message>Bot is restarting...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
