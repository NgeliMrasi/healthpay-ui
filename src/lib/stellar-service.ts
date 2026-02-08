import * as StellarSdk from '@stellar/stellar-sdk';

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

/**
 * Fetches HealthCoin balance for any given public key
 */
export async function getAccountBalance(publicKey: string) {
    try {
        const account = await server.loadAccount(publicKey);
        const healthCoin = account.balances.find((b: any) => b.asset_code === 'HealthCoin');
        return healthCoin ? healthCoin.balance : '0.0000000';
    } catch (error) {
        console.error('Error fetching balance:', error);
        return '0.0000000';
    }
}

/**
 * HealthPay Rail Logic
 * Purpose-bound HealthCoin payments with a 1.5% fee
 */
export async function processSaaSPayment(amount: string, destination: string) {
    const sourceSecret = process.env.HEALTHPAY_SOURCE_SECRET; 
    const issuerAddress = process.env.NEXT_PUBLIC_ISSUER_ADDRESS;
    const healthPayFeeWallet = process.env.HEALTHPAY_REVENUE_WALLET;

    if (!sourceSecret || !issuerAddress || !healthPayFeeWallet) {
        throw new Error("Missing environment variables for Stellar Rail");
    }

    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecret);
    const totalAmount = parseFloat(amount);
    const railFee = (totalAmount * 0.015).toFixed(7);
    const merchantNet = (totalAmount - parseFloat(railFee)).toFixed(7);

    try {
        const account = await server.loadAccount(sourceKeypair.publicKey());
        const transaction = new StellarSdk.TransactionBuilder(account, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
        .addOperation(StellarSdk.Operation.payment({
            destination: destination,
            asset: new StellarSdk.Asset('HealthCoin', issuerAddress),
            amount: merchantNet,
        }))
        .addOperation(StellarSdk.Operation.payment({
            destination: healthPayFeeWallet,
            asset: new StellarSdk.Asset('HealthCoin', issuerAddress),
            amount: railFee,
        }))
        .setTimeout(30)
        .build();

        transaction.sign(sourceKeypair);
        const result = await server.submitTransaction(transaction);
        return { success: true, txHash: result.hash };
    } catch (error) {
        console.error('Stellar Rail Error:', error);
        throw error;
    }
}

// Alias for flexibility
export const sendPayment = processSaaSPayment;
