// @hashcodeti/ui-kit-sgm/os/OrdemDeServicoDisplayCard
//
// Wave H.3 (2026-05-15) — promovido de
// teraprox-SGM-OS/Components/manutencao/OrdemDeServico/OrdemDeServicoDisplayCard.js.
//
// Componente apresentacional para exibição de uma OS em formato de "card
// expansível com lista de label/valor". Distingue-se do `OsCard` (compact
// card de planejamento com badges/chips/Iniciar/Continuar) por servir o
// contexto de **formulário/edição inline** (descrição, tipo, mantenedores,
// recurso, modos de falha — todos editáveis via slots controlados pelo
// caller).
//
// Decisão Wave H.3: componente PRÓPRIO (não variant de OsCard). OsCard e
// OrdemDeServicoDisplayCard têm paradigmas visuais e features distintas;
// fundi-los em um único componente inflaria props com dezenas de callbacks
// de inline-edit irrelevantes para o caso planejamento.
//
// Refactor hexagonal aplicado:
//  - useDispatch eliminado → callback `onNavigate(osId)` (caller decide se
//    despacha `setOrdemDeServicoView` antes de navegar).
//  - useNavigate eliminado → mesmo callback `onNavigate`.
//  - useOrdemDeServicoDisplayCard hook eliminado → caller passa pré-computados
//    (`statusColor`, `isForm`, `isClickable`, `setorDisplay`,
//    `solicitacaoNode`).
//  - TimerDisplay (legacy ui-kit) eliminado → slot `timerSlot?: ReactNode`.
//  - Inline-edit fields (descrição/tipo) eliminados → slots
//    `descricaoSlot`/`tipoSlot`/`recursoSlot`/`mantenedorSlot`/`modosSlot`/
//    `actionSlot` controlados pelo caller (que injeta ClickToWriteField,
//    AutoComplete etc.).
//  - 100% Tailwind + ui-kit-core (Card/CardBody/Collapsible).

import * as React from 'react'
import { PiArrowBendUpRightBold } from 'react-icons/pi'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import {
  Card,
  CardBody,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  cn,
} from '@hashcodeti/ui-kit-core'

export interface OrdemDeServicoDisplayCardItem {
  /** Rótulo curto (esquerda). */
  label: string
  /** Conteúdo (direita ou abaixo do label). */
  content: React.ReactNode
  /** Visualmente sinaliza interatividade (caret, cursor). */
  clickable?: boolean
  /** Quando false, o item é omitido. Default: true. */
  shouldShow?: boolean
}

export interface OrdemDeServicoDisplayCardProps {
  /** Texto exibido no faixa esquerda (id da OS ou "Os em criação"). */
  idLabel: React.ReactNode
  /** Cor de fundo da faixa esquerda (mapeia status → cor; passe roxo se isForm). */
  statusColor: string
  /** Form mode (desenha id em vertical, faixa roxa). */
  isForm?: boolean
  /** Highlight de destaque externo (ex.: navegação por anchor). */
  highlighted?: boolean
  /** Lista de items label/valor; use slots para conteúdo customizado. */
  items: OrdemDeServicoDisplayCardItem[]
  /** Quantos itens ficam visíveis antes de "ver mais". Default: 5. */
  initialVisibleCount?: number
  /** Texto do botão expandir. Default: "Ver mais". */
  expandLabel?: string
  /** Texto do botão recolher. Default: "Ver menos". */
  collapseLabel?: string
  /**
   * Disparado ao clicar no ícone de navegação (canto direito).
   * Caller é responsável por dispatchar setOrdemDeServicoView e navegar.
   */
  onNavigate?: () => void
  /** Classe extra para o root Card. */
  className?: string
}

const OrdemDeServicoDisplayCardImpl = React.forwardRef<
  HTMLDivElement,
  OrdemDeServicoDisplayCardProps
>(function OrdemDeServicoDisplayCard(
  {
    idLabel,
    statusColor,
    isForm = false,
    highlighted = false,
    items,
    initialVisibleCount = 5,
    expandLabel = 'Ver mais',
    collapseLabel = 'Ver menos',
    onNavigate,
    className,
  },
  ref,
) {
  const [open, setOpen] = React.useState(false)

  const visible = items.filter((it) => it.shouldShow !== false)
  const head = visible.slice(0, initialVisibleCount)
  const tail = visible.slice(initialVisibleCount)
  const hasOverflow = tail.length > 0

  return (
    <Card
      ref={ref}
      className={cn(
        'mb-2 flex flex-row overflow-hidden border border-surface-border bg-white shadow-sm',
        highlighted && 'ring-2 ring-violet-400',
        className,
      )}
    >
      {/* Faixa esquerda — id badge / status color */}
      <div
        className={cn(
          'flex shrink-0 items-center justify-center px-3 py-2 text-center',
          'min-w-[75px] rounded-sm shadow-[1px_12px_5px_rgba(170,170,170,0.1)]',
        )}
        style={{ backgroundColor: statusColor }}
      >
        <strong
          className={cn(
            'whitespace-nowrap text-[1.2rem] leading-tight',
            isForm && 'rotate-180 text-white [writing-mode:vertical-rl] [direction:rtl]',
          )}
        >
          {idLabel}
        </strong>
      </div>

      {/* Conteúdo */}
      <CardBody className="flex-1 p-3">
        <ul className="m-0 list-none space-y-1.5 p-0">
          {head.map((it, i) => (
            <DisplayRow key={`head-${i}-${it.label}`} item={it} />
          ))}
        </ul>

        {hasOverflow && (
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleContent>
              <ul className="m-0 mt-1.5 list-none space-y-1.5 p-0">
                {tail.map((it, i) => (
                  <DisplayRow key={`tail-${i}-${it.label}`} item={it} />
                ))}
              </ul>
            </CollapsibleContent>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className={cn(
                  'mt-2 inline-flex items-center gap-1 text-xs font-medium',
                  'text-violet-700 hover:text-violet-900 focus:outline-none',
                )}
              >
                {open ? (
                  <>
                    <FaChevronUp size={10} /> {collapseLabel}
                  </>
                ) : (
                  <>
                    <FaChevronDown size={10} /> {expandLabel}
                  </>
                )}
              </button>
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </CardBody>

      {/* Faixa direita — navegar */}
      {onNavigate && (
        <button
          type="button"
          onClick={onNavigate}
          aria-label="Abrir OS"
          className={cn(
            'shrink-0 self-start p-2 text-neutral-500 transition-transform',
            'hover:scale-110 hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400',
          )}
        >
          <PiArrowBendUpRightBold size={25} />
        </button>
      )}
    </Card>
  )
})

const DisplayRow: React.FC<{ item: OrdemDeServicoDisplayCardItem }> = ({ item }) => (
  <li
    className={cn(
      'flex flex-col gap-0.5 border-b border-neutral-100 pb-1.5 last:border-b-0 last:pb-0',
      'sm:flex-row sm:items-start sm:gap-3',
      item.clickable && 'cursor-pointer',
    )}
  >
    <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:w-32">
      {item.label}
    </span>
    <span className="min-w-0 flex-1 text-sm text-neutral-800">{item.content}</span>
  </li>
)

export const OrdemDeServicoDisplayCard = React.memo(OrdemDeServicoDisplayCardImpl)

// ─── Helpers cross-domain (status → cor canônico). Reexpostos para que
// callers reproduzam a paleta legacy sem hardcode local. Difere do
// `getOsStatusMeta` (statusPalette.ts) que devolve label+cor para chips.
export type OsDisplayStatus = 'PENDENTE' | 'EXECUTANDO' | 'CONCLUIDO' | 'CANCELED' | string | undefined | null

export function getOrdemDeServicoDisplayColor(status: OsDisplayStatus): string {
  switch (status) {
    case 'PENDENTE':
      return '#FFFF00'
    case 'EXECUTANDO':
      return '#00FF00'
    case 'CONCLUIDO':
      return '#ccc'
    case 'CANCELED':
      return '#FF0000'
    default:
      return '#e5e7eb'
  }
}

export default OrdemDeServicoDisplayCard
