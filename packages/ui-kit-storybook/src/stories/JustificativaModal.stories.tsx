import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { JustificativaModal, type Justificativa } from '@hashcodeti/ui-kit-sgp'
import { Button } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof JustificativaModal> = {
  title: 'sgp/JustificativaModal',
  component: JustificativaModal,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

const SAMPLE_OTHERS: Justificativa[] = [
  {
    id: 1,
    descricao: 'Equipamento parado por falta de matéria-prima.',
    user: { userId: 99, firstName: 'João', userName: 'João Silva' },
    createdAt: '2026-05-14T10:32:00.000Z',
  },
  {
    id: 2,
    descricao: 'Leitura ajustada após calibração do sensor.',
    user: { userId: 12, firstName: 'Maria' },
    createdAt: '2026-05-15T08:05:00.000Z',
  },
]

const SAMPLE_MIXED: Justificativa[] = [
  ...SAMPLE_OTHERS,
  {
    id: 3,
    descricao: 'Conferi com o operador — valor confere.',
    user: { userId: 7, firstName: 'Eu' },
    createdAt: '2026-05-15T14:20:00.000Z',
  },
  {
    id: 4,
    descricao: 'Mensagem removida por engano.',
    user: { userId: 7, firstName: 'Eu' },
    createdAt: '2026-05-15T15:00:00.000Z',
    removed: true,
  },
]

function Demo({ initial }: { initial: Justificativa[] }) {
  const [open, setOpen] = useState(true)
  const [list, setList] = useState(initial)

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Abrir justificativas</Button>
      <JustificativaModal
        show={open}
        onClose={() => setOpen(false)}
        justificativas={list}
        currentUserId={7}
        currentUserName="Eu"
        onUpdateJustificativas={async (next) => setList(next)}
      />
    </div>
  )
}

export const Empty: Story = {
  render: () => <Demo initial={[]} />,
}

export const OnlyOthers: Story = {
  render: () => <Demo initial={SAMPLE_OTHERS} />,
}

export const MixedWithRemoved: Story = {
  render: () => <Demo initial={SAMPLE_MIXED} />,
}
