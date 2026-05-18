// Promovido de teraprox-SGP-caderno hook useRegistroDeCampoCard (subset).
// Wave H.4 (2026-05-15) — DOMAIN_PURO.
// Estado de abertura + filter de justificativas validas (nao-removed).
import { useCallback, useMemo, useState } from 'react'

export interface UseJustificativaModalArgs {
  registro: any
  /** Callback do caller (substitui dispatch Redux original). */
  onSaveJustificativas: (justificativas: any[]) => void
}

export interface UseJustificativaModalResult {
  showJustificativaModal: boolean
  openJustificativaModal: () => void
  closeJustificativaModal: () => void
  justificativasValidas: any[]
  validCount: number
  saveJustificativas: (justificativas: any[]) => void
}

export const useJustificativaModal = ({
  registro,
  onSaveJustificativas,
}: UseJustificativaModalArgs): UseJustificativaModalResult => {
  const [showJustificativaModal, setShow] = useState(false)
  const openJustificativaModal = useCallback(() => setShow(true), [])
  const closeJustificativaModal = useCallback(() => setShow(false), [])

  const justificativasValidas = useMemo(
    () => (registro?.justificativas || []).filter((j: any) => !j.removed),
    [registro?.justificativas],
  )

  const saveJustificativas = useCallback(
    (justificativas: any[]) => {
      onSaveJustificativas(justificativas)
    },
    [onSaveJustificativas],
  )

  return {
    showJustificativaModal,
    openJustificativaModal,
    closeJustificativaModal,
    justificativasValidas,
    validCount: justificativasValidas.length,
    saveJustificativas,
  }
}

export default useJustificativaModal
