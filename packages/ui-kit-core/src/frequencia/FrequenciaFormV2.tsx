// Cross-domain (SGM + SGP). Port-only: consome RecorrenciaValue do core-sdk.
// Props-driven — sem Redux, sem useCoreService, sem toasts.
//
// Uso tipico (SGM-OS, com agendamento temporal):
//   const vm = useRecorrenciaViewModel(osId)
//   <FrequenciaFormV2
//     value={vm.value}
//     onValorChange={vm.onValorChange}
//     onEscalaChange={vm.onEscalaChange}
//     onDataInicioChange={vm.onDataInicioChange}
//     onClear={vm.clear}
//   />
//
// Uso caderno/planoDeControle (sem agendamento temporal, sub-hora):
//   <FrequenciaFormV2
//     value={vm.value}
//     onValorChange={vm.onValorChange}
//     onEscalaChange={vm.onEscalaChange}
//     showDataInicio={false}
//     escalasVisiveis={['second','minute','hour','day']}
//   />
//
// Reescrito em Track C.1 UI da sprint 2026-04-20-code-split-fix-e-ports-faltantes.
// Relaxado em Fase D2 (extensao) da mesma sprint para suportar callers
// sem dataInicio + escalas customizaveis.
//
// Refator Tailwind (sprint 2026-05-08 ui-kit Tailwind migration, D3):
//  - Substitui `Form.Control`/`Form.Label`/`Form.Select`/`Button` (react-bootstrap)
//    por `TextField` + `Select*` (Radix) + `Button` (ui-kit-core L1 Tailwind+Radix).
//  - API externa preservada 100% (props, RecorrenciaValue, RecorrenciaEscala).
import { Button } from '../primitives/Button'
import { TextField } from '../primitives/TextField'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../primitives/Select'

/**
 * Enum completo do backend (`api-manutencao/recorrencia`). Por default o UI
 * dropdown mostra `hour|day|week|month` (contrato SGM atual). Callers podem
 * restringir ou expandir via `escalasVisiveis`.
 */
export type RecorrenciaEscala =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export interface RecorrenciaValue {
  id?: number
  valor: number
  escala: RecorrenciaEscala
  /** ISO 8601. Opcional — dominios sem agendamento temporal nao preenchem. */
  dataInicio?: string
}

export interface FrequenciaFormV2Props {
  /** `null` = estado "sem recorrencia". */
  value: RecorrenciaValue | null
  onValorChange: (valor: number) => void
  onEscalaChange: (escala: RecorrenciaEscala) => void
  /**
   * Exigido apenas quando `showDataInicio !== false`. Aceita undefined para
   * limpar (dominios sem agendamento temporal).
   */
  onDataInicioChange?: (dataInicio: string | undefined) => void
  /** Opcional — se definido, renderiza botao "Remover recorrencia" quando value !== null. */
  onClear?: () => void
  disabled?: boolean
  className?: string
  /**
   * Escalas exibidas no dropdown (ordem preservada). Default mantem contrato
   * SGM atual: `['hour','day','week','month']`.
   */
  escalasVisiveis?: RecorrenciaEscala[]
  /**
   * Controla exibicao do campo "Data de inicio". Default true (SGM-OS).
   * Caderno/planoDeControle passam `false`.
   */
  showDataInicio?: boolean
}

const DEFAULT_ESCALAS_VISIVEIS: RecorrenciaEscala[] = [
  'hour',
  'day',
  'week',
  'month',
]

const ESCALA_LABELS: Record<RecorrenciaEscala, string> = {
  millisecond: 'Milissegundo(s)',
  second: 'Segundo(s)',
  minute: 'Minuto(s)',
  hour: 'Hora(s)',
  day: 'Dia(s)',
  week: 'Semana(s)',
  month: 'Mes(es)',
  year: 'Ano(s)',
}

/**
 * Converte ISO para string compativel com <input type="datetime-local">.
 * Esta util eh local ao componente (evita dependencia ui-kit-core -> core-sdk).
 */
const toDatetimeLocal = (iso: string | undefined): string => {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`
}

export const FrequenciaFormV2 = ({
  value,
  onValorChange,
  onEscalaChange,
  onDataInicioChange,
  onClear,
  disabled,
  className,
  escalasVisiveis,
  showDataInicio = true,
}: FrequenciaFormV2Props) => {
  const visibleEscalas =
    escalasVisiveis && escalasVisiveis.length > 0
      ? escalasVisiveis
      : DEFAULT_ESCALAS_VISIVEIS

  if (value === null) {
    return (
      <div className={className}>
        <div className="text-neutral-500 mb-2">Sem recorrencia definida.</div>
        <Button
          size="sm"
          variant="outline-primary"
          disabled={disabled}
          onClick={() => {
            // Dispara o trio minimo para iniciar o preenchimento. dataInicio
            // so eh emitida quando `showDataInicio` esta ativo.
            onValorChange(1)
            onEscalaChange(visibleEscalas[0])
            if (showDataInicio && onDataInicioChange) {
              onDataInicioChange(new Date().toISOString())
            }
          }}
        >
          Adicionar recorrencia
        </Button>
      </div>
    )
  }

  // Runtime warn: escala fora das visiveis (ex.: legacy mapeado para 'minute'
  // mas caller nao habilitou). Nao explode — aceita e segue.
  if (
    typeof console !== 'undefined' &&
    !visibleEscalas.includes(value.escala)
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      `[FrequenciaFormV2] value.escala="${value.escala}" nao esta em escalasVisiveis=[${visibleEscalas.join(
        ','
      )}]. Renderizando assim mesmo.`
    )
  }

  const handleDataInicio = (nextLocal: string) => {
    if (!onDataInicioChange) return
    if (!nextLocal) {
      onDataInicioChange(undefined)
      return
    }
    const iso = new Date(nextLocal).toISOString()
    onDataInicioChange(iso)
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 items-end">
        <div className="basis-32 grow-0 shrink-0">
          <TextField
            label="A cada"
            type="number"
            min={1}
            disabled={disabled}
            value={value.valor}
            onChange={(e) => {
              const n = Number(e.target.value)
              if (Number.isFinite(n) && n >= 1) onValorChange(n)
            }}
          />
        </div>

        <div className="basis-40 grow shrink">
          {/*
            Adapter Radix Select: API externa do componente (`onEscalaChange`)
            preservada — internamente Radix usa `value`/`onValueChange`
            (string) ao inves de evento DOM. Cast para RecorrenciaEscala
            mantido (mesmo enum do contrato).
          */}
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Escala
          </label>
          <Select
            value={value.escala}
            onValueChange={(v) => onEscalaChange(v as RecorrenciaEscala)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {visibleEscalas.map((key) => (
                <SelectItem key={key} value={key}>
                  {ESCALA_LABELS[key] ?? key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showDataInicio && (
          <div className="basis-56 grow shrink">
            <TextField
              label="Data de inicio"
              type="datetime-local"
              disabled={disabled}
              value={toDatetimeLocal(value.dataInicio)}
              onChange={(e) => handleDataInicio(e.target.value)}
            />
          </div>
        )}

        {onClear && (
          <div>
            <Button
              size="sm"
              variant="outline-danger"
              disabled={disabled}
              onClick={onClear}
            >
              Remover recorrencia
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FrequenciaFormV2
