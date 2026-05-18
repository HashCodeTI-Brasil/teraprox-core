import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof Checkbox> = {
  title: 'primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'radio', options: ['brand', 'success', 'error'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
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

export const Indeterminate: Story = {
  render: () => <Checkbox checked="indeterminate" label="Selecionar todos" />,
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox disabled label="Disabled (unchecked)" />
      <Checkbox disabled defaultChecked label="Disabled (checked)" />
      <Checkbox disabled checked="indeterminate" label="Disabled (indeterminate)" />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox size="sm" defaultChecked label="Small" />
      <Checkbox size="md" defaultChecked label="Medium (default)" />
      <Checkbox size="lg" defaultChecked label="Large" />
    </div>
  ),
}

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox tone="brand" defaultChecked label="Brand (default)" />
      <Checkbox tone="success" defaultChecked label="Success" />
      <Checkbox tone="error" defaultChecked label="Error" />
    </div>
  ),
}

export const WithLabel: Story = {
  args: { label: 'Aceito os termos de uso' },
}

export const WithLabelAndDescription: Story = {
  render: () => (
    <Checkbox
      label="Receber notificações por email"
      description="Enviaremos no máximo 1 email por semana com novidades."
    />
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<boolean | 'indeterminate'>(false)
    return (
      <div className="flex flex-col gap-3">
        <Checkbox
          checked={value}
          onCheckedChange={setValue}
          label={`Estado: ${String(value)}`}
          description="Click no checkbox ou nos botões abaixo"
        />
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded border px-2 py-1 text-xs"
            onClick={() => setValue(false)}
          >
            unchecked
          </button>
          <button
            type="button"
            className="rounded border px-2 py-1 text-xs"
            onClick={() => setValue(true)}
          >
            checked
          </button>
          <button
            type="button"
            className="rounded border px-2 py-1 text-xs"
            onClick={() => setValue('indeterminate')}
          >
            indeterminate
          </button>
        </div>
      </div>
    )
  },
}
