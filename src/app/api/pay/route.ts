import { NextResponse } from 'next/server';
import { processSaaSPayment } from '../../../lib/stellar-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, destination } = body;

    const result = await processSaaSPayment(amount, destination);
    
    return NextResponse.json({ 
      success: true, 
      txHash: result.txHash 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
