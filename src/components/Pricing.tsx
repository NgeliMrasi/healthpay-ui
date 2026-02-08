import React from 'react';

const Pricing = () => {
  const tiers = [
    { name: 'SME', price: 'R499', features: ['1-10 Employees', 'WhatsApp Dashboard', 'Stellar Ledger'] },
    { name: 'Growth', price: 'R2.5k - R5k', features: ['11-150 Employees', 'Employer Audit API', 'Stepped Rates'] },
    { name: 'Corporate', price: 'R100/head', features: ['151+ Employees', 'Priority Settlement', 'Full API Access'] }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {tiers.map((tier) => (
        <div key={tier.name} className="p-8 bg-white rounded-3xl border shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
          <p className="text-3xl font-black text-blue-600 mb-6">{tier.price}</p>
          <ul className="space-y-3">
            {tier.features.map(f => <li key={f} className="text-gray-600 text-sm">✅ {f}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Pricing;
