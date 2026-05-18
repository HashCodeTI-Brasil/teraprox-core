import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardBody, CardFooter, Button } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof Card> = {
  title: 'primitives/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['elevated', 'outlined', 'flat', 'interactive'] },
    padding: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { padding: 'md', variant: 'elevated' },
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <p>Conteúdo simples do card.</p>
    </Card>
  ),
}

export const WithSlots: Story = {
  render: () => (
    <Card variant="outlined" className="max-w-md">
      <CardHeader>OS #2026-04-1234</CardHeader>
      <CardBody>
        <p className="text-sm text-neutral-700">
          Troca de rolamento na Bomba 12B. Atribuída ao mantenedor João S.
        </p>
      </CardBody>
      <CardFooter>
        <Button variant="secondary" size="sm">Cancelar</Button>
        <Button variant="primary" size="sm">Aprovar</Button>
      </CardFooter>
    </Card>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-3xl">
      {(['elevated', 'outlined', 'flat', 'interactive'] as const).map((v) => (
        <Card key={v} variant={v} padding="md">
          <p className="font-semibold capitalize">{v}</p>
          <p className="text-sm text-neutral-500 mt-1">
            Variant <code>{v}</code> aplicada.
          </p>
        </Card>
      ))}
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <Card
      variant="interactive"
      padding="md"
      className="max-w-sm"
      onClick={() => alert('Card clicado!')}
    >
      <p className="font-semibold">Clique no card</p>
      <p className="text-sm text-neutral-500 mt-1">Variant interactive — hover/cursor.</p>
    </Card>
  ),
}

export const CompoundShortcut: Story = {
  name: 'Compound atalho (Card.Header)',
  render: () => (
    <Card variant="outlined" className="max-w-md">
      <Card.Header>Atalho Card.Header</Card.Header>
      <Card.Body>Funciona igual ao slot importado separado.</Card.Body>
      <Card.Footer>
        <Button size="sm">OK</Button>
      </Card.Footer>
    </Card>
  ),
}
