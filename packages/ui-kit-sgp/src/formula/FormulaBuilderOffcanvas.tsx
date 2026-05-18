// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/FormulaBuilderOffcanvas.tsx
// Wave G.1 (2026-05-15) — TRIVIAL/CROSS_MF. Wrapper Sheet (Radix) substitui Offcanvas RB.
// O `FormulaBuilder` propriamente dito permanece DOMAIN_COMPOSITION no MF — caller
// injeta como `children` para preservar inversao de controle (sem acoplar dependencias
// internas do builder ao ui-kit-sgp).
import { ReactNode } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetTitle,
  SheetClose,
} from '@hashcodeti/ui-kit-core'

export interface FormulaBuilderOffcanvasProps {
  show: boolean
  showFunc: (next: boolean) => void
  /** Conteudo do builder injetado pelo caller. */
  children: ReactNode
  title?: string
}

export const FormulaBuilderOffcanvas = ({
  show,
  showFunc,
  children,
  title = 'Formula Builder',
}: FormulaBuilderOffcanvasProps) => {
  return (
    <Sheet open={show} onOpenChange={showFunc}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <SheetBody>
          <h2 className="mb-3 text-lg font-semibold">{title}</h2>
          {children}
        </SheetBody>
      </SheetContent>
    </Sheet>
  )
}

export default FormulaBuilderOffcanvas
