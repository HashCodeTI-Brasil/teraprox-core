// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/RelatorioModernCard.tsx
// Wave E.2.1 — DOMAIN_PURO: removido useNavigate; navegacao via callback `onOpenCorrecao`.
// Wave F.2.B (2026-05-13) — react-bootstrap removido; migrado para @hashcodeti/ui-kit-core
// (Tooltip, Button, Collapsible Radix). Tailwind utilities substituem classes bootstrap.
import React, { useState } from 'react'
import {
  Button,
  Tooltip,
  Collapsible,
  CollapsibleContent,
} from '@hashcodeti/ui-kit-core'
import {
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiAlertCircle,
  FiClipboard,
  FiEye,
  FiEyeOff,
  FiTool,
} from 'react-icons/fi'

export interface RelatorioModernCardProps {
  registro: any
  showValidation?: boolean
  onCopyToClipboard?: (registro: any) => void
  onToggleVisibility?: (registroId: any) => void
  /** Callback para abrir a ordem de correcao (substitui useNavigate). */
  onOpenCorrecao?: (correcao: any) => void
}

export const RelatorioModernCard = ({
  registro,
  showValidation = true,
  onCopyToClipboard,
  onToggleVisibility,
  onOpenCorrecao,
}: RelatorioModernCardProps) => {
  const [expanded, setExpanded] = useState(false)
  const isVisible = registro.visible !== false

  const validacao = (r: any) => {
    if (!r.controle?.especificacao?.limitesDeControle ||
      r.controle.especificacao.limitesDeControle.length === 0) {
      return true
    }
    const valorRaw = r.valor
    const valorStr = typeof valorRaw === 'number' ? String(valorRaw) : (valorRaw || '')
    const valorFormatado = valorStr.replace(',', '.')
    const valor = parseFloat(valorFormatado)
    if (isNaN(valor)) return false
    const limites = r.controle.especificacao.limitesDeControle
    const valoresLimites = limites.map((l: any) => parseFloat(l.valor))
    const min = Math.min(...valoresLimites)
    const max = Math.max(...valoresLimites)
    return valor >= min && valor <= max
  }

  const isValid = registro.controle ? validacao(registro) : true
  const hasCorrecoes = registro.correcoes && registro.correcoes.length > 0

  const formatDate = (dateString: any) => {
    const d = new Date(dateString)
    return `${d.toLocaleDateString('pt-BR')} ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
  }

  const getFaixaLabel = () => {
    if (!registro.controle?.especificacao?.limitesDeControle) return null
    const limites = registro.controle.especificacao.limitesDeControle
    const valores = limites.map((l: any) => parseFloat(l.valor)).sort((a: number, b: number) => a - b)
    return `${valores[0]} - ${valores[valores.length - 1]} ${registro.controle?.labelUnidade || ''}`
  }

  const faixaLabel = getFaixaLabel()

  let statusColor = '#20c997'
  if (!isValid) statusColor = '#e74c3c'
  else if (hasCorrecoes) statusColor = '#f39c12'

  const abrirOrdemCorrecao = (correcao: any) => onOpenCorrecao?.(correcao)

  return (
    <div
      className="relative bg-white mb-2 shadow-sm rounded overflow-hidden border border-neutral-200"
      style={{ transition: 'all 0.2s', opacity: isVisible ? 1 : 0.5, filter: isVisible ? 'none' : 'grayscale(100%)' }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', backgroundColor: statusColor }} />
      <div className="p-3 pl-4">
        <div className="flex justify-between items-center">
          <div className="flex-1" style={{ maxWidth: '65%' }}>
            <div className="flex items-center gap-2 mb-1">
              <h6 className="m-0 font-bold text-neutral-900 truncate" title={registro.controle?.nomeParametro}>
                {registro.controle?.nomeParametro || 'Parâmetro sem nome'}
              </h6>
              {!isValid && (
                <div style={{ color: statusColor }} title="Não Conforme">
                  <FiAlertCircle size={14} />
                </div>
              )}
            </div>
            <div className="text-neutral-500 text-sm mb-1 truncate">
              {registro.campoDeVerificacao?.label || 'Operação'}
            </div>
            <div className="flex items-center gap-3 text-neutral-500" style={{ fontSize: '0.8rem' }}>
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <FiClock size={10} /> {formatDate(registro.data)}
              </span>
              {faixaLabel && (
                <span
                  className="inline-flex items-center gap-1 bg-neutral-50 px-2 py-0 rounded border border-neutral-200 whitespace-nowrap"
                  style={{ maxWidth: '100%' }}
                >
                  Target:{' '}
                  <strong className="truncate" style={{ maxWidth: '120px' }}>
                    {faixaLabel}
                  </strong>
                </span>
              )}
            </div>
          </div>
          <div className="text-right flex flex-col items-end justify-center">
            <div className="mb-1" style={{ lineHeight: 1 }}>
              <span className="font-bold" style={{ fontSize: '1.5rem', color: statusColor }}>
                {registro.valor}
              </span>
              <span className="text-neutral-500 ml-1 text-sm font-bold">{registro.controle?.labelUnidade}</span>
            </div>
            <div className="flex gap-1 mt-1">
              <Tooltip content="Copiar">
                <Button
                  variant="link"
                  className="text-neutral-500 p-0 px-1 h-auto"
                  onClick={() => onCopyToClipboard && onCopyToClipboard(registro)}
                >
                  <FiClipboard size={14} />
                </Button>
              </Tooltip>
              <Tooltip content={isVisible ? 'Ocultar' : 'Mostrar'}>
                <Button
                  variant="link"
                  className={`p-0 px-1 h-auto ${isVisible ? 'text-neutral-500' : 'text-error'}`}
                  onClick={() => onToggleVisibility && onToggleVisibility(registro.id)}
                >
                  {isVisible ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
        {hasCorrecoes && (
          <div className="mt-2 pt-2 border-t border-neutral-200">
            <div
              className="flex items-center justify-between p-1 rounded cursor-pointer"
              style={{ fontSize: '0.75rem', color: '#856404', backgroundColor: '#fff3cd' }}
              onClick={() => setExpanded(!expanded)}
            >
              <span className="font-bold flex items-center gap-2 pl-2">
                <FiTool size={12} /> {registro.correcoes.length} CORREÇÃO(ÕES)
              </span>
              <span className="pr-2">
                {expanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
              </span>
            </div>
          </div>
        )}
      </div>
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <CollapsibleContent>
          <div className="bg-neutral-50 border-t border-neutral-200 p-3" style={{ overflowX: 'hidden' }}>
            <h6 className="text-sm font-bold text-neutral-500 mb-3">HISTÓRICO DE CORREÇÕES</h6>
            {registro.correcoes?.map((correcao: any, idx: number) => (
              <div
                key={idx}
                className="bg-white border border-neutral-200 rounded p-2 mb-2 shadow-sm cursor-pointer"
                onClick={() => abrirOrdemCorrecao(correcao)}
                style={{ overflow: 'hidden' }}
              >
                <div className="flex justify-between mb-1 flex-wrap">
                  <span
                    className="inline-flex items-center px-2 rounded-full bg-warning text-neutral-900 mb-1"
                    style={{ fontSize: '0.65rem' }}
                  >
                    CORREÇÃO #{idx + 1}
                  </span>
                  <small className="text-brand-primary font-bold whitespace-nowrap" style={{ fontSize: '0.7rem' }}>
                    VER DETALHES &rarr;
                  </small>
                </div>
                {correcao.tarefas?.map((t: any, i: number) => (
                  <div key={i} className="text-sm mb-1 break-words">
                    • {t.descricao || t.acao?.descricao}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default RelatorioModernCard
