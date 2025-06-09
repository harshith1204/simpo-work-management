
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  Globe, 
  Receipt, 
  TrendingUp, 
  BarChart3, 
  Briefcase,
  UserCog,
  Bot,
  PenTool,
  Headphones
} from "lucide-react";

interface FirstSideNavigationPanelProps {
  activeModule: string;
  onModuleSelect: (module: string) => void;
}

const applicationModules = [
  { id: "home", name: "Home", icon: Home },
  { id: "crm", name: "CRM", icon: Users },
  { id: "website", name: "Website", icon: Globe },
  { id: "expenses", name: "Expenses", icon: Receipt },
  { id: "sales", name: "Sales", icon: TrendingUp },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "work-management", name: "Work Management", icon: Briefcase },
  { id: "hrms", name: "HRMS", icon: UserCog },
];

const aiAgentModules = [
  { id: "ai-writer", name: "AI Writer", icon: PenTool },
  { id: "ai-crm", name: "AI CRM", icon: Users },
  { id: "ai-sales", name: "AI Sales", icon: TrendingUp },
  { id: "ai-help", name: "AI Help", icon: Headphones },
  { id: "ai-analytics", name: "AI Analytics", icon: BarChart3 },
];

const FirstSideNavigationPanel = ({ activeModule, onModuleSelect }: FirstSideNavigationPanelProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col font-dm-sans">
      {/* Applications Section */}
      <div className="p-4">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          Applications
        </div>
        <ul className="space-y-1">
          {applicationModules.map((module) => {
            const isActive = activeModule === module.id;
            const Icon = module.icon;
            return (
              <li key={module.id}>
                <button
                  onClick={() => onModuleSelect(module.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-[#271A29] text-white" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{module.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* AI Agents Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          AI Agents
        </div>
        <ul className="space-y-1">
          {aiAgentModules.map((module) => {
            const isActive = activeModule === module.id;
            const Icon = module.icon;
            return (
              <li key={module.id}>
                <button
                  onClick={() => onModuleSelect(module.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-[#271A29] text-white" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{module.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Help and Support at bottom */}
      <div className="mt-auto p-4 border-t border-gray-100">
        <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200">
          <Headphones className="w-5 h-5 mr-3" />
          <span>Help and Support</span>
        </button>
      </div>
    </div>
  );
};

export default FirstSideNavigationPanel;
