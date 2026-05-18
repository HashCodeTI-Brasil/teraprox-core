// @hashcodeti/ui-kit-core/primitives/Toast — wrapper alto-nível
//
// Entrega o trio que torna toasts ergonômicos:
//   1. `<Toaster />` — componente declarativo (Provider + Viewport + render
//      automático dos toasts ativos). Monte UMA vez no shell da app.
//   2. `useToast()` — hook imperativo. Retorna `{ toast, dismiss, toasts }`.
//      Usável em qualquer descendente do `<Toaster />`.
//   3. `ToastContext` — context interno (não exportado como API pública;
//      apenas para o wrapper conectar provider ↔ consumers).
//
// Pattern de uso:
//   // src/AppShell.tsx
//   import { Toaster } from '@hashcodeti/ui-kit-core'
//   <App />
//   <Toaster />          // ← uma vez, no root
//
//   // src/screens/Foo.tsx
//   const { toast } = useToast()
//   toast({ tone: 'success', title: 'Salvo' })
//
// Store strategy: useState com array de `ToastItem`. Decisão deliberada
// vs useReducer:
//   - API mínima (add/remove) — não justifica overhead de reducer
//   - Updates são always-replace do array (imutável)
//   - Funções `toast()` / `dismiss()` ficam estáveis via useCallback
// useReducer só valeria se houvéssemos múltiplas actions correlacionadas
// (update, pause, resume parcial). Hoje: KISS.

import * as React from 'react'
import {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  type ToastTone,
  type ToastSize,
} from './Toast'

// ─── Tipos públicos ───────────────────────────────────────────────────────

export interface ToastActionDescriptor {
  /** Label do botão. */
  label: React.ReactNode
  /** Callback invocado no click. */
  onClick: () => void
  /** Texto alternativo para screen readers. Default = label se string. */
  altText?: string
}

export interface ToastOptions {
  /** Título (em <strong>). Opcional, mas recomendado p/ a11y. */
  title?: React.ReactNode
  /** Descrição/corpo. Opcional. */
  description?: React.ReactNode
  /** Tom semântico. Default `info`. */
  tone?: ToastTone
  /** Tamanho. Default `md`. */
  size?: ToastSize
  /** Duração antes de auto-dismiss (ms). Default herdado do Provider. */
  duration?: number
  /** Botão de ação opcional (ex.: "Desfazer"). */
  action?: ToastActionDescriptor
  /** Render close button (X). Default `true`. */
  closable?: boolean
  /**
   * ID estável p/ dismiss programático. Auto-gerado se omitido. Passar mesmo
   * ID em chamada subsequente substitui o toast existente (use-case: progresso).
   */
  id?: string
}

export interface ToastItem extends Omit<ToastOptions, 'id'> {
  /** ID estável (sempre presente — auto-gerado se não fornecido). */
  id: string
  /** Estado open controlado — gerenciado pelo Toaster. */
  open: boolean
}

export interface UseToastReturn {
  /** Lista atual de toasts (incluindo os já em animação de fechamento). */
  toasts: ToastItem[]
  /** Dispara novo toast. Retorna o id (gerado ou recebido). */
  toast: (opts: ToastOptions) => string
  /** Fecha por id; sem args fecha todos. */
  dismiss: (id?: string) => void
}

// ─── Context interno ──────────────────────────────────────────────────────

const ToastContext = React.createContext<UseToastReturn | null>(null)

/**
 * useToast — hook imperativo p/ disparar toasts. Requer `<Toaster />` ancestor.
 *
 * @example
 * const { toast } = useToast()
 * toast({ tone: 'success', title: 'Pedido criado' })
 */
export function useToast(): UseToastReturn {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    throw new Error(
      '[ui-kit-core/useToast] hook chamado fora de <Toaster />. Monte <Toaster /> na raiz da app.',
    )
  }
  return ctx
}

// ID gen — sem deps externas (uuid). Counter monotônico + Math.random fallback.
let _toastIdSeq = 0
const genId = (): string => `t${Date.now().toString(36)}-${(_toastIdSeq++).toString(36)}`

// ─── Toaster component ───────────────────────────────────────────────────

export interface ToasterProps {
  /** Duração default de cada toast (ms). Default 5000 (Radix default). */
  duration?: number
  /** Direção do swipe-to-dismiss. Default `right`. */
  swipeDirection?: 'right' | 'left' | 'up' | 'down'
  /** px de drag até confirmar swipe. Default 50. */
  swipeThreshold?: number
  /** Label a11y da region de toasts. Default `Notificações`. */
  label?: string
  /** className aplicada ao Viewport (override de position). */
  viewportClassName?: string
}

/**
 * Toaster — Provider + Viewport + rendering automático de toasts disparados
 * via `useToast()`. Monte uma vez no shell da app.
 *
 * @example
 * // App root
 * <App />
 * <Toaster />
 *
 * // Qualquer componente abaixo do Toaster
 * const { toast } = useToast()
 * toast({ tone: 'success', title: 'Salvo!' })
 *
 * @example
 * // Override posição
 * <Toaster viewportClassName="fixed top-0 left-1/2 -translate-x-1/2 max-w-sm" />
 */
export const Toaster: React.FC<ToasterProps> = ({
  duration = 5000,
  swipeDirection = 'right',
  swipeThreshold,
  label = 'Notificações',
  viewportClassName,
}) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const dismiss = React.useCallback((id?: string) => {
    setToasts((prev) =>
      id == null
        ? prev.map((t) => ({ ...t, open: false }))
        : prev.map((t) => (t.id === id ? { ...t, open: false } : t)),
    )
  }, [])

  const toast = React.useCallback(
    (opts: ToastOptions): string => {
      const id = opts.id ?? genId()
      setToasts((prev) => {
        const existing = prev.findIndex((t) => t.id === id)
        const next: ToastItem = { ...opts, id, open: true }
        if (existing >= 0) {
          const copy = prev.slice()
          copy[existing] = next
          return copy
        }
        return [...prev, next]
      })
      return id
    },
    [],
  )

  // Garbage-collect entries fechadas após animação de exit. Listener via
  // onOpenChange (Radix) — quando vira false, agenda remoção.
  const handleOpenChange = React.useCallback((id: string, open: boolean) => {
    if (!open) {
      // Pequeno delay p/ animação de exit completar.
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 200)
    }
  }, [])

  const ctxValue = React.useMemo<UseToastReturn>(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss],
  )

  return (
    <ToastContext.Provider value={ctxValue}>
      <ToastProvider
        duration={duration}
        swipeDirection={swipeDirection}
        swipeThreshold={swipeThreshold}
        label={label}
      >
        {toasts.map((t) => {
          const altText =
            t.action?.altText ??
            (typeof t.action?.label === 'string' ? t.action.label : 'Ação')
          return (
            <ToastRoot
              key={t.id}
              tone={t.tone}
              size={t.size}
              open={t.open}
              duration={t.duration}
              onOpenChange={(open) => handleOpenChange(t.id, open)}
            >
              <div className="flex-1 min-w-0">
                {t.title ? <ToastTitle>{t.title}</ToastTitle> : null}
                {t.description ? (
                  <ToastDescription>{t.description}</ToastDescription>
                ) : null}
              </div>

              {t.action ? (
                <ToastAction
                  altText={altText}
                  onClick={() => {
                    t.action?.onClick()
                    dismiss(t.id)
                  }}
                >
                  {t.action.label}
                </ToastAction>
              ) : null}

              {(t.closable ?? true) && <ToastClose />}
            </ToastRoot>
          )
        })}

        <ToastViewport className={viewportClassName} />
      </ToastProvider>
    </ToastContext.Provider>
  )
}
Toaster.displayName = 'Toaster'
