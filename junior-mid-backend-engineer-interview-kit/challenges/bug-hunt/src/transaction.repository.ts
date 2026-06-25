import type { Transaction, Wallet } from "./types";

const defaultWallets: Wallet[] = [
  { id: "wallet-1", userId: "user-1", balance: 1000 },
  { id: "wallet-2", userId: "user-2", balance: 5000 }
];

export class TransactionRepository {
  private readonly wallets = new Map<string, Wallet>();
  private readonly transactions: Transaction[] = [];

  constructor(wallets: Wallet[] = defaultWallets) {
    wallets.forEach((wallet) => this.wallets.set(wallet.id, { ...wallet }));
  }

  findWalletById(walletId: string): Wallet | undefined {
    return this.wallets.get(walletId);
  }

  findTransactionByReference(reference: string): Transaction | undefined {
    return this.transactions.find((transaction) => transaction.reference === reference);
  }

  createFundingTransaction(input: Omit<Transaction, "id" | "createdAt" | "type">): Transaction {
    const transaction: Transaction = {
      ...input,
      id: `funding-${this.transactions.length + 1}`,
      type: "funding",
      createdAt: new Date().toISOString()
    };

    this.transactions.push(transaction);
    return transaction;
  }

  listTransactions(): Transaction[] {
    return [...this.transactions];
  }
}
