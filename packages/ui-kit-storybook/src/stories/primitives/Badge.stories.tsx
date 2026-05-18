import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@hashcodeti/ui-kit-core'
import { FaCheck, FaStar } from 'react-icons/fa'

const meta: Meta<typeof Badge> = {
  title: 'primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['solid', 'outline', 'subtle'] },
    tone: {
      control: 'select',
      options: [
        'primary', 'secondary', 'success', 'danger',
        'warning', 'info', 'light', 'dark', 'neutral',
      ],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    pill: { control: 'boolean' },
    removable: { control: 'boolean' },
    dot: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof meta>

const TONES = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'neutral'] as const

export const Default: Story = {
  args: { children: 'Badge', tone: 'primary' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'outline', 'subtle'] as const).map((v) => (
        <div key={v} className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-neutral-500 uppercase">{v}</span>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <Badge key={t} variant={v} tone={t}>{t}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {TONES.map((t) => (
        <Badge key={t} tone={t}>{t}</Badge>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm" tone="primary">Small</Badge>
      <Badge size="md" tone="primary">Medium</Badge>
      <Badge size="lg" tone="primary">Large</Badge>
    </div>
  ),
}

export const Removable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="info" removable onRemove={() => alert('removed')}>Filtro: status</Badge>
      <Badge variant="subtle" tone="success" removable onRemove={() => alert('removed')}>Aprovado</Badge>
      <Badge variant="outline" tone="danger" size="lg" removable onRemove={() => alert('removed')}>Crítico</Badge>
    </div>
  ),
}

export const Dot: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Badge dot tone="success">Online</Badge>
      <Badge dot tone="warning">Em atenção</Badge>
      <Badge dot tone="danger">Offline</Badge>
      <Badge dot tone="info" size="lg">Sincronizando</Badge>
      <Badge dot tone="success" aria-label="Online" />
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="success"><FaCheck /> Concluído</Badge>
      <Badge variant="subtle" tone="warning"><FaStar /> Destaque</Badge>
      <Badge variant="outline" tone="primary" size="lg"><FaStar /> Premium</Badge>
    </div>
  ),
}

export const SquareVsPill: Story = {
  render: () => (
    <div className="flex gap-3">
      <Badge tone="primary" pill>Pill (default)</Badge>
      <Badge tone="primary" pill={false}>Squared</Badge>
    </div>
  ),
}
