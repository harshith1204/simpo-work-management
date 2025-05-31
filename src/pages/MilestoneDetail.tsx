import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MilestoneHeader from "@/components/milestone/MilestoneHeader";
import LinkedItems from "@/components/milestone/LinkedItems";
import AttachedFiles from "@/components/milestone/AttachedFiles";
import ActivityLog from "@/components/milestone/ActivityLog";

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
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{milestone.name}</h1>
          </div>
        </div>
      </div>

      {/* MilestoneHeader */}
      <MilestoneHeader milestone={milestone} getStatusColor={getStatusColor} />

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
          <LinkedItems 
            items={linkedTasks} 
            getStatusColor={getStatusColor} 
            getStatusIcon={getStatusIcon} 
          />
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <LinkedItems 
            items={linkedIssues} 
            getStatusColor={getStatusColor} 
            getStatusIcon={getStatusIcon} 
          />
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <AttachedFiles files={attachedFiles} />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <ActivityLog activities={activityLog} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MilestoneDetail;
