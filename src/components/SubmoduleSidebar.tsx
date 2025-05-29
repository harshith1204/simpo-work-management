
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SubmoduleSidebarProps {
  activeModule: string;
  activeSubmodule: string;
  onSubmoduleSelect: (submodule: string) => void;
}

const workManagementModules = [
  { id: "home", name: "Home", route: "/" },
  { id: "your-work", name: "Your Work", route: "/work/summary" },
  { id: "inbox", name: "Inbox", route: "/inbox/all" },
];

const workspaceGroup = [
  { id: "projects", name: "Projects", route: "/projects" },
  { id: "issues", name: "Issues", route: "/issues" },
  { id: "cycles", name: "Cycles", route: "/cycles/active" },
  { id: "analytics", name: "Analytics", route: "/analytics" },
];

const plannerGroup = [
  { id: "tasks", name: "Tasks", route: "/tasks" },
  { id: "roadmap", name: "Roadmap", route: "/roadmap" },
];

const settingsModule = [
  { id: "settings", name: "Settings", route: "/settings" },
];

const SubmoduleSidebar = ({ activeModule, activeSubmodule, onSubmoduleSelect }: SubmoduleSidebarProps) => {
  const navigate = useNavigate();

  const handleSubmoduleClick = (submodule: { id: string; name: string; route: string }) => {
    onSubmoduleSelect(submodule.id);
    navigate(submodule.route);
  };

  if (activeModule !== "work-management") {
    return (
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col font-dm-sans">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900 capitalize">
            {activeModule.replace("-", " ")}
          </h2>
          <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-sm">This module is under development</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col font-dm-sans">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">Work Management</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        {/* Main Modules */}
        <ul className="space-y-1 mb-6">
          {workManagementModules.map((module) => {
            const isActive = activeSubmodule === module.id;
            return (
              <li key={module.id}>
                <button
                  onClick={() => handleSubmoduleClick(module)}
                  className={cn(
                    "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 text-left",
                    isActive
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <span>{module.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Workspace Group */}
        <div className="mb-6">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-3">
            Workspace
          </div>
          <ul className="space-y-1">
            {workspaceGroup.map((module) => {
              const isActive = activeSubmodule === module.id;
              return (
                <li key={module.id}>
                  <button
                    onClick={() => handleSubmoduleClick(module)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 text-left",
                      isActive
                        ? "bg-gray-100 text-gray-900 font-semibold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <span>{module.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Planner Group */}
        <div className="mb-6">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-3">
            Planner
          </div>
          <ul className="space-y-1">
            {plannerGroup.map((module) => {
              const isActive = activeSubmodule === module.id;
              return (
                <li key={module.id}>
                  <button
                    onClick={() => handleSubmoduleClick(module)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 text-left",
                      isActive
                        ? "bg-gray-100 text-gray-900 font-semibold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <span>{module.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Settings */}
        <ul className="space-y-1">
          {settingsModule.map((module) => {
            const isActive = activeSubmodule === module.id;
            return (
              <li key={module.id}>
                <button
                  onClick={() => handleSubmoduleClick(module)}
                  className={cn(
                    "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 text-left",
                    isActive
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <span>{module.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SubmoduleSidebar;
