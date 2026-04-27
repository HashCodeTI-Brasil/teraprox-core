import React from 'react'


interface DeleteButtonProps {
  title: string
  onDeleteClick: () => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ title, onDeleteClick }) => {
  return (
    <button className="btn btn-danger" onClick={() => onDeleteClick()}>
      {title}
    </button>
  )
}

export default DeleteButton
