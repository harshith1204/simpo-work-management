
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield } from "lucide-react";

interface ComplianceSettingsProps {
  onComplete: () => void;
}

const ComplianceSettings = ({ onComplete }: ComplianceSettingsProps) => {
  const [pfSettings, setPfSettings] = useState({
    enabled: false,
    registrationNumber: "",
    adminCode: "",
    employeeContribution: "12",
    employerContribution: "12"
  });

  const [esiSettings, setEsiSettings] = useState({
    enabled: false,
    registrationNumber: "",
    employeeContribution: "0.75",
    employerContribution: "3.25"
  });

  const [ptSettings, setPtSettings] = useState({
    enabled: false,
    state: ""
  });

  const [tdsSettings, setTdsSettings] = useState({
    enabled: false,
    tanNumber: "",
    autoDeduction: false
  });

  const handleSave = () => {
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Compliance & Statutory Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* PF Settings */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Provident Fund (PF)</h3>
            <Switch
              checked={pfSettings.enabled}
              onCheckedChange={(checked) => setPfSettings({...pfSettings, enabled: checked})}
            />
          </div>
          {pfSettings.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>PF Registration Number</Label>
                <Input
                  value={pfSettings.registrationNumber}
                  onChange={(e) => setPfSettings({...pfSettings, registrationNumber: e.target.value})}
                  placeholder="Enter PF registration number"
                />
              </div>
              <div>
                <Label>PF Admin/Sub Code</Label>
                <Input
                  value={pfSettings.adminCode}
                  onChange={(e) => setPfSettings({...pfSettings, adminCode: e.target.value})}
                  placeholder="Enter admin code"
                />
              </div>
              <div>
                <Label>Employee Contribution (%)</Label>
                <Input
                  type="number"
                  value={pfSettings.employeeContribution}
                  onChange={(e) => setPfSettings({...pfSettings, employeeContribution: e.target.value})}
                />
              </div>
              <div>
                <Label>Employer Contribution (%)</Label>
                <Input
                  type="number"
                  value={pfSettings.employerContribution}
                  onChange={(e) => setPfSettings({...pfSettings, employerContribution: e.target.value})}
                />
              </div>
            </div>
          )}
        </div>

        {/* ESI Settings */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Employee State Insurance (ESI)</h3>
            <Switch
              checked={esiSettings.enabled}
              onCheckedChange={(checked) => setEsiSettings({...esiSettings, enabled: checked})}
            />
          </div>
          {esiSettings.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>ESI Registration Number</Label>
                <Input
                  value={esiSettings.registrationNumber}
                  onChange={(e) => setEsiSettings({...esiSettings, registrationNumber: e.target.value})}
                  placeholder="Enter ESI registration number"
                />
              </div>
              <div></div>
              <div>
                <Label>Employee Contribution (%)</Label>
                <Input
                  type="number"
                  value={esiSettings.employeeContribution}
                  onChange={(e) => setEsiSettings({...esiSettings, employeeContribution: e.target.value})}
                />
              </div>
              <div>
                <Label>Employer Contribution (%)</Label>
                <Input
                  type="number"
                  value={esiSettings.employerContribution}
                  onChange={(e) => setEsiSettings({...esiSettings, employerContribution: e.target.value})}
                />
              </div>
            </div>
          )}
        </div>

        {/* Professional Tax */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Professional Tax (PT)</h3>
            <Switch
              checked={ptSettings.enabled}
              onCheckedChange={(checked) => setPtSettings({...ptSettings, enabled: checked})}
            />
          </div>
          {ptSettings.enabled && (
            <div>
              <Label>PT Applicable State</Label>
              <Select onValueChange={(value) => setPtSettings({...ptSettings, state: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="westbengal">West Bengal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* TDS Settings */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Tax Deducted at Source (TDS)</h3>
            <Switch
              checked={tdsSettings.enabled}
              onCheckedChange={(checked) => setTdsSettings({...tdsSettings, enabled: checked})}
            />
          </div>
          {tdsSettings.enabled && (
            <div className="space-y-4">
              <div>
                <Label>TAN Number</Label>
                <Input
                  value={tdsSettings.tanNumber}
                  onChange={(e) => setTdsSettings({...tdsSettings, tanNumber: e.target.value})}
                  placeholder="Enter TAN number"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Enable Auto-TDS Deduction</Label>
                <Switch
                  checked={tdsSettings.autoDeduction}
                  onCheckedChange={(checked) => setTdsSettings({...tdsSettings, autoDeduction: checked})}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Compliance Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceSettings;
