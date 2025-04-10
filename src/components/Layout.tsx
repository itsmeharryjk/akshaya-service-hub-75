
import React from "react";
import { Home, FileText, CreditCard, User } from "lucide-react";
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-akshaya-primary text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {showBack && (
              <button 
                onClick={onBack || (() => window.history.back())}
                className="mr-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
            )}
            <h1 className="text-lg font-medium">{title || "Akshaya E-Services"}</h1>
          </div>
          <div className="flex items-center">
            <button 
              className="p-1"
              onClick={handleUserIconClick}
              aria-label="User account"
            >
              <User size={20} />
            </button>
          </div>
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
            <span>Home</span>
          </Link>
          <Link to="/documents" className={`nav-item ${isActive('/documents') ? 'active' : ''}`}>
            <FileText size={20} />
            <span>Documents</span>
          </Link>
          <Link to="/payment/quick" className={`nav-item ${isActive('/payment') ? 'active' : ''}`}>
            <CreditCard size={20} />
            <span>Payments</span>
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Layout;
