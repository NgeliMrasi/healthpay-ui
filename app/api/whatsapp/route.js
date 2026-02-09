import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const msg = (formData.get('Body') || '').toUpperCase();
    
    let reply = "HealthPay.Afrika 🏥\n\n1: Check Balance\n2: SME Plans\n3: Contact Support";
    
    if (msg.includes('1') || msg.includes('BALANCE')) {
      reply = "💰 Balance: 5000.0000000 HC\nNo withdrawal. Purpose: Healthcare.";
    } else if (msg.includes('2') || msg.includes('JOIN')) {
      reply = "📊 SME Tier: R499/mo\nMax 10 Employees.\nStellar Testnet active.";
    }

    const twiml = '<?xml version="1.0" encoding="UTF-8"?><Response><Message>' + reply + '</Message></Response>';

    return new NextResponse(twiml, {
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (err) {
    return new NextResponse('<Response><Message>Error connecting to HealthPay</Message></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}
