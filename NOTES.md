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
