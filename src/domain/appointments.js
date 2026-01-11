const APPOINTMENT_STATUS = {
  REQUESTED: "requested",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELED: "canceled",
};

const VALID_TRANSITIONS = {
  requested: ["confirmed", "canceled"],
  confirmed: ["completed", "canceled"],
  completed: [],
  canceled: [],
};

function transitionAppointment(appointment, newStatus) {
  const currentStatus = appointment.status;

  const allowed = VALID_TRANSITIONS[currentStatus];

  if (!allowed) {
    throw new Error(`Unknown current status: ${currentStatus}`);
  }

  if (!allowed.includes(newStatus)) {
    throw new Error(
      `Invalid transition from "${currentStatus}" to "${newStatus}"`
    );
  }

  return {
    ...appointment,
    status: newStatus,
  };
}

module.exports = {
  APPOINTMENT_STATUS,
  transitionAppointment,
};
