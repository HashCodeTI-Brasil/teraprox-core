import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@hashcodeti/ui-kit-core'
import { FaChevronRight, FaTrash, FaUser } from 'react-icons/fa'
// List ainda não está exportado no root do `@hashcodeti/ui-kit-core` (entrega
// inicial sem mexer no barrel). Storybook consome direto do source via Vite.
// Tailwind do storybook só varre src/ + dist/ do core — então mantemos um
// "safelist comment" abaixo com TODAS as classes geradas dinamicamente pelo
// List.tsx para o JIT incluí-las no bundle do storybook.
//
// SAFELIST: flex flex-col list-none m-0 p-0 border border-surface-border
// rounded-lg overflow-hidden divide-y divide-surface-border border-y
// px-3 py-2 px-4 py-3 px-5 py-4 text-sm text-base gap-2 gap-3
// w-full text-left items-center transition-colors duration-150 outline-none
// focus-visible:bg-brand-primary-muted/40 focus-visible:ring-2
// focus-visible:ring-brand-accent focus-visible:ring-inset hover:bg-neutral-50
// no-underline text-inherit text-surface-foreground bg-brand-primary-muted
// text-brand-primary font-medium opacity-50 cursor-not-allowed pointer-events-none
// hover:bg-brand-primary-muted hover:bg-transparent block flex-1 min-w-0
// flex-col gap-0.5 ml-auto shrink-0
import {
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
} from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof List> = {
  title: 'primitives/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'flush', 'bordered'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof meta>

const sample = ['Equipamento A12', 'Equipamento B34', 'Equipamento C56']

export const Default: Story = {
  args: { variant: 'default', size: 'md' },
  render: (args) => (
    <List {...args} className="max-w-md">
      {sample.map((s) => (
        <ListItem key={s}>{s}</ListItem>
      ))}
    </List>
  ),
}

export const FlushVariant: Story = {
  render: () => (
    <List variant="flush" className="max-w-md">
      {sample.map((s) => (
        <ListItem key={s}>{s}</ListItem>
      ))}
    </List>
  ),
}

export const BorderedVariant: Story = {
  render: () => (
    <List variant="bordered" className="max-w-md">
      {sample.map((s) => (
        <ListItem key={s}>{s}</ListItem>
      ))}
    </List>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">size = {size}</p>
          <List size={size}>
            {sample.map((s) => (
              <ListItem key={s}>{s}</ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  ),
}

export const InteractiveItems: Story = {
  render: () => (
    <List className="max-w-md">
      <ListItem onClick={() => alert('Item 1')}>Clicável (button)</ListItem>
      <ListItem active onClick={() => alert('Active')}>
        Ativo + clicável
      </ListItem>
      <ListItem disabled onClick={() => alert('nope')}>
        Desabilitado
      </ListItem>
      <ListItem>Estático (sem hover)</ListItem>
    </List>
  ),
}

export const WithActions: Story = {
  render: () => (
    <List variant="default" className="max-w-lg">
      {[
        { name: 'João Silva', role: 'Mantenedor' },
        { name: 'Maria Souza', role: 'Supervisora' },
        { name: 'Carlos Lima', role: 'Operador' },
      ].map((u) => (
        <ListItem key={u.name}>
          <FaUser className="text-neutral-400 shrink-0" />
          <ListItemContent>
            <span className="font-medium">{u.name}</span>
            <span className="text-xs text-neutral-500">{u.role}</span>
          </ListItemContent>
          <ListItemAction>
            <Badge tone="success" size="sm">ativo</Badge>
            <button
              type="button"
              aria-label="Remover"
              className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-error"
              onClick={(e) => {
                e.stopPropagation()
                alert(`remover ${u.name}`)
              }}
            >
              <FaTrash size={12} />
            </button>
          </ListItemAction>
        </ListItem>
      ))}
    </List>
  ),
}

export const WithLinks: Story = {
  render: () => (
    <List variant="bordered" className="max-w-md">
      <ListItem href="#one">
        <ListItemContent>
          <span className="font-medium">Documento 1</span>
          <span className="text-xs text-neutral-500">/docs/um</span>
        </ListItemContent>
        <ListItemAction>
          <FaChevronRight className="text-neutral-400" />
        </ListItemAction>
      </ListItem>
      <ListItem href="https://teraprox.com" target="_blank">
        <ListItemContent>
          <span className="font-medium">Site externo</span>
          <span className="text-xs text-neutral-500">teraprox.com (rel auto)</span>
        </ListItemContent>
        <ListItemAction>
          <FaChevronRight className="text-neutral-400" />
        </ListItemAction>
      </ListItem>
      <ListItem href="#disabled" disabled>
        <ListItemContent>
          <span className="font-medium">Link desabilitado</span>
        </ListItemContent>
      </ListItem>
    </List>
  ),
}

export const FullExample: Story = {
  render: () => (
    <List variant="default" size="lg" className="max-w-xl">
      <List.Item active onClick={() => alert('OS atual')}>
        <ListItemContent>
          <span className="font-semibold">OS #2026-04-1234</span>
          <span className="text-xs">Em execução · selecionada</span>
        </ListItemContent>
        <List.Item.Action>
          <Badge tone="info" size="sm">execução</Badge>
        </List.Item.Action>
      </List.Item>

      <List.Item onClick={() => alert('OS 1235')}>
        <List.Item.Content>
          <span className="font-medium">OS #2026-04-1235</span>
          <span className="text-xs text-neutral-500">Aguardando aprovação</span>
        </List.Item.Content>
        <List.Item.Action>
          <Badge tone="warning" size="sm">pendente</Badge>
          <FaChevronRight className="text-neutral-400" />
        </List.Item.Action>
      </List.Item>

      <List.Item href="#1236">
        <List.Item.Content>
          <span className="font-medium">OS #2026-04-1236</span>
          <span className="text-xs text-neutral-500">Concluída · 02/05</span>
        </List.Item.Content>
        <List.Item.Action>
          <Badge tone="success" size="sm">ok</Badge>
          <FaChevronRight className="text-neutral-400" />
        </List.Item.Action>
      </List.Item>

      <List.Item disabled>
        <List.Item.Content>
          <span className="font-medium">OS #2026-04-1237</span>
          <span className="text-xs">Cancelada</span>
        </List.Item.Content>
        <List.Item.Action>
          <Badge tone="danger" size="sm">cancelada</Badge>
        </List.Item.Action>
      </List.Item>
    </List>
  ),
}
