import React from 'react';

/**
 * FormModal — base reutilizável para modais de formulário com ação primária.
 *
 * Slots: { title, icon, body (children), primaryAction, secondaryAction,
 * footerExtra, isValid, isLoading }. Substitui o padrão quebrado de
 * SwitchOnClick + GenericContextForm vazio + ResponsiveContainer sem footer.
 *
 * Wave 1 da sprint 2026-04-21-ui-kit-domain-split-wave0.
 */
interface FormModalPrimaryAction {
    label: string;
    onClick: () => void | Promise<void>;
    icon?: React.ReactNode;
    variant?: string;
}
interface FormModalSecondaryAction {
    label: string;
    onClick: () => void;
    variant?: string;
}
interface FormModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    icon?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children: React.ReactNode;
    primaryAction: FormModalPrimaryAction;
    secondaryAction?: FormModalSecondaryAction;
    isValid?: boolean;
    isLoading?: boolean;
    closeOnBackdrop?: boolean;
    scrollable?: boolean;
    footerExtra?: React.ReactNode;
}
declare const FormModal: React.FC<FormModalProps>;

export { FormModal, type FormModalProps };
