import PricingCalculator from './pricing-calculator';
import TransactionHistory from './transaction-history';
import OnboardingForm from './onboarding-form';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 pb-24">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tighter">
          HealthPay.Afrika <span className="text-teal-600">Portal</span>
        </h1>
        <p className="text-lg text-slate-600 italic">"Simplifying Corporate Health Disbursements"</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="space-y-8">
          <PricingCalculator />
          <TransactionHistory />
        </div>
        <div>
          <OnboardingForm />
          <div className="mt-8 p-6 bg-teal-900 rounded-2xl text-white shadow-lg">
            <h4 className="font-bold mb-2">Corporate Stats</h4>
            <p className="text-teal-200 text-sm">Every new staff member adds 100 HealthCoins to your monthly SaaS fee.</p>
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center text-slate-400 text-sm">
        <p>© 2026 HealthPay Platform • Running on Stellar Testnet</p>
      </footer>
    </main>
  );
}
