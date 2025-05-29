
import { MessageSquare, Edit, Plus, CheckSquare, Clock, ToggleLeft, ToggleRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Activity = () => {
  const [viewMode, setViewMode] = useState<"my" | "team">("my");

  const myActivity = [
    {
      id: 1,
      type: "comment",
      icon: MessageSquare,
      description: "You commented on 'Header Redesign' task",
      timestamp: "2 hours ago",
      project: "Website Redesign",
    },
    {
      id: 2,
      type: "update",
      icon: Edit,
      description: "You changed priority in 'User Feedback Flow'",
      timestamp: "4 hours ago",
      project: "UX Research",
    },
    {
      id: 3,
      type: "complete",
      icon: CheckSquare,
      description: "You marked 'Mobile Navigation' as complete",
      timestamp: "1 day ago",
      project: "Product Launch",
    },
    {
      id: 4,
      type: "create",
      icon: Plus,
      description: "You created task 'API Documentation'",
      timestamp: "2 days ago",
      project: "Backend Development",
    },
  ];

  const teamActivity = [
    {
      id: 1,
      type: "comment",
      icon: MessageSquare,
      description: "Aditi commented on 'Database Optimization'",
      timestamp: "1 hour ago",
      project: "Performance",
      user: "Aditi Singh",
    },
    {
      id: 2,
      type: "update",
      icon: Edit,
      description: "Alex updated status of 'Security Audit'",
      timestamp: "3 hours ago",
      project: "Security",
      user: "Alex Johnson",
    },
    {
      id: 3,
      type: "create",
      icon: Plus,
      description: "Maya created new issue 'Login Form Bug'",
      timestamp: "5 hours ago",
      project: "Bug Fixes",
      user: "Maya Gupta",
    },
    {
      id: 4,
      type: "complete",
      icon: CheckSquare,
      description: "Karan completed 'Code Review Process'",
      timestamp: "1 day ago",
      project: "Development",
      user: "Karan Patel",
    },
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case "comment": return "text-blue-600";
      case "update": return "text-yellow-600";
      case "complete": return "text-green-600";
      case "create": return "text-purple-600";
      default: return "text-gray-600";
    }
  };

  const currentActivity = viewMode === "my" ? myActivity : teamActivity;

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {viewMode === "my" ? "My Activity" : "Team Activity"}
          </h2>
          <p className="text-gray-600 mt-1">
            {viewMode === "my" 
              ? "Recent actions you have performed" 
              : "Recent actions by your team members"
            }
          </p>
        </div>
        
        {/* Toggle */}
        <div className="flex items-center space-x-4">
          <span className={`text-sm font-medium ${viewMode === "my" ? "text-gray-900" : "text-gray-500"}`}>
            My Activity
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode(viewMode === "my" ? "team" : "my")}
            className="p-1"
          >
            {viewMode === "my" ? (
              <ToggleLeft className="w-8 h-8 text-gray-400" />
            ) : (
              <ToggleRight className="w-8 h-8 text-[#3A0044]" />
            )}
          </Button>
          <span className={`text-sm font-medium ${viewMode === "team" ? "text-gray-900" : "text-gray-500"}`}>
            Team Activity
          </span>
        </div>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {currentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-full bg-gray-100 ${getIconColor(activity.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-1">{activity.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{activity.timestamp}</span>
                      </div>
                      <span>•</span>
                      <span className="font-medium">{activity.project}</span>
                      {viewMode === "team" && (
                        <>
                          <span>•</span>
                          <span>{(activity as any).user}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-6">
            <Button 
              variant="outline" 
              className="px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Load More Activity
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;
