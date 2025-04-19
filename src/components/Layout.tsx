
import React, { useState } from "react";
import { Home, FileText, CreditCard, User, ChevronLeft, Bell } from "lucide-react";
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

  // Mock notifications for demonstration
  const notifications = [
    { id: 1, title: "Income Certificate", message: "Your application is pending verification.", time: "2h ago" },
    { id: 2, title: "Govt. Alert", message: "New Aadhaar verification deadline extended.", time: "1d ago" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-akshaya-primary text-white p-4 shadow-md safe-top">
        <div className="flex items-center justify-between mx-auto">
          <div className="flex items-center gap-3">
            {showBack && (
              <button 
                onClick={handleBackClick}
                className="mr-1 touch-target"
                aria-label="Go back"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="text-lg font-medium truncate">{title || "Akshaya E-Services"}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                className="touch-target relative flex items-center justify-center"
                onClick={toggleNotifications}
                aria-label="Notifications"
              >
                <Bell size={22} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              
              {/* Notification dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-[280px] sm:w-[320px] bg-white rounded-lg shadow-lg overflow-hidden z-30 border border-gray-100">
                  {/* Explainer text in rectangle */}
                  <div className="bg-akshaya-light p-4 border border-akshaya-primary/10 m-3 rounded">
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
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-xs text-gray-500 ml-2">{notification.time}</p>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">No new notifications</div>
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
              <User size={22} />
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
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20 safe-bottom">
          <div className="flex justify-around items-center max-w-lg mx-auto">
            <Link 
              to="/" 
              className={`nav-item touch-target py-2 ${isActive('/') ? 'active' : ''}`}
            >
              <Home size={22} />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link 
              to="/documents" 
              className={`nav-item touch-target py-2 ${isActive('/documents') ? 'active' : ''}`}
            >
              <FileText size={22} />
              <span className="text-xs mt-1">Documents</span>
            </Link>
            <Link 
              to="/payment/quick" 
              className={`nav-item touch-target py-2 ${isActive('/payment') ? 'active' : ''}`}
            >
              <CreditCard size={22} />
              <span className="text-xs mt-1">Payments</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
