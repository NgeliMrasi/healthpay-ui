'use client';
import React, { useEffect, useState } from 'react';
import { getAccountBalance } from '../lib/stellar-service';

const IssuerDashboard = () => {
  const [balance, setBalance] = useState('0.00');
  const REVENUE_ADDR = process.env.NEXT_PUBLIC_REVENUE_ADDRESS || '';

  useEffect(() => {
    if (REVENUE_ADDR) getAccountBalance(REVENUE_ADDR).then(setBalance);
  }, [REVENUE_ADDR]);

  return (
    <div className="p-8 bg-white border rounded-3xl shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Rail Fee Revenue</h3>
      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
        <p className="text-3xl font-mono font-bold text-blue-700">{balance} HC</p>
        <p className="text-xs text-blue-500 uppercase font-bold mt-2">1.5% Transaction Fees</p>
      </div>
    </div>
  );
};

export default IssuerDashboard;
