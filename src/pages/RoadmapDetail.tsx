
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Users, Target, Plus, Filter, MessageSquare, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CreateMilestoneModal from "@/components/CreateMilestoneModal";
import RoadmapProgressCharts from "@/components/RoadmapProgressCharts";
import RoadmapComments from "@/components/RoadmapComments";
import { useToast } from "@/hooks/use-toast";

const RoadmapDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreateMilestoneOpen, setIsCreateMilestoneOpen] = useState(false);
  const [milestoneFilter, setMilestoneFilter] = useState("all");

  // Log the ID to debug routing
  console.log("Roadmap ID from params:", id);

  // If no ID is provided, show error
  if (!id) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Roadmap not found</h2>
          <p className="text-gray-600 mt-2">The roadmap you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/roadmap")} className="mt-4">
            Back to Roadmap
          </Button>
        </div>
      </div>
    );
  }

  const [roadmapData, setRoadmapData] = useState({
    id: parseInt(id || "1"),
    title: id === "1" ? "Q3 Growth Plan" : "Product Roadmap 2024",
    description: id === "1" 
      ? "Strategic initiatives to drive user acquisition and product expansion during Q3 2024"
      : "Major product features and improvements for the year",
    owner: "Sarah Wilson",
    team: "Growth Team",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-09-30"),
    status: "Active"
  });

  const [milestones, setMilestones] = useState([
    {
      id: 1,
      name: "Launch Email Campaign",
      description: "Implement automated email marketing sequences",
      dueDate: new Date("2024-07-15"),
      progress: 100,
      status: "Completed",
      tags: ["Marketing", "Email"],
      assignees: [
        { id: 1, name: "Alice Johnson", avatar: "AJ" },
        { id: 2, name: "Bob Smith", avatar: "BS" }
      ]
    },
    {
      id: 2,
      name: "Mobile App Redesign",
      description: "Complete UI/UX overhaul of mobile application",
      dueDate: new Date("2024-08-01"),
      progress: 65,
      status: "In Progress",
      tags: ["Design", "Mobile"],
      assignees: [
        { id: 3, name: "Carol Davis", avatar: "CD" },
        { id: 4, name: "David Wilson", avatar: "DW" }
      ]
    },
    {
      id: 3,
      name: "API v3.0 Release",
      description: "Launch new API version with enhanced features",
      dueDate: new Date("2024-08-15"),
      progress: 30,
      status: "In Progress",
      tags: ["Backend", "API"],
      assignees: [
        { id: 5, name: "Eve Brown", avatar: "EB" }
      ]
    },
    {
      id: 4,
      name: "Customer Analytics Dashboard",
      description: "Build comprehensive analytics for customer insights",
      dueDate: new Date("2024-09-01"),
      progress: 0,
      status: "Upcoming",
      tags: ["Analytics", "Frontend"],
      assignees: [
        { id: 6, name: "Frank Miller", avatar: "FM" }
      ]
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "Delayed":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Delayed":
        return "bg-red-100 text-red-800";
      case "Upcoming":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredMilestones = milestones.filter(milestone => {
    if (milestoneFilter === "all") return true;
    return milestone.status.toLowerCase().replace(" ", "") === milestoneFilter;
  });

  const handleMarkComplete = (milestoneId: number) => {
    setMilestones(prev => prev.map(milestone => 
      milestone.id === milestoneId 
        ? { ...milestone, status: "Completed", progress: 100 }
        : milestone
    ));
    toast({
      title: "Milestone completed",
      description: "The milestone has been marked as complete.",
    });
  };

  const handleCreateMilestone = (newMilestone: any) => {
    const milestone = {
      id: milestones.length + 1,
      ...newMilestone,
      progress: 0,
      status: "Upcoming",
      tags: [],
      assignees: []
    };
    setMilestones([...milestones, milestone]);
    toast({
      title: "Milestone created",
      description: "New milestone has been added to the roadmap.",
    });
  };

  const progressStats = {
    completed: milestones.filter(m => m.status === "Completed").length,
    inProgress: milestones.filter(m => m.status === "In Progress").length,
    upcoming: milestones.filter(m => m.status === "Upcoming").length,
    total: milestones.length
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
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
            <h1 className="text-3xl font-bold text-gray-900">{roadmapData.title}</h1>
            <p className="text-gray-600 mt-1">{roadmapData.description}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Edit Roadmap
          </Button>
        </div>
      </div>

      {/* Roadmap Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Roadmap Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-600">Owner / Team</div>
            <div className="mt-1">
              <div className="text-sm font-medium">{roadmapData.owner}</div>
              <div className="text-sm text-gray-600">{roadmapData.team}</div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600">Date Range</div>
            <div className="mt-1 text-sm">
              {roadmapData.startDate.toLocaleDateString()} - {roadmapData.endDate.toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600">Status</div>
            <div className="mt-1">
              <Badge className={getStatusColor(roadmapData.status)}>
                {roadmapData.status}
              </Badge>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600">Progress</div>
            <div className="mt-1">
              <div className="text-sm font-medium">
                {progressStats.completed}/{progressStats.total} completed
              </div>
              <Progress 
                value={(progressStats.completed / progressStats.total) * 100} 
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="milestones" className="space-y-6">
        <TabsList>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="progress">Progress Summary</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones" className="space-y-4">
          {/* Milestones Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold">Milestones</h3>
              <Select value={milestoneFilter} onValueChange={setMilestoneFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setIsCreateMilestoneOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </div>

          {/* Milestones List */}
          <div className="space-y-4">
            {filteredMilestones.map((milestone) => (
              <Card key={milestone.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(milestone.status)}
                        <h4 className="text-lg font-semibold">{milestone.name}</h4>
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{milestone.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {milestone.dueDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{milestone.progress}% complete</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3">
                        <div className="flex -space-x-2">
                          {milestone.assignees.map((assignee) => (
                            <Avatar key={assignee.id} className="w-6 h-6 border-2 border-white">
                              <AvatarFallback className="text-xs">{assignee.avatar}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="flex space-x-1">
                          {milestone.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Progress value={milestone.progress} className="mt-3" />
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {milestone.status !== "Completed" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleMarkComplete(milestone.id)}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Mark Complete
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <RoadmapProgressCharts milestones={milestones} />
        </TabsContent>

        <TabsContent value="comments">
          <RoadmapComments roadmapId={parseInt(id)} />
        </TabsContent>
      </Tabs>

      <CreateMilestoneModal
        isOpen={isCreateMilestoneOpen}
        onClose={() => setIsCreateMilestoneOpen(false)}
        onSubmit={handleCreateMilestone}
      />
    </div>
  );
};

export default RoadmapDetail;
