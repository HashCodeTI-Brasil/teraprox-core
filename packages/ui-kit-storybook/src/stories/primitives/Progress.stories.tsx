import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import { Progress } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof Progress> = {
  title: 'primitives/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number' } },
    tone: {
      control: 'radio',
      options: ['brand', 'success', 'warning', 'error'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    variant: {
      control: 'radio',
      options: ['default', 'striped', 'indeterminate'],
    },
    label: { control: 'text' },
  },
  args: {
    value: 42,
    max: 100,
    tone: 'brand',
    size: 'md',
    variant: 'default',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 360 }}>
      <Progress value={65} tone="brand" label="brand" />
      <Progress value={65} tone="success" label="success" />
      <Progress value={65} tone="warning" label="warning" />
      <Progress value={65} tone="error" label="error" />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 360 }}>
      <Progress value={50} size="sm" label="sm (h-1)" />
      <Progress value={50} size="md" label="md (h-2, default)" />
      <Progress value={50} size="lg" label="lg (h-3)" />
    </div>
  ),
}

export const Striped: Story = {
  args: { variant: 'striped', value: 60, tone: 'success', size: 'lg' },
}

export const Indeterminate: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 360 }}>
      <Progress value={null} variant="indeterminate" tone="brand" />
      <Progress value={null} variant="indeterminate" tone="success" size="lg" />
      <Progress
        value={null}
        variant="indeterminate"
        tone="warning"
        label="Carregando..."
      />
    </div>
  ),
}

export const WithLabel: Story = {
  args: { value: 73, label: 'Upload do arquivo (73%)', tone: 'brand' },
}

export const AnimatedFill: Story = {
  name: 'AnimatedFill (interactive)',
  render: () => {
    const [v, setV] = useState(0)
    useEffect(() => {
      const id = setInterval(() => {
        setV((prev) => (prev >= 100 ? 0 : prev + 5))
      }, 350)
      return () => clearInterval(id)
    }, [])
    return (
      <div className="flex flex-col gap-3" style={{ width: 360 }}>
        <Progress value={v} tone="brand" label={`Progresso: ${v}%`} />
        <Progress value={v} variant="striped" tone="success" size="lg" />
      </div>
    )
  },
}
