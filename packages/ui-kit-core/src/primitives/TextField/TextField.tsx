// @hashcodeti/ui-kit-core/primitives/TextField
//
// Substitui o padrão `<Form.Group> + <Form.Label> + <Form.Control> + <Form.Text>`
// do react-bootstrap por 1 componente único. Mais ergonomia, mesma flexibilidade.
//
// API foi pensada para zerar boilerplate em telas SGM/SGP — auditoria detectou
// ~110 ocorrências do macro-padrão.

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const inputVariants = cva(
  [
    'block w-full rounded-md border bg-surface-background',
    'text-surface-foreground placeholder:text-neutral-400',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent',
    'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
    'read-only:bg-neutral-50 read-only:cursor-default',
  ],
  {
    variants: {
      variant: {
        outlined: 'border-surface-border focus-visible:border-brand-primary',
        filled:
          'border-transparent bg-neutral-100 focus-visible:bg-surface-background focus-visible:border-brand-primary',
      },
      size: {
        sm: 'h-8 px-2 text-sm',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      hasError: {
        true: 'border-error focus-visible:ring-error/40 focus-visible:border-error',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
      hasError: false,
    },
  },
)

export type TextFieldVariant = NonNullable<VariantProps<typeof inputVariants>['variant']>
export type TextFieldSize = NonNullable<VariantProps<typeof inputVariants>['size']>

// ─── Sub-componentes apresentacionais (também exportados) ───

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  optional?: boolean
}

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, required, optional, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'block text-sm font-medium text-neutral-700 mb-1',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-error">
          *
        </span>
      )}
      {optional && !required && (
        <span className="ml-1 text-xs text-neutral-400 font-normal">(opcional)</span>
      )}
    </label>
  ),
)
FieldLabel.displayName = 'FieldLabel'

export interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, children, ...props }, ref) => {
    if (!children) return null
    return (
      <p
        ref={ref}
        role="alert"
        className={cn('mt-1 text-xs text-error', className)}
        {...props}
      >
        {children}
      </p>
    )
  },
)
FieldError.displayName = 'FieldError'

export interface FieldHintProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FieldHint = React.forwardRef<HTMLParagraphElement, FieldHintProps>(
  ({ className, children, ...props }, ref) => {
    if (!children) return null
    return (
      <p
        ref={ref}
        className={cn('mt-1 text-xs text-neutral-500', className)}
        {...props}
      >
        {children}
      </p>
    )
  },
)
FieldHint.displayName = 'FieldHint'

// ─── TextField (composição) ───

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Pick<VariantProps<typeof inputVariants>, 'variant' | 'size'> {
  label?: React.ReactNode
  hint?: React.ReactNode
  error?: React.ReactNode
  /** Marca como obrigatório (asterisco no label + `aria-required`). */
  required?: boolean
  /** Marca como opcional (badge "(opcional)" no label). Ignorado se `required`. */
  optional?: boolean
  /** Renderiza como `<textarea>`. */
  multiline?: boolean
  /** Rows do textarea (default 3). Só aplicável quando `multiline`. */
  rows?: number
  /** Wrapper className (div externo). */
  wrapperClassName?: string
}

/**
 * TextField — campo de texto unificado.
 *
 * @example
 * <TextField
 *   label="Código do equipamento"
 *   hint="Use o código interno"
 *   required
 *   value={code}
 *   onChange={(e) => setCode(e.target.value)}
 * />
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id: idProp,
      label,
      hint,
      error,
      required,
      optional,
      multiline,
      rows = 3,
      className,
      wrapperClassName,
      variant,
      size,
      disabled,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId()
    const id = idProp ?? `tf-${reactId}`
    const hintId = hint ? `${id}-hint` : undefined
    const errorId = error ? `${id}-error` : undefined
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined
    const hasError = Boolean(error)

    const inputClassName = cn(
      inputVariants({ variant, size, hasError }),
      multiline && 'h-auto py-2 min-h-[5rem] resize-y',
      className,
    )

    const sharedProps = {
      id,
      'aria-invalid': hasError || undefined,
      'aria-required': required || undefined,
      'aria-describedby': describedBy,
      disabled,
      readOnly,
      ...props,
    }

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {label && (
          <FieldLabel htmlFor={id} required={required} optional={optional}>
            {label}
          </FieldLabel>
        )}
        {multiline ? (
          <textarea
            ref={ref as unknown as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            className={inputClassName}
            {...(sharedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input ref={ref} className={inputClassName} {...sharedProps} />
        )}
        {hasError ? (
          <FieldError id={errorId}>{error}</FieldError>
        ) : (
          hint && <FieldHint id={hintId}>{hint}</FieldHint>
        )}
      </div>
    )
  },
)
TextField.displayName = 'TextField'

export { inputVariants }
