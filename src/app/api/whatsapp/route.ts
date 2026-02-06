import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

const PROVIDERS: Record<string, { name: string; type: string }> = {
  'CLINIC101': { name: 'City Central Clinic', type: 'General Practice' },
  'PHARMA202': { name: 'HealthFirst Pharmacy', type: 'Pharmacy' }
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const body = formData.get('Body')?.toString().trim().toUpperCase() || '';
  const activeWallet = 'GDVCG3IELCSBMESPQSS7CUTMO7CQ7RYSC2OTQO3IMINRNGMG26NIJ3KM';

  let responseText = "";

  if (body === '0' || body === 'HI' || body === 'MENU') {
    responseText = "🏥 *HealthPay.Afrika*\n\n1. *Balance*\n4. *Pay Provider*\n\nReply with a number.";
  } 
  else if (body === '1') {
    const bal = await getAccountBalance(activeWallet);
    responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\nType *0* for Menu.`;
  }
  else if (body === '4') {
    responseText = "🏥 *Provider Payment*\n\nPlease enter the *Provider ID* (e.g., CLINIC101):";
  }
  // Check if the user entered a valid Provider ID
  else if (PROVIDERS[body]) {
    const provider = PROVIDERS[body];
    responseText = `🩺 *Paying ${provider.name}*\n\nPlease enter the *Amount* in HealthCoins (e.g., 50):`;
  }
  // Check if the user entered a number (the amount)
  else if (!isNaN(Number(body)) && Number(body) > 0) {
    responseText = `✅ *Payment Authorized*\n\nAmount: *${body} HealthCoins*\nStatus: *Processing on Stellar...*\n\n_This transaction is purpose-bound._`;
  }
  else {
    responseText = "🤔 I didn't catch that. Type *0* to see the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
