
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, otp: string) => Promise<void>;
  logout: () => void;
  startPhoneLogin: (phoneNumber: string) => Promise<boolean>;
  updateUserProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const startPhoneLogin = async (phoneNumber: string): Promise<boolean> => {
    // In a real app, this would call an API to send OTP
    console.log(`Sending OTP to ${phoneNumber}`);
    // Simulate OTP sent successfully
    localStorage.setItem('pendingPhoneNumber', phoneNumber);
    return true;
  };

  const login = async (phoneNumber: string, otp: string): Promise<void> => {
    // In a real app, this would verify the OTP with the backend
    console.log(`Verifying OTP ${otp} for ${phoneNumber}`);
    
    // Simulating successful verification
    if (otp.length === 6) {
      const newUser = {
        id: `user_${Date.now()}`,
        phoneNumber,
        name: '',
        email: '',
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.removeItem('pendingPhoneNumber');
    } else {
      throw new Error("Invalid OTP");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        startPhoneLogin,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
