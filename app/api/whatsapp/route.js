import { NextResponse } from 'next/server';

export async function POST(req) {
  const REVENUE_ADDR = "GA7IODL3GYTNCMVOYOHOHYPRLECJEOY54MG5XRHF3TVROJ7XG4I5BGQ5";
  
  try {
    const formData = await req.formData();
    const body = formData.get('Body') || '';
    const msg = body.trim().toUpperCase();
    
    let reply = "";
    let mediaUrl = "";

    // 1. BALANCE CHECK
    if (msg === '1' || msg === 'BALANCE') {
      reply = "💰 Checking Stellar Ledger...";
    } 
    // 2. GENERATE QR COMMAND
    else if (msg === 'QR' || msg === 'CODE') {
      reply = "🏥 *Your HealthPay ID*\n\nShow this at the clinic for verification.";
      mediaUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${REVENUE_ADDR}`;
    }
    // 3. SPEND LOGIC
    else if (msg.startsWith('SPEND')) {
      const amount = msg.replace('SPEND', '').trim();
      reply = `🏥 *Auth Success*\nAmount: ${amount} HC\nStatus: PENDING\n\nThis is purpose-bound.`;
    }
    // 4. STAFF REGISTRATION
    else if (msg.startsWith('ADD')) {
      const staffNum = msg.replace('ADD', '').trim();
      reply = `👤 *Staff Added: ${staffNum}*\n\nGenerating their unique HealthPay QR...`;
      mediaUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=STAFF_${staffNum}`;
    }
    // 5. MAIN MENU
    else {
      reply = "HealthPay.Afrika 🏥\n\n1: Balance\nQR: Get your QR Code\nADD [Num]: Add Staff\nSPEND [Amt]: Pay Clinic";
    }

    // Twilio TwiML with optional Media
    let twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>`;
    twiml += `<Body>${reply}</Body>`;
    if (mediaUrl) {
      twiml += `<Media>${mediaUrl}</Media>`;
    }
    twiml += `</Message></Response>`;
    
    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });

  } catch (err) {
    return new NextResponse('<Response><Message>System busy...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
