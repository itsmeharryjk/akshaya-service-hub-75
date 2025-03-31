
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getServiceById } from "@/lib/data-service";
import { Service } from "@/lib/types";
import { CreditCard, Smartphone, Check } from "lucide-react";

const Payments: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState("");

  useEffect(() => {
    if (serviceId && serviceId !== 'quick') {
      const serviceData = getServiceById(serviceId);
      if (serviceData) {
        setService(serviceData);
      }
    }
  }, [serviceId]);

  const handlePayment = () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate("/payment-success");
    }, 2000);
  };

  return (
    <Layout title="Make Payment" showBack>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              {service ? `Complete payment for ${service.name}` : "Make a quick payment"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {service ? (
              <div className="bg-akshaya-light p-3 rounded-md">
                <h3 className="text-sm font-medium">Service:</h3>
                <p className="text-base">{service.name}</p>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm">Fee:</span>
                  <span className="font-medium">₹{service.fee}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Service ID/Reference Number</label>
                  <Input placeholder="Enter service ID or reference number" />
                </div>
                <div>
                  <label className="text-sm font-medium">Amount (₹)</label>
                  <Input placeholder="Enter amount" type="number" />
                </div>
              </div>
            )}

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer ${paymentMethod === 'upi' ? 'border-akshaya-primary bg-akshaya-light' : 'border-gray-200'}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <Smartphone size={24} className={paymentMethod === 'upi' ? 'text-akshaya-primary' : 'text-gray-400'} />
                  <span className="mt-1 text-sm">UPI / Google Pay</span>
                  {paymentMethod === 'upi' && (
                    <div className="absolute top-1 right-1 bg-akshaya-primary rounded-full p-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <div 
                  className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer ${paymentMethod === 'card' ? 'border-akshaya-primary bg-akshaya-light' : 'border-gray-200'}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={24} className={paymentMethod === 'card' ? 'text-akshaya-primary' : 'text-gray-400'} />
                  <span className="mt-1 text-sm">Credit/Debit Card</span>
                  {paymentMethod === 'card' && (
                    <div className="absolute top-1 right-1 bg-akshaya-primary rounded-full p-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {paymentMethod === 'upi' && (
              <div className="mt-4">
                <label className="text-sm font-medium">UPI ID / Google Pay Number</label>
                <Input 
                  placeholder="yourname@upi or mobile number" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <div className="bg-gray-100 p-2 rounded-md mr-2">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png" 
                      alt="Google Pay"
                      className="h-4 w-4"
                    />
                  </div>
                  Connect with your Google Pay account
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CVV</label>
                    <Input placeholder="123" type="password" maxLength={3} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Name on Card</label>
                  <Input placeholder="Enter name as on card" />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handlePayment} 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `Pay ₹${service ? service.fee : '0'}`
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Secured by Akshaya Payment Gateway
          </p>
          <div className="flex justify-center space-x-2 mt-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/200px-MasterCard_Logo.svg.png" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/200px-RuPay.svg.png" alt="RuPay" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payments;
