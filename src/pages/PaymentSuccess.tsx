
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
        <p className="text-gray-600 mb-6">
          Your transaction has been completed successfully.
        </p>
        
        <div className="w-full bg-white rounded-lg shadow-sm p-5 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-medium">{transactionId}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">{date}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Time</span>
              <span className="font-medium">{time}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 w-full">
          <Button 
            variant="outline" 
            className="w-full gap-2"
            onClick={() => { 
              // Print or download receipt logic
              window.print();
            }}
          >
            <Download size={18} />
            Download Receipt
          </Button>
          
          <Button 
            className="w-full gap-2"
            onClick={() => navigate("/")}
          >
            <Home size={18} />
            Back to Home
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          A confirmation has been sent to your registered email and mobile number.
        </p>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
