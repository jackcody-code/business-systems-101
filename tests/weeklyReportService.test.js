const test = require("node:test");
const assert = require("node:assert");
const { buildWeeklyReport } = require("../src/services/weeklyReportService");
const { APPOINTMENT_STATUS } = require("../src/domain/appointments");

test("buildWeeklyReport summarizes appointments correctly", () => {
    const appointments = [
        { price: 100, status: APPOINTMENT_STATUS.COMPLETED },
        { price: 200, status: APPOINTMENT_STATUS.COMPLETED },
        { price: 50, status: APPOINTMENT_STATUS.CANCELED }
    ];

    const report = buildWeeklyReport(appointments);

    assert.strictEqual(report.totalAppointments, 3);
    assert.strictEqual(report.totalRevenue, 350);
    assert.strictEqual(report.countsByStatus.completed, 2);
    assert.strictEqual(report.countsByStatus.canceled, 1);
});