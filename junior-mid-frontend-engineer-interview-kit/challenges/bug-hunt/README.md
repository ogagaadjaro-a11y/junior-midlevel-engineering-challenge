# Bug Hunt: Transaction Search And Status Table

## Timebox

24 minutes.

## Scenario

A fintech transaction dashboard has a search and filter table. Users report that search results are wrong and status badges sometimes show the wrong status.

The code includes realistic junior/mid-level bugs around filtering, mutation, empty states, and visual status mapping.

## Candidate Task

Find and fix the bugs so that:

- Search is case-insensitive.
- Filtering does not mutate the original transaction list.
- Failed transactions render the correct badge style.
- Empty state appears when no result is found.
- Clearing search restores the full list.

## Commands

From the repository root:

```bash
npm install
npm run test:bug-hunt
```

The tests are expected to fail before the bugs are fixed.

## Notes

- Keep the components small.
- Do not change the test intent.
- Be ready to explain how the bug affects operations users.
