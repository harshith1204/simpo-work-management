
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Receipt, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ReimbursementType {
  id: string;
  type: string;
  monthlyCap: number;
  taxable: boolean;
  approvalFlow: string;
  showInPayslip: boolean;
}

interface ReimbursementSettingsProps {
  onComplete: () => void;
}

const ReimbursementSettings = ({ onComplete }: ReimbursementSettingsProps) => {
  const [reimbursementTypes, setReimbursementTypes] = useState<ReimbursementType[]>([
    {
      id: "1",
      type: "Travel",
      monthlyCap: 5000,
      taxable: false,
      approvalFlow: "manual",
      showInPayslip: true
    },
    {
      id: "2",
      type: "Internet",
      monthlyCap: 2000,
      taxable: true,
      approvalFlow: "auto",
      showInPayslip: true
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newReimbursement, setNewReimbursement] = useState({
    type: "",
    monthlyCap: 0,
    taxable: false,
    approvalFlow: "manual",
    showInPayslip: true
  });

  const addReimbursementType = () => {
    const reimbursement: ReimbursementType = {
      id: Date.now().toString(),
      ...newReimbursement
    };
    setReimbursementTypes([...reimbursementTypes, reimbursement]);
    setNewReimbursement({
      type: "",
      monthlyCap: 0,
      taxable: false,
      approvalFlow: "manual",
      showInPayslip: true
    });
    setIsAddModalOpen(false);
  };

  const removeReimbursementType = (id: string) => {
    setReimbursementTypes(reimbursementTypes.filter(type => type.id !== id));
  };

  const updateReimbursementType = (id: string, field: keyof ReimbursementType, value: any) => {
    setReimbursementTypes(reimbursementTypes.map(type => 
      type.id === id ? { ...type, [field]: value } : type
    ));
  };

  const handleSave = () => {
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Receipt className="w-5 h-5" />
            <span>Reimbursement Settings</span>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Reimbursement Type</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Reimbursement Type</Label>
                  <Input
                    value={newReimbursement.type}
                    onChange={(e) => setNewReimbursement({...newReimbursement, type: e.target.value})}
                    placeholder="e.g., Medical, Food, etc."
                  />
                </div>
                <div>
                  <Label>Monthly Cap (Amount)</Label>
                  <Input
                    type="number"
                    value={newReimbursement.monthlyCap}
                    onChange={(e) => setNewReimbursement({...newReimbursement, monthlyCap: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Approval Flow</Label>
                  <Select onValueChange={(value) => setNewReimbursement({...newReimbursement, approvalFlow: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select approval flow" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Approval</SelectItem>
                      <SelectItem value="manual">Manual Approval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Is Taxable?</Label>
                  <Switch
                    checked={newReimbursement.taxable}
                    onCheckedChange={(checked) => setNewReimbursement({...newReimbursement, taxable: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show in Payslip</Label>
                  <Switch
                    checked={newReimbursement.showInPayslip}
                    onCheckedChange={(checked) => setNewReimbursement({...newReimbursement, showInPayslip: checked})}
                  />
                </div>
                <Button onClick={addReimbursementType} className="w-full">Add Reimbursement Type</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reimbursementTypes.map((reimbursement) => (
            <div key={reimbursement.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{reimbursement.type}</h3>
                <Button
                  onClick={() => removeReimbursementType(reimbursement.id)}
                  size="sm"
                  variant="outline"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Monthly Cap</Label>
                  <Input
                    type="number"
                    value={reimbursement.monthlyCap}
                    onChange={(e) => updateReimbursementType(reimbursement.id, 'monthlyCap', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Approval Flow</Label>
                  <Select onValueChange={(value) => updateReimbursementType(reimbursement.id, 'approvalFlow', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={reimbursement.approvalFlow} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Approval</SelectItem>
                      <SelectItem value="manual">Manual Approval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={reimbursement.taxable}
                    onCheckedChange={(checked) => updateReimbursementType(reimbursement.id, 'taxable', checked)}
                  />
                  <Label>Taxable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={reimbursement.showInPayslip}
                    onCheckedChange={(checked) => updateReimbursementType(reimbursement.id, 'showInPayslip', checked)}
                  />
                  <Label>Show in Payslip</Label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Save Reimbursement Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReimbursementSettings;
