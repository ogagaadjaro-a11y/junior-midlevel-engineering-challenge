import { AppError } from "./errors";
import { WalletRepository } from "./wallet.repository";
import type { TransferRequest, TransferResult } from "./types";

export class WalletService {
  constructor(private readonly repository = new WalletRepository()) {}

  transfer(input: TransferRequest): TransferResult {
    // TODO: Complete this method.
    // Expected behavior:
    // - validate both wallets exist
    // - reject invalid amounts
    // - reject insufficient funds
    // - update both balances
    // - record and return the transaction summary
    throw new AppError(
      "TRANSFER_NOT_IMPLEMENTED",
      "Transfer logic has not been implemented yet.",
      500
    );
  }
}
