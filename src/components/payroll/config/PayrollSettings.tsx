
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

interface PayrollSettingsProps {
  onComplete: () => void;
}

const PayrollSettings = ({ onComplete }: PayrollSettingsProps) => {
  const [formData, setFormData] = useState({
    payrollFrequency: "",
    cycleStartDate: "",
    disbursementDay: "",
    prorataRule: "calendar",
    autoLock: false,
    enableGratuity: false,
    defaultSalaryStructure: ""
  });

  const handleSave = () => {
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Payroll Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="payrollFrequency">Payroll Frequency</Label>
            <Select onValueChange={(value) => setFormData({...formData, payrollFrequency: value})}>
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
            <Label htmlFor="cycleStartDate">Payroll Cycle Start Date</Label>
            <Input
              id="cycleStartDate"
              type="date"
              value={formData.cycleStartDate}
              onChange={(e) => setFormData({...formData, cycleStartDate: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="disbursementDay">Salary Disbursement Day</Label>
            <Input
              id="disbursementDay"
              type="number"
              min="1"
              max="31"
              value={formData.disbursementDay}
              onChange={(e) => setFormData({...formData, disbursementDay: e.target.value})}
              placeholder="Enter day of month"
            />
          </div>

          <div>
            <Label htmlFor="defaultSalaryStructure">Default Salary Structure</Label>
            <Select onValueChange={(value) => setFormData({...formData, defaultSalaryStructure: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select structure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Structure</SelectItem>
                <SelectItem value="executive">Executive Structure</SelectItem>
                <SelectItem value="trainee">Trainee Structure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Prorata Rule</Label>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="prorataRule"
                value="calendar"
                checked={formData.prorataRule === "calendar"}
                onChange={(e) => setFormData({...formData, prorataRule: e.target.value})}
              />
              <span>Calendar Days</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="prorataRule"
                value="working"
                checked={formData.prorataRule === "working"}
                onChange={(e) => setFormData({...formData, prorataRule: e.target.value})}
              />
              <span>Working Days</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="autoLock">Enable Auto-lock Payroll After Approval</Label>
          <Switch
            id="autoLock"
            checked={formData.autoLock}
            onCheckedChange={(checked) => setFormData({...formData, autoLock: checked})}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="enableGratuity">Enable Gratuity</Label>
          <Switch
            id="enableGratuity"
            checked={formData.enableGratuity}
            onCheckedChange={(checked) => setFormData({...formData, enableGratuity: checked})}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Payroll Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollSettings;
