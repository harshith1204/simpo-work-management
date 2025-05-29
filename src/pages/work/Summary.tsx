
import { CheckSquare, Clock, AlertTriangle, Calendar, FolderOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const Summary = () => {
  const [timeFilter, setTimeFilter] = useState("week");

  const statusCards = [
    { title: "Tasks Assigned to You", value: 6, icon: CheckSquare, color: "blue" },
    { title: "Tasks Completed", value: 12, icon: CheckSquare, color: "green" },
    { title: "Tasks Due This Week", value: 3, icon: Clock, color: "yellow" },
    { title: "Overdue Tasks", value: 1, icon: AlertTriangle, color: "red" },
  ];

  const tasks = [
    { title: "Review API Documentation", type: "Task", dueDate: "2024-02-20", status: "In Progress" },
    { title: "Fix login bug", type: "Issue", dueDate: "2024-02-18", status: "Open" },
    { title: "Update user interface", type: "Task", dueDate: "2024-02-22", status: "To Do" },
    { title: "Performance optimization", type: "Issue", dueDate: "2024-02-25", status: "In Progress" },
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

      {/* Tasks and Issues */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Work Items</h3>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {task.type === "Task" ? (
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-xs font-medium text-gray-500 uppercase">{task.type}</span>
                  </div>
                  <span className="font-medium text-gray-900">{task.title}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{task.dueDate}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                    task.status === "Open" ? "bg-red-100 text-red-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
