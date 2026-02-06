import { NextResponse } from 'next/server';
import { getAccountBalance } from '../../../lib/stellar-service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const providerId = searchParams.get('id')?.toUpperCase();

  // In a real app, this address would be the Clinic's specific Stellar Public Key
  const PROVIDER_WALLETS: Record<string, string> = {
    'CLINIC101': 'GDVCG3IELCSBMESPQSS7CUTMO7CQ7RYSC2OTQO3IMINRNGMG26NIJ3KM', 
    'PHARMA202': 'GA...SOME_OTHER_ADDRESS'
  };

  if (!providerId || !PROVIDER_WALLETS[providerId]) {
    return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
  }

  const address = PROVIDER_WALLETS[providerId];
  const balance = await getAccountBalance(address);

  return NextResponse.json({
    provider: providerId,
    verified: true,
    totalHealthCoinsCollected: balance,
    currency: 'HealthCoin (HC)',
    redemptionValue: `R${balance}`, // 1:1 ratio
    status: 'Active'
  });
}
