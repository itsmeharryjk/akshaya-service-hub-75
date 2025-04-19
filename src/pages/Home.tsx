
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { services, getIconByName } from "@/lib/data-service";
import { Input } from "@/components/ui/input";
import { Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  const handleCallAkshaya = () => {
    // In a real app, this would initiate a phone call
    window.location.href = "tel:+918000000000";
  };

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout title="Akshaya E-Services">
      <div className="space-y-5">
        {/* Welcome Card */}
        <div className="bg-akshaya-light rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium text-akshaya-primary mb-2">Welcome to Akshaya E-Services</h2>
          <p className="text-gray-600 text-sm">
            Access government services easily from your mobile device.
            Apply for certificates, documents, and more.
          </p>
        </div>

        {/* Search Box */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Available Services</h3>
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search services..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredServices.map((service) => {
              const IconComponent = getIconByName(service.icon);
              return (
                <div
                  key={service.id}
                  className="service-card"
                  onClick={() => handleServiceClick(service.id)}
                >
                  <div className="w-12 h-12 rounded-full bg-akshaya-light flex items-center justify-center text-akshaya-primary mb-2">
                    <IconComponent size={22} />
                  </div>
                  <h3 className="text-sm font-medium text-center">{service.name}</h3>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No services found matching "{searchQuery}"</p>
          </div>
        )}

        {/* Call Akshaya section */}
        <div className="bg-white rounded-lg p-5 shadow-sm flex flex-col items-center mt-4">
          <p className="text-sm text-gray-600 mb-3">Can't find what you're looking for?</p>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-akshaya-primary text-akshaya-primary hover:bg-akshaya-light w-full justify-center"
            onClick={handleCallAkshaya}
          >
            <Phone size={18} />
            Call Akshaya Support
          </Button>
        </div>

        {/* About section */}
        <div className="bg-akshaya-light rounded-lg p-4 shadow-sm mb-4">
          <h3 className="text-md font-medium text-gray-800 mb-2">About Akshaya E-Services</h3>
          <p className="text-gray-600 text-sm">
            Akshaya E-Services is a government initiative to provide easy access to various
            services through mobile devices. Apply for documents, certificates, and make payments
            from the comfort of your home.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
