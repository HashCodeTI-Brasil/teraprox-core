// @agent-touched: 2026-05-18

export type PeriodUnit = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'

export type PeriodAnchor =
  | 'startOfHour'
  | 'startOfDay'
  | 'startOfWeek'
  | 'startOfMonth'
  | 'startOfYear'

export type PeriodPresetName =
  | 'today'
  | 'yesterday'
  | 'last24h'
  | 'last72h'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'lastYear'
  | 'ytd'

export type PeriodSpecRolling = {
  type: 'rolling'
  unit: PeriodUnit
  count: number
}

export type PeriodSpecAnchored = {
  type: 'anchored'
  anchor: PeriodAnchor
  offset?: number
  length?: number
  unit?: PeriodUnit
}

export type PeriodSpecPreset = {
  type: 'preset'
  name: PeriodPresetName
}

export type PeriodSpecAbsolute = {
  type: 'absolute'
  start: string
  end: string
}

export type PeriodSpec =
  | PeriodSpecRolling
  | PeriodSpecAnchored
  | PeriodSpecPreset
  | PeriodSpecAbsolute

export type ResolvedPeriod = {
  inicio: Date
  fim: Date
}
