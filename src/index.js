const path = require("node:path");

const { loadAppointments } = require("./data/loadAppointments");
const { calculateDailyRevenue } = require("./services/revenue");
const { formatCurrency } = require("./utils/format");
const { writeDailyReport } = require("./services/writeReport");
const { config } = require("./config");
const { calculateDailyRevenue } = require("./services/revenueService");

const appointmentsPath = path.join(__dirname, "..", "data", "appointments.json");
const appointments = loadAppointments(appointmentsPath, config);
const revenue = calculateDailyRevenue(appointments);

const dailyRevenue = calculateDailyRevenue(appointments, config);

const reportText =
  `Daily Revenue Report\n` +
  `-------------------\n` +
  `Appointments: ${appointments.length}\n` +
  `Revenue: ${formatCurrency(revenue, config)}\n`;

console.log(reportText);

const reportOutPath = path.join(__dirname, "..", "data", "daily-report.txt");
writeDailyReport(reportOutPath, reportText);
console.log(`Saved report to: ${reportOutPath}`);
