
import { FolderOpen, Eye, Edit, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Building a modern e-commerce solution with React and Node.js",
      status: "In Progress",
      members: 5,
      progress: 75,
    },
    {
      id: 2,
      title: "Mobile App Redesign",
      description: "Complete UI/UX overhaul for the mobile application",
      status: "Planning",
      members: 3,
      progress: 25,
    },
    {
      id: 3,
      title: "API Documentation",
      description: "Creating comprehensive API documentation for developers",
      status: "Completed",
      members: 2,
      progress: 100,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAction = (action: string, projectId: number) => {
    console.log(`${action} project ${projectId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600 mt-1">Manage your team projects and track progress</p>
        </div>
        <Button 
          onClick={() => handleAction("create", 0)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <FolderOpen className="w-8 h-8 text-blue-600" />
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900 mt-4">
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{project.description}</p>
              
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
                <span className="text-sm text-gray-600">{project.members} members</span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAction("view", project.id)}
                    className="p-2 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAction("edit", project.id)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAction("delete", project.id)}
                    className="p-2 hover:bg-red-50 hover:text-red-600"
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
