import React from 'react'
import { Button } from 'react-bootstrap'

interface DeleteButtonProps {
  title: string
  onDeleteClick: () => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ title, onDeleteClick }) => {
  return (
    <Button variant="danger" onClick={() => onDeleteClick()}>
      {title}
    </Button>
  )
}

export default DeleteButton
