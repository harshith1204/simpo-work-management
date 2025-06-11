
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Shield, FileText, Calculator, AlertCircle } from "lucide-react";

interface ComplianceSettingsProps {
  onComplete: () => void;
}

const ComplianceSettings = ({ onComplete }: ComplianceSettingsProps) => {
  const [formData, setFormData] = useState({
    // PF Settings
    enablePF: true,
    pfAccountNumber: "",
    pfRate: "12",
    pfCeiling: "15000",
    pfApplicableFrom: "joining-date",
    
    // ESI Settings
    enableESI: true,
    esiNumber: "",
    employeeESIRate: "0.75",
    employerESIRate: "3.25",
    esiCeiling: "21000",
    
    // Professional Tax
    enablePT: true,
    ptState: "maharashtra",
    ptRegistrationNumber: "",
    
    // Income Tax
    enableTDS: true,
    tanNumber: "",
    taxCalculationMethod: "old-regime",
    standardDeduction: "50000",
    
    // Gratuity
    enableGratuity: true,
    gratuityEligibilityYears: "5",
    gratuityCalculationMethod: "15-days",
    maxGratuityAmount: "2000000",
    
    // Labor Welfare Fund
    enableLWF: false,
    lwfState: "",
    lwfAmount: "20",
    
    // Bonus
    enableBonus: true,
    bonusEligibilityMonths: "8.33",
    bonusCalculationMethod: "minimum-wages",
    maxBonusAmount: "7000"
  });

  const handleSave = () => {
    console.log("Compliance settings saved:", formData);
    onComplete();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Provident Fund Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Provident Fund (PF) Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label>Enable Provident Fund</Label>
              <p className="text-sm text-gray-600">Automatically deduct PF from eligible employees</p>
            </div>
            <Switch
              checked={formData.enablePF}
              onCheckedChange={(checked) => handleInputChange("enablePF", checked)}
            />
          </div>

          {formData.enablePF && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pfAccountNumber">PF Account Number</Label>
                <Input
                  value={formData.pfAccountNumber}
                  onChange={(e) => handleInputChange("pfAccountNumber", e.target.value)}
                  placeholder="Enter PF account number"
                />
              </div>

              <div>
                <Label htmlFor="pfRate">PF Rate (%)</Label>
                <Input
                  value={formData.pfRate}
                  onChange={(e) => handleInputChange("pfRate", e.target.value)}
                  placeholder="12"
                />
              </div>

              <div>
                <Label htmlFor="pfCeiling">PF Ceiling Amount</Label>
                <Input
                  value={formData.pfCeiling}
                  onChange={(e) => handleInputChange("pfCeiling", e.target.value)}
                  placeholder="15000"
                />
              </div>

              <div>
                <Label htmlFor="pfApplicableFrom">PF Applicable From</Label>
                <Select value={formData.pfApplicableFrom} onValueChange={(value) => handleInputChange("pfApplicableFrom", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joining-date">From Joining Date</SelectItem>
                    <SelectItem value="after-probation">After Probation Period</SelectItem>
                    <SelectItem value="custom-date">Custom Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ESI Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-green-600" />
            <span>Employee State Insurance (ESI) Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label>Enable ESI</Label>
              <p className="text-sm text-gray-600">Automatically deduct ESI from eligible employees</p>
            </div>
            <Switch
              checked={formData.enableESI}
              onCheckedChange={(checked) => handleInputChange("enableESI", checked)}
            />
          </div>

          {formData.enableESI && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="esiNumber">ESI Registration Number</Label>
                <Input
                  value={formData.esiNumber}
                  onChange={(e) => handleInputChange("esiNumber", e.target.value)}
                  placeholder="Enter ESI registration number"
                />
              </div>

              <div>
                <Label htmlFor="esiCeiling">ESI Ceiling Amount</Label>
                <Input
                  value={formData.esiCeiling}
                  onChange={(e) => handleInputChange("esiCeiling", e.target.value)}
                  placeholder="21000"
                />
              </div>

              <div>
                <Label htmlFor="employeeESIRate">Employee ESI Rate (%)</Label>
                <Input
                  value={formData.employeeESIRate}
                  onChange={(e) => handleInputChange("employeeESIRate", e.target.value)}
                  placeholder="0.75"
                />
              </div>

              <div>
                <Label htmlFor="employerESIRate">Employer ESI Rate (%)</Label>
                <Input
                  value={formData.employerESIRate}
                  onChange={(e) => handleInputChange("employerESIRate", e.target.value)}
                  placeholder="3.25"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Professional Tax Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-purple-600" />
            <span>Professional Tax (PT) Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label>Enable Professional Tax</Label>
              <p className="text-sm text-gray-600">Deduct professional tax as per state rules</p>
            </div>
            <Switch
              checked={formData.enablePT}
              onCheckedChange={(checked) => handleInputChange("enablePT", checked)}
            />
          </div>

          {formData.enablePT && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="ptState">State</Label>
                <Select value={formData.ptState} onValueChange={(value) => handleInputChange("ptState", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ptRegistrationNumber">PT Registration Number</Label>
                <Input
                  value={formData.ptRegistrationNumber}
                  onChange={(e) => handleInputChange("ptRegistrationNumber", e.target.value)}
                  placeholder="Enter PT registration number"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Income Tax Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <span>Income Tax (TDS) Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label>Enable TDS</Label>
              <p className="text-sm text-gray-600">Automatically calculate and deduct income tax</p>
            </div>
            <Switch
              checked={formData.enableTDS}
              onCheckedChange={(checked) => handleInputChange("enableTDS", checked)}
            />
          </div>

          {formData.enableTDS && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="tanNumber">TAN Number</Label>
                <Input
                  value={formData.tanNumber}
                  onChange={(e) => handleInputChange("tanNumber", e.target.value)}
                  placeholder="Enter TAN number"
                />
              </div>

              <div>
                <Label htmlFor="taxCalculationMethod">Tax Calculation Method</Label>
                <Select value={formData.taxCalculationMethod} onValueChange={(value) => handleInputChange("taxCalculationMethod", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="old-regime">Old Tax Regime</SelectItem>
                    <SelectItem value="new-regime">New Tax Regime</SelectItem>
                    <SelectItem value="employee-choice">Employee Choice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="standardDeduction">Standard Deduction</Label>
                <Input
                  value={formData.standardDeduction}
                  onChange={(e) => handleInputChange("standardDeduction", e.target.value)}
                  placeholder="50000"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gratuity Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span>Gratuity Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label>Enable Gratuity</Label>
              <p className="text-sm text-gray-600">Calculate gratuity for eligible employees</p>
            </div>
            <Switch
              checked={formData.enableGratuity}
              onCheckedChange={(checked) => handleInputChange("enableGratuity", checked)}
            />
          </div>

          {formData.enableGratuity && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="gratuityEligibilityYears">Eligibility (Years)</Label>
                <Input
                  value={formData.gratuityEligibilityYears}
                  onChange={(e) => handleInputChange("gratuityEligibilityYears", e.target.value)}
                  placeholder="5"
                />
              </div>

              <div>
                <Label htmlFor="gratuityCalculationMethod">Calculation Method</Label>
                <Select value={formData.gratuityCalculationMethod} onValueChange={(value) => handleInputChange("gratuityCalculationMethod", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15-days">15 Days Salary</SelectItem>
                    <SelectItem value="26-days">26 Days Salary</SelectItem>
                    <SelectItem value="30-days">30 Days Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="maxGratuityAmount">Maximum Gratuity Amount</Label>
                <Input
                  value={formData.maxGratuityAmount}
                  onChange={(e) => handleInputChange("maxGratuityAmount", e.target.value)}
                  placeholder="2000000"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="px-8">
          Save Compliance Settings
        </Button>
      </div>
    </div>
  );
};

export default ComplianceSettings;
