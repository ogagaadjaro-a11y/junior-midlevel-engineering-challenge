export type TransactionStatus = "successful" | "pending" | "failed";

export type Transaction = {
  id: string;
  reference: string;
  customerName: string;
  amount: number;
  status: TransactionStatus;
};
