
import { useState } from "react";
import { X, Calendar, Paperclip, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "./ui/sheet";

interface AddTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
}

const AddTaskDrawer = ({ isOpen, onClose, onSubmit }: AddTaskDrawerProps) => {
  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    description: "",
    priority: "",
    project: "",
    tags: [] as string[]
  });

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ];

  const projects = [
    { value: "security-updates", label: "Security Updates" },
    { value: "website-redesign", label: "Website Redesign" },
    { value: "ecommerce-platform", label: "E-commerce Platform" },
    { value: "performance-improvements", label: "Performance Improvements" },
    { value: "developer-tools", label: "Developer Tools" },
    { value: "devops-infrastructure", label: "DevOps Infrastructure" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    const newTask = {
      ...formData,
      priority: formData.priority || "Medium",
      project: formData.project || "General",
      tags: ["new-task"]
    };
    
    onSubmit(newTask);
    onClose();
    setFormData({
      title: "",
      dueDate: "",
      description: "",
      priority: "",
      project: "",
      tags: []
    });
  };

  const handleFileUpload = () => {
    // Simulate file upload
    console.log("File upload clicked");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-gray-900 font-dm-sans">
            Add New Task
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          {/* Task Title */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Task Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              required
              className="font-dm-sans"
            />
          </div>

          {/* Due Date */}
          <div className="space-y-3">
            <Label htmlFor="dueDate" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>Due Date</span>
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
              placeholder="Add task description..."
              rows={3}
              className="font-dm-sans"
            />
          </div>

          {/* Priority */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <AlertCircle className="w-4 h-4" />
              <span>Priority</span>
            </Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger className="font-dm-sans">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Project
            </Label>
            <Select value={formData.project} onValueChange={(value) => setFormData({ ...formData, project: value })}>
              <SelectTrigger className="font-dm-sans">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.value} value={project.value}>
                    {project.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Attachments */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Paperclip className="w-4 h-4" />
              <span>Attachments</span>
            </Label>
            <Button
              type="button"
              variant="outline"
              onClick={handleFileUpload}
              className="w-full justify-start font-dm-sans"
            >
              <Paperclip className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </div>
        </form>

        <SheetFooter className="flex space-x-3 pt-6 border-t">
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
            className="flex-1 bg-[#270E2B] hover:bg-[#270E2B]/90 text-white font-dm-sans active:scale-95 transition-all duration-150"
          >
            Add Task
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddTaskDrawer;
