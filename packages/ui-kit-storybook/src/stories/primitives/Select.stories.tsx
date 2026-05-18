// FIXME(barrel): este arquivo importa Select via deep import
// `@hashcodeti/ui-kit-core/src/primitives/Select`, porque o Tech Lead ainda
// precisa adicionar os exports em `packages/ui-kit-core/src/index.ts`.
// Quando o barrel for atualizado, trocar para `@hashcodeti/ui-kit-core`.
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  type SelectSize,
  type SelectVariant,
} from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof SelectTrigger> = {
  title: 'primitives/Select',
  component: SelectTrigger,
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'error'] satisfies SelectVariant[] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] satisfies SelectSize[] },
  },
  args: {
    variant: 'default',
    size: 'md',
  },
}
export default meta

type Story = StoryObj<typeof meta>

// ─── Default ───

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <Select>
        <SelectTrigger variant={args.variant} size={args.size}>
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Maçã</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cereja</SelectItem>
          <SelectItem value="date">Tâmara</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// ─── AllSizes ───

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-xs text-neutral-500 uppercase">{size}</span>
          <Select>
            <SelectTrigger size={size}>
              <SelectValue placeholder={`Size ${size}`} />
            </SelectTrigger>
            <SelectContent size={size}>
              <SelectItem value="1">Opção 1</SelectItem>
              <SelectItem value="2">Opção 2</SelectItem>
              <SelectItem value="3">Opção 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  ),
}

// ─── ErrorState ───

export const ErrorState: Story = {
  render: () => (
    <div className="w-72">
      <Select>
        <SelectTrigger variant="error">
          <SelectValue placeholder="Campo com erro" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Opção A</SelectItem>
          <SelectItem value="b">Opção B</SelectItem>
        </SelectContent>
      </Select>
      <p className="mt-1 text-xs text-error">Seleção obrigatória.</p>
    </div>
  ),
}

// ─── Disabled ───

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select desabilitado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Não acessível</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="b">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Habilitada</SelectItem>
          <SelectItem value="b" disabled>
            Opção desabilitada (selecionada)
          </SelectItem>
          <SelectItem value="c" disabled>
            Outra desabilitada
          </SelectItem>
          <SelectItem value="d">Habilitada também</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// ─── WithGroups ───

export const WithGroups: Story = {
  render: () => (
    <div className="w-72">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Escolha um ativo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frutas</SelectLabel>
            <SelectItem value="apple">Maçã</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cereja</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetais</SelectLabel>
            <SelectItem value="carrot">Cenoura</SelectItem>
            <SelectItem value="potato">Batata</SelectItem>
            <SelectItem value="onion">Cebola</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

// ─── ManyItems (scroll) ───

export const ManyItems: Story = {
  render: () => (
    <div className="w-72">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Selecione (lista longa)" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 30 }).map((_, i) => (
            <SelectItem key={i} value={`item-${i + 1}`}>
              Item {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
}

// ─── Controlled ───

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('banana')
    return (
      <div className="flex flex-col gap-2 w-72">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Maçã</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cereja</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-neutral-500">
          Valor atual: <strong>{value}</strong>
        </p>
        <button
          type="button"
          className="self-start rounded-md border border-surface-border px-2 py-1 text-xs"
          onClick={() => setValue('cherry')}
        >
          Setar Cereja externamente
        </button>
      </div>
    )
  },
}

// ─── AsFormField (label externo) ───

export const AsFormField: Story = {
  render: () => {
    const id = 'select-tipo-de-ordem'
    return (
      <div className="w-72">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Tipo de ordem
          <span aria-hidden="true" className="ml-0.5 text-error">
            *
          </span>
        </label>
        <Select>
          <SelectTrigger id={id}>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="preventiva">Preventiva</SelectItem>
            <SelectItem value="corretiva">Corretiva</SelectItem>
            <SelectItem value="preditiva">Preditiva</SelectItem>
            <SelectItem value="inspecao">Inspeção</SelectItem>
          </SelectContent>
        </Select>
        <p className="mt-1 text-xs text-neutral-500">
          Escolha o tipo de ordem de serviço.
        </p>
      </div>
    )
  },
}
