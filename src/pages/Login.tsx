import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Phone, ArrowRight, Globe } from "lucide-react";

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { startPhoneLogin, login } = useAuth();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error(t('enterPhone'));
      return;
    }

    setIsLoading(true);
    try {
      const success = await startPhoneLogin(phoneNumber);
      if (success) {
        setOtpSent(true);
        toast.success(t('getOTP'));
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }

    setIsLoading(true);
    try {
      await login(phoneNumber, otp);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ml' : 'en';
    i18n.changeLanguage(newLanguage);
    toast.success(`Language changed to ${newLanguage === 'en' ? 'English' : 'Malayalam'}`);
  };

  // Language toggle component for header
  const languageToggle = (
    <button 
      onClick={toggleLanguage}
      className="p-2 hover:bg-white/10 rounded-md transition-colors"
      aria-label={`Switch to ${i18n.language === 'en' ? 'Malayalam' : 'English'}`}
    >
      <Globe size={20} />
    </button>
  );

  return (
    <Layout title={t('signIn')} showNav={false} headerRightContent={languageToggle}>
      <div className="p-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">{t('welcome')}</h1>
            <p className="text-gray-600">{t('signIn')}</p>
          </div>

          {!otpSent ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  {t('phoneNumber')}
                </label>
                <div className="flex">
                  <div className="bg-gray-100 border border-input flex items-center px-3 rounded-l-md">
                    <span className="text-gray-500">+91</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('enterPhone')}
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    className="rounded-l-none"
                  />
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={handleSendOTP} 
                disabled={isLoading || phoneNumber.length < 10}
              >
                <Phone className="mr-2 h-4 w-4" />
                {t('getOTP')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium text-gray-700">
                  {t('enterOTP')} {phoneNumber}
                </label>
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <p className="text-sm text-gray-500 text-right mt-1">
                  {t('didntReceive')}{" "}
                  <button 
                    onClick={handleSendOTP} 
                    className="text-akshaya-primary hover:underline"
                  >
                    {t('resendOTP')}
                  </button>
                </p>
              </div>

              <Button 
                className="w-full" 
                onClick={handleVerifyOTP} 
                disabled={isLoading || otp.length !== 6}
              >
                {t('verifyLogin')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setOtpSent(false)}
              >
                {t('changePhone')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;