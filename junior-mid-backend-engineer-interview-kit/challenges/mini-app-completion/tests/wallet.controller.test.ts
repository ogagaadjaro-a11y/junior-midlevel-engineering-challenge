import type { Express, Request, Response } from "express";
import { describe, expect, it } from "vitest";
import { registerWalletRoutes } from "../src/wallet.controller";
import { WalletRepository } from "../src/wallet.repository";
import { WalletService } from "../src/wallet.service";

type RouteHandler = (request: Request, response: Response) => void;

function createMockApp() {
  const routes = new Map<string, RouteHandler>();
  const app = {
    get(path: string, handler: RouteHandler) {
      routes.set(`GET ${path}`, handler);
    },
    post(path: string, handler: RouteHandler) {
      routes.set(`POST ${path}`, handler);
    }
  } as unknown as Express;

  return { app, routes };
}

function createMockResponse() {
  const response = {
    statusCode: 200,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    }
  };

  return response as Response & { statusCode: number; body: unknown };
}

function createRouteUnderTest() {
  const repository = new WalletRepository([
    { id: "wallet-a", userId: "user-a", balance: 10000 },
    { id: "wallet-b", userId: "user-b", balance: 2500 }
  ]);
  const service = new WalletService(repository);
  const { app, routes } = createMockApp();

  registerWalletRoutes(app, repository, service);

  return routes.get("POST /transfers");
}

describe("wallet routes", () => {
  it("returns a clean transfer response", async () => {
    const handler = createRouteUnderTest();
    const response = createMockResponse();

    handler?.(
      {
        body: {
          fromWalletId: "wallet-a",
          toWalletId: "wallet-b",
          amount: 1500
        }
      } as Request,
      response
    );

    expect(response.statusCode).toBe(201);
    expect((response.body as { transfer: unknown }).transfer).toMatchObject({
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
    const handler = createRouteUnderTest();
    const response = createMockResponse();

    handler?.(
      {
        body: {
          fromWalletId: "wallet-a",
          toWalletId: "wallet-b",
          amount: 0
        }
      } as Request,
      response
    );

    expect(response.statusCode).toBe(400);
    expect((response.body as { error: unknown }).error).toMatchObject({
      code: "INVALID_AMOUNT"
    });
  });
});
