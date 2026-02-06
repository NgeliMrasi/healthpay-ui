"use client";
import React, { useState } from 'react';
import { UserPlus, Send, CheckCircle, Loader2 } from 'lucide-react';

export default function OnboardingForm() {
  const [employees, setEmployees] = useState([
    { name: 'Alice Zulu', address: 'GD2...123', amount: '50' },
    { name: 'Bob Khumalo', address: 'GB4...456', amount: '50' }
  ]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleBatchPay = async () => {
    setLoading(true);
    setStatus('Executing Batch Disbursement on Testnet...');
    
    // Simulate API call to the Stellar Batch Service
    setTimeout(() => {
      setStatus(`Success! Paid ${employees.length} staff members.`);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-xl border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <UserPlus className="text-teal-600" size={24} />
          <h2 className="text-xl font-bold text-slate-800">Staff Registry</h2>
        </div>
        <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">
          {employees.length} Staff
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {employees.map((emp, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg text-sm">
            <span className="font-medium text-slate-700">{emp.name}</span>
            <span className="font-mono text-[10px] text-slate-400">{emp.address.substring(0,8)}...</span>
          </div>
        ))}
      </div>

      <button 
        onClick={handleBatchPay}
        disabled={loading}
        className="w-full py-4 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
        {loading ? 'Processing Batch...' : 'DISBURSE HEALTHCOINS'}
      </button>

      {status && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-[10px] font-mono rounded-lg flex items-center gap-2">
          <CheckCircle size={14} /> {status}
        </div>
      )}
    </div>
  );
}
