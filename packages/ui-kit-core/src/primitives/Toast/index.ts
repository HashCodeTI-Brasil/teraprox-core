// Barrel local — Toast primitive
//
// Exporta:
//   - Sub-componentes baixo nível (Toast.tsx): Provider, Viewport, Root,
//     Title, Description, Action, Close + variants helper.
//   - Wrapper alto nível (Toaster.tsx): Toaster + useToast + tipos.

export {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  toastVariants,
} from './Toast'
export type {
  ToastProps,
  ToastProviderProps,
  ToastViewportProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
  ToastTone,
  ToastSize,
} from './Toast'

export { Toaster, useToast } from './Toaster'
export type {
  ToasterProps,
  ToastOptions,
  ToastItem,
  ToastActionDescriptor,
  UseToastReturn,
} from './Toaster'
