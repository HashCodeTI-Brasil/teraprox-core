import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TextField } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof TextField> = {
  title: 'primitives/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['outlined', 'filled'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof meta>

const Controlled = (
  props: Omit<React.ComponentProps<typeof TextField>, 'value' | 'onChange'>,
) => {
  const [v, setV] = useState('')
  return (
    <div className="max-w-sm">
      <TextField {...props} value={v} onChange={(e) => setV(e.target.value)} />
    </div>
  )
}

export const Default: Story = {
  render: () => <Controlled label="Nome" placeholder="Digite o nome..." />,
}

export const WithHint: Story = {
  render: () => (
    <Controlled
      label="Código do equipamento"
      hint="Use o código interno (ex.: BOMB-12B)"
      placeholder="Ex.: BOMB-12B"
    />
  ),
}

export const WithError: Story = {
  render: () => (
    <Controlled
      label="E-mail"
      placeholder="seu@email.com"
      error="E-mail inválido"
    />
  ),
}

export const Required: Story = {
  render: () => <Controlled label="Título da OS" required placeholder="Obrigatório" />,
}

export const Optional: Story = {
  render: () => <Controlled label="Observação" optional placeholder="Opcional" />,
}

export const Disabled: Story = {
  render: () => (
    <div className="max-w-sm">
      <TextField label="Campo travado" value="Read-only via disabled" disabled onChange={() => {}} />
    </div>
  ),
}

export const ReadOnly: Story = {
  render: () => (
    <div className="max-w-sm">
      <TextField label="Apenas leitura" value="Conteúdo somente leitura" readOnly onChange={() => {}} />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <TextField label="Small" size="sm" placeholder="sm" />
      <TextField label="Medium (default)" size="md" placeholder="md" />
      <TextField label="Large" size="lg" placeholder="lg" />
    </div>
  ),
}

export const Filled: Story = {
  render: () => (
    <div className="max-w-sm">
      <TextField label="Variant filled" variant="filled" placeholder="Background neutral-100" />
    </div>
  ),
}

export const Multiline: Story = {
  render: () => (
    <Controlled
      label="Descrição"
      multiline
      rows={4}
      placeholder="Descreva o problema..."
      hint="Markdown não é suportado"
    />
  ),
}
