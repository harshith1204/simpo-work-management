
import { CheckSquare, FolderOpen, Bug, Clock, TrendingUp, Users, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const recentTasks = [
    { id: 1, title: "Design wireframes for mobile app", status: "In Progress", assignee: "Riya Sharma", dueDate: "2024-02-15" },
    { id: 2, title: "Fix mobile responsiveness issues", status: "To Do", assignee: "Karan Patel", dueDate: "2024-02-20" },
    { id: 3, title: "Create email campaign templates", status: "Done", assignee: "Aditi Singh", dueDate: "2024-02-10" },
  ];

  const recentProjects = [
    { id: 1, name: "Website Redesign", progress: 75, status: "In Progress", members: 8 },
    { id: 2, name: "Product Launch", progress: 60, status: "Active", members: 12 },
    { id: 3, name: "Marketing Q3", progress: 25, status: "Planning", members: 5 },
  ];

  const upcomingDeadlines = [
    { id: 1, title: "Design wireframes for mobile app", project: "Product Launch", dueDate: "2024-02-15", priority: "High" },
    { id: 2, title: "Implement user authentication", project: "Onboarding System", dueDate: "2024-02-18", priority: "High" },
    { id: 3, title: "Fix mobile responsiveness", project: "Website Redesign", dueDate: "2024-02-20", priority: "Medium" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Active": return "bg-purple-100 text-purple-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
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

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your team.</p>
        </div>
        <div className="text-sm text-gray-600">
          Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tasks</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <CheckSquare className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projects</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
              <FolderOpen className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">3 in progress</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Issues</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Bug className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">-1 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">5 online now</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.assignee} • Due {task.dueDate}</p>
                </div>
                <Badge className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors">
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Active Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{project.members} members</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors">
              View All Projects
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingDeadlines.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.project}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.dueDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
