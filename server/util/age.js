function calcAge(blockTimestamp) {
    const transactionDate = new Date(blockTimestamp);
    const now = new Date();
    const diffMs = now - transactionDate; // milliseconds between now & transaction date

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // days between
    if (diffDays < 1) {
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHours < 1) {
            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            return `${diffMinutes} minutes ago`;
        }
        return `${diffHours} hours ago`;
    }
    return `${diffDays} days ago`;
}

module.exports = { calcAge }