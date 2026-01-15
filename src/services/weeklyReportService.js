const { APPOINTMENT_STATUS } = require("../domain/appointments");

function buildWeeklyReport(appointments, options = {}) {
    const title = options.title || "Weekly Appointment Report";

    const totalRevenue = appointments.reduce(
        (sum, a) => sum + (Number(a.price) || 0),
        0
    );

    const countsByStatus = Object.values(APPOINTMENT_STATUS).reduce(
        (acc, status) => {
            acc[status] = appointments.filter(a => a.status === status).length;
            return acc;
        },
        {}
    );

    return {
        title,
        totalAppointments: appointments.length,
        totalRevenue,
        countsByStatus
    };
}

module.exports = { buildWeeklyReport };