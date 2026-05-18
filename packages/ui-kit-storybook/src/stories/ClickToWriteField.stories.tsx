import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ClickToWriteField } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof ClickToWriteField> = {
  title: 'ui-kit-core/ClickToWriteField',
  component: ClickToWriteField,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

const Wrapper = (props: { initial?: string; label?: string; placeholder?: string; disabled?: boolean }) => {
  const [v, setV] = useState(props.initial ?? '')
  return (
    <ClickToWriteField
      value={v}
      onChange={setV}
      label={props.label}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
  )
}

export const Default: Story = {
  render: () => <Wrapper label="Nome" placeholder="Digite o nome..." />,
}

export const ComValor: Story = {
  render: () => <Wrapper initial="Bomba centrífuga 12B" label="Equipamento" />,
}

export const Desabilitado: Story = {
  render: () => <Wrapper initial="Read-only" label="Campo travado" disabled />,
}
