import type { Meta, StoryObj } from '@storybook/react'
import { colors, spacing, radii } from '@hashcodeti/design-tokens'

// Bônus — não conta como uma das 10 stories Wave 3.
// Showcase visual dos design tokens para validar a Foundation L0.
const meta: Meta = {
  title: 'foundation/Design Tokens',
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <div className="flex items-center gap-3 p-2 border-b border-neutral-200">
    <div
      className="w-12 h-12 rounded-md border border-neutral-300"
      style={{ background: value }}
    />
    <div>
      <div className="font-mono text-sm">{name}</div>
      <div className="font-mono text-xs text-neutral-500">{value}</div>
    </div>
  </div>
)

export const Cores: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-4xl">
      <div>
        <h3 className="font-semibold mb-2">Brand</h3>
        {Object.entries(colors.brand).map(([k, v]) => (
          <Swatch key={k} name={`brand.${k}`} value={v} />
        ))}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Semantic</h3>
        {Object.entries(colors.semantic).slice(0, 6).map(([k, v]) => (
          <Swatch key={k} name={`semantic.${k}`} value={v} />
        ))}
      </div>
      <div className="col-span-2">
        <h3 className="font-semibold mb-2">Neutral</h3>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(colors.neutral).map(([k, v]) => (
            <div key={k} className="text-center">
              <div
                className="w-full h-12 rounded-md border border-neutral-300"
                style={{ background: v }}
              />
              <div className="font-mono text-xs mt-1">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const Spacing: Story = {
  render: () => (
    <div className="space-y-2 max-w-2xl">
      {Object.entries(spacing).map(([k, v]) => (
        <div key={k} className="flex items-center gap-3">
          <div className="font-mono text-sm w-16">{k}</div>
          <div className="bg-brand-primary h-6" style={{ width: v.rem }} />
          <div className="font-mono text-xs text-neutral-500">
            {v.px} / {v.rem}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Radii: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-2xl">
      {Object.entries(radii).map(([k, v]) => (
        <div key={k} className="text-center">
          <div
            className="w-full h-20 bg-brand-primary"
            style={{ borderRadius: v }}
          />
          <div className="font-mono text-xs mt-1">{k}: {v}</div>
        </div>
      ))}
    </div>
  ),
}
