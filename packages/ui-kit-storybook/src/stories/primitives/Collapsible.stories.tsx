// FIXME(barrel): este arquivo importa Collapsible do barrel
// `@hashcodeti/ui-kit-core`, mas o Tech Lead ainda precisa adicionar os
// exports correspondentes em `packages/ui-kit-core/src/index.ts`. Até lá, o
// storybook build vai falhar com "Missing specifier" — esperado e bloqueante
// apenas para esta story. Quando o barrel for atualizado, este arquivo passa
// a buildar sem nenhuma alteração.
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Button,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof Collapsible> = {
  title: 'primitives/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    layout: 'padded',
  },
}
export default meta

type Story = StoryObj<typeof meta>

const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-md p-6 space-y-2">{children}</div>
)

export const Default: Story = {
  name: 'Controlled (toggle externo)',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Stage>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="secondary">{open ? 'Fechar' : 'Abrir'} detalhes</Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 text-sm text-surface-foreground">
            <p>
              Conteúdo controlado. O estado <code>open</code> é gerenciado externamente
              via <code>useState</code>.
            </p>
            <p className="mt-2 text-neutral-500">
              Anima a altura via <code>--radix-collapsible-content-height</code>.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </Stage>
    )
  },
}

export const Uncontrolled: Story = {
  name: 'Uncontrolled (defaultOpen)',
  render: () => (
    <Stage>
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="secondary">Toggle</Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 text-sm">
          Começa aberto via <code>defaultOpen</code>. Radix gerencia o estado.
        </CollapsibleContent>
      </Collapsible>
    </Stage>
  ),
}

export const AsChildTrigger: Story = {
  name: 'asChild Trigger (preserva caller Button)',
  render: () => (
    <Stage>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="primary">Ver mais</Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 text-sm text-surface-foreground">
          O trigger projeta props no <code>&lt;Button&gt;</code> filho — sem aninhar
          <code>button &gt; button</code>.
        </CollapsibleContent>
      </Collapsible>
    </Stage>
  ),
}

export const WithCustomContent: Story = {
  name: 'Conteúdo custom (border + padding via caller)',
  render: () => (
    <Stage>
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost">Configurações avançadas</Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 border-l border-surface-border pl-4 space-y-2 text-sm">
          <div className="font-medium">Opções</div>
          <ul className="list-disc pl-5 text-neutral-700 space-y-1">
            <li>Cache agressivo</li>
            <li>Telemetria</li>
            <li>Logs verbosos</li>
          </ul>
          <p className="text-xs text-neutral-500">
            Caller controla padding/border — primitivo é minimalista.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </Stage>
  ),
}

export const MultipleSiblings: Story = {
  name: 'Múltiplos siblings independentes',
  render: () => {
    const items = [
      { id: 'a', title: 'Faturas', body: 'Lista de faturas dos últimos 12 meses.' },
      { id: 'b', title: 'Assinaturas', body: 'Plano atual, renovação e add-ons.' },
      { id: 'c', title: 'Métodos de pagamento', body: 'Cartões e Pix cadastrados.' },
    ]
    return (
      <div className="max-w-md p-6 space-y-3">
        {items.map((item) => (
          <Collapsible key={item.id}>
            <CollapsibleTrigger asChild>
              <Button variant="secondary" className="w-full justify-between">
                {item.title}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pl-3 text-sm text-neutral-700">
              {item.body}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    )
  },
}
