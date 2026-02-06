"use client";
import React, { useState } from 'react';
import { Calculator, Users, Coins } from 'lucide-react';

export default function PricingCalculator() {
  const [employees, setEmployees] = useState(10);
  
  const getPricingData = (count: number) => {
    // SME Tier: 1-10 staff
    if (count <= 10) {
      return { tier: 'SME', fee: 499, label: 'Flat Monthly Fee' };
    }
    // Growth Tier: 11-150 staff
    if (count <= 150) {
      const fee = count <= 80 ? 2500 : 5000;
      return { tier: 'Growth', fee: fee, label: 'Stepped Flat Rate' };
    }
    // Corporate Tier: 151+ staff
    return { tier: 'Corporate', fee: count * 100, label: 'R100 per head' };
  };

  const { tier, fee, label } = getPricingData(employees);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-2xl border-2 border-slate-100 mt-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Calculator className="text-teal-600" size={24} />
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">HealthPay Profit Calc</h2>
        </div>
        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase">
          {tier}
        </span>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-end mb-4">
            <label className="text-sm font-semibold text-slate-500 uppercase">Staff Count</label>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">{employees}</span>
              <Users size={16} className="text-slate-400" />
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="300"
            value={employees}
            onChange={(e) => setEmployees(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>

        <div className="p-5 bg-slate-900 rounded-2xl text-white">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
          <div className="flex items-center gap-2 text-3xl font-bold mb-4">
            <Coins className="text-teal-400" />
            <span>{fee.toLocaleString()} HealthCoins</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">ZAR Equivalent</p>
              <p className="text-lg font-semibold text-slate-200">R{fee.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Revenue Type</p>
              <p className="text-sm font-semibold text-teal-400 italic">Recurring MRR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
