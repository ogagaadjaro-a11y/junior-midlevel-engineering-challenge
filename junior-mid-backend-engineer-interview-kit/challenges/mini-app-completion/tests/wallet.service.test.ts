import { describe, expect, it } from "vitest";
import { AppError } from "../src/errors";
import { WalletRepository } from "../src/wallet.repository";
import { WalletService } from "../src/wallet.service";

function createService() {
  const repository = new WalletRepository([
    { id: "wallet-a", userId: "user-a", balance: 10000 },
    { id: "wallet-b", userId: "user-b", balance: 2500 }
  ]);

  return {
    repository,
    service: new WalletService(repository)
  };
}

describe("WalletService.transfer", () => {
  it("transfers money between two wallets", () => {
    const { service } = createService();

    const result = service.transfer({
      fromWalletId: "wallet-a",
      toWalletId: "wallet-b",
      amount: 1500
    });

    expect(result).toMatchObject({
      fromWalletId: "wallet-a",
      toWalletId: "wallet-b",
      amount: 1500,
      balances: {
        fromWallet: 8500,
        toWallet: 4000
      }
    });
    expect(result.transactionId).toBe("txn-1");
  });

  it("rejects transfers with insufficient balance", () => {
    const { service } = createService();

    expect(() =>
      service.transfer({
        fromWalletId: "wallet-b",
        toWalletId: "wallet-a",
        amount: 3000
      })
    ).toThrow(AppError);
  });

  it("rejects invalid transfer amounts", () => {
    const { service } = createService();

    expect(() =>
      service.transfer({
        fromWalletId: "wallet-a",
        toWalletId: "wallet-b",
        amount: 0
      })
    ).toThrow(AppError);
  });

  it("rejects unknown source wallets", () => {
    const { service } = createService();

    expect(() =>
      service.transfer({
        fromWalletId: "missing-wallet",
        toWalletId: "wallet-b",
        amount: 1000
      })
    ).toThrow(AppError);
  });

  it("rejects unknown destination wallets", () => {
    const { service } = createService();

    expect(() =>
      service.transfer({
        fromWalletId: "wallet-a",
        toWalletId: "missing-wallet",
        amount: 1000
      })
    ).toThrow(AppError);
  });

  it("updates balances after a successful transfer", () => {
    const { repository, service } = createService();

    service.transfer({
      fromWalletId: "wallet-a",
      toWalletId: "wallet-b",
      amount: 2000
    });

    expect(repository.findWallet("wallet-a")?.balance).toBe(8000);
    expect(repository.findWallet("wallet-b")?.balance).toBe(4500);
  });

  it("records transaction history for both wallets", () => {
    const { repository, service } = createService();

    service.transfer({
      fromWalletId: "wallet-a",
      toWalletId: "wallet-b",
      amount: 1200
    });

    expect(repository.listTransactionsForWallet("wallet-a")).toHaveLength(1);
    expect(repository.listTransactionsForWallet("wallet-b")).toHaveLength(1);
    expect(repository.listTransactionsForWallet("wallet-a")[0]).toMatchObject({
      fromWalletId: "wallet-a",
      toWalletId: "wallet-b",
      amount: 1200
    });
  });
});
