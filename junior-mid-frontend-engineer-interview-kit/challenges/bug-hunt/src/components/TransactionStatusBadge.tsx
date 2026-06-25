import type { TransactionStatus } from "../types";

type TransactionStatusBadgeProps = {
  status: TransactionStatus;
};

const labelByStatus: Record<TransactionStatus, string> = {
  successful: "Successful",
  pending: "Pending",
  failed: "Failed"
};

const classNameByStatus: Record<TransactionStatus, string> = {
  successful: "badge badge--successful",
  pending: "badge badge--pending",
  failed: "badge badge--successful"
};

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  return <span className={classNameByStatus[status]}>{labelByStatus[status]}</span>;
}
