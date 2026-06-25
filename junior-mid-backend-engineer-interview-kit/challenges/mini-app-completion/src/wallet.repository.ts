import type { Transaction, Wallet } from "./types";

const defaultWallets: Wallet[] = [
  { id: "wallet-source", userId: "user-1", balance: 10000 },
  { id: "wallet-destination", userId: "user-2", balance: 2500 }
];

export class WalletRepository {
  private readonly wallets = new Map<string, Wallet>();
  private readonly transactions: Transaction[] = [];

  constructor(wallets: Wallet[] = defaultWallets) {
    wallets.forEach((wallet) => {
      this.wallets.set(wallet.id, { ...wallet });
    });
  }

  findWallet(walletId: string): Wallet | undefined {
    return this.wallets.get(walletId);
  }

  updateWalletBalance(walletId: string, balance: number): Wallet {
    const wallet = this.wallets.get(walletId);

    if (!wallet) {
      throw new Error(`Wallet ${walletId} was not found`);
    }

    wallet.balance = balance;
    return wallet;
  }

  createTransaction(input: Omit<Transaction, "id" | "createdAt">): Transaction {
    const transaction: Transaction = {
      ...input,
      id: `txn-${this.transactions.length + 1}`,
      createdAt: new Date().toISOString()
    };

    this.transactions.push(transaction);
    return transaction;
  }

  listTransactionsForWallet(walletId: string): Transaction[] {
    return this.transactions.filter(
      (transaction) =>
        transaction.fromWalletId === walletId || transaction.toWalletId === walletId
    );
  }
}
