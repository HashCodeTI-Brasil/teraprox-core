// @agent-touched: 2026-05-18

import type {
  PeriodSpec,
  PeriodUnit,
  PeriodAnchor,
  PeriodPresetName,
  ResolvedPeriod,
} from './types'

const MS_MINUTE = 60_000
const MS_HOUR = 3_600_000
const MS_DAY = 86_400_000
const MS_WEEK = 604_800_000

function addUnits(date: Date, unit: PeriodUnit, n: number): Date {
  const d = new Date(date.getTime())
  switch (unit) {
    case 'minute': return new Date(d.getTime() + n * MS_MINUTE)
    case 'hour':   return new Date(d.getTime() + n * MS_HOUR)
    case 'day':    return new Date(d.getTime() + n * MS_DAY)
    case 'week':   return new Date(d.getTime() + n * MS_WEEK)
    case 'month':  d.setUTCMonth(d.getUTCMonth() + n); return d
    case 'year':   d.setUTCFullYear(d.getUTCFullYear() + n); return d
  }
}

function anchorTo(date: Date, anchor: PeriodAnchor): Date {
  const d = new Date(date.getTime())
  switch (anchor) {
    case 'startOfHour':
      d.setUTCMinutes(0, 0, 0)
      return d
    case 'startOfDay':
      d.setUTCHours(0, 0, 0, 0)
      return d
    case 'startOfWeek': {
      d.setUTCHours(0, 0, 0, 0)
      const dayIdx = d.getUTCDay()
      const diffToMonday = (dayIdx + 6) % 7
      d.setUTCDate(d.getUTCDate() - diffToMonday)
      return d
    }
    case 'startOfMonth':
      d.setUTCHours(0, 0, 0, 0)
      d.setUTCDate(1)
      return d
    case 'startOfYear':
      d.setUTCHours(0, 0, 0, 0)
      d.setUTCMonth(0, 1)
      return d
  }
}

function anchorDefaultUnit(anchor: PeriodAnchor): PeriodUnit {
  switch (anchor) {
    case 'startOfHour':  return 'hour'
    case 'startOfDay':   return 'day'
    case 'startOfWeek':  return 'week'
    case 'startOfMonth': return 'month'
    case 'startOfYear':  return 'year'
  }
}

const PRESET_MAP: Record<PeriodPresetName, PeriodSpec> = {
  today:      { type: 'anchored', anchor: 'startOfDay' },
  yesterday:  { type: 'anchored', anchor: 'startOfDay', offset: -1, length: 1 },
  last24h:    { type: 'rolling', unit: 'hour', count: 24 },
  last72h:    { type: 'rolling', unit: 'hour', count: 72 },
  thisWeek:   { type: 'anchored', anchor: 'startOfWeek' },
  lastWeek:   { type: 'anchored', anchor: 'startOfWeek', offset: -1, length: 1 },
  thisMonth:  { type: 'anchored', anchor: 'startOfMonth' },
  lastMonth:  { type: 'anchored', anchor: 'startOfMonth', offset: -1, length: 1 },
  thisYear:   { type: 'anchored', anchor: 'startOfYear' },
  lastYear:   { type: 'anchored', anchor: 'startOfYear', offset: -1, length: 1 },
  ytd:        { type: 'anchored', anchor: 'startOfYear' },
}

export function resolveRelativePeriod(
  spec: PeriodSpec,
  now: Date | number,
): ResolvedPeriod {
  const nowDate = typeof now === 'number' ? new Date(now) : new Date(now.getTime())

  switch (spec.type) {
    case 'absolute':
      return { inicio: new Date(spec.start), fim: new Date(spec.end) }

    case 'rolling': {
      const fim = nowDate
      const inicio = addUnits(fim, spec.unit, -spec.count)
      return { inicio, fim }
    }

    case 'anchored': {
      const unit = spec.unit ?? anchorDefaultUnit(spec.anchor)
      const offset = spec.offset ?? 0
      const anchored = anchorTo(nowDate, spec.anchor)
      const inicio = offset === 0 ? anchored : addUnits(anchored, unit, offset)
      const fim = spec.length !== undefined
        ? addUnits(inicio, unit, spec.length)
        : nowDate
      return { inicio, fim }
    }

    case 'preset':
      return resolveRelativePeriod(PRESET_MAP[spec.name], nowDate)
  }
}
