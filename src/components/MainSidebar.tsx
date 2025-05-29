
import { 
  Home, 
  Briefcase, 
  Inbox, 
  FolderOpen, 
  Bug, 
  RotateCcw, 
  BarChart3, 
  CheckSquare, 
  MapPin, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MainSidebarProps {
  activeModule: string;
  onModuleSelect: (module: string) => void;
}

const navigation = [
  {
    type: "single",
    items: [
      { id: "home", name: "Home", icon: Home },
      { id: "your-work", name: "Your Work", icon: Briefcase },
      { id: "inbox", name: "Inbox", icon: Inbox },
    ]
  },
  {
    type: "group",
    label: "Workspace",
    items: [
      { id: "projects", name: "Projects", icon: FolderOpen },
      { id: "issues", name: "Issues", icon: Bug },
      { id: "cycles", name: "Cycles", icon: RotateCcw },
      { id: "analytics", name: "Analytics", icon: BarChart3 },
    ]
  },
  {
    type: "group", 
    label: "Planning",
    items: [
      { id: "tasks", name: "Tasks", icon: CheckSquare },
      { id: "roadmap", name: "Roadmap", icon: MapPin },
    ]
  },
  {
    type: "single",
    items: [
      { id: "settings", name: "Settings", icon: Settings },
    ]
  }
];

const MainSidebar = ({ activeModule, onModuleSelect }: MainSidebarProps) => {
  return (
    <div className="w-64 bg-[#270E2B] text-white flex flex-col font-dm-sans">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">Simpo</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {navigation.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.type === "group" && (
              <div className="text-xs font-medium text-white/60 uppercase tracking-wider mb-3 px-3">
                {section.label}
              </div>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = activeModule === item.id;
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onModuleSelect(item.id)}
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
                      <span>{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default MainSidebar;
