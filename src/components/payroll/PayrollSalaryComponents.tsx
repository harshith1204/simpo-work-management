import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Plus, Trash2 } from "lucide-react";

interface SalaryComponent {
  id: string;
  name: string;
  type: string;
  calculationType: string;
  value: string;
  taxable: boolean;
  recurring: boolean;
  allowEdit: boolean;
  isDefault: boolean;
}

interface PayrollSalaryComponentsProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const PayrollSalaryComponents = ({ onNext, onPrevious, isFirst, isLast }: PayrollSalaryComponentsProps) => {
  const [components, setComponents] = useState<SalaryComponent[]>([
    {
      id: "1",
      name: "Basic Salary",
      type: "earnings",
      calculationType: "percentage",
      value: "50",
      taxable: true,
      recurring: true,
      allowEdit: true,
      isDefault: true
    },
    {
      id: "2",
      name: "HRA",
      type: "earnings",
      calculationType: "percentage",
      value: "40",
      taxable: true,
      recurring: true,
      allowEdit: true,
      isDefault: true
    }
  ]);

  const [newComponent, setNewComponent] = useState<Partial<SalaryComponent>>({
    name: "",
    type: "earnings",
    calculationType: "fixed",
    value: "",
    taxable: true,
    recurring: true,
    allowEdit: true,
    isDefault: false
  });

  const addComponent = () => {
    if (newComponent.name && newComponent.value) {
      const component: SalaryComponent = {
        id: Date.now().toString(),
        name: newComponent.name,
        type: newComponent.type || "earnings",
        calculationType: newComponent.calculationType || "fixed",
        value: newComponent.value,
        taxable: newComponent.taxable || false,
        recurring: newComponent.recurring || true,
        allowEdit: newComponent.allowEdit || true,
        isDefault: newComponent.isDefault || false
      };
      setComponents([...components, component]);
      setNewComponent({
        name: "",
        type: "earnings",
        calculationType: "fixed",
        value: "",
        taxable: true,
        recurring: true,
        allowEdit: true,
        isDefault: false
      });
    }
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5" />
          <span>Salary Components</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Existing Components */}
          <div>
            <Label className="text-base font-medium">Existing Components</Label>
            <div className="space-y-3 mt-2">
              {components.map((component) => (
                <div key={component.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium">{component.name}</div>
                      <div className="text-sm text-gray-600">
                        {component.calculationType === "fixed" ? "₹" : ""}{component.value}
                        {component.calculationType === "percentage" ? "%" : ""}
                        {component.calculationType === "percentage" && " of CTC"}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant={component.type === "earnings" ? "default" : "secondary"}>
                        {component.type}
                      </Badge>
                      {component.taxable && <Badge variant="outline">Taxable</Badge>}
                      {component.isDefault && <Badge className="bg-green-100 text-green-800">Default</Badge>}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeComponent(component.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Component */}
          <div className="border-t pt-6">
            <Label className="text-base font-medium mb-4 block">Add New Component</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="componentName">Component Name</Label>
                <Input
                  id="componentName"
                  value={newComponent.name || ""}
                  onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
                  placeholder="e.g., Travel Allowance"
                />
              </div>
              <div>
                <Label htmlFor="componentType">Component Type</Label>
                <Select value={newComponent.type} onValueChange={(value) => setNewComponent({ ...newComponent, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="earnings">Earnings</SelectItem>
                    <SelectItem value="deductions">Deductions</SelectItem>
                    <SelectItem value="reimbursements">Reimbursements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="calculationType">Calculation Type</Label>
                <Select value={newComponent.calculationType} onValueChange={(value) => setNewComponent({ ...newComponent, calculationType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="percentage">% of CTC</SelectItem>
                    <SelectItem value="basic-percentage">% of Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="componentValue">
                  {newComponent.calculationType === "fixed" ? "Amount (₹)" : "Percentage (%)"}
                </Label>
                <Input
                  id="componentValue"
                  type="number"
                  value={newComponent.value || ""}
                  onChange={(e) => setNewComponent({ ...newComponent, value: e.target.value })}
                  placeholder={newComponent.calculationType === "fixed" ? "5000" : "10"}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newComponent.taxable || false}
                  onCheckedChange={(checked) => setNewComponent({ ...newComponent, taxable: checked })}
                />
                <Label>Taxable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newComponent.recurring || false}
                  onCheckedChange={(checked) => setNewComponent({ ...newComponent, recurring: checked })}
                />
                <Label>Recurring</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newComponent.allowEdit || false}
                  onCheckedChange={(checked) => setNewComponent({ ...newComponent, allowEdit: checked })}
                />
                <Label>Allow Edit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newComponent.isDefault || false}
                  onCheckedChange={(checked) => setNewComponent({ ...newComponent, isDefault: checked })}
                />
                <Label>Default</Label>
              </div>
            </div>

            <Button type="button" onClick={addComponent} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Component
            </Button>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrevious} disabled={isFirst}>
              Previous
            </Button>
            <Button type="submit">
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PayrollSalaryComponents;
