
import { Calendar, Target, Users, Plus, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateMilestoneModal from "@/components/CreateMilestoneModal";
import { useToast } from "@/hooks/use-toast";

const Roadmap = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const milestones = [
    {
      id: 1,
      name: "Website Revamp",
      targetDate: "July 15, 2024",
      status: "In Progress",
      owner: "Product Team",
      description: "Complete redesign of the main website with new UI/UX",
      progress: 65,
    },
    {
      id: 2,
      name: "Mobile App Alpha",
      targetDate: "Aug 1, 2024",
      status: "Planned",
      owner: "Mobile Team",
      description: "First alpha version of the mobile application",
      progress: 20,
    },
    {
      id: 3,
      name: "API v2.0 Release",
      targetDate: "Sep 15, 2024",
      status: "Planned",
      owner: "Backend Team",
      description: "New version of API with enhanced features",
      progress: 10,
    },
    {
      id: 4,
      name: "Customer Dashboard",
      targetDate: "Oct 1, 2024",
      status: "Planned",
      owner: "Frontend Team",
      description: "New customer-facing dashboard with analytics",
      progress: 5,
    },
  ];

  const roadmaps = [
    {
      id: 1,
      title: "Q3 Growth Plan",
      description: "Strategic initiatives to drive user acquisition and product expansion",
      status: "Active",
      progress: 65,
      milestones: 4
    },
    {
      id: 2,
      title: "Product Roadmap 2024",
      description: "Major product features and improvements for the year",
      status: "Active",
      progress: 40,
      milestones: 6
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planned": return "bg-gray-100 text-gray-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "On Hold": return "bg-yellow-100 text-yellow-800";
      case "Active": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateMilestone = (milestoneData: any) => {
    console.log("Creating milestone:", milestoneData);
    toast({
      title: "Milestone created successfully",
      description: `${milestoneData.name} has been added to the roadmap.`,
    });
  };

  const handleViewRoadmap = (roadmapId: number) => {
    navigate(`/roadmap/${roadmapId}`);
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Roadmap</h2>
          <p className="text-gray-600 mt-1">Project milestones and strategic initiatives</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="font-dm-sans">
          <Plus className="w-4 h-4 mr-2" />
          Add Milestone
        </Button>
      </div>

      {/* Roadmaps Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {roadmaps.map((roadmap) => (
          <Card key={roadmap.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{roadmap.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{roadmap.description}</p>
                </div>
                <Badge className={getStatusColor(roadmap.status)}>
                  {roadmap.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{roadmap.milestones} milestones</span>
                  <span className="font-medium">{roadmap.progress}% complete</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${roadmap.progress}%` }}
                  ></div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={() => handleViewRoadmap(roadmap.id)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline View */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Milestones</h3>
        {milestones.map((milestone, index) => (
          <Card key={milestone.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                {/* Timeline Indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{milestone.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Target: {milestone.targetDate}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">
                      <span className="font-medium">Owner:</span> {milestone.owner}
                    </div>
                    <div className="font-medium text-blue-600">{milestone.progress}% Complete</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Milestone Modal */}
      <CreateMilestoneModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateMilestone}
      />
    </div>
  );
};

export default Roadmap;
