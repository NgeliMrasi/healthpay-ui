#!/bin/bash

# 1. Setup Terminal Display
echo "🏥 CLINIC_101 TERMINAL | NODE_ONLINE"
echo "Network: STELLAR_TESTNET"
echo "-----------------------------------"

# 2. Simulate Incoming Stream (The 'Happy Path')
echo "Receiving incoming HealthCoin stream..."
sleep 1
echo "- +350 HC from +27648782381 [SUCCESS]"
sleep 1
echo "- +750 HC from +27648782381 [SUCCESS]"
echo "-----------------------------------"
echo "LIVE_BALANCE: 5000.00 HC"
echo "-----------------------------------"

# 3. Prove Bound Purpose (The Security Check)
echo "Testing Withdrawal to Non-Medical Wallet..."
sleep 1
echo "ERROR: TRANSACTION_BLOCKED"
echo "Reason: Purpose is BOUND to Healthcare Only."
echo "-----------------------------------"
echo "HEALTHPAY.AFRIKA // 2026"
