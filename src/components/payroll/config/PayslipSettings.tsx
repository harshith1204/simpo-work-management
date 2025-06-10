
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
  const [formData, setFormData] = useState({
    payslipFormat: "modern",
    showCTCBreakdown: true,
    includeEmployerContributions: true,
    showBankAccount: true,
    includeLeavesSummary: true
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Settings Panel */}
          <div className="space-y-6">
            <div>
              <Label>Payslip Format</Label>
              <Select onValueChange={(value) => setFormData({...formData, payslipFormat: value})}>
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
                  <p className="text-sm text-gray-500">Display detailed cost to company breakdown</p>
                </div>
                <Switch
                  checked={formData.showCTCBreakdown}
                  onCheckedChange={(checked) => setFormData({...formData, showCTCBreakdown: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Include Employer Contributions</Label>
                  <p className="text-sm text-gray-500">Show PF, ESI employer contributions</p>
                </div>
                <Switch
                  checked={formData.includeEmployerContributions}
                  onCheckedChange={(checked) => setFormData({...formData, includeEmployerContributions: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Bank Account Details</Label>
                  <p className="text-sm text-gray-500">Display employee bank account information</p>
                </div>
                <Switch
                  checked={formData.showBankAccount}
                  onCheckedChange={(checked) => setFormData({...formData, showBankAccount: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Include Leave Summary</Label>
                  <p className="text-sm text-gray-500">Show leave balance and usage</p>
                </div>
                <Switch
                  checked={formData.includeLeavesSummary}
                  onCheckedChange={(checked) => setFormData({...formData, includeLeavesSummary: checked})}
                />
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium mb-4">Payslip Preview</h3>
            <div className="bg-white border rounded p-4 space-y-4 text-sm">
              <div className="text-center border-b pb-2">
                <h4 className="font-bold">Company Logo</h4>
                <p className="text-xs text-gray-600">Company Name</p>
                <p className="text-xs text-gray-600">Payslip for March 2024</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Employee: John Doe</div>
                <div>Employee ID: EMP001</div>
                <div>Department: IT</div>
                <div>Designation: Developer</div>
              </div>

              {formData.showBankAccount && (
                <div className="border-t pt-2 text-xs">
                  <div>Bank: HDFC Bank - ****1234</div>
                </div>
              )}

              <div className="border-t pt-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Basic Salary: ₹50,000</div>
                  <div>HRA: ₹20,000</div>
                  <div>PF Deduction: ₹6,000</div>
                  <div>Tax: ₹5,000</div>
                </div>
              </div>

              {formData.showCTCBreakdown && (
                <div className="border-t pt-2 text-xs">
                  <div>Total CTC: ₹12,00,000</div>
                </div>
              )}

              {formData.includeEmployerContributions && (
                <div className="border-t pt-2 text-xs">
                  <div>Employer PF: ₹6,000</div>
                  <div>Employer ESI: ₹1,500</div>
                </div>
              )}

              {formData.includeLeavesSummary && (
                <div className="border-t pt-2 text-xs">
                  <div>Leave Balance: 15 days</div>
                  <div>Used This Month: 2 days</div>
                </div>
              )}

              <div className="border-t pt-2 font-medium text-xs">
                Net Pay: ₹59,000
              </div>
            </div>
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
