const test = require("node:test");
const assert = require("node:assert");
const { buildOperatorDashboard } = require("../src/services/operatorDashboardService");

test("buildOperatorDashboard returns a readable dashboard string", () => {
    const appointments = [
        { client: "A", price: 200, status: "COMPLETED" },
        { client: "B", price: 150, status: "CANCELLED" },
        { client: "C", price: 300, status: "COMPLETED" }
    ];

    const config = {
        minimumPrice: 0,
        cancellationRateRed: 0.3,
        completionRateGreen: 0.6
    };

    const out = buildOperatorDashboard(appointments, config, { dateLabel: "TEST_DATE" });

    assert.ok(typeof out === "string");
    assert.ok(out.includes("Operator Dashboard"));
    assert.ok(out.includes("TEST_DATE"));
    assert.ok(out.includes("DAILY SNAPSHOT"));
    assert.ok(out.includes("WEEKLY SUMMARY"));
    assert.ok(out.includes("ALERTS"));
});