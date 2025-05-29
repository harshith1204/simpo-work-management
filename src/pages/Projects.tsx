
import { FolderOpen, Eye, Edit, Trash2, Plus, Users, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Website Redesign",
      description: "Complete overhaul of company website with modern design and improved UX",
      status: "In Progress",
      members: 8,
      progress: 75,
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      lead: "Riya Sharma",
      priority: "High",
    },
    {
      id: 2,
      title: "Marketing Q3 Campaign",
      description: "Comprehensive marketing strategy and campaign execution for Q3 goals",
      status: "Planning",
      members: 5,
      progress: 25,
      startDate: "2024-02-01",
      endDate: "2024-05-30",
      lead: "Aditi Singh",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Product Launch",
      description: "Launch preparation and go-to-market strategy for new product line",
      status: "Active",
      members: 12,
      progress: 60,
      startDate: "2024-01-01",
      endDate: "2024-04-30",
      lead: "Alex Johnson",
      priority: "High",
    },
    {
      id: 4,
      title: "Onboarding System",
      description: "Develop automated onboarding system for new employees",
      status: "Completed",
      members: 4,
      progress: 100,
      startDate: "2023-11-01",
      endDate: "2024-01-31",
      lead: "Maya Gupta",
      priority: "Medium",
    },
    {
      id: 5,
      title: "Mobile App Development",
      description: "Native mobile application for iOS and Android platforms",
      status: "In Progress",
      members: 6,
      progress: 40,
      startDate: "2024-01-20",
      endDate: "2024-06-30",
      lead: "Karan Patel",
      priority: "High",
    },
    {
      id: 6,
      title: "Data Analytics Platform",
      description: "Internal analytics dashboard for business intelligence",
      status: "Planning",
      members: 3,
      progress: 15,
      startDate: "2024-03-01",
      endDate: "2024-08-15",
      lead: "Riya Sharma",
      priority: "Low",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Active": return "bg-purple-100 text-purple-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
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

  const handleAction = (action: string, projectId: number) => {
    console.log(`${action} project ${projectId}`);
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Active Projects</h2>
          <p className="text-gray-600 mt-1">Manage your team projects and track progress</p>
        </div>
        <Button 
          onClick={() => handleAction("create", 0)}
          className="bg-[#3A0044] hover:bg-[#3A0044]/90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">6</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-600">Planning</div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200 border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <FolderOpen className="w-8 h-8 text-blue-600" />
                <div className="flex space-x-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900 mt-4">
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
              
              {/* Project Lead */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Led by {project.lead}</span>
              </div>

              {/* Timeline */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{project.startDate} - {project.endDate}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{project.members} members</span>
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAction("view", project.id)}
                    className="p-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAction("edit", project.id)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAction("delete", project.id)}
                    className="p-2 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
