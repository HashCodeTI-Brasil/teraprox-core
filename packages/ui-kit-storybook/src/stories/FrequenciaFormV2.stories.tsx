import type { Meta, StoryObj } from '@storybook/react'
import { FrequenciaFormV2 } from '@hashcodeti/ui-kit-core'

// SMOKE STORY — FrequenciaFormV2 é COMPLEX (recorrência cross-domain SGM+SGP).
// Stories completas (escalas, hora/dia/contador, validação) ficam para sprint
// dedicada de visual regression.
//
// TODO(uikit-v2): cobrir variantes:
//   - Recorrência por hora
//   - Recorrência por dia
//   - Recorrência por contador
//   - showDataInicio={true}
//   - escalasVisiveis customizado
const meta: Meta<typeof FrequenciaFormV2> = {
  title: 'ui-kit-core/FrequenciaFormV2 (smoke)',
  component: FrequenciaFormV2,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Smoke story — recorrência unificada SGM+SGP. Variantes completas pendentes (sprint visual regression).',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Placeholder: Story = {
  render: () => (
    <div className="p-4 border border-dashed border-neutral-300 rounded-md text-center text-neutral-500">
      <p className="font-medium">FrequenciaFormV2 — smoke skeleton</p>
      <p className="text-sm mt-2">
        Variantes (hora/dia/contador, escalas, dataInicio) pendentes — sprint visual regression.
      </p>
    </div>
  ),
}
