# Day 2 Notes

## What this system does
This script calculates daily business revenue from a list of appointments.

## Input
- An array of appointment objects
- Each appointment has a client name and price

## Process
- Uses `reduce()` to sum all appointment prices
- Validates data to avoid errors
- Formats the total as currency

## Output
- Logs total daily revenue as a number and formatted USD

## Why this matters
This same pattern applies to:
- Payroll
- Invoicing
- Sales reports
- Automation systems
## Day 3 – Modules & Separation of Concerns

I split the system into modules:
- data (appointments)
- services (business logic)
- utils (formatting)
- index.js (wiring)

This makes the system easier to test, change, and reuse.
## Day 4 – Configuration and Flexibility

Before today, numbers were hard-coded.

Today I added a config file and passed it into the system so those values aren’t stuck in the code.

I don’t 100% understand it yet, but now those numbers are flexible and easy to change.
## Day 5 – Testing & Trust

Today I added automated tests for the revenue system.

What I learned:
- Tests let me verify business logic instead of guessing
- I can run all tests with `node --test` or `npm test`
- Tests protect the system when code changes later

This makes the system safer, easier to change, and more professional.
## Day 6 – Persistence (Reading/Writing Files)

I changed the system to load appointments from a JSON file instead of hard-coded data.

The app now:
- Reads input from `data/appointments.json`
- Prints a daily report
- Saves a report to `data/daily-report.txt`

This is the start of a real backend workflow: input → processing → output.
## Day 7 – Config-Driven Filtering

I updated the appointment loader to accept configuration and filter data at load time.

Key takeaways:
- Functions that depend on config must be passed config consistently
- Tests quickly exposed wiring mistakes
- Filtering early simplifies later logic
## Day 8 – Error Handling & Validation

I added explicit error handling for file reading and JSON parsing.
Tests helped expose:
- syntax mistakes
- mismatched expectations vs behavior
- filesystem assumptions in test environments

Key lesson:
Tests must reflect real behavior, not imagined rules.
## Day 9 – Service Layer

I moved revenue calculation into a dedicated service.

Why this matters:
- index.js now coordinates instead of calculating
- business logic lives in one place
- changes are safer and easier to reason about
## Day 10 – Contracts & Validation

I added an appointment validation contract and enforced it in the data-loading layer.

Key takeaways:
- validation belongs at system boundaries
- services should assume valid data
- tests caught structural mistakes quickly
# Day 11 – Appointment Status Model

I created a state machine for appointments with explicit allowed transitions.
This adds guardrails that prevent invalid business behavior (like completing a canceled appointment).
I wrote tests to prove valid transitions are allowed and invalid ones are blocked.
