// Promovido de teraprox-SGP-planoDeControle/src/Components/processo/ControleSelector.js
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Refator chave:
//   - useCoreService removido → callers injetam `planoLoader` (lista de planos)
//     e `loadPlano(planoId)` (detalhe com linhasDePlanoDeControle).
//   - useUnidade removido → callers injetam `getUnidadeLabel(unidadeId)`.
//   - AutoComplete (teraprox-ui-kit) substituido por Select nativo simples
//     (apresentacional). Caller pode swappar via render-prop futuramente.
// Estado interno (plano carregado, operacao, multiLpcChoose, controles, selecao)
// permanece local — eh comportamento do widget, nao do dominio.
import * as React from 'react'
import { useState } from 'react'
import { Card, CardBody, cn } from '@hashcodeti/ui-kit-core'
import { CiBookmarkRemove } from 'react-icons/ci'

export interface ControleSelectorPlanoOption {
  id: string | number
  nome: string
  [key: string]: any
}

export interface ControleSelectorOperacao {
  id: string | number
  descricao: string
  [key: string]: any
}

export interface ControleSelectorLpc {
  id: string | number
  operacao: ControleSelectorOperacao
  controles: ControleSelectorControle[]
  [key: string]: any
}

export interface ControleSelectorLimite {
  nome?: string
  boundRule?: string
  valor?: number | string
}

export interface ControleSelectorEspecificacao {
  limitesDeControle?: ControleSelectorLimite[]
}

export interface ControleSelectorControle {
  id: string | number
  parametro: { nome: string; unidadeId?: string | number }
  especificacao?: ControleSelectorEspecificacao
  [key: string]: any
}

export interface ControleSelectorPlano {
  id: string | number
  nome: string
  linhasDePlanoDeControle: ControleSelectorLpc[]
}

export interface ControleSelectorProps {
  /** Lista de planos disponiveis (resolvida pelo caller, ex.: via useCoreService) */
  planoOptions: ControleSelectorPlanoOption[]
  /** Carrega o detalhe completo de um plano (inclui linhasDePlanoDeControle). */
  loadPlano: (planoId: string | number) => Promise<ControleSelectorPlano>
  /** Resolve label da unidade para exibicao nos limites. */
  getUnidadeLabel: (unidadeId: string | number | undefined) => string
  /** Callback final com o controle selecionado e a operacao. */
  setControleFunc: (
    controle: ControleSelectorControle | null,
    operacao?: ControleSelectorOperacao | null,
  ) => void
  className?: string
}

export const ControleSelector: React.FC<ControleSelectorProps> = ({
  planoOptions,
  loadPlano,
  getUnidadeLabel,
  setControleFunc,
  className,
}) => {
  const [plano, setPlano] = useState<ControleSelectorPlano | null>(null)
  const [operacao, setOperacao] = useState<ControleSelectorOperacao | null>(null)
  const [multiLpcChoose, setMultiLpcChoose] =
    useState<ControleSelectorLpc[] | null>(null)
  const [controles, setControles] = useState<ControleSelectorControle[]>([])
  const [selectedCheckbox, setSelectedCheckbox] = useState<
    string | number | null
  >(null)

  const handlePlanoChange = async (planoId: string | number) => {
    if (!planoId) return
    const p = await loadPlano(planoId)
    setPlano(p)
    setOperacao(null)
    setControles([])
    setMultiLpcChoose(null)
    setSelectedCheckbox(null)
    setControleFunc(null)
  }

  const handleOperacaoChange = (operacaoId: string | number) => {
    if (!plano) return
    const op =
      plano.linhasDePlanoDeControle.find((lpc) => String(lpc.operacao.id) === String(operacaoId))
        ?.operacao ?? null
    setOperacao(op)
    setSelectedCheckbox(null)
    const lpcsDaOperacao = plano.linhasDePlanoDeControle.filter(
      (lpc) => String(lpc.operacao.id) === String(operacaoId),
    )
    if (lpcsDaOperacao.length > 1) {
      setMultiLpcChoose(lpcsDaOperacao)
      setControles([])
    } else {
      setMultiLpcChoose(null)
      setControles(lpcsDaOperacao.flatMap((lpc) => lpc.controles))
    }
  }

  const handleMultiLpcChoose = (lpcId: string | number) => {
    const lpc = multiLpcChoose?.find((l) => String(l.id) === String(lpcId))
    if (lpc) setControles(lpc.controles)
  }

  const handleCheckboxChange = (controleId: string | number) => {
    if (selectedCheckbox === controleId) {
      setSelectedCheckbox(null)
      setControleFunc(null)
    } else {
      setSelectedCheckbox(controleId)
      const selected = controles.find((c) => c.id === controleId) ?? null
      setControleFunc(selected, operacao)
    }
  }

  const operacoesDoPlano = plano
    ? Array.from(
        new Map(
          plano.linhasDePlanoDeControle.map((lpc) => [
            String(lpc.operacao.id),
            lpc.operacao,
          ]),
        ).values(),
      )
    : []

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <select
        className="w-full px-3 py-2 rounded-md border border-neutral-300 bg-white text-sm"
        defaultValue=""
        onChange={(e) => handlePlanoChange(e.target.value)}
      >
        <option value="" disabled>
          Escolha o plano de controle
        </option>
        {planoOptions.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nome}
          </option>
        ))}
      </select>

      {plano && (
        <select
          className="w-full px-3 py-2 rounded-md border border-neutral-300 bg-white text-sm"
          value={operacao?.id ?? ''}
          onChange={(e) => handleOperacaoChange(e.target.value)}
        >
          <option value="" disabled>
            Escolha a operação
          </option>
          {operacoesDoPlano.map((op) => (
            <option key={op.id} value={op.id}>
              {op.descricao}
            </option>
          ))}
        </select>
      )}

      {multiLpcChoose && multiLpcChoose.length > 0 && (
        <select
          className="w-full px-3 py-2 rounded-md border border-neutral-300 bg-white text-sm"
          defaultValue=""
          onChange={(e) => handleMultiLpcChoose(e.target.value)}
        >
          <option value="" disabled>
            Selecione entre as operações:
          </option>
          {multiLpcChoose.map((lpc) => (
            <option key={lpc.id} value={lpc.id}>
              {lpc.operacao.descricao} (#{lpc.id})
            </option>
          ))}
        </select>
      )}

      <div className="flex flex-col gap-2">
        {controles.map((controle) => {
          const isDimmed =
            selectedCheckbox !== null && selectedCheckbox !== controle.id
          const isSelected = selectedCheckbox === controle.id
          return (
            <Card key={controle.id} className="my-1 shadow-sm">
              <CardBody className="p-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={isSelected}
                    onChange={() => handleCheckboxChange(controle.id)}
                    className="h-4 w-4 text-primary-600"
                  />
                  <div
                    className={cn(
                      'flex-1 transition-opacity',
                      isDimmed && 'opacity-40',
                    )}
                  >
                    <div className="font-bold">{controle.parametro.nome}</div>
                    <div className="text-xs text-neutral-600">
                      {controle?.especificacao?.limitesDeControle?.map(
                        (fx, i) => (
                          <div key={i}>
                            {`${fx.nome ?? ''} : ${fx.boundRule ?? ''} ${fx.valor ?? ''} ${getUnidadeLabel(controle.parametro.unidadeId)}`}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <button
                      type="button"
                      className="text-danger hover:opacity-80"
                      onClick={() => handleCheckboxChange(controle.id)}
                      aria-label="Remover seleção"
                    >
                      <CiBookmarkRemove size={24} />
                    </button>
                  )}
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default ControleSelector
