
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const transactionId = "TXN" + Math.floor(Math.random() * 1000000);
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  return (
    <Layout title={t('paymentSuccessful')} showNav={false} showBack={false}>
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        
        <h2 className="text-xl font-bold text-green-600">{t('paymentSuccessful')}</h2>
        <p className="text-gray-600 mt-2">
          {t('transactionCompleted')}
        </p>
        
        <div className="w-full max-w-xs mt-6 bg-white rounded-lg shadow-sm p-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">{t('transactionId')}</span>
              <span className="font-medium text-sm">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">{t('date')}</span>
              <span className="font-medium text-sm">{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">{t('time')}</span>
              <span className="font-medium text-sm">{time}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-4 w-full max-w-xs">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => { 
              // Print or download receipt logic would go here
              window.print();
            }}
          >
            {t('downloadReceipt')}
          </Button>
          
          <Button 
            className="w-full"
            onClick={() => navigate("/")}
          >
            {t('backToHome')}
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          {t('confirmationSent')}
        </p>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
