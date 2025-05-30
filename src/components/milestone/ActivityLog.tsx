
import { Card, CardContent } from "@/components/ui/card";

interface Activity {
  id: number;
  action: string;
  user: string;
  timestamp: string;
}

interface ActivityLogProps {
  activities: Activity[];
}

const ActivityLog = ({ activities }: ActivityLogProps) => {
  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <Card key={activity.id}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-900">{activity.action}</p>
                <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                  <span>{activity.user}</span>
                  <span>•</span>
                  <span>{activity.timestamp}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActivityLog;
