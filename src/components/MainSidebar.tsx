
import { 
  Home, 
  Users, 
  Globe, 
  Receipt, 
  TrendingUp, 
  BarChart3, 
  Briefcase 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MainSidebarProps {
  activeModule: string;
  onModuleSelect: (module: string) => void;
}

const simpoApps = [
  { id: "home", name: "Home", icon: Home },
  { id: "crm", name: "CRM", icon: Users },
  { id: "website", name: "Website", icon: Globe },
  { id: "expenses", name: "Expenses", icon: Receipt },
  { id: "sales", name: "Sales", icon: TrendingUp },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "work-management", name: "Work Management", icon: Briefcase },
];

const MainSidebar = ({ activeModule, onModuleSelect }: MainSidebarProps) => {
  return (
    <div className="w-64 bg-[#270E2B] text-white flex flex-col font-dm-sans">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">Simpo</h1>
        <p className="text-white/60 text-sm mt-1">All-in-One Platform</p>
      </div>

      {/* Apps Navigation */}
      <nav className="flex-1 p-4">
        <div className="text-xs font-medium text-white/60 uppercase tracking-wider mb-3 px-3">
          Applications
        </div>
        <ul className="space-y-1">
          {simpoApps.map((app) => {
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
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full transition-all duration-200" />
                  )}
                  <Icon className={cn(
                    "w-5 h-5 mr-3 transition-colors",
                    isActive ? "text-white" : "text-white/70 group-hover:text-white"
                  )} />
                  <span>{app.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-white/60">
          Simpo Platform v2.0
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
