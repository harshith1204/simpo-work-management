
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface AttendanceSettingsProps {
  onComplete: () => void;
}

const AttendanceSettings = ({ onComplete }: AttendanceSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Attendance Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Configure attendance logic that integrates with payroll.</p>
        <Button onClick={onComplete}>Save Attendance Settings</Button>
      </CardContent>
    </Card>
  );
};

export default AttendanceSettings;
