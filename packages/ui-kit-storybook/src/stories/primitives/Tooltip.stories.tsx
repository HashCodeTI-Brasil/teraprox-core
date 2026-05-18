// FIXME(barrel): este arquivo importa Tooltip do barrel `@hashcodeti/ui-kit-core`,
// mas o Tech Lead ainda precisa adicionar os exports correspondentes em
// `packages/ui-kit-core/src/index.ts`. Até lá, o storybook build vai falhar com
// "Missing specifier" — esperado e bloqueante apenas para esta story. Quando
// barrel for atualizado, este arquivo passa a buildar sem nenhuma alteração.
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Button,
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  type TooltipSide,
  type TooltipAlign,
  type TooltipVariant,
  type TooltipSize,
} from '@hashcodeti/ui-kit-core'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'primitives/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    layout: 'centered',
  },
  argTypes: {
    side: { control: 'radio', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'radio', options: ['start', 'center', 'end'] },
    variant: { control: 'radio', options: ['default', 'light'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    delayDuration: { control: { type: 'number', min: 0, max: 1000, step: 50 } },
  },
  args: {
    content: 'Tooltip de exemplo',
    side: 'top',
    align: 'center',
    variant: 'default',
    size: 'md',
    delayDuration: 200,
  },
}
export default meta

type Story = StoryObj<typeof meta>

// Padding generoso para que os 4 sides caibam centralizados sem overflow visual.
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center justify-center gap-6 p-16">{children}</div>
)

export const Default: Story = {
  render: (args) => (
    <Stage>
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </Stage>
  ),
}

export const AllSides: Story = {
  render: () => {
    const sides: TooltipSide[] = ['top', 'right', 'bottom', 'left']
    return (
      <div className="grid grid-cols-2 gap-10 p-20">
        {sides.map((side) => (
          <Tooltip key={side} side={side} content={`side="${side}"`}>
            <Button variant="secondary">side: {side}</Button>
          </Tooltip>
        ))}
      </div>
    )
  },
}

export const AllAligns: Story = {
  render: () => {
    const aligns: TooltipAlign[] = ['start', 'center', 'end']
    return (
      <div className="flex flex-col items-center gap-12 p-16">
        {aligns.map((align) => (
          <Tooltip key={align} side="bottom" align={align} content={`align="${align}"`}>
            <Button className="min-w-[280px]">align: {align}</Button>
          </Tooltip>
        ))}
      </div>
    )
  },
}

export const AllVariants: Story = {
  render: () => {
    const variants: TooltipVariant[] = ['default', 'light']
    return (
      <div className="flex items-center gap-6 p-16">
        {variants.map((variant) => (
          <Tooltip
            key={variant}
            variant={variant}
            content={`variant="${variant}"`}
            defaultOpen
          >
            <Button variant={variant === 'light' ? 'secondary' : 'primary'}>
              {variant}
            </Button>
          </Tooltip>
        ))}
      </div>
    )
  },
}

export const AllSizes: Story = {
  render: () => {
    const sizes: TooltipSize[] = ['sm', 'md', 'lg']
    return (
      <div className="flex items-center gap-6 p-16">
        {sizes.map((size) => (
          <Tooltip key={size} size={size} content={`size="${size}"`} defaultOpen>
            <Button>{size}</Button>
          </Tooltip>
        ))}
      </div>
    )
  },
}

export const LightVariant: Story = {
  name: 'Light variant (sobre fundo escuro)',
  render: () => (
    <div className="flex items-center justify-center gap-6 bg-neutral-900 p-16 rounded-md">
      <Tooltip variant="light" content="Tooltip claro destaca em fundos escuros" defaultOpen>
        <Button variant="secondary">Hover</Button>
      </Tooltip>
    </div>
  ),
}

export const ComposedManually: Story = {
  name: 'Composição manual (Provider + Root + Trigger + Content)',
  render: () => (
    <Stage>
      <TooltipProvider delayDuration={0} skipDelayDuration={300}>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <Button variant="ghost">Sem delay</Button>
          </TooltipTrigger>
          <TooltipPrimitive.Portal>
            <TooltipContent side="top" variant="light">
              Provider externo, delay=0
            </TooltipContent>
          </TooltipPrimitive.Portal>
        </TooltipRoot>
      </TooltipProvider>
    </Stage>
  ),
}

export const MultiTooltip: Story = {
  name: 'Múltiplos tooltips (skipDelayDuration coordenado)',
  render: () => (
    <TooltipProvider delayDuration={300} skipDelayDuration={100}>
      <div className="flex items-center gap-2 p-16">
        {(['Salvar', 'Editar', 'Duplicar', 'Excluir'] as const).map((label, i) => (
          <Tooltip
            key={label}
            content={`${label} (atalho ${i + 1})`}
            side="bottom"
          >
            <Button
              variant={label === 'Excluir' ? 'danger' : 'secondary'}
              aria-label={label}
            >
              {label}
            </Button>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
}

export const Controlled: Story = {
  name: 'Controlado (open/onOpenChange)',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Stage>
        <Tooltip open={open} onOpenChange={setOpen} content="Estado controlado externamente">
          <Button onClick={() => setOpen((v) => !v)}>
            {open ? 'Fechar' : 'Abrir'} tooltip
          </Button>
        </Tooltip>
      </Stage>
    )
  },
}
