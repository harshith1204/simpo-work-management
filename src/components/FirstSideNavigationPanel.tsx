
import { cn } from "@/lib/utils";
import { useState } from "react";
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
  Headphones,
  ChevronLeft,
  ChevronRight,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FirstSideNavigationPanelProps {
  activeModule: string;
  onModuleSelect: (module: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  installedApps?: string[];
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

const getInstalledAppModules = (installedApps: string[] = []) => {
  const appModules = [];
  if (installedApps.includes("payroll")) {
    appModules.push({ id: "payroll", name: "Payroll", icon: DollarSign });
  }
  if (installedApps.includes("employees")) {
    appModules.push({ id: "employees", name: "Employees", icon: Users });
  }
  return appModules;
};

const FirstSideNavigationPanel = ({ 
  activeModule, 
  onModuleSelect, 
  isCollapsed = false, 
  onToggleCollapse,
  installedApps = []
}: FirstSideNavigationPanelProps) => {
  const installedAppModules = getInstalledAppModules(installedApps);
  const allApplicationModules = [...applicationModules, ...installedAppModules];

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col font-dm-sans transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header with collapse button */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-sm font-semibold text-gray-900">Navigation</h2>
        )}
        {onToggleCollapse && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-1 h-6 w-6"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {/* Applications Section */}
      <div className="p-4">
        {!isCollapsed && (
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Applications
          </div>
        )}
        <ul className="space-y-1">
          {allApplicationModules.map((module) => {
            const isActive = activeModule === module.id;
            const Icon = module.icon;
            return (
              <li key={module.id}>
                <button
                  onClick={() => onModuleSelect(module.id)}
                  className={cn(
                    "w-full flex items-center rounded-lg text-sm font-medium transition-all duration-200",
                    isCollapsed ? "p-2 justify-center" : "px-3 py-2.5",
                    isActive 
                      ? "bg-[#271A29] text-white" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                  title={isCollapsed ? module.name : undefined}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span className="ml-3">{module.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* AI Agents Section */}
      <div className="p-4 border-t border-gray-100">
        {!isCollapsed && (
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            AI Agents
          </div>
        )}
        <ul className="space-y-1">
          {aiAgentModules.map((module) => {
            const isActive = activeModule === module.id;
            const Icon = module.icon;
            return (
              <li key={module.id}>
                <button
                  onClick={() => onModuleSelect(module.id)}
                  className={cn(
                    "w-full flex items-center rounded-lg text-sm font-medium transition-all duration-200",
                    isCollapsed ? "p-2 justify-center" : "px-3 py-2.5",
                    isActive 
                      ? "bg-[#271A29] text-white" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                  title={isCollapsed ? module.name : undefined}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span className="ml-3">{module.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Help and Support at bottom */}
      <div className="mt-auto p-4 border-t border-gray-100">
        <button 
          className={cn(
            "w-full flex items-center rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200",
            isCollapsed ? "p-2 justify-center" : "px-3 py-2.5"
          )}
          title={isCollapsed ? "Help and Support" : undefined}
        >
          <Headphones className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Help and Support</span>}
        </button>
      </div>
    </div>
  );
};

export default FirstSideNavigationPanel;
