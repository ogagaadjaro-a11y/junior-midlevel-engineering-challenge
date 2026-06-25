import { describe, expect, it } from "vitest";
import { AppError } from "../../mini-app-completion/src/errors";
import { NotificationService } from "../src/notification.service";
import { TransactionRepository } from "../src/transaction.repository";
import { TransactionService } from "../src/transaction.service";

function createService() {
  const repository = new TransactionRepository([
    { id: "wallet-1", userId: "user-1", balance: 1000 }
  ]);
  const notifications = new NotificationService();

  return {
    notifications,
    repository,
    service: new TransactionService(repository, notifications)
  };
}

describe("TransactionService.fundWallet", () => {
  it("does not double-credit a duplicate request", () => {
    const { repository, service } = createService();

    service.fundWallet({
      walletId: "wallet-1",
      amount: 500,
      reference: "ref-001"
    });
    service.fundWallet({
      walletId: "wallet-1",
      amount: 500,
      reference: "ref-001"
    });

    expect(repository.findWalletById("wallet-1")?.balance).toBe(1500);
    expect(repository.listTransactions()).toHaveLength(1);
  });

  it("rejects invalid funding amounts", () => {
    const { service } = createService();

    expect(() =>
      service.fundWallet({
        walletId: "wallet-1",
        amount: 0,
        reference: "ref-invalid"
      })
    ).toThrow(AppError);
  });

  it("rejects unknown wallets", () => {
    const { service } = createService();

    expect(() =>
      service.fundWallet({
        walletId: "missing-wallet",
        amount: 500,
        reference: "ref-missing"
      })
    ).toThrow(AppError);
  });

  it("updates balance once for successful funding", () => {
    const { repository, service } = createService();

    const result = service.fundWallet({
      walletId: "wallet-1",
      amount: 700,
      reference: "ref-002"
    });

    expect(result.balance).toBe(1700);
    expect(repository.findWalletById("wallet-1")?.balance).toBe(1700);
  });

  it("creates one transaction record for a successful request", () => {
    const { repository, service } = createService();

    service.fundWallet({
      walletId: "wallet-1",
      amount: 300,
      reference: "ref-003"
    });

    expect(repository.listTransactions()).toHaveLength(1);
    expect(repository.listTransactions()[0]).toMatchObject({
      walletId: "wallet-1",
      amount: 300,
      reference: "ref-003"
    });
  });

  it("sends one receipt for a duplicate request", () => {
    const { notifications, service } = createService();

    service.fundWallet({
      walletId: "wallet-1",
      amount: 500,
      reference: "ref-004"
    });
    service.fundWallet({
      walletId: "wallet-1",
      amount: 500,
      reference: "ref-004"
    });

    expect(notifications.sentReceipts).toHaveLength(1);
    expect(notifications.sentReceipts[0]).toMatchObject({
      walletId: "wallet-1",
      transactionId: "funding-1"
    });
  });
});
