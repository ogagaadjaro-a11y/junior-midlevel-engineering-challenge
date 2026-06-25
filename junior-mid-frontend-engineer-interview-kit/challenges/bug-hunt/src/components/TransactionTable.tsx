import { useState } from "react";
import { TransactionSearch } from "./TransactionSearch";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import type { Transaction, TransactionStatus } from "../types";

type TransactionTableProps = {
  transactions: Transaction[];
};

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [referenceSearch, setReferenceSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<TransactionStatus | "all">("all");

  const visibleTransactions = transactions
    .sort((a, b) => b.amount - a.amount)
    .filter((transaction) =>
      selectedStatus === "all" ? true : transaction.status === selectedStatus
    )
    .filter((transaction) => transaction.reference.includes(referenceSearch));

  return (
    <section className="transaction-dashboard" aria-label="Transactions">
      <TransactionSearch
        reference={referenceSearch}
        status={selectedStatus}
        onReferenceChange={setReferenceSearch}
        onStatusChange={setSelectedStatus}
      />

      <table>
        <thead>
          <tr>
            <th>Reference</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {visibleTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.reference}</td>
              <td>{transaction.customerName}</td>
              <td>{transaction.amount}</td>
              <td>
                <TransactionStatusBadge status={transaction.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
