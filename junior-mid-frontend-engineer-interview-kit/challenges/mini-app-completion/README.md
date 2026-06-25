# Mini App Completion: Campaign Dashboard

## Timebox

24 minutes.

## Scenario

An adtech dashboard shows campaign performance data. The starter UI is incomplete.

## Candidate Task

Complete the campaign dashboard so that it:

- Displays a list of campaigns.
- Shows campaign name, status, budget, spend, impressions, and clicks.
- Allows filtering by campaign status.
- Shows only active campaigns when `Active` is selected.
- Shows an empty state when no campaigns match.
- Displays spend percentage.
- Applies a warning label when spend is above 80% of budget.

## Commands

From the repository root:

```bash
npm install
npm run test:mini-app
```

The tests are expected to fail before you complete the TODOs.

## Notes

- Keep the solution component-driven.
- Use the provided in-memory campaign data.
- Prefer accessible labels and clear conditional rendering.
- You do not need to call an external API.
