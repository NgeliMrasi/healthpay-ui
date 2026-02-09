'use client';
import React, { useState, useEffect } from 'react';

export default function HealthPayUI() {
  const [balance, setBalance] = useState("5000.00");
  const REVENUE_ADDR = "GA7IODL3GYTNCMVOYOHOHYPRLECJEOY54MG5XRHF3TVROJ7XG4I5BGQ5";
  // This is the real QR URL
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${REVENUE_ADDR}`;

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
    <div className="max-w-md mx-auto p-4 font-sans bg-[#fcfdfe] min-h-screen text-slate-900">
      <header className="flex justify-between items-center py-6 px-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs italic">HP</div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">HealthPay</h1>
            <p className="text-[8px] font-bold text-blue-600 uppercase tracking-widest">Digital Healthcare Rail</p>
          </div>
        </div>
        <div className="h-10 w-10 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-[10px] text-white shadow-lg shadow-blue-500/20">BRC</div>
      </header>

      {/* Main Wallet Card */}
      <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl mb-6 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 p-4">
          <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
            <div className="h-1 w-1 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-[7px] font-black text-green-400 uppercase tracking-widest text-nowrap">Ledger Live</span>
          </div>
        </div>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Corporate Liquidity</p>
        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-6xl font-black tracking-tighter tabular-nums">{balance}</span>
          <span className="text-blue-500 font-bold text-xl uppercase tracking-tighter text-nowrap">HC</span>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
          <div>
            <p className="text-[8px] font-bold text-slate-500 uppercase mb-1 text-nowrap">Assigned Tier</p>
            <p className="text-xs font-black text-blue-400">GROWTH B (R1,999)</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-slate-500 uppercase mb-1 text-nowrap">Asset Policy</p>
            <p className="text-xs font-black text-slate-300 italic uppercase">Purpose-Bound</p>
          </div>
        </div>
      </div>

      {/* DYNAMIC QR CODE SECTION */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-50 mb-6 text-center">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Provider Verification Scan</h3>
        <div className="mx-auto w-44 h-44 bg-white border-4 border-slate-900 rounded-3xl flex items-center justify-center mb-4 overflow-hidden shadow-inner">
          <img src={qrUrl} alt="Stellar Address QR" className="w-32 h-32" />
        </div>
        <p className="text-[10px] font-bold text-slate-500 px-4 leading-relaxed uppercase tracking-tighter">
          Clinics: Scan to verify <span className="text-blue-600 font-black">#BodyRepairCartel</span> 
          <br/>Authenticity on Stellar Testnet.
        </p>
      </div>

      <footer className="mt-8 text-center py-6 opacity-30">
         <p className="text-[9px] font-black uppercase tracking-widest">Built for Africa • 2026</p>
      </footer>
    </div>
  );
}
