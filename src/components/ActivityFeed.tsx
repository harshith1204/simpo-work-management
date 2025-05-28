
import { Clock, CheckCircle, AlertCircle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Activity {
  id: string;
  type: 'completed' | 'created' | 'assigned' | 'overdue';
  title: string;
  description: string;
  time: string;
  user: string;
}

const ActivityFeed = () => {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'completed',
      title: 'Task Completed',
      description: 'Login UI Implementation completed by John Doe',
      time: '2 hours ago',
      user: 'John Doe'
    },
    {
      id: '2',
      type: 'created',
      title: 'New Task Created',
      description: 'API Integration task created for Sprint 3',
      time: '4 hours ago',
      user: 'Jane Smith'
    },
    {
      id: '3',
      type: 'assigned',
      title: 'Task Assigned',
      description: 'Database Schema task assigned to Mike Johnson',
      time: '6 hours ago',
      user: 'Sarah Wilson'
    },
    {
      id: '4',
      type: 'overdue',
      title: 'Task Overdue',
      description: 'UI Testing task is overdue by 2 days',
      time: '1 day ago',
      user: 'System'
    }
  ];

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'created':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'assigned':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Issue Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="mt-1">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
