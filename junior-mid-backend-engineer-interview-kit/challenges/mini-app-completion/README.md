# Mini App Completion: Wallet Transfer

## Timebox

24 minutes.

## Scenario

A simple fintech wallet service allows users to transfer money between wallets. Money is stored as integer minor units, such as cents or kobo.

The starter code includes an Express app, an in-memory repository, and tests. The transfer logic is incomplete.

## Candidate Task

Complete the wallet transfer logic so that it:

- Validates the source wallet exists.
- Validates the destination wallet exists.
- Rejects invalid transfer amounts.
- Rejects insufficient balance.
- Debits the source wallet.
- Credits the destination wallet.
- Records a transaction.
- Returns a clean response.
- Makes the tests pass.

## Commands

From the repository root:

```bash
npm install
npm run test:mini-app
```

The tests are expected to fail before you complete the TODOs.

## Notes

- Keep the implementation small and readable.
- You may add helper functions if they improve clarity.
- You do not need a real database or external service.
- Prefer meaningful errors over generic failures.
