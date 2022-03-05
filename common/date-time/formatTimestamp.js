// formatting time and date
function formatTimestamp(timestamp) {
    const date = timestamp.toISOString().split("T")[0];
    let hours = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return {
        date,
        strTime
    };
}

module.exports = formatTimestamp;