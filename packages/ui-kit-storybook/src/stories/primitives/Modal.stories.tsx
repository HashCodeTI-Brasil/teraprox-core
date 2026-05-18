import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalDescription,
  Button,
  TextField,
} from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof Modal> = {
  title: 'primitives/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'xl', 'full'] },
  },
}
export default meta

type Story = StoryObj<typeof meta>

const Trigger = ({
  size,
  long = false,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  long?: boolean
}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir modal {size ?? ''}</Button>
      <Modal open={open} onOpenChange={setOpen} size={size}>
        <ModalHeader>Nova ordem de serviço</ModalHeader>
        <ModalDescription>Preencha as informações abaixo. Os campos com * são obrigatórios.</ModalDescription>
        <ModalBody>
          <div className="space-y-3">
            <TextField label="Título" required placeholder="Ex.: Troca de rolamento" />
            <TextField label="Equipamento" placeholder="BOMB-12B" />
            <TextField label="Descrição" multiline rows={4} placeholder="Descreva o problema..." />
            {long && (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <TextField key={i} label={`Campo extra ${i + 1}`} placeholder="—" />
                ))}
              </>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Salvar</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const Default: Story = { render: () => <Trigger /> }
export const Small: Story = { render: () => <Trigger size="sm" /> }
export const Large: Story = { render: () => <Trigger size="lg" /> }
export const ExtraLarge: Story = { render: () => <Trigger size="xl" /> }
export const LongContent: Story = {
  name: 'Conteúdo longo (scroll interno)',
  render: () => <Trigger size="md" long />,
}

export const ConfirmationFlow: Story = {
  name: 'Fluxo confirmação',
  render: () => {
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(false)
    return (
      <>
        <Button variant="danger" onClick={() => setStep1(true)}>Excluir OS</Button>

        <Modal open={step1} onOpenChange={setStep1} size="sm">
          <ModalHeader>Confirmar exclusão?</ModalHeader>
          <ModalBody>
            <p>Esta ação não pode ser desfeita.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setStep1(false)}>Cancelar</Button>
            <Button
              variant="danger"
              onClick={() => {
                setStep1(false)
                setStep2(true)
              }}
            >
              Sim, excluir
            </Button>
          </ModalFooter>
        </Modal>

        <Modal open={step2} onOpenChange={setStep2} size="sm">
          <ModalHeader>Ordem excluída</ModalHeader>
          <ModalBody>
            <p className="text-success">Operação concluída com sucesso.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={() => setStep2(false)}>OK</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  },
}
