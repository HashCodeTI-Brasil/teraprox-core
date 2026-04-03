export interface Notification {
  id?: string | number
  _id?: string | number
  deliveryId?: string | number
  title?: string
  message?: string
  type?: string
  createdAt?: string
  [key: string]: any
}

export interface NotificationState {
  unreadNotifications: Notification[]
  archivedNotifications: { read: Notification[]; dismissed: Notification[] }
  readNotificationIds: (string | number)[]
  unreadCount: number
  initialLoadComplete: boolean
}
