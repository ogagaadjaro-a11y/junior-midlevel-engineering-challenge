import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TransactionTable } from "../src/components/TransactionTable";
import { transactions } from "../src/data/transactions";
import type { Transaction } from "../src/types";

describe("TransactionTable", () => {
  it("searches references case-insensitively", async () => {
    const user = userEvent.setup();
    render(<TransactionTable transactions={[...transactions]} />);

    await user.type(screen.getByLabelText("Search reference"), "tx-1001");

    expect(screen.getByText("TX-1001")).toBeInTheDocument();
    expect(screen.queryByText("TX-1002")).not.toBeInTheDocument();
  });

  it("does not mutate the original transaction list while filtering", () => {
    const localTransactions: Transaction[] = [
      {
        id: "local-1",
        reference: "TX-A",
        customerName: "Customer A",
        amount: 100,
        status: "successful"
      },
      {
        id: "local-2",
        reference: "TX-B",
        customerName: "Customer B",
        amount: 900,
        status: "failed"
      }
    ];

    render(<TransactionTable transactions={localTransactions} />);

    expect(localTransactions.map((transaction) => transaction.reference)).toEqual([
      "TX-A",
      "TX-B"
    ]);
  });

  it("renders failed transactions with the failed badge style", () => {
    render(<TransactionTable transactions={[...transactions]} />);

    const failedRow = screen.getByText("Chinedu Okoro").closest("tr");

    expect(failedRow).not.toBeNull();
    expect(within(failedRow as HTMLTableRowElement).getByText("Failed")).toHaveClass(
      "badge--failed"
    );
  });

  it("shows an empty state when no result matches", async () => {
    const user = userEvent.setup();
    render(<TransactionTable transactions={[...transactions]} />);

    await user.type(screen.getByLabelText("Search reference"), "not-found");

    expect(screen.getByText(/no transactions found/i)).toBeInTheDocument();
  });

  it("clearing search restores the full list", async () => {
    const user = userEvent.setup();
    render(<TransactionTable transactions={[...transactions]} />);

    const input = screen.getByLabelText("Search reference");
    await user.type(input, "TX-1001");
    await user.clear(input);

    expect(screen.getByText("TX-1001")).toBeInTheDocument();
    expect(screen.getByText("TX-1002")).toBeInTheDocument();
    expect(screen.getByText("TX-1003")).toBeInTheDocument();
  });
});
