import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle, 
  Trash2, 
  Check,
  MarkAsRead,
  Filter,
  Settings,
  BellRing,
  Calendar,
  ChevronRight
} from "lucide-react";
import { 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification, 
  getUnreadCount,
  getRelativeTime,
  type Notification 
} from "@/lib/notification-service";
import { toast } from "sonner";

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    setLoading(true);
    setTimeout(() => {
      const notifs = getNotifications();
      setNotifications(notifs);
      setLoading(false);
    }, 500);
  };

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId);
    loadNotifications();
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    loadNotifications();
    toast.success(t('allNotificationsMarkedRead'));
  };

  const handleDeleteNotification = (notificationId: string) => {
    if (window.confirm(t('confirmDeleteNotification'))) {
      deleteNotification(notificationId);
      loadNotifications();
      toast.success(t('notificationDeleted'));
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    const iconProps = { size: 20 };
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} className="text-green-600" />;
      case 'warning':
        return <AlertTriangle {...iconProps} className="text-yellow-600" />;
      case 'error':
        return <XCircle {...iconProps} className="text-red-600" />;
      case 'info':
      case 'service':
      case 'update':
      default:
        return <Info {...iconProps} className="text-blue-600" />;
    }
  };

  const getNotificationBadge = (type: Notification['type']) => {
    const variants = {
      success: { className: "bg-green-100 text-green-800", text: t('success') },
      warning: { className: "bg-yellow-100 text-yellow-800", text: t('warning') },
      error: { className: "bg-red-100 text-red-800", text: t('error') },
      info: { className: "bg-blue-100 text-blue-800", text: t('info') },
      service: { className: "bg-purple-100 text-purple-800", text: t('service') },
      update: { className: "bg-indigo-100 text-indigo-800", text: t('update') }
    };

    const config = variants[type];
    return (
      <Badge className={config.className}>
        {config.text}
      </Badge>
    );
  };

  const getPriorityIndicator = (priority: Notification['priority']) => {
    if (priority === 'high') {
      return <div className="w-2 h-2 rounded-full bg-red-500"></div>;
    } else if (priority === 'medium') {
      return <div className="w-2 h-2 rounded-full bg-yellow-500"></div>;
    }
    return <div className="w-2 h-2 rounded-full bg-gray-300"></div>;
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (activeTab) {
      case 'unread':
        return !notification.read;
      case 'service':
        return notification.type === 'service' || notification.serviceId;
      case 'system':
        return notification.type === 'info' || notification.type === 'update' || notification.type === 'warning';
      default:
        return true;
    }
  });

  const unreadCount = getUnreadCount();

  if (loading) {
    return (
      <Layout title={t('notifications')} showBack>
        <div className="p-4 space-y-4">
          <div className="bg-akshaya-light rounded-lg p-4 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={t('notifications')} showBack>
      <div className="p-4">
        <div className="bg-akshaya-light rounded-lg p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-akshaya-primary flex items-center gap-2">
              <BellRing size={20} />
              {t('notifications')}
            </h2>
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-800">
                {unreadCount} {t('unread')}
              </Badge>
            )}
          </div>
          <p className="text-gray-600 text-sm">
            {t('notificationsDescription')}
          </p>
        </div>

        {unreadCount > 0 && (
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={handleMarkAllAsRead}
              className="w-full"
            >
              <Check size={16} className="mr-2" />
              {t('markAllAsRead')}
            </Button>
          </div>
        )}

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">{t('all')}</TabsTrigger>
            <TabsTrigger value="unread">
              {t('unread')}
              {unreadCount > 0 && (
                <Badge className="ml-1 bg-red-500 text-white text-xs px-1 py-0">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="service">{t('services')}</TabsTrigger>
            <TabsTrigger value="system">{t('system')}</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Bell size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  {activeTab === 'unread' ? t('noUnreadNotifications') : t('noNotifications')}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {activeTab === 'unread' 
                    ? t('noUnreadNotificationsDescription')
                    : t('noNotificationsDescription')
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-pointer transition-all hover:shadow-md ${
                      !notification.read ? 'border-l-4 border-l-akshaya-primary bg-blue-50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex items-center gap-2 mt-1">
                          {getPriorityIndicator(notification.priority)}
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            {getNotificationBadge(notification.type)}
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-akshaya-primary"></div>
                            )}
                          </div>
                          
                          <p className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-500'} mb-2`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Calendar size={12} />
                              <span>{getRelativeTime(notification.timestamp)}</span>
                            </div>
                            
                            {notification.link && (
                              <ChevronRight size={16} className="text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-2">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(notification.id);
                            }}
                            className="h-8 w-8"
                          >
                            <Check size={14} />
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotification(notification.id);
                          }}
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="bg-white rounded-lg p-4 shadow-sm mt-6">
          <h3 className="text-md font-medium text-gray-800 mb-2 flex items-center gap-2">
            <Settings size={16} />
            {t('notificationSettings')}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {t('notificationSettingsDescription')}
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => toast.info("Notification settings coming soon")}
          >
            {t('manageNotifications')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;