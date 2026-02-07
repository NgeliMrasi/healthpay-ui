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
    responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\nView on Ledger: https://stellar.expert/explorer/testnet/account/${activeWallet}\n\nType *0* for Menu.`;
  }
  else if (body === '4') {
    responseText = "🏥 *Provider Payment*\n\nPlease enter the *Provider ID* (e.g., CLINIC101):";
  }
  else if (PROVIDERS[body]) {
    responseText = `🩺 *Paying ${PROVIDERS[body].name}*\n\nPlease enter the *Amount* (e.g., 50):`;
  }
  else if (!isNaN(Number(body)) && Number(body) > 0) {
    responseText = `✅ *Payment Authorized*\n\nAmount: *${body} HealthCoins*\nStatus: *Success*\n\n🔗 *Receipt:* https://stellar.expert/explorer/testnet/account/${activeWallet}\n\n_Purpose-bound: Healthcare Only_`;
  }
  else {
    responseText = "🤔 Type *0* for the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
