
import { useState } from "react";
import { ChevronDown, ChevronRight, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const MainSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    workspace: true,
    planner: true,
  });
  const location = useLocation();

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const isActive = (path: string) => location.pathname === path;

  const workspaceItems = [
    { name: "Dashboard", path: "/" },
    { name: "Your Work", path: "/work/summary" },
    { name: "Projects", path: "/projects" },
    { name: "Issues", path: "/issues" },
    { name: "Tasks", path: "/tasks" },
    { name: "Inbox", path: "/inbox" },
    { name: "Cycles", path: "/cycles" },
    { name: "Analytics", path: "/analytics" },
  ];

  const plannerItems = [
    { name: "Roadmap", path: "/roadmap" },
    { name: "Sprints", path: "/sprints" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col font-dm-sans">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Simpo</h1>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Work Management</h2>
        </div>
        <Button className="w-full justify-start bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200">
          <Plus className="w-4 h-4 mr-2" />
          Create
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Workspace Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('workspace')}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-600 mb-2 hover:text-gray-900"
          >
            <span>WORKSPACE</span>
            {expandedSections.workspace ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {expandedSections.workspace && (
            <div className="space-y-1">
              {workspaceItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Planner Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('planner')}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-600 mb-2 hover:text-gray-900"
          >
            <span>PLANNER</span>
            {expandedSections.planner ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {expandedSections.planner && (
            <div className="space-y-1">
              {plannerItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <Link
          to="/settings"
          className={`block px-3 py-2 text-sm rounded-md transition-colors ${
            isActive('/settings')
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          Settings
        </Link>
      </div>
    </div>
  );
};

export default MainSidebar;
