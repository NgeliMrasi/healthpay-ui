import PricingCalculator from './pricing-calculator';
import TransactionHistory from './transaction-history';
import OnboardingForm from './onboarding-form';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 pb-20">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tighter">
          HealthPay.Afrika <span className="text-teal-600">Portal</span>
        </h1>
        <p className="text-md text-slate-600">2026 Revenue & Disbursement Management</p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Revenue & History */}
        <div className="space-y-6">
          <PricingCalculator />
          <TransactionHistory />
        </div>

        {/* Right Column: Onboarding & Batch Actions */}
        <div className="space-y-6">
          <OnboardingForm />
          
          {/* Summary Card */}
          <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl">
            <h4 className="font-bold text-teal-400 mb-2">Platform Summary</h4>
            <div className="text-sm space-y-2 opacity-90">
              <p>• SME Tier: R499 (1-10 staff)</p>
              <p>• Growth Tier: Stepped (11-150 staff)</p>
              <p>• Corporate Tier: R100/head (151+ staff)</p>
            </div>
          </div>
        </div>

      </div>

      <footer className="mt-16 text-center text-slate-400 text-xs">
        <p>© 2026 HealthPay Platform • Powered by HealthCoin & Stellar Testnet</p>
      </footer>
    </main>
  );
}
