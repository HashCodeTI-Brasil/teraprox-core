// @agent-touched: 2026-05-18

import type { PeriodSpec } from './types'

export function serializePeriodSpec(spec: PeriodSpec): string {
  switch (spec.type) {
    case 'rolling':
      return `PERIOD:TYPE=rolling;UNIT=${spec.unit};COUNT=${spec.count}`

    case 'anchored': {
      const parts = [`TYPE=anchored`, `ANCHOR=${spec.anchor}`]
      if (spec.offset !== undefined) parts.push(`OFFSET=${spec.offset}`)
      if (spec.length !== undefined) parts.push(`LENGTH=${spec.length}`)
      if (spec.unit) parts.push(`UNIT=${spec.unit}`)
      return `PERIOD:${parts.join(';')}`
    }

    case 'preset':
      return `PERIOD:TYPE=preset;NAME=${spec.name}`

    case 'absolute':
      return `PERIOD:TYPE=absolute;START=${spec.start};END=${spec.end}`
  }
}
