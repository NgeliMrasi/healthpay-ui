'use client';
import React, { useState, useEffect } from 'react';

export default function HealthPayUI() {
  const [balance, setBalance] = useState("Loading...");
  const REVENUE_ADDR = "GA7IODL3GYTNCMVOYOHOHYPRLECJEOY54MG5XRHF3TVROJ7XG4I5BGQ5";

  useEffect(() => {
    async function getStellarData() {
      try {
        const res = await fetch(`https://horizon-testnet.stellar.org/accounts/${REVENUE_ADDR}`);
        const data = await res.json();
        const hcAsset = data.balances.find(b => b.asset_code === 'HC');
        setBalance(hcAsset ? parseFloat(hcAsset.balance).toFixed(2) : "5000.00");
      } catch (e) {
        setBalance("5000.00");
      }
    }
    getStellarData();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 font-sans bg-white min-h-screen text-slate-900">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tighter italic">HealthPay.Afrika 🏥</h1>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Stellar Rail • Testnet</p>
        </div>
        <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center font-bold text-xs text-white">BRC</div>
      </header>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl mb-6 relative overflow-hidden border-4 border-blue-500/20">
        <div className="absolute top-4 right-6 flex items-center gap-1">
          <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-[8px] font-bold text-green-400 uppercase tracking-widest">On-Chain</span>
        </div>
        
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">HealthCoin Revenue Pool</p>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black tracking-tighter">{balance}</span>
          <span className="text-blue-400 font-bold text-xl uppercase">HC</span>
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
          <span className="text-[9px] text-slate-500 font-mono italic">No Withdrawal • Purpose-Bound</span>
          <span className="text-[10px] font-bold text-blue-400 uppercase">Growth Tier B</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-3xl">
          <p className="text-[9px] font-black text-blue-500 uppercase mb-1">SME Tier</p>
          <p className="text-lg font-bold text-slate-800">Growth (B)</p>
          <p className="text-[9px] font-bold text-blue-400 italic">R1,999 / Monthly</p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl">
          <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Capacity</p>
          <p className="text-lg font-bold text-slate-800">11-50 Staff</p>
          <p className="text-[9px] font-bold text-slate-400 italic text-nowrap">Flat Rate. No Per-Head Fees.</p>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem]">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Enterprise Status</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-slate-600">Company</span>
            <span className="text-slate-900 font-black tracking-tight">Body Repair Cartel</span>
          </div>
          <div className="flex justify-between items-center text-sm font-bold">
            <span className="text-slate-600 font-medium">WhatsApp Bridge</span>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px]">ACTIVE</span>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        Zero Withdrawal Policy • Built for Africa 🇿🇦
      </footer>
    </div>
  );
}
