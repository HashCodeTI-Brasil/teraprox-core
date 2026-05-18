// @hashcodeti/ui-kit-core/primitives/DateRange
//
// Wave G.1 (2026-05-15) — promovido de teraprox-SGM-OS/Components/default-components/Date/DateRange.js.
// Par de inputs `type="date"` para captura de intervalo. Apresentacional puro,
// 100% Tailwind (TextField primitive interno via inputVariants), props-driven.

import * as React from 'react'
import { TextField } from '../TextField'
import { cn } from '../../lib/cn'

export interface DateRangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  startDate?: string
  endDate?: string
  onStartChange?: (value: string) => void
  onEndChange?: (value: string) => void
  /** Label para o input de início (a11y, default não mostra). */
  startLabel?: string
  /** Label para o input de fim (a11y, default não mostra). */
  endLabel?: string
  /** Tamanho dos inputs. Compat com TextField sizes. */
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

/**
 * DateRange — par de inputs date (início + fim).
 *
 * @example
 * <DateRange startDate={start} endDate={end}
 *   onStartChange={setStart} onEndChange={setEnd} />
 */
export const DateRange = React.forwardRef<HTMLDivElement, DateRangeProps>(
  (
    {
      startDate,
      endDate,
      onStartChange,
      onEndChange,
      startLabel,
      endLabel,
      size = 'sm',
      className,
      disabled,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={cn('flex gap-2 items-end', className)} {...props}>
      <TextField
        type="date"
        size={size}
        value={startDate || ''}
        onChange={(e) => onStartChange?.(e.target.value)}
        aria-label={startLabel || 'Data inicial'}
        disabled={disabled}
      />
      <TextField
        type="date"
        size={size}
        value={endDate || ''}
        onChange={(e) => onEndChange?.(e.target.value)}
        aria-label={endLabel || 'Data final'}
        disabled={disabled}
      />
    </div>
  ),
)
DateRange.displayName = 'DateRange'

/** Alias compat — legado usava `DateRangeField`. */
export const DateRangeField = DateRange
