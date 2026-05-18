import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from '@hashcodeti/ui-kit-core'
import { FaRocket } from 'react-icons/fa'

const meta: Meta<typeof Alert> = {
  title: 'primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'neutral'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    dismissible: { control: 'boolean' },
    title: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof meta>

const TONES = ['info', 'success', 'warning', 'error', 'neutral'] as const

export const Default: Story = {
  args: {
    children: 'Sua sessão foi renovada com sucesso.',
  },
}

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {TONES.map((t) => (
        <Alert key={t} tone={t} title={t.charAt(0).toUpperCase() + t.slice(1)}>
          Mensagem de exemplo para o tom <code>{t}</code>.
        </Alert>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert size="sm" tone="info">Small — alerta compacto.</Alert>
      <Alert size="md" tone="info">Medium — alerta padrão.</Alert>
      <Alert size="lg" tone="info">Large — alerta com mais respiro.</Alert>
    </div>
  ),
}

export const Dismissible: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert tone="success" dismissible onDismiss={() => alert('dismissed success')}>
        Pedido criado com sucesso!
      </Alert>
      <Alert
        tone="warning"
        title="Atenção"
        dismissible
        onDismiss={() => alert('dismissed warning')}
      >
        Existem alterações não salvas.
      </Alert>
      <Alert
        tone="error"
        size="lg"
        title="Erro ao salvar"
        dismissible
        onDismiss={() => alert('dismissed error')}
      >
        Verifique sua conexão e tente novamente.
      </Alert>
    </div>
  ),
}

export const WithTitle: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert tone="info" title="Nova versão disponível">
        Atualize para acessar os recursos mais recentes.
      </Alert>
      <Alert tone="success" title="Tudo certo!">
        Suas configurações foram salvas.
      </Alert>
    </div>
  ),
}

export const WithCustomIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert tone="info" icon={<FaRocket />} title="Lançamento">
        Versão 2.0 disponível para todos os usuários.
      </Alert>
      <Alert tone="neutral" icon={false}>
        Sem ícone — passei <code>icon={'{false}'}</code>.
      </Alert>
    </div>
  ),
}

export const FullExample: Story = {
  render: () => (
    <div className="max-w-xl flex flex-col gap-3">
      <Alert
        tone="warning"
        size="lg"
        title="Confirmação necessária"
        dismissible
        onDismiss={() => alert('dismissed')}
      >
        Esta operação <strong>não pode ser desfeita</strong>. Revise os dados antes
        de prosseguir e clique em confirmar para finalizar.
      </Alert>
    </div>
  ),
}
