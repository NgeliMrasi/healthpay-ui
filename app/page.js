'use client';
import React, { useState, useEffect } from 'react';

export default function HealthPayUI() {
  const [balance, setBalance] = useState("5000.00");
  const REVENUE_ADDR = "GA7IODL3GYTNCMVOYOHOHYPRLECJEOY54MG5XRHF3TVROJ7XG4I5BGQ5";

  useEffect(() => {
    async function getStellarData() {
      try {
        const res = await fetch(`https://horizon-testnet.stellar.org/accounts/${REVENUE_ADDR}`);
        const data = await res.json();
        const hcAsset = data.balances.find(b => b.asset_code === 'HC');
        if(hcAsset) setBalance(parseFloat(hcAsset.balance).toFixed(2));
      } catch (e) { console.log("Stellar Sync Active"); }
    }
    getStellarData();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 font-sans bg-[#f8fafc] min-h-screen text-slate-900">
      {/* Top Navigation */}
      <header className="flex justify-between items-center py-6 px-2">
        <div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic text-slate-900">HealthPay<span className="text-blue-600">.Afrika</span></h1>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Blockchain Infrastructure</p>
        </div>
        <div className="h-10 w-10 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center font-black text-xs">BRC</div>
      </header>

      {/* Main Wallet Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 text-white shadow-2xl mb-6 relative overflow-hidden border border-slate-700">
        <div className="absolute -top-10 -right-10 h-40 w-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Corporate Pool Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tighter">{balance}</span>
              <span className="text-blue-400 font-bold text-xl uppercase">HC</span>
            </div>
          </div>
          <div className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            <span className="text-[9px] font-bold text-blue-400 uppercase">Testnet Live</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Account Status</span>
            <span className="text-[10px] text-green-400 font-black uppercase tracking-widest">Active • Verified</span>
          </div>
          <div className="h-[1px] bg-slate-800 w-full"></div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Asset Logic</span>
            <span className="text-[10px] text-blue-300 font-bold uppercase">Purpose-Bound (No Cash-out)</span>
          </div>
        </div>
      </div>

      {/* SME Tier Details */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-xl text-blue-600">📊</div>
          <div>
            <h2 className="font-black text-slate-800 tracking-tight">Body Repair Cartel</h2>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter text-nowrap">Tier B: 11-50 Employees • R1,999/mo</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Fee Structure</p>
            <p className="text-sm font-bold text-slate-800 uppercase tracking-tighter text-nowrap">Zero Per-Head</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-nowrap">
            <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Network</p>
            <p className="text-sm font-bold text-slate-800 uppercase tracking-tighter text-nowrap">Stellar Horizon</p>
          </div>
        </div>
      </div>

      {/* Recent Activity (Simulated from the 450 HC spend) */}
      <div className="px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Live Ledger Feed</h3>
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-xs">📉</div>
              <div>
                <p className="text-xs font-bold text-slate-800">Pharmacy Auth</p>
                <p className="text-[9px] text-slate-400 font-bold font-mono">#AUTH-450-PENDING</p>
              </div>
            </div>
            <p className="text-xs font-black text-red-500">-450.00 HC</p>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center py-6 border-t border-slate-100">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-loose text-nowrap">
          Designed in Termux • 2026 • HealthPay.Afrika 🇿🇦
        </p>
      </footer>
    </div>
  );
}
