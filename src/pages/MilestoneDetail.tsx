
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, User, FileText, Download, CheckCircle2, Clock, AlertCircle, Plus, Edit, Target } from "lucide-react";

const MilestoneDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock milestone data
  const milestone = {
    id: parseInt(id || "1"),
    name: "Launch Marketing Campaign",
    status: "In Progress",
    dueDate: "August 15, 2024",
    createdBy: "Sarah Wilson",
    createdOn: "June 1, 2024",
    description: "Comprehensive marketing campaign launch including email sequences, social media content, and paid advertising across multiple channels. This milestone encompasses the complete go-to-market strategy for our Q3 product release.",
    progress: 65
  };

  const linkedTasks = [
    {
      id: 1,
      title: "Create email campaign templates",
      status: "Completed",
      assignee: "Emma Davis",
      avatar: "ED",
      dueDate: "July 30, 2024"
    },
    {
      id: 2,
      title: "Design social media graphics",
      status: "In Progress",
      assignee: "Mike Johnson",
      avatar: "MJ",
      dueDate: "August 5, 2024"
    },
    {
      id: 3,
      title: "Set up advertising campaigns",
      status: "Planned",
      assignee: "Alex Chen",
      avatar: "AC",
      dueDate: "August 10, 2024"
    }
  ];

  const linkedIssues = [
    {
      id: 1,
      title: "Email template rendering issues",
      status: "Open",
      assignee: "David Wilson",
      avatar: "DW",
      dueDate: "August 3, 2024"
    },
    {
      id: 2,
      title: "Analytics tracking setup",
      status: "In Progress",
      assignee: "Lisa Rodriguez",
      avatar: "LR",
      dueDate: "August 8, 2024"
    }
  ];

  const attachedFiles = [
    {
      id: 1,
      name: "Marketing_Strategy.pdf",
      size: "2.1 MB",
      type: "pdf",
      uploadedBy: "Sarah Wilson",
      uploadedOn: "June 5, 2024"
    },
    {
      id: 2,
      name: "Campaign_Assets.zip",
      size: "15.3 MB",
      type: "archive",
      uploadedBy: "Emma Davis",
      uploadedOn: "July 20, 2024"
    }
  ];

  const activityLog = [
    {
      id: 1,
      action: "Status changed from Planned to In Progress",
      user: "Sarah Wilson",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      action: "Added task 'Create email campaign templates'",
      user: "Emma Davis",
      timestamp: "1 day ago"
    },
    {
      id: 3,
      action: "Updated milestone description",
      user: "Sarah Wilson",
      timestamp: "3 days ago"
    },
    {
      id: 4,
      action: "Milestone created",
      user: "Sarah Wilson",
      timestamp: "2 weeks ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planned": return "bg-gray-100 text-gray-800";
      case "Delayed": return "bg-red-100 text-red-800";
      case "Open": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "In Progress": return <Clock className="w-4 h-4 text-blue-600" />;
      case "Open": return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/roadmap")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Roadmap
          </Button>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{milestone.name}</h1>
              <Badge className={getStatusColor(milestone.status)}>
                {milestone.status}
              </Badge>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Due: {milestone.dueDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Created by {milestone.createdBy} on {milestone.createdOn}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Milestone
          </Button>
          <Button variant="outline">
            Change Status
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Task/Issue
          </Button>
        </div>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tasks">Linked Tasks ({linkedTasks.length})</TabsTrigger>
          <TabsTrigger value="issues">Issues ({linkedIssues.length})</TabsTrigger>
          <TabsTrigger value="files">Files ({attachedFiles.length})</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <div className="space-y-3">
            {linkedTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Due: {task.dueDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Avatar className="w-4 h-4">
                              <AvatarFallback className="text-xs">{task.avatar}</AvatarFallback>
                            </Avatar>
                            <span>{task.assignee}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <div className="space-y-3">
            {linkedIssues.map((issue) => (
              <Card key={issue.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(issue.status)}
                      <div>
                        <h3 className="font-medium text-gray-900">{issue.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Due: {issue.dueDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Avatar className="w-4 h-4">
                              <AvatarFallback className="text-xs">{issue.avatar}</AvatarFallback>
                            </Avatar>
                            <span>{issue.assignee}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(issue.status)}>
                      {issue.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <div className="space-y-3">
            {attachedFiles.map((file) => (
              <Card key={file.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">{file.name}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span>{file.size}</span>
                          <span>Uploaded by {file.uploadedBy}</span>
                          <span>{file.uploadedOn}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="space-y-3">
            {activityLog.map((activity) => (
              <Card key={activity.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-gray-900">{activity.action}</p>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MilestoneDetail;
