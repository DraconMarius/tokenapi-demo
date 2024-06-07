const calcAge = (blockTimestamp) => {
    const txDate = new Date(blockTimestamp);
    const now = new Date();

    const diff = now - txDate;

    const secs = Math.floor(diff / 1000);
    const mins = Math.floor(secs / 60);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (secs < 60) {
        return `${secs} seconds ago`;
    } else if (mins < 60) {
        return `${mins} minutes ago`;
    } else if (hrs < 24) {
        return `${hrs} hours ago`;
    } else if (days < 30) {
        return `${days} days ago`;
    } else if (months < 12) {
        return `${months} months ago`;
    } else {
        return `${years} years ago`;
    }

}

module.exports = { calcAge }