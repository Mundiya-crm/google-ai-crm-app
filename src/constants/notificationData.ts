
export type NotificationCategory = 'ETA' | 'HP_INSTALLMENT_DUE' | 'PAYMENT_DUE' | 'RECURRING_EXPENSE_DUE' | 'GENERAL';

export interface Notification {
  id: string; // Unique identifier (e.g., `eta-${vehicleId}` or `hp-${vehicleId}-${installmentNum}`)
  message: string;
  category: NotificationCategory;
  dueDate: string; // The date the event is due (e.g., ETA date or payment due date)
  createdAt: string; // When the notification was created
  isRead: boolean;
  entityId: number | string; // The main entity ID (e.g., vehicle ID or recurring expense ID)
  subEntityId?: number; // Optional ID for sub-entities (e.g., installment number)
}

export const initialNotifications: Notification[] = [];
