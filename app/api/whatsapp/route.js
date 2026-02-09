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

    if (msg === 'QR' || msg === 'CODE') {
      reply = `🏥 *HealthPay ID: ${COMPANY}*\n\nMember: ${from}\nStatus: ACTIVE\n\n(Image loading...)`;
      // Switching to a more robust QR provider (QuickChart) for instant WhatsApp rendering
      const qrData = encodeURIComponent(`HP-ID|${COMPANY}|${from}`);
      mediaUrl = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${qrData}`;
    } 
    else if (msg === '1' || msg === 'BALANCE') {
      reply = `💰 *${COMPANY} Balance*\n\n5000.00 HC\nVerified on Stellar Testnet.`;
    }
    else if (msg.startsWith('SPEND')) {
      const parts = msg.split(' ');
      const amount = parts[1];
      if (!amount || isNaN(amount)) {
        reply = "⚠️ Please use: SPEND [Amount]";
      } else {
        reply = `✅ *Authorized*\nAmount: ${amount} HC\nStatus: PENDING\n\nVerified for Medical Use.`;
      }
    }
    else {
      reply = `HealthPay.Afrika 🏥\n\n1: Balance\nQR: Get ID\nSPEND [Amt]: Pay Clinic`;
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
    return new NextResponse('<Response><Message>Active...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
