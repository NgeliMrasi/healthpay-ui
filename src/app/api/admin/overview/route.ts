import { NextResponse } from 'next/server';

export async function GET() {
  // In a real DB, we would count actual records. 
  // For now, let's use your business logic to project revenue.
  const activeSMEs = 1; // SuperCare
  const totalEmployeesInSystem = 10; 

  // Pricing Logic
  const smeSubscriptionRevenue = activeSMEs * 499; // [cite: 2026-02-01]
  const saasEmployeeFees = totalEmployeesInSystem * 150; // [cite: 2026-01-17]
  const totalMonthlyRevenue = smeSubscriptionRevenue + saasEmployeeFees;

  return NextResponse.json({
    platform_name: "HealthPay.Afrika Master Admin",
    network: "Stellar Testnet", // [cite: 2025-09-16]
    stats: {
      active_companies: activeSMEs,
      total_employees: totalEmployeesInSystem,
      system_currency: "HealthCoin" // [cite: 2025-11-23]
    },
    financials: {
      sme_subs: `R${smeSubscriptionRevenue}`,
      saas_fees: `R${saasEmployeeFees}`,
      total_mrr: `R${totalMonthlyRevenue}`,
      annual_run_rate: `R${totalMonthlyRevenue * 12}`
    },
    compliance: {
      withdrawal_allowed: false, // [cite: 2026-02-06]
      purpose_bound: "Healthcare Only"
    }
  });
}
