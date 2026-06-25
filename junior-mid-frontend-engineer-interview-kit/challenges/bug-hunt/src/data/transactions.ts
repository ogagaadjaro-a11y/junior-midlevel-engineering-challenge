import type { Transaction } from "../types";

export const transactions: Transaction[] = [
  {
    id: "transaction-1",
    reference: "TX-1001",
    customerName: "Amina Yusuf",
    amount: 12500,
    status: "successful"
  },
  {
    id: "transaction-2",
    reference: "TX-1002",
    customerName: "Chinedu Okoro",
    amount: 8800,
    status: "failed"
  },
  {
    id: "transaction-3",
    reference: "TX-1003",
    customerName: "Maya Chen",
    amount: 22000,
    status: "pending"
  }
];
