import React from "react";
export interface MailSenderProps {
    /** Conteúdo HTML a ser enviado no corpo do e-mail */
    htmlContent: string;
    /** Nome da empresa para o assunto/corpo padrão */
    companyName: string;
    /** Callback para buscar a lista de e-mails da companhia */
    onFetchEmails: () => Promise<Array<{
        email: string;
    }>>;
    /** Callback para enviar o e-mail consolidado */
    onSendEmail: (emailData: {
        to: string;
        subject: string;
        text: string;
        html: string;
    }) => Promise<void>;
    /** Flag para ocultar o componente */
    hide?: boolean;
    /** Render prop opcional para o botão de ativação customizado */
    renderTrigger?: (props: {
        onClick: () => void;
        loading: boolean;
    }) => React.ReactNode;
}
/**
 * Componente para seleção de destinatários e envio de e-mails.
 * Refatorado para ser agnóstico a implementações de hooks/endpoints específicos das apps.
 */
export declare const MailSender: React.FC<MailSenderProps>;
