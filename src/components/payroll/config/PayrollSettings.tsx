
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings } from "lucide-react";

interface PayrollSettingsProps {
  onComplete: () => void;
}

const PayrollSettings = ({ onComplete }: PayrollSettingsProps) => {
  const [settings, setSettings] = useState({
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
            <Label>Payroll Frequency</Label>
            <Select onValueChange={(value) => setSettings({...settings, payrollFrequency: value})}>
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
              value={settings.cycleStartDate}
              onChange={(e) => setSettings({...settings, cycleStartDate: e.target.value})}
            />
          </div>

          <div>
            <Label>Salary Disbursement Day</Label>
            <Select onValueChange={(value) => setSettings({...settings, disbursementDay: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st of month</SelectItem>
                <SelectItem value="5">5th of month</SelectItem>
                <SelectItem value="7">7th of month</SelectItem>
                <SelectItem value="15">15th of month</SelectItem>
                <SelectItem value="25">25th of month</SelectItem>
                <SelectItem value="last">Last working day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Default Salary Structure</Label>
            <Select onValueChange={(value) => setSettings({...settings, defaultSalaryStructure: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select structure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Structure</SelectItem>
                <SelectItem value="executive">Executive Structure</SelectItem>
                <SelectItem value="junior">Junior Staff Structure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium">Prorata Calculation Rule</Label>
          <RadioGroup 
            value={settings.prorataRule} 
            onValueChange={(value) => setSettings({...settings, prorataRule: value})}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="calendar" id="calendar" />
              <Label htmlFor="calendar">Calendar Days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="working" id="working" />
              <Label htmlFor="working">Working Days</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Auto-lock After Approval</Label>
              <p className="text-sm text-gray-600">Automatically lock payroll after final approval</p>
            </div>
            <Switch
              checked={settings.autoLock}
              onCheckedChange={(checked) => setSettings({...settings, autoLock: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Gratuity Calculation</Label>
              <p className="text-sm text-gray-600">Calculate gratuity for eligible employees</p>
            </div>
            <Switch
              checked={settings.enableGratuity}
              onCheckedChange={(checked) => setSettings({...settings, enableGratuity: checked})}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Payroll Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollSettings;
