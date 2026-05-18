import type { Meta, StoryObj } from '@storybook/react'
import { StatusLight } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof StatusLight> = {
  title: 'primitives/StatusLight',
  component: StatusLight,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
    tone: {
      control: 'select',
      options: ['primary', 'success', 'danger', 'warning', 'info', 'dark', 'neutral'],
    },
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    pulse: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof meta>

const TONES = ['primary', 'success', 'danger', 'warning', 'info', 'dark', 'neutral'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const Default: Story = {
  args: { active: true, tone: 'success' },
}

export const Inactive: Story = {
  args: { active: false },
}

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-neutral-500 uppercase w-20">active</span>
        {TONES.map((t) => (
          <div key={t} className="flex items-center gap-1.5">
            <StatusLight active tone={t} />
            <span className="text-xs text-neutral-600">{t}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-neutral-500 uppercase w-20">inactive</span>
        <div className="flex items-center gap-1.5">
          <StatusLight active={false} />
          <span className="text-xs text-neutral-600">neutral (forçado)</span>
        </div>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {SIZES.map((s) => (
        <div key={s} className="flex flex-col items-center gap-1">
          <StatusLight active tone="success" size={s} />
          <span className="text-xs text-neutral-600">{s}</span>
        </div>
      ))}
    </div>
  ),
}

export const Pulse: Story = {
  args: { active: true, tone: 'success', size: 'lg', pulse: true, 'aria-label': 'Conectado' },
}

export const InlineWithText: Story = {
  render: () => (
    <p className="text-sm text-neutral-700">
      Servidor <StatusLight active tone="success" /> online · Cache{' '}
      <StatusLight active={false} /> indisponível · Job{' '}
      <StatusLight active tone="warning" pulse /> em execução
    </p>
  ),
}

export const ParityShimLegacy: Story = {
  name: 'Parity-shim (legacy props)',
  args: {
    active: true,
    // @ts-expect-error — parity-shims deprecated, emitem console.warn em dev
    activeLightColor: 'green',
    // @ts-expect-error
    legacySize: 20,
  },
}
