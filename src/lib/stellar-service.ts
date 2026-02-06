import * as StellarSdk from 'stellar-sdk';

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

export async function processSaaSPayment(
  userSecret: string,
  employeeCount: number
) {
  let fee = 0;
  if (employeeCount <= 10) {
    fee = 499; 
  } else if (employeeCount <= 150) {
    fee = employeeCount <= 80 ? 2500 : 5000;
  } else {
    fee = employeeCount * 100;
  }

  const amount = fee.toString();
  const sourceKeys = StellarSdk.Keypair.fromSecret(userSecret);
  const destinationId = 'GC_YOUR_PLATFORM_TREASURY_ADDRESS'; 

  try {
    const account = await server.loadAccount(sourceKeys.publicKey());
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationId,
          asset: StellarSdk.Asset.native(), 
          amount: amount,
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeys);
    const result = await server.submitTransaction(transaction);
    return { success: true, hash: result.hash, amountPaid: fee };
  } catch (error) {
    console.error('Stellar Payment Failed:', error);
    return { success: false, error };
  }
}

export async function getTransactionHistory(accountId: string) {
  try {
    const payments = await server
      .payments()
      .forAccount(accountId)
      .order('desc')
      .limit(10)
      .call();

    return payments.records.map((payment: any) => ({
      id: payment.id,
      amount: payment.amount,
      asset: payment.asset_type === 'native' ? 'HealthCoin' : payment.asset_code,
      from: payment.from,
      created_at: payment.created_at,
    }));
  } catch (error) {
    console.error('Failed to fetch history:', error);
    return [];
  }
}

export async function getAccountBalance(publicKey: string) {
  try {
    const account = await server.loadAccount(publicKey);
    const nativeBalance = account.balances.find((b: any) => b.asset_type === 'native');
    return nativeBalance ? (nativeBalance as any).balance : '0';
  } catch (error) {
    console.error('Balance fetch failed:', error);
    return '0';
  }
}
