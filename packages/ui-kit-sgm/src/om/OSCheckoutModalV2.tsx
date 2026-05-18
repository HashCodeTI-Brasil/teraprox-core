// @ts-nocheck
import React, { useState, useCallback, useMemo } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
  TextField,
  Switch,
} from '@hashcodeti/ui-kit-core'
import {
  FaPlus,
  FaList,
  FaSave,
  FaExclamationTriangle,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa'

/**
 * OSCheckoutModalV2 — Wave H.2 promotion (de teraprox-SGM-OS/Components/manutencao/OrdemDeServico/OSCheckoutModalV2.js).
 *
 * Modal apresentacional para checkout de uma OS recém-formada. Permite
 * 4 modos: save_only, save_model, add_to_om, new_om.
 *
 * Hexagonal: nada de useOrdemDeManutencao / useNavigate / paths internos.
 * O caller injeta:
 *   - `osForm` — objeto da OS em construção (com flags `isModel`,
 *     `modelIdentifier`, `isPublicView`, `recursos`).
 *   - `omContext` — { hasActiveOM, ordemDeManutencao, totalOS, osCompatibility }.
 *     osCompatibility = { canAdd: boolean, reason?: string }.
 *   - `onSaveOS(form)` — persiste OS isolada (modos save_only/save_model).
 *   - `onSaveOSAndAddToOM(form)` — persiste e enfileira para OM (modos add_to_om/new_om).
 *   - `onNavigateToOM()` — chamado após add_to_om/new_om (caller decide router).
 *   - `onCancel()` — fecha.
 *   - `onUpdateModelIdentifier`, `onUpdateModelVisibility` — controlled props p/ modelo.
 *   - `open` / `onOpenChange` — controle Radix.
 */

export type OSCheckoutMode = 'save_only' | 'save_model' | 'add_to_om' | 'new_om'

export interface OSCheckoutForm {
  isModel?: boolean
  isPublicView?: boolean
  modelIdentifier?: string
  recursos?: unknown[]
  setorDestino?: unknown
  [k: string]: unknown
}

export interface OSCheckoutOMContext {
  hasActiveOM?: boolean
  ordemDeManutencao?: {
    descricao?: string | { nome?: string; id?: string | number }
    setor?: string | { nome?: string; id?: string | number }
  }
  totalOS?: number
  osCompatibility?: { canAdd: boolean; reason?: string }
}

export interface OSCheckoutModalV2Props {
  open: boolean
  onOpenChange?: (open: boolean) => void
  osForm: OSCheckoutForm
  omContext?: OSCheckoutOMContext
  onSaveOS?: (form: OSCheckoutForm) => void | Promise<void>
  onSaveOSAndAddToOM?: (form: OSCheckoutForm) => void | Promise<void>
  onNavigateToOM?: () => void
  onCancel?: () => void
  onUpdateModelIdentifier?: (value: string) => void
  onUpdateModelVisibility?: (isPublic: boolean) => void
}

const checkoutModeResolver = (form: OSCheckoutForm, hasActiveOM?: boolean): OSCheckoutMode => {
  if (form?.isModel) return 'save_model'
  if (hasActiveOM) return 'add_to_om'
  return 'save_only'
}

export const OSCheckoutModalV2: React.FC<OSCheckoutModalV2Props> = ({
  open,
  onOpenChange,
  osForm,
  omContext,
  onSaveOS,
  onSaveOSAndAddToOM,
  onNavigateToOM,
  onCancel,
  onUpdateModelIdentifier,
  onUpdateModelVisibility,
}) => {
  const {
    hasActiveOM = false,
    ordemDeManutencao = {},
    totalOS = 0,
    osCompatibility = { canAdd: true },
  } = omContext ?? {}

  const isOsModel = !!osForm?.isModel
  const [loading, setLoading] = useState(false)
  const [selectedMode, setSelectedMode] = useState<OSCheckoutMode>(
    checkoutModeResolver(osForm, hasActiveOM),
  )

  const handleCancel = useCallback(() => {
    onCancel?.()
    onOpenChange?.(false)
  }, [onCancel, onOpenChange])

  const handleProceed = useCallback(async () => {
    setLoading(true)
    try {
      switch (selectedMode) {
        case 'save_only':
        case 'save_model':
          await onSaveOS?.(osForm)
          break
        case 'add_to_om':
        case 'new_om':
          await onSaveOSAndAddToOM?.(osForm)
          handleCancel()
          onNavigateToOM?.()
          break
        default:
          break
      }
    } finally {
      setLoading(false)
    }
  }, [selectedMode, osForm, onSaveOS, onSaveOSAndAddToOM, onNavigateToOM, handleCancel])

  const checkoutModeLabel = useMemo(() => {
    if (isOsModel) {
      return {
        title: 'Salvar Modelo',
        description: 'O modelo será salvo para originar outras ordens.',
        save: 'Salvar Modelo',
      }
    }
    return {
      title: 'Salvar Ordem de serviço',
      description: 'A Ordem será salva normalmente.',
      save: 'Salvar Ordem',
    }
  }, [isOsModel])

  const proceedVariant: 'primary' | 'secondary' | 'success' =
    selectedMode === 'save_only' || selectedMode === 'save_model'
      ? 'primary'
      : selectedMode === 'add_to_om' || selectedMode === 'new_om'
      ? 'success'
      : 'secondary'

  const cardClass = (active: boolean, tone: string, disabled?: boolean) =>
    [
      'rounded-md border-2 p-3 transition-colors',
      active ? `${tone} bg-neutral-50` : 'border-neutral-200',
      disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
    ].join(' ')

  return (
    <Modal open={open} onOpenChange={(o) => { if (!o) handleCancel() }} size="md">
      <ModalHeader>Checkout da Ordem de Serviço</ModalHeader>
      <ModalBody>
        <Alert tone="info" className="mb-4">
          <strong>{osForm?.recursos?.length || 0} recurso(s)</strong> selecionados.
          <br />
          <small className="text-neutral-500">Escolha como proceder:</small>
        </Alert>

        {isOsModel && (
          <div className="mb-4 flex flex-col gap-3">
            <h5 className="text-sm font-semibold">Gerando um modelo</h5>
            <TextField
              value={osForm.modelIdentifier ?? ''}
              label="Defina um nome para o modelo"
              onChange={(e) => onUpdateModelIdentifier?.((e.target as HTMLInputElement).value)}
            />
            <div className="flex w-full flex-col gap-2 rounded-lg border border-neutral-300 px-4 py-3">
              <label className="flex w-full items-center justify-between text-sm font-semibold text-neutral-700">
                Visibilidade
              </label>
              <div className="flex items-center gap-2">
                {osForm.isPublicView ? (
                  <FaEye title="Visível publicamente" className="text-state-success" />
                ) : (
                  <FaEyeSlash title="Privado" className="text-state-danger" />
                )}
                <Switch
                  checked={!!osForm.isPublicView}
                  onCheckedChange={(checked) => onUpdateModelVisibility?.(!!checked)}
                  aria-label={osForm.isPublicView ? 'Tornar privado' : 'Tornar público'}
                />
                <span className="text-sm text-neutral-600">
                  {osForm.isPublicView ? 'Público' : 'Privado'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4 flex flex-col gap-3">
          {/* Salvar apenas */}
          {!hasActiveOM && (
            <div
              className={cardClass(
                selectedMode === 'save_only' || selectedMode === 'save_model',
                'border-brand-primary',
              )}
              onClick={() => setSelectedMode(isOsModel ? 'save_model' : 'save_only')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="checkout-mode"
                  className="mr-3"
                  checked={selectedMode === 'save_only' || selectedMode === 'save_model'}
                  onChange={() => setSelectedMode(isOsModel ? 'save_model' : 'save_only')}
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center">
                    <FaSave className="mr-2 text-brand-primary" />
                    <strong>{checkoutModeLabel.title}</strong>
                  </div>
                  <small className="text-neutral-500">{checkoutModeLabel.description}</small>
                </div>
              </div>
            </div>
          )}

          {/* Adicionar à OM existente */}
          {hasActiveOM && (
            <div
              className={cardClass(
                selectedMode === 'add_to_om',
                'border-state-success',
                !osCompatibility.canAdd,
              )}
              onClick={() =>
                osCompatibility.canAdd && setSelectedMode('add_to_om')
              }
            >
              <div className="mb-2 flex items-center">
                <input
                  type="radio"
                  name="checkout-mode"
                  className="mr-3"
                  checked={selectedMode === 'add_to_om'}
                  disabled={!osCompatibility.canAdd}
                  onChange={() =>
                    osCompatibility.canAdd && setSelectedMode('add_to_om')
                  }
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center">
                    <FaPlus className="mr-2 text-state-success" />
                    <strong>Adicionar à OM atual</strong>
                  </div>
                  <small className="block text-neutral-500">
                    {typeof ordemDeManutencao?.descricao === 'string'
                      ? ordemDeManutencao.descricao
                      : ordemDeManutencao?.descricao?.nome ||
                        ordemDeManutencao?.descricao?.id ||
                        ''}
                  </small>
                  <small className="text-neutral-500">
                    {totalOS} OS incluídas • Setor:{' '}
                    {typeof ordemDeManutencao?.setor === 'string'
                      ? ordemDeManutencao.setor
                      : ordemDeManutencao?.setor?.nome ||
                        ordemDeManutencao?.setor?.id ||
                        ''}
                  </small>
                </div>
              </div>

              {!osCompatibility.canAdd && (
                <Alert tone="warning" className="mb-0 mt-2 py-2">
                  <FaExclamationTriangle className="mr-2 inline-block" />
                  <small>{osCompatibility.reason}</small>
                </Alert>
              )}
            </div>
          )}

          {/* Nova OM */}
          {!isOsModel && (
            <div
              className={cardClass(selectedMode === 'new_om', 'border-state-info')}
              onClick={() => setSelectedMode('new_om')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="checkout-mode"
                  className="mr-3"
                  checked={selectedMode === 'new_om'}
                  onChange={() => setSelectedMode('new_om')}
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center">
                    <FaList className="mr-2 text-state-info" />
                    <strong>
                      {hasActiveOM ? 'Nova Ordem de Manutenção' : 'Iniciar Ordem de Manutenção'}
                    </strong>
                  </div>
                  <small className="text-neutral-500">
                    {hasActiveOM
                      ? 'Criar nova OM (a atual será substituída)'
                      : 'Criar nova OM e adicionar esta OS'}
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>

        {(selectedMode === 'add_to_om' || selectedMode === 'new_om') && (
          <Alert tone="info" className="mb-4">
            <div className="text-sm">
              {selectedMode === 'add_to_om'
                ? 'Você será direcionado para a tela de OM para revisar e salvar'
                : 'Você será direcionado para criar uma nova Ordem de Manutenção'}
            </div>
          </Alert>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant={proceedVariant} onClick={handleProceed} disabled={loading}>
          {selectedMode === 'save_only' || selectedMode === 'save_model' ? (
            <>
              <FaSave className="mr-2 inline-block" />
              {checkoutModeLabel.save}
            </>
          ) : (
            <>
              <FaArrowRight className="mr-2 inline-block" />
              Continuar para OM
            </>
          )}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default OSCheckoutModalV2
