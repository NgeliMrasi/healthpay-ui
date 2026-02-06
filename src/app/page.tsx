import PricingCalculator from './pricing-calculator';
import TransactionHistory from './transaction-history';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tighter">
          HealthPay.Afrika <span className="text-teal-600">Portal</span>
        </h1>
        <p className="text-lg text-slate-600">2026 Corporate Disbursement & Revenue Management</p>
      </div>

      <PricingCalculator />
      <TransactionHistory />

      <footer className="mt-20 text-center text-slate-400 text-sm">
        <p>© 2026 HealthPay Platform • Running on Stellar Testnet</p>
      </footer>
    </main>
  );
}
