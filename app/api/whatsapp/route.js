import { NextResponse } from 'next/server';

export async function POST(req) {
  const REVENUE_ADDR = "GA7IODL3GYTNCMVOYOHOHYPRLECJEOY54MG5XRHF3TVROJ7XG4I5BGQ5";
  const COMPANY = "Body Repair Cartel";
  
  try {
    const formData = await req.formData();
    const from = formData.get('From') || 'User';
    const body = formData.get('Body') || '';
    const msg = body.trim().toUpperCase();
    
    let reply = "";
    let mediaUrl = "";

    // 1. PERSONALIZED QR GENERATION
    if (msg === 'QR' || msg === 'CODE') {
      const staffID = from.replace('whatsapp:', '');
      reply = `🏥 *HealthPay ID: ${COMPANY}*\n\nVerified Member: ${staffID}\nStatus: ACTIVE (Tier B)\n\nScan at clinic to authorize HC payment.`;
      
      // We encode the Company and Phone directly into the QR data
      const qrData = encodeURIComponent(`HP-ID|${COMPANY}|${staffID}`);
      mediaUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${qrData}`;
    } 
    // 2. BALANCE
    else if (msg === '1' || msg === 'BALANCE') {
      reply = `💰 *${COMPANY} Ledger*\n\nStatus: Online\nNetwork: Stellar Testnet\nPurpose: Healthcare Only`;
    }
    // 3. SPEND
    else if (msg.startsWith('SPEND')) {
      const amount = msg.replace('SPEND', '').trim();
      reply = `✅ *Payment Locked*\n\nAmount: ${amount} HC\nFrom: ${from.replace('whatsapp:', '')}\n\nAuthorized by HealthPay.Afrika`;
    }
    // 4. MAIN MENU
    else {
      reply = `HealthPay.Afrika 🏥\n\n1: Balance\nQR: My Personalized ID\nSPEND [Amt]: Pay Clinic\n\nWelcome back to the ${COMPANY} portal.`;
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Message>
        <Body>${reply}</Body>
        ${mediaUrl ? `<Media>${mediaUrl}</Media>` : ''}
      </Message>
    </Response>`;
    
    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });

  } catch (err) {
    return new NextResponse('<Response><Message>Bot refreshing...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
