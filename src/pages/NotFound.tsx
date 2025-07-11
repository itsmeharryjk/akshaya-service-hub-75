
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout title={t('pageNotFound')} showBack={false}>
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl font-bold text-gray-400">404</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{t('pageNotFound')}</h1>
        <p className="text-gray-600 mb-6">
          {t('pageNotFoundDescription')}
        </p>
        <Button 
          className="w-full max-w-xs" 
          onClick={() => window.location.href = '/'}
        >
          {t('goToHome')}
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
