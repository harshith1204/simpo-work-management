
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import DatePicker from "./DatePicker";

interface CreateMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (milestone: any) => void;
}

const CreateMilestoneModal = ({ isOpen, onClose, onSubmit }: CreateMilestoneModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: new Date()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    onSubmit({
      ...formData,
      date: formData.date.toISOString().split('T')[0]
    });
    
    onClose();
    setFormData({
      name: "",
      description: "",
      date: new Date()
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md font-dm-sans">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Add New Milestone
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

          {/* Description */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter milestone description"
              className="font-dm-sans"
              rows={3}
            />
          </div>

          {/* Date */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Target Date
            </Label>
            <DatePicker onDateChange={(date) => setFormData({ ...formData, date: date || new Date() })} />
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
            Add Milestone
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMilestoneModal;
