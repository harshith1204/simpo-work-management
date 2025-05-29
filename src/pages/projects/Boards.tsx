
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, User } from "lucide-react";

const Boards = () => {
  const columns = [
    {
      id: "backlog",
      title: "Backlog",
      color: "border-gray-300",
      tasks: [
        { id: 1, title: "User Authentication System", assignee: "Alex", priority: "High", points: 8 },
        { id: 2, title: "Database Schema Design", assignee: "Sarah", priority: "Medium", points: 5 },
        { id: 3, title: "API Documentation", assignee: "Mike", priority: "Low", points: 3 },
      ]
    },
    {
      id: "progress",
      title: "In Progress",
      color: "border-blue-300",
      tasks: [
        { id: 4, title: "Homepage Design", assignee: "Emily", priority: "High", points: 13 },
        { id: 5, title: "Payment Integration", assignee: "David", priority: "High", points: 8 },
      ]
    },
    {
      id: "review",
      title: "Review",
      color: "border-yellow-300",
      tasks: [
        { id: 6, title: "Mobile Responsive Layout", assignee: "Lisa", priority: "Medium", points: 5 },
      ]
    },
    {
      id: "done",
      title: "Done",
      color: "border-green-300",
      tasks: [
        { id: 7, title: "Project Setup", assignee: "Alex", priority: "Medium", points: 2 },
        { id: 8, title: "Environment Configuration", assignee: "Sarah", priority: "Low", points: 3 },
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 font-dm-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Board</h2>
          <p className="text-gray-600 mt-1">Kanban board for task management</p>
        </div>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card className={`h-full ${column.color} border-t-4`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>{column.title}</span>
                  <Badge variant="secondary">{column.tasks.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {column.tasks.map((task) => (
                  <Card key={task.id} className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{task.assignee}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-gray-500">{task.points}pt</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {/* Add Task Button */}
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boards;
