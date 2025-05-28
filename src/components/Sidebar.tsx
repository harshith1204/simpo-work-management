
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, FolderOpen, CheckSquare, MapPin, Bug, Settings, Plug } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Roadmap", href: "/roadmap", icon: MapPin },
  { name: "Issues", href: "/issues", icon: Bug },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Integrations", href: "/integrations", icon: Plug },
];

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={cn(
      "fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-10 font-sidebar",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <h1 className={cn(
              "font-bold text-gray-900 transition-all duration-300",
              collapsed ? "text-sm" : "text-xl"
            )}>
              {collapsed ? "S" : "Simpo"}
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                      isActive 
                        ? "bg-blue-50 text-blue-600 font-semibold" 
                        : "text-black hover:text-blue-600 hover:bg-gray-50"
                    )}
                  >
                    <Icon className={cn("w-5 h-5 mr-3 transition-colors", isActive ? "text-blue-600" : "text-black group-hover:text-blue-600")} />
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
            className="flex items-center w-full px-3 py-3 text-sm font-medium text-black hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-all duration-200"
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
