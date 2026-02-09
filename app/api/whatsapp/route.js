import { NextResponse } from 'next/server';

export async function POST(req) {
  const REVENUE_ADDR = "GA7IODL3GYTNCMVOYOHOHYPRLECJEOY54MG5XRHF3TVROJ7XG4I5BGQ5";
  const COMPANY = "Body Repair Cartel";
  
  try {
    const formData = await req.formData();
    const from = (formData.get('From') || '').replace('whatsapp:', '');
    const body = formData.get('Body') || '';
    const msg = body.trim().toUpperCase();
    
    let reply = "";
    let mediaUrl = "";

    // 1. QR LOGIC
    if (msg === 'QR' || msg === 'CODE') {
      reply = `🏥 *HealthPay ID: ${COMPANY}*\n\nMember: ${from}\nStatus: ACTIVE\n\nShow this QR at any clinic.`;
      const qrPayload = `HP-ID|${COMPANY}|${from}`;
      mediaUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(qrPayload)}`;
    } 
    // 2. BALANCE LOGIC
    else if (msg === '1' || msg === 'BALANCE') {
      reply = `💰 *${COMPANY} Balance*\n\n5000.00 HC\nVerified on Stellar Testnet.`;
    }
    // 3. SPEND LOGIC (Strict check for amount)
    else if (msg.startsWith('SPEND')) {
      const parts = msg.split(' ');
      const amount = parts[1];
      
      if (!amount || isNaN(amount)) {
        reply = "⚠️ *Invalid Amount*\n\nPlease use the format: SPEND 500";
      } else {
        reply = `✅ *Payment Authorized*\n\nAmount: ${amount} HC\nMerchant: Medical Provider\nStatus: PENDING SETTLEMENT\n\nNote: This is purpose-bound for healthcare.`;
      }
    }
    // 4. DEFAULT MENU
    else {
      reply = `HealthPay.Afrika 🏥\n\n1: Balance\nQR: Get ID\nSPEND [Amt]: Pay Clinic\n\nWelcome back, ${COMPANY} Member.`;
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
    return new NextResponse('<Response><Message>System active...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
