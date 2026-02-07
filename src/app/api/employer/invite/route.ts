import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orgName = searchParams.get('org') || 'SME_Client';
  
  // Generate a unique code (e.g., SME-7A2B)
  const uniqueId = Math.random().toString(36).substring(2, 6).toUpperCase();
  const inviteCode = `JOIN-${orgName.substring(0, 3).toUpperCase()}-${uniqueId}`;

  return NextResponse.json({
    organization: orgName,
    tier: "SME (R499)",
    invite_code: inviteCode,
    max_staff: 10,
    whatsapp_instructions: `Ask your staff to text "${inviteCode}" to your HealthPay bot number.`,
    status: "Active"
  });
}
