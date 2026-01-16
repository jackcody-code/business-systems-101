const { buildDailyReport } = require("./reportService");
const { buildWeeklyReport } = require("./weeklyReportService");
const { formatWeeklyReport } = require("./reportFormatter");
const { evaluateAlerts } = require("./alertService");

function buildOperatorDashboard(appointments, config, options = {}) {
    const title = options.title || "Twin Suns OS — Operator Dashboard";
    const dateLabel = options.dateLabel || new Date().toLocaleDateString("en-US");

    const daily = buildDailyReport(appointments, config, { title: "Daily Report" });
    const weekly = buildWeeklyReport(appointments, config);
    const weeklyText = formatWeeklyReport(weekly, config);
    const metrics =
  weekly?.metrics ||
  weekly?.summary?.metrics ||
  weekly?.report?.metrics ||
  weekly; // fallback if weekly itself IS the metrics object

const alerts = evaluateAlerts(metrics, config);


    const sections = [
        title,
        `Date: ${dateLabel}`,
        "",
        "=== DAILY SNAPSHOT ===",
        `Appointments: ${daily.totalAppointments}`,
        `Revenue: ${daily.revenueFormatted || daily.revenue}`,
        `Completed: ${daily.counts?.COMPLETED ?? 0}`,
        `Cancelled: ${daily.counts?.CANCELLED ?? 0}`,
        `No-Show: ${daily.counts?.NO_SHOW ?? 0}`,
        "",
        "=== WEEKLY SUMMARY ===",
        weeklyText.trim(),
        "",
        "=== ALERTS ===",
        ...(alerts?.length
            ? alerts.map(a => `- [${a.severity}] ${a.message}`)
            : ["No alerts ✅"])
    ];

    return sections.join("\n");
}

module.exports = { buildOperatorDashboard };