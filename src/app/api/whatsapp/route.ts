export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

const VALID_CODES: Record<string, string> = { 'JOIN-SUP-1VPD': 'SuperCare' };
const PROVIDERS: Record<string, string> = { 'CLINIC101': 'City Central Clinic' };
const IS_ADMIN_USER = (num: string) => num.includes('27648782381') || num.includes('27712345678');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fromNumber = formData.get('From')?.toString() || '';
    const body = formData.get('Body')?.toString().trim().toUpperCase() || '';
    const activeWallet = 'GDVCG3IELCSBMESPQSS7CUTMO7CQ7RYSC2OTQO3IMINRNGMG26NIJ3KM';

    console.log(`[Feb 7, 18:07] Received from ${fromNumber}: ${body}`);

    let responseText = "";

    if (VALID_CODES[body]) {
      responseText = `✅ *Access Granted!*\n\nYou are now linked to *${VALID_CODES[body]}*.\n\nType *0* for Menu.`;
    }
    else if (IS_ADMIN_USER(fromNumber) || body === '0' || body === 'HI' || body === 'MENU') {
      responseText = "🏥 *HealthPay: SuperCare*\n\n1. *Balance*\n2. *Help*\n4. *Pay Provider*\n\nReply with a number.";
    }
    else if (body === '1') {
      const bal = await getAccountBalance(activeWallet);
      responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\nType *0* for Menu.`;
    }
    else if (body === '4') {
      responseText = "🏥 *Provider Payment*\n\nEnter *Provider ID* (e.g., CLINIC101):";
    }
    else if (PROVIDERS[body]) {
      responseText = `🩺 *Paying ${PROVIDERS[body]}*\n\nEnter *Amount*:`;
    }
    else if (!isNaN(Number(body)) && Number(body) > 0) {
      const bal = await getAccountBalance(activeWallet);
      if (Number(body) > Number(bal)) {
        responseText = `❌ *Insufficient Funds*\nBalance: ${bal}\n\nType *0* for Menu.`;
      } else {
        responseText = `✅ *Payment Authorized*\nAmount: *${body} HealthCoins*\n\n🔗 *Receipt:* https://stellar.expert/explorer/testnet/account/${activeWallet}`;
      }
    }
    else {
      responseText = "👋 *Welcome to HealthPay.Afrika*\n\nPlease enter your *Company Invite Code*:";
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
  } catch (err) {
    return new NextResponse('<Response><Message>⚠️ System busy. Try "Hi" again.</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
