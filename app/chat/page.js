"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function WhatsAppSim() {
  const [balance, setBalance] = useState(500.00);
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div style={{ backgroundColor: '#ece5dd', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Phone Header */}
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#075e54', color: 'white', padding: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: '#128c7e', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>HP</div>
        <div>
          <p style={{ margin: 0, fontWeight: 'bold' }}>HealthPay Afrika Bot</p>
          <p style={{ margin: 0, fontSize: '12px' }}>online</p>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ width: '100%', maxWidth: '400px', flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ alignSelf: 'flex-start', backgroundColor: 'white', padding: '10px', borderRadius: '8px', maxWidth: '80%', fontSize: '14px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
          Welcome back! Tap below to see your current HealthCoin balance.
        </div>

        <button 
          onClick={() => setShowBalance(true)}
          style={{ alignSelf: 'center', padding: '10px 20px', backgroundColor: '#fff', border: '1px solid #128c7e', color: '#128c7e', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Check My Balance
        </button>

        {showBalance && (
          <div style={{ alignSelf: 'flex-start', backgroundColor: 'white', padding: '10px', borderRadius: '8px', maxWidth: '80%', fontSize: '14px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)', borderLeft: '4px solid #128c7e' }}>
            Current Balance: **{balance.toFixed(2)} HC** <br/>
            Status: **Purpose-Bound (Health Only)**
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#f0f0f0', padding: '10px', display: 'flex', gap: '10px', borderTop: '1px solid #ddd' }}>
        <div style={{ flex: 1, backgroundColor: 'white', padding: '10px', borderRadius: '20px', color: '#999', fontSize: '14px' }}>Type "Doctor" to find a GP...</div>
        <div style={{ width: '40px', height: '40px', backgroundColor: '#128c7e', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>🎤</div>
      </div>
      
      <p style={{ margin: '20px 0' }}><Link href="/" style={{ color: '#075e54', fontWeight: 'bold' }}>← Exit Chat</Link></p>
    </div>
  );
}
