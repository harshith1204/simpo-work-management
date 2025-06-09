
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface NotificationSettingsProps {
  onComplete: () => void;
}

const NotificationSettings = ({ onComplete }: NotificationSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span>Notification Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Manage automated alerts and reminders.</p>
        <Button onClick={onComplete}>Save Notification Settings</Button>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
