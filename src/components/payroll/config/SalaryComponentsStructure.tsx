
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

interface SalaryComponentsStructureProps {
  onComplete: () => void;
}

const SalaryComponentsStructure = ({ onComplete }: SalaryComponentsStructureProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5" />
          <span>Salary Components & Structure</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Configure salary components and create reusable templates.</p>
        <Button onClick={onComplete}>Save Salary Configuration</Button>
      </CardContent>
    </Card>
  );
};

export default SalaryComponentsStructure;
