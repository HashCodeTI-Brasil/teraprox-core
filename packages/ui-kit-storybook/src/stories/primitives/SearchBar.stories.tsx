import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { SearchBar } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof SearchBar> = {
  title: 'primitives/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'radio', options: ['default'] },
    loading: { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    debounceMs: { control: 'number' },
    placeholder: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof meta>

// Wrapper controlado padrão p/ stories (SearchBar é UI puro — caller controla state)
const Controlled = (
  props: Omit<React.ComponentProps<typeof SearchBar>, 'value' | 'onChange'> & {
    initial?: string
  },
) => {
  const { initial = '', ...rest } = props
  const [q, setQ] = useState(initial)
  return (
    <div className="w-[420px]">
      <SearchBar
        {...rest}
        value={q}
        onChange={(v) => {
          setQ(v)
          action('onChange')(v)
        }}
      />
      <p className="mt-2 text-xs text-neutral-500">
        Valor controlado: <code>{JSON.stringify(q)}</code>
      </p>
    </div>
  )
}

export const Default: Story = {
  render: () => <Controlled />,
}

export const WithValue: Story = {
  render: () => <Controlled initial="Bomba centrífuga" />,
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[420px]">
      <Controlled size="sm" placeholder="Buscar (sm)..." />
      <Controlled size="md" placeholder="Buscar (md)..." />
      <Controlled size="lg" placeholder="Buscar (lg)..." />
    </div>
  ),
}

export const Loading: Story = {
  render: () => <Controlled initial="motor 220v" loading />,
}

export const NotClearable: Story = {
  render: () => <Controlled initial="texto fixo" clearable={false} />,
}

export const WithCustomIcon: Story = {
  render: () => (
    <Controlled
      placeholder="Filtrar por código..."
      icon={
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path d="M2 4h12M4 8h8M6 12h4" />
        </svg>
      }
    />
  ),
}

export const DebouncedExample: Story = {
  render: () => {
    const [emitted, setEmitted] = useState('')
    return (
      <div className="w-[420px]">
        <SearchBar
          value={emitted}
          debounceMs={400}
          placeholder="Digite e observe o delay..."
          onChange={(v) => {
            setEmitted(v)
            action('onChange (debounced 400ms)')(v)
          }}
        />
        <p className="mt-2 text-xs text-neutral-500">
          Valor emitido (debounced 400ms):{' '}
          <code>{JSON.stringify(emitted)}</code>
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          Inspecione o painel <strong>Actions</strong> para ver as chamadas reais.
        </p>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => <Controlled initial="busca desabilitada" disabled />,
}
