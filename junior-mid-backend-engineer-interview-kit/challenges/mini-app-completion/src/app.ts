import express from "express";
import { registerWalletRoutes } from "./wallet.controller";
import { WalletRepository } from "./wallet.repository";
import { WalletService } from "./wallet.service";

export function createWalletApp(repository = new WalletRepository()) {
  const app = express();
  const service = new WalletService(repository);

  app.use(express.json());
  registerWalletRoutes(app, repository, service);

  return app;
}
