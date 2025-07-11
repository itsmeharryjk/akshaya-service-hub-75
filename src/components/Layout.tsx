import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Home, FileText, CreditCard, User, ChevronLeft, Bell, FileCheck } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showNav?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  className?: string;
  headerRightContent?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  showNav = true,
  showBack = false,
  onBack,
  className,
  headerRightContent
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  // Mock notifications for demonstration
  const notifications = [
    { id: 1, title: t('incomeCertificate'), message: "Your application is pending verification.", time: "2h ago" },
    { id: 2, title: "Govt. Alert", message: "New Aadhaar verification deadline extended.", time: "1d ago" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-akshaya-primary text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {showBack && (
              <button 
                onClick={handleBackClick}
                className="mr-2"
                aria-label="Go back"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="text-lg font-medium">{title || "Akshaya E-Services"}</h1>
          </div>
          
          {/* Conditional header right content */}
          {headerRightContent ? (
            <div className="flex items-center">
              {headerRightContent}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button 
                  className="p-1 relative"
                  onClick={toggleNotifications}
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </button>
                
                {/* Notification dropdown */}
                {showNotifications && (
                  <div ref={notificationRef} className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="py-2">
                      <div className="bg-akshaya-light p-3 rounded-lg mx-3 my-2">
                        <p className="text-sm text-gray-700">{t('stayUpdated')}</p>
                      </div>
                      {notifications.length > 0 ? (
                        <>
                          {notifications.map((notification) => (
                            <div key={notification.id} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                <p className="text-xs text-gray-500">{notification.time}</p>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">{t('noNotifications')}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button 
                className="p-1"
                onClick={handleUserIconClick}
                aria-label="User account"
              >
                <User size={20} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className={cn("flex-1", className)}>
        <div className="page-container">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="mobile-bottom-nav">
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            <Home size={20} />
            <span>{t('home')}</span>
          </Link>
          <Link to="/documents" className={`nav-item ${isActive('/documents') ? 'active' : ''}`}>
            <FileText size={20} />
            <span>{t('documents')}</span>
          </Link>
          <Link to="/processed-documents" className={`nav-item ${isActive('/processed-documents') ? 'active' : ''}`}>
            <FileCheck size={20} />
            <span>{t('processedDocuments')}</span>
          </Link>
          <Link to="/payment/quick" className={`nav-item ${isActive('/payment') ? 'active' : ''}`}>
            <CreditCard size={20} />
            <span>{t('payments')}</span>
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Layout;