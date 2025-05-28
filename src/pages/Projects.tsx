
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      status: "In Progress",
      members: ["👤", "👤", "👤"],
      lastUpdated: "2 hours ago",
      progress: 65
    },
    {
      id: 2,
      name: "Mobile App Development",
      status: "Planning",
      members: ["👤", "👤"],
      lastUpdated: "1 day ago",
      progress: 25
    },
    {
      id: 3,
      name: "API Integration",
      status: "Completed",
      members: ["👤", "👤", "👤", "👤"],
      lastUpdated: "3 days ago",
      progress: 100
    },
    {
      id: 4,
      name: "User Research",
      status: "In Progress",
      members: ["👤", "👤"],
      lastUpdated: "5 hours ago",
      progress: 40
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button className="swiss-button">Create New Project</Button>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">Sort</Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="swiss-card hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {project.members.map((member, index) => (
                    <div key={index} className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-sm">
                      {member}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-gray-500">{project.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
