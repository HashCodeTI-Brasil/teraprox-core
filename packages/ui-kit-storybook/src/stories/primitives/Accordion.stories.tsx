// FIXME(barrel): este arquivo importa Accordion via deep path
// `@hashcodeti/ui-kit-core/src/primitives/Accordion`. Quando o Tech Lead
// adicionar os exports correspondentes em `packages/ui-kit-core/src/index.ts`,
// migrar para `@hashcodeti/ui-kit-core` (barrel) e remover este FIXME.
import type { Meta, StoryObj } from '@storybook/react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionVariant,
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
} from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof Accordion> = {
  title: 'primitives/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    layout: 'padded',
  },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'bordered', 'flush'] satisfies AccordionVariant[] },
  },
  args: {
    variant: 'default',
  },
}
export default meta

type Story = StoryObj<typeof meta>

const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mx-auto w-full max-w-xl p-6">{children}</div>
)

export const Default: Story = {
  name: 'Default (single, collapsible)',
  render: (args) => (
    <Stage>
      <Accordion type="single" collapsible variant={args.variant}>
        <AccordionItem value="item-1">
          <AccordionTrigger>O que é o Teraprox?</AccordionTrigger>
          <AccordionContent>
            Plataforma de manutenção/processo composta por micro-frontends federados.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Como executo o ecossistema?</AccordionTrigger>
          <AccordionContent>
            Suba o host (teraprox-core) e os MFs federados — manifest carrega tudo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Quais APIs estão disponíveis?</AccordionTrigger>
          <AccordionContent>
            api-user, api-manutencao, api-processo, gateway e notification-api.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Stage>
  ),
}

export const MultipleType: Story = {
  name: 'Multiple (vários abertos)',
  render: () => (
    <Stage>
      <Accordion type="multiple" defaultValue={['a', 'c']}>
        <AccordionItem value="a">
          <AccordionTrigger>Item A (aberto por padrão)</AccordionTrigger>
          <AccordionContent>Conteúdo do item A.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Item B</AccordionTrigger>
          <AccordionContent>Conteúdo do item B.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="c">
          <AccordionTrigger>Item C (aberto por padrão)</AccordionTrigger>
          <AccordionContent>Conteúdo do item C.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Stage>
  ),
}

export const BorderedVariant: Story = {
  render: () => (
    <Stage>
      <Accordion type="single" collapsible variant="bordered">
        <AccordionItem value="b1">
          <AccordionTrigger>Card colapsável 1</AccordionTrigger>
          <AccordionContent>
            Cada item tem border completa + rounded — visual de cartões empilhados.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="b2">
          <AccordionTrigger>Card colapsável 2</AccordionTrigger>
          <AccordionContent>Conteúdo do segundo cartão.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b3">
          <AccordionTrigger>Card colapsável 3</AccordionTrigger>
          <AccordionContent>Conteúdo do terceiro cartão.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Stage>
  ),
}

export const FlushVariant: Story = {
  render: () => (
    <Stage>
      <Accordion type="single" collapsible variant="flush">
        <AccordionItem value="f1">
          <AccordionTrigger>Pergunta sutil 1</AccordionTrigger>
          <AccordionContent>Separador discreto, sem padding lateral.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="f2">
          <AccordionTrigger>Pergunta sutil 2</AccordionTrigger>
          <AccordionContent>Ideal para FAQs em landing pages.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="f3">
          <AccordionTrigger>Pergunta sutil 3</AccordionTrigger>
          <AccordionContent>Conteúdo terceiro item.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Stage>
  ),
}

export const DefaultValue: Story = {
  name: 'DefaultValue (uncontrolled)',
  render: () => (
    <Stage>
      <Accordion type="single" collapsible defaultValue="item-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Fechado inicialmente.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2 (aberto inicialmente)</AccordionTrigger>
          <AccordionContent>Iniciado aberto via defaultValue.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Item 3</AccordionTrigger>
          <AccordionContent>Fechado inicialmente.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Stage>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Stage>
      <Accordion type="single" collapsible>
        <AccordionItem value="i1">
          <AccordionTrigger>Habilitado</AccordionTrigger>
          <AccordionContent>Pode abrir/fechar normalmente.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="i2" disabled>
          <AccordionTrigger>Desabilitado</AccordionTrigger>
          <AccordionContent>Não acessível via teclado/mouse.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="i3">
          <AccordionTrigger>Habilitado</AccordionTrigger>
          <AccordionContent>Outro item ativo.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Stage>
  ),
}

export const FullExample: Story = {
  name: 'Full example (FAQ landing)',
  render: () => (
    <Stage>
      <h2 className="mb-4 text-lg font-semibold text-surface-foreground">
        Perguntas frequentes
      </h2>
      <Accordion type="single" collapsible variant="bordered" defaultValue="faq-1">
        <AccordionItem value="faq-1">
          <AccordionTrigger>Como funcionam os micro-frontends federados?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">
              O host <code>teraprox-core</code> carrega remotes via Webpack 5
              Module Federation. Cada MF expõe seu próprio bundle e é carregado
              sob demanda via manifest.
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>SDK compartilhada via <code>core-sdk</code>.</li>
              <li>UI primitivos via <code>ui-kit-core</code>.</li>
              <li>Cada MF tem deploy independente.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>Posso usar um Accordion dentro de outro?</AccordionTrigger>
          <AccordionContent>
            Sim — basta aninhar. O variant context propaga apenas para os
            descendentes diretos do Root mais próximo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>Como controlar o estado externamente?</AccordionTrigger>
          <AccordionContent>
            Passe <code>value</code> + <code>onValueChange</code> no Root. Para
            single, value é string; para multiple, é string[].
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Stage>
  ),
}
