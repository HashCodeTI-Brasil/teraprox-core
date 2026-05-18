// @hashcodeti/ui-kit-core/lib/cn
//
// Util para merge de className Tailwind. Combina `clsx` (concat condicional) com
// `tailwind-merge` (resolve conflitos de utility classes, ex.: `p-4 p-2` → `p-2`).
//
// Padrão Shadcn/Radix moderno. Toda variante CVA passa por `cn()`.
//
// Uso:
//   cn('px-2 py-1', isActive && 'bg-brand-primary', className)
//   cn(buttonVariants({ variant, size }), className)

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
