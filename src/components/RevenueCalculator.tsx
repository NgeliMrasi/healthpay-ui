'use client';
import React, { useState } from 'react';

const RevenueCalculator = () => {
  const [employees, setEmployees] = useState(200);
  const mrr = employees <= 10 ? 499 : employees <= 150 ? 5000 : employees * 100;

  return (
    <div className="p-8 bg-gray-900 text-white rounded-3xl shadow-xl">
      <h3 className="text-xl font-bold mb-6 text-green-400">Revenue Calculator</h3>
      <input 
        type="range" min="1" max="500" value={employees} 
        onChange={(e) => setEmployees(parseInt(e.target.value))} 
        className="w-full mb-4 accent-green-500"
      />
      <div className="text-center">
        <p className="text-4xl font-bold">R{mrr.toLocaleString()}</p>
        <p className="text-gray-400 text-sm">Monthly Revenue from {employees} Staff</p>
      </div>
    </div>
  );
};

export default RevenueCalculator;
