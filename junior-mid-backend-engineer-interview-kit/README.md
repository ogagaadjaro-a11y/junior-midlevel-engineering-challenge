# Junior/Mid Backend Engineer Interview Kit

This repository contains three practical backend interview challenges for junior to mid-level engineers. Each challenge is designed to fit a 24-minute interview block and focuses on fundamentals: REST APIs, validation, business logic, error handling, simple data modeling, idempotency, tests, debugging, and communication.

## Challenges

1. `challenges/mini-system-design` - discuss a simple wallet transaction API.
2. `challenges/mini-app-completion` - complete transfer logic for an in-memory wallet service.
3. `challenges/bug-hunt` - debug duplicate wallet funding caused by retry behavior.

## Setup

```bash
npm install
```

## Run Tests

Run all tests:

```bash
npm test
```

Run one coding challenge:

```bash
npm run test:mini-app
npm run test:bug-hunt
```

The app-completion and bug-hunt tests are expected to fail before a candidate completes or fixes the challenge.

## How Interviewers Should Use This Repo

- Pick one challenge for a 24-minute interview block.
- Give the candidate only the candidate-facing challenge directory and root setup instructions.
- Keep `answers/` private. It contains reference solutions, grading notes, and rubrics.
- Spend 2 minutes framing the problem, 18 minutes observing the candidate work, and 4 minutes discussing tradeoffs, tests, and edge cases.
- Evaluate both the final code and the candidate's reasoning while they work.

## How Candidates Should Use This Repo

- Read the root README and the README inside the selected challenge.
- Install dependencies with `npm install`.
- Run the relevant tests before making changes.
- Keep the solution simple, readable, and well-tested.
- Talk through assumptions, edge cases, and tradeoffs.

## Hidden Interviewer Material

Interviewer-only material lives in `answers/`. That directory is listed in `.gitignore` and should not be committed.
