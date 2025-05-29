
import { useState } from "react";
import { 
  Home, 
  Users, 
  Globe, 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Briefcase 
} from "lucide-react";

interface MainSidebarProps {
  activeModule: string;
  onModuleSelect: (module: string) => void;
}

const MainSidebar = ({ activeModule, onModuleSelect }: MainSidebarProps) => {
  const modules = [
    { id: "home", name: "Home", icon: Home },
    { id: "crm", name: "CRM", icon: Users },
    { id: "website", name: "Website", icon: Globe },
    { id: "expenses", name: "Expenses", icon: DollarSign },
    { id: "sales", name: "Sales", icon: TrendingUp },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "work-management", name: "Work Management", icon: Briefcase },
  ];

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4 font-dm-sans">
      {/* Logo */}
      <div className="w-8 h-8 bg-[#3D5AFE] rounded-lg flex items-center justify-center">
        <span className="text-white text-sm font-bold">S</span>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col space-y-3">
        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          
          return (
            <button
              key={module.id}
              onClick={() => onModuleSelect(module.id)}
              className={`
                w-10 h-10 flex items-center justify-center rounded-lg transition-colors
                ${isActive 
                  ? 'bg-[#3D5AFE] text-white' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-[#3D5AFE]'
                }
              `}
              title={module.name}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MainSidebar;
