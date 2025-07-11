export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'update' | 'service';
  timestamp: string;
  read: boolean;
  link?: string;
  serviceId?: string;
  priority: 'low' | 'medium' | 'high';
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "notif_1",
    title: "Income Certificate Approved",
    message: "Your income certificate application (Ref: IC2025001234) has been approved and is ready for download.",
    type: "success",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: false,
    link: "/processed-documents",
    serviceId: "income-certificate",
    priority: "high"
  },
  {
    id: "notif_2",
    title: "Document Verification Required",
    message: "Additional documents are required for your Ration Card application. Please upload the missing documents to proceed.",
    type: "warning",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    read: false,
    link: "/service/ration-card",
    serviceId: "ration-card",
    priority: "high"
  },
  {
    id: "notif_3",
    title: "Payment Successful",
    message: "Your payment of ₹150 for Land Records service has been processed successfully. Transaction ID: TXN789456",
    type: "success",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: true,
    link: "/payment/quick",
    priority: "medium"
  },
  {
    id: "notif_4",
    title: "New Service Available",
    message: "Digital Aadhaar Update service is now available through Akshaya E-Services. Apply online and save time.",
    type: "info",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    read: true,
    priority: "low"
  },
  {
    id: "notif_5",
    title: "System Maintenance",
    message: "Scheduled maintenance on Jan 20, 2025 from 2:00 AM to 4:00 AM. Services may be temporarily unavailable.",
    type: "warning",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    read: true,
    priority: "medium"
  },
  {
    id: "notif_6",
    title: "Birth Certificate Ready",
    message: "Your birth certificate is ready for collection at the Akshaya center. Please bring your reference number BC2025005678.",
    type: "info",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    read: true,
    link: "/processed-documents",
    serviceId: "birth-certificate",
    priority: "high"
  },
  {
    id: "notif_7",
    title: "Application Rejected",
    message: "Your Residence Certificate application has been rejected due to insufficient documentation. Please reapply with proper address proof.",
    type: "error",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    read: true,
    link: "/service/residence-certificate",
    serviceId: "residence-certificate",
    priority: "high"
  }
];

// Local storage key
const NOTIFICATIONS_STORAGE_KEY = 'akshaya_notifications';

// Initialize notifications in localStorage if not present
const initializeNotifications = (): void => {
  const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(mockNotifications));
  }
};

// Get all notifications
export const getNotifications = (): Notification[] => {
  initializeNotifications();
  const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Get unread notifications count
export const getUnreadCount = (): number => {
  const notifications = getNotifications();
  return notifications.filter(notif => !notif.read).length;
};

// Get notifications by type
export const getNotificationsByType = (type: Notification['type']): Notification[] => {
  const notifications = getNotifications();
  return notifications.filter(notif => notif.type === type);
};

// Get notifications by priority
export const getNotificationsByPriority = (priority: Notification['priority']): Notification[] => {
  const notifications = getNotifications();
  return notifications.filter(notif => notif.priority === priority);
};

// Mark notification as read
export const markAsRead = (notificationId: string): void => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.map(notif =>
    notif.id === notificationId ? { ...notif, read: true } : notif
  );
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
};

// Mark all notifications as read
export const markAllAsRead = (): void => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
};

// Delete notification
export const deleteNotification = (notificationId: string): void => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.filter(notif => notif.id !== notificationId);
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
};

// Add new notification (useful for testing or simulating new alerts)
export const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>): void => {
  const notifications = getNotifications();
  const newNotification: Notification = {
    ...notification,
    id: `notif_${Date.now()}`,
    timestamp: new Date().toISOString()
  };
  const updatedNotifications = [newNotification, ...notifications];
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
};

// Clear all notifications
export const clearAllNotifications = (): void => {
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify([]));
};

// Get recent notifications (last 7 days)
export const getRecentNotifications = (): Notification[] => {
  const notifications = getNotifications();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return notifications.filter(notif => new Date(notif.timestamp) > sevenDaysAgo);
};

// Format relative time
export const getRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const notifTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - notifTime.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    return notifTime.toLocaleDateString();
  }
};