
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Calendar, DollarSign, Clock, AlertTriangle } from "lucide-react";

interface PayrollSettingsProps {
  onComplete: () => void;
}

const PayrollSettings = ({ onComplete }: PayrollSettingsProps) => {
  const [formData, setFormData] = useState({
    // Basic Payroll Settings
    payrollFrequency: "monthly",
    payrollCycleStartDate: "1",
    salaryDisbursementDay: "1",
    cutoffDate: "25",
    
    // Calculation Rules
    prorataCalculation: "calendar-days",
    overtimeCalculation: "basic-salary",
    roundingRule: "nearest-rupee",
    
    // Processing Settings
    autoCalculateDeductions: true,
    autoCalculateTax: true,
    enableAdvanceSalary: true,
    enableLoanDeduction: true,
    
    // Approval Workflow
    requireApprovalForPayroll: true,
    approvalHierarchy: "single-level",
    autoLockAfterApproval: true,
    
    // Compliance
    enablePF: true,
    enableESI: true,
    enablePT: true,
    enableGratuity: true,
    
    // Default Settings
    defaultWorkingDaysPerMonth: "30",
    defaultWorkingHoursPerDay: "8",
    probationPeriodMonths: "6",
    noticePeriodDays: "30"
  });

  const handleSave = () => {
    console.log("Payroll settings saved:", formData);
    onComplete();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Basic Payroll Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Payroll Cycle Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="payrollFrequency">Payroll Frequency</Label>
              <Select value={formData.payrollFrequency} onValueChange={(value) => handleInputChange("payrollFrequency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="payrollCycleStartDate">Payroll Cycle Start Date</Label>
              <Select value={formData.payrollCycleStartDate} onValueChange={(value) => handleInputChange("payrollCycleStartDate", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="salaryDisbursementDay">Salary Disbursement Day</Label>
              <Select value={formData.salaryDisbursementDay} onValueChange={(value) => handleInputChange("salaryDisbursementDay", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cutoffDate">Attendance Cut-off Date</Label>
              <Select value={formData.cutoffDate} onValueChange={(value) => handleInputChange("cutoffDate", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculation Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span>Calculation Rules</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="prorataCalculation">Prorata Calculation Method</Label>
              <Select value={formData.prorataCalculation} onValueChange={(value) => handleInputChange("prorataCalculation", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calendar-days">Calendar Days</SelectItem>
                  <SelectItem value="working-days">Working Days Only</SelectItem>
                  <SelectItem value="fixed-days">Fixed 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="overtimeCalculation">Overtime Calculation Base</Label>
              <Select value={formData.overtimeCalculation} onValueChange={(value) => handleInputChange("overtimeCalculation", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic-salary">Basic Salary</SelectItem>
                  <SelectItem value="gross-salary">Gross Salary</SelectItem>
                  <SelectItem value="ctc">CTC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="roundingRule">Salary Rounding Rule</Label>
              <Select value={formData.roundingRule} onValueChange={(value) => handleInputChange("roundingRule", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-rounding">No Rounding</SelectItem>
                  <SelectItem value="nearest-rupee">Nearest Rupee</SelectItem>
                  <SelectItem value="round-up">Round Up</SelectItem>
                  <SelectItem value="round-down">Round Down</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="defaultWorkingDaysPerMonth">Default Working Days/Month</Label>
              <Input
                value={formData.defaultWorkingDaysPerMonth}
                onChange={(e) => handleInputChange("defaultWorkingDaysPerMonth", e.target.value)}
                placeholder="30"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-purple-600" />
            <span>Processing Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Calculate Statutory Deductions</Label>
                <p className="text-sm text-gray-600">Automatically calculate PF, ESI, PT deductions</p>
              </div>
              <Switch
                checked={formData.autoCalculateDeductions}
                onCheckedChange={(checked) => handleInputChange("autoCalculateDeductions", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Calculate Income Tax</Label>
                <p className="text-sm text-gray-600">Automatically calculate TDS based on tax slabs</p>
              </div>
              <Switch
                checked={formData.autoCalculateTax}
                onCheckedChange={(checked) => handleInputChange("autoCalculateTax", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Advance Salary</Label>
                <p className="text-sm text-gray-600">Allow employees to request advance salary</p>
              </div>
              <Switch
                checked={formData.enableAdvanceSalary}
                onCheckedChange={(checked) => handleInputChange("enableAdvanceSalary", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Loan Deductions</Label>
                <p className="text-sm text-gray-600">Process loan EMI deductions from salary</p>
              </div>
              <Switch
                checked={formData.enableLoanDeduction}
                onCheckedChange={(checked) => handleInputChange("enableLoanDeduction", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval Workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>Approval Workflow</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label>Require Approval for Payroll Processing</Label>
              <p className="text-sm text-gray-600">Payroll must be approved before finalization</p>
            </div>
            <Switch
              checked={formData.requireApprovalForPayroll}
              onCheckedChange={(checked) => handleInputChange("requireApprovalForPayroll", checked)}
            />
          </div>

          {formData.requireApprovalForPayroll && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="approvalHierarchy">Approval Hierarchy</Label>
                <Select value={formData.approvalHierarchy} onValueChange={(value) => handleInputChange("approvalHierarchy", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-level">Single Level Approval</SelectItem>
                    <SelectItem value="multi-level">Multi Level Approval</SelectItem>
                    <SelectItem value="parallel">Parallel Approval</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Lock After Approval</Label>
                  <p className="text-sm text-gray-600">Lock payroll data after approval</p>
                </div>
                <Switch
                  checked={formData.autoLockAfterApproval}
                  onCheckedChange={(checked) => handleInputChange("autoLockAfterApproval", checked)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Default Employee Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <span>Default Employee Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="defaultWorkingHoursPerDay">Default Working Hours/Day</Label>
              <Input
                value={formData.defaultWorkingHoursPerDay}
                onChange={(e) => handleInputChange("defaultWorkingHoursPerDay", e.target.value)}
                placeholder="8"
              />
            </div>

            <div>
              <Label htmlFor="probationPeriodMonths">Default Probation Period (Months)</Label>
              <Input
                value={formData.probationPeriodMonths}
                onChange={(e) => handleInputChange("probationPeriodMonths", e.target.value)}
                placeholder="6"
              />
            </div>

            <div>
              <Label htmlFor="noticePeriodDays">Default Notice Period (Days)</Label>
              <Input
                value={formData.noticePeriodDays}
                onChange={(e) => handleInputChange("noticePeriodDays", e.target.value)}
                placeholder="30"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="px-8">
          Save Payroll Settings
        </Button>
      </div>
    </div>
  );
};

export default PayrollSettings;
