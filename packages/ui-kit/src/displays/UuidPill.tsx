import React, { useState, useRef } from 'react'
import { Badge, Overlay, Tooltip } from 'react-bootstrap'

interface UuidPillProps {
  uuid: string | null | undefined
  bg?: string
  textColor?: string
  short?: number
}

const UuidPill: React.FC<UuidPillProps> = ({ uuid, bg = 'light', textColor = 'dark', short = 8 }) => {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  if (!uuid) return <span className="text-muted">—</span>

  const shortId = String(uuid).substring(0, short)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(uuid)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = uuid
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <Badge
        ref={ref as any}
        bg={bg}
        text={textColor as any}
        pill
        className="border px-2 py-1"
        style={{ cursor: 'pointer', fontFamily: 'monospace', fontSize: '0.8rem', userSelect: 'none' }}
        onClick={handleCopy}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => { setShowTooltip(false); setCopied(false) }}
      >
        {shortId}…
      </Badge>
      <Overlay target={ref.current!} show={showTooltip} placement="top">
        {(props: any) => (
          <Tooltip {...props}>
            {copied ? (
              <span style={{ color: '#6f6' }}>Copiado!</span>
            ) : (
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                {uuid}
                <br />
                <small className="text-muted">Clique para copiar</small>
              </span>
            )}
          </Tooltip>
        )}
      </Overlay>
    </>
  )
}

export default UuidPill
