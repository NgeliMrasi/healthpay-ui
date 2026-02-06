import { NextResponse } from 'next/server';
import { processSaaSPayment } from '@/lib/stellar-service';

export async function POST(request: Request) {
  const body = await request.json();
  const { employeeCount, userSecret } = body;

  const result = await processSaaSPayment(userSecret, employeeCount);

  if (result.success) {
    return NextResponse.json({ 
      message: 'Payment Successful', 
      hash: result.hash,
      amount: result.amountPaid 
    });
  } else {
    return NextResponse.json({ error: 'Payment Failed' }, { status: 500 });
  }
}
