
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateMilestoneModal from "@/components/CreateMilestoneModal";
import { useToast } from "@/hooks/use-toast";
import RoadmapOverview from "@/components/roadmap/RoadmapOverview";
import MilestoneTimeline from "@/components/roadmap/MilestoneTimeline";

const Roadmap = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log("Roadmap page loaded");

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
    console.log("Navigating to roadmap:", roadmapId);
    navigate(`/roadmap/${roadmapId}`);
  };

  const handleViewMilestone = (milestoneId: number) => {
    console.log("Navigating to milestone:", milestoneId);
    navigate(`/milestone/${milestoneId}`);
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
      <RoadmapOverview 
        roadmaps={roadmaps}
        onViewRoadmap={handleViewRoadmap}
        getStatusColor={getStatusColor}
      />

      {/* Timeline View */}
      <MilestoneTimeline 
        milestones={milestones}
        onViewMilestone={handleViewMilestone}
        getStatusColor={getStatusColor}
      />

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
