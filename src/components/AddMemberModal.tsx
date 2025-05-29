
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: any) => void;
}

const AddMemberModal = ({ isOpen, onClose, onSubmit }: AddMemberModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    
    onSubmit({
      ...formData,
      role: formData.role || "Viewer"
    });
    
    onClose();
    setFormData({
      name: "",
      email: "",
      role: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md font-dm-sans">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Add Team Member
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Name */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              required
              className="font-dm-sans"
            />
          </div>

          {/* Email */}
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
              className="font-dm-sans"
            />
          </div>

          {/* Role */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Role
            </Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger className="font-dm-sans">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
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
            Send Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
