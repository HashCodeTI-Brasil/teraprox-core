// @ts-nocheck
import React, { useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  TextField,
} from '@hashcodeti/ui-kit-core'
import { FaCheckCircle } from 'react-icons/fa'

/**
 * OSQuickEndModal — Wave G.1 promotion (de teraprox-SGM-OM/Components/OSQuickEndModal.js).
 *
 * Modal apresentacional para encerrar uma OS rapidamente, com parecer
 * técnico opcional. Sem Redux/useToast/useCoreService — toda a IO chega
 * via props:
 *   - `onEndOS(os, technicalReport)` callback assíncrono;
 *   - `onSuccess` / `onError` callbacks opcionais para o caller integrar
 *     toast/snackbar do shell;
 */

export interface OSQuickEndModalOS {
  id?: number | string
  tarefas?: Array<{ status?: string }>
  [k: string]: unknown
}

export interface OSQuickEndModalProps {
  show: boolean
  onHide: () => void
  os?: OSQuickEndModalOS | null
  onEndOS?: (os: OSQuickEndModalOS, technicalReport: string) => void | Promise<void>
  onSuccess?: (os: OSQuickEndModalOS) => void
  onError?: (error: unknown) => void
}

export const OSQuickEndModal: React.FC<OSQuickEndModalProps> = ({
  show,
  onHide,
  os,
  onEndOS,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false)
  const [technicalReport, setTechnicalReport] = useState('')

  const handleEnd = async () => {
    if (!os) return
    setLoading(true)
    try {
      if (onEndOS) await onEndOS(os, technicalReport)
      onSuccess?.(os)
      setTechnicalReport('')
      onHide()
    } catch (error) {
      console.error('Erro ao encerrar OS:', error)
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setTechnicalReport('')
    onHide()
  }

  const tarefasConcluidas =
    os?.tarefas?.filter((t) => t.status === 'ENCERRADO').length ?? 0
  const totalTarefas = os?.tarefas?.length ?? 0

  return (
    <Modal open={show} onOpenChange={(o) => { if (!o) handleCancel() }} size="md">
      <ModalHeader>
        <span className="inline-flex items-center gap-2">
          <FaCheckCircle />
          Encerrar OS #{os?.id}
        </span>
      </ModalHeader>
      <ModalBody>
        <div className="mb-3 flex flex-col gap-1">
          <label className="text-sm font-medium text-surface-foreground">
            Parecer Técnico <span className="text-xs text-neutral-500">(opcional)</span>
          </label>
          <TextField
            multiline
            rows={4}
            placeholder="Digite o parecer técnico sobre a execução da OS..."
            value={technicalReport}
            onChange={(e) => setTechnicalReport((e.target as HTMLTextAreaElement).value)}
            disabled={loading}
          />
          <small className="text-xs text-neutral-500">
            Você pode adicionar observações sobre a execução desta ordem de serviço.
          </small>
        </div>

        {totalTarefas > 0 && (
          <div className="rounded-md bg-neutral-100 p-2">
            <small className="block text-neutral-600">
              <strong>Progresso:</strong> {tarefasConcluidas} / {totalTarefas} tarefas concluídas
            </small>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleEnd} disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Encerrando...
            </>
          ) : (
            <>
              <FaCheckCircle className="mr-2 inline-block" />
              Encerrar OS
            </>
          )}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default OSQuickEndModal
