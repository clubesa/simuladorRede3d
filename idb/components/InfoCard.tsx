
import React from 'react';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
      <div className="flex items-center mb-4">
        <div className="bg-brand-light p-2 rounded-full mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-neutral-800">{title}</h3>
      </div>
      <div className="text-neutral-600 space-y-2">
        {children}
      </div>
    </div>
  );
};
