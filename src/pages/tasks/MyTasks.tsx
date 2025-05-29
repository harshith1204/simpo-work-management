import { useState } from "react";
import { CheckSquare, Plus, Calendar, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import AddTaskDrawer from "@/components/AddTaskDrawer";
import { useToast } from "@/hooks/use-toast";

const MyTasks = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Review pull request for authentication module",
      completed: false,
      priority: "High",
      dueDate: "2024-02-16",
      project: "Security Updates",
      tags: ["code-review", "backend"],
      timeEstimate: "2 hours",
    },
    {
      id: 2,
      title: "Update user interface wireframes",
      completed: false,
      priority: "Medium",
      dueDate: "2024-02-18",
      project: "Website Redesign",
      tags: ["design", "ui/ux"],
      timeEstimate: "4 hours",
    },
    {
      id: 3,
      title: "Write unit tests for payment processing",
      completed: true,
      priority: "High",
      dueDate: "2024-02-15",
      project: "E-commerce Platform",
      tags: ["testing", "backend"],
      timeEstimate: "6 hours",
    },
    {
      id: 4,
      title: "Optimize database queries for reports",
      completed: false,
      priority: "Low",
      dueDate: "2024-02-22",
      project: "Performance Improvements",
      tags: ["optimization", "database"],
      timeEstimate: "3 hours",
    },
    {
      id: 5,
      title: "Create documentation for API endpoints",
      completed: false,
      priority: "Medium",
      dueDate: "2024-02-20",
      project: "Developer Tools",
      tags: ["documentation", "api"],
      timeEstimate: "5 hours",
    },
    {
      id: 6,
      title: "Set up CI/CD pipeline for staging environment",
      completed: true,
      priority: "High",
      dueDate: "2024-02-14",
      project: "DevOps Infrastructure",
      tags: ["devops", "automation"],
      timeEstimate: "8 hours",
    },
  ]);

  const { toast } = useToast();

  const handleAddTask = (newTask: any) => {
    const taskWithId = {
      ...newTask,
      id: Math.max(...tasks.map(t => t.id)) + 1,
      completed: false,
      timeEstimate: "2 hours" // Default estimate
    };
    setTasks([taskWithId, ...tasks]);
    toast({
      title: "Task added to your list",
      description: `"${newTask.title}" has been added to your tasks.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
          <p className="text-gray-600 mt-1">{activeTasks.length} active tasks, {completedTasks.length} completed</p>
        </div>
        <Button 
          className="bg-[#270E2B] hover:bg-[#270E2B]/90 text-white px-6 py-2 rounded-lg font-medium active:scale-95 transition-all duration-150"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{activeTasks.length}</div>
            <div className="text-sm text-gray-600">Active Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {activeTasks.filter(t => t.priority === "High").length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {activeTasks.filter(t => new Date(t.dueDate) <= new Date()).length}
            </div>
            <div className="text-sm text-gray-600">Due Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Tasks */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Tasks</h3>
        <div className="space-y-3">
          {activeTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Checkbox className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Star className="w-4 h-4 text-gray-400 hover:text-yellow-500 cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{task.dueDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{task.timeEstimate}</span>
                      </div>
                      <span className="font-medium">{task.project}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Tasks */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Completed</h3>
        <div className="space-y-3">
          {completedTasks.map((task) => (
            <Card key={task.id} className="opacity-75">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Checkbox checked className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-600 line-through">{task.title}</h4>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckSquare className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{task.dueDate}</span>
                      </div>
                      <span className="font-medium">{task.project}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs opacity-60">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AddTaskDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default MyTasks;
