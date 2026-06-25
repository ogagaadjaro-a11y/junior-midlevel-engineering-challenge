import request from "supertest";
import { describe, expect, it } from "vitest";
import { createWalletApp } from "../src/app";
import { WalletRepository } from "../src/wallet.repository";

function createAppUnderTest() {
  const repository = new WalletRepository([
    { id: "wallet-a", userId: "user-a", balance: 10000 },
    { id: "wallet-b", userId: "user-b", balance: 2500 }
  ]);

  return createWalletApp(repository);
}

describe("wallet routes", () => {
  it("returns a clean transfer response", async () => {
    const app = createAppUnderTest();

    const response = await request(app).post("/transfers").send({
      fromWalletId: "wallet-a",
      toWalletId: "wallet-b",
      amount: 1500
    });

    expect(response.status).toBe(201);
    expect(response.body.transfer).toMatchObject({
      fromWalletId: "wallet-a",
      toWalletId: "wallet-b",
      amount: 1500,
      balances: {
        fromWallet: 8500,
        toWallet: 4000
      }
    });
  });

  it("returns a meaningful error response", async () => {
    const app = createAppUnderTest();

    const response = await request(app).post("/transfers").send({
      fromWalletId: "wallet-a",
      toWalletId: "wallet-b",
      amount: 0
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatchObject({
      code: "INVALID_AMOUNT"
    });
  });
});
