import dayjs from 'dayjs'
// Fully-specified path to avoid ESM "fully specified" errors when webpack
// consumes the bundled .mjs output (BREAKING CHANGE policy in Webpack 5).
import duration from 'dayjs/plugin/duration.js'

dayjs.extend(duration)

/**
 * useTimeFormat — helpers para conversao entre segundos e string `HH:mm:ss` /
 * `HH:mm`. Extraido de `TimeFormField` (teraprox-SGM-OS) na Wave 5D.2 da
 * sprint 2026-04-21-ui-kit-domain-split-wave0.
 *
 * Nao e um hook stateful — apenas um container reutilizavel de utilitarios
 * para evitar duplicacao do `dayjs.extend(duration)` em cada caller. O nome
 * `use*` sinaliza que o consumidor invoca dentro de um componente React.
 */
export interface TimeFormatApi {
  /** Converte segundos (number) em string `HH:mm:ss`. */
  secondsToHms(seconds: number | null | undefined): string
  /** Converte string `HH:mm` (ou `HH:mm:ss`) em segundos totais. */
  hmsToSeconds(value: string | null | undefined): number | null
}

export const secondsToHms = (seconds: number | null | undefined): string => {
  const s = typeof seconds === 'number' && !Number.isNaN(seconds) ? seconds : 0
  return dayjs.duration(s, 'seconds').format('HH:mm:ss')
}

export const hmsToSeconds = (value: string | null | undefined): number | null => {
  if (!value) return null
  const parts = value.split(':').map(Number)
  const [h = 0, m = 0, s = 0] = parts
  if ([h, m, s].some(Number.isNaN)) return null
  return h * 3600 + m * 60 + s
}

export const useTimeFormat = (): TimeFormatApi => ({
  secondsToHms,
  hmsToSeconds,
})

export default useTimeFormat
