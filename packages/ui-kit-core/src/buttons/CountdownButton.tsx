// @hashcodeti/ui-kit-core/buttons/CountdownButton
//
// Wave G.1 (2026-05-15) — promovido de teraprox-SGM-OS/Components/default-components/buttons/countdownRedButton.tsx.
// Botão destrutivo com confirmação por countdown (UX hold-to-confirm). Estado interno mínimo;
// callbacks externos para ação principal e cancelar opcional. Tailwind+Radix (Button primitivo
// existente do ui-kit-core).

import * as React from 'react'
import { Button } from '../primitives/Button'

export interface CountdownButtonProps {
  /** Callback executado quando o countdown chega a 0 e o usuário clica novamente. */
  callback: () => void
  /** Tempo em segundos do countdown antes de habilitar a confirmação. */
  countdownTime: number
  /** Callback opcional executado ao cancelar. */
  callback2?: () => void
  /** Label do botão (default "Confirmar"). */
  label?: string
  /** Label do botão de cancelar (default "Cancelar"). */
  cancelLabel?: string
}

/**
 * CountdownButton — confirmação destrutiva com countdown.
 *
 * Click 1 → ativa countdown.
 * Click 2 (após countdown=0) → executa `callback`.
 * Cancelar → executa `callback2` (se fornecido) e reseta.
 *
 * @example
 * <CountdownButton callback={onDelete} countdownTime={5} />
 */
export const CountdownButton: React.FC<CountdownButtonProps> = ({
  callback,
  countdownTime,
  callback2,
  label = 'Confirmar',
  cancelLabel = 'Cancelar',
}) => {
  const [countdown, setCountdown] = React.useState(countdownTime)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    if (!active) return
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [active, countdown])

  const handleClick = React.useCallback(() => {
    if (!active) {
      setActive(true)
      return
    }
    if (countdown <= 0) callback()
  }, [active, countdown, callback])

  const handleCancel = React.useCallback(() => {
    if (callback2) callback2()
    setActive(false)
    setCountdown(countdownTime)
  }, [callback2, countdownTime])

  if (!active) {
    return (
      <div className="flex gap-2">
        <Button variant="danger" onClick={handleClick}>
          {label}
        </Button>
        {callback2 && (
          <Button variant="secondary" onClick={handleCancel}>
            {cancelLabel}
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <Button variant="danger" disabled={countdown > 0} onClick={handleClick}>
        {countdown > 0 ? `Aguarde (${countdown}s)` : label}
      </Button>
      <Button variant="secondary" onClick={handleCancel}>
        {cancelLabel}
      </Button>
    </div>
  )
}
