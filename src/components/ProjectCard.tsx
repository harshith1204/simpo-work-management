
import { Calendar, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  dueDate: string;
  teamSize: number;
  onClick?: () => void;
}

const ProjectCard = ({ id, name, description, status, progress, dueDate, teamSize, onClick }: ProjectCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = () => {
    navigate(`/projects/${id}`);
  };

  const handleOpenProject = () => {
    navigate(`/projects/${id}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{dueDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{teamSize} members</span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={handleViewDetails}>
            View Details
          </Button>
          <Button size="sm" className="flex-1" onClick={handleOpenProject}>
            Open Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
