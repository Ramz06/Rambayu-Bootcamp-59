/**
 * Mengonversi jumlah detik yang telah berlalu menjadi satuan waktu tertentu.
 *
 * @param {Date} date - Tanggal/waktu referensi.
 * @param {string} unit - Satuan waktu yang diinginkan ("minutes", "hours", "days", "months").
 * @returns {number} - Waktu dalam satuan yang diinginkan.
 */
function convertTime(date, unit) {
    if (!(date instanceof Date)) {
        throw new Error("Invalid date. Please provide a valid Date object.");
    }

    const now = new Date(); // Waktu saat ini
    const elapsedSeconds = Math.floor((now - date) / 1000); // Hitung detik yang telah berlalu

    switch (unit) {
        case "minutes":
            return Math.floor(elapsedSeconds / 60); // Konversi ke menit
        case "hours":
            return Math.floor(elapsedSeconds / 3600); // Konversi ke jam
        case "days":
            return Math.floor(elapsedSeconds / 86400); // Konversi ke hari
        case "months":
            const elapsedMilliseconds = now - date;
            const elapsedMonths = elapsedMilliseconds / (1000 * 60 * 60 * 24 * 30.44); // Rata-rata 30.44 hari per bulan
            return Math.floor(elapsedMonths); // Konversi ke bulan
        default:
            throw new Error("Invalid unit. Please specify 'minutes', 'hours', 'days', or 'months'.");
    }
}



// console.log(convertTime(exampleDate, "minutes")); // Output dalam menit
// console.log(convertTime(exampleDate, "hours"));   // Output dalam jam
// console.log(convertTime(exampleDate, "days"));    // Output dalam hari
// console.log(convertTime(exampleDate, "months"));  // Output dalam bulan

module.exports = {
    convertTime
}

