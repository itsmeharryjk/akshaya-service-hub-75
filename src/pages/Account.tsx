
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  LogOut, 
  User, 
  Mail, 
  Phone, 
  Shield, 
  HelpCircle, 
  FileText, 
  Settings, 
  ChevronRight 
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Account: React.FC = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleSaveProfile = () => {
    updateUserProfile({
      name: formData.name,
      email: formData.email,
    });
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const menuItems = [
    { icon: FileText, label: "My Documents", onClick: () => navigate("/documents") },
    { icon: Shield, label: "Privacy & Security", onClick: () => toast.info("Privacy settings coming soon") },
    { icon: Settings, label: "App Settings", onClick: () => toast.info("App settings coming soon") },
    { icon: HelpCircle, label: "Help & Support", onClick: () => navigate("/") },
  ];

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Layout title="My Account" showBack>
      <div className="p-4 space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage src="" alt={user?.name || "User"} />
            <AvatarFallback className="bg-akshaya-primary text-white text-xl">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>

          {isEditing ? (
            <div className="w-full space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={user.phoneNumber}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">Phone number cannot be changed</p>
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={handleSaveProfile} className="flex-1">
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)} 
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold">
                {user?.name || "User"}
              </h2>
              <p className="text-gray-500 flex items-center gap-1 mt-1">
                <Phone size={14} /> {user.phoneNumber}
              </p>
              {user.email && (
                <p className="text-gray-500 flex items-center gap-1 mt-1">
                  <Mail size={14} /> {user.email}
                </p>
              )}
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(true)} 
                className="mt-4"
              >
                <User size={16} className="mr-2" />
                Edit Profile
              </Button>
            </>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-md text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="text-gray-500">
                    <item.icon size={20} />
                  </div>
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
    </Layout>
  );
};

export default Account;
