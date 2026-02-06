import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

// Simulated database of registered healthcare providers
const PROVIDERS: Record<string, { name: string; type: string }> = {
  'CLINIC101': { name: 'City Central Clinic', type: 'General Practice' },
  'PHARMA202': { name: 'HealthFirst Pharmacy', type: 'Pharmacy' },
  'DENT303': { name: 'SmileBright Dental', type: 'Specialist' }
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const body = formData.get('Body')?.toString().trim().toLowerCase() || '';
  const fromNumber = formData.get('From')?.toString() || '';

  let responseText = "";
  const testAddress = 'GA5ZSEJYB37JRC5AVCIAZBA2Y3CO7COH67V6N6G7B74V5Y7V6G7B74V5';

  if (body === 'hi' || body === 'menu' || body === '0') {
    responseText = "🏥 *HealthPay.Afrika (Verified)*\n\n1. *Balance*\n2. *History*\n3. *Info*\n4. *Pay Provider*\n\nReply with a number.";
  } 
  else if (body === '1') {
    let bal = await getAccountBalance(testAddress);
    if (bal === '0' || bal === '0.0000000') {
      responseText = "🔋 *Wallet Empty!* Requesting test HealthCoins... Wait 5 seconds and check again.";
      fetch(`https://horizon-testnet.stellar.org/friendbot?addr=${testAddress}`);
    } else {
      responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\nType *0* for Menu.`;
    }
  }
  else if (body === '4') {
    responseText = "🏥 *Provider Payment*\nEnter: *ProviderID Amount*\n\n*Registered IDs:*\n• CLINIC101\n• PHARMA202\n• DENT303";
  }
  else if (body.startsWith('clinic') || body.startsWith('pharma') || body.startsWith('dent')) {
    const parts = body.split(' ');
    const id = parts[0].toUpperCase();
    const amount = parts[1] || '0';
    const provider = PROVIDERS[id];

    if (provider) {
      responseText = `✅ *Payment Authorized*\n\n*To:* ${provider.name} (${provider.type})\n*Amount:* ${amount} HealthCoins\n\n_Note: This transaction is purpose-bound for healthcare only._`;
    } else {
      responseText = "❌ *Error: Unregistered Provider*\n\nThat ID is not in our verified medical network. Your HealthCoins can only be spent at registered partners.";
    }
  }
  else if (body === '3') {
    responseText = "📜 *Rules*\n\n• Purpose-bound for Health only.\n• No withdrawals.\n• 1 HC = R1.00.";
  }
  else {
    responseText = "🤔 Type *0* for the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
