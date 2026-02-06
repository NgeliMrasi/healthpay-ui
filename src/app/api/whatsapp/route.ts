import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

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
    responseText = "🏥 *HealthPay.Afrika*\n\n1. *Balance*\n2. *History*\n3. *Info*\n4. *Pay Provider*\n\nReply with a number.";
  } 
  else if (body === '1') {
    let bal = await getAccountBalance(testAddress);
    
    if (bal === '0' || bal === '0.0000000') {
      try {
        const fundRes = await fetch(`https://horizon-testnet.stellar.org/friendbot?addr=${testAddress}`);
        if (fundRes.ok) {
          responseText = "🔋 *Success!* Your medical wallet has been initialized with 10,000 HealthCoins. Check balance again in 3 seconds!";
        } else {
          responseText = "⏳ *Network Busy:* The Stellar faucet is recharging. Try again in 1 minute.";
        }
      } catch (e) {
        responseText = "❌ *Connection Error:* Could not reach the testnet. Please try again later.";
      }
    } else {
      responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\nType *0* for Menu.`;
    }
  }
  else if (body === '4') {
    responseText = "🏥 *Provider Payment*\nEnter: *ProviderID Amount*\n\n*Verified IDs:* CLINIC101, PHARMA202, DENT303";
  }
  else if (body.startsWith('clinic') || body.startsWith('pharma') || body.startsWith('dent')) {
    const parts = body.split(' ');
    const id = parts[0].toUpperCase();
    const amount = parts[1] || '0';
    const provider = PROVIDERS[id];

    if (provider) {
      responseText = `✅ *Authorized!*\n\n*To:* ${provider.name}\n*Amount:* ${amount} HC\n\n_Purpose-bound: Healthcare Only_`;
    } else {
      responseText = "❌ *Unregistered Provider!* Payments are restricted to verified medical partners.";
    }
  }
  else {
    responseText = "🤔 Type *0* for the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
