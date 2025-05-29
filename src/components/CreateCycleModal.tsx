
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

interface CreateCycleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cycle: any) => void;
}

const CreateCycleModal = ({ isOpen, onClose, onSubmit }: CreateCycleModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });

  const owners = [
    { value: "anjali", label: "Anjali" },
    { value: "rohan", label: "Rohan" },
    { value: "sarah", label: "Sarah" },
    { value: "dev-team", label: "Dev Team" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.startDate || !formData.endDate) return;
    
    onSubmit({
      ...formData,
      owner: formData.owner || "Rohan"
    });
    
    onClose();
    setFormData({
      title: "",
      owner: "",
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md font-dm-sans">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Create New Cycle
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Cycle Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter cycle title"
              required
              className="font-dm-sans"
            />
          </div>

          {/* Start Date */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Start Date *
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate ? format(formData.startDate, "PPP") : "Pick start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={(date) => setFormData({ ...formData, startDate: date })}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              End Date *
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate ? format(formData.endDate, "PPP") : "Pick end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.endDate}
                  onSelect={(date) => setFormData({ ...formData, endDate: date })}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Owner */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Owner
            </Label>
            <Select value={formData.owner} onValueChange={(value) => setFormData({ ...formData, owner: value })}>
              <SelectTrigger className="font-dm-sans">
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                {owners.map((owner) => (
                  <SelectItem key={owner.value} value={owner.value}>
                    {owner.label}
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
            Create Cycle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCycleModal;
