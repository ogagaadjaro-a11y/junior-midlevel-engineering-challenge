# Junior/Mid Frontend Engineer Interview Kit

This repository contains three practical frontend interview challenges for junior to mid-level engineers. Each challenge is designed to fit a 24-minute interview block and focuses on component structure, state, props, forms, async-style UI thinking, loading and error states, conditional rendering, accessibility, debugging, and interaction tests.

## Challenges

1. `challenges/mini-system-design` - discuss a transaction monitoring dashboard.
2. `challenges/mini-app-completion` - complete an adtech campaign list UI.
3. `challenges/bug-hunt` - debug a fintech transaction search and filter table.

## Setup

```bash
npm install
```

## Run The App

```bash
npm run dev
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
- Spend 2 minutes framing the problem, 18 minutes observing the candidate work, and 4 minutes discussing tradeoffs, testing, and accessibility.
- Evaluate both UI behavior and the candidate's reasoning while they work.

## How Candidates Should Use This Repo

- Read the root README and the README inside the selected challenge.
- Install dependencies with `npm install`.
- Run the relevant tests before making changes.
- Keep components small and accessible.
- Talk through state, edge cases, and user impact.

## Hidden Interviewer Material

Interviewer-only material lives in `answers/`. That directory is listed in `.gitignore` and should not be committed.
