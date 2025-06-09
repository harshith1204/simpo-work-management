
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

interface PayrollGeneralSettingsProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const PayrollGeneralSettings = ({ onNext, onPrevious, isFirst, isLast }: PayrollGeneralSettingsProps) => {
  const [settings, setSettings] = useState({
    payFrequency: "",
    disbursementDate: "",
    workDaysPerWeek: "",
    considerWeekendsHolidays: false,
    autoProcessPayroll: false,
    overtimeCalculation: false,
    leaveDeductions: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>General Payroll Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payFrequency">Pay Frequency *</Label>
              <Select value={settings.payFrequency} onValueChange={(value) => setSettings({ ...settings, payFrequency: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="disbursementDate">Salary Disbursement Date *</Label>
              <Select value={settings.disbursementDate} onValueChange={(value) => setSettings({ ...settings, disbursementDate: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st of every month</SelectItem>
                  <SelectItem value="5">5th of every month</SelectItem>
                  <SelectItem value="7">7th of every month</SelectItem>
                  <SelectItem value="last">Last working day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="workDaysPerWeek">Work Days per Week *</Label>
            <Select value={settings.workDaysPerWeek} onValueChange={(value) => setSettings({ ...settings, workDaysPerWeek: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select work days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Days (Mon-Fri)</SelectItem>
                <SelectItem value="6">6 Days (Mon-Sat)</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Consider Weekends as Holidays</Label>
                <p className="text-sm text-gray-600">Automatically mark weekends as non-working days</p>
              </div>
              <Switch
                checked={settings.considerWeekendsHolidays}
                onCheckedChange={(checked) => setSettings({ ...settings, considerWeekendsHolidays: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Process Payroll</Label>
                <p className="text-sm text-gray-600">Automatically process payroll on disbursement date</p>
              </div>
              <Switch
                checked={settings.autoProcessPayroll}
                onCheckedChange={(checked) => setSettings({ ...settings, autoProcessPayroll: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Overtime Calculation</Label>
                <p className="text-sm text-gray-600">Enable overtime calculation for extra hours</p>
              </div>
              <Switch
                checked={settings.overtimeCalculation}
                onCheckedChange={(checked) => setSettings({ ...settings, overtimeCalculation: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Leave Deductions</Label>
                <p className="text-sm text-gray-600">Deduct salary for unpaid leaves</p>
              </div>
              <Switch
                checked={settings.leaveDeductions}
                onCheckedChange={(checked) => setSettings({ ...settings, leaveDeductions: checked })}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrevious} disabled={isFirst}>
              Previous
            </Button>
            <Button type="submit">
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PayrollGeneralSettings;
