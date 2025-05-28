
import { Search, Bell, User } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/": return "Dashboard";
      case "/projects": return "Projects";
      case "/tasks": return "Tasks";
      case "/roadmap": return "Roadmap";
      case "/sprints": return "Sprints";
      case "/team": return "Team Members";
      case "/settings": return "Settings";
      default: return "Dashboard";
    }
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-black">{getPageTitle()}</h1>
      
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
          <input
            type="text"
            placeholder="Search Simpo…"
            className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors w-80 font-medium"
          />
        </div>
        
        {/* Notifications */}
        <button className="p-3 text-black hover:text-blue-600 transition-colors rounded-xl hover:bg-gray-50">
          <Bell className="w-5 h-5" />
        </button>
        
        {/* User Avatar */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
