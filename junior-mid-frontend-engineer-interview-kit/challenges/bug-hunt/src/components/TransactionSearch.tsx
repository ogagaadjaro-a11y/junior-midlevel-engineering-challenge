import type { TransactionStatus } from "../types";

type TransactionSearchProps = {
  reference: string;
  status: TransactionStatus | "all";
  onReferenceChange: (value: string) => void;
  onStatusChange: (value: TransactionStatus | "all") => void;
};

export function TransactionSearch({
  reference,
  status,
  onReferenceChange,
  onStatusChange
}: TransactionSearchProps) {
  return (
    <div className="toolbar">
      <label>
        Search reference
        <input
          value={reference}
          onChange={(event) => onReferenceChange(event.target.value)}
          placeholder="TX-1001"
        />
      </label>

      <label>
        Filter status
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as TransactionStatus | "all")
          }
        >
          <option value="all">All</option>
          <option value="successful">Successful</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </label>
    </div>
  );
}
