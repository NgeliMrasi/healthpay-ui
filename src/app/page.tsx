import Pricing from '../components/Pricing';
import RevenueCalculator from '../components/RevenueCalculator';
import IssuerDashboard from '../components/IssuerDashboard';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="p-6 bg-white border-b">
        <h1 className="text-2xl font-bold text-blue-600">HealthPay.Afrika 🏥</h1>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-4">
        <header className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Purpose-Bound Health Benefits</h2>
          <p className="text-xl text-gray-600">Built on the Stellar Blockchain. No Withdrawals. Pure Utility.</p>
        </header>

        <Pricing />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <RevenueCalculator />
          <IssuerDashboard />
        </div>

        <footer className="mt-20 py-10 border-t text-center text-gray-400">
          <p>© 2026 HealthPay.Afrika • Built on Stellar Testnet</p>
          <Link href="/admin/mint" className="text-xs mt-4 block hover:text-blue-500">
            Internal: Access Minting Console →
          </Link>
        </footer>
      </div>
    </main>
  );
}
