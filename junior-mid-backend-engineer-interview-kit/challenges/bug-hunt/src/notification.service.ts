export class NotificationService {
  readonly sentReceipts: Array<{ walletId: string; transactionId: string }> = [];

  sendFundingReceipt(walletId: string, transactionId: string) {
    this.sentReceipts.push({ walletId, transactionId });
  }
}
