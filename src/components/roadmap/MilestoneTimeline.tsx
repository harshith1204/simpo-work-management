
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target } from "lucide-react";

interface Milestone {
  id: number;
  name: string;
  targetDate: string;
  status: string;
  owner: string;
  description: string;
  progress: number;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
  onViewMilestone: (milestoneId: number) => void;
  getStatusColor: (status: string) => string;
}

const MilestoneTimeline = ({ milestones, onViewMilestone, getStatusColor }: MilestoneTimelineProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Recent Milestones</h3>
      {milestones.map((milestone, index) => (
        <Card key={milestone.id} className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              {/* Timeline Indicator */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                {index !== milestones.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{milestone.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status}
                      </Badge>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Target: {milestone.targetDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-600">
                    <span className="font-medium">Owner:</span> {milestone.owner}
                  </div>
                  <div className="font-medium text-blue-600">{milestone.progress}% Complete</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MilestoneTimeline;
