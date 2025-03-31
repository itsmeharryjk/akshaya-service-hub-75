
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout title="Page Not Found" showBack={false}>
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl font-bold text-gray-400">404</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button 
          className="w-full max-w-xs" 
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
