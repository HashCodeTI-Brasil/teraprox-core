import React from 'react';
interface AddButtonProps {
    callback: () => void;
    hiddenBool?: boolean;
    size?: number;
}
declare const AddButton: React.FC<AddButtonProps>;
export default AddButton;
