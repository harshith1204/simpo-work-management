
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
      case "/team": return "Team";
      case "/settings": return "Settings";
      default: return "Dashboard";
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h1>
      
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors w-64"
          />
        </div>
        
        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        {/* User Avatar */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
