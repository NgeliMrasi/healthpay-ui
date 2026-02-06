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
  
  // YOUR FUNDED ACCOUNT FROM STELLAREXPERT
  const activeWallet = 'GDVCG3IELCSBMESPQSS7CUTMO7CQ7RYSC2OTQO3IMINRNGMG26NIJ3KM';

  let responseText = "";

  if (body === 'hi' || body === 'menu' || body === '0') {
    responseText = "🏥 *HealthPay.Afrika*\n\n1. *Balance*\n2. *History*\n3. *Info*\n4. *Pay Provider*\n\nReply with a number.";
  } 
  else if (body === '1') {
    const bal = await getAccountBalance(activeWallet);
    responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\n_Purpose-bound: Healthcare Only_`;
  }
  else if (body === '4') {
    responseText = "🏥 *Provider Payment*\nEnter: *ProviderID Amount*\n\n*Verified IDs:* CLINIC101, PHARMA202, DENT303";
  }
  else if (body.startsWith('clinic') || body.startsWith('pharma')) {
    const parts = body.split(' ');
    const id = parts[0].toUpperCase();
    const amount = parts[1] || '0';
    const provider = PROVIDERS[id];

    if (provider) {
      responseText = `✅ *Payment Authorized*\n\n*To:* ${provider.name}\n*Amount:* ${amount} HC\n\n_Status: Processing on Stellar..._`;
    } else {
      responseText = "❌ *Unregistered Provider!*";
    }
  }
  else {
    responseText = "🤔 Type *0* for the menu.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${responseText}</Message></Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
}
