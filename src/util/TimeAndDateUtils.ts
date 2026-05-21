export function formatTimestampToReadableText(timestamp?: string, locale: string = 'no-NO'): string {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';

    const options: Intl.DateTimeFormatOptions = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Oslo',
    };

    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
}
