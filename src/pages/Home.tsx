
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { services, getIconByName } from "@/lib/data-service";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <Layout title="Akshaya E-Services">
      <div className="p-4 space-y-6">
        <div className="bg-akshaya-light rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium text-akshaya-primary mb-2">Welcome to Akshaya E-Services</h2>
          <p className="text-gray-600 text-sm">
            Access government services easily from your mobile device.
            Apply for certificates, documents, and more.
          </p>
        </div>

        <h3 className="text-lg font-medium text-gray-800">Available Services</h3>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => {
            const IconComponent = getIconByName(service.icon);
            return (
              <div
                key={service.id}
                className="service-card"
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="w-10 h-10 rounded-full bg-akshaya-light flex items-center justify-center text-akshaya-primary">
                  <IconComponent size={20} />
                </div>
                <h3 className="text-sm font-medium text-center">{service.name}</h3>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm mt-6">
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
