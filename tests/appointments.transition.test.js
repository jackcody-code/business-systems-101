const test = require("node:test");
const assert = require("node:assert");

const {
    APPOINTMENT_STATUS,
    transitionAppointment,
} = require("../src/domain/appointments");

test("allows valid appointment transitions", () => {
    const appt = { id: 1, status: APPOINTMENT_STATUS.REQUESTED };

    const confirmed = transitionAppointment(
        appt,
        APPOINTMENT_STATUS.CONFIRMED
    );

    assert.strictEqual(confirmed.status, APPOINTMENT_STATUS.CONFIRMED);
});

test("prevents invalid appointment transitions", () => {
    const appt = { id: 1, status: APPOINTMENT_STATUS.CANCELED };

    assert.throws(() => {
        transitionAppointment(appt, APPOINTMENT_STATUS.COMPLETED);
    });
});