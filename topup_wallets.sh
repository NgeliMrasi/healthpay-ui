# Load your Public Keys from the .env or enter them manually here
ISSUER_PUB="YOUR_ISSUER_PUBLIC_KEY"
CORP_PUB="YOUR_CORPORATE_PUBLIC_KEY"
REV_PUB="YOUR_REVENUE_PUBLIC_KEY"

echo "🚀 Topping up HealthPay Rails on Stellar Testnet..."

for ADDR in $ISSUER_PUB $CORP_PUB $REV_PUB; do
  echo "Funding $ADDR..."
  curl -s "https://friendbot.stellar.org/?addr=$ADDR" > /dev/null
  echo "✅ Success"
done

echo "🎉 All systems fueled. Ready for the Pitch."
