import { NextResponse } from 'next/server';

// Mock Database for the Loop (In production, use Supabase)
const MERCHANT_WALLET = "GC...CLINIC_ADDR"; 

export async function POST(req) {
  try {
    const formData = await req.formData();
    const from = (formData.get('From') || '').replace('whatsapp:', '');
    const body = formData.get('Body') || '';
    const msg = body.trim().toUpperCase();
    
    let reply = "";

    // --- 1. SME/EMPLOYEE ONBOARDING ---
    if (msg.startsWith('ADD')) {
      const staffNum = msg.replace('ADD', '').trim();
      reply = `👤 *ONBOARDING SUCCESS*\n\nEmployee: ${staffNum}\nCompany: Body Repair Cartel\nTier: Growth B\n\nThey can now check balance by texting '1'.`;
    }

    // --- 2. MERCHANT ONBOARDING ---
    else if (msg.startsWith('CLINIC')) {
      const clinicName = msg.replace('CLINIC', '').trim();
      reply = `🏥 *MERCHANT VERIFIED*\n\nClinic: ${clinicName}\nStatus: Whitelisted\n\nYou are now authorized to accept HealthCoin (HC).`;
    }

    // --- 3. DISBURSEMENT / SPENDING ---
    else if (msg.startsWith('SPEND')) {
      const amount = msg.split(' ')[1];
      if (!amount || isNaN(amount)) {
        reply = "⚠️ Format: SPEND [Amount]";
      } else {
        // In a real loop, this triggers a Stellar Transaction
        reply = `💸 *HEALTHCOIN TRANSFER*\n\nFrom: ${from}\nTo: Whitelisted Merchant\nAmount: ${amount} HC\n\n[STALLAR TESTNET CONFIRMED]`;
      }
    }

    // --- 4. STATUS/BALANCE ---
    else if (msg === '1' || msg === 'BALANCE') {
      reply = `💰 *CORPORATE VAULT*\n\nEntity: Body Repair Cartel\nAvailable: 5000.00 HC\n\nAll funds are Purpose-Bound.`;
    }

    // --- MAIN MENU ---
    else {
      reply = `*HealthPay.Afrika: Closed Loop* 🏥\n\n*SME:* ADD [Number]\n*MERCHANT:* CLINIC [Name]\n*SPEND:* SPEND [Amount]\n*CHECK:* 1`;
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message><Body>${reply}</Body></Message></Response>`;
    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
  } catch (err) {
    return new NextResponse('<Response><Message>Loop Active...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
