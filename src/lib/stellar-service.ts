import * as StellarSdk from '@stellar/stellar-sdk';

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

export async function getAccountBalance(publicKey: string) {
  try {
    const account = await server.loadAccount(publicKey);
    const nativeBalance = account.balances.find((b: any) => b.asset_type === 'native');
    return nativeBalance ? nativeBalance.balance : '0';
  } catch (e) {
    return '0';
  }
}

export async function sendPayment(amount: string, destination: string) {
  const secretKey = process.env.STELLAR_SECRET_KEY;
  if (!secretKey) throw new Error("Missing Secret Key");

  const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
  const sourcePublicKey = sourceKeypair.publicKey();

  try {
    const account = await server.loadAccount(sourcePublicKey);
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: destination,
        asset: StellarSdk.Asset.native(), // We use native XLM as HealthCoin for testnet
        amount: amount,
      }))
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeypair);
    const result = await server.submitTransaction(transaction);
    return result.hash;
  } catch (e: any) {
    console.error("Payment Failed:", e.response?.data || e.message);
    throw e;
  }
}
