"use client";
import React, { useEffect, useState } from 'react';
import { History, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function TransactionHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Replace with your actual Treasury Public Key
    const treasuryId = 'GC_YOUR_PLATFORM_TREASURY_ADDRESS';
    
    fetch(`https://horizon-testnet.stellar.org/accounts/${treasuryId}/payments?limit=5&order=desc`)
      .then(res => res.json())
      .then(data => {
        if (data._embedded) setHistory(data._embedded.records);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <History className="text-slate-400" size={20} />
        <h3 className="font-bold text-slate-700">Recent Activity</h3>
      </div>
      
      <div className="space-y-3">
        {history.map((tx: any) => (
          <div key={tx.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div>
              <p className="text-xs font-mono text-slate-500">{tx.from.substring(0, 4)}...{tx.from.substring(52)}</p>
              <p className="text-[10px] text-slate-400">{new Date(tx.created_at).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-teal-600">+{tx.amount} HC</p>
              <div className="flex items-center gap-1 justify-end text-[9px] text-emerald-500 font-bold uppercase">
                <CheckCircle2 size={10} /> Verified
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
