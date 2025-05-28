
import { useState } from "react";
import { X, Calendar, User, Tag, AlertCircle, Folder, RotateCcw, GitBranch } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issue: any) => void;
}

const CreateIssueModal = ({ isOpen, onClose, onSubmit }: CreateIssueModalProps) => {
  const [formData, setFormData] = useState({
    project: "",
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    priority: "",
    labels: [] as string[],
    assignees: [] as string[],
    cycles: "",
    modules: "",
    parentIssue: "",
    workStatus: ""
  });

  const priorities = [
    { value: "none", label: "None" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" }
  ];

  const workStatuses = [
    { value: "todo", label: "To Do" },
    { value: "progress", label: "In Progress" },
    { value: "backlog", label: "Backlog" },
    { value: "feedback", label: "Product Feedback" },
    { value: "ready_test", label: "Ready for Test" },
    { value: "ready_dev", label: "Ready for Dev" },
    { value: "ready_release", label: "Ready for Release" },
    { value: "release", label: "Release" },
    { value: "verified", label: "Verified" },
    { value: "invalid", label: "Invalid" }
  ];

  const projects = [
    { value: "web-app", label: "Web Application" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "api", label: "API Service" },
    { value: "docs", label: "Documentation" }
  ];

  const availableLabels = ["UI", "Backend", "Frontend", "Mobile", "Performance", "Bug", "Feature", "Documentation"];
  const availableAssignees = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Alex Brown"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIssue = {
      ...formData,
      id: `ISS-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      created: new Date().toISOString().split('T')[0],
      reporter: "Current User"
    };
    onSubmit(newIssue);
    onClose();
    setFormData({
      project: "",
      title: "",
      description: "",
      startDate: "",
      dueDate: "",
      priority: "",
      labels: [],
      assignees: [],
      cycles: "",
      modules: "",
      parentIssue: "",
      workStatus: ""
    });
  };

  const addLabel = (label: string) => {
    if (!formData.labels.includes(label)) {
      setFormData({ ...formData, labels: [...formData.labels, label] });
    }
  };

  const removeLabel = (label: string) => {
    setFormData({ ...formData, labels: formData.labels.filter(l => l !== label) });
  };

  const addAssignee = (assignee: string) => {
    if (!formData.assignees.includes(assignee)) {
      setFormData({ ...formData, assignees: [...formData.assignees, assignee] });
    }
  };

  const removeAssignee = (assignee: string) => {
    setFormData({ ...formData, assignees: formData.assignees.filter(a => a !== assignee) });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Create New Issue</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Selection */}
          <div className="space-y-2">
            <Label htmlFor="project" className="flex items-center space-x-2">
              <Folder className="w-4 h-4" />
              <span>Project *</span>
            </Label>
            <Select value={formData.project} onValueChange={(value) => setFormData({ ...formData, project: value })}>
              <SelectTrigger>
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

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter issue title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the issue in detail..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Start Date</span>
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Due Date</span>
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>Priority</span>
              </Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
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

            {/* Work Status */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4" />
                <span>Work Status</span>
              </Label>
              <Select value={formData.workStatus} onValueChange={(value) => setFormData({ ...formData, workStatus: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {workStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Labels */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Tag className="w-4 h-4" />
              <span>Labels</span>
            </Label>
            <div className="space-y-2">
              <Select onValueChange={addLabel}>
                <SelectTrigger>
                  <SelectValue placeholder="Add labels" />
                </SelectTrigger>
                <SelectContent>
                  {availableLabels.filter(label => !formData.labels.includes(label)).map((label) => (
                    <SelectItem key={label} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.labels.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.labels.map((label) => (
                    <Badge key={label} variant="outline" className="flex items-center space-x-1">
                      <span>{label}</span>
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeLabel(label)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Assignees */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Assignees</span>
            </Label>
            <div className="space-y-2">
              <Select onValueChange={addAssignee}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign to users" />
                </SelectTrigger>
                <SelectContent>
                  {availableAssignees.filter(assignee => !formData.assignees.includes(assignee)).map((assignee) => (
                    <SelectItem key={assignee} value={assignee}>
                      {assignee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.assignees.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.assignees.map((assignee) => (
                    <Badge key={assignee} variant="outline" className="flex items-center space-x-1">
                      <span>{assignee}</span>
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeAssignee(assignee)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cycles */}
            <div className="space-y-2">
              <Label htmlFor="cycles" className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4" />
                <span>Cycles</span>
              </Label>
              <Input
                id="cycles"
                value={formData.cycles}
                onChange={(e) => setFormData({ ...formData, cycles: e.target.value })}
                placeholder="Enter cycle information"
              />
            </div>

            {/* Modules */}
            <div className="space-y-2">
              <Label htmlFor="modules" className="flex items-center space-x-2">
                <Folder className="w-4 h-4" />
                <span>Modules</span>
              </Label>
              <Input
                id="modules"
                value={formData.modules}
                onChange={(e) => setFormData({ ...formData, modules: e.target.value })}
                placeholder="Enter module information"
              />
            </div>
          </div>

          {/* Parent Issue */}
          <div className="space-y-2">
            <Label htmlFor="parentIssue" className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4" />
              <span>Parent Issue</span>
            </Label>
            <Input
              id="parentIssue"
              value={formData.parentIssue}
              onChange={(e) => setFormData({ ...formData, parentIssue: e.target.value })}
              placeholder="Enter parent issue ID (e.g., ISS-001)"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Issue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIssueModal;
