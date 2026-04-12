import React from 'react';
interface DeleteButtonProps {
    title: string;
    onDeleteClick: () => void;
}
declare const DeleteButton: React.FC<DeleteButtonProps>;
export default DeleteButton;
