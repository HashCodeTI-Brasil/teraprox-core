/**
 * String utilities. Corresponds to the duplicated stringUtils.js in SGM/SGP.
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (!str || str.length <= maxLength) return str || ''
  return str.substring(0, maxLength) + suffix
}

export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function slugify(str: string): string {
  return removeAccents(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function isBlank(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0
}
