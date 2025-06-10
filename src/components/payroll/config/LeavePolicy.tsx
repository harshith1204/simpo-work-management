
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LeaveType {
  id: string;
  name: string;
  annualQuota: number;
  carryForward: boolean;
  maxCarryForward: number;
  encashment: boolean;
  leaveCycle: string;
  autoLOP: boolean;
}

interface LeavePolicyProps {
  onComplete: () => void;
}

const LeavePolicy = ({ onComplete }: LeavePolicyProps) => {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    {
      id: "1",
      name: "Annual Leave",
      annualQuota: 21,
      carryForward: true,
      maxCarryForward: 5,
      encashment: true,
      leaveCycle: "calendar",
      autoLOP: true
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeaveType, setNewLeaveType] = useState({
    name: "",
    annualQuota: 0,
    carryForward: false,
    maxCarryForward: 0,
    encashment: false,
    leaveCycle: "calendar",
    autoLOP: false
  });

  const addLeaveType = () => {
    const leaveType: LeaveType = {
      id: Date.now().toString(),
      ...newLeaveType
    };
    setLeaveTypes([...leaveTypes, leaveType]);
    setNewLeaveType({
      name: "",
      annualQuota: 0,
      carryForward: false,
      maxCarryForward: 0,
      encashment: false,
      leaveCycle: "calendar",
      autoLOP: false
    });
    setIsAddModalOpen(false);
  };

  const removeLeaveType = (id: string) => {
    setLeaveTypes(leaveTypes.filter(type => type.id !== id));
  };

  const updateLeaveType = (id: string, field: keyof LeaveType, value: any) => {
    setLeaveTypes(leaveTypes.map(type => 
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
            <Calendar className="w-5 h-5" />
            <span>Leave Policy</span>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Leave Type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Leave Type</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Leave Type Name</Label>
                  <Input
                    value={newLeaveType.name}
                    onChange={(e) => setNewLeaveType({...newLeaveType, name: e.target.value})}
                    placeholder="e.g., Sick Leave"
                  />
                </div>
                <div>
                  <Label>Annual Quota</Label>
                  <Input
                    type="number"
                    value={newLeaveType.annualQuota}
                    onChange={(e) => setNewLeaveType({...newLeaveType, annualQuota: parseInt(e.target.value)})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Carry Forward Allowed</Label>
                  <Switch
                    checked={newLeaveType.carryForward}
                    onCheckedChange={(checked) => setNewLeaveType({...newLeaveType, carryForward: checked})}
                  />
                </div>
                {newLeaveType.carryForward && (
                  <div>
                    <Label>Maximum Carry Forward</Label>
                    <Input
                      type="number"
                      value={newLeaveType.maxCarryForward}
                      onChange={(e) => setNewLeaveType({...newLeaveType, maxCarryForward: parseInt(e.target.value)})}
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <Label>Encashment Policy</Label>
                  <Switch
                    checked={newLeaveType.encashment}
                    onCheckedChange={(checked) => setNewLeaveType({...newLeaveType, encashment: checked})}
                  />
                </div>
                <div>
                  <Label>Leave Cycle</Label>
                  <Select onValueChange={(value) => setNewLeaveType({...newLeaveType, leaveCycle: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calendar">Calendar Year</SelectItem>
                      <SelectItem value="doj">DOJ-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto LOP if Exceeded</Label>
                  <Switch
                    checked={newLeaveType.autoLOP}
                    onCheckedChange={(checked) => setNewLeaveType({...newLeaveType, autoLOP: checked})}
                  />
                </div>
                <Button onClick={addLeaveType} className="w-full">Add Leave Type</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaveTypes.map((leaveType) => (
            <div key={leaveType.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{leaveType.name}</h3>
                <Button
                  onClick={() => removeLeaveType(leaveType.id)}
                  size="sm"
                  variant="outline"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Annual Quota</Label>
                  <Input
                    type="number"
                    value={leaveType.annualQuota}
                    onChange={(e) => updateLeaveType(leaveType.id, 'annualQuota', parseInt(e.target.value))}
                  />
                </div>
                {leaveType.carryForward && (
                  <div>
                    <Label>Max Carry Forward</Label>
                    <Input
                      type="number"
                      value={leaveType.maxCarryForward}
                      onChange={(e) => updateLeaveType(leaveType.id, 'maxCarryForward', parseInt(e.target.value))}
                    />
                  </div>
                )}
                <div>
                  <Label>Leave Cycle</Label>
                  <Select onValueChange={(value) => updateLeaveType(leaveType.id, 'leaveCycle', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={leaveType.leaveCycle} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calendar">Calendar Year</SelectItem>
                      <SelectItem value="doj">DOJ-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={leaveType.carryForward}
                    onCheckedChange={(checked) => updateLeaveType(leaveType.id, 'carryForward', checked)}
                  />
                  <Label>Carry Forward</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={leaveType.encashment}
                    onCheckedChange={(checked) => updateLeaveType(leaveType.id, 'encashment', checked)}
                  />
                  <Label>Encashment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={leaveType.autoLOP}
                    onCheckedChange={(checked) => updateLeaveType(leaveType.id, 'autoLOP', checked)}
                  />
                  <Label>Auto LOP</Label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Save Leave Policy</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeavePolicy;
