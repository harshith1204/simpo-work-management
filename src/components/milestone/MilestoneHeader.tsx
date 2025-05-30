
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Edit, Plus } from "lucide-react";

interface MilestoneHeaderProps {
  milestone: {
    name: string;
    status: string;
    dueDate: string;
    createdBy: string;
    createdOn: string;
  };
  getStatusColor: (status: string) => string;
}

const MilestoneHeader = ({ milestone, getStatusColor }: MilestoneHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/roadmap")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Roadmap
        </Button>
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{milestone.name}</h1>
            <Badge className={getStatusColor(milestone.status)}>
              {milestone.status}
            </Badge>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Due: {milestone.dueDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>Created by {milestone.createdBy} on {milestone.createdOn}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline">
          <Edit className="w-4 h-4 mr-2" />
          Edit Milestone
        </Button>
        <Button variant="outline">
          Change Status
        </Button>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Task/Issue
        </Button>
      </div>
    </div>
  );
};

export default MilestoneHeader;
