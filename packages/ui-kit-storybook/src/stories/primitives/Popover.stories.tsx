// FIXME(barrel): este arquivo importa Popover do deep import `@hashcodeti/ui-kit-core/src/primitives/Popover`,
// porque o Tech Lead ainda precisa adicionar os exports correspondentes em
// `packages/ui-kit-core/src/index.ts`. Quando o barrel for atualizado,
// trocar para `from '@hashcodeti/ui-kit-core'`.
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '@hashcodeti/ui-kit-core'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverClose,
  PopoverAnchor,
  type PopoverSide,
  type PopoverAlign,
  type PopoverSize,
  type PopoverVariant,
} from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof Popover> = {
  title: 'primitives/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Popover>

const SIDES: PopoverSide[] = ['top', 'right', 'bottom', 'left']
const ALIGNS: PopoverAlign[] = ['start', 'center', 'end']
const SIZES: PopoverSize[] = ['sm', 'md', 'lg', 'auto']

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Abrir popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Título</h4>
          <p className="text-sm text-surface-foreground/80">
            Popover persistente — fecha apenas no esc, click outside ou close.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-12 p-24">
      {SIDES.map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="secondary">side={side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side} size="sm">
            <p className="text-sm">Lado: <b>{side}</b></p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
}

export const AllAligns: Story = {
  render: () => (
    <div className="flex gap-6 p-24">
      {ALIGNS.map((align) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button variant="secondary">align={align}</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align={align} size="sm">
            <p className="text-sm">Alinhamento: <b>{align}</b></p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-6 p-24 flex-wrap">
      {SIZES.map((size) => (
        <Popover key={size}>
          <PopoverTrigger asChild>
            <Button variant="secondary">size={size}</Button>
          </PopoverTrigger>
          <PopoverContent size={size}>
            <p className="text-sm">
              Tamanho: <b>{size}</b>. Lorem ipsum dolor sit amet, consectetur.
            </p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
}

export const WithArrow: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Com arrow</Button>
      </PopoverTrigger>
      <PopoverContent side="bottom">
        <p className="text-sm">Popover com seta apontando ao trigger.</p>
        <PopoverArrow width={12} height={6} />
      </PopoverContent>
    </Popover>
  ),
}

export const WithCloseButton: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Abrir notificação</Button>
      </PopoverTrigger>
      <PopoverContent size="md">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold">Bem-vindo</h4>
            <p className="text-sm text-surface-foreground/80">
              Você tem 3 tarefas pendentes.
            </p>
          </div>
          <div className="flex justify-end">
            <PopoverClose asChild>
              <Button variant="secondary" size="sm">Fechar</Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const ControlledExample: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex flex-col items-start gap-3">
        <div className="text-sm">
          Estado externo: <b>{open ? 'aberto' : 'fechado'}</b>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setOpen((v) => !v)}>
            Toggle externo
          </Button>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button>Trigger interno</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-sm">Popover controlado por estado externo.</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    )
  },
}

export const FormInsidePopover: Story = {
  render: () => {
    const [name, setName] = useState('')
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>Editar perfil</Button>
        </PopoverTrigger>
        <PopoverContent size="md">
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              alert(`Nome salvo: ${name}`)
            }}
          >
            <div className="space-y-1">
              <label htmlFor="popover-name" className="text-sm font-medium">
                Nome
              </label>
              <input
                id="popover-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-2 py-1 text-sm rounded border border-surface-border bg-surface-background outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Digite seu nome"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <PopoverClose asChild>
                <Button type="button" variant="secondary" size="sm">
                  Cancelar
                </Button>
              </PopoverClose>
              <Button type="submit" size="sm">Salvar</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    )
  },
}

export const WithAnchor: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverAnchor asChild>
        <div className="px-6 py-4 border-2 border-dashed border-surface-border rounded">
          Anchor (área pontilhada)
        </div>
      </PopoverAnchor>
      <PopoverTrigger asChild>
        <Button className="mt-3">Trigger separado do anchor</Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        <p className="text-sm">
          Posicionado relativo ao <b>anchor</b>, não ao trigger.
        </p>
      </PopoverContent>
    </Popover>
  ),
}
