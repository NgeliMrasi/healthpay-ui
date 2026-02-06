import { NextResponse } from 'next/server';
// Using relative path to bypass alias issues
import { processSaaSPayment } from '../../../lib/stellar-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { employeeCount, userSecret } = body;
    const result = await processSaaSPayment(userSecret, employeeCount);

    if (result.success) {
      return NextResponse.json({ 
        message: 'Payment Successful', 
        hash: result.hash,
        amount: result.amountPaid 
      });
    }
    return NextResponse.json({ error: 'Payment Failed' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
