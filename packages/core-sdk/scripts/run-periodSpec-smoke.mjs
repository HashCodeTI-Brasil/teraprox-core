// @agent-touched: 2026-05-18

import assert from 'node:assert/strict'
import {
  parsePeriodSpec,
  serializePeriodSpec,
  resolveRelativePeriod,
} from '../dist/periodSpec.mjs'

let passed = 0
let failed = 0

function test(name, fn) {
  try {
    fn()
    passed++
    console.log(`  ✓ ${name}`)
  } catch (e) {
    failed++
    console.log(`  ✗ ${name}`)
    console.log(`    ${e?.message ?? e}`)
  }
}

const NOW = new Date('2026-05-18T14:30:00.000Z').getTime()

console.log('parse')

test('rolling com unit/count', () => {
  const s = parsePeriodSpec('PERIOD:TYPE=rolling;UNIT=day;COUNT=7')
  assert.deepEqual(s, { type: 'rolling', unit: 'day', count: 7 })
})

test('anchored startOfWeek (sem length)', () => {
  const s = parsePeriodSpec('PERIOD:TYPE=anchored;ANCHOR=startOfWeek')
  assert.deepEqual(s, { type: 'anchored', anchor: 'startOfWeek' })
})

test('anchored com offset+length', () => {
  const s = parsePeriodSpec('PERIOD:TYPE=anchored;ANCHOR=startOfMonth;OFFSET=-1;LENGTH=1')
  assert.deepEqual(s, { type: 'anchored', anchor: 'startOfMonth', offset: -1, length: 1 })
})

test('preset', () => {
  const s = parsePeriodSpec('PERIOD:TYPE=preset;NAME=last72h')
  assert.deepEqual(s, { type: 'preset', name: 'last72h' })
})

test('absolute', () => {
  const s = parsePeriodSpec('PERIOD:TYPE=absolute;START=2026-01-01T00:00:00.000Z;END=2026-12-31T23:59:59.999Z')
  assert.deepEqual(s, {
    type: 'absolute',
    start: '2026-01-01T00:00:00.000Z',
    end: '2026-12-31T23:59:59.999Z',
  })
})

test('aceita sem prefixo PERIOD:', () => {
  const s = parsePeriodSpec('TYPE=rolling;UNIT=hour;COUNT=24')
  assert.deepEqual(s, { type: 'rolling', unit: 'hour', count: 24 })
})

test('TYPE inválido lança', () => {
  assert.throws(() => parsePeriodSpec('PERIOD:TYPE=banana'), /TYPE desconhecido/)
})

test('UNIT inválida lança', () => {
  assert.throws(() => parsePeriodSpec('PERIOD:TYPE=rolling;UNIT=decade;COUNT=1'), /UNIT/)
})

test('LENGTH zero rejeitado', () => {
  assert.throws(() => parsePeriodSpec('PERIOD:TYPE=anchored;ANCHOR=startOfWeek;LENGTH=0'), /LENGTH/)
})

console.log('\nserialize')

test('rolling roundtrip', () => {
  const spec = { type: 'rolling', unit: 'day', count: 7 }
  const str = serializePeriodSpec(spec)
  assert.equal(str, 'PERIOD:TYPE=rolling;UNIT=day;COUNT=7')
  assert.deepEqual(parsePeriodSpec(str), spec)
})

test('anchored com offset+length roundtrip', () => {
  const spec = {
    type: 'anchored',
    anchor: 'startOfMonth',
    offset: -1,
    length: 1,
  }
  const str = serializePeriodSpec(spec)
  assert.equal(str, 'PERIOD:TYPE=anchored;ANCHOR=startOfMonth;OFFSET=-1;LENGTH=1')
  assert.deepEqual(parsePeriodSpec(str), spec)
})

test('preset roundtrip', () => {
  const spec = { type: 'preset', name: 'last72h' }
  const str = serializePeriodSpec(spec)
  assert.equal(str, 'PERIOD:TYPE=preset;NAME=last72h')
  assert.deepEqual(parsePeriodSpec(str), spec)
})

console.log('\nresolve')

test('rolling 7 days from NOW', () => {
  const { inicio, fim } = resolveRelativePeriod(
    { type: 'rolling', unit: 'day', count: 7 },
    NOW,
  )
  assert.equal(fim.getTime(), NOW)
  assert.equal(inicio.getTime(), NOW - 7 * 86400000)
})

test('rolling 24 hours', () => {
  const { inicio, fim } = resolveRelativePeriod(
    { type: 'rolling', unit: 'hour', count: 24 },
    NOW,
  )
  assert.equal(fim.getTime() - inicio.getTime(), 24 * 3600000)
})

test('anchored startOfDay (today)', () => {
  const { inicio, fim } = resolveRelativePeriod(
    { type: 'anchored', anchor: 'startOfDay' },
    NOW,
  )
  assert.equal(inicio.toISOString(), '2026-05-18T00:00:00.000Z')
  assert.equal(fim.getTime(), NOW)
})

test('anchored startOfWeek (segunda)', () => {
  const { inicio } = resolveRelativePeriod(
    { type: 'anchored', anchor: 'startOfWeek' },
    NOW,
  )
  assert.equal(inicio.toISOString(), '2026-05-18T00:00:00.000Z')
  assert.equal(inicio.getUTCDay(), 1)
})

test('anchored startOfMonth offset=-1 length=1 (mês passado)', () => {
  const { inicio, fim } = resolveRelativePeriod(
    { type: 'anchored', anchor: 'startOfMonth', offset: -1, length: 1 },
    NOW,
  )
  assert.equal(inicio.toISOString(), '2026-04-01T00:00:00.000Z')
  assert.equal(fim.toISOString(), '2026-05-01T00:00:00.000Z')
})

test('anchored startOfYear sem length (YTD)', () => {
  const { inicio, fim } = resolveRelativePeriod(
    { type: 'anchored', anchor: 'startOfYear' },
    NOW,
  )
  assert.equal(inicio.toISOString(), '2026-01-01T00:00:00.000Z')
  assert.equal(fim.getTime(), NOW)
})

test('preset last72h', () => {
  const { inicio, fim } = resolveRelativePeriod(
    { type: 'preset', name: 'last72h' },
    NOW,
  )
  assert.equal(fim.getTime() - inicio.getTime(), 72 * 3600000)
})

test('preset yesterday', () => {
  const { inicio, fim } = resolveRelativePeriod(
    { type: 'preset', name: 'yesterday' },
    NOW,
  )
  assert.equal(inicio.toISOString(), '2026-05-17T00:00:00.000Z')
  assert.equal(fim.toISOString(), '2026-05-18T00:00:00.000Z')
})

test('absolute pass-through', () => {
  const { inicio, fim } = resolveRelativePeriod(
    { type: 'absolute', start: '2025-01-01T00:00:00.000Z', end: '2025-12-31T23:59:59.999Z' },
    NOW,
  )
  assert.equal(inicio.toISOString(), '2025-01-01T00:00:00.000Z')
  assert.equal(fim.toISOString(), '2025-12-31T23:59:59.999Z')
})

test('caller pode passar now numérico ou Date', () => {
  const r1 = resolveRelativePeriod({ type: 'preset', name: 'today' }, NOW)
  const r2 = resolveRelativePeriod({ type: 'preset', name: 'today' }, new Date(NOW))
  assert.equal(r1.inicio.getTime(), r2.inicio.getTime())
  assert.equal(r1.fim.getTime(), r2.fim.getTime())
})

test('determinístico — mesmo input, mesmo output', () => {
  const r1 = resolveRelativePeriod({ type: 'rolling', unit: 'day', count: 30 }, NOW)
  const r2 = resolveRelativePeriod({ type: 'rolling', unit: 'day', count: 30 }, NOW)
  assert.equal(r1.inicio.getTime(), r2.inicio.getTime())
  assert.equal(r1.fim.getTime(), r2.fim.getTime())
})

console.log(`\n${passed} passed · ${failed} failed`)
process.exit(failed === 0 ? 0 : 1)
