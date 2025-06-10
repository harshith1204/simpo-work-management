
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FileText } from "lucide-react";

interface PayslipSettingsProps {
  onComplete: () => void;
}

const PayslipSettings = ({ onComplete }: PayslipSettingsProps) => {
  const [settings, setSettings] = useState({
    payslipFormat: "",
    showCTCBreakdown: false,
    showEmployerContributions: false,
    includeLeave: false,
    includeBankInfo: false
  });

  const handleSave = () => {
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Payslip Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Payslip Format</Label>
          <Select onValueChange={(value) => setSettings({...settings, payslipFormat: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Show CTC Breakdown</Label>
              <p className="text-sm text-gray-600">Display detailed cost to company breakdown</p>
            </div>
            <Switch
              checked={settings.showCTCBreakdown}
              onCheckedChange={(checked) => setSettings({...settings, showCTCBreakdown: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Show Employer Contributions</Label>
              <p className="text-sm text-gray-600">Display employer PF, ESI, and other contributions</p>
            </div>
            <Switch
              checked={settings.showEmployerContributions}
              onCheckedChange={(checked) => setSettings({...settings, showEmployerContributions: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Include Leave Summary</Label>
              <p className="text-sm text-gray-600">Show leave balance and utilization</p>
            </div>
            <Switch
              checked={settings.includeLeave}
              onCheckedChange={(checked) => setSettings({...settings, includeLeave: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Include Bank Information</Label>
              <p className="text-sm text-gray-600">Display bank account details on payslip</p>
            </div>
            <Switch
              checked={settings.includeBankInfo}
              onCheckedChange={(checked) => setSettings({...settings, includeBankInfo: checked})}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Payslip Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayslipSettings;
