
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface LeavePolicyProps {
  onComplete: () => void;
}

const LeavePolicy = ({ onComplete }: LeavePolicyProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Leave Policy</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Define leave types and entitlement rules for employees.</p>
        <Button onClick={onComplete}>Save Leave Policy</Button>
      </CardContent>
    </Card>
  );
};

export default LeavePolicy;
