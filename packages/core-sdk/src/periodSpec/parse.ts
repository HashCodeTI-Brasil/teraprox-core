// @agent-touched: 2026-05-18

import type {
  PeriodSpec,
  PeriodUnit,
  PeriodAnchor,
  PeriodPresetName,
} from './types'

const VALID_UNITS: ReadonlyArray<PeriodUnit> = [
  'minute', 'hour', 'day', 'week', 'month', 'year',
]
const VALID_ANCHORS: ReadonlyArray<PeriodAnchor> = [
  'startOfHour', 'startOfDay', 'startOfWeek', 'startOfMonth', 'startOfYear',
]
const VALID_PRESETS: ReadonlyArray<PeriodPresetName> = [
  'today', 'yesterday', 'last24h', 'last72h',
  'thisWeek', 'lastWeek', 'thisMonth', 'lastMonth',
  'thisYear', 'lastYear', 'ytd',
]

export function parsePeriodSpec(str: string): PeriodSpec {
  if (typeof str !== 'string' || str.trim() === '') {
    throw new Error('parsePeriodSpec: input vazio')
  }

  const cleaned = str.trim().replace(/^PERIOD:/i, '')
  const params: Record<string, string> = {}
  for (const kv of cleaned.split(';')) {
    if (!kv) continue
    const eq = kv.indexOf('=')
    if (eq < 0) continue
    const k = kv.slice(0, eq).trim().toUpperCase()
    const v = kv.slice(eq + 1).trim()
    if (k) params[k] = v
  }

  const type = (params.TYPE || '').toLowerCase()

  switch (type) {
    case 'rolling': {
      const unit = (params.UNIT || 'day').toLowerCase() as PeriodUnit
      if (!VALID_UNITS.includes(unit)) {
        throw new Error(`parsePeriodSpec: UNIT inválida "${params.UNIT}"`)
      }
      const count = Number(params.COUNT ?? 1)
      if (!Number.isFinite(count) || count <= 0) {
        throw new Error(`parsePeriodSpec: COUNT inválido "${params.COUNT}"`)
      }
      return { type: 'rolling', unit, count }
    }

    case 'anchored': {
      const anchor = params.ANCHOR as PeriodAnchor
      if (!VALID_ANCHORS.includes(anchor)) {
        throw new Error(`parsePeriodSpec: ANCHOR inválido "${params.ANCHOR}"`)
      }
      const out: PeriodSpec = { type: 'anchored', anchor }
      if (params.OFFSET !== undefined && params.OFFSET !== '') {
        const offset = Number(params.OFFSET)
        if (!Number.isFinite(offset)) {
          throw new Error(`parsePeriodSpec: OFFSET inválido "${params.OFFSET}"`)
        }
        out.offset = offset
      }
      if (params.LENGTH !== undefined && params.LENGTH !== '') {
        const length = Number(params.LENGTH)
        if (!Number.isFinite(length) || length <= 0) {
          throw new Error(`parsePeriodSpec: LENGTH inválido "${params.LENGTH}"`)
        }
        out.length = length
      }
      if (params.UNIT) {
        const unit = params.UNIT.toLowerCase() as PeriodUnit
        if (!VALID_UNITS.includes(unit)) {
          throw new Error(`parsePeriodSpec: UNIT inválida "${params.UNIT}"`)
        }
        out.unit = unit
      }
      return out
    }

    case 'preset': {
      const name = params.NAME as PeriodPresetName
      if (!VALID_PRESETS.includes(name)) {
        throw new Error(`parsePeriodSpec: NAME de preset inválido "${params.NAME}"`)
      }
      return { type: 'preset', name }
    }

    case 'absolute': {
      const start = params.START
      const end = params.END
      if (!start || !end) {
        throw new Error('parsePeriodSpec: absolute requer START e END')
      }
      if (Number.isNaN(Date.parse(start)) || Number.isNaN(Date.parse(end))) {
        throw new Error(`parsePeriodSpec: START/END inválidos "${start}"/"${end}"`)
      }
      return { type: 'absolute', start, end }
    }

    default:
      throw new Error(`parsePeriodSpec: TYPE desconhecido "${params.TYPE}"`)
  }
}
