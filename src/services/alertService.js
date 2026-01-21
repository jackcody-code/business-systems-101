function evaluateAlerts({ appointmentsTomorrow = 0, threshold = 5 } = {}) {
  const alerts = [];

 
if (appointmentsTomorrow === 0) {
  alerts.push("CRITICAL: No appointments scheduled for tomorrow");
}else if (appointmentsTomorrow < threshold) {
  alerts.push(`Low appointments tomorrow (${appointmentsTomorrow} < ${threshold})`);
}

  return alerts;
}

module.exports = {
  evaluateAlerts,
};
