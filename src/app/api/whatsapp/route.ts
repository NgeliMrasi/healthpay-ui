import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

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
      responseText = "🔋 *Wallet Empty!* Requesting test HealthCoins from the network... Please wait 5 seconds and check again.";
      // Automatic funding trigger
      fetch(`https://horizon-testnet.stellar.org/friendbot?addr=${testAddress}`);
    } else {
      responseText = `💰 *Health Balance*\n\nAvailable: *${bal} HealthCoins*\n\nType *0* for Menu.`;
    }
  }
  else if (body === '4') {
    responseText = "🏥 *Provider Payment*\nEnter: *ProviderID Amount*\n_Example: CLINIC101 50_";
  }
  else if (body.startsWith('clinic')) {
    const parts = body.split(' ');
    const amount = parts[1] || '0';
    responseText = `✅ *Payment Authorized*\n\nSending *${amount} HealthCoins* to medical provider. This transaction is purpose-bound and recorded on the blockchain.`;
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
