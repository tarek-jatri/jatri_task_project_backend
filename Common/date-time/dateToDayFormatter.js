function dateToDayFromatter(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    date = new Date(date).toLocaleDateString("en-US", options);

    return date;
}


module.exports = dateToDayFromatter;