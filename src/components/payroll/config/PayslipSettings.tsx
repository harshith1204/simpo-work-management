
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface PayslipSettingsProps {
  onComplete: () => void;
}

const PayslipSettings = ({ onComplete }: PayslipSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Payslip Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Define how payslips are generated and presented to employees.</p>
        <Button onClick={onComplete}>Save Payslip Settings</Button>
      </CardContent>
    </Card>
  );
};

export default PayslipSettings;
