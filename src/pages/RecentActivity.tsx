
import { useState } from "react";
import { User, MessageCircle, CheckSquare, FolderOpen, RefreshCcw, Filter, ChevronDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RecentActivity = () => {
  const [selectedMember, setSelectedMember] = useState("All Members");

  const teamMembers = ["All Members", "Riya Sharma", "Karan Patel", "Aditi Singh", "Alex Chen", "Maya Rodriguez"];

  const activities = [
    {
      id: 1,
      user: "Alex Chen",
      avatar: "AC",
      action: "created a new task",
      item: "Design wireframes for mobile app",
      project: "Website Redesign",
      timestamp: "2 hours ago",
      type: "task",
      color: "text-blue-600"
    },
    {
      id: 2,
      user: "Aditi Singh",
      avatar: "AS",
      action: "moved task to In Progress",
      item: "Fix mobile responsiveness issues",
      project: "Website Redesign",
      timestamp: "4 hours ago",
      type: "task",
      color: "text-orange-600"
    },
    {
      id: 3,
      user: "Riya Sharma",
      avatar: "RS",
      action: "commented on issue",
      item: "Form validation error in contact page",
      project: "Website Redesign",
      timestamp: "6 hours ago",
      type: "comment",
      color: "text-green-600"
    },
    {
      id: 4,
      user: "Maya Rodriguez",
      avatar: "MR",
      action: "created a new project",
      item: "Q3 Marketing Campaign",
      project: null,
      timestamp: "Yesterday",
      type: "project",
      color: "text-purple-600"
    },
    {
      id: 5,
      user: "Karan Patel",
      avatar: "KP",
      action: "completed task",
      item: "API integration for user authentication",
      project: "Product Launch",
      timestamp: "Yesterday",
      type: "task",
      color: "text-green-600"
    },
    {
      id: 6,
      user: "Alex Chen",
      avatar: "AC",
      action: "assigned issue to team",
      item: "Database performance optimization",
      project: "Product Launch",
      timestamp: "2 days ago",
      type: "issue",
      color: "text-red-600"
    },
    {
      id: 7,
      user: "Aditi Singh",
      avatar: "AS",
      action: "updated project timeline",
      item: "Onboarding System",
      project: null,
      timestamp: "2 days ago",
      type: "project",
      color: "text-blue-600"
    },
    {
      id: 8,
      user: "Riya Sharma",
      avatar: "RS",
      action: "created a new task",
      item: "Email campaign templates design",
      project: "Marketing Q3",
      timestamp: "3 days ago",
      type: "task",
      color: "text-blue-600"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "task":
        return <CheckSquare className="w-4 h-4 text-blue-600" />;
      case "comment":
        return <MessageCircle className="w-4 h-4 text-green-600" />;
      case "project":
        return <FolderOpen className="w-4 h-4 text-purple-600" />;
      case "issue":
        return <User className="w-4 h-4 text-red-600" />;
      default:
        return <CheckSquare className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredActivities = selectedMember === "All Members" 
    ? activities 
    : activities.filter(activity => activity.user === selectedMember);

  const handleRefresh = () => {
    console.log("Refreshing activity feed...");
  };

  const handleItemClick = (item: string, type: string) => {
    console.log(`Navigating to ${type}: ${item}`);
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-gray-600 mt-1">Stay updated with your team's latest actions and progress.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Team Member Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="min-w-[180px] justify-between hover:bg-gray-50 border-gray-200"
              >
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2 text-gray-500" />
                  {selectedMember}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-lg">
              {teamMembers.map((member) => (
                <DropdownMenuItem
                  key={member}
                  onClick={() => setSelectedMember(member)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  {member}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Refresh Button */}
          <Button 
            onClick={handleRefresh}
            className="bg-[#3A0044] hover:bg-[#3A0044]/90 text-white px-4 py-2 font-medium"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="space-y-6">
            {filteredActivities.map((activity, index) => (
              <div key={activity.id} className="flex items-start space-x-4 relative">
                {/* Timeline Line */}
                {index !== filteredActivities.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-8 bg-gray-200" />
                )}
                
                {/* Avatar */}
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-[#3A0044] text-white text-xs font-medium">
                    {activity.avatar}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {getIcon(activity.type)}
                    <span className="font-medium text-gray-900">{activity.user}</span>
                    <span className="text-gray-600">{activity.action}</span>
                  </div>
                  
                  <div className="flex items-center flex-wrap gap-1 text-sm">
                    <button
                      onClick={() => handleItemClick(activity.item, activity.type)}
                      className="text-[#3A0044] hover:underline font-medium cursor-pointer"
                    >
                      "{activity.item}"
                    </button>
                    {activity.project && (
                      <>
                        <span className="text-gray-600">in</span>
                        <button
                          onClick={() => handleItemClick(activity.project, "project")}
                          className="text-[#3A0044] hover:underline font-medium cursor-pointer"
                        >
                          {activity.project}
                        </button>
                      </>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="border-t border-gray-100 p-4 text-center">
          <Button 
            variant="outline" 
            className="hover:bg-gray-50 border-gray-200"
          >
            Load more activities
          </Button>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasks Created</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <CheckSquare className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">This week</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Comments</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <MessageCircle className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">This week</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projects</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <FolderOpen className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Active</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <User className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Active</p>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
