import React from 'react'
import { Button, Form, InputGroup, Table } from 'react-bootstrap'

/**
 * ContadorPicker — componente props-driven (zero Redux, zero useCoreService).
 *
 * Substitui o padrao legado `withGenericPicker(LimiteDeControlePicker)` por
 * um componente autonomo que recebe `value` + callbacks explicitos. A
 * camada de estado (Redux/slice) fica em useContadorViewModel no core-sdk.
 *
 * Sprint 2026-04-20 code-split-fix — Track C.2 UI.
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
    raw: string
  ) => {
    const current = limites[index] ?? {}
    const next: ContadorLimite = { ...current }
    if (field === 'valor') {
      const n = Number(raw)
      next.valor = raw === '' ? '' : Number.isFinite(n) ? n : raw
    } else {
      next[field] = raw as any
    }
    onLimiteUpdate(index, next)
  }

  return (
    <div className={className}>
      <Form.Group className="mb-3" controlId="contador-parametro">
        <Form.Label>Parâmetro</Form.Label>
        <Form.Control
          type="text"
          value={value?.parametro ?? ''}
          onChange={(e) => onParametroChange(e.target.value)}
          placeholder={parametroPlaceholder}
          disabled={disabled}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="contador-leitura">
        <Form.Label>Leitura</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            value={value?.valor ?? ''}
            onChange={(e) => handleValor(e.target.value)}
            placeholder="0"
            disabled={disabled}
          />
          <Form.Control
            type="text"
            value={value?.unidade ?? ''}
            onChange={(e) => onUnidadeChange(e.target.value)}
            placeholder={unidadePlaceholder}
            disabled={disabled}
            style={{ maxWidth: '140px' }}
            aria-label="Unidade"
          />
        </InputGroup>
      </Form.Group>

      {!hideLimites && (
        <div className="contador-limites mb-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Form.Label className="mb-0">Limites de controle</Form.Label>
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
            <div className="text-muted small fst-italic">
              Nenhum limite configurado.
            </div>
          ) : (
            <Table size="sm" borderless className="mb-0">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Nome</th>
                  <th style={{ width: '20%' }}>Regra</th>
                  <th style={{ width: '25%' }}>Valor</th>
                  <th style={{ width: '15%' }}></th>
                </tr>
              </thead>
              <tbody>
                {limites.map((l, idx) => (
                  <tr key={idx}>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={(l?.nome as string) ?? ''}
                        onChange={(e) =>
                          handleLimiteField(idx, 'nome', e.target.value)
                        }
                        placeholder="Ex.: Limite Mínimo"
                        disabled={disabled}
                      />
                    </td>
                    <td>
                      <Form.Select
                        size="sm"
                        value={(l?.boundRule as string) ?? '>='}
                        onChange={(e) =>
                          handleLimiteField(idx, 'boundRule', e.target.value)
                        }
                        disabled={disabled}
                      >
                        {BOUND_RULES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="number"
                        value={
                          l?.valor === undefined || l?.valor === null
                            ? ''
                            : String(l.valor)
                        }
                        onChange={(e) =>
                          handleLimiteField(idx, 'valor', e.target.value)
                        }
                        disabled={disabled}
                      />
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onLimiteRemove(idx)}
                        disabled={disabled}
                        aria-label={`Remover limite ${idx + 1}`}
                      >
                        Remover
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}
    </div>
  )
}

export default ContadorPicker
