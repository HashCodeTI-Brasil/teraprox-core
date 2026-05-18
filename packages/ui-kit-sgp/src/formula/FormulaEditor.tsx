// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/FormulaEditor.tsx
// Wave H.6 (2026-05-15) — DOMAIN_COMPOSITION view-puro Tailwind+Radix.
//
// Refactor:
// - useToasts (react-toast-notifications) -> prop callback `onNotify` (default no-op).
// - Modais aninhados convertidos para Modal Radix do ui-kit-core (Modal/ModalHeader/ModalBody/ModalFooter).
// - Sub-componentes extraidos para ./tokens/{TokenBadge,TokenDragItem,tokenStyles}.
// - Hook useDragFormula extraido para ./hooks/useDragFormula.
// - ReferenciaDinamicaPicker importado canonicamente de ./ReferenciaDinamicaPicker.
// - mathjs preservado (peerDep optional).
// - Sem Redux, sem useCoreService — caller injeta saveCallBack.
import { ReactNode } from 'react'
import { evaluate } from 'mathjs'
import {
  FiActivity,
  FiAlertCircle,
  FiBookOpen,
  FiCode,
  FiEdit2,
  FiGrid,
  FiRefreshCw,
  FiSliders,
  FiTarget,
  FiTerminal,
} from 'react-icons/fi'
import { MdFunctions, MdOutlineCalculate, MdSensors } from 'react-icons/md'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from '@hashcodeti/ui-kit-core'
import { type ReferenciaCampoVM } from './ReferenciaDinamicaPicker'
import { useDragFormula } from './hooks/useDragFormula'
import { TOKEN_STYLES, getTokenStyle } from './tokens/tokenStyles'
import { TokenBadge } from './tokens/TokenBadge'
import { TokenDragItem } from './tokens/TokenDragItem'
import { useState } from 'react'

export interface FormulaEditorProps {
  /** Formula raw inicial (`[Name:value:label]` tokens entremeados de operadores). */
  defaultFormula?: string
  /** Persistencia da formula raw — chamado em onBlur do editor de texto e em todo drop. */
  saveCallBack: (raw: string) => void
  title?: string
  resultLabel?: string
  resultUnit?: string
  /** Toast/feedback callback. Default: no-op. */
  onNotify?: (msg: string, level: 'success' | 'warning' | 'info' | 'error') => void
  /**
   * Render-prop OBRIGATORIO: caller injeta o ReferenciaDinamicaPicker (canonico
   * em ui-kit-sgp/formula/) configurado com seus loaders de caderno/campos. Mantem
   * inversao de controle — o editor nao acopla IO de processo.
   */
  renderReferenciaPicker: (props: { onSelect: (campo: ReferenciaCampoVM) => void }) => ReactNode
}

const PALETTE_TOKENS = [
  { name: 'ValorAlvo', label: 'valorCorrigido', value: 'V0', display: 'Valor Alvo' },
  { name: 'ValorAtual', label: 'valorReal', value: 'Vat', display: 'Valor Atual' },
] as const

export const FormulaEditor = ({
  defaultFormula,
  saveCallBack,
  title = 'Editor de Formula',
  resultLabel = 'Resultado Simulado',
  resultUnit = '',
  onNotify = () => {},
  renderReferenciaPicker,
}: FormulaEditorProps) => {
  const f = useDragFormula({ defaultFormula, onPersist: saveCallBack })

  // panels
  const [showTextEditor, setShowTextEditor] = useState(false)
  const [showRawFormula, setShowRawFormula] = useState(false)
  const [showPlayground, setShowPlayground] = useState(false)
  const [simulationValues, setSimulationValues] = useState<Record<string, any>>({})

  // modals
  const [showVirtualModal, setShowVirtualModal] = useState(false)
  const [showFieldPickerModal, setShowFieldPickerModal] = useState(false)
  const [showControleModal, setShowControleModal] = useState(false)

  const [newToken, setNewToken] = useState<{ name: string; label: string }>({ name: '', label: '' })
  const [campo, setCampo] = useState<ReferenciaCampoVM | null>(null)
  const [controleRef, setControleRef] = useState<any>(null)
  const [invalidAction] = useState(false)

  const evaluateFormula = () => {
    try {
      if (!f.formulaDisplay) return null
      let raw = f.replaceTokensInDisplay()
      f.tokenMap.forEach((token, key) => {
        const simVal = simulationValues[key] ?? 0
        const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        raw = raw.replace(
          new RegExp(`\\[${esc}:${String(token.value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:${token.label}\\]`, 'g'),
          simVal,
        )
      })
      const result = evaluate(raw.replace(/,/g, '.'))
      return typeof result === 'number' ? parseFloat(result.toFixed(4)) : result
    } catch {
      return 'Erro'
    }
  }

  const renderPicker = (onSelect: (c: ReferenciaCampoVM) => void) =>
    renderReferenciaPicker({ onSelect })

  return (
    <div style={{ marginTop: 12, marginBottom: 8 }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3.5">
        <MdOutlineCalculate size={20} style={{ color: '#1a56db', flexShrink: 0 }} />
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>{title}</span>
      </div>

      {/* PALETTE */}
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 16px', marginBottom: 12 }}>
        <div className="flex items-center gap-1.5 mb-3">
          <FiGrid size={13} style={{ color: '#6b7280' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Paleta de Componentes
          </span>
          <span className="ml-auto" style={{ fontSize: '0.68rem', color: '#9ca3af' }}>
            Clique ou arraste para a formula
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>
              Valores de Referencia
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {PALETTE_TOKENS.map((t) => (
                <Tooltip key={t.name} content={`${getTokenStyle(t.label).label} — inserido diretamente na formula`}>
                  <span>
                    <TokenBadge
                      styleKey={t.label}
                      text={t.display}
                      draggable
                      onDragStart={(e) => f.handleDragStart(e, -1, true, 'token', t)}
                      onDragEnd={f.handleDragEnd}
                      onClick={() => f.addTokenToFormula(t as any)}
                    />
                  </span>
                </Tooltip>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>
              Controle
            </div>
            <Tooltip content="Ultimo valor registrado de um controle do caderno">
              <span>
                <TokenBadge
                  styleKey="controle"
                  text="+ Referenciar Controle"
                  iconOverride={<MdSensors size={13} />}
                  cursor="pointer"
                  onClick={() => setShowControleModal(true)}
                />
              </span>
            </Tooltip>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>
              Entrada do Usuario
            </div>
            <Tooltip content="Campo preenchido pelo usuario no momento do calculo">
              <span>
                <TokenBadge
                  styleKey="campoVirtual"
                  text="+ Campo Manual"
                  iconOverride={<FiEdit2 size={12} />}
                  cursor="pointer"
                  onClick={() => setShowVirtualModal(true)}
                />
              </span>
            </Tooltip>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>
              Campo de Verificacao
            </div>
            <Tooltip content="Valor de um campo especifico do caderno de verificacao">
              <span>
                <TokenBadge
                  styleKey="campoDeVerificacao"
                  text="+ Campo do Caderno"
                  iconOverride={<FiBookOpen size={12} />}
                  cursor="pointer"
                  onClick={() => setShowFieldPickerModal(true)}
                />
              </span>
            </Tooltip>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>
              Operadores
            </div>
            <div className="flex gap-1 flex-wrap">
              {['+', '-', '*', '/', '^', '(', ')'].map((op) => (
                <button
                  key={op}
                  draggable
                  onDragStart={(e) => f.handleDragStart(e, -1, true, 'operator', op)}
                  onDragEnd={f.handleDragEnd}
                  onClick={() => f.insertOperator(op)}
                  className="inline-flex items-center justify-center"
                  style={{
                    background: '#fff', border: '1.5px solid #d1d5db', borderRadius: 6,
                    color: '#374151', fontFamily: 'monospace', fontWeight: 700,
                    fontSize: '0.9rem', cursor: 'grab', minWidth: 34, height: 32,
                  }}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>
              Constante
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="number"
                placeholder="0"
                id="quickNumber"
                style={{ width: 68, height: 32, fontSize: '0.82rem' }}
                className="rounded border border-gray-300 px-2"
              />
              <button
                onClick={() => {
                  const el = document.getElementById('quickNumber') as HTMLInputElement
                  f.insertNumber(el.value)
                  el.value = ''
                }}
                className="flex items-center justify-center"
                style={{
                  background: '#111827', border: 'none', borderRadius: 6, color: '#fff',
                  width: 32, height: 32, cursor: 'pointer', fontWeight: 700, fontSize: '1rem',
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VISUAL BUILDER */}
      <div style={{ marginBottom: 12 }}>
        <div className="flex items-center gap-1.5 mb-2">
          <MdFunctions size={14} style={{ color: '#6b7280' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Construtor Visual
          </span>
          <span className="ml-auto" style={{ fontSize: '0.68rem', color: '#9ca3af' }}>
            Reordene arrastando
          </span>
          {f.formulaDisplay && (
            <button
              onClick={() => f.clearAll()}
              className="flex items-center gap-1"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '0.72rem', padding: 0 }}
            >
              <FiRefreshCw size={11} /> Limpar
            </button>
          )}
        </div>

        <div
          className="flex flex-wrap items-center"
          style={{
            minHeight: 64, border: '2px dashed #bfdbfe', borderRadius: 10,
            background: '#f0f9ff', padding: '10px 12px',
            transition: 'border-color .2s',
          }}
        >
          {(() => {
            const segs = f.getSegments()
            const items: ReactNode[] = []
            const DropZone = ({ idx }: { idx: number }) => (
              <div
                key={`dz-${idx}`}
                onDragOver={(e) => f.handleDragOver(e, idx)}
                onDragLeave={() => f.setDropIndex(null)}
                onDrop={(e) => f.handleDrop(e, idx)}
                style={{
                  width: f.dropIndex === idx ? 14 : 6, height: 30, borderRadius: 4,
                  background: f.dropIndex === idx ? '#f59e0b' : 'transparent',
                  transition: 'all .15s', display: 'inline-block', margin: '0 1px',
                  boxShadow: f.dropIndex === idx ? '0 0 6px rgba(245,158,11,.5)' : 'none',
                }}
              />
            )
            segs.forEach((seg, idx) => {
              if (idx === 0) items.push(<DropZone key={`dz-${idx}`} idx={0} />)
              items.push(
                <TokenDragItem
                  key={`seg-${idx}`}
                  seg={seg as any}
                  idx={idx}
                  onDragStart={f.handleDragStart}
                  onDragEnd={f.handleDragEnd}
                  onDelete={f.handleDeleteSegmentAt}
                />,
              )
              items.push(<DropZone key={`dz-${idx + 1}`} idx={idx + 1} />)
            })
            return items
          })()}

          {f.formulaDisplay === '' && (
            <div className="w-full text-center" style={{ color: '#93c5fd', fontSize: '0.8rem', padding: '8px 0' }}>
              <MdFunctions size={22} style={{ display: 'block', margin: '0 auto 4px' }} />
              Arraste os componentes da paleta ou clique neles para construir o calculo
            </div>
          )}
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex gap-4 items-center mb-1 flex-wrap">
        <button
          onClick={() => setShowTextEditor((p) => !p)}
          className="flex items-center gap-1"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: showTextEditor ? '#1a56db' : '#6b7280', fontSize: '0.75rem', padding: 0, fontWeight: showTextEditor ? 700 : 400 }}
        >
          <FiTerminal size={12} /> Editor de Texto
        </button>
        <button
          onClick={() => setShowPlayground((p) => !p)}
          className="flex items-center gap-1"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: showPlayground ? '#059669' : '#6b7280', fontSize: '0.75rem', padding: 0, fontWeight: showPlayground ? 700 : 400 }}
        >
          <FiSliders size={12} /> Playground de Simulacao
        </button>
        <button
          onClick={() => setShowRawFormula((p) => !p)}
          className="flex items-center gap-1"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: showRawFormula ? '#7e3af2' : '#6b7280', fontSize: '0.75rem', padding: 0, fontWeight: showRawFormula ? 700 : 400 }}
        >
          <FiCode size={12} /> Token Interno
        </button>
      </div>

      {showTextEditor && (
        <div style={{ marginBottom: 8, marginTop: 8 }}>
          <input
            key={`fe-${f.formulaKey}`}
            id="formulaBuilder"
            autoComplete="off"
            value={f.formulaDisplay}
            type="text"
            ref={f.inputRef as any}
            className="w-full rounded"
            style={{ fontFamily: 'monospace', fontSize: '0.85rem', background: '#1e293b', color: '#e2e8f0', border: invalidAction ? '1px solid #ef4444' : 'none', padding: '6px 10px' }}
            placeholder="Ex: (!ValorAtual - 10) * 2"
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                f.setEdited(true)
                f.handleBackspace(e as any)
              }
            }}
            onBlur={() => f.saveFormula()}
            onPaste={(e) => f.handlePaste(e as any)}
            onChange={(e) => {
              f.setEdited(true)
              f.setFormulaDisplay(e.target.value)
            }}
            onCopy={(e) => f.handleCopy(e as any, () => onNotify('Formula copiada com tokens internos.', 'success'))}
          />
        </div>
      )}

      {showRawFormula && (
        <div style={{ background: '#0f172a', borderRadius: 8, padding: '8px 12px', marginBottom: 8, fontFamily: 'monospace', fontSize: '0.75rem', color: '#94a3b8', wordBreak: 'break-all' }}>
          <span style={{ color: '#7e3af2' }}>TOKEN: </span>
          {f.replaceTokensInDisplay() || '—'}
        </div>
      )}

      {showPlayground && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 16, marginBottom: 8 }}>
          <div className="flex items-center gap-1.5 mb-3">
            <FiSliders size={14} style={{ color: '#059669' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#065f46' }}>Simulacao de Valores</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2">
              {f.tokenMap.size === 0 ? (
                <div style={{ color: '#6b7280', fontSize: '0.8rem', padding: '12px 0' }}>
                  Nenhuma variavel na formula.
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {[...f.tokenMap.entries()].map(([key, token]) => {
                    const s = getTokenStyle(token.label)
                    return (
                      <div key={key} style={{ minWidth: 140 }}>
                        <div className="flex items-center gap-1 mb-1">
                          <span style={{ color: s.bg }} className="flex items-center">{s.icon}</span>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#374151' }}>{token.name ?? key}</span>
                        </div>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={simulationValues[key] ?? ''}
                          onChange={(e) => setSimulationValues((p) => ({ ...p, [key]: e.target.value }))}
                          className="w-full rounded px-2 py-1"
                          style={{ borderColor: s.bg, borderWidth: 1, fontSize: '0.82rem' }}
                        />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div
                className="flex flex-col items-center justify-center text-center"
                style={{ background: '#047857', borderRadius: 10, padding: 16, minHeight: 80 }}
              >
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,.7)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 4 }}>
                  {resultLabel.toUpperCase()}
                </div>
                {(() => {
                  const res = evaluateFormula()
                  if (res === null) return <span style={{ color: 'rgba(255,255,255,.4)', fontSize: '1.4rem' }}>—</span>
                  if (res === 'Erro')
                    return (
                      <div className="flex items-center gap-1.5" style={{ color: '#fcd34d' }}>
                        <FiAlertCircle size={18} />
                        <span style={{ fontSize: '0.8rem' }}>Formula invalida</span>
                      </div>
                    )
                  return (
                    <div style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800 }}>
                      {res}
                      {resultUnit && <span style={{ fontSize: '0.9rem', opacity: 0.7, marginLeft: 4 }}>{resultUnit}</span>}
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL — Campo Manual */}
      <Modal open={showVirtualModal} onOpenChange={setShowVirtualModal} size="sm">
        <ModalHeader>
          <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>
            <FiEdit2 size={14} style={{ marginRight: 6, display: 'inline' }} />
            Campo Manual (Entrada do Usuario)
          </span>
        </ModalHeader>
        <ModalBody>
          <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Nome da variavel</label>
          <input
            type="text"
            placeholder="Ex: VolumeDoTanque"
            autoFocus
            className="w-full rounded border border-gray-300 px-2 py-1 mt-1"
            onChange={(e) => setNewToken({ name: e.target.value.trim(), label: 'campoVirtual' })}
          />
          <p style={{ fontSize: '0.72rem', color: '#6b7280', marginTop: 6 }}>
            O usuario preenchera este valor ao executar o calculo.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" size="sm" onClick={() => setShowVirtualModal(false)}>Cancelar</Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (newToken.name) {
                f.addTokenToFormula({ name: newToken.name, label: 'campoVirtual', value: 'virtual' })
                setShowVirtualModal(false)
                setNewToken({ name: '', label: '' })
              }
            }}
          >
            Inserir
          </Button>
        </ModalFooter>
      </Modal>

      {/* MODAL — Campo de Verificacao */}
      <Modal open={showFieldPickerModal} onOpenChange={setShowFieldPickerModal} size="lg">
        <ModalHeader>
          <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>
            <FiBookOpen size={14} style={{ marginRight: 6, display: 'inline' }} />
            Selecionar Campo de Verificacao
          </span>
        </ModalHeader>
        <ModalBody>
          <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Nome da variavel na formula</label>
          <input
            type="text"
            placeholder="Ex: LarguraMedida"
            className="w-full rounded border border-gray-300 px-2 py-1 mt-1 mb-3"
            onChange={(e) => setNewToken({ name: e.target.value.trim(), label: 'campoDeVerificacao' })}
          />
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Escolha o campo no caderno</label>
            {renderPicker((c) => setCampo(c))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" size="sm" onClick={() => setShowFieldPickerModal(false)}>Cancelar</Button>
          <Button
            size="sm"
            style={{ background: TOKEN_STYLES.campoDeVerificacao.bg, border: 'none', color: '#fff' }}
            onClick={() => {
              if (!newToken.name) return onNotify('Digite um nome para a variavel.', 'warning')
              if (!campo?.id) return onNotify('Selecione um campo do caderno.', 'warning')
              f.addTokenToFormula({ name: newToken.name, label: 'campoDeVerificacao', value: campo.id })
              setShowFieldPickerModal(false)
              setNewToken({ name: '', label: '' })
              setCampo(null)
            }}
          >
            Inserir Campo
          </Button>
        </ModalFooter>
      </Modal>

      {/* MODAL — Controle */}
      <Modal open={showControleModal} onOpenChange={setShowControleModal} size="lg">
        <ModalHeader>
          <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>
            <MdSensors size={16} style={{ marginRight: 6, display: 'inline' }} />
            Referenciar Controle
          </span>
        </ModalHeader>
        <ModalBody>
          <p style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: 12 }}>
            Selecione o controle de referencia. O sistema resolvera automaticamente para o{' '}
            <strong>ultimo valor registrado</strong> do campo associado a este controle.
          </p>
          <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Nome da variavel na formula</label>
          <input
            type="text"
            placeholder="Ex: PressaoDeControle"
            className="w-full rounded border border-gray-300 px-2 py-1 mt-1 mb-3"
            onChange={(e) => setNewToken({ name: e.target.value.trim(), label: 'controle' })}
          />
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Escolha o campo de controle</label>
            {renderPicker((c) => setControleRef(c))}
          </div>
          {controleRef && (
            <div style={{ marginTop: 10, padding: '8px 12px', background: '#f5f3ff', borderRadius: 8, border: '1px solid #ddd6fe' }}>
              <span style={{ fontSize: '0.75rem', color: '#7e3af2', fontWeight: 600 }}>
                <MdSensors size={12} style={{ marginRight: 4, display: 'inline' }} />
                Controle selecionado: {controleRef.label ?? controleRef.descricao ?? controleRef.id}
              </span>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" size="sm" onClick={() => setShowControleModal(false)}>Cancelar</Button>
          <Button
            size="sm"
            style={{ background: TOKEN_STYLES.controle.bg, border: 'none', color: '#fff' }}
            onClick={() => {
              if (!newToken.name) return onNotify('Digite um nome para a variavel.', 'warning')
              const refValue = controleRef?.controleRefId ?? controleRef?.id
              if (!refValue) return onNotify('Selecione um campo de controle.', 'warning')
              f.addTokenToFormula({ name: newToken.name, label: 'controle', value: refValue })
              setShowControleModal(false)
              setNewToken({ name: '', label: '' })
              setControleRef(null)
            }}
          >
            Inserir Controle
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default FormulaEditor
