import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
// FIXME: deep import temporário até Sheet ser exportado no barrel raiz @hashcodeti/ui-kit-core
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  type SheetSide,
  type SheetSize,
} from '@hashcodeti/ui-kit-core'
import { Button, TextField } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof Sheet> = {
  title: 'primitives/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'radio', options: ['left', 'right', 'top', 'bottom'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'xl', 'full'] },
  },
}
export default meta

type Story = StoryObj<typeof meta>

const Trigger = ({
  side = 'right',
  size,
  long = false,
  withFooter = true,
  label,
}: {
  side?: SheetSide
  size?: SheetSize
  long?: boolean
  withFooter?: boolean
  label?: string
}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{label ?? `Abrir ${side}`}</Button>
      <Sheet open={open} onOpenChange={setOpen} side={side} size={size}>
        <SheetHeader>
          <SheetTitle>Filtros avançados</SheetTitle>
          <SheetDescription>Refine a lista de ordens de serviço.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-3">
            <TextField label="Equipamento" placeholder="BOMB-12B" />
            <TextField label="Responsável" placeholder="João" />
            <TextField label="Observações" multiline rows={4} placeholder="—" />
            {long &&
              Array.from({ length: 20 }).map((_, i) => (
                <TextField key={i} label={`Campo extra ${i + 1}`} placeholder="—" />
              ))}
          </div>
        </SheetBody>
        {withFooter && (
          <SheetFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Aplicar
            </Button>
          </SheetFooter>
        )}
      </Sheet>
    </>
  )
}

export const Default: Story = { render: () => <Trigger /> }

export const AllSides: Story = {
  name: 'Todos os lados',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Trigger side="left" label="Left" />
      <Trigger side="right" label="Right" />
      <Trigger side="top" label="Top" />
      <Trigger side="bottom" label="Bottom" />
    </div>
  ),
}

export const AllSizes: Story = {
  name: 'Todos os tamanhos (right)',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Trigger side="right" size="sm" label="sm 320px" />
      <Trigger side="right" size="md" label="md 480px" />
      <Trigger side="right" size="lg" label="lg 640px" />
      <Trigger side="right" size="xl" label="xl 768px" />
      <Trigger side="right" size="full" label="full" />
    </div>
  ),
}

export const WithFooter: Story = {
  name: 'Com footer',
  render: () => <Trigger side="right" withFooter />,
}

export const ScrollableContent: Story = {
  name: 'Conteúdo longo (scroll interno)',
  render: () => <Trigger side="right" size="md" long />,
}

export const Controlled: Story = {
  name: 'Controlled',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Abrir externo</Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Fechar externo
          </Button>
        </div>
        <p className="text-sm text-neutral-600">Estado: {open ? 'open' : 'closed'}</p>
        <Sheet open={open} onOpenChange={setOpen} side="right" size="md">
          <SheetHeader>
            <SheetTitle>Sheet controlado</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <p>Open/onOpenChange controlados externamente.</p>
          </SheetBody>
          <SheetFooter>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </SheetFooter>
        </Sheet>
      </div>
    )
  },
}
