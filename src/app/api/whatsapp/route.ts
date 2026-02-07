import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

const VALID_CODES: Record<string, string> = { 'JOIN-SUP-1VPD': 'SuperCare' };
const PROVIDERS: Record<string, string> = { 'CLINIC101': 'City Central Clinic' };

const IS_ADMIN_USER = (num: string) => num.includes('27648782381') || num.includes('27712345678');

export async function POST(request: Request) {
  const formData = await request.formData();
  const fromNumber = formData.get('From')?.toString() || '';
  const body = formData.get('Body')?.toString().trim().toUpperCase() || '';
  const activeWallet = 'GDVCG3IELCSBMESPQSS7CUTMO7CQ7RYSC2OTQO3IMINRNGMG26NIJ3KM';

  let responseText = "";

  if (VALID_CODES[body]) {
    responseText = `✅ *Access Granted!*\n\nYou are now linked to *${VALID_CODES[body]}*.\n\nType *0* for the Menu.`;
  }
  else if (body === '1' && IS_ADMIN_USER(fromNumber)) {
    const bal = await getAccountBalance(activeWallet);
    responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\nType *0* for Menu.`;
  }
  else if (body === '4' && IS_ADMIN_USER(fromNumber)) {
    responseText = "🏥 *Provider Payment*\n\nEnter *Provider ID* (e.g., CLINIC101):";
  }
  else if (PROVIDERS[body] && IS_ADMIN_USER(fromNumber)) {
    responseText = `🩺 *Paying ${PROVIDERS[body]}*\n\nPlease enter the *Amount* (e.g., 50):`;
  }
  // NEW: GUARDRAIL LOGIC
  else if (!isNaN(Number(body)) && Number(body) > 0 && IS_ADMIN_USER(fromNumber)) {
    const amount = Number(body);
    const currentBalance = Number(await getAccountBalance(activeWallet));

    if (amount > currentBalance) {
      responseText = `❌ *Transaction Declined*\n\nReason: Insufficient HealthCoins.\nAvailable: *${currentBalance}*\n\nPlease contact your HR Manager at *SuperCare* to top up.`;
    } else {
      responseText = `✅ *Payment Authorized*\n\nAmount: *${amount} HealthCoins*\nStatus: *Success*\n\n🔗 *Receipt:* https://stellar.expert/explorer/testnet/account/${activeWallet}`;
    }
  }
  else if (body === '0' || body === 'HI' || body === 'MENU' || IS_ADMIN_USER(fromNumber)) {
    responseText = "🏥 *HealthPay: SuperCare*\n\n1. *Balance*\n2. *Help*\n4. *Pay Provider*\n\nReply with a number.";
  }
  else {
    responseText = "👋 *Welcome to HealthPay.Afrika*\n\nPlease enter your *Company Invite Code*:";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
