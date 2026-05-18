import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ColorPicker } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof ColorPicker> = {
  title: 'ui-kit-core/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

const Wrapper = ({ initial, ...rest }: { initial?: string; label?: string; disabled?: boolean }) => {
  const [color, setColor] = useState<string>(initial ?? '#3498db')
  return (
    <div className="space-y-3">
      <ColorPicker defaultColor={color} setCor={setColor} {...rest} />
      <div className="text-sm text-neutral-600">
        Selecionado: <code>{color}</code>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <Wrapper />,
}

export const ComLabel: Story = {
  render: () => <Wrapper initial="#e74c3c" label="Cor do limite" />,
}

export const Desabilitado: Story = {
  render: () => <Wrapper initial="#2ecc71" disabled />,
}
