import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@hashcodeti/ui-kit-core'
import { FaSave, FaTrash, FaArrowLeft } from 'react-icons/fa'

const meta: Meta<typeof Button> = {
  title: 'primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link',
        'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info',
      ],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Salvar', variant: 'primary', size: 'md' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-3 max-w-2xl">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'] as const).map((v) => (
        <Button key={v} variant={v}>{v}</Button>
      ))}
      {(['outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info'] as const).map((v) => (
        <Button key={v} variant={v}>{v}</Button>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button leftIcon={<FaSave />}>Salvar</Button>
      <Button variant="outline-danger" leftIcon={<FaTrash />}>Excluir</Button>
      <Button variant="link" rightIcon={<FaArrowLeft className="rotate-180" />}>Avançar</Button>
    </div>
  ),
}

export const Loading: Story = {
  args: { children: 'Salvando...', variant: 'primary', loading: true },
}

export const Disabled: Story = {
  args: { children: 'Indisponível', variant: 'primary', disabled: true },
}

export const FullWidth: Story = {
  args: { children: 'Botão largura total', variant: 'primary', fullWidth: true },
}

export const AsChildLink: Story = {
  render: () => (
    <Button asChild variant="link">
      <a href="https://teraprox.com" target="_blank" rel="noreferrer">Link externo</a>
    </Button>
  ),
}
