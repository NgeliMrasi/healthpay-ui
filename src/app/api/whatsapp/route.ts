import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

export async function POST(request: Request) {
  const formData = await request.formData();
  const message = formData.get('Body')?.toString().toLowerCase() || '';
  const fromNumber = formData.get('From')?.toString() || '';

  let responseText = "";

  if (message.includes('hi') || message.includes('menu')) {
    responseText = `🏥 *HealthPay.Afrika Dashboard*\n\nWelcome back! Your ID: ${fromNumber}\n\n1. *Balance* - Check your HealthCoins\n2. *History* - Recent medical spend\n3. *Info* - Purpose-bound rules`;
  } 
  else if (message.includes('balance')) {
    // For now, we use a test address. In production, we'd fetch the address linked to 'fromNumber'
    const testAddress = 'GA5ZSEJYB37JRC5AVCIAZBA2Y3CO7COH67V6N6G7B74V5Y7V6G7B74V5'; 
    const bal = await getAccountBalance(testAddress);
    
    responseText = `💰 *Health Balance*\n\nYou have *${bal} HealthCoins*.\n\n_These coins are locked for healthcare services at registered providers only._`;
  }
  else if (message.includes('info')) {
    responseText = "📜 *HealthPay Rules*\n\n• HealthCoins are R1 = 1 HC.\n• Funds are purpose-bound for medical use.\n• No cash withdrawals allowed.\n• Coins expire if not used within 12 months.";
  }
  else {
    responseText = "I didn't recognize that command. Type *'Hi'* to see the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
