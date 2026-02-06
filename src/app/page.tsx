import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <header className="bg-blue-600 py-16 px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">HealthPay.Afrika 🏥</h1>
        <p className="text-xl opacity-90">Purpose-Bound Health Benefits on the Stellar Blockchain.</p>
      </header>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Flexible Pricing for Every SME</h2>
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* SME Tier */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold mb-2">SME</h3>
            <p className="text-slate-500 mb-4">1-10 Employees</p>
            <div className="text-4xl font-bold mb-6">R499<span className="text-lg font-normal text-slate-400">/mo</span></div>
            <ul className="space-y-3 text-sm">
              <li>✅ WhatsApp Dashboard</li>
              <li>✅ Stellar Blockchain Ledger</li>
              <li>✅ Purpose-Bound Rules</li>
            </ul>
          </div>

          {/* Growth Tier */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-500 relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Popular</span>
            <h3 className="text-xl font-bold mb-2">Growth</h3>
            <p className="text-slate-500 mb-4">11-150 Employees</p>
            <div className="text-4xl font-bold mb-6">R2.5k - R5k<span className="text-lg font-normal text-slate-400">/mo</span></div>
            <ul className="space-y-3 text-sm">
              <li>✅ Everything in SME</li>
              <li>✅ Stepped Flat Rates</li>
              <li>✅ Employer Audit API</li>
            </ul>
          </div>

          {/* Corporate Tier */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold mb-2">Corporate</h3>
            <p className="text-slate-500 mb-4">151+ Employees</p>
            <div className="text-4xl font-bold mb-6">R100<span className="text-lg font-normal text-slate-400">/head</span></div>
            <ul className="space-y-3 text-sm">
              <li>✅ Custom Health Rules</li>
              <li>✅ Priority Settlement</li>
              <li>✅ Full API Access</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Footer Branding */}
      <footer className="text-center py-10 text-slate-400 text-sm">
        Built on Stellar Testnet • No Withdrawals • Purpose Bound
      </footer>
    </div>
  );
}
