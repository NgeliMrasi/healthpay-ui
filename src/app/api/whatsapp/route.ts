import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

export async function POST(request: Request) {
  const formData = await request.formData();
  const body = formData.get('Body')?.toString().trim().toLowerCase() || '';
  const fromNumber = formData.get('From')?.toString() || '';

  let responseText = "";

  // Logic to handle both numbers and keywords
  if (body === 'hi' || body === 'menu' || body === '0') {
    responseText = `🏥 *HealthPay.Afrika Dashboard*\n\nWelcome! ID: ${fromNumber}\n\n1. *Balance*\n2. *History*\n3. *Info*\n\nReply with a number or word.`;
  } 
  else if (body === '1' || body.includes('balance')) {
    const testAddress = 'GA5ZSEJYB37JRC5AVCIAZBA2Y3CO7COH67V6N6G7B74V5Y7V6G7B74V5'; 
    const bal = await getAccountBalance(testAddress);
    responseText = `💰 *Health Balance*\n\nYou have *${bal} HealthCoins* available.\n\nType *0* for Menu.`;
  }
  else if (body === '2' || body.includes('history')) {
    responseText = "📊 *Recent Spend*\n\n• 50 HC - City Clinic (01/02)\n• 12 HC - MedPharma (28/01)\n\nType *0* for Menu.";
  }
  else if (body === '3' || body.includes('info')) {
    responseText = "📜 *Rules*\n\n• Purpose-bound for Health only.\n• No withdrawals.\n• 1 HC = R1.00.\n\nType *0* for Menu.";
  }
  else {
    responseText = "🤔 I didn't get that. Type *Hi* or *0* for the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
