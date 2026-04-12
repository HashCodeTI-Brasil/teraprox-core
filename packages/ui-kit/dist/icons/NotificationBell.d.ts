import React from "react";
import { Notification } from "./NotificationItem";
export interface NotificationBellProps {
    /** Lista de notificações a serem exibidas no dropdown */
    notifications: Notification[];
    /** Callback quando uma notificação é lida */
    onItemRead: (n: Notification) => void;
    /** Callback quando uma notificação é descartada */
    onItemDismiss: (n: Notification) => void;
    /** Callback para 'Marcar todas como lidas' */
    onMarkAllRead?: () => void;
    /** Tamanho do ícone do sino (padrão: 20) */
    size?: number;
    /** Classe CSS para o container */
    className?: string;
}
/**
 * Sino de notificações com contador de mensagens não lidas e dropdown de itens.
 */
export declare const NotificationBell: React.FC<NotificationBellProps>;
export default NotificationBell;
