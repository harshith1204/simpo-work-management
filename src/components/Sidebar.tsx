
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Projects", href: "/projects", icon: "📁" },
  { name: "Tasks", href: "/tasks", icon: "✓" },
  { name: "Roadmap", href: "/roadmap", icon: "🗺️" },
  { name: "Sprints", href: "/sprints", icon: "🏃" },
  { name: "Team", href: "/team", icon: "👥" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={cn(
      "fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-10",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/263ccb0a-7791-4ef5-b16a-e8843306ebe8.png" 
              alt="Simpo.ai" 
              className={cn("transition-all duration-300", collapsed ? "w-8 h-8" : "w-32 h-8")}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onToggle}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 mr-3" />
                <span>Collapse Nav</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
