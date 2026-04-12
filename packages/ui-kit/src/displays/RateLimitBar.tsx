import React, { useMemo } from 'react'

export interface RateLimitEntry {
  used: number
  limit: number
  exceeded: boolean
  windowReset: string  // ISO 8601
}

export interface RateLimitBarProps {
  /** Rate limit entry from CoreService.rateLimits[pathGroup] */
  entry: RateLimitEntry | undefined
  /** Optional label shown above the bar (e.g. "Login") */
  label?: string
  /** Additional CSS class */
  className?: string
}

function formatResetIn(windowReset: string): string {
  const resetAt = new Date(windowReset).getTime()
  const remaining = Math.max(0, Math.round((resetAt - Date.now()) / 1000))
  if (remaining <= 0) return 'agora'
  if (remaining < 60) return `${remaining}s`
  return `${Math.round(remaining / 60)}min`
}

/**
 * Displays a colored progress bar with rate limit usage.
 *
 * Color thresholds:
 *   < 70% → green
 *   70–89% → yellow
 *   ≥ 90% or exceeded → red
 *
 * Hides itself when no entry is provided (tenant has no rate limit configured).
 *
 * Usage in remotes:
 *   import { RateLimitBar } from 'teraprox-ui-kit'
 *   const { rateLimits } = useCoreService()
 *   <RateLimitBar entry={rateLimits['user_auth_POST']} label="Login" />
 */
export const RateLimitBar: React.FC<RateLimitBarProps> = ({ entry, label, className }) => {
  const pct = useMemo(() => {
    if (!entry || entry.limit <= 0) return 0
    return Math.min(100, Math.round((entry.used / entry.limit) * 100))
  }, [entry])

  if (!entry) return null

  const color =
    entry.exceeded || pct >= 90 ? '#dc3545'  // red
    : pct >= 70                 ? '#ffc107'  // yellow
    :                             '#28a745'  // green

  const containerStyle: React.CSSProperties = {
    width: '100%',
    marginBottom: '4px',
  }

  const barTrackStyle: React.CSSProperties = {
    height: '6px',
    width: '100%',
    backgroundColor: '#e9ecef',
    borderRadius: '3px',
    overflow: 'hidden',
  }

  const barFillStyle: React.CSSProperties = {
    height: '100%',
    width: `${pct}%`,
    backgroundColor: color,
    borderRadius: '3px',
    transition: 'width 0.3s ease, background-color 0.3s ease',
  }

  const textStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#6c757d',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2px',
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={textStyle}>
        {label && <span>{label}</span>}
        <span>
          {entry.used}/{entry.limit} req
          {entry.exceeded
            ? ' — limite atingido'
            : ` (reset em ${formatResetIn(entry.windowReset)})`}
        </span>
      </div>
      <div style={barTrackStyle}>
        <div style={barFillStyle} />
      </div>
    </div>
  )
}

export default RateLimitBar
