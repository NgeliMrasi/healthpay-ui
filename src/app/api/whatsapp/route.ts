import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const incomingMessage = body.message?.toLowerCase() || '';
    const userWallet = body.sender_wallet; // Sent by the WA provider (e.g., Twilio/Meta)

    let responseMessage = "";

    if (incomingMessage.includes('balance')) {
      const balance = await getAccountBalance(userWallet);
      responseMessage = `Your current HealthPay balance is: ${balance} HealthCoin. \n\nRemember: This is purpose-bound for medical use only. 🏥`;
    } else if (incomingMessage.includes('hi') || incomingMessage.includes('hello')) {
      responseMessage = "Welcome to HealthPay.Afrika! 🏥\n\nReply with 'Balance' to see your funds or 'Pay' to start a clinic settlement.";
    } else {
      responseMessage = "I'm your HealthPay Assistant. I didn't quite catch that. Try typing 'Balance'.";
    }

    return NextResponse.json({ reply: responseMessage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process WhatsApp request' }, { status: 500 });
  }
}
