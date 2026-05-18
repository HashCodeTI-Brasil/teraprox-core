import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState, Button } from '@hashcodeti/ui-kit-core'
import { FaInbox, FaSearch, FaFolderOpen, FaPlus } from 'react-icons/fa'

const meta: Meta<typeof EmptyState> = {
  title: 'primitives/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'compact', 'card'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Nenhum item encontrado',
    description: 'Tente ajustar os filtros ou criar um novo registro.',
  },
}

export const WithIcon: Story = {
  args: {
    icon: <FaInbox />,
    title: 'Caixa de entrada vazia',
    description: 'Quando você receber novas mensagens, elas aparecerão aqui.',
  },
}

export const WithIconAndAction: Story = {
  args: {
    icon: <FaInbox />,
    title: 'Nenhuma OS',
    description: 'Crie a primeira ordem de serviço para começar.',
    action: (
      <Button variant="primary">
        <FaPlus className="mr-2 inline" />
        Criar OS
      </Button>
    ),
  },
}

export const CompactVariant: Story = {
  args: {
    variant: 'compact',
    size: 'sm',
    icon: <FaSearch />,
    title: 'Sem resultados',
    description: 'Refine sua busca.',
  },
}

export const CardVariant: Story = {
  args: {
    variant: 'card',
    icon: <FaFolderOpen />,
    title: 'Pasta vazia',
    description: 'Adicione arquivos para visualizá-los aqui.',
    action: <Button variant="secondary">Adicionar arquivo</Button>,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[640px]">
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s} className="border border-neutral-200 rounded-md">
          <div className="px-3 py-1.5 bg-neutral-50 text-xs font-semibold uppercase text-neutral-500 border-b border-neutral-200">
            size={s}
          </div>
          <EmptyState
            size={s}
            icon={<FaInbox />}
            title="Nenhuma OS"
            description="Crie a primeira ordem de serviço para começar."
            action={<Button variant="primary" size={s === 'lg' ? 'md' : 'sm'}>Criar OS</Button>}
          />
        </div>
      ))}
    </div>
  ),
}

export const NoIconNoAction: Story = {
  args: {
    title: 'Nada por aqui ainda',
  },
}

export const FullExample: Story = {
  render: () => (
    <div className="w-[560px]">
      <EmptyState
        variant="card"
        size="lg"
        icon={<FaInbox />}
        title="Nenhuma ordem de serviço"
        description="Você ainda não criou nenhuma OS para esta unidade. Crie a primeira para começar a registrar manutenções."
        action={
          <div className="flex gap-2">
            <Button variant="ghost">Importar planilha</Button>
            <Button variant="primary">
              <FaPlus className="mr-2 inline" />
              Criar primeira OS
            </Button>
          </div>
        }
      />
    </div>
  ),
}
