
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Clock } from "lucide-react";

interface AttendanceSettingsProps {
  onComplete: () => void;
}

const AttendanceSettings = ({ onComplete }: AttendanceSettingsProps) => {
  const [formData, setFormData] = useState({
    attendanceSource: "",
    enableOvertime: false,
    markLOPOnMissing: false,
    gracePeriod: 15,
    syncWithPayroll: true
  });

  const handleSave = () => {
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Attendance Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Attendance Source</Label>
          <Select onValueChange={(value) => setFormData({...formData, attendanceSource: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select attendance source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual Entry</SelectItem>
              <SelectItem value="biometric">Biometric Device</SelectItem>
              <SelectItem value="app">Mobile App</SelectItem>
            </SelectContent>
          </Select>
          {formData.attendanceSource === "biometric" && (
            <p className="text-sm text-gray-500 mt-2">
              Upload attendance data or configure device sync
            </p>
          )}
        </div>

        <div>
          <Label>Grace Period (minutes)</Label>
          <Input
            type="number"
            value={formData.gracePeriod}
            onChange={(e) => setFormData({...formData, gracePeriod: parseInt(e.target.value)})}
            placeholder="Enter grace period in minutes"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Overtime Tracking</Label>
              <p className="text-sm text-gray-500">Track overtime hours for payroll calculation</p>
            </div>
            <Switch
              checked={formData.enableOvertime}
              onCheckedChange={(checked) => setFormData({...formData, enableOvertime: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Mark LOP on Missing Attendance</Label>
              <p className="text-sm text-gray-500">Automatically mark Loss of Pay for missing attendance</p>
            </div>
            <Switch
              checked={formData.markLOPOnMissing}
              onCheckedChange={(checked) => setFormData({...formData, markLOPOnMissing: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Sync Attendance with Payroll</Label>
              <p className="text-sm text-gray-500">Automatically integrate attendance data in payroll processing</p>
            </div>
            <Switch
              checked={formData.syncWithPayroll}
              onCheckedChange={(checked) => setFormData({...formData, syncWithPayroll: checked})}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Attendance Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceSettings;
