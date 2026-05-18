import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  TextField,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupButton,
  type InputGroupSize,
} from '@hashcodeti/ui-kit-core'
import { FaSearch, FaUser, FaEnvelope, FaDollarSign } from 'react-icons/fa'

const meta: Meta<typeof InputGroup> = {
  title: 'primitives/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: 'md' },
  render: (args) => (
    <div className="max-w-sm">
      <InputGroup {...args}>
        <InputGroupAddon>
          <FaSearch />
        </InputGroupAddon>
        <TextField placeholder="Buscar..." />
      </InputGroup>
    </div>
  ),
}

export const WithLeftIcon: Story = {
  render: () => (
    <div className="max-w-sm">
      <InputGroup>
        <InputGroupAddon>
          <FaUser />
        </InputGroupAddon>
        <TextField placeholder="Usuário" />
      </InputGroup>
    </div>
  ),
}

export const WithRightButton: Story = {
  render: () => {
    const [v, setV] = useState('')
    return (
      <div className="max-w-md">
        <InputGroup>
          <TextField
            placeholder="Cupom de desconto"
            value={v}
            onChange={(e) => setV(e.target.value)}
          />
          <InputGroupButton>
            <Button variant="primary" onClick={() => alert(`Aplicar: ${v}`)}>
              Aplicar
            </Button>
          </InputGroupButton>
        </InputGroup>
      </div>
    )
  },
}

export const WithText: Story = {
  render: () => (
    <div className="max-w-md space-y-3">
      <InputGroup>
        <InputGroupText>R$</InputGroupText>
        <TextField type="number" placeholder="0,00" />
        <InputGroupText>,00</InputGroupText>
      </InputGroup>

      <InputGroup>
        <InputGroupText>https://</InputGroupText>
        <TextField defaultValue="meu-site" />
        <InputGroupText>.teraprox.com</InputGroupText>
      </InputGroup>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      {(['sm', 'md', 'lg'] as InputGroupSize[]).map((size) => (
        <div key={size}>
          <p className="mb-1 text-xs font-medium text-neutral-500 uppercase">
            size: {size}
          </p>
          <InputGroup size={size}>
            <InputGroupAddon>
              <FaSearch />
            </InputGroupAddon>
            <TextField placeholder={`Tamanho ${size}`} />
            <InputGroupButton>
              <Button variant="secondary" size={size}>
                Ir
              </Button>
            </InputGroupButton>
          </InputGroup>
        </div>
      ))}
    </div>
  ),
}

export const FullExample: Story = {
  name: 'Full example (icon + text + input + button)',
  render: () => {
    const [email, setEmail] = useState('')
    return (
      <div className="max-w-lg space-y-2">
        <label className="text-sm font-medium text-neutral-700">
          Convidar usuário
        </label>
        <InputGroup>
          <InputGroupAddon>
            <FaEnvelope />
          </InputGroupAddon>
          <InputGroupText>email:</InputGroupText>
          <TextField
            type="email"
            placeholder="usuario@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroupButton>
            <Button variant="primary" onClick={() => alert(`Convidar ${email}`)}>
              Convidar
            </Button>
          </InputGroupButton>
        </InputGroup>
        <p className="text-xs text-neutral-500">
          Composição completa: addon + text + input + button.
        </p>
      </div>
    )
  },
}

export const CompoundShortcut: Story = {
  name: 'Compound atalho (InputGroup.Text)',
  render: () => (
    <div className="max-w-sm">
      <InputGroup>
        <InputGroup.Addon>
          <FaDollarSign />
        </InputGroup.Addon>
        <InputGroup.Text>USD</InputGroup.Text>
        <TextField type="number" placeholder="0.00" />
        <InputGroup.Button>
          <Button variant="secondary">Converter</Button>
        </InputGroup.Button>
      </InputGroup>
    </div>
  ),
}
