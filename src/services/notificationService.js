const nodemailer = require("nodemailer");

function bool(v) {
  return String(v).toLowerCase() === "true";
}

async function sendNotification(message) {
  // Kill switch
  if (!bool(process.env.ENABLE_EMAIL_NOTIFICATIONS)) return;

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

  const subject = "Twin Suns OS Alert";
  const text = message;

  await transporter.sendMail({ from, to, subject, text });
}

module.exports = { sendNotification };
