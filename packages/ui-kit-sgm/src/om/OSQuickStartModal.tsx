// @ts-nocheck
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
  Badge,
  Spinner,
  Switch,
} from '@hashcodeti/ui-kit-core'
import {
  FaPlay,
  FaUser,
  FaTags,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'
import dayjs from 'dayjs'

/**
 * OSQuickStartModal — Wave H.2 promotion (de teraprox-SGM-OM/Components/OSQuickStartModal.js).
 *
 * Modal apresentacional para iniciar uma OS (single ou bulk). Preserva
 * 100% da lógica de navegação <- -> e modo "Atribuir em Lote", mas
 * extrai todo o IO via props (Port no caller):
 *
 *   - `onStartOS(os)` — start single OS após validação;
 *   - `onUpdateOS(id)` — refetch após mutação;
 *   - `onUpdateTipo(osId, tipo)` — POST /updateTipoDeOrdem;
 *   - `onBulkAssignMantenedor(osIds, mantenedor)` — POST /atribuirMantenedorBulk;
 *   - `onBulkAssignTipo(osIds, tipo)` — POST /updateTipoBulk;
 *   - `onToast(msg, type)` — toast opcional (success/error/warning);
 *   - `renderMantenedorPanel({ os, onChanged })` — slot p/ MantenedorRender (caller injeta);
 *   - `renderTipoPicker({ currentTipo, onSelect })` — slot p/ autocomplete tipo (caller injeta);
 *   - `renderMantenedorPicker({ onSelect, onCancel })` — slot p/ bulk pick;
 *
 * Esses slots permitem ao caller manter `useCoreService`/Redux apenas no shell.
 */

export interface OSQuickStartModalOS {
  id?: number | string
  dataPlanejada?: string | Date
  allowEarlyStart?: boolean
  osMantenedor?: Array<{ active?: boolean }>
  osTipos?: Array<{ tipoDeOrdem?: { tipo?: string } }>
  [k: string]: unknown
}

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface OSQuickStartModalProps {
  show: boolean
  onHide: () => void
  os: OSQuickStartModalOS | OSQuickStartModalOS[] | null
  bulk?: boolean
  showStartButton?: boolean

  onStartOS?: (os: OSQuickStartModalOS) => void | Promise<void>
  onUpdateOS?: (id: number | string | undefined) => void | Promise<void>
  onUpdateTipo?: (osId: number | string | undefined, tipo: any) => void | Promise<void>

  onBulkAssignMantenedor?: (
    osIds: Array<number | string>,
    mantenedor: any,
  ) => Promise<{ added?: number; skipped?: number; failed?: number } | void>
  onBulkAssignTipo?: (
    osIds: Array<number | string>,
    tipo: any,
  ) => Promise<{ atualizados?: number; skipped?: number; falhas?: number } | void>

  onToast?: (msg: string, type: ToastType) => void

  // Slots — caller provê implementação concreta ligada a Redux/CoreService.
  renderMantenedorPanel?: (ctx: {
    os: OSQuickStartModalOS
    onChanged: () => void
  }) => React.ReactNode
  renderTipoPicker?: (ctx: {
    currentTipo?: string
    onSelect: (tipo: any) => void
  }) => React.ReactNode
  renderMantenedorPicker?: (ctx: {
    onSelect: (mantenedor: any) => void
  }) => React.ReactNode
}

interface ValidationError {
  type: 'dataPlanejada' | 'mantenedores' | 'tipo'
  message: string
}

const formatPlannedDate = (d?: string | Date) => {
  if (!d) return ''
  return dayjs(d).format('DD/MM/YYYY HH:mm')
}

export const OSQuickStartModal: React.FC<OSQuickStartModalProps> = ({
  show,
  onHide,
  os,
  bulk = false,
  showStartButton = true,
  onStartOS,
  onUpdateOS,
  onUpdateTipo,
  onBulkAssignMantenedor,
  onBulkAssignTipo,
  onToast,
  renderMantenedorPanel,
  renderTipoPicker,
  renderMantenedorPicker,
}) => {
  const [loading, setLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [currentOS, setCurrentOS] = useState<OSQuickStartModalOS | null>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [osList, setOsList] = useState<OSQuickStartModalOS[]>([])

  const [targetsPanelVisible, setTargetsPanelVisible] = useState(false)
  const [selectedTargets, setSelectedTargets] = useState<Array<number | string>>([])
  const [isBulkAssigning, setIsBulkAssigning] = useState(false)

  const [openTipoPicker, setOpenTipoPicker] = useState(false)
  const [openBulkMantPicker, setOpenBulkMantPicker] = useState(false)
  const [openBulkTipoPicker, setOpenBulkTipoPicker] = useState(false)

  const validateOS = useCallback((osToValidate: OSQuickStartModalOS) => {
    const errors: ValidationError[] = []
    const allowEarlyStart =
      typeof osToValidate?.allowEarlyStart === 'boolean' && osToValidate.allowEarlyStart
    if (
      !allowEarlyStart &&
      osToValidate?.dataPlanejada &&
      dayjs().isBefore(dayjs(osToValidate.dataPlanejada))
    ) {
      errors.push({
        type: 'dataPlanejada',
        message: `Esta OS não pode ser iniciada antes de ${formatPlannedDate(
          osToValidate.dataPlanejada,
        )}`,
      })
    }
    const hasActiveMantenedores = osToValidate.osMantenedor?.some((m) => m.active)
    if (!hasActiveMantenedores) {
      errors.push({ type: 'mantenedores', message: 'Não há mantenedores atribuídos' })
    }
    if (!osToValidate.osTipos || osToValidate.osTipos.length === 0) {
      errors.push({ type: 'tipo', message: 'Não há um tipo atribuído' })
    }
    setValidationErrors(errors)
    return errors.length === 0
  }, [])

  // Init / reset on show change
  useEffect(() => {
    if (show && os) {
      if (bulk && Array.isArray(os)) {
        if (os.length === 0) {
          onHide()
          return
        }
        setOsList(os)
        setCurrentIndex(0)
        setCurrentOS(os[0])
        validateOS(os[0])
      } else if (!Array.isArray(os)) {
        setOsList([os])
        setCurrentIndex(0)
        setCurrentOS(os)
        validateOS(os)
      }
    }
  }, [show, os, bulk, onHide, validateOS])

  // Revalidate on currentOS change
  useEffect(() => {
    if (currentOS) validateOS(currentOS)
  }, [currentOS, validateOS])

  // Default targets selection
  useEffect(() => {
    if (currentOS && (!selectedTargets || selectedTargets.length === 0)) {
      setSelectedTargets([currentOS.id as number | string])
    }
  }, [currentOS])

  // Reset on close
  useEffect(() => {
    if (!show) {
      setTargetsPanelVisible(false)
      setSelectedTargets([])
      setIsBulkAssigning(false)
      setOpenTipoPicker(false)
      setOpenBulkMantPicker(false)
      setOpenBulkTipoPicker(false)
    }
  }, [show])

  // Drop stale ids when osList changes
  useEffect(() => {
    setSelectedTargets((prev) => {
      if (!prev || prev.length === 0) return prev
      return prev.filter((id) => osList.some((o) => o.id === id))
    })
  }, [osList])

  // Default selection for bulk mode
  useEffect(() => {
    if (!currentOS) return
    if (bulk && osList.length > 1) {
      setSelectedTargets((prev) => {
        if (prev && prev.length > 0) return prev
        return osList.map((o) => o.id as number | string)
      })
    } else {
      setSelectedTargets((prev) => {
        if (prev && prev.length > 0) return prev
        return [currentOS.id as number | string]
      })
    }
  }, [currentOS, osList, bulk])

  const getTargetIds = useCallback((): Array<number | string> => {
    if (selectedTargets && selectedTargets.length > 0) return selectedTargets
    if (currentOS?.id != null) return [currentOS.id]
    return []
  }, [selectedTargets, currentOS])

  const hasTargetsToAssign = useCallback(
    () => getTargetIds().length > 0,
    [getTargetIds],
  )

  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < osList.length - 1
  const isBulkMode = bulk && osList.length > 1

  const handlePrevious = useCallback(() => {
    if (canGoBack) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setCurrentOS(osList[newIndex])
    }
  }, [canGoBack, currentIndex, osList])

  const handleNext = useCallback(() => {
    if (canGoForward) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setCurrentOS(osList[newIndex])
    }
  }, [canGoForward, currentIndex, osList])

  // Keyboard nav
  useEffect(() => {
    if (!show || !isBulkMode) return
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && canGoBack) handlePrevious()
      else if (e.key === 'ArrowRight' && canGoForward) handleNext()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [show, isBulkMode, canGoBack, canGoForward, handlePrevious, handleNext])

  const handleStart = async () => {
    if (!currentOS || !validateOS(currentOS)) {
      onToast?.('Complete os campos obrigatórios.', 'warning')
      return
    }
    setLoading(true)
    try {
      await onStartOS?.(currentOS)
      onHide()
    } catch (error) {
      console.error('Erro ao iniciar OS:', error)
      onToast?.('Erro ao iniciar a OS', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleMantenedorChanged = useCallback(async () => {
    if (currentOS?.id != null) await onUpdateOS?.(currentOS.id)
  }, [currentOS, onUpdateOS])

  const handleTipoUpdate = async (tipo: any) => {
    if (!currentOS?.id) return
    try {
      await onUpdateTipo?.(currentOS.id, tipo)
      onToast?.('Tipo atribuído com sucesso!', 'success')
      await onUpdateOS?.(currentOS.id)
      setTimeout(() => validateOS(currentOS), 300)
    } catch (error) {
      console.error('Erro ao atribuir tipo:', error)
      onToast?.('Erro ao atribuir tipo', 'error')
    }
  }

  const toggleTarget = (osId: number | string) => {
    setSelectedTargets((prev) => {
      if (!prev) return [osId]
      if (prev.includes(osId)) return prev.filter((i) => i !== osId)
      return [...prev, osId]
    })
  }

  const selectAllTargets = () =>
    setSelectedTargets(osList.map((o) => o.id as number | string))
  const clearTargets = () => setSelectedTargets([])

  const bulkAssignMantenedor = async (mantenedor: any) => {
    const targets = getTargetIds()
    if (targets.length === 0) return
    setIsBulkAssigning(true)
    try {
      const response = (await onBulkAssignMantenedor?.(targets, mantenedor)) || {}
      await Promise.all(targets.map((tid) => onUpdateOS?.(tid)))
      const { added = 0, skipped = 0, failed = 0 } = response as any
      const toastType: ToastType = added > 0 ? 'success' : failed > 0 ? 'error' : 'warning'
      onToast?.(
        `Execução concluída: ${added} adicionados, ${skipped} ignorados, ${failed} falhas.`,
        toastType,
      )
    } catch (err) {
      console.error('Erro ao atribuir mantenedor em lote:', err)
      onToast?.('Erro ao atribuir mantenedor em lote', 'error')
    } finally {
      setIsBulkAssigning(false)
    }
  }

  const bulkAssignTipo = async (tipo: any) => {
    const targets = getTargetIds()
    if (targets.length === 0) return
    setIsBulkAssigning(true)
    try {
      const response = (await onBulkAssignTipo?.(targets, tipo)) || {}
      await Promise.all(targets.map((tid) => onUpdateOS?.(tid)))
      const { atualizados = 0, skipped = 0, falhas = 0 } = response as any
      const toastType: ToastType =
        atualizados > 0 ? 'success' : falhas > 0 ? 'error' : 'warning'
      onToast?.(
        `Execução concluída: ${atualizados} atualizados, ${skipped} ignorados, ${falhas} falhas.`,
        toastType,
      )
    } catch (err) {
      console.error('Erro ao atribuir tipo em lote:', err)
      onToast?.('Erro ao atribuir tipo em lote', 'error')
    } finally {
      setIsBulkAssigning(false)
    }
  }

  const hasErrors = validationErrors.length > 0
  const hasDataPlanejadaError = validationErrors.some((e) => e.type === 'dataPlanejada')
  const currentTipoLabel = currentOS?.osTipos?.[0]?.tipoDeOrdem?.tipo

  const headerTitle = useMemo(
    () => (
      <span className="flex w-full items-center justify-between">
        <span className="flex items-center gap-2">
          <FaPlay />
          <span>Iniciar OS #{currentOS?.id}</span>
          {isBulkMode && (
            <Badge tone="neutral" className="ml-2">
              {currentIndex + 1} de {osList.length}
            </Badge>
          )}
        </span>
        {isBulkMode && (
          <span className="ml-3 flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrevious}
              disabled={!canGoBack}
              aria-label="OS Anterior"
            >
              <FaChevronLeft />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleNext}
              disabled={!canGoForward}
              aria-label="Próxima OS"
            >
              <FaChevronRight />
            </Button>
          </span>
        )}
      </span>
    ),
    [currentOS?.id, isBulkMode, currentIndex, osList.length, handlePrevious, handleNext, canGoBack, canGoForward],
  )

  return (
    <Modal open={show} onOpenChange={(o) => { if (!o) onHide() }} size="lg">
      <ModalHeader>{headerTitle}</ModalHeader>
      <ModalBody>
        {hasDataPlanejadaError ? (
          <Alert tone="danger">
            {validationErrors.find((e) => e.type === 'dataPlanejada')?.message}
          </Alert>
        ) : (
          <>
            {hasErrors && (
              <Alert tone="warning" className="mb-3">
                <strong>Atenção:</strong> Complete os campos obrigatórios.
              </Alert>
            )}

            <div className="mb-4">
              <h6 className="mb-3 text-sm font-medium text-neutral-500">
                <FaUser className="mr-2 inline-block" />
                Executores
              </h6>
              {currentOS &&
                renderMantenedorPanel?.({
                  os: currentOS,
                  onChanged: handleMantenedorChanged,
                })}
              {validationErrors.some((e) => e.type === 'mantenedores') && (
                <small className="text-state-danger">
                  * Atribua pelo menos um executor
                </small>
              )}
            </div>

            <div className="mb-4">
              <h6 className="mb-3 text-sm font-medium text-neutral-500">
                <FaTags className="mr-2 inline-block" />
                Tipo de OS
              </h6>
              <div className="flex items-center gap-2">
                {currentTipoLabel ? (
                  <>
                    <Badge tone="primary">{currentTipoLabel}</Badge>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setOpenTipoPicker((v) => !v)}
                    >
                      Alterar
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setOpenTipoPicker((v) => !v)}
                  >
                    Atribuir Tipo
                  </Button>
                )}
              </div>
              {openTipoPicker &&
                renderTipoPicker?.({
                  currentTipo: currentTipoLabel,
                  onSelect: (tipo) => {
                    handleTipoUpdate(tipo)
                    setOpenTipoPicker(false)
                  },
                })}
              {validationErrors.some((e) => e.type === 'tipo') && (
                <small className="text-state-danger">* Atribua um tipo à OS</small>
              )}
            </div>

            {/* Bulk selection panel */}
            {isBulkMode && (
              <div className="mb-4">
                <h6 className="mb-3 flex items-center gap-2 text-sm font-medium text-neutral-500">
                  <Switch
                    checked={targetsPanelVisible}
                    onCheckedChange={(c) => setTargetsPanelVisible(!!c)}
                    aria-label="Selecionar múltiplas OS"
                  />
                  Selecionar múltiplas OS
                </h6>
                {targetsPanelVisible && (
                  <>
                    <div className="mb-3 flex items-center gap-2">
                      <Button variant="primary" size="sm" onClick={selectAllTargets}>
                        Selecionar Todas
                      </Button>
                      <Button variant="secondary" size="sm" onClick={clearTargets}>
                        Limpar Seleção
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {osList.map((osItem) => (
                        <Badge
                          key={String(osItem.id)}
                          tone={
                            selectedTargets.includes(osItem.id as number | string)
                              ? 'primary'
                              : 'neutral'
                          }
                          className="cursor-pointer"
                          onClick={() => toggleTarget(osItem.id as number | string)}
                        >
                          OS #{osItem.id}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {isBulkMode && targetsPanelVisible && (
              <div className="mb-4">
                <h6 className="mb-3 text-sm font-medium text-neutral-500">
                  Atribuir em Lote
                </h6>
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={isBulkAssigning || !hasTargetsToAssign()}
                    onClick={() => setOpenBulkMantPicker((v) => !v)}
                  >
                    {isBulkAssigning && <Spinner size="sm" className="mr-2" />}
                    Atribuir Executor
                    {selectedTargets?.length ? ` (${selectedTargets.length})` : ''}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={isBulkAssigning || !hasTargetsToAssign()}
                    onClick={() => setOpenBulkTipoPicker((v) => !v)}
                  >
                    {isBulkAssigning && <Spinner size="sm" className="mr-2" />}
                    Atribuir Tipo
                    {selectedTargets?.length ? ` (${selectedTargets.length})` : ''}
                  </Button>
                </div>
                {openBulkMantPicker &&
                  renderMantenedorPicker?.({
                    onSelect: (m) => {
                      bulkAssignMantenedor(m)
                      setOpenBulkMantPicker(false)
                    },
                  })}
                {openBulkTipoPicker &&
                  renderTipoPicker?.({
                    currentTipo: undefined,
                    onSelect: (t) => {
                      bulkAssignTipo(t)
                      setOpenBulkTipoPicker(false)
                    },
                  })}
              </div>
            )}
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          {showStartButton ? 'Cancelar' : 'Fechar'}
        </Button>
        {showStartButton && (
          <Button variant="primary" onClick={handleStart} disabled={loading || hasErrors}>
            {loading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Iniciando...
              </>
            ) : (
              <>
                <FaPlay className="mr-2 inline-block" />
                Iniciar OS
              </>
            )}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  )
}

export default OSQuickStartModal
