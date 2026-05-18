// @hashcodeti/ui-kit-core/primitives/ImageAttachment
//
// Primitivo de upload por drag-drop + click-to-pick. Substitui o padrão
// `react-dropzone` com componente Tailwind nativo (`<input type="file" multiple>`
// + handlers `onDragOver/onDrop/onDragLeave`). Sem libs externas.
//
// Promovido em Wave E.1.1 (2026-05-13) como peça-de-lego cross-domain.
// Apresentacional puro — caller controla o que fazer com os arquivos
// selecionados via `onAttachments(files)`. Validação de tamanho/tipo é feita
// no primitivo antes de emitir o callback (filtra inválidos e expõe via
// `onReject` opcional).
//
// API pública (estável):
//   - onAttachments(files: File[]): emitido com a lista filtrada (válidos)
//   - maxSize?: number (bytes) — default sem limite
//   - acceptedTypes?: string[] — MIME types ou extensões (.pdf, image/*).
//                                Default sem restrição.
//   - multiple?: boolean — default true
//   - disabled?: boolean
//   - label?: ReactNode — texto auxiliar (default "Arraste arquivos aqui ou clique para selecionar")
//   - onReject?(rejected: File[]) — callback para arquivos descartados pela validação
//
// NÃO inclui: gerenciador de anexos persistidos, preview, signed-URL fetch.
// Para esses casos use o componente domain `GenericImageAttachment` do MF
// correspondente (que pode internamente usar este primitivo para o input).

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const dropzoneVariants = cva(
  [
    'relative flex flex-col items-center justify-center',
    'rounded-md border-2 border-dashed',
    'transition-colors duration-150',
    'cursor-pointer select-none',
    'text-center',
  ],
  {
    variants: {
      state: {
        idle: 'border-neutral-300 bg-surface-background hover:bg-neutral-50 text-neutral-600',
        active: 'border-brand-primary bg-brand-primary-muted text-brand-primary',
        disabled: 'border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed',
      },
      size: {
        sm: 'p-3 text-xs gap-1',
        md: 'p-6 text-sm gap-2',
        lg: 'p-8 text-base gap-3',
      },
    },
    defaultVariants: {
      state: 'idle',
      size: 'md',
    },
  },
)

export type ImageAttachmentSize = NonNullable<VariantProps<typeof dropzoneVariants>['size']>

export interface ImageAttachmentProps {
  /** Callback emitido com arquivos válidos selecionados/dropados. */
  onAttachments: (files: File[]) => void
  /** Tamanho máximo por arquivo em bytes. Sem limite quando ausente. */
  maxSize?: number
  /** MIME types ou extensões aceitos (ex.: ['image/*', '.pdf']). Sem restrição quando ausente. */
  acceptedTypes?: string[]
  /** Permitir múltiplos arquivos. Default true. */
  multiple?: boolean
  /** Desabilita interação. */
  disabled?: boolean
  /** Texto auxiliar dentro do dropzone. */
  label?: React.ReactNode
  /** Callback para arquivos descartados pela validação. */
  onReject?: (rejected: File[]) => void
  /** Tamanho do dropzone. Default 'md'. */
  size?: ImageAttachmentSize
  /** className do wrapper (dropzone). */
  className?: string
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

function matchesAccept(file: File, acceptedTypes?: string[]): boolean {
  if (!acceptedTypes || acceptedTypes.length === 0) return true
  const fileType = file.type || ''
  const fileName = file.name.toLowerCase()
  return acceptedTypes.some((rule) => {
    const r = rule.trim().toLowerCase()
    if (!r) return false
    if (r.startsWith('.')) return fileName.endsWith(r)
    if (r.endsWith('/*')) {
      const prefix = r.slice(0, -1) // "image/"
      return fileType.toLowerCase().startsWith(prefix)
    }
    return fileType.toLowerCase() === r
  })
}

/**
 * ImageAttachment — dropzone primitivo drag-drop + file picker.
 *
 * @example
 * <ImageAttachment
 *   onAttachments={(files) => uploadAll(files)}
 *   acceptedTypes={['image/*', '.pdf']}
 *   maxSize={5 * 1024 * 1024}
 * />
 */
export const ImageAttachment = React.forwardRef<HTMLInputElement, ImageAttachmentProps>(
  (
    {
      onAttachments,
      maxSize,
      acceptedTypes,
      multiple = true,
      disabled = false,
      label,
      onReject,
      size = 'md',
      className,
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)
    const [dragActive, setDragActive] = React.useState(false)

    const acceptAttr = acceptedTypes?.join(',')

    const validate = (files: FileList | File[]) => {
      const arr = Array.from(files)
      const accepted: File[] = []
      const rejected: File[] = []
      for (const f of arr) {
        const sizeOk = !maxSize || f.size <= maxSize
        const typeOk = matchesAccept(f, acceptedTypes)
        if (sizeOk && typeOk) accepted.push(f)
        else rejected.push(f)
      }
      if (rejected.length && onReject) onReject(rejected)
      if (accepted.length) onAttachments(accepted)
    }

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      const files = e.target.files
      if (files && files.length) validate(files)
      // permite re-selecionar o mesmo arquivo
      e.target.value = ''
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return
      e.preventDefault()
      e.stopPropagation()
      if (!dragActive) setDragActive(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      const files = e.dataTransfer?.files
      if (files && files.length) validate(files)
    }

    const handleClick = () => {
      if (disabled) return
      inputRef.current?.click()
    }

    const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        inputRef.current?.click()
      }
    }

    const state = disabled ? 'disabled' : dragActive ? 'active' : 'idle'

    return (
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleKey}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(dropzoneVariants({ state, size }), className)}
      >
        <UploadIcon className={cn(size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-10 w-10' : 'h-7 w-7')} />
        <span className="font-medium">
          {label ?? 'Arraste arquivos aqui ou clique para selecionar'}
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={acceptAttr}
          disabled={disabled}
          onChange={handleSelect}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
    )
  },
)
ImageAttachment.displayName = 'ImageAttachment'
