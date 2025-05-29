
import { CheckSquare, Plus, Filter, MoreHorizontal, User, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Tasks = () => {
  const [selectedView, setSelectedView] = useState("list");

  const tasks = [
    {
      id: 1,
      title: "Design wireframes for mobile app",
      assignee: "Riya Sharma",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-02-15",
      project: "Product Launch",
      labels: ["Design", "Mobile"],
    },
    {
      id: 2,
      title: "Fix mobile responsiveness issues",
      assignee: "Karan Patel",
      status: "To Do",
      priority: "Medium",
      dueDate: "2024-02-20",
      project: "Website Redesign",
      labels: ["Bug", "Frontend"],
    },
    {
      id: 3,
      title: "Create email campaign templates",
      assignee: "Aditi Singh",
      status: "Done",
      priority: "Low",
      dueDate: "2024-02-10",
      project: "Marketing Q3",
      labels: ["Marketing", "Content"],
    },
    {
      id: 4,
      title: "Implement user authentication flow",
      assignee: "Alex Johnson",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-02-18",
      project: "Onboarding System",
      labels: ["Backend", "Security"],
    },
    {
      id: 5,
      title: "Write API documentation",
      assignee: "Maya Gupta",
      status: "Review",
      priority: "Medium",
      dueDate: "2024-02-22",
      project: "Product Launch",
      labels: ["Documentation", "API"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Review": return "bg-yellow-100 text-yellow-800";
      case "To Do": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateTask = () => {
    console.log("Creating new task...");
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
          <p className="text-gray-600 mt-1">Track and manage your assigned tasks</p>
        </div>
        <Button 
          onClick={handleCreateTask}
          className="bg-[#3A0044] hover:bg-[#3A0044]/90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Filters and Views */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedView("list")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedView === "list" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setSelectedView("board")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedView === "board" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Board
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-all duration-200 border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckSquare className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{task.project}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {task.labels.map((label, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">2</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tasks;
