import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof Spinner> = {
  title: 'primitives/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['border', 'grow'] },
    tone: {
      control: 'select',
      options: ['current', 'brand', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    srLabel: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof meta>

const VARIANTS = ['border', 'grow'] as const
const TONES = ['current', 'brand', 'success', 'warning', 'error', 'info', 'neutral'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const Default: Story = {
  args: { tone: 'brand' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {VARIANTS.map((v) => (
        <div key={v} className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-neutral-500 uppercase">{v}</span>
          <div className="flex flex-wrap items-center gap-4">
            {TONES.map((t) => (
              <Spinner key={t} variant={v} tone={t} srLabel={`Carregando ${t}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {TONES.map((t) => (
        <div key={t} className="flex flex-col items-center gap-1">
          <Spinner tone={t} srLabel={`Carregando ${t}`} />
          <span className="text-[11px] text-neutral-500">{t}</span>
        </div>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {SIZES.map((s) => (
        <div key={s} className="flex flex-col items-center gap-1">
          <Spinner size={s} tone="brand" srLabel={`Carregando ${s}`} />
          <span className="text-[11px] text-neutral-500">{s}</span>
        </div>
      ))}
    </div>
  ),
}

export const InheritsCurrentColor: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-error">
        <Spinner size="sm" /> <span>Excluindo registro...</span>
      </div>
      <div className="flex items-center gap-2 text-success">
        <Spinner size="sm" /> <span>Salvando...</span>
      </div>
      <div className="flex items-center gap-2 text-brand-primary">
        <Spinner size="md" /> <span>Sincronizando dados</span>
      </div>
    </div>
  ),
}

export const GrowVariant: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {SIZES.map((s) => (
        <Spinner key={s} variant="grow" tone="brand" size={s} srLabel={`grow ${s}`} />
      ))}
    </div>
  ),
}
