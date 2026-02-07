import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

const VALID_CODES: Record<string, string> = { 'JOIN-SUP-1VPD': 'SuperCare' };
const REGISTERED_USERS: Record<string, string> = { '27648782381': 'SuperCare' };

export async function POST(request: Request) {
  const formData = await request.formData();
  const fromNumber = formData.get('From')?.toString().replace('whatsapp:', '') || '';
  const body = formData.get('Body')?.toString().trim().toUpperCase() || '';
  const activeWallet = 'GDVCG3IELCSBMESPQSS7CUTMO7CQ7RYSC2OTQO3IMINRNGMG26NIJ3KM';

  let responseText = "";

  if (body === 'HELP' || body === '2') {
    responseText = "❓ *HealthPay Help*\n\n• *What is HealthCoin?* It is our native digital currency for health services.\n• *Can I withdraw cash?* No, the purpose is bound to healthcare only.\n• *Where can I pay?* Any provider with a HealthPay QR code.\n\nType *0* for Menu.";
  }
  else if (!REGISTERED_USERS[fromNumber] && !VALID_CODES[body]) {
    responseText = "👋 *Welcome to HealthPay.Afrika*\n\nPlease enter your *Company Invite Code*:";
  } 
  else if (VALID_CODES[body]) {
    responseText = `✅ *Access Granted!*\n\nYou are now linked to *${VALID_CODES[body]}*.\n\nType *0* for Menu.`;
  }
  else if (body === '0' || body === 'HI' || body === 'MENU') {
    responseText = "🏥 *HealthPay.Afrika*\n\n1. *Balance*\n2. *Help*\n4. *Pay Provider*\n\nReply with a number.";
  } 
  else if (body === '1') {
    const bal = await getAccountBalance(activeWallet);
    responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\nType *0* for Menu.`;
  }
  else if (body === '4') {
    responseText = "🏥 *Provider Payment*\nEnter *Provider ID*:";
  }
  else if (!isNaN(Number(body)) && Number(body) > 0) {
    responseText = `✅ *Payment Authorized*\n\nAmount: *${body} HealthCoins*\nStatus: *Success*`;
  }
  else {
    responseText = "🤔 Type *0* for the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
