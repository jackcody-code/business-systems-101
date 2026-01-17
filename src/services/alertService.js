/**
 * Alert Service
 *
 * Purpose:
 * Evaluates operational metrics against predefined thresholds
 * to identify business risk conditions that require operator attention.
 *
 * Alerts exist to surface problems early, before they are visible
 * through revenue loss or customer impact.
 *
 * Examples of risks detected:
 * - Low completion rate
 * - High cancellation rate
 * - Revenue trending below expectations
 *
 * Audience:
 * Owner / operator of a service-based business who needs proactive
 * signals, not retrospective reports.
 *
 * This service is intentionally stateless and deterministic.
 * Given the same metrics, it will always produce the same alerts.
 */// Determines whether current operational metrics indicate business risk

function evaluateAlerts(metrics, thresholds = {}) {
    const alerts = [];

    const {
        minCompletionRate = 0.7,
        maxCancellationRate = 0.2,
        minRevenue = 0
    } = thresholds;

    if (metrics.completionRate < minCompletionRate) {
        alerts.push("Low completion rate");
    }

    if (metrics.cancellationRate > maxCancellationRate) {
        alerts.push("High cancellation rate");
    }

    if (metrics.revenue < minRevenue) {
        alerts.push("Revenue below target");
    }

    return alerts;
}

module.exports = { evaluateAlerts };