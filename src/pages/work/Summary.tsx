
import { CheckSquare, Clock, AlertTriangle, Plus, FolderOpen, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Summary = () => {
  const [timeFilter, setTimeFilter] = useState("week");

  const statusCards = [
    { title: "Tasks Assigned to You", value: 6, icon: CheckSquare, color: "blue" },
    { title: "Tasks Completed", value: 12, icon: CheckSquare, color: "green" },
    { title: "Tasks Due This Week", value: 3, icon: Clock, color: "yellow" },
    { title: "Overdue Tasks", value: 1, icon: AlertTriangle, color: "red" },
  ];

  const recentUpdates = [
    { action: "You commented on 'Header Redesign' task", time: "2h ago" },
    { action: "You updated priority in 'User Feedback Flow'", time: "4h ago" },
    { action: "You marked 'Mobile Navigation' as complete", time: "1d ago" },
    { action: "You created task 'API Documentation'", time: "2d ago" },
  ];

  const getCardColor = (color: string) => {
    switch (color) {
      case "blue": return "border-blue-200 bg-blue-50";
      case "green": return "border-green-200 bg-green-50";
      case "yellow": return "border-yellow-200 bg-yellow-50";
      case "red": return "border-red-200 bg-red-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-600";
      case "green": return "text-green-600";
      case "yellow": return "text-yellow-600";
      case "red": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Summary</h2>
          <p className="text-gray-600 mt-1">Overview of your work and progress</p>
        </div>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg">
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className={`${getCardColor(card.color)} border-2 hover:shadow-md transition-shadow duration-200`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${getCardColor(card.color)}`}>
                    <Icon className={`w-6 h-6 ${getIconColor(card.color)}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex space-x-4">
            <Button className="bg-[#3A0044] hover:bg-[#3A0044]/90 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Create New Task
            </Button>
            <Button variant="outline" className="px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              <FolderOpen className="w-4 h-4 mr-2" />
              View My Projects
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Updates */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
          <div className="space-y-4">
            {recentUpdates.map((update, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{update.action}</p>
                </div>
                <span className="text-xs text-gray-500">{update.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
