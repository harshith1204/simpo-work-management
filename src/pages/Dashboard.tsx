
import { CheckSquare, Clock, AlertTriangle, TrendingUp, Users, Calendar } from "lucide-react";
import StatCard from "@/components/StatCard";
import DonutChart from "@/components/DonutChart";
import BarChart from "@/components/BarChart";
import ActivityFeed from "@/components/ActivityFeed";
import ProjectCard from "@/components/ProjectCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getCurrentDateTime = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const assignedByStateData = [
    { name: 'To Do', value: 12, color: '#8B5CF6' },
    { name: 'In Progress', value: 8, color: '#3B82F6' },
    { name: 'In Review', value: 5, color: '#F59E0B' },
    { name: 'Completed', value: 23, color: '#10B981' }
  ];

  const priorityData = [
    { name: 'High', value: 8 },
    { name: 'Medium', value: 15 },
    { name: 'Low', value: 12 },
    { name: 'Critical', value: 3 }
  ];

  const recentProjects = [
    {
      name: 'E-commerce Platform',
      description: 'Building a modern e-commerce solution with React and Node.js',
      status: 'active' as const,
      progress: 75,
      dueDate: 'Dec 15, 2024',
      teamSize: 6
    },
    {
      name: 'Mobile App Redesign',
      description: 'Complete UI/UX overhaul for the mobile application',
      status: 'active' as const,
      progress: 45,
      dueDate: 'Jan 20, 2025',
      teamSize: 4
    },
    {
      name: 'API Integration',
      description: 'Third-party API integration for payment processing',
      status: 'paused' as const,
      progress: 30,
      dueDate: 'Nov 30, 2024',
      teamSize: 3
    }
  ];

  const pendingTasks = [
    { id: 1, title: 'Implement user authentication', priority: 'High', dueDate: '2024-11-28', assignee: 'John Doe' },
    { id: 2, title: 'Design dashboard wireframes', priority: 'Medium', dueDate: '2024-11-30', assignee: 'Jane Smith' },
    { id: 3, title: 'Set up CI/CD pipeline', priority: 'High', dueDate: '2024-12-02', assignee: 'Mike Johnson' },
    { id: 4, title: 'Write API documentation', priority: 'Low', dueDate: '2024-12-05', assignee: 'Sarah Wilson' }
  ];

  const completedTasks = [
    { id: 5, title: 'Create project structure', priority: 'High', completedDate: '2024-11-25', assignee: 'John Doe' },
    { id: 6, title: 'Setup development environment', priority: 'Medium', completedDate: '2024-11-24', assignee: 'Team' }
  ];

  const collaborators = [
    { name: 'John Doe', role: 'Frontend Developer', avatar: 'JD', status: 'online' },
    { name: 'Jane Smith', role: 'UI/UX Designer', avatar: 'JS', status: 'away' },
    { name: 'Mike Johnson', role: 'Backend Developer', avatar: 'MJ', status: 'online' },
    { name: 'Sarah Wilson', role: 'Product Manager', avatar: 'SW', status: 'offline' },
    { name: 'Alex Brown', role: 'DevOps Engineer', avatar: 'AB', status: 'online' }
  ];

  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getCurrentGreeting()}, Harshita
        </h1>
        <p className="text-gray-600 flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{getCurrentDateTime()}</span>
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Issues Assigned"
          value="24"
          icon={CheckSquare}
          description="3 due today"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Issues Overdue"
          value="3"
          icon={Clock}
          description="Needs attention"
          trend={{ value: -25, isPositive: false }}
        />
        <StatCard
          title="Issues Created"
          value="48"
          icon={TrendingUp}
          description="This month"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Issues Completed"
          value="156"
          icon={AlertTriangle}
          description="Total completed"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Assigned to You Section */}
          <Card>
            <CardHeader>
              <CardTitle>Assigned to You</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="space-y-4 mt-4">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          task.priority === 'High' ? 'bg-red-100 text-red-800' :
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-sm text-gray-500">{task.dueDate}</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="completed" className="space-y-4 mt-4">
                  {completedTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600">Completed by: {task.assignee}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Completed: {task.completedDate}</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Assigned by State</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart data={assignedByStateData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assigned by Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={priorityData} />
              </CardContent>
            </Card>
          </div>

          {/* Recent Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentProjects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Activity Feed */}
          <ActivityFeed />

          {/* Collaborators */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Collaborators</CardTitle>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {collaborators.map((collaborator, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {collaborator.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        collaborator.status === 'online' ? 'bg-green-400' :
                        collaborator.status === 'away' ? 'bg-yellow-400' :
                        'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{collaborator.name}</p>
                      <p className="text-sm text-gray-500">{collaborator.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
