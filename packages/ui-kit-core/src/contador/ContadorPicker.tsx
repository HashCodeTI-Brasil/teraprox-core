import React from 'react'
import { Button } from '../primitives/Button'
import { TextField } from '../primitives/TextField'
import {
  InputGroup,
  InputGroupText,
} from '../primitives/InputGroup'
import { DataTable } from '../primitives/DataTable'
import type { DataTableColumn } from '../primitives/DataTable/DataTable.types'

/**
 * ContadorPicker — componente props-driven (zero Redux, zero useCoreService).
 *
 * Substitui o padrao legado `withGenericPicker(LimiteDeControlePicker)` por
 * um componente autonomo que recebe `value` + callbacks explicitos. A
 * camada de estado (Redux/slice) fica em useContadorViewModel no core-sdk.
 *
 * Sprint 2026-04-20 code-split-fix — Track C.2 UI.
 * Sprint 2026-05-08 ui-kit Tailwind migration — refatorado p/ primitivos
 * Tailwind+Radix do ui-kit-core (Button/TextField/InputGroup/DataTable),
 * removendo dependencia de react-bootstrap. API publica preservada.
 */

export type ContadorBoundRule = '>=' | '<=' | '>' | '<' | '==' | '!='

export interface ContadorLimite {
  nome?: string
  boundRule?: string
  valor?: number | string
  [k: string]: unknown
}

export interface ContadorPickerValue {
  valor: number | null
  unidade: string | null
  parametro: string | null
  limitesDeControle: ContadorLimite[]
}

export interface ContadorPickerProps {
  value: ContadorPickerValue
  onValorChange: (v: number | null) => void
  onUnidadeChange: (u: string) => void
  onParametroChange: (p: string) => void
  onLimiteAdd: (limite: ContadorLimite) => void
  onLimiteRemove: (index: number) => void
  onLimiteUpdate: (index: number, limite: ContadorLimite) => void

  /** Desabilita todos os inputs (readOnly de fato). */
  disabled?: boolean
  /** Oculta o bloco de limites de controle (quando nao relevante). */
  hideLimites?: boolean
  /** Placeholder do campo parametro. */
  parametroPlaceholder?: string
  /** Placeholder do campo unidade. */
  unidadePlaceholder?: string
  className?: string
}

const BOUND_RULES: ContadorBoundRule[] = ['>=', '<=', '>', '<', '==', '!=']

const emptyLimite: ContadorLimite = {
  nome: '',
  boundRule: '>=',
  valor: 0,
}

/**
 * Row interna do DataTable de limites — enriquecida com `index` para
 * identificacao estavel (key/getRowId) e callbacks de update/remove.
 */
type LimiteRow = ContadorLimite & { __index: number }

export const ContadorPicker: React.FC<ContadorPickerProps> = ({
  value,
  onValorChange,
  onUnidadeChange,
  onParametroChange,
  onLimiteAdd,
  onLimiteRemove,
  onLimiteUpdate,
  disabled = false,
  hideLimites = false,
  parametroPlaceholder = 'Ex.: Temperatura',
  unidadePlaceholder = 'Ex.: °C',
  className,
}) => {
  const limites = value?.limitesDeControle ?? []

  const handleValor = (raw: string) => {
    if (raw === '') {
      onValorChange(null)
      return
    }
    const n = Number(raw)
    onValorChange(Number.isFinite(n) ? n : null)
  }

  const handleLimiteField = (
    index: number,
    field: keyof ContadorLimite,
    raw: string,
  ) => {
    const current = limites[index] ?? {}
    const next: ContadorLimite = { ...current }
    if (field === 'valor') {
      const n = Number(raw)
      next.valor = raw === '' ? '' : Number.isFinite(n) ? n : raw
    } else {
      next[field] = raw as never
    }
    onLimiteUpdate(index, next)
  }

  // Monta rows com __index estavel para getRowId e cells.
  const limiteRows: LimiteRow[] = React.useMemo(
    () => limites.map((l, i) => ({ ...l, __index: i })),
    [limites],
  )

  const limiteColumns: DataTableColumn<LimiteRow>[] = React.useMemo(
    () => [
      {
        id: 'nome',
        header: 'Nome',
        width: '40%',
        cell: (row) => (
          <TextField
            size="sm"
            type="text"
            value={(row?.nome as string) ?? ''}
            onChange={(e) =>
              handleLimiteField(row.__index, 'nome', e.target.value)
            }
            placeholder="Ex.: Limite Mínimo"
            disabled={disabled}
            aria-label={`Nome do limite ${row.__index + 1}`}
          />
        ),
      },
      {
        id: 'boundRule',
        header: 'Regra',
        width: '20%',
        cell: (row) => (
          <select
            className={
              'block w-full rounded-md border border-surface-border bg-surface-background ' +
              'text-surface-foreground h-8 px-2 text-sm ' +
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ' +
              'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed'
            }
            value={(row?.boundRule as string) ?? '>='}
            onChange={(e) =>
              handleLimiteField(row.__index, 'boundRule', e.target.value)
            }
            disabled={disabled}
            aria-label={`Regra do limite ${row.__index + 1}`}
          >
            {BOUND_RULES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        ),
      },
      {
        id: 'valor',
        header: 'Valor',
        width: '25%',
        cell: (row) => (
          <TextField
            size="sm"
            type="number"
            value={
              row?.valor === undefined || row?.valor === null
                ? ''
                : String(row.valor)
            }
            onChange={(e) =>
              handleLimiteField(row.__index, 'valor', e.target.value)
            }
            disabled={disabled}
            aria-label={`Valor do limite ${row.__index + 1}`}
          />
        ),
      },
      {
        id: 'actions',
        header: '',
        width: '15%',
        align: 'right',
        cell: (row) => (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onLimiteRemove(row.__index)}
            disabled={disabled}
            aria-label={`Remover limite ${row.__index + 1}`}
          >
            Remover
          </Button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, limites, onLimiteRemove],
  )

  return (
    <div className={className}>
      <div className="mb-3">
        <TextField
          id="contador-parametro"
          label="Parâmetro"
          type="text"
          value={value?.parametro ?? ''}
          onChange={(e) => onParametroChange(e.target.value)}
          placeholder={parametroPlaceholder}
          disabled={disabled}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="contador-leitura"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Leitura
        </label>
        <InputGroup>
          <TextField
            id="contador-leitura"
            type="number"
            value={value?.valor ?? ''}
            onChange={(e) => handleValor(e.target.value)}
            placeholder="0"
            disabled={disabled}
            wrapperClassName="flex-1"
          />
          <InputGroupText>
            <input
              type="text"
              value={value?.unidade ?? ''}
              onChange={(e) => onUnidadeChange(e.target.value)}
              placeholder={unidadePlaceholder}
              disabled={disabled}
              aria-label="Unidade"
              className={
                'bg-transparent border-0 outline-none p-0 text-sm w-[140px] ' +
                'placeholder:text-neutral-400 disabled:text-neutral-400'
              }
            />
          </InputGroupText>
        </InputGroup>
      </div>

      {!hideLimites && (
        <div className="contador-limites mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="block text-sm font-medium text-neutral-700">
              Limites de controle
            </span>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onLimiteAdd({ ...emptyLimite })}
              disabled={disabled}
            >
              + Adicionar limite
            </Button>
          </div>

          {limites.length === 0 ? (
            <div className="text-neutral-500 text-xs italic">
              Nenhum limite configurado.
            </div>
          ) : (
            <DataTable<LimiteRow>
              data={limiteRows}
              columns={limiteColumns}
              getRowId={(row) => String(row.__index)}
              size="sm"
              variant="minimal"
              stickyHeader={false}
              ariaLabel="Limites de controle"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default ContadorPicker
