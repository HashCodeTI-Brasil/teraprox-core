// FIXME(barrel): este arquivo importa Tabs* do barrel `@hashcodeti/ui-kit-core`,
// mas o Tech Lead ainda precisa adicionar os exports correspondentes em
// `packages/ui-kit-core/src/index.ts`. Até lá, usamos deep import temporário
// direto do source para não bloquear o desenvolvimento da story. Quando barrel
// for atualizado, trocar o import abaixo pelo barrel oficial.
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
// FIXME(barrel): substituir por `from '@hashcodeti/ui-kit-core'` após exports.
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsVariant,
  type TabsSize,
} from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof Tabs> = {
  title: 'primitives/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    layout: 'padded',
  },
}
export default meta

type Story = StoryObj<typeof meta>

const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-md border border-surface-border p-4 text-sm text-surface-foreground">
    {children}
  </div>
)

// ─── Default (underline) ───

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="overview">Visão geral</TabsTrigger>
        <TabsTrigger value="settings">Configurações</TabsTrigger>
        <TabsTrigger value="activity">Atividade</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Panel>Conteúdo da aba Visão geral.</Panel>
      </TabsContent>
      <TabsContent value="settings">
        <Panel>Conteúdo da aba Configurações.</Panel>
      </TabsContent>
      <TabsContent value="activity">
        <Panel>Conteúdo da aba Atividade.</Panel>
      </TabsContent>
    </Tabs>
  ),
}

// ─── Pills variant ───

export const PillsVariant: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-[480px]">
      <TabsList variant="pills">
        <TabsTrigger value="all">Todos</TabsTrigger>
        <TabsTrigger value="open">Abertos</TabsTrigger>
        <TabsTrigger value="closed">Fechados</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <Panel>Listando todos.</Panel>
      </TabsContent>
      <TabsContent value="open">
        <Panel>Listando abertos.</Panel>
      </TabsContent>
      <TabsContent value="closed">
        <Panel>Listando fechados.</Panel>
      </TabsContent>
    </Tabs>
  ),
}

// ─── Solid variant ───

export const SolidVariant: Story = {
  render: () => (
    <Tabs defaultValue="day" className="w-[480px]">
      <TabsList variant="solid">
        <TabsTrigger value="day">Dia</TabsTrigger>
        <TabsTrigger value="week">Semana</TabsTrigger>
        <TabsTrigger value="month">Mês</TabsTrigger>
        <TabsTrigger value="year">Ano</TabsTrigger>
      </TabsList>
      <TabsContent value="day">
        <Panel>Métricas do dia.</Panel>
      </TabsContent>
      <TabsContent value="week">
        <Panel>Métricas da semana.</Panel>
      </TabsContent>
      <TabsContent value="month">
        <Panel>Métricas do mês.</Panel>
      </TabsContent>
      <TabsContent value="year">
        <Panel>Métricas do ano.</Panel>
      </TabsContent>
    </Tabs>
  ),
}

// ─── All sizes ───

export const AllSizes: Story = {
  render: () => {
    const sizes: TabsSize[] = ['sm', 'md', 'lg']
    const variants: TabsVariant[] = ['default', 'pills', 'solid']
    return (
      <div className="flex flex-col gap-8 w-[520px]">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wide text-neutral-500">
              variant: {variant}
            </span>
            {sizes.map((size) => (
              <Tabs key={size} defaultValue="a">
                <TabsList variant={variant} size={size}>
                  <TabsTrigger value="a">Aba A ({size})</TabsTrigger>
                  <TabsTrigger value="b">Aba B</TabsTrigger>
                  <TabsTrigger value="c">Aba C</TabsTrigger>
                </TabsList>
              </Tabs>
            ))}
          </div>
        ))}
      </div>
    )
  },
}

// ─── Vertical orientation ───

export const VerticalOrientation: Story = {
  render: () => (
    <Tabs defaultValue="profile" orientation="vertical" className="flex gap-4 w-[560px]">
      <TabsList variant="default" className="min-w-[160px]">
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="account">Conta</TabsTrigger>
        <TabsTrigger value="security">Segurança</TabsTrigger>
        <TabsTrigger value="billing">Faturamento</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="profile">
          <Panel>Dados de perfil.</Panel>
        </TabsContent>
        <TabsContent value="account">
          <Panel>Dados de conta.</Panel>
        </TabsContent>
        <TabsContent value="security">
          <Panel>Senha, MFA, sessões.</Panel>
        </TabsContent>
        <TabsContent value="billing">
          <Panel>Plano e faturas.</Panel>
        </TabsContent>
      </div>
    </Tabs>
  ),
}

// ─── Disabled tab ───

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="enabled" className="w-[480px]">
      <TabsList variant="pills">
        <TabsTrigger value="enabled">Habilitada</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Desabilitada
        </TabsTrigger>
        <TabsTrigger value="another">Outra</TabsTrigger>
      </TabsList>
      <TabsContent value="enabled">
        <Panel>Você consegue chegar aqui.</Panel>
      </TabsContent>
      <TabsContent value="disabled">
        <Panel>Inacessível.</Panel>
      </TabsContent>
      <TabsContent value="another">
        <Panel>Conteúdo da terceira aba.</Panel>
      </TabsContent>
    </Tabs>
  ),
}

// ─── Many tabs (overflow horizontal scroll) ───

export const ManyTabs: Story = {
  render: () => {
    const labels = [
      'Resumo',
      'Tarefas',
      'Recursos',
      'Manutenção',
      'Inspeções',
      'Anexos',
      'Histórico',
      'Comentários',
      'Notificações',
      'Auditoria',
      'Configurações',
    ]
    return (
      <div className="w-[520px]">
        <Tabs defaultValue={labels[0]}>
          <div className="overflow-x-auto">
            <TabsList variant="default" className="min-w-max">
              {labels.map((l) => (
                <TabsTrigger key={l} value={l}>
                  {l}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {labels.map((l) => (
            <TabsContent key={l} value={l}>
              <Panel>Painel: {l}</Panel>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    )
  },
}

// ─── Controlled ───

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('one')
    return (
      <div className="flex flex-col gap-3 w-[480px]">
        <div className="text-xs text-neutral-500">
          Aba ativa (estado externo): <strong>{value}</strong>
        </div>
        <Tabs value={value} onValueChange={setValue}>
          <TabsList variant="solid">
            <TabsTrigger value="one">Um</TabsTrigger>
            <TabsTrigger value="two">Dois</TabsTrigger>
            <TabsTrigger value="three">Três</TabsTrigger>
          </TabsList>
          <TabsContent value="one">
            <Panel>Painel Um.</Panel>
          </TabsContent>
          <TabsContent value="two">
            <Panel>Painel Dois.</Panel>
          </TabsContent>
          <TabsContent value="three">
            <Panel>Painel Três.</Panel>
          </TabsContent>
        </Tabs>
        <div className="flex gap-2">
          {['one', 'two', 'three'].map((v) => (
            <button
              key={v}
              className="text-xs underline"
              onClick={() => setValue(v)}
            >
              ir para {v}
            </button>
          ))}
        </div>
      </div>
    )
  },
}
