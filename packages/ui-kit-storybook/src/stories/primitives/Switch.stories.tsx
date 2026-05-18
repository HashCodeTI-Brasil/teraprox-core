import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof Switch> = {
  title: 'primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'radio', options: ['brand', 'success'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch disabled label="Off + disabled" />
      <Switch disabled defaultChecked label="On + disabled" />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-1">
        <Switch size="sm" defaultChecked />
        <span className="text-xs text-neutral-500">sm</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Switch size="md" defaultChecked />
        <span className="text-xs text-neutral-500">md</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Switch size="lg" defaultChecked />
        <span className="text-xs text-neutral-500">lg</span>
      </div>
    </div>
  ),
}

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch tone="brand" defaultChecked label="brand (default)" />
      <Switch tone="success" defaultChecked label="success" />
    </div>
  ),
}

export const WithLabel: Story = {
  args: {
    label: 'Notificações por email',
  },
}

export const WithLabelAndDescription: Story = {
  args: {
    label: 'Notificações por email',
    description: 'Receba avisos sobre novas ordens de serviço atribuídas a você.',
    defaultChecked: true,
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)
    return (
      <div className="flex flex-col gap-3">
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          label="Modo escuro"
          description={`Estado atual: ${checked ? 'ON' : 'OFF'}`}
        />
        <button
          type="button"
          className="self-start text-xs underline text-brand-primary"
          onClick={() => setChecked((c) => !c)}
        >
          Toggle externo
        </button>
      </div>
    )
  },
}
