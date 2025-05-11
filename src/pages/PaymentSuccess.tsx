
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Home } from "lucide-react";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const transactionId = "TXN" + Math.floor(Math.random() * 1000000);
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  return (
    <Layout title="Payment Successful" showNav={false} showBack={false}>
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        
        <h2 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h2>
        <p className="text-low-contrast mb-6">
          Your transaction has been completed successfully.
        </p>
        
        <div className="w-full bg-surface rounded-lg shadow-sm p-5 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-low-contrast">Transaction ID</span>
              <span className="font-medium text-high-contrast">{transactionId}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-low-contrast">Date</span>
              <span className="font-medium text-high-contrast">{date}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-low-contrast">Time</span>
              <span className="font-medium text-high-contrast">{time}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 w-full">
          <Button 
            variant="outline" 
            className="w-full icon-text-pair justify-center"
            onClick={() => { 
              // Print or download receipt logic
              window.print();
            }}
          >
            <Download size={24} />
            <span>Download Receipt</span>
          </Button>
          
          <Button 
            className="w-full icon-text-pair justify-center"
            onClick={() => navigate("/")}
          >
            <Home size={24} />
            <span>Back to Home</span>
          </Button>
        </div>
        
        <p className="text-sm text-low-contrast mt-6">
          A confirmation has been sent to your registered email and mobile number.
        </p>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
