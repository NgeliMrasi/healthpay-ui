import { NextResponse } from 'next/server';

// Note: In a stateless Vercel function, we'd usually pull this from Supabase.
// For this demo, we'll simulate the calculation.
let totalBalance = 5000; 

export async function POST(req) {
  const COMPANY = "Body Repair Cartel";
  
  try {
    const formData = await req.formData();
    const from = (formData.get('From') || '').replace('whatsapp:', '');
    const body = formData.get('Body') || '';
    const msg = body.trim().toUpperCase();
    
    let reply = "";

    // 1. ADD STAFF
    if (msg.startsWith('ADD')) {
      const staffNum = msg.replace('ADD', '').trim();
      reply = `👤 *ONBOARDING SUCCESS*\n\nEmployee: ${staffNum}\nCompany: ${COMPANY}\n\nThey are now authorized to spend from the R1,999 Growth Pool.`;
    }

    // 2. REGISTER CLINIC
    else if (msg.startsWith('CLINIC')) {
      const clinicName = msg.replace('CLINIC', '').trim();
      reply = `🏥 *MERCHANT VERIFIED*\n\nClinic: ${clinicName}\nStatus: Whitelisted\n\nReady to receive HC on Stellar Testnet.`;
    }

    // 3. DYNAMIC SPENDING
    else if (msg.startsWith('SPEND')) {
      const amount = parseInt(msg.split(' ')[1]);
      if (!amount || isNaN(amount)) {
        reply = "⚠️ Use: SPEND [Amount]";
      } else {
        // Here we simulate the deduction
        const newBalance = 5000 - amount; 
        reply = `💸 *HEALTHCOIN TRANSFER*\n\nFrom: ${from}\nTo: Whitelisted Merchant\nAmount: ${amount} HC\n\n[STALLAR TESTNET CONFIRMED]\nRemaining Pool: ${newBalance} HC`;
      }
    }

    // 4. CHECK BALANCE
    else if (msg === '1' || msg === 'BALANCE') {
      // In this demo version, we'll show the base pool
      reply = `💰 *${COMPANY} VAULT*\n\nTotal Pool: 5000.00 HC\nStatus: Online\n\nAll HC is purpose-bound to your whitelisted clinics.`;
    }

    else {
      reply = `*HealthPay.Afrika: Closed Loop* 🏥\n\n1: Check Balance\nADD [Number]: Add Staff\nCLINIC [Name]: Onboard Doctor\nSPEND [Amount]: Pay Clinic`;
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message><Body>${reply}</Body></Message></Response>`;
    return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
  } catch (err) {
    return new NextResponse('<Response><Message>Loop Active...</Message></Response>', { headers: { 'Content-Type': 'text/xml' } });
  }
}
