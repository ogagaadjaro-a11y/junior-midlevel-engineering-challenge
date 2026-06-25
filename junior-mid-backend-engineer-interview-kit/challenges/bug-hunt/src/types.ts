export type Wallet = {
  id: string;
  userId: string;
  balance: number;
};

export type FundingRequest = {
  walletId: string;
  amount: number;
  reference: string;
};

export type Transaction = {
  id: string;
  walletId: string;
  amount: number;
  reference: string;
  type: "funding";
  createdAt: string;
};

export type FundingResult = {
  transactionId: string;
  walletId: string;
  amount: number;
  balance: number;
  reference: string;
};
