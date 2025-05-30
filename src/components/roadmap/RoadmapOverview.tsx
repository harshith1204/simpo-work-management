
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface Roadmap {
  id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
  milestones: number;
}

interface RoadmapOverviewProps {
  roadmaps: Roadmap[];
  onViewRoadmap: (roadmapId: number) => void;
  getStatusColor: (status: string) => string;
}

const RoadmapOverview = ({ roadmaps, onViewRoadmap, getStatusColor }: RoadmapOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {roadmaps.map((roadmap) => (
        <Card key={roadmap.id} className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{roadmap.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{roadmap.description}</p>
              </div>
              <Badge className={getStatusColor(roadmap.status)}>
                {roadmap.status}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{roadmap.milestones} milestones</span>
                <span className="font-medium">{roadmap.progress}% complete</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${roadmap.progress}%` }}
                ></div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => onViewRoadmap(roadmap.id)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RoadmapOverview;
