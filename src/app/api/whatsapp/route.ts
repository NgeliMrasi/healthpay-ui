export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getAccountBalance, sendPayment } from '../../../lib/stellar-service';

const PROVIDERS: Record<string, string> = { 
  'CLINIC101': 'GDVCG3IELCSBMESPQSS7CUTMO7CQ7RYSC2OTQO3IMINRNGMG26NIJ3KM' // Using your wallet as destination for test
};

const IS_ADMIN_USER = (num: string) => num.includes('27648782381') || num.includes('27712345678');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fromNumber = formData.get('From')?.toString() || '';
    const body = formData.get('Body')?.toString().trim().toUpperCase() || '';
    const sourceWallet = 'GDVCG3IELCSBMESPQSS7CUTMO7CQ7RYSC2OTQO3IMINRNGMG26NIJ3KM';

    if (body === '1') {
      const bal = await getAccountBalance(sourceWallet);
      return response(`💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\nType *0* for Menu.`);
    }

    if (body === '4') {
      return response("🏥 *Provider Payment*\n\nEnter *Provider ID* (e.g., CLINIC101):");
    }

    if (PROVIDERS[body]) {
      return response(`🩺 *Paying ${body}*\n\nEnter *Amount* (e.g., 10):`);
    }

    // ACTUALLY SEND THE PAYMENT
    if (!isNaN(Number(body)) && Number(body) > 0) {
      const txHash = await sendPayment(body, PROVIDERS['CLINIC101']);
      return response(`✅ *Payment Authorized*\n\nAmount: *${body} HealthCoins*\nStatus: *Blockchain Confirmed*\n\n🔗 *Receipt:* https://stellar.expert/explorer/testnet/tx/${txHash}`);
    }

    return response("🏥 *HealthPay: SuperCare*\n\n1. *Balance*\n4. *Pay Provider*\n\nReply with a number.");

  } catch (err: any) {
    return response(`⚠️ *Transaction Error*\n${err.message || "Please try again."}`);
  }
}

function response(text: string) {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${text}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
