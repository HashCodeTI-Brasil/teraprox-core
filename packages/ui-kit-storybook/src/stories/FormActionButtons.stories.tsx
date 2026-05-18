import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FormActionButtons } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof FormActionButtons> = {
  title: 'ui-kit-core/FormActionButtons',
  component: FormActionButtons,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

const log = (label: string) => () => console.log(`[FormActionButtons] ${label}`)

export const NovaEntidade: Story = {
  args: {
    onSave: log('save'),
    onCancel: log('cancel'),
  },
}

export const EdicaoComDelete: Story = {
  args: {
    onSave: log('save'),
    onCancel: log('cancel'),
    onDelete: log('delete'),
  },
}

export const ComBackECopiar: Story = {
  args: {
    onSave: log('save'),
    onCancel: log('cancel'),
    onDelete: log('delete'),
    onBack: log('back'),
    onCopy: log('copy'),
  },
}

export const LoadingState: Story = {
  render: () => {
    const [saving, setSaving] = useState(false)
    return (
      <FormActionButtons
        onSave={() => {
          setSaving(true)
          setTimeout(() => setSaving(false), 1500)
        }}
        onCancel={log('cancel')}
        isSaving={saving}
      />
    )
  },
}
