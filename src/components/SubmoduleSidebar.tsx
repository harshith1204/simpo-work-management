
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  User, 
  Inbox, 
  FolderOpen, 
  Bug, 
  RotateCcw, 
  BarChart3, 
  CheckSquare, 
  MapPin,
  Settings
} from "lucide-react";

interface SubmoduleSidebarProps {
  activeModule: string;
  activeSubmodule: string;
  onSubmoduleSelect: (submodule: string) => void;
}

const SubmoduleSidebar = ({ activeModule, activeSubmodule, onSubmoduleSelect }: SubmoduleSidebarProps) => {
  const navigate = useNavigate();

  const workManagementModules = [
    { id: "home", name: "Home", icon: Home, path: "/" },
    { id: "your-work", name: "Your Work", icon: User, path: "/work" },
    { id: "inbox", name: "Inbox", icon: Inbox, path: "/inbox" },
    { 
      id: "workspace", 
      name: "Workspace", 
      type: "group",
      items: [
        { id: "projects", name: "Projects", icon: FolderOpen, path: "/projects" },
        { id: "issues", name: "Issues", icon: Bug, path: "/issues" },
        { id: "cycles", name: "Cycles", icon: RotateCcw, path: "/cycles" },
        { id: "analytics", name: "Analytics", icon: BarChart3, path: "/analytics" },
      ]
    },
    {
      id: "planner",
      name: "Planner",
      type: "group",
      items: [
        { id: "tasks", name: "Tasks", icon: CheckSquare, path: "/tasks" },
        { id: "roadmap", name: "Roadmap", icon: MapPin, path: "/roadmap" },
      ]
    },
    { id: "settings", name: "Settings", icon: Settings, path: "/settings" },
  ];

  if (activeModule !== "work-management") {
    return null;
  }

  const handleModuleClick = (module: any) => {
    onSubmoduleSelect(module.id);
    if (module.path) {
      navigate(module.path);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col font-dm-sans">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Work Management</h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {workManagementModules.map((module) => {
            if (module.type === "group") {
              return (
                <div key={module.id} className="space-y-2">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
                    {module.name}
                  </div>
                  {module.items?.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSubmodule === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleModuleClick(item)}
                        className={`
                          w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors
                          ${isActive 
                            ? 'bg-[#3D5AFE] text-white' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-[#3D5AFE]'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              );
            }

            const Icon = module.icon;
            const isActive = activeSubmodule === module.id;
            
            return (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module)}
                className={`
                  w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-[#3D5AFE] text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#3D5AFE]'
                  }
                `}
              >
                <Icon className="w-4 h-4 mr-3" />
                {module.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default SubmoduleSidebar;
