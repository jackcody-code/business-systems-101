#!/usr/bin/env node

const path = require("node:path");
const fs = require("node:fs");

const { loadAppointments } = require("../data/loadAppointments");
const { buildDailyReport, saveDailyReport } = require("../services/reportService");
const { evaluateAlerts } = require("../services/alertService");


function main() {
  const baseDir = path.join(__dirname, "..", "..", "data");
  const dataPath = path.join(baseDir, "appointments.json");
  const reportsDir = path.join(baseDir, "reports");

  fs.mkdirSync(reportsDir, { recursive: true });

  const appointments = loadAppointments(dataPath, { minimumPrice: 0 }) || [];
  const appointmentsTomorrow = appointments.length; // TEMP proxy until tomorrow data exists

  const text = buildDailyReport(appointments);

  const reportPath = path.join(reportsDir, "daily-report.txt");
  saveDailyReport(text, reportPath);

  // ✅ Evaluate alerts AFTER data exists
  const alerts = evaluateAlerts({
    appointmentsTomorrow,
    threshold: 5,
  });

  console.log("\n=== Twin Suns OS: Operator Dashboard (Daily) ===\n");
  console.log(text);
  console.log("\nSaved report to:", reportPath);

  // ✅ Print alerts inside main
  console.log("\nALERTS");
  console.log("------");

  if (!alerts || alerts.length === 0) {
    console.log("No alerts. System healthy.");
  } else {
    alerts.forEach((alert) => console.log(`- ${alert}`));
  }
}

main();
