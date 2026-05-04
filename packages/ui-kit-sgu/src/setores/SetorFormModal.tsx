import React, { useEffect, useState } from 'react'
import { Modal } from '../shared/Modal'
import type { Setor } from '../types'

export interface SetorFormValues {
  nome: string
  descricao?: string
}

export interface SetorFormModalProps {
  open: boolean
  onClose: () => void
  /** Se passado, modal entra em modo edição. */
  initial?: Setor | null
  onSubmit: (values: SetorFormValues, original?: Setor | null) => Promise<void> | void
  onDelete?: (setor: Setor) => Promise<void> | void
  errorMessage?: string | null
}

/** Modal inline para criar/editar setor — 2 campos (nome + descrição). */
export const SetorFormModal: React.FC<SetorFormModalProps> = ({
  open,
  onClose,
  initial,
  onSubmit,
  onDelete,
  errorMessage,
}) => {
  const isEdit = !!initial
  const [values, setValues] = useState<SetorFormValues>({ nome: '', descricao: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      setValues({
        nome: initial?.nome ?? '',
        descricao: (initial as any)?.descricao ?? '',
      })
      setSubmitting(false)
    }
  }, [open, initial])

  const valid = values.nome.trim().length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || submitting) return
    setSubmitting(true)
    try {
      await onSubmit({ nome: values.nome.trim(), descricao: values.descricao?.trim() || undefined }, initial)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Editar setor' : 'Novo setor'} size="md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Nome <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            value={values.nome}
            onChange={(e) => setValues((v) => ({ ...v, nome: e.target.value }))}
            disabled={submitting}
            autoFocus
            className="h-9 px-3 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Descrição</span>
          <textarea
            value={values.descricao ?? ''}
            onChange={(e) => setValues((v) => ({ ...v, descricao: e.target.value }))}
            disabled={submitting}
            rows={3}
            className="px-3 py-2 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 resize-none"
          />
        </label>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

        <div className="flex justify-between items-center gap-2 mt-2">
          <div>
            {isEdit && onDelete && initial && (
              <button
                type="button"
                onClick={() => void onDelete(initial)}
                disabled={submitting}
                className="px-3 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                Excluir
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!valid || submitting}
              className="px-3 py-1.5 text-sm rounded-md bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium disabled:opacity-50"
            >
              {submitting ? 'Salvando...' : isEdit ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
