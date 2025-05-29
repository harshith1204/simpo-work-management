
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/DatePicker";

interface CreateMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (milestone: any) => void;
}

const CreateMilestoneModal = ({ isOpen, onClose, onSubmit }: CreateMilestoneModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.date) {
      onSubmit(formData);
      setFormData({ name: "", description: "", date: "" });
      onClose();
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({ ...formData, date: date.toISOString().split('T')[0] });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Milestone</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Milestone Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter milestone name"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter milestone description"
              rows={3}
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Due Date</Label>
            <div className="mt-1">
              <DatePicker onDateChange={handleDateChange} placeholder="Select due date" />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Milestone</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMilestoneModal;
