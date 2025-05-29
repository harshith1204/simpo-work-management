
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, User, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Overview = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: "",
    tags: "",
    startDate: "",
    endDate: ""
  });

  const { toast } = useToast();

  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      owner: "Alex Johnson",
      progress: 75,
      status: "In Progress",
      dueDate: "2024-02-15",
      team: 5,
    },
    {
      id: 2,
      name: "Mobile App Development",
      owner: "Sarah Chen",
      progress: 45,
      status: "In Progress",
      dueDate: "2024-03-30",
      team: 8,
    },
    {
      id: 3,
      name: "Marketing Campaign",
      owner: "Mike Rodriguez",
      progress: 90,
      status: "Near Completion",
      dueDate: "2024-01-20",
      team: 3,
    },
    {
      id: 4,
      name: "Data Migration",
      owner: "Emily Davis",
      progress: 25,
      status: "Planning",
      dueDate: "2024-04-15",
      team: 4,
    },
  ];

  const teamMembers = [
    "Alex Johnson",
    "Sarah Chen", 
    "Mike Rodriguez",
    "Emily Davis",
    "David Park",
    "Lisa Wang"
  ];

  const handleCreateProject = () => {
    if (!formData.name.trim()) return;
    
    toast({
      title: "Project created successfully",
      description: `Project "${formData.name}" has been created.`,
    });
    
    setIsCreateModalOpen(false);
    setFormData({
      name: "",
      description: "",
      owner: "",
      tags: "",
      startDate: "",
      endDate: ""
    });
  };

  const getStatusColor = (progress: number) => {
    if (progress >= 90) return "text-green-600 bg-green-100";
    if (progress >= 50) return "text-blue-600 bg-blue-100";
    return "text-yellow-600 bg-yellow-100";
  };

  return (
    <div className="p-6 space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Overview</h2>
          <p className="text-gray-600 mt-1">Manage and track all your projects</p>
        </div>
        <Button 
          className="bg-[#3D5AFE] hover:bg-[#3D5AFE]/90 text-white"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Completed This Month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {project.owner}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due {project.dueDate}
                        </div>
                        <div>{project.team} team members</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.progress)}`}>
                      {project.status}
                    </div>
                    <div className="w-32 mt-2">
                      <Progress value={project.progress} className="h-2" />
                      <div className="text-xs text-gray-600 mt-1">{project.progress}% complete</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Project Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900 font-dm-sans">
              Create New Project
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter project description"
                rows={3}
                className="font-dm-sans"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Owner
              </Label>
              <Select value={formData.owner} onValueChange={(value) => setFormData({ ...formData, owner: value })}>
                <SelectTrigger className="font-dm-sans">
                  <SelectValue placeholder="Select project owner" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member} value={member}>
                      {member}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
                Tags
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Enter tags (comma separated)"
                className="font-dm-sans"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
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
              <div className="space-y-2">
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
          </div>

          <DialogFooter className="flex space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsCreateModalOpen(false)}
              className="font-dm-sans"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateProject}
              className="font-dm-sans"
            >
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Overview;
