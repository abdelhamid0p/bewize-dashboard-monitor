/**
 * Converts a date string to LocalDateTime format.
 * If the string already contains 'T', returns as-is.
 * Otherwise appends 'T00:00:00'.
 */
export const toLocalDateTime = (date: string): string =>
  date.includes("T") ? date : `${date}T00:00:00`;
