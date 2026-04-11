import dayjs from 'dayjs'

/**
 * Formats a date for display in Brazilian format.
 * Corresponds to the duplicated dateUtils.js in SGM/SGP/Services/default/.
 */
export function formatDate(date: string | Date | null | undefined, format = 'DD/MM/YYYY'): string {
  if (!date) return ''
  return dayjs(date).format(format)
}

export function formatDateTime(date: string | Date | null | undefined): string {
  return formatDate(date, 'DD/MM/YYYY HH:mm')
}

export function isDateBefore(date1: string | Date, date2: string | Date): boolean {
  return dayjs(date1).isBefore(dayjs(date2))
}

export function isDateAfter(date1: string | Date, date2: string | Date): boolean {
  return dayjs(date1).isAfter(dayjs(date2))
}

export function daysBetween(start: string | Date, end: string | Date): number {
  return dayjs(end).diff(dayjs(start), 'day')
}

export function addDays(date: string | Date, days: number): Date {
  return dayjs(date).add(days, 'day').toDate()
}

export function toISOString(date: string | Date): string {
  return dayjs(date).toISOString()
}
