import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  PresetSaveModal,
  type PresetSummary,
  type PresetSavePayload,
} from '@hashcodeti/ui-kit-sgp'
import { Button } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof PresetSaveModal> = {
  title: 'sgp/PresetSaveModal',
  component: PresetSaveModal,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

const SUMMARY: PresetSummary = {
  planoNome: 'Linha A — Inspeções',
  periodo: 'Esta Semana',
  groupOption: 'recurso',
  sortOption: 'label_az',
  activeStatus: 'pendente',
  visibleGroupsCount: 12,
  pinnedCount: 3,
  totalGroups: 24,
}

function Demo({
  initial,
}: {
  initial?: { nome?: string; descricao?: string | null; access?: 'all' | string[] }
}) {
  const [open, setOpen] = useState(true)
  const [saved, setSaved] = useState<PresetSavePayload | null>(null)

  return (
    <div className="p-4 flex flex-col gap-3">
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>
      <PresetSaveModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={async (p) => {
          setSaved(p)
        }}
        summary={SUMMARY}
        initial={initial}
      />
      {saved && (
        <pre className="text-xs bg-neutral-50 border border-neutral-200 rounded p-2">
          {JSON.stringify(saved, null, 2)}
        </pre>
      )}
    </div>
  )
}

export const NovoPreset: Story = {
  render: () => <Demo />,
}

export const EditarExistente: Story = {
  render: () => (
    <Demo
      initial={{
        nome: 'Linha A — checagem matinal',
        descricao: 'Foco em inspeções pendentes do início do turno.',
        access: 'all',
      }}
    />
  ),
}
