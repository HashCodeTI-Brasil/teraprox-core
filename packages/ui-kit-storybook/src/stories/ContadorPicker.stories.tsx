import type { Meta, StoryObj } from '@storybook/react'
import { ContadorPicker } from '@hashcodeti/ui-kit-core'

// SMOKE STORY — ContadorPicker é CONTAINER e depende de IContadorViewModel
// do @hashcodeti/core-sdk. Stories completas com mock ViewModel ficam para
// sprint dedicada de visual regression (Fase 2 do plano).
//
// TODO(uikit-v2): adicionar mock ViewModel quando primitivos L1 estiverem prontos
// e core-sdk expuser test doubles oficiais.
const meta: Meta<typeof ContadorPicker> = {
  title: 'ui-kit-core/ContadorPicker (smoke)',
  component: ContadorPicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Smoke story — componente Container que depende de IContadorViewModel injetado. Story completa pendente (sprint visual regression).',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Placeholder: Story = {
  render: () => (
    <div className="p-4 border border-dashed border-neutral-300 rounded-md text-center text-neutral-500">
      <p className="font-medium">ContadorPicker — smoke skeleton</p>
      <p className="text-sm mt-2">
        Requer mock IContadorViewModel — pendente sprint visual regression.
      </p>
    </div>
  ),
}
