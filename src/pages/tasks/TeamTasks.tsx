
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckSquare } from "lucide-react";

const TeamTasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Design new dashboard layout",
      assignee: "Sarah Chen",
      project: "Website Redesign",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-02-20",
    },
    {
      id: 2,
      title: "Implement user authentication",
      assignee: "Alex Rodriguez",
      project: "Mobile App",
      priority: "Critical",
      status: "In Progress",
      dueDate: "2024-02-18",
    },
    {
      id: 3,
      title: "Write API documentation",
      assignee: "Mike Johnson",
      project: "Backend API",
      priority: "Medium",
      status: "To Do",
      dueDate: "2024-02-25",
    },
    {
      id: 4,
      title: "Create user onboarding flow",
      assignee: "Emily Davis",
      project: "UX Improvements",
      priority: "Medium",
      status: "Review",
      dueDate: "2024-02-22",
    },
    {
      id: 5,
      title: "Optimize database queries",
      assignee: "David Park",
      project: "Performance",
      priority: "Low",
      status: "To Do",
      dueDate: "2024-03-01",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Review": return "bg-purple-100 text-purple-800";
      case "To Do": return "bg-gray-100 text-gray-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Team Tasks</h2>
        <p className="text-gray-600 mt-1">View and manage tasks assigned to team members</p>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <CheckSquare className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span className="font-medium">{task.assignee}</span>
                        <span className="text-gray-400">•</span>
                        <span>{task.project}</span>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due {task.dueDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamTasks;
