// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  Badge,
  Checkbox,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  FieldLabel,
} from '@hashcodeti/ui-kit-core'
import { ManutentorCardCompact } from '../acao-manutentor/ManutentorCardCompact'
import type {
  IPickMantenedorTipoViewModel,
  PickMantenedorOption,
  PickTipoDeOrdemOption,
} from 'teraprox-core-sdk'

/**
 * PickMantenedorTipoModal — promovido do
 * teraprox-SGM-OS/Components/.../OsPlanejada/PickMantenedorModal.js.
 *
 * Modos de uso:
 *  - **Single OS**: passar prop `os` (legacy SGM-OS). Modal exibe e
 *    atribui apenas para essa OS.
 *  - **Multi OS**: passar prop `osList` (>1 item). Modal exibe lista de
 *    OS com checkboxes (default todas selecionadas) e usa rotas bulk
 *    do core-sdk: PUT updateTipoBulk + POST atribuirMantenedorBulk.
 *
 * Em modo multi, missingMaintainers/missingType são derivados das OS
 * selecionadas (true se ALGUMA OS marcada está faltando o campo).
 */

export interface PickMantenedorTipoModalProps {
  show: boolean
  onHide: () => void
  /** Modo single-OS (legacy SGM-OS). Ignorado se `osList` é fornecido. */
  os?: { id?: number | string; osMantenedor?: any[]; osTipos?: any[] } | null
  /** Modo multi-OS — lista de OS a configurar em batch */
  osList?: Array<{ id?: number | string; osMantenedor?: any[]; osTipos?: any[]; recurso?: { nome?: string }; descricaoDoProblema?: string }> | null
  viewModel: IPickMantenedorTipoViewModel
  onAssigned?: (mantenedores: PickMantenedorOption[], tipo: PickTipoDeOrdemOption | null, osIds: Array<number | string>) => void
  onError?: (err: unknown) => void
  /**
   * Força a exibição da seção de mantenedores mesmo quando a OS já tem
   * executores ativos. Usado em /os/execucao para "Adicionar mantenedor"
   * sobre OS que já tem alguém atribuído.
   */
  forceShowMantenedores?: boolean
  /**
   * Força a exibição da seção de tipo mesmo quando a OS já tem tipo.
   * Usado em /os/execucao para "Alterar tipo" sobre OS que já tem tipo.
   */
  forceShowTipo?: boolean
}

const isMissingMaintainers = (os: any): boolean =>
  !os?.osMantenedor || os.osMantenedor.length === 0 || !os.osMantenedor.some((m: any) => m.active)

const isMissingType = (os: any): boolean =>
  !os?.osTipos || os.osTipos.length === 0

export const PickMantenedorTipoModal: React.FC<PickMantenedorTipoModalProps> = ({
  show,
  onHide,
  os,
  osList,
  viewModel,
  onAssigned,
  onError,
  forceShowMantenedores,
  forceShowTipo,
}) => {
  const isMulti = Array.isArray(osList) && osList.length > 0
  const targetList = useMemo(
    () => (isMulti ? (osList as any[]) : os ? [os] : []),
    [isMulti, osList, os],
  )

  const [selectedIds, setSelectedIds] = useState<Array<number | string>>([])
  const [selectedTipoId, setSelectedTipoId] = useState<string>('')
  const [selectedOsIds, setSelectedOsIds] = useState<Array<number | string>>([])

  const { mantenedores, tiposDeOrdem, loading, assigning } = viewModel

  // OS selecionadas (no modo single, sempre a única)
  const selectedOs = useMemo(
    () => targetList.filter((o: any) => isMulti ? selectedOsIds.includes(o.id) : true),
    [targetList, selectedOsIds, isMulti],
  )

  const missingMaintainers = useMemo(
    () => forceShowMantenedores || selectedOs.some((o: any) => isMissingMaintainers(o)),
    [selectedOs, forceShowMantenedores],
  )
  const missingType = useMemo(
    () => forceShowTipo || selectedOs.some((o: any) => isMissingType(o)),
    [selectedOs, forceShowTipo],
  )

  useEffect(() => {
    if (show) {
      viewModel.loadOptions()
      setSelectedIds([])
      setSelectedTipoId('')
      // No modo multi, default = todas as OS marcadas
      setSelectedOsIds(isMulti ? targetList.map((o: any) => o.id) : [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const toggleMantenedor = (id: number | string) => {
    if (assigning) return
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleOs = (osId: number | string) => {
    if (assigning) return
    setSelectedOsIds((prev) =>
      prev.includes(osId) ? prev.filter((i) => i !== osId) : [...prev, osId]
    )
  }

  const isFormValid = (): boolean => {
    if (isMulti && selectedOsIds.length === 0) return false
    if (missingMaintainers && selectedIds.length === 0) return false
    if (missingType && !selectedTipoId) return false
    if (!missingMaintainers && !missingType) return false
    return true
  }

  const handleConfirm = async () => {
    if (assigning || !isFormValid()) return
    try {
      const selectedMantenedores = mantenedores.filter((m) => selectedIds.includes(m.id))
      let assignedTipo: PickTipoDeOrdemOption | null = null

      if (isMulti) {
        const osIds = selectedOsIds
        if (missingMaintainers && selectedMantenedores.length > 0) {
          await viewModel.assignMantenedoresMultiOs(osIds, selectedMantenedores)
        }
        if (missingType && selectedTipoId) {
          await viewModel.assignTipoMultiOs(osIds, selectedTipoId)
          assignedTipo = tiposDeOrdem.find((t) => String(t.id) === String(selectedTipoId)) ?? null
        }
        onAssigned?.(selectedMantenedores, assignedTipo, osIds)
      } else {
        const singleId = os?.id
        if (!singleId) return
        if (missingMaintainers && selectedMantenedores.length > 0) {
          await viewModel.assignMantenedores(singleId, selectedMantenedores)
        }
        if (missingType && selectedTipoId) {
          await viewModel.assignTipo(singleId, selectedTipoId)
          assignedTipo = tiposDeOrdem.find((t) => String(t.id) === String(selectedTipoId)) ?? null
        }
        onAssigned?.(selectedMantenedores, assignedTipo, [singleId])
      }
      onHide()
    } catch (err) {
      onError?.(err)
    }
  }

  const defaultActiveKeys: string[] = []
  if (isMulti) defaultActiveKeys.push('os')
  if (missingType) defaultActiveKeys.push('tipo')
  if (missingMaintainers) defaultActiveKeys.push('mantenedores')

  const headerSubtitle = isMulti
    ? `Configure mantenedor e tipo em batch para as OS selecionadas (${selectedOsIds.length}/${targetList.length})`
    : `Preencha os requisitos pendentes para iniciar a OS #${os?.id}`

  return (
    <Modal
      open={show}
      onOpenChange={(next) => {
        if (!next) onHide()
      }}
      size="lg"
      className="pick-mantenedor-tipo-modal"
    >
      <ModalHeader className="border-0 pb-0">
        <div>
          <div className="font-bold">Configuração da Ordem de Serviço</div>
          <div className="text-neutral-500 text-sm font-normal">{headerSubtitle}</div>
        </div>
      </ModalHeader>
      <ModalBody className="pt-3">
        {loading ? (
          <div className="text-center p-5">
            <Spinner variant="border" tone="brand" />
            <div className="mt-2 text-neutral-500">Carregando opções...</div>
          </div>
        ) : (
          <Accordion type="multiple" defaultValue={defaultActiveKeys} variant="bordered">
            {isMulti && (
              <AccordionItem value="os" className="mb-3 shadow-sm">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <span className="font-bold">Aplicar a quais OS?</span>
                    <Badge tone="info" className="ml-2">
                      {selectedOsIds.length} de {targetList.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-end mb-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      disabled={assigning}
                      onClick={() => setSelectedOsIds(targetList.map((o: any) => o.id))}
                    >
                      Marcar todas
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      disabled={assigning}
                      onClick={() => setSelectedOsIds([])}
                    >
                      Desmarcar todas
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {targetList.map((o: any) => {
                      const checked = selectedOsIds.includes(o.id)
                      const recursoNome = o.recurso?.nome ?? ''
                      const desc = (o.descricaoDoProblema ?? '').slice(0, 80)
                      const tagMissing = []
                      if (isMissingMaintainers(o)) tagMissing.push('Sem executor')
                      if (isMissingType(o)) tagMissing.push('Sem tipo')
                      return (
                        <Checkbox
                          key={o.id}
                          id={`pmt-os-${o.id}`}
                          checked={checked}
                          disabled={assigning}
                          onCheckedChange={() => toggleOs(o.id)}
                          label={
                            <span>
                              <strong>OS #{o.id}</strong>
                              {recursoNome && <span className="text-neutral-500 ml-2">{recursoNome}</span>}
                              {desc && <span className="text-neutral-500 ml-2">— {desc}</span>}
                              {tagMissing.length > 0 && (
                                <Badge tone="warning" className="ml-2">{tagMissing.join(' · ')}</Badge>
                              )}
                            </span>
                          }
                        />
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {missingType && (
              <AccordionItem value="tipo" className="mb-3 shadow-sm">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <span className="font-bold">{isMulti ? '2.' : '1.'} Selecionar Tipo de Ordem</span>
                    {!selectedTipoId && <Badge tone="warning" className="ml-2">Obrigatório</Badge>}
                    {selectedTipoId && <Badge tone="success" className="ml-2">Selecionado</Badge>}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <FieldLabel className="text-neutral-500 text-xs">
                      Tipo aplicado a {isMulti ? 'todas as OS marcadas' : 'esta OS'}
                    </FieldLabel>
                    <Select
                      value={selectedTipoId}
                      onValueChange={(v) => setSelectedTipoId(v)}
                      disabled={assigning}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="-- Selecione um tipo --" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposDeOrdem.map((t) => (
                          <SelectItem key={t.id} value={String(t.id)}>{t.tipo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {missingMaintainers && (
              <AccordionItem value="mantenedores" className="shadow-sm">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <span className="font-bold">{isMulti ? '3.' : missingType ? '2.' : '1.'} Selecionar Executores</span>
                    {selectedIds.length === 0 && <Badge tone="warning" className="ml-2">Obrigatório</Badge>}
                    {selectedIds.length > 0 && <Badge tone="success" className="ml-2">{selectedIds.length} Selecionado(s)</Badge>}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {!Array.isArray(mantenedores) || mantenedores.length === 0 ? (
                      <div className="col-span-full text-center py-5 text-neutral-500">
                        Nenhum mantenedor encontrado.
                      </div>
                    ) : (
                      mantenedores.map((m) => {
                        const isSelected = selectedIds.includes(m.id)
                        return (
                          <div
                            key={m.id as React.Key}
                            onClick={() => toggleMantenedor(m.id)}
                            style={{
                              cursor: assigning ? 'not-allowed' : 'pointer',
                              opacity: assigning ? 0.7 : 1,
                              transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                              transition: 'transform 0.2s',
                            }}
                          >
                            <div className={isSelected ? 'rounded-md p-1 bg-brand-primary-muted border border-brand-primary' : ''}>
                              <ManutentorCardCompact mantenedor={m} />
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}
      </ModalBody>
      <ModalFooter className="border-0">
        <Button variant="outline-secondary" onClick={onHide} disabled={assigning}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={assigning || !isFormValid()}
          className="px-4"
          loading={assigning}
        >
          {assigning ? 'Salvando...' : 'Confirmar'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default PickMantenedorTipoModal
