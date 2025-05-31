
import { Card, CardContent } from "@/components/ui/card";

interface Activity {
  id: number;
  action: string;
  user: string;
  timestamp: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex items-start space-x-3">
          {/* Timeline dot */}
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            {index < activities.length - 1 && (
              <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
            )}
          </div>
          
          {/* Activity content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 font-medium">
              {activity.action}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-600">{activity.user}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{activity.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;
