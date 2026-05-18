// @ts-nocheck
// Migrado de teraprox-SGP-caderno/src/Components/processo/CampoDeVerificacaoV2.tsx
// Wave 3B — props-driven (callbacks no lugar de useDispatch).
// Wave F.2.B (2026-05-13) — react-bootstrap removido; migrado para
// @hashcodeti/ui-kit-core (Button, Tooltip, Checkbox). FormField legacy
// preservado (vem de teraprox-ui-kit, fora do escopo desta wave).
import { useRef } from 'react'
import {
  Button,
  Tooltip,
  Checkbox,
} from '@hashcodeti/ui-kit-core'
import { useDrag, useDrop } from 'react-dnd'
import {
  FiAlignLeft,
  FiClock,
  FiCode,
  FiHash,
} from 'react-icons/fi'
import { LuMegaphone, LuMegaphoneOff } from 'react-icons/lu'
import { SiGithubactions } from 'react-icons/si'
import { FormField } from 'teraprox-ui-kit'

const ITEM_TYPE = 'CAMPO_CARD'

export interface CampoVM {
  id?: string | number
  __id?: string | number
  label?: string
  _operacao?: string
  descricao?: string
  controle?: { nomeParametro?: string }
  tipoDeCampo?: 'number' | 'time' | 'formula' | 'text' | string
  regrasDeCorrecao?: any[]
  reporter?: boolean
  unidade?: string
  _frequencia?: string
  posicao?: number
  checked?: boolean
  removed?: boolean
  [key: string]: any
}

export interface CampoDeVerificacaoV2Props {
  campo: CampoVM
  index: number
  camposFiltrados?: any[]
  eventsForCampo?: any
  isMarking?: boolean
  isReordering?: boolean
  moveCard: (
    dragCampoId: string | number,
    hoverCampoId: string | number,
    position: 'before' | 'after',
  ) => void
  getTipoNome: (tipo: string) => string
  toggleTipoFilter: (tipo: string) => void
  editCampoHandler: (campo: CampoVM) => void
  toggleReporter: (campo: CampoVM) => void
  onMarkCampo: (campo: CampoVM, checked: boolean) => void
  onChangePosicao: (campo: CampoVM, valor: any) => void
}

const TipoIcon = ({ type }: { type?: string }) => {
  const size = 14
  switch (type) {
    case 'number':
      return <FiHash size={size} />
    case 'time':
      return <FiClock size={size} />
    case 'formula':
      return <FiCode size={size} />
    case 'text':
    default:
      return <FiAlignLeft size={size} />
  }
}

export const CampoDeVerificacaoV2 = ({
  campo,
  index,
  moveCard,
  getTipoNome,
  toggleTipoFilter,
  editCampoHandler,
  toggleReporter,
  isMarking,
  isReordering,
  onMarkCampo,
  onChangePosicao,
}: CampoDeVerificacaoV2Props) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const campoId = campo.id || campo.__id

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { campoId },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    hover() {
      // Visual via isOver
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(item: any, monitor) {
      try {
        if (!ref.current || !item.campoId) return

        const dragCampoId = item.campoId
        const hoverCampoId = campoId

        if (dragCampoId === hoverCampoId) return

        const hoverBoundingRect = ref.current.getBoundingClientRect()
        const clientOffset = monitor.getClientOffset()
        if (!clientOffset) return

        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        const height = hoverBoundingRect.bottom - hoverBoundingRect.top
        const centerY = height / 2
        const position = hoverClientY < centerY ? 'before' : 'after'

        moveCard(dragCampoId, hoverCampoId, position)
      } catch (e) {
        console.warn('[CampoDeVerificacaoV2] drop computation failed', e)
      }
    },
  })

  drag(drop(ref))

  const cardOpacity = isDragging ? 0.3 : isOver ? 0.7 : campo && campo.removed ? 0.5 : 1
  const removedClass = campo && campo.removed ? ' removed' : ''
  const dragClass = isDragging ? ' dragging' : ''
  const targetClass = isOver ? ' drop-target' : ''

  return (
    <div
      ref={ref}
      style={{
        opacity: cardOpacity,
        transform: isDragging ? 'rotate(2deg) scale(1.02)' : 'none',
        transition: isDragging ? 'none' : 'all 0.2s ease',
        boxShadow: isDragging
          ? '0 8px 16px rgba(0,0,0,0.2)'
          : isOver
            ? '0 4px 12px rgba(0,100,200,0.3)'
            : 'none',
      }}
      className={`campo-card${removedClass}${dragClass}${targetClass}`}
    >
      <div className="campo-row">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="campo-pos-badge">{campo.posicao || index + 1}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div>
                <div className="campo-label">
                  {campo.label || campo._operacao || `#${campo.id || index}`}
                </div>
                <div className="campo-meta">
                  {campo.controle?.nomeParametro || campo.descricao}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginLeft: 8,
            textAlign: 'right',
            minWidth: 140,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {campo.tipoDeCampo && (
              <Tooltip content={`Filtrar por: ${getTipoNome(campo.tipoDeCampo)}`}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleTipoFilter(campo.tipoDeCampo as string)}
                >
                  <TipoIcon type={campo.tipoDeCampo} />
                </div>
              </Tooltip>
            )}

            <Tooltip content={`Regras de correção: ${campo.regrasDeCorrecao?.length || 0}`}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '2px 6px',
                  borderRadius: 10,
                  background:
                    campo.regrasDeCorrecao && campo.regrasDeCorrecao.length
                      ? '#eef6ff'
                      : 'transparent',
                  border:
                    campo.regrasDeCorrecao && campo.regrasDeCorrecao.length
                      ? '1px solid #cfe3ff'
                      : '1px solid transparent',
                  cursor: 'pointer',
                }}
                onClick={() => editCampoHandler(campo)}
              >
                <SiGithubactions
                  size={14}
                  color={
                    campo.regrasDeCorrecao && campo.regrasDeCorrecao.length
                      ? '#0d6efd'
                      : '#6c757d'
                  }
                />
                <span
                  style={{
                    fontSize: 12,
                    color:
                      campo.regrasDeCorrecao && campo.regrasDeCorrecao.length
                        ? '#0d6efd'
                        : '#6c757d',
                  }}
                >
                  {campo.regrasDeCorrecao?.length || 0}
                </span>
              </div>
            </Tooltip>

            <Tooltip
              content={
                campo.reporter
                  ? 'Campo reportado (clique para remover)'
                  : 'Campo não reportado (clique para reportar)'
              }
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
                onClick={() => toggleReporter(campo)}
              >
                {campo.reporter ? (
                  <LuMegaphone size={16} color="#0d6efd" />
                ) : (
                  <LuMegaphoneOff size={16} color="#6c757d" />
                )}
              </div>
            </Tooltip>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 8,
              marginTop: 8,
              alignItems: 'center',
            }}
          >
            <Button
              size="sm"
              variant="link"
              onClick={() => editCampoHandler(campo)}
            >
              Editar
            </Button>
          </div>

          <div
            style={{
              marginTop: 8,
              display: 'flex',
              gap: 12,
              alignItems: 'center',
            }}
          >
            {isMarking && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={!!campo.checked}
                  onCheckedChange={(checked) => onMarkCampo(campo, Boolean(checked))}
                  style={{ transform: 'scale(1.25)', transformOrigin: 'center' }}
                />
              </div>
            )}

            {isReordering && (
              <div style={{ minWidth: 80 }}>
                <FormField
                  label={'Posição'}
                  val={campo.posicao}
                  onBlur={() => {}}
                  onValueUpdate={(valor: any) => onChangePosicao(campo, valor)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <div className="campo-meta">Unidade: {campo.unidade || '-'}</div>
        <div className="campo-meta">Frequencia: {campo._frequencia || '-'}</div>
      </div>
    </div>
  )
}

export default CampoDeVerificacaoV2
