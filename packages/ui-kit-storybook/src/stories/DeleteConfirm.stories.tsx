import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DeleteConfirm } from '@hashcodeti/ui-kit-core'
import { Button } from 'react-bootstrap'

const meta: Meta<typeof DeleteConfirm> = {
  title: 'ui-kit-core/DeleteConfirm',
  component: DeleteConfirm,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

const Wrapper = (props: { title?: string }) => {
  const [show, setShow] = useState(false)
  const [confirmed, setConfirmed] = useState<string | null>(null)
  return (
    <div className="space-y-3">
      <Button variant="danger" onClick={() => setShow(true)}>
        Abrir confirmação
      </Button>
      <DeleteConfirm
        show={show}
        onHide={setShow}
        onConfirm={(details) => {
          setConfirmed(details || '(sem detalhes)')
          setShow(false)
        }}
        title={props.title}
      />
      {confirmed && (
        <div className="text-sm text-success">Confirmado: {confirmed}</div>
      )}
    </div>
  )
}

export const Default: Story = { render: () => <Wrapper /> }
export const ComTitulo: Story = { render: () => <Wrapper title="Excluir ordem de serviço?" /> }
