
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getServiceById } from "@/lib/data-service";
import { Service } from "@/lib/types";
import { CreditCard, Smartphone, Check, Clock, IndianRupee, Trash2, Plus } from "lucide-react";

// Mock transaction data - in a real app, this would come from an API
const mockTransactions = [
  { id: "tx1", service: "Land Records", amount: 150, date: "2025-04-01", status: "Completed" },
  { id: "tx2", service: "Driving License", amount: 250, date: "2025-03-25", status: "Completed" },
  { id: "tx3", service: "Income Tax", amount: 200, date: "2025-03-15", status: "Completed" },
  { id: "tx4", service: "Property Tax", amount: 500, date: "2025-03-10", status: "Completed" },
];

// Mock saved payment methods - in a real app, this would come from a secure API
const mockSavedPaymentMethods = [
  { id: "pm1", type: "upi", value: "user@okaxis", isDefault: true },
  { id: "pm2", type: "card", value: "**** **** **** 4242", issuer: "Visa", expiry: "12/28" },
];

// Mock savings data
const mockSavings = {
  timeSaved: 14, // hours
  moneySaved: 1200, // rupees
  visitsSaved: 8,
};

const Payments: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState("");
  const [activeTab, setActiveTab] = useState("payment");
  const [savedMethods, setSavedMethods] = useState(mockSavedPaymentMethods);

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

  const handleDeletePaymentMethod = (id: string) => {
    if (window.confirm("Are you sure you want to remove this payment method?")) {
      setSavedMethods(savedMethods.filter(method => method.id !== id));
    }
  };

  const handleSetDefault = (id: string) => {
    setSavedMethods(
      savedMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  return (
    <Layout title="Payments" showBack>
      <div className="p-4">
        <Tabs defaultValue="payment" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payment">Pay Now</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Pay Now Tab */}
          <TabsContent value="payment">
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
                  {savedMethods.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <h4 className="text-xs text-gray-500">Saved Methods</h4>
                      {savedMethods.map(method => (
                        <div 
                          key={method.id}
                          className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer ${method.isDefault ? 'border-akshaya-primary bg-akshaya-light' : 'border-gray-200'}`}
                          onClick={() => handleSetDefault(method.id)}
                        >
                          <div className="flex items-center">
                            {method.type === 'upi' ? (
                              <Smartphone size={20} className="mr-2 text-akshaya-primary" />
                            ) : (
                              <CreditCard size={20} className="mr-2 text-akshaya-primary" />
                            )}
                            <div>
                              <span className="text-sm font-medium">{method.value}</span>
                              {method.type === 'card' && (
                                <p className="text-xs text-gray-500">{method.issuer} • Expires {method.expiry}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {method.isDefault && (
                              <span className="text-xs text-akshaya-primary mr-2">Default</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div 
                      className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer relative ${paymentMethod === 'upi' ? 'border-akshaya-primary bg-akshaya-light' : 'border-gray-200'}`}
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
                      className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer relative ${paymentMethod === 'card' ? 'border-akshaya-primary bg-akshaya-light' : 'border-gray-200'}`}
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
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="methods">
            <Card>
              <CardHeader>
                <CardTitle>Your Payment Methods</CardTitle>
                <CardDescription>
                  Manage your saved payment options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedMethods.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <CreditCard className="text-gray-400" size={24} />
                    </div>
                    <h3 className="text-base font-medium">No payment methods</h3>
                    <p className="text-sm text-gray-500 mt-1">Add a payment method to enable faster checkout</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedMethods.map(method => (
                      <div key={method.id} className="flex justify-between items-center border rounded-lg p-3">
                        <div className="flex items-center">
                          {method.type === 'upi' ? (
                            <Smartphone size={20} className="mr-3 text-akshaya-primary" />
                          ) : (
                            <CreditCard size={20} className="mr-3 text-akshaya-primary" />
                          )}
                          <div>
                            <span className="text-sm font-medium">{method.value}</span>
                            {method.type === 'card' && (
                              <p className="text-xs text-gray-500">{method.issuer} • Expires {method.expiry}</p>
                            )}
                            {method.isDefault && (
                              <span className="text-xs text-akshaya-primary">Default</span>
                            )}
                          </div>
                        </div>
                        <div className="flex">
                          {!method.isDefault && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleSetDefault(method.id)}
                              className="text-xs"
                            >
                              Set Default
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeletePaymentMethod(method.id)}
                          >
                            <Trash2 size={16} className="text-gray-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button className="w-full mt-4" onClick={() => setActiveTab("payment")}>
                  <Plus size={16} className="mr-2" />
                  Add New Payment Method
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View your payment history and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockTransactions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No transactions yet</p>
                  </div>
                ) : (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTransactions.map((tx) => (
                          <TableRow key={tx.id}>
                            <TableCell className="font-medium">{tx.service}</TableCell>
                            <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">₹{tx.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </CardContent>
            </Card>
            
            {/* Savings Summary */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Your Savings with Akshaya</h3>
              <div className="grid grid-cols-3 gap-3">
                <Card className="bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        <Clock size={20} className="text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{mockSavings.timeSaved}h</p>
                      <p className="text-sm text-gray-600">Time Saved</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <IndianRupee size={20} className="text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-green-600">₹{mockSavings.moneySaved}</p>
                      <p className="text-sm text-gray-600">Money Saved</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                        <Check size={20} className="text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-purple-600">{mockSavings.visitsSaved}</p>
                      <p className="text-sm text-gray-600">Visits Avoided</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

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
