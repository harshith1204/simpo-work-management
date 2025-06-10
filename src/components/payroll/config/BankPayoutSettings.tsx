
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard } from "lucide-react";

interface BankPayoutSettingsProps {
  onComplete: () => void;
}

const BankPayoutSettings = ({ onComplete }: BankPayoutSettingsProps) => {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    paymentMethod: "",
    exportFormat: ""
  });

  const handleSave = () => {
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Bank & Payout Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="accountHolderName">Bank Account Holder Name</Label>
            <Input
              id="accountHolderName"
              value={formData.accountHolderName}
              onChange={(e) => setFormData({...formData, accountHolderName: e.target.value})}
              placeholder="Enter account holder name"
            />
          </div>
          <div>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
              placeholder="Enter account number"
            />
          </div>
          <div>
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input
              id="ifscCode"
              value={formData.ifscCode}
              onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}
              placeholder="Enter IFSC code"
            />
          </div>
          <div>
            <Label>Payment Method</Label>
            <Select onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual Export</SelectItem>
                <SelectItem value="api">Bank API</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Export Format</Label>
            <Select onValueChange={(value) => setFormData({...formData, exportFormat: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select export format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="bank-specific">Bank Specific Format</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Bank Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankPayoutSettings;
