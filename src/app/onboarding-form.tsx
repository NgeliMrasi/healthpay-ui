"use client";
import React, { useState } from 'react';
import { UserPlus, FileText, CheckCircle } from 'lucide-react';

export default function OnboardingForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to append to CSV or local state
    setMessage(`Added ${name} to HealthPay Registry!`);
    setName('');
    setAddress('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-xl border border-slate-200">
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="text-teal-600" size={24} />
        <h2 className="text-xl font-bold text-slate-800">Staff Onboarding</h2>
      </div>

      <form onSubmit={handleAddEmployee} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Employee Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Stellar Wallet (G...)</label>
          <input 
            type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="GC..."
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          <FileText size={18} />
          Register for HealthCoin
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle size={14} /> {message}
        </div>
      )}
    </div>
  );
}
