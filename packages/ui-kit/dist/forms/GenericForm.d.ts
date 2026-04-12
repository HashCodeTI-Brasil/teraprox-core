import React from 'react';
interface SelectOption {
    label: string;
    value: string | number;
}
interface FieldDefinition {
    label: string;
    key: string;
    type: 'text' | 'number' | 'select' | 'date' | 'custom-select';
    options?: SelectOption[];
    placeholder?: string;
    required?: boolean;
}
interface GenericFormProps {
    fields: FieldDefinition[];
    onSubmit: (values: Record<string, any>) => void;
    /** Optional custom select renderer. If not provided, custom-select falls back to native select. */
    renderCustomSelect?: (props: {
        label: string;
        value: any;
        options?: SelectOption[];
        onChange: (value: any) => void;
        placeholder?: string;
    }) => React.ReactNode;
}
declare const GenericForm: React.FC<GenericFormProps>;
export default GenericForm;
