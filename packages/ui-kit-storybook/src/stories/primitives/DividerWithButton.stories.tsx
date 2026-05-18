import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { DividerWithButton } from '@hashcodeti/ui-kit-core'
import { FaPlus, FaCog } from 'react-icons/fa'

const meta: Meta<typeof DividerWithButton> = {
  title: 'primitives/DividerWithButton',
  component: DividerWithButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline-primary',
        'outline-secondary',
        'link',
      ],
    },
    size: { control: 'radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Adicionar item',
    onClick: action('click'),
  },
  render: (args) => (
    <div className="w-[480px]">
      <DividerWithButton {...args} />
    </div>
  ),
}

export const IconOnly: Story = {
  args: {
    onClick: action('click'),
    icon: <FaPlus />,
  },
  render: (args) => (
    <div className="w-[480px]">
      <DividerWithButton {...args} />
    </div>
  ),
}

export const CustomVariant: Story = {
  args: {
    label: 'Configurar',
    variant: 'outline-primary',
    icon: <FaCog />,
    onClick: action('click'),
  },
  render: (args) => (
    <div className="w-[480px]">
      <DividerWithButton {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Adicionar item',
    disabled: true,
    onClick: action('click'),
  },
  render: (args) => (
    <div className="w-[480px]">
      <DividerWithButton {...args} />
    </div>
  ),
}
