#!/bin/bash

# Configuration
STAFF_COUNT=$1
DESTINATION_ADDRESS="GB..." # The HealthPay receiver
ISSUER_ADDRESS="GD..."      # The HealthCoin issuer
ASSET_CODE="HealthCoin"

if [ -z "$STAFF_COUNT" ]; then
    echo "Usage: ./healthpay_calc.sh [number_of_staff]"
    exit 1
fi

# 1. Pricing Logic
if [ $STAFF_COUNT -le 10 ]; then
    TOTAL_ZAR=499
elif [ $STAFF_COUNT -le 150 ]; then
    TOTAL_ZAR=3000 
else
    TOTAL_ZAR=$((STAFF_COUNT * 100))
fi

# 2. Trustline Check & Auto-Fix
echo "Checking Trustline for $ASSET_CODE..."
CHECK_TRUST=$(curl -s "https://horizon-testnet.stellar.org/accounts/$DESTINATION_ADDRESS" | grep "$ASSET_CODE")

if [ -z "$CHECK_TRUST" ]; then
    echo "Missing Trustline. Attempting to create one now..."
    stellar-cli tx trust --asset $ASSET_CODE:$ISSUER_ADDRESS --account my-ssh-key
    echo "Trustline created. Waiting for network to update..."
    sleep 5
fi

# 3. Execute Payment
echo "Sending $TOTAL_ZAR HealthCoin to $DESTINATION_ADDRESS..."
stellar-cli tx send --from my-ssh-key --to $DESTINATION_ADDRESS --asset $ASSET_CODE:$ISSUER_ADDRESS --amount $TOTAL_ZAR

echo "Transaction Complete!"
