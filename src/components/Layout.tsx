
import React, { useState } from "react";
import { Home, FileText, CreditCard, User, ChevronLeft, Bell, Menu } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showNav?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  showNav = true,
  showBack = false,
  onBack,
  className
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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
    if (showMenu) setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    if (showNotifications) setShowNotifications(false);
  };

  // Mock notifications for demonstration
  const notifications = [
    { id: 1, title: "Income Certificate", message: "Your application is pending verification.", time: "2h ago" },
    { id: 2, title: "Govt. Alert", message: "New Aadhaar verification deadline extended.", time: "1d ago" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-primary text-primary-foreground shadow-md safe-top">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            {showBack && (
              <button 
                onClick={handleBackClick}
                className="touch-target"
                aria-label="Go back"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="text-lg font-medium truncate">{title || "Akshaya E-Services"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button 
                className="touch-target relative flex items-center justify-center"
                onClick={toggleNotifications}
                aria-label="Notifications"
              >
                <Bell size={24} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              
              {/* Notification dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-screen max-w-sm bg-surface rounded-lg shadow-lg overflow-hidden z-30 border border-gray-100 -right-4">
                  {/* Explainer text in rectangle */}
                  <div className="notification-explainer">
                    <p className="text-sm text-gray-700">
                      Stay updated with important alerts about your applications and government announcements
                    </p>
                  </div>
                  
                  <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
                    {notifications.length > 0 ? (
                      <>
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target"
                          >
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-medium text-high-contrast">{notification.title}</p>
                              <p className="text-xs text-low-contrast ml-2">{notification.time}</p>
                            </div>
                            <p className="text-sm text-low-contrast mt-1">{notification.message}</p>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="px-4 py-3 text-sm text-low-contrast">No new notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button 
              className="touch-target flex items-center justify-center"
              onClick={handleUserIconClick}
              aria-label="User account"
            >
              <User size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main content with proper spacing */}
      <main className={cn("flex-1 pt-16 pb-16", className)}>
        <div className="page-container pt-2">
          {children}
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      {showNav && (
        <nav className="mobile-bottom-nav">
          <div className="flex justify-around items-center w-full max-w-lg mx-auto">
            <Link 
              to="/" 
              className={`nav-item ${isActive('/') ? 'active' : ''}`}
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </Link>
            <Link 
              to="/documents" 
              className={`nav-item ${isActive('/documents') ? 'active' : ''}`}
            >
              <FileText size={24} />
              <span className="text-xs">Documents</span>
            </Link>
            <Link 
              to="/payment/quick" 
              className={`nav-item ${isActive('/payment') ? 'active' : ''}`}
            >
              <CreditCard size={24} />
              <span className="text-xs">Payments</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
