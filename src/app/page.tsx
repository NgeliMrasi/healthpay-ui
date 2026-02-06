import PricingCalculator from './pricing-calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          HealthPay Revenue Portal
        </h1>
        <p className="text-lg text-slate-600">
          Calculate your monthly recurring revenue (MRR) based on staff tiers.
        </p>
      </div>

      <PricingCalculator />

      <footer className="mt-20 text-center text-slate-400 text-sm">
        <p>© 2026 HealthPay Platform • Powered by HealthCoin</p>
      </footer>
    </main>
  );
}
