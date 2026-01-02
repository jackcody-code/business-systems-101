function calculateDailyRevenue(appointments = []) {
    if (!Array.isArray(appointments)) throw new TypeError('appointments must be an array');
    return appointments.reduce((total, appointment) => {
        const price = appointment && (typeof appointment.price === 'number' ? appointment.price : Number(appointment.price));
        return total + (Number.isFinite(price) ? price : 0);
    }, 0);
}

function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

const appointments = [
    { client: "Ashley", price: 420 },
    { client: "Hawk", price: 1000 },
    { client: "Fox", price: 1000 }
];

const dailyRevenue = calculateDailyRevenue(appointments);
console.log('Daily revenue:', dailyRevenue, '—', formatCurrency(dailyRevenue));

module.exports = { calculateDailyRevenue };