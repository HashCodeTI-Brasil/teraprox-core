import React from "react";
import "../styles/NotificationItem.css";
export interface Notification {
    id: string | number;
    context?: string;
    contextId?: string | number;
    content?: string;
    status: 'read' | 'unread';
    createdAt: string | number | Date;
    readAt?: string | number | Date | null;
}
export interface NotificationItemProps {
    /** Objeto da notificação */
    notification: Notification;
    /** Callback ao clicar para ler/expandir */
    onRead: (notification: Notification) => void;
    /** Callback para descartar/deletar a notificação */
    onDismiss: (notification: Notification) => void;
    /** Tradução customizada para campos vazios */
    emptyContentLabel?: string;
}
/**
 * Item individual de notificação com suporte a preview, modal de detalhes e ações rápidas.
 */
export declare const NotificationItem: React.FC<NotificationItemProps>;
export default NotificationItem;
