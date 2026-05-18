import type { Meta, StoryObj } from '@storybook/react'
import { AnexoManager } from '@hashcodeti/ui-kit-core'

// SMOKE STORY — AnexoManager é COMPLEX (orquestra upload/preview/delete de anexos).
// Depende de callbacks injetados pelo IAnexoManagerViewModel (core-sdk).
// Stories completas com fluxo de upload mockado ficam para sprint visual regression.
//
// TODO(uikit-v2): cobrir variantes:
//   - Lista vazia (estado inicial)
//   - 3 anexos persistidos
//   - Upload em progresso (local items)
//   - Erro de upload
//   - Imagem vs documento
const meta: Meta<typeof AnexoManager> = {
  title: 'ui-kit-core/AnexoManager (smoke)',
  component: AnexoManager,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Smoke story — gerenciador de anexos (upload, preview, delete). Fluxo completo pendente (sprint visual regression).',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Placeholder: Story = {
  render: () => (
    <div className="p-4 border border-dashed border-neutral-300 rounded-md text-center text-neutral-500">
      <p className="font-medium">AnexoManager — smoke skeleton</p>
      <p className="text-sm mt-2">
        Fluxo upload/preview/delete pendente — sprint visual regression.
      </p>
    </div>
  ),
}
