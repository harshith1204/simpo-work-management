
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface OfficeTimingsProps {
  onComplete: () => void;
}

const OfficeTimings = ({ onComplete }: OfficeTimingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Office Timings & Shifts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Define company working hours and shift-wise breakdown.</p>
        <Button onClick={onComplete}>Save Office Timings</Button>
      </CardContent>
    </Card>
  );
};

export default OfficeTimings;
