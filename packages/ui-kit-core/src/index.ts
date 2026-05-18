// @hashcodeti/ui-kit-core — primitivos cross-cutting.
// Populado em Waves 1-3 da sprint ui-kit-domain-split a partir de teraprox-ui-kit.
//
// ─── L1 Primitives (Fase 2 — Tailwind + Radix) ───
// Adicionados em 2026-05-11 (Batch 1: Button, Card; Batch seguinte: TextField, Modal).
// Cada primitivo vive em src/primitives/<Name>/ e usa src/lib/cn.ts + cva.

export {
  Button,
  buttonVariants,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from './primitives/Button'

export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  cardVariants,
  type CardProps,
  type CardSlotProps,
  type CardVariant,
  type CardPadding,
} from './primitives/Card'

export {
  TextField,
  FieldLabel,
  FieldError,
  FieldHint,
  inputVariants,
  type TextFieldProps,
  type TextFieldVariant,
  type TextFieldSize,
  type FieldLabelProps,
  type FieldErrorProps,
  type FieldHintProps,
} from './primitives/TextField'

export {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalDescription,
  contentVariants,
  type ModalProps,
  type ModalSlotProps,
  type ModalSize,
} from './primitives/Modal'

// ─── L1 Primitives (Fase 2 — Batch 2.1, 2026-05-13) ───
// 10 primitivos Tailwind+Radix entregues em paralelo (Wave A).

export {
  Badge,
  badgeVariants,
  type BadgeProps,
  type BadgeVariant,
  type BadgeTone,
  type BadgeSize,
} from './primitives/Badge'

export {
  StatusLight,
  statusLightVariants,
  type StatusLightProps,
  type StatusLightTone,
  type StatusLightSize,
} from './primitives/StatusLight'

export {
  Spinner,
  spinnerVariants,
  type SpinnerProps,
  type SpinnerVariant,
  type SpinnerSize,
  type SpinnerTone,
} from './primitives/Spinner'

export {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupButton,
  inputGroupVariants,
  useInputGroupContext,
  type InputGroupProps,
  type InputGroupSize,
  type InputGroupAddonProps,
  type InputGroupTextProps,
  type InputGroupButtonProps,
} from './primitives/InputGroup'

export {
  Alert,
  alertVariants,
  type AlertProps,
  type AlertTone,
  type AlertSize,
} from './primitives/Alert'

export {
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
  listVariants,
  type ListProps,
  type ListVariant,
  type ListSize,
  type ListItemProps,
  type ListItemContentProps,
  type ListItemActionProps,
} from './primitives/List'

export {
  Progress,
  progressVariants,
  type ProgressProps,
  type ProgressVariant,
  type ProgressSize,
  type ProgressTone,
} from './primitives/Progress'

export {
  Checkbox,
  checkboxVariants,
  type CheckboxProps,
  type CheckboxSize,
  type CheckboxTone,
} from './primitives/Checkbox'

export {
  Switch,
  switchVariants,
  type SwitchProps,
  type SwitchSize,
  type SwitchTone,
} from './primitives/Switch'

export {
  SearchBar,
  searchBarVariants,
  type SearchBarProps,
  type SearchBarSize,
} from './primitives/SearchBar'

export {
  EmptyState,
  emptyStateVariants,
  type EmptyStateProps,
  type EmptyStateVariant,
  type EmptyStateSize,
} from './primitives/EmptyState'

// ─── L1 Primitives (Fase 2 — Batch 2.2 Wave B, 2026-05-13) ───
// 9 primitivos Radix-based entregues em paralelo (Wave B).

export {
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  tooltipContentVariants,
  type TooltipProps,
  type TooltipContentProps,
  type TooltipVariant,
  type TooltipSize,
  type TooltipSide,
  type TooltipAlign,
} from './primitives/Tooltip'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  dropdownMenuContentVariants,
  type DropdownMenuProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuShortcutProps,
  type DropdownMenuSubTriggerProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuVariant,
  type DropdownMenuSize,
} from './primitives/DropdownMenu'

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  type CollapsibleProps,
  type CollapsibleTriggerProps,
  type CollapsibleContentProps,
} from './primitives/Collapsible'

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  type AccordionVariant,
} from './primitives/Accordion'

export {
  Sheet,
  SheetRoot,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetContentVariants,
  type SheetProps,
  type SheetContentProps,
  type SheetSlotProps,
  type SheetSide,
  type SheetSize,
} from './primitives/Sheet'

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
  type TabsVariant,
  type TabsSize,
} from './primitives/Tabs'

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverPortal,
  PopoverClose,
  PopoverContent,
  PopoverArrow,
  popoverContentVariants,
  type PopoverProps,
  type PopoverContentProps,
  type PopoverArrowProps,
  type PopoverVariant,
  type PopoverSize,
  type PopoverSide,
  type PopoverAlign,
} from './primitives/Popover'

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectPortal,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  selectTriggerVariants,
  selectContentVariants,
  type SelectTriggerProps,
  type SelectContentProps,
  type SelectItemProps,
  type SelectVariant,
  type SelectSize,
} from './primitives/Select'

export {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  toastVariants,
  Toaster,
  useToast,
  type ToastProps,
  type ToastProviderProps,
  type ToastViewportProps,
  type ToastTitleProps,
  type ToastDescriptionProps,
  type ToastActionProps,
  type ToastCloseProps,
  type ToastTone,
  type ToastSize,
  type ToasterProps,
  type ToastOptions,
  type ToastItem,
  type ToastActionDescriptor,
  type UseToastReturn,
} from './primitives/Toast'

// ─── L2 Composites Wave C (Batch 2.3, 2026-05-13) ───

export {
  DataTable,
  DataTablePagination,
  DataTableToolbar,
  DataTableRow,
  dataTableVariants,
  type DataTableProps,
  type DataTableColumn,
  type DataTableCellContext,
  type DataTableSort,
  type DataTableSortDirection,
  type DataTableRowAction,
  type DataTableEmptyState,
  type DataTableSelectionMode,
  type DataTableVariant,
  type DataTableSize,
  type DataTablePaginationProps,
  type DataTableToolbarProps,
  type DataTableRowProps,
} from './primitives/DataTable'

export { cn } from './lib/cn'

// ─── L2 Composites (legados — refator para Tailwind na Fase 2.3) ───


export { FormModal, type FormModalProps } from './containers/FormModal'

// Frequencia — cross-domain (SGM + SGP). Migrado de @hashcodeti/ui-kit-sgp
// em Track C.1 da sprint 2026-04-20-code-split-fix-e-ports-faltantes.
export {
  FrequenciaFormV2,
  type FrequenciaFormV2Props,
  type RecorrenciaValue,
  type RecorrenciaEscala,
} from './frequencia/FrequenciaFormV2'

// Contador — cross-domain (SGM + SGP). Port vive em @hashcodeti/core-sdk
// (IContadorViewModel). Track C.2 da sprint 2026-04-20-code-split-fix-e-ports-faltantes.
export { ContadorPicker } from './contador/ContadorPicker'
export type {
  ContadorPickerProps,
  ContadorPickerValue,
  ContadorLimite,
  ContadorBoundRule,
} from './contador/ContadorPicker'

// Anexo — cross-domain (qualquer dominio). Port IAnexoManagerViewModel vive
// em @hashcodeti/core-sdk; o componente abaixo eh props-driven (zero Redux,
// zero useCoreService) e espera que o caller injete callbacks do ViewModel.
// Migrado do meta `teraprox-ui-kit/forms/AnexoManager` em Track C.3 da sprint
// 2026-04-20-code-split-fix-e-ports-faltantes.
export { AnexoManager } from './anexo/AnexoManager'
export type {
  AnexoManagerProps,
  AnexoPersistedItem,
  AnexoLocalItem,
} from './anexo/AnexoManager'

// ClickToWriteField — campo de texto inline editavel, promovido de
// teraprox-SGM-OS `InnerEditableTextField` na Wave 5C da sprint
// 2026-04-21-ui-kit-domain-split-wave0. Props-driven (zero Redux).
export { ClickToWriteField } from './click-to-write/ClickToWriteField'
export type { ClickToWriteFieldProps } from './click-to-write/ClickToWriteField'

// CombineModeToggle — toggle visual com icones de Venn para modos de combinacao
// de filtros multi-select. Usado em conjunto com `useFilterCombineMode` do
// teraprox-core-sdk. Props-driven (zero Redux).
export { CombineModeToggle } from './combine-mode/CombineModeToggle'
export type {
  CombineMode,
  CombineModeToggleProps,
} from './combine-mode/CombineModeToggle'

// ColorPicker — seletor de cor hex com presets visuais, props-driven (zero Redux).
// Cross-domain: usado por qualquer módulo que precise capturar valores de cor.
// Promovido de uso local em SGP-planoDeControle/LimiteDeControleForm para
// ui-kit-core em 2026-04-27.
export { ColorPicker } from './color-picker/ColorPicker'
export type { ColorPickerProps } from './color-picker/ColorPicker'

// FormActionButtons — agrupamento padrão de botões de formulário (Cancelar /
// Excluir / Salvar + opcionais Voltar / Copiar). Props-driven; cada botão
// renderiza conforme presença do callback e flag `show*` (default true).
// Inclui DeleteConfirm embutido (com motivo opcional) e variante hold-to-delete.
// Promovido de teraprox-ui-kit/buttons/ActionButtons para ui-kit-core em
// 2026-04-30 para virar padrão de todo formulário do ecossistema.
export { FormActionButtons } from './buttons/FormActionButtons'
export type { FormActionButtonsProps } from './buttons/FormActionButtons'
export { DeleteConfirm } from './buttons/DeleteConfirm'
export type { DeleteConfirmProps } from './buttons/DeleteConfirm'

// IconWithBadge — ícone com badge numérico opcional, cross-domain (SGM/SGP).
// Promovido de teraprox-SGM-OS/Components/default-components/icons/IconWithBadge.tsx
// na sprint 2026-04-29 (tarefa-item-unified, Phase 2). Apresentacional puro.
export { IconWithBadge } from './icons/IconWithBadge'
export type {
  IconWithBadgeProps,
  IconWithBadgeMode,
  IconWithBadgeBg,
} from './icons/IconWithBadge'

// ─── Wave E.1.1 (2026-05-13) — promoções SGM-OS ───
// DividerWithButton — divisor horizontal com botão central. Promovido de
// teraprox-SGM-OS/Components/default-components/buttons/DividerWithButton.tsx.
// Cross-domain (SGM/SGP). Apresentacional puro.
export { DividerWithButton } from './primitives/DividerWithButton'
export type { DividerWithButtonProps } from './primitives/DividerWithButton'

// ─── Wave G.1 (2026-05-15) — promoções SGM-UTILS ───
// TextWithMore — clamp+expand inline puro (Tailwind, sem react-bootstrap).
// Promovido de teraprox-app-SGM-UTILS/.../text/TextWithMore.js.
export { TextWithMore } from './text/TextWithMore'
export type { TextWithMoreProps } from './text/TextWithMore'

// YearMonthsSelector — seletor de ano + meses (multi-seleção, Tailwind).
// Promovido de teraprox-app-SGM-UTILS/.../forms/YearMonthsSelector.js.
export { YearMonthsSelector } from './forms/YearMonthsSelector'
export type {
  YearMonthsSelectorProps,
  YearMonthSelection,
  YearMonthRange,
} from './forms/YearMonthsSelector'

// QrCodeGeneratorButton — botão de geração/exibição de QR Code.
// Promovido de teraprox-app-SGM-UTILS/.../qr/QrCodeGeneratorButton.js.
export { QrCodeGeneratorButton } from './qr/QrCodeGeneratorButton'
export type { QrCodeGeneratorButtonProps } from './qr/QrCodeGeneratorButton'

// ImageAttachment — dropzone primitivo drag-drop + file picker (substitui
// react-dropzone). Cross-domain. NÃO inclui manager/preview/signed-URL —
// componentes domain (ex.: GenericImageAttachment SGM-OS) podem opcionalmente
// usar este primitivo internamente para o input.
export { ImageAttachment } from './primitives/ImageAttachment'
export type {
  ImageAttachmentProps,
  ImageAttachmentSize,
} from './primitives/ImageAttachment'

// ─── Wave G.1 (2026-05-15) — promoções SGM-OS execução ───
// Primitivos cross-domain promovidos de teraprox-SGM-OS/Components.
// Refs: wiki/arquitetura/wave-g-sgm-os-inventory.md.

// DateRange — par de inputs date (início + fim). Tailwind via TextField.
export { DateRange, DateRangeField, type DateRangeProps } from './primitives/DateRange'

// CountdownButton — confirmação destrutiva com countdown hold-to-confirm.
export { CountdownButton, type CountdownButtonProps } from './buttons/CountdownButton'

// UtilButtons — Save / CancelEdit / Delete (com confirm Modal embutido).
export {
  SaveButton,
  CancelEditButton,
  DeleteButton,
  type SaveButtonProps,
  type CancelEditButtonProps,
  type DeleteButtonProps,
} from './buttons/UtilButtons'

// GridContainer — wrapper grid responsivo (Tailwind), aceita `items` ou children.
export { GridContainer, type GridContainerProps, type GridContainerItem } from './layout/GridContainer'

// LoadingBlock — bloco skeleton com várias linhas pulsantes.
export { LoadingBlock, type LoadingBlockProps } from './states/LoadingBlock'

// InformativeOverlay — ícone "i" (ou trigger custom) + tooltip Radix com bullets.
export {
  InformativeOverlay,
  type InformativeOverlayProps,
  type InformativeOverlayItem,
} from './overlays/InformativeOverlay'

// ─── Wave H.5 (2026-05-13) — GenericPickerHost ───
// View pura que substitui o HOC factory `withGenericPicker` (522 LOC)
// duplicado em SGM-OS + SGM-UTILS. Consome a Port `IGenericPickerViewModel`
// (core-sdk) + render-props para `renderForm` e `renderItem`.
// Migra 12 callers cross-MF (ver picker/MIGRATION.md).
export {
  GenericPickerHost,
  type GenericPickerHostProps,
  type GenericPickerRenderFormProps,
  type GenericPickerRenderItemProps,
} from './picker'

