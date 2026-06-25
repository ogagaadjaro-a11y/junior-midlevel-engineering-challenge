# Bug Hunt: Duplicate Funding Requests

## Timebox

24 minutes.

## Scenario

A transaction service processes wallet funding requests. In production, some users are being credited twice when they retry the same request.

The code includes realistic bugs around validation and idempotency. Your task is to find and fix the issues while keeping the implementation simple.

## Candidate Task

Fix the funding flow so that:

- Duplicate requests with the same reference do not double-credit the wallet.
- Invalid amounts are rejected.
- Unknown wallets are rejected.
- Successful funding updates the balance once.
- A transaction record is created once for a duplicate request.

## Commands

From the repository root:

```bash
npm install
npm run test:bug-hunt
```

The tests are expected to fail before the bugs are fixed.

## Notes

- Keep money as integer minor units.
- No real database is needed.
- Focus on the order of checks and updates.
- Be ready to explain why retry behavior matters in fintech systems.
