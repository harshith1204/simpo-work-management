
import { Search, Bell, User, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import CreateIssueModal from "./CreateIssueModal";

const Header = () => {
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
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

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateIssue = (issueData: any) => {
    console.log("New issue created:", issueData);
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          <Button 
            onClick={handleCreateClick} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
          
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          {/* User Avatar */}
          <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
            <User className="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

      <CreateIssueModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateIssue}
      />
    </>
  );
};

export default Header;
