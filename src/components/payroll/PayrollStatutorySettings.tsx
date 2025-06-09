
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield } from "lucide-react";

interface PayrollStatutorySettingsProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const PayrollStatutorySettings = ({ onNext, onPrevious, isFirst, isLast }: PayrollStatutorySettingsProps) => {
  const [settings, setSettings] = useState({
    enablePF: false,
    pfRegistrationNumber: "",
    pfAdminCode: "",
    employerPFContribution: "12",
    employeePFContribution: "12",
    enableESI: false,
    esiRegistrationNumber: "",
    employerESIContribution: "3.25",
    employeeESIContribution: "0.75",
    ptApplicable: false,
    ptState: "",
    tdsEnabled: false,
    employerPAN: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>PF & ESI Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PF Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable PF (Provident Fund)</Label>
                <p className="text-sm text-gray-600">Required for companies with 20+ employees</p>
              </div>
              <Switch
                checked={settings.enablePF}
                onCheckedChange={(checked) => setSettings({ ...settings, enablePF: checked })}
              />
            </div>

            {settings.enablePF && (
              <div className="space-y-4 pl-4 border-l-2 border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pfRegistrationNumber">PF Registration Number *</Label>
                    <Input
                      id="pfRegistrationNumber"
                      value={settings.pfRegistrationNumber}
                      onChange={(e) => setSettings({ ...settings, pfRegistrationNumber: e.target.value })}
                      placeholder="Enter PF registration number"
                      required={settings.enablePF}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pfAdminCode">PF Admin Code *</Label>
                    <Input
                      id="pfAdminCode"
                      value={settings.pfAdminCode}
                      onChange={(e) => setSettings({ ...settings, pfAdminCode: e.target.value })}
                      placeholder="Enter PF admin code"
                      required={settings.enablePF}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employerPFContribution">Employer PF Contribution (%)</Label>
                    <Input
                      id="employerPFContribution"
                      type="number"
                      step="0.01"
                      value={settings.employerPFContribution}
                      onChange={(e) => setSettings({ ...settings, employerPFContribution: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeePFContribution">Employee PF Contribution (%)</Label>
                    <Input
                      id="employeePFContribution"
                      type="number"
                      step="0.01"
                      value={settings.employeePFContribution}
                      onChange={(e) => setSettings({ ...settings, employeePFContribution: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ESI Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable ESI (Employee State Insurance)</Label>
                <p className="text-sm text-gray-600">Required for companies with 10+ employees</p>
              </div>
              <Switch
                checked={settings.enableESI}
                onCheckedChange={(checked) => setSettings({ ...settings, enableESI: checked })}
              />
            </div>

            {settings.enableESI && (
              <div className="space-y-4 pl-4 border-l-2 border-green-200">
                <div>
                  <Label htmlFor="esiRegistrationNumber">ESI Registration Number *</Label>
                  <Input
                    id="esiRegistrationNumber"
                    value={settings.esiRegistrationNumber}
                    onChange={(e) => setSettings({ ...settings, esiRegistrationNumber: e.target.value })}
                    placeholder="Enter ESI registration number"
                    required={settings.enableESI}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employerESIContribution">Employer ESI Contribution (%)</Label>
                    <Input
                      id="employerESIContribution"
                      type="number"
                      step="0.01"
                      value={settings.employerESIContribution}
                      onChange={(e) => setSettings({ ...settings, employerESIContribution: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeeESIContribution">Employee ESI Contribution (%)</Label>
                    <Input
                      id="employeeESIContribution"
                      type="number"
                      step="0.01"
                      value={settings.employeeESIContribution}
                      onChange={(e) => setSettings({ ...settings, employeeESIContribution: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Professional Tax */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Professional Tax Applicable</Label>
                <p className="text-sm text-gray-600">State-specific professional tax</p>
              </div>
              <Switch
                checked={settings.ptApplicable}
                onCheckedChange={(checked) => setSettings({ ...settings, ptApplicable: checked })}
              />
            </div>

            {settings.ptApplicable && (
              <div>
                <Label htmlFor="ptState">PT State</Label>
                <Select value={settings.ptState} onValueChange={(value) => setSettings({ ...settings, ptState: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state for PT" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="west-bengal">West Bengal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* TDS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>TDS Deduction Enabled</Label>
                <p className="text-sm text-gray-600">Tax deduction at source</p>
              </div>
              <Switch
                checked={settings.tdsEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, tdsEnabled: checked })}
              />
            </div>

            {settings.tdsEnabled && (
              <div>
                <Label htmlFor="employerPAN">Employer PAN for TDS *</Label>
                <Input
                  id="employerPAN"
                  value={settings.employerPAN}
                  onChange={(e) => setSettings({ ...settings, employerPAN: e.target.value.toUpperCase() })}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  required={settings.tdsEnabled}
                />
              </div>
            )}
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

export default PayrollStatutorySettings;
