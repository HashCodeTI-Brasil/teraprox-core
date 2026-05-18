import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FormModal } from '@hashcodeti/ui-kit-core'
import { Button, Form } from 'react-bootstrap'

const meta: Meta<typeof FormModal> = {
  title: 'ui-kit-core/FormModal',
  component: FormModal,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

const Wrapper = (props: { title?: string }) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Abrir formulário
      </Button>
      <FormModal
        show={show}
        onClose={() => setShow(false)}
        title={props.title ?? 'Nova ordem de serviço'}
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control placeholder="Ex.: Troca de rolamento" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </FormModal>
    </>
  )
}

export const Default: Story = { render: () => <Wrapper /> }
export const TituloLongo: Story = {
  render: () => <Wrapper title="Editar ordem de manutenção #OS-2026-04-1234" />,
}
