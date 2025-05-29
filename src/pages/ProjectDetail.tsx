
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, GitBranch, FileText, MessageSquare, BarChart } from "lucide-react";

const ProjectDetail = () => {
  const project = {
    id: "PRJ-001",
    name: "Website Redesign",
    description: "A comprehensive redesign of our company website to improve user experience, modernize the visual design, and optimize for mobile devices. This project includes user research, wireframing, design system creation, and development.",
    status: "In Progress",
    progress: 65,
    startDate: "2024-01-15",
    dueDate: "2024-04-15",
    budget: "$45,000",
    spent: "$28,500",
    teamMembers: [
      { id: 1, name: "Sarah Wilson", role: "Project Manager", avatar: "👩‍💼" },
      { id: 2, name: "Mike Johnson", role: "UI/UX Designer", avatar: "👨‍🎨" },
      { id: 3, name: "Emily Davis", role: "Frontend Developer", avatar: "👩‍💻" },
      { id: 4, name: "Alex Chen", role: "Backend Developer", avatar: "👨‍💻" },
    ],
    milestones: [
      { id: 1, name: "User Research Complete", status: "Completed", date: "2024-02-01" },
      { id: 2, name: "Design System Ready", status: "Completed", date: "2024-02-28" },
      { id: 3, name: "Frontend Development", status: "In Progress", date: "2024-03-31" },
      { id: 4, name: "Testing & Launch", status: "Pending", date: "2024-04-15" },
    ],
    recentActivity: [
      { id: 1, user: "Emily Davis", action: "completed task 'Mobile responsive layout'", time: "2 hours ago" },
      { id: 2, user: "Mike Johnson", action: "updated designs for landing page", time: "4 hours ago" },
      { id: 3, user: "Sarah Wilson", action: "added new milestone", time: "1 day ago" },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
          <div className="flex items-center space-x-4">
            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
            <span className="text-gray-600">{project.id}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Share</Button>
          <Button>Edit Project</Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Progress</label>
              <div className="mt-2">
                <Progress value={project.progress} className="h-2" />
                <p className="text-sm text-gray-600 mt-1">{project.progress}% complete</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Budget</label>
              <p className="text-lg font-semibold mt-1">{project.spent} / {project.budget}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Start Date</label>
              <p className="text-lg font-semibold mt-1">{project.startDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Due Date</label>
              <p className="text-lg font-semibold mt-1">{project.dueDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Description</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GitBranch className="w-5 h-5" />
                    <span>Milestones</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{milestone.name}</h4>
                          <p className="text-sm text-gray-600">{milestone.date}</p>
                        </div>
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Team Members</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart className="w-5 h-5" />
                    <span>Quick Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Tasks</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-semibold text-green-600">16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-semibold text-blue-600">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-semibold text-gray-600">3</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardContent className="p-8">
              <div className="text-center text-gray-500">
                <p>Task management interface will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardContent className="p-8">
              <div className="text-center text-gray-500">
                <p>Team management interface will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardContent className="p-8">
              <div className="text-center text-gray-500">
                <p>File management system will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardContent className="p-8">
              <div className="text-center text-gray-500">
                <p>Project reports and analytics will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
