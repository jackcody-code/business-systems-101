const nodemailer = require("nodemailer");
const { alreadySentToday, markSentToday, todayKey } = require("./notificationStateService");

function bool(v) {
  return String(v).toLowerCase() === "true";
}

function buildSubject(alerts) {
  const hasCritical = alerts.some((a) => String(a).toUpperCase().includes("CRITICAL"));
  if (hasCritical) return "Twin Suns OS — CRITICAL Alert";
  return `Twin Suns OS — Daily Alerts (${alerts.length})`;
}

function buildBody(alerts) {
  const timestamp = new Date().toLocaleString();
  const lines = [
    `Twin Suns OS Alerts — ${todayKey()}`,
    `Generated: ${timestamp}`,
    "",
    "Alerts:",
    ...alerts.map((a) => `- ${a}`),
    "",
  ];
  return lines.join("\n");
}

async function sendDailyAlertEmail(alerts) {
  if (!bool(process.env.ENABLE_EMAIL_NOTIFICATIONS)) return;
  if (!alerts || alerts.length === 0) return;

  // ✅ Once per day gate
  if (alreadySentToday()) {
    console.log("[NOTIFICATION] Skipped (already sent today)");
    return;
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE || "true") === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const to = process.env.ALERT_EMAIL_TO;
  const from = process.env.ALERT_EMAIL_FROM || user;

  if (!host || !user || !pass || !to) {
    throw new Error("Missing SMTP env vars. Check .env configuration.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    subject: buildSubject(alerts),
    text: buildBody(alerts),
  });

  markSentToday();
  console.log("[NOTIFICATION] Sent daily alert email");
}

module.exports = {
  sendDailyAlertEmail,
};
