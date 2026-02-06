"use client";
import React, { useState } from 'react';
import { Calculator, Users, Coins, CreditCard, Loader2 } from 'lucide-react';

export default function PricingCalculator() {
  const [employees, setEmployees] = useState(10);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const getPricingData = (count: number) => {
    if (count <= 10) return { tier: 'SME', fee: 499, label: 'Flat Monthly Fee' };
    if (count <= 150) {
      const fee = count <= 80 ? 2500 : 5000;
      return { tier: 'Growth', fee: fee, label: 'Stepped Flat Rate' };
    }
    return { tier: 'Corporate', fee: count * 100, label: 'R100 per head' };
  };

  const { tier, fee, label } = getPricingData(employees);

  const handlePayment = async () => {
    setLoading(true);
    setStatus('Processing on Stellar Testnet...');
    
    // In a real app, userSecret would come from a secure input or wallet provider
    const mockSecret = "S...YOUR_TESTNET_SECRET"; 

    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        body: JSON.stringify({ employeeCount: employees, userSecret: mockSecret }),
      });
      const data = await res.json();
      if (data.hash) setStatus(`Success! Hash: ${data.hash.substring(0, 10)}...`);
      else setStatus('Payment failed. Check console.');
    } catch (err) {
      setStatus('Error connecting to network.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-2xl border-2 border-slate-100 mt-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Calculator className="text-teal-600" size={24} />
          <h2 className="text-xl font-bold text-slate-800">HealthPay Profit Calc</h2>
        </div>
        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase">{tier}</span>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-end mb-4">
            <label className="text-sm font-semibold text-slate-500 uppercase">Staff Count</label>
            <span className="text-3xl font-black text-slate-900">{employees}</span>
          </div>
          <input
            type="range" min="1" max="300" value={employees}
            onChange={(e) => setEmployees(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>

        <div className="p-5 bg-slate-900 rounded-2xl text-white">
          <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">{label}</p>
          <div className="flex items-center gap-2 text-3xl font-bold mb-4">
            <Coins className="text-teal-400" />
            <span>{fee.toLocaleString()} HC</span>
          </div>
          
          <button 
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-3 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : <CreditCard size={18} />}
            {loading ? 'Transacting...' : `Pay R${fee.toLocaleString()}`}
          </button>
        </div>
        {status && <p className="text-[10px] text-center text-slate-500 mt-2 font-mono">{status}</p>}
      </div>
    </div>
  );
}
