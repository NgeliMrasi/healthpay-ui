#!/bin/bash
echo "🛡️ SECURITY MODULE: PURSUIT OF BOUND PURPOSE"
echo "Network: STELLAR_TESTNET"
echo "Attempting unauthorized withdrawal to EXTERNAL_WALLET..."
echo "-----------------------------------"
sleep 2

# In a real Stellar environment, this would be handled by 
# SEP-0008 regulated assets or custom smart contracts.
RESULT="REJECTED"

if [ "$RESULT" == "REJECTED" ]; then
    echo "STATUS: [BLOCK] Transaction Terminated."
    echo "REASON: Asset 'HealthCoin' is restricted to MEDICAL_PROVIDERS only."
    echo "COMPLIANCE: Healthcare purpose preserved."
else
    echo "STATUS: [CRITICAL_ERROR] Security logic bypassed."
fi
echo "-----------------------------------"
