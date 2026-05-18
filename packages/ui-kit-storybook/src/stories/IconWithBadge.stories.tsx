import type { Meta, StoryObj } from '@storybook/react'
import { IconWithBadge } from '@hashcodeti/ui-kit-core'
import { FaBell } from 'react-icons/fa'

const meta: Meta<typeof IconWithBadge> = {
  title: 'ui-kit-core/IconWithBadge',
  component: IconWithBadge,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'radio', options: ['overlay', 'inline'] },
    bg: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
    },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <FaBell size={28} />,
    content: 5,
    mode: 'overlay',
    bg: 'danger',
  },
}

export const Inline: Story = {
  args: {
    icon: <FaBell size={28} />,
    content: 12,
    mode: 'inline',
    bg: 'primary',
  },
}

export const NoBadge: Story = {
  args: {
    icon: <FaBell size={28} />,
    content: 0,
  },
}
