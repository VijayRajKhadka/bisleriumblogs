export const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30; // Approximation, not precise
    const year = day * 365; // Approximation, not precise

    if (diff < minute) {
        const seconds = Math.round(diff / 1000);
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    } else if (diff < hour) {
        const minutes = Math.round(diff / minute);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diff < day) {
        const hours = Math.round(diff / hour);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diff < week) {
        const days = Math.round(diff / day);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diff < month) {
        const weeks = Math.round(diff / week);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (diff < year) {
        const months = Math.round(diff / month);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const years = Math.round(diff / year);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}