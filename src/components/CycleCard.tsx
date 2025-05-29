
import { Calendar, TrendingUp, Users, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CycleCardProps {
  cycle: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    progress: number;
    status: string;
    totalIssues: number;
    completedIssues: number;
    team: string[];
    owner: string;
  };
}

const CycleCard = ({ cycle }: CycleCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Blocked": return "bg-red-100 text-red-800";
      case "On Track": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {cycle.name}
            </CardTitle>
            <Badge className={getStatusColor(cycle.status)}>
              {cycle.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-semibold text-gray-900">{cycle.progress}%</span>
          </div>
          <Progress value={cycle.progress} className="h-2" />
        </div>

        {/* Issues Stats */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {cycle.completedIssues} of {cycle.totalIssues} issues completed
          </span>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>

        {/* Dates */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{cycle.startDate}</span>
          </div>
          <span>→</span>
          <span>{cycle.endDate}</span>
        </div>

        {/* Owner */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Owner:</span> {cycle.owner}
        </div>

        {/* Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <div className="flex space-x-1">
              {cycle.team.map((member, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {member}
                </span>
              ))}
            </div>
          </div>
          
          <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
            <Eye className="w-4 h-4 mr-1" />
            View Cycle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CycleCard;
