
import { Eye, EyeOff, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Subscribed = () => {
  const subscriptions = [
    {
      id: 1,
      name: "Header Navigation Redesign",
      project: "Website Redesign",
      lastActivity: "Updated by Aditi - 2h ago",
      type: "Task",
    },
    {
      id: 2,
      name: "User Authentication Bug",
      project: "Security Updates",
      lastActivity: "Commented by Alex - 4h ago",
      type: "Issue",
    },
    {
      id: 3,
      name: "Mobile App Performance",
      project: "Product Launch",
      lastActivity: "Status changed by Maya - 1d ago",
      type: "Task",
    },
    {
      id: 4,
      name: "API Rate Limiting",
      project: "Backend Optimization",
      lastActivity: "Assigned to Karan - 2d ago",
      type: "Issue",
    },
    {
      id: 5,
      name: "User Onboarding Flow",
      project: "UX Improvements",
      lastActivity: "Priority updated by Riya - 3d ago",
      type: "Task",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Task": return "bg-blue-100 text-blue-800";
      case "Issue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Subscribed</h2>
          <p className="text-gray-600 mt-1">Tasks and issues you're watching</p>
        </div>
        <Button 
          variant="outline" 
          className="px-6 py-2 rounded-lg font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
        >
          <EyeOff className="w-4 h-4 mr-2" />
          Unsubscribe All
        </Button>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-3">
        {subscriptions.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-all duration-200 border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                    <h3 className="font-semibold text-blue-600 hover:underline cursor-pointer">
                      {item.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Project:</span>
                      <span>{item.project}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{item.lastActivity}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-gray-100 hover:text-red-600 transition-colors"
                    title="Unsubscribe"
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{subscriptions.length}</div>
            <div className="text-sm text-gray-600">Total Subscriptions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {subscriptions.filter(s => s.type === "Task").length}
            </div>
            <div className="text-sm text-gray-600">Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {subscriptions.filter(s => s.type === "Issue").length}
            </div>
            <div className="text-sm text-gray-600">Issues</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscribed;
