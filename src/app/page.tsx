import React from 'react';
import { Activity, Users, ShieldCheck, Wallet, ArrowUpRight } from 'lucide-react';

export default function HealthPayDashboard() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-6">
      {/* Navigation */}
      <nav className="flex justify-between items-center max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-slate-950 text-xl">Ħ</div>
          <span className="text-xl font-semibold tracking-tight">HealthPay.Afrika</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-slate-500 font-mono">STELLAR TESTNET</span>
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        {/* Top Tier Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="HealthCoin Balance" value="842,000 HC" sub="+$12.4k this month" icon={<Wallet className="text-teal-400" />} />
          <StatCard title="Active Employees" value="8 / 10" sub="Tier 1 Plan" icon={<Users className="text-teal-400" />} />
          <StatCard title="Monthly SaaS Fee" value="R499.00" sub="Flat rate applied" icon={<Activity className="text-teal-400" />} />
          <StatCard title="Security Status" value="Verified" sub="SSH Key Active" icon={<ShieldCheck className="text-teal-400" />} />
        </div>

        {/* Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded-2xl p-8 hover:border-teal-500/30 transition-all">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              Recent Disbursements <ArrowUpRight size={18} className="text-slate-500" />
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-[#1e293b]/50 rounded-xl border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700"></div>
                    <div>
                      <p className="font-medium">Employee_{i}294</p>
                      <p className="text-xs text-slate-500">Stellar Address: GDQ...{i}X9</p>
                    </div>
                  </div>
                  <span className="text-teal-400 font-mono font-bold">+50.00 HC</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/20 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
              <Activity className="text-teal-400" size={32} />
            </div>
            <h3 className="text-lg font-bold">Bulk Distribution</h3>
            <p className="text-sm text-slate-400 mt-2 mb-6">Drop your staff CSV to mint and send HealthCoins instantly.</p>
            <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-teal-500/20">
              Launch Minting Process
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, sub, icon }: any) {
  return (
    <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl">
      <div className="flex justify-between items-start mb-4">
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        {icon}
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </div>
  );
}
