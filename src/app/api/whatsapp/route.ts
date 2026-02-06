import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

export async function POST(request: Request) {
  const formData = await request.formData();
  const message = formData.get('Body')?.toString().toLowerCase() || '';

  let responseText = "";

  if (message.includes('hi') || message.includes('menu')) {
    responseText = "🏥 *HealthPay.Afrika (Purpose-Bound)*\n\n1. *Balance* - Check your HealthCoins\n2. *Pay Provider* - Send coins to a clinic/pharmacy\n3. *History* - View medical spend history\n\n_Note: Funds are purpose-bound and cannot be withdrawn as cash._";
  } 
  else if (message.includes('balance')) {
    // Note: In production, we would look up the address linked to the sender's WhatsApp number
    responseText = "💰 *Your Health Balance*\n\nYou have *1,250 HealthCoins* available for medical services.";
  }
  else if (message.includes('pay provider')) {
    responseText = "🏥 *Medical Payment*\nPlease enter the *Provider Code* to authorize the transfer of HealthCoins for your treatment.";
  }
  else {
    responseText = "I'm here to help with your health wallet. Type *'Hi'* for the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
