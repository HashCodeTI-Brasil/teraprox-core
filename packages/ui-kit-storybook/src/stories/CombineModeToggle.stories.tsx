import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CombineModeToggle, type CombineMode } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof CombineModeToggle> = {
  title: 'ui-kit-core/CombineModeToggle',
  component: CombineModeToggle,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

const Wrapper = (props: { initial?: CombineMode; showLabel?: boolean; disabled?: boolean }) => {
  const [mode, setMode] = useState<CombineMode>(props.initial ?? 'union')
  return (
    <div className="space-y-3">
      <CombineModeToggle
        mode={mode}
        onChange={setMode}
        showLabel={props.showLabel}
        disabled={props.disabled}
      />
      <div className="text-sm text-neutral-600">
        Modo: <code>{mode}</code>
      </div>
    </div>
  )
}

export const Default: Story = { render: () => <Wrapper /> }
export const ComLabel: Story = { render: () => <Wrapper showLabel /> }
export const Intersection: Story = { render: () => <Wrapper initial="intersection" showLabel /> }
export const Desabilitado: Story = { render: () => <Wrapper initial="xor" showLabel disabled /> }
