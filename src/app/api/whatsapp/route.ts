import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

// Mock Databases
const VALID_CODES: Record<string, string> = { 'JOIN-SUP-1VPD': 'SuperCare' };
const REGISTERED_USERS: Record<string, string> = { 
  '27648782381': 'SuperCare' // Ensure this is your Twilio/WhatsApp number
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const fromNumber = formData.get('From')?.toString().replace('whatsapp:', '') || '';
  const body = formData.get('Body')?.toString().trim().toUpperCase() || '';
  const activeWallet = 'GDVCG3IELCSBMESPQSS7CUTMO7CQ7RYSC2OTQO3IMINRNGMG26NIJ3KM';

  let responseText = "";

  // 1. CHECK: If the user is already registered OR is sending the code right now
  const isCompanyCode = VALID_CODES[body];
  const isRegistered = REGISTERED_USERS[fromNumber];

  if (isCompanyCode) {
    responseText = `✅ *Access Granted!*\n\nYou are now linked to *${isCompanyCode}*.\n\nType *0* for the Menu.`;
  } 
  else if (isRegistered || body === '0' || body === 'HI' || body === 'MENU') {
    // If they are registered or asking for menu, show the options
    const company = isRegistered || "SuperCare";
    responseText = `🏥 *HealthPay: ${company}*\n\n1. *Balance*\n2. *Help*\n4. *Pay Provider*\n\nReply with a number.`;
  }
  else if (body === '1') {
    const bal = await getAccountBalance(activeWallet);
    responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\nType *0* for Menu.`;
  }
  else if (body === '4') {
    responseText = "🏥 *Provider Payment*\n\nEnter *Provider ID* (e.g., CLINIC101):";
  }
  else {
    // ONLY ask for code if they aren't registered AND didn't just send a valid code
    responseText = "👋 *Welcome to HealthPay.Afrika*\n\nPlease enter your *Company Invite Code* to begin:";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
