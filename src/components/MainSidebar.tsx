
import { 
  Home, 
  Users, 
  Globe, 
  Receipt, 
  TrendingUp, 
  BarChart3, 
  Briefcase,
  UserCog,
  DollarSign,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MainSidebarProps {
  activeModule: string;
  onModuleSelect: (module: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  payrollInstalled: boolean;
}

const simpoApps = [
  { id: "home", name: "Home", icon: Home },
  { id: "crm", name: "CRM", icon: Users },
  { id: "website", name: "Website", icon: Globe },
  { id: "expenses", name: "Expenses", icon: Receipt },
  { id: "sales", name: "Sales", icon: TrendingUp },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "work-management", name: "Work Management", icon: Briefcase },
  { id: "hrms", name: "HRMS", icon: UserCog },
];

const MainSidebar = ({ activeModule, onModuleSelect, collapsed, onToggleCollapse, payrollInstalled }: MainSidebarProps) => {
  const apps = payrollInstalled ? 
    [...simpoApps, { id: "payroll", name: "Payroll Management", icon: DollarSign }] : 
    simpoApps;

  return (
    <div className={cn(
      "bg-[#270E2B] text-white flex flex-col font-dm-sans transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className={cn(
          "font-bold text-white transition-all duration-300",
          collapsed ? "text-lg text-center" : "text-xl"
        )}>
          {collapsed ? "S" : "Simpo"}
        </h1>
      </div>

      {/* Apps Navigation */}
      <nav className="flex-1 p-4">
        <div className={cn(
          "text-xs font-medium text-white/60 uppercase tracking-wider mb-3 px-3",
          collapsed && "hidden"
        )}>
          Applications
        </div>
        <ul className="space-y-1">
          {apps.map((app) => {
            const isActive = activeModule === app.id;
            const Icon = app.icon;
            return (
              <li key={app.id}>
                <button
                  onClick={() => onModuleSelect(app.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                    isActive 
                      ? "bg-white/10 text-white" 
                      : "text-white/70 hover:text-white hover:bg-white/5",
                    collapsed && "justify-center"
                  )}
                  title={collapsed ? app.name : undefined}
                >
                  {isActive && !collapsed && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full transition-all duration-200" />
                  )}
                  <Icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-white" : "text-white/70 group-hover:text-white",
                    collapsed ? "mx-auto" : "mr-3"
                  )} />
                  {!collapsed && <span>{app.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className={cn(
            "w-full text-white/70 hover:text-white hover:bg-white/5",
            collapsed && "px-0 justify-center"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>

      {/* Footer */}
      <div className={cn(
        "p-4 border-t border-white/10",
        collapsed && "hidden"
      )}>
        <div className="text-xs text-white/60">
          Simpo Platform v2.0
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
