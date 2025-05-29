
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CreateMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (milestone: any) => void;
}

const CreateMilestoneModal = ({ isOpen, onClose, onSubmit }: CreateMilestoneModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    targetDate: undefined as Date | undefined,
    status: "",
  });

  const statuses = [
    { value: "planned", label: "Planned" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "on-hold", label: "On Hold" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.targetDate) return;
    
    onSubmit({
      ...formData,
      status: formData.status || "Planned"
    });
    
    onClose();
    setFormData({
      name: "",
      targetDate: undefined,
      status: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md font-dm-sans">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Add Milestone
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Name */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Milestone Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter milestone name"
              required
              className="font-dm-sans"
            />
          </div>

          {/* Target Date */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Target Date *
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.targetDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.targetDate ? format(formData.targetDate, "PPP") : "Pick target date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.targetDate}
                  onSelect={(date) => setFormData({ ...formData, targetDate: date })}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="font-dm-sans">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>

        <DialogFooter className="flex space-x-3 pt-6 border-t">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="flex-1 font-dm-sans"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="flex-1 font-dm-sans"
          >
            Create Milestone
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMilestoneModal;
