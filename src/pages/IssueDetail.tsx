
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Star, Link, Paperclip, Plus, MessageSquare, Calendar, User, Flag, Tag, GitBranch, RotateCcw, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [subIssueTitle, setSubIssueTitle] = useState("");

  // Mock issue data - in real app, fetch based on ID
  const issue = {
    id: id || "ISS-001",
    title: "Login page not responsive on mobile",
    description: "The login page layout breaks on mobile devices with screen sizes below 768px. The form fields overlap and the submit button becomes inaccessible. This affects user experience significantly as mobile users cannot log in properly.",
    state: "Open",
    priority: "High",
    assignee: "Jane Smith",
    createdBy: "John Doe",
    startDate: "2024-01-10",
    dueDate: "2024-01-20",
    module: "Authentication",
    cycle: "Sprint 1",
    parentIssue: null,
    labels: ["UI", "Mobile", "Critical"],
  };

  const activities = [
    { id: 1, user: "John Doe", action: "created this issue", time: "2 hours ago" },
    { id: 2, user: "Jane Smith", action: "was assigned", time: "1 hour ago" },
    { id: 3, user: "Mike Johnson", action: "changed priority to High", time: "30 minutes ago" },
  ];

  const subIssues = [
    { id: "ISS-002", title: "Fix mobile form layout", status: "In Progress" },
    { id: "ISS-003", title: "Update responsive breakpoints", status: "Open" },
  ];

  const handleAddComment = () => {
    if (comment.trim()) {
      console.log("Adding comment:", comment);
      setComment("");
    }
  };

  const handleAddSubIssue = () => {
    if (subIssueTitle.trim()) {
      console.log("Adding sub-issue:", subIssueTitle);
      setSubIssueTitle("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
            <p className="text-gray-600 mt-1">{issue.id}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Star className="w-4 h-4 mr-2" />
            Subscribe
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{issue.description}</p>
            </CardContent>
          </Card>

          {/* Sub Issues */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="w-5 h-5" />
                <span>Sub Issues ({subIssues.length})</span>
              </CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Sub Issue
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Sub issue title"
                  value={subIssueTitle}
                  onChange={(e) => setSubIssueTitle(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddSubIssue} size="sm">
                  Add
                </Button>
              </div>
              {subIssues.map((subIssue) => (
                <div key={subIssue.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <GitBranch className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-blue-600">{subIssue.id}</span>
                    <span>{subIssue.title}</span>
                  </div>
                  <Badge className={getStatusColor(subIssue.status)}>
                    {subIssue.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Comments</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4 mr-2" />
                      Attach
                    </Button>
                    <Button variant="outline" size="sm">
                      <Link className="w-4 h-4 mr-2" />
                      Link
                    </Button>
                  </div>
                  <Button onClick={handleAddComment} disabled={!comment.trim()}>
                    Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
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

        {/* Properties Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* State */}
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">State</label>
                  <Select defaultValue={issue.state}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Assignee */}
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">Assignee</label>
                  <Select defaultValue={issue.assignee}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Priority */}
              <div className="flex items-center space-x-3">
                <Flag className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">Priority</label>
                  <Select defaultValue={issue.priority}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Created By */}
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">Created by</label>
                  <p className="text-sm text-gray-900 mt-1">{issue.createdBy}</p>
                </div>
              </div>

              {/* Start Date */}
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">Start Date</label>
                  <Input type="date" defaultValue={issue.startDate} className="mt-1" />
                </div>
              </div>

              {/* Due Date */}
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">Due Date</label>
                  <Input type="date" defaultValue={issue.dueDate} className="mt-1" />
                </div>
              </div>

              {/* Module */}
              <div className="flex items-center space-x-3">
                <GitBranch className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">Module</label>
                  <Select defaultValue={issue.module}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Authentication">Authentication</SelectItem>
                      <SelectItem value="Dashboard">Dashboard</SelectItem>
                      <SelectItem value="Reporting">Reporting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Cycle */}
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">Cycle</label>
                  <Select defaultValue={issue.cycle}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sprint 1">Sprint 1</SelectItem>
                      <SelectItem value="Sprint 2">Sprint 2</SelectItem>
                      <SelectItem value="Sprint 3">Sprint 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Labels */}
              <div className="flex items-start space-x-3">
                <Tag className="w-4 h-4 text-gray-500 mt-1" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600">Labels</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {issue.labels.map((label) => (
                      <Badge key={label} variant="secondary" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
