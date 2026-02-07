import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

const PROVIDERS: Record<string, { name: string; type: string }> = {
  'CLINIC101': { name: 'City Central Clinic', type: 'General Practice' },
  'PHARMA202': { name: 'HealthFirst Pharmacy', type: 'Pharmacy' }
};

// Simulated Database of registered employees
const REGISTERED_USERS: Record<string, string> = {
  '27648782381': 'SME Tech Solutions' 
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const fromNumber = formData.get('From')?.toString().replace('whatsapp:', '') || '';
  const body = formData.get('Body')?.toString().trim().toUpperCase() || '';
  const activeWallet = 'GDVCG3IELCSBMESPQSS7CUTMO7CQ7RYSC2OTQO3IMINRNGMG26NIJ3KM';

  let responseText = "";

  // 1. Check if user is registered
  if (!REGISTERED_USERS[fromNumber] && !body.startsWith('JOIN')) {
    responseText = "👋 *Welcome to HealthPay.Afrika*\n\nYour number is not linked to a company yet. Please enter your *Company Invite Code* to begin (e.g., JOIN SME101):";
  } 
  // 2. Handle Registration
  else if (body.startsWith('JOIN')) {
    responseText = "✅ *Registration Successful!*\n\nYou are now linked to *SME Tech Solutions*. Your monthly health allowance has been activated.\n\nType *0* for the menu.";
  }
  // 3. Main Menu (Registered Users Only)
  else if (body === '0' || body === 'HI' || body === 'MENU') {
    responseText = "🏥 *HealthPay.Afrika*\n\n1. *Balance*\n4. *Pay Provider*\n\nReply with a number.";
  } 
  else if (body === '1') {
    const bal = await getAccountBalance(activeWallet);
    responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\n🔗 *Ledger:* https://stellar.expert/explorer/testnet/account/${activeWallet}\n\nType *0* for Menu.`;
  }
  else if (body === '4') {
    responseText = "🏥 *Provider Payment*\nEnter *Provider ID* (e.g., CLINIC101):";
  }
  else if (PROVIDERS[body]) {
    responseText = `🩺 *Paying ${PROVIDERS[body].name}*\n\nPlease enter the *Amount*:`;
  }
  else if (!isNaN(Number(body)) && Number(body) > 0) {
    responseText = `✅ *Payment Authorized*\n\nAmount: *${body} HealthCoins*\nStatus: *Success*\n\n🔗 *Receipt:* https://stellar.expert/explorer/testnet/account/${activeWallet}`;
  }
  else {
    responseText = "🤔 Type *0* for the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
