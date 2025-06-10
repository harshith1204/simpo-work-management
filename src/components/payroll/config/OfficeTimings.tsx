
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Clock, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Shift {
  id: string;
  name: string;
  inTime: string;
  outTime: string;
  breakDuration: number;
  assignedTo: string[];
}

interface OfficeTimingsProps {
  onComplete: () => void;
}

const OfficeTimings = ({ onComplete }: OfficeTimingsProps) => {
  const [defaultTiming, setDefaultTiming] = useState({
    inTime: "09:00",
    outTime: "18:00",
    workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    breakDuration: 60,
    gracePeriod: 15,
    minimumHours: 8,
    enableOvertime: false
  });

  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);
  const [newShift, setNewShift] = useState({
    name: "",
    inTime: "",
    outTime: "",
    breakDuration: 60,
    assignedTo: [] as string[]
  });

  const weekDays = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" }
  ];

  const addShift = () => {
    const shift: Shift = {
      id: Date.now().toString(),
      ...newShift
    };
    setShifts([...shifts, shift]);
    setNewShift({
      name: "",
      inTime: "",
      outTime: "",
      breakDuration: 60,
      assignedTo: []
    });
    setIsAddShiftOpen(false);
  };

  const removeShift = (id: string) => {
    setShifts(shifts.filter(shift => shift.id !== id));
  };

  const handleWorkingDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setDefaultTiming({
        ...defaultTiming,
        workingDays: [...defaultTiming.workingDays, day]
      });
    } else {
      setDefaultTiming({
        ...defaultTiming,
        workingDays: defaultTiming.workingDays.filter(d => d !== day)
      });
    }
  };

  const handleSave = () => {
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Office Timings & Shifts</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Default Company Timing */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Default Company Timing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label>Office In Time</Label>
              <Input
                type="time"
                value={defaultTiming.inTime}
                onChange={(e) => setDefaultTiming({...defaultTiming, inTime: e.target.value})}
              />
            </div>
            <div>
              <Label>Office Out Time</Label>
              <Input
                type="time"
                value={defaultTiming.outTime}
                onChange={(e) => setDefaultTiming({...defaultTiming, outTime: e.target.value})}
              />
            </div>
            <div>
              <Label>Break Duration (minutes)</Label>
              <Input
                type="number"
                value={defaultTiming.breakDuration}
                onChange={(e) => setDefaultTiming({...defaultTiming, breakDuration: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label>Grace Period (minutes)</Label>
              <Input
                type="number"
                value={defaultTiming.gracePeriod}
                onChange={(e) => setDefaultTiming({...defaultTiming, gracePeriod: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label>Minimum Hours for Full Day</Label>
              <Input
                type="number"
                value={defaultTiming.minimumHours}
                onChange={(e) => setDefaultTiming({...defaultTiming, minimumHours: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="mb-4">
            <Label className="mb-2 block">Working Days</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {weekDays.map((day) => (
                <div key={day.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={day.id}
                    checked={defaultTiming.workingDays.includes(day.id)}
                    onCheckedChange={(checked) => handleWorkingDayChange(day.id, checked as boolean)}
                  />
                  <Label htmlFor={day.id} className="text-sm">{day.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Enable Overtime</Label>
            <Switch
              checked={defaultTiming.enableOvertime}
              onCheckedChange={(checked) => setDefaultTiming({...defaultTiming, enableOvertime: checked})}
            />
          </div>
        </div>

        {/* Shifts Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Additional Shifts</h3>
            <Dialog open={isAddShiftOpen} onOpenChange={setIsAddShiftOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Shift
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Shift</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Shift Name</Label>
                    <Input
                      value={newShift.name}
                      onChange={(e) => setNewShift({...newShift, name: e.target.value})}
                      placeholder="e.g., Night Shift"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>In Time</Label>
                      <Input
                        type="time"
                        value={newShift.inTime}
                        onChange={(e) => setNewShift({...newShift, inTime: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Out Time</Label>
                      <Input
                        type="time"
                        value={newShift.outTime}
                        onChange={(e) => setNewShift({...newShift, outTime: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Break Duration (minutes)</Label>
                    <Input
                      type="number"
                      value={newShift.breakDuration}
                      onChange={(e) => setNewShift({...newShift, breakDuration: parseInt(e.target.value)})}
                    />
                  </div>
                  <Button onClick={addShift} className="w-full">Add Shift</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {shifts.map((shift) => (
              <div key={shift.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{shift.name}</h4>
                  <Button
                    onClick={() => removeShift(shift.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>In: {shift.inTime}</div>
                  <div>Out: {shift.outTime}</div>
                  <div>Break: {shift.breakDuration}min</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Office Timings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfficeTimings;
