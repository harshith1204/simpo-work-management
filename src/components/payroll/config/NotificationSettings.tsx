
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

interface NotificationSettingsProps {
  onComplete: () => void;
}

const NotificationSettings = ({ onComplete }: NotificationSettingsProps) => {
  const [formData, setFormData] = useState({
    notifyEmployeesOnPayslip: true,
    notifyHROnPendingPayroll: true,
    complianceDeadlineAlerts: true,
    weeklyPayrollSummary: true,
    summaryDay: "friday",
    emailNotifications: true,
    smsNotifications: false
  });

  const handleSave = () => {
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span>Notification Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Notify Employees When Payslip is Generated</Label>
              <p className="text-sm text-gray-500">Send automatic notifications when payslips are ready</p>
            </div>
            <Switch
              checked={formData.notifyEmployeesOnPayslip}
              onCheckedChange={(checked) => setFormData({...formData, notifyEmployeesOnPayslip: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Notify HR/Admin on Pending Payroll</Label>
              <p className="text-sm text-gray-500">Alert HR when payroll needs attention or approval</p>
            </div>
            <Switch
              checked={formData.notifyHROnPendingPayroll}
              onCheckedChange={(checked) => setFormData({...formData, notifyHROnPendingPayroll: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Compliance Deadline Alerts</Label>
              <p className="text-sm text-gray-500">Remind about statutory filing deadlines (PF, ESI, TDS)</p>
            </div>
            <Switch
              checked={formData.complianceDeadlineAlerts}
              onCheckedChange={(checked) => setFormData({...formData, complianceDeadlineAlerts: checked})}
            />
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Payroll Summary to Admin</Label>
                <p className="text-sm text-gray-500">Send weekly summary of payroll activities</p>
              </div>
              <Switch
                checked={formData.weeklyPayrollSummary}
                onCheckedChange={(checked) => setFormData({...formData, weeklyPayrollSummary: checked})}
              />
            </div>
            {formData.weeklyPayrollSummary && (
              <div>
                <Label>Summary Day</Label>
                <Select onValueChange={(value) => setFormData({...formData, summaryDay: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={formData.summaryDay} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">Notification Channels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Send notifications via email</p>
              </div>
              <Switch
                checked={formData.emailNotifications}
                onCheckedChange={(checked) => setFormData({...formData, emailNotifications: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-500">Send notifications via SMS (requires SMS gateway setup)</p>
              </div>
              <Switch
                checked={formData.smsNotifications}
                onCheckedChange={(checked) => setFormData({...formData, smsNotifications: checked})}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Notification Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
