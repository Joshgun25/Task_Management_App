export function formatDatetime(datetimeString) {
    const datetime = new Date(datetimeString);

    const date = datetime.toLocaleDateString();
    const time = datetime.toLocaleTimeString();

    return `${date} ${time}`;
}