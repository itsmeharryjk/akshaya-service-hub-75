
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import ServiceDetails from "./pages/ServiceDetails";
import Scanner from "./pages/Scanner";
import Documents from "./pages/Documents";
import Payments from "./pages/Payments";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Account from "./pages/Account";

const queryClient = new QueryClient();

const App = () => {
  // Mobile viewport height fix
  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window !== 'undefined' && document) {
      const setVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setVh();
      
      // Add the event listener
      window.addEventListener('resize', setVh);
      
      // Clean up
      return () => {
        if (window) {
          window.removeEventListener('resize', setVh);
        }
      };
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/payment/:serviceId" element={<Payments />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
