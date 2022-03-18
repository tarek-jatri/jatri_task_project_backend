function countWeekdaysWeekends(fromDate, toDate) {

    // counting total days
    const totalDays = Math.ceil(Math.abs(toDate - fromDate) / (1000 * 60 * 60 * 24));

    // counting weekends
    let weekends = 0;

    while (fromDate < toDate) {
        fromDate.setDate(fromDate.getDate() + 1);
        if (fromDate.getDay() === 5 || fromDate.getDay() === 6) {
            ++weekends;
        }
    }

    // counting weekdays
    const weekdays = totalDays - weekends;

    return {weekdays, weekends};
}

module.exports = countWeekdaysWeekends;