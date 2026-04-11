import React from 'react'
import { Button } from 'react-bootstrap'
import { GrAdd } from 'react-icons/gr'

interface AddButtonProps {
  callback: () => void
  hiddenBool?: boolean
  size?: number
}

const AddButton: React.FC<AddButtonProps> = ({ callback, hiddenBool, size }) => (
  <Button
    hidden={hiddenBool || false}
    variant="outline-primary"
    onClick={() => callback()}
  >
    <GrAdd size={size || 25} />
  </Button>
)

export default AddButton
