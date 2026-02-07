import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data of clinics waiting for Rand payout
  const pendingSettlements = [
    {
      provider: "City Central Clinic (CLINIC101)",
      healthcoins_to_redeem: 1500,
      zar_value: "R1,500",
      status: "Pending Verification",
      bank_account: "FNB - ****6789"
    },
    {
      provider: "HealthFirst Pharmacy (PHARMA202)",
      healthcoins_to_redeem: 850,
      zar_value: "R850",
      status: "Ready for Payout",
      bank_account: "Standard Bank - ****1234"
    }
  ];

  const totalPayoutDue = 2350;

  return NextResponse.json({
    admin_action: "Monthly Provider Payouts",
    total_due_zar: `R${totalPayoutDue}`,
    settlements: pendingSettlements,
    disclaimer: "Confirm Stellar transaction hash before releasing bank funds."
  });
}
