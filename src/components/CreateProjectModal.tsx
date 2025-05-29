
import { useState } from "react";
import { X, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: any) => void;
}

const CreateProjectModal = ({ isOpen, onClose, onSubmit }: CreateProjectModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: "",
    tags: "",
    startDate: "",
    endDate: ""
  });

  const owners = [
    "Alex Johnson",
    "Sarah Chen", 
    "Mike Rodriguez",
    "Emily Davis",
    "David Park"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    const newProject = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      owner: formData.owner || "Alex Johnson",
      progress: 0,
      status: "Planning",
      dueDate: formData.endDate || "2024-06-30",
      team: 3,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
    };
    
    onSubmit(newProject);
    onClose();
    setFormData({
      name: "",
      description: "",
      owner: "",
      tags: "",
      startDate: "",
      endDate: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md font-dm-sans">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Create New Project
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Project Name */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Project Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
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
              placeholder="Project description..."
              rows={3}
              className="font-dm-sans"
            />
          </div>

          {/* Owner */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Project Owner
            </Label>
            <Select value={formData.owner} onValueChange={(value) => setFormData({ ...formData, owner: value })}>
              <SelectTrigger className="font-dm-sans">
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                {owners.map((owner) => (
                  <SelectItem key={owner} value={owner}>
                    {owner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
              Tags
            </Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Enter tags separated by commas"
              className="font-dm-sans"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="font-dm-sans"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="font-dm-sans"
              />
            </div>
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
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
