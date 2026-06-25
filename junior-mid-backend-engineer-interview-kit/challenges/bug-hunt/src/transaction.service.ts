import { AppError } from "../../mini-app-completion/src/errors";
import { NotificationService } from "./notification.service";
import { TransactionRepository } from "./transaction.repository";
import type { FundingRequest, FundingResult } from "./types";

export class TransactionService {
  constructor(
    private readonly repository = new TransactionRepository(),
    private readonly notifications = new NotificationService()
  ) {}

  fundWallet(input: FundingRequest): FundingResult {
    const wallet = this.repository.findWalletById(input.walletId);

    if (!wallet) {
      throw new AppError("WALLET_NOT_FOUND", "Wallet was not found.", 404);
    }

    if (input.amount < 0) {
      throw new AppError("INVALID_AMOUNT", "Funding amount must be positive.");
    }

    wallet.balance += input.amount;

    const existingTransaction = this.repository.findTransactionByReference(input.reference);

    if (existingTransaction) {
      return {
        transactionId: existingTransaction.id,
        walletId: wallet.id,
        amount: existingTransaction.amount,
        balance: wallet.balance,
        reference: existingTransaction.reference
      };
    }

    const transaction = this.repository.createFundingTransaction({
      walletId: wallet.id,
      amount: input.amount,
      reference: input.reference
    });

    const receiptWallet = this.repository.findWalletById(input.reference) ?? wallet;
    this.notifications.sendFundingReceipt(receiptWallet.id, transaction.id);

    return {
      transactionId: transaction.id,
      walletId: wallet.id,
      amount: transaction.amount,
      balance: wallet.balance,
      reference: transaction.reference
    };
  }
}
