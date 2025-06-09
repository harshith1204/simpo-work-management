import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Eye } from "lucide-react";

interface SalaryStructure {
  id: string;
  name: string;
  applicableFor: string;
  totalCTC: number;
  components: Array<{
    name: string;
    type: string;
    value: number;
    calculationType: string;
  }>;
  isDefault: boolean;
}

interface PayrollSalaryStructureProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const PayrollSalaryStructure = ({ onNext, onPrevious, isFirst, isLast }: PayrollSalaryStructureProps) => {
  const [structures, setStructures] = useState<SalaryStructure[]>([
    {
      id: "1",
      name: "Junior Staff Structure",
      applicableFor: "Junior Developer",
      totalCTC: 600000,
      components: [
        { name: "Basic Salary", type: "earnings", value: 50, calculationType: "percentage" },
        { name: "HRA", type: "earnings", value: 40, calculationType: "percentage" },
        { name: "Special Allowance", type: "earnings", value: 10, calculationType: "percentage" }
      ],
      isDefault: true
    }
  ]);

  const [newStructure, setNewStructure] = useState({
    name: "",
    applicableFor: "",
    totalCTC: "",
    selectedComponents: [] as string[]
  });

  const [showPreview, setShowPreview] = useState<string | null>(null);

  const availableComponents = [
    { name: "Basic Salary", type: "earnings", defaultValue: 50, calculationType: "percentage" },
    { name: "HRA", type: "earnings", defaultValue: 40, calculationType: "percentage" },
    { name: "Special Allowance", type: "earnings", defaultValue: 10, calculationType: "percentage" },
    { name: "Transport Allowance", type: "earnings", defaultValue: 1600, calculationType: "fixed" },
    { name: "Medical Allowance", type: "earnings", defaultValue: 1250, calculationType: "fixed" },
    { name: "PF Deduction", type: "deductions", defaultValue: 12, calculationType: "percentage" },
    { name: "ESI Deduction", type: "deductions", defaultValue: 0.75, calculationType: "percentage" }
  ];

  const addStructure = () => {
    if (newStructure.name && newStructure.applicableFor) {
      const structure: SalaryStructure = {
        id: Date.now().toString(),
        name: newStructure.name,
        applicableFor: newStructure.applicableFor,
        totalCTC: Number(newStructure.totalCTC),
        components: availableComponents
          .filter(comp => newStructure.selectedComponents.includes(comp.name))
          .map(comp => ({
            name: comp.name,
            type: comp.type,
            value: comp.defaultValue,
            calculationType: comp.calculationType
          })),
        isDefault: false
      };
      setStructures([...structures, structure]);
      setNewStructure({
        name: "",
        applicableFor: "",
        totalCTC: "",
        selectedComponents: []
      });
    }
  };

  const calculateBreakdown = (structure: SalaryStructure) => {
    return structure.components.map(comp => {
      let amount = 0;
      if (comp.calculationType === "percentage") {
        amount = (structure.totalCTC * comp.value) / 100;
      } else {
        amount = comp.value * 12; // Assuming monthly to annual
      }
      return { ...comp, amount };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Salary Structure</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Existing Structures */}
          <div>
            <Label className="text-base font-medium">Existing Salary Structures</Label>
            <div className="space-y-3 mt-2">
              {structures.map((structure) => (
                <div key={structure.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{structure.name}</span>
                      {structure.isDefault && <Badge className="bg-green-100 text-green-800">Default</Badge>}
                    </div>
                    <div className="text-sm text-gray-600">
                      Applicable for: {structure.applicableFor}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total CTC: ₹{structure.totalCTC.toLocaleString()}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(showPreview === structure.id ? null : structure.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {showPreview === structure.id ? "Hide" : "Preview"}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-3">Salary Breakdown Preview</h3>
              {(() => {
                const structure = structures.find(s => s.id === showPreview);
                if (!structure) return null;
                const breakdown = calculateBreakdown(structure);
                return (
                  <div className="space-y-2">
                    {breakdown.map((comp, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{comp.name}</span>
                        <span>₹{comp.amount.toLocaleString()}/year</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between font-medium">
                      <span>Total CTC</span>
                      <span>₹{structure.totalCTC.toLocaleString()}/year</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Add New Structure */}
          <div className="border-t pt-6">
            <Label className="text-base font-medium mb-4 block">Create New Salary Structure</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="structureName">Structure Name</Label>
                <Input
                  id="structureName"
                  value={newStructure.name}
                  onChange={(e) => setNewStructure({ ...newStructure, name: e.target.value })}
                  placeholder="e.g., Senior Staff Structure"
                />
              </div>
              <div>
                <Label htmlFor="applicableFor">Applicable For</Label>
                <Select value={newStructure.applicableFor} onValueChange={(value) => setNewStructure({ ...newStructure, applicableFor: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation/department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Senior Developer">Senior Developer</SelectItem>
                    <SelectItem value="Team Lead">Team Lead</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="HR Executive">HR Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="totalCTC">Total Monthly CTC (₹)</Label>
                <Input
                  id="totalCTC"
                  type="number"
                  value={newStructure.totalCTC}
                  onChange={(e) => setNewStructure({ ...newStructure, totalCTC: e.target.value })}
                  placeholder="50000"
                />
              </div>
            </div>

            <div className="mb-4">
              <Label className="text-base font-medium mb-2 block">Select Components</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableComponents.map((component) => (
                  <div key={component.name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={component.name}
                      checked={newStructure.selectedComponents.includes(component.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewStructure({
                            ...newStructure,
                            selectedComponents: [...newStructure.selectedComponents, component.name]
                          });
                        } else {
                          setNewStructure({
                            ...newStructure,
                            selectedComponents: newStructure.selectedComponents.filter(c => c !== component.name)
                          });
                        }
                      }}
                      className="rounded"
                    />
                    <Label htmlFor={component.name} className="text-sm">
                      {component.name}
                      <Badge variant="outline" className="ml-1 text-xs">
                        {component.type}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="button" onClick={addStructure} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Structure
            </Button>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrevious} disabled={isFirst}>
              Previous
            </Button>
            <Button type="submit">
              Complete Setup
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PayrollSalaryStructure;
