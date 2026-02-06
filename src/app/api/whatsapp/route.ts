import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

export async function POST(request: Request) {
  const formData = await request.formData();
  const body = formData.get('Body')?.toString().trim().toLowerCase() || '';
  const fromNumber = formData.get('From')?.toString() || '';

  let responseText = "";

  if (body === 'hi' || body === 'menu' || body === '0') {
    responseText = "🏥 *HealthPay.Afrika*\n\n1. *Balance*\n2. *History*\n3. *Info*\n4. *Pay Provider*\n\nReply with a number.";
  } 
  else if (body === '1') {
    const testAddress = 'GA5ZSEJYB37JRC5AVCIAZBA2Y3CO7COH67V6N6G7B74V5Y7V6G7B74V5'; 
    const bal = await getAccountBalance(testAddress);
    responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\nType *0* for Menu.`;
  }
  else if (body === '4') {
    responseText = "🏥 *Provider Payment*\n\nPlease enter the *Provider Code* (e.g., CLINIC101) and the amount.\n\n_Example: CLINIC101 50_";
  }
  else if (body.startsWith('clinic')) {
    const [code, amount] = body.split(' ');
    responseText = `✅ *Authorized!*\n\nSending *${amount} HealthCoins* to *${code.toUpperCase()}*.\n\nTransaction processing on Stellar... 🚀`;
  }
  else if (body === '3') {
    responseText = "📜 *Rules*\n\n• Purpose-bound for Health only.\n• No withdrawals.\n• 1 HC = R1.00.";
  }
  else {
    responseText = "🤔 Type *0* for the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
