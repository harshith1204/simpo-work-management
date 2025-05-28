
import { Search, Bell, User, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import CreateIssueModal from "./CreateIssueModal";

const Header = () => {
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/": return "Home";
      case "/projects": return "Projects";
      case "/tasks": return "Tasks";
      case "/roadmap": return "Roadmap";
      case "/issues": return "Issues";
      case "/settings": return "Settings";
      case "/integrations": return "Integrations";
      default: 
        if (location.pathname.startsWith("/issues/")) return "Issue Details";
        return "Home";
    }
  };

  const getCreateButtonText = () => {
    switch (location.pathname) {
      case "/issues": return "Create New Issue";
      case "/projects": return "New Project";
      case "/tasks": return "New Task";
      default: return "Create";
    }
  };

  const handleCreateClick = () => {
    console.log("Create button clicked for:", getPageTitle());
    if (location.pathname === "/issues") {
      setIsCreateModalOpen(true);
    }
  };

  const handleCreateIssue = (issueData: any) => {
    console.log("New issue created:", issueData);
    // Here you would typically send the data to your backend
  };

  return (
    <>
      <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
        
        <div className="flex items-center space-x-6">
          <Button 
            onClick={handleCreateClick} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            {getCreateButtonText()}
          </Button>
          
          {/* User Avatar */}
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
            <User className="w-5 h-5 text-white" />
          </div>
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
