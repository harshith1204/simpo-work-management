
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";

interface ReimbursementSettingsProps {
  onComplete: () => void;
}

const ReimbursementSettings = ({ onComplete }: ReimbursementSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Receipt className="w-5 h-5" />
          <span>Reimbursement Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Enable configuration of allowed reimbursements.</p>
        <Button onClick={onComplete}>Save Reimbursement Settings</Button>
      </CardContent>
    </Card>
  );
};

export default ReimbursementSettings;
