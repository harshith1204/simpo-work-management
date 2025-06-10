
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Settings } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PayrollSettingsProps {
  onComplete: () => void;
}

const PayrollSettings = ({ onComplete }: PayrollSettingsProps) => {
  const [settings, setSettings] = useState({
    payrollFrequency: "",
    cycleStartDate: undefined as Date | undefined,
    disbursementDay: "",
    prorataRule: "calendar",
    autoLock: false,
    enableGratuity: false,
    defaultSalaryStructure: ""
  });

  const updateSettings = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving payroll settings:", settings);
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
      <CardContent className="space-y-8">
        {/* Basic Payroll Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Payroll Frequency</Label>
            <Select onValueChange={(value) => updateSettings('payrollFrequency', value)}>
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

          <div className="space-y-2">
            <Label>Payroll Cycle Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !settings.cycleStartDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {settings.cycleStartDate ? format(settings.cycleStartDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={settings.cycleStartDate}
                  onSelect={(date) => updateSettings('cycleStartDate', date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Salary Disbursement Day</Label>
            <Select onValueChange={(value) => updateSettings('disbursementDay', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st of month</SelectItem>
                <SelectItem value="5">5th of month</SelectItem>
                <SelectItem value="7">7th of month</SelectItem>
                <SelectItem value="15">15th of month</SelectItem>
                <SelectItem value="last">Last working day</SelectItem>
              </SelectContent>
            </Select>
            {settings.disbursementDay && (
              <p className="text-xs text-amber-600">
                ⚠️ Verify this doesn't fall on weekends for your region
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Default Salary Structure</Label>
            <Select onValueChange={(value) => updateSettings('defaultSalaryStructure', value)}>
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

        {/* Prorata Rule */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Prorata Calculation Rule</Label>
          <RadioGroup 
            value={settings.prorataRule} 
            onValueChange={(value) => updateSettings('prorataRule', value)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2 border rounded-lg p-4">
              <RadioGroupItem value="calendar" id="calendar" />
              <div className="space-y-1">
                <Label htmlFor="calendar" className="font-medium">Calendar Days</Label>
                <p className="text-sm text-gray-600">Calculate based on total days in month</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-4">
              <RadioGroupItem value="working" id="working" />
              <div className="space-y-1">
                <Label htmlFor="working" className="font-medium">Working Days</Label>
                <p className="text-sm text-gray-600">Calculate based on working days only</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label className="font-medium">Enable Auto-lock After Approval</Label>
              <p className="text-sm text-gray-600">Automatically lock payroll after final approval to prevent changes</p>
            </div>
            <Switch
              checked={settings.autoLock}
              onCheckedChange={(checked) => updateSettings('autoLock', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label className="font-medium">Enable Gratuity Calculation</Label>
              <p className="text-sm text-gray-600">Calculate gratuity for eligible employees automatically</p>
            </div>
            <Switch
              checked={settings.enableGratuity}
              onCheckedChange={(checked) => updateSettings('enableGratuity', checked)}
            />
          </div>
        </div>

        {/* Validation Warnings */}
        {settings.cycleStartDate && settings.disbursementDay && 
         settings.disbursementDay !== "last" && 
         parseInt(settings.disbursementDay) <= settings.cycleStartDate.getDate() && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-700 text-sm">
              ⚠️ Warning: Disbursement day should be after the cycle start date
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={handleSave} className="px-8">
            Save Payroll Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollSettings;
