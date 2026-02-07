import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

// Mock DB - In a real app, this would be a database table
const VALID_CODES: Record<string, string> = {
  'JOIN-SUP-1VPD': 'SuperCare'
};

const REGISTERED_USERS: Record<string, string> = {
  '27648782381': 'SuperCare' 
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const fromNumber = formData.get('From')?.toString().replace('whatsapp:', '') || '';
  const body = formData.get('Body')?.toString().trim().toUpperCase() || '';
  const activeWallet = 'GDVCG3IELCSBMESPQSS7CUTMO7CQ7RYSC2OTQO3IMINRNGMG26NIJ3KM';

  let responseText = "";

  // 1. New User Registration
  if (!REGISTERED_USERS[fromNumber] && !VALID_CODES[body]) {
    responseText = "👋 *Welcome to HealthPay.Afrika*\n\nPlease enter your *Company Invite Code* (e.g., JOIN-SUP-1VPD):";
  } 
  // 2. Validate the Code
  else if (VALID_CODES[body]) {
    const company = VALID_CODES[body];
    responseText = `✅ *Access Granted!*\n\nYou are now linked to *${company}*. Your purpose-bound health wallet is active.\n\nType *0* for Menu.`;
  }
  // 3. Main Menu
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
  else if (!isNaN(Number(body)) && Number(body) > 0) {
    responseText = `✅ *Payment Authorized*\n\nAmount: *${body} HealthCoins*\nStatus: *Success*\n\n🔗 *Receipt:* https://stellar.expert/explorer/testnet/account/${activeWallet}`;
  }
  else {
    responseText = "🤔 Type *0* for the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
