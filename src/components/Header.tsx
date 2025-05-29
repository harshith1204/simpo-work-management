
import { Bell, User } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path.startsWith("/projects")) return "Projects";
    if (path.startsWith("/tasks")) return "Tasks";
    if (path.startsWith("/roadmap")) return "Roadmap";
    if (path.startsWith("/issues")) return "Issues";
    if (path.startsWith("/settings")) return "Settings";
    if (path.startsWith("/analytics")) return "Analytics";
    if (path.startsWith("/cycles")) return "Cycles";
    if (path.startsWith("/work")) return "Your Work";
    if (path.startsWith("/inbox")) return "Inbox";
    return "Dashboard";
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold text-gray-900 font-dm-sans">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        {/* User Avatar */}
        <button className="w-8 h-8 bg-[#3A0044] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3A0044]/90 transition-colors">
          <User className="w-4 h-4 text-white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
