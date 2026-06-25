export type Wallet = {
  id: string;
  userId: string;
  balance: number;
};

export type Transaction = {
  id: string;
  fromWalletId: string;
  toWalletId: string;
  amount: number;
  createdAt: string;
};

export type TransferRequest = {
  fromWalletId: string;
  toWalletId: string;
  amount: number;
};

export type TransferResult = {
  transactionId: string;
  fromWalletId: string;
  toWalletId: string;
  amount: number;
  balances: {
    fromWallet: number;
    toWallet: number;
  };
};
