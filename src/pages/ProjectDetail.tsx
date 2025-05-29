import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, FileText, MessageSquare, Plus, Upload, Eye, Download, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/DatePicker";
import AddMemberModal from "@/components/AddMemberModal";
import CreateMilestoneModal from "@/components/CreateMilestoneModal";
import DonutChart from "@/components/DonutChart";
import BarChart from "@/components/BarChart";

const ProjectDetail = () => {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "Website Redesign",
    description: "A comprehensive redesign of our company website to improve user experience, modernize the visual design, and optimize for mobile devices.",
    owner: "Sarah Wilson",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-04-15"),
    status: "In Progress",
    tags: ["Design", "Frontend", "UX"],
    completion: 65
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Sarah Wilson", role: "Project Manager", email: "sarah@company.com", avatar: "👩‍💼" },
    { id: 2, name: "Mike Johnson", role: "UI/UX Designer", email: "mike@company.com", avatar: "👨‍🎨" },
    { id: 3, name: "Emily Davis", role: "Frontend Developer", email: "emily@company.com", avatar: "👩‍💻" },
    { id: 4, name: "Alex Chen", role: "Backend Developer", email: "alex@company.com", avatar: "👨‍💻" },
  ]);

  const [milestones, setMilestones] = useState([
    { id: 1, name: "User Research Complete", status: "Completed", date: "2024-02-01", description: "Complete user interviews and analysis" },
    { id: 2, name: "Design System Ready", status: "Completed", date: "2024-02-28", description: "Finalize design components and guidelines" },
    { id: 3, name: "Frontend Development", status: "In Progress", date: "2024-03-31", description: "Implement responsive UI components" },
    { id: 4, name: "Testing & Launch", status: "Pending", date: "2024-04-15", description: "QA testing and production deployment" },
  ]);

  const keyStats = {
    totalTasks: 24,
    openIssues: 8,
    teamMembers: teamMembers.length,
    upcomingDeadlines: 3,
    completion: projectData.completion
  };

  const taskBreakdown = [
    { name: "Completed", value: 16, color: "#10B981" },
    { name: "In Progress", value: 5, color: "#3B82F6" },
    { name: "Pending", value: 3, color: "#6B7280" }
  ];

  const tasksByAssignee = [
    { name: "Sarah", value: 6 },
    { name: "Mike", value: 8 },
    { name: "Emily", value: 5 },
    { name: "Alex", value: 5 }
  ];

  const projectFiles = [
    { id: 1, name: "Design_Mockups.sketch", type: "design", size: "2.4 MB", uploadedBy: "Mike Johnson", date: "2024-02-15" },
    { id: 2, name: "Project_Requirements.pdf", type: "document", size: "1.2 MB", uploadedBy: "Sarah Wilson", date: "2024-01-20" },
    { id: 3, name: "API_Documentation.md", type: "document", size: "856 KB", uploadedBy: "Alex Chen", date: "2024-03-01" },
  ];

  const activities = [
    { id: 1, user: "Emily Davis", action: "completed task 'Mobile responsive layout'", time: "2 hours ago", type: "task" },
    { id: 2, user: "Mike Johnson", action: "uploaded new design files", time: "4 hours ago", type: "file" },
    { id: 3, user: "Sarah Wilson", action: "updated project status to In Progress", time: "1 day ago", type: "status" },
    { id: 4, user: "Alex Chen", action: "commented on API integration task", time: "2 days ago", type: "comment" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      case "On Hold": return "bg-yellow-100 text-yellow-800";
      case "Not Started": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddMember = (member: any) => {
    const newMember = {
      id: teamMembers.length + 1,
      ...member,
      avatar: "👤"
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const handleAddMilestone = (milestone: any) => {
    const newMilestone = {
      id: milestones.length + 1,
      ...milestone,
      status: "Pending"
    };
    setMilestones([...milestones, newMilestone]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{projectData.title}</h1>
          <div className="flex items-center space-x-4">
            <Badge className={getStatusColor(projectData.status)}>{projectData.status}</Badge>
            <span className="text-gray-600">PRJ-001</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Share</Button>
          <Button>Edit Project</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Description</Label>
                <Textarea 
                  value={projectData.description}
                  onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Owner / Project Manager</Label>
                  <Input 
                    value={projectData.owner}
                    onChange={(e) => setProjectData({...projectData, owner: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <Select value={projectData.status} onValueChange={(value) => setProjectData({...projectData, status: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Start Date</Label>
                  <div className="mt-1">
                    <DatePicker onDateChange={(date) => setProjectData({...projectData, startDate: date || new Date()})} />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">End Date</Label>
                  <div className="mt-1">
                    <DatePicker onDateChange={(date) => setProjectData({...projectData, endDate: date || new Date()})} />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {projectData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                  <Button variant="outline" size="sm">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Tag
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Task Summary</span>
                <Button variant="outline" size="sm">View All Tasks</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DonutChart data={taskBreakdown} title="Task Status" />
                <BarChart data={tasksByAssignee} title="Tasks by Assignee" color="#3B82F6" />
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Milestones & Roadmap</span>
                <Button onClick={() => setIsMilestoneModalOpen(true)} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Milestone
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{milestone.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{milestone.date}</p>
                    </div>
                    <Badge className={getStatusColor(milestone.status)}>
                      {milestone.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents & Files */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Documents & Files</span>
                <Button size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projectFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-600">{file.size} • Uploaded by {file.uploadedBy}</p>
                        <p className="text-xs text-gray-500">{file.date}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Key Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{keyStats.totalTasks}</p>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{keyStats.openIssues}</p>
                  <p className="text-sm text-gray-600">Open Issues</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{keyStats.teamMembers}</p>
                  <p className="text-sm text-gray-600">Team Members</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{keyStats.upcomingDeadlines}</p>
                  <p className="text-sm text-gray-600">Upcoming Deadlines</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Completion</span>
                  <span className="text-sm text-gray-600">{keyStats.completion}%</span>
                </div>
                <Progress value={keyStats.completion} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Team Members</span>
                <Button onClick={() => setIsAddMemberModalOpen(true)} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Activity Feed</span>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMember}
      />

      <CreateMilestoneModal
        isOpen={isMilestoneModalOpen}
        onClose={() => setIsMilestoneModalOpen(false)}
        onSubmit={handleAddMilestone}
      />
    </div>
  );
};

export default ProjectDetail;
