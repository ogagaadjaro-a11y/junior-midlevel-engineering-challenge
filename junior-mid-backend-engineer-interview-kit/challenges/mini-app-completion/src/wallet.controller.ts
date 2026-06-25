import type { Express, Request, Response } from "express";
import { AppError } from "./errors";
import { WalletRepository } from "./wallet.repository";
import { WalletService } from "./wallet.service";

export function registerWalletRoutes(
  app: Express,
  repository: WalletRepository,
  service: WalletService
) {
  app.get("/wallets/:walletId", (request: Request, response: Response) => {
    const wallet = repository.findWallet(request.params.walletId);

    if (!wallet) {
      response.status(404).json({
        error: {
          code: "WALLET_NOT_FOUND",
          message: "Wallet was not found."
        }
      });
      return;
    }

    response.json({ wallet });
  });

  app.get("/wallets/:walletId/transactions", (request: Request, response: Response) => {
    response.json({
      transactions: repository.listTransactionsForWallet(request.params.walletId)
    });
  });

  app.post("/transfers", (request: Request, response: Response) => {
    try {
      const result = service.transfer(request.body);
      response.status(201).json({ transfer: result });
    } catch (error) {
      if (error instanceof AppError) {
        response.status(error.statusCode).json({
          error: {
            code: error.code,
            message: error.message
          }
        });
        return;
      }

      response.status(500).json({
        error: {
          code: "INTERNAL_ERROR",
          message: "Something went wrong."
        }
      });
    }
  });
}
