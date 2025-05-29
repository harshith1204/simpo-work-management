
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateCycleModal from "@/components/CreateCycleModal";
import { useToast } from "@/hooks/use-toast";
import CycleCard from "@/components/CycleCard";
import CycleFilters from "@/components/CycleFilters";
import CycleSummaryStats from "@/components/CycleSummaryStats";

const Active = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const activeCycles = [
    {
      id: 1,
      name: "June Sprint",
      startDate: "Jun 1, 2024",
      endDate: "Jun 30, 2024",
      progress: 60,
      status: "In Progress",
      totalIssues: 20,
      completedIssues: 12,
      team: ["Anjali", "Rohan", "Dev Team", "+2"],
      owner: "Anjali",
    },
    {
      id: 2,
      name: "Bug Fix Cycle - Critical Issues",
      startDate: "Jun 10, 2024",
      endDate: "Jun 20, 2024",
      progress: 40,
      status: "In Progress",
      totalIssues: 15,
      completedIssues: 6,
      team: ["Karan", "Aditi"],
      owner: "Karan",
    },
    {
      id: 3,
      name: "UI/UX Improvements",
      startDate: "Jun 5, 2024",
      endDate: "Jun 25, 2024",
      progress: 25,
      status: "Blocked",
      totalIssues: 18,
      completedIssues: 4,
      team: ["Sarah", "Tom", "Lisa"],
      owner: "Sarah",
    },
    {
      id: 4,
      name: "Performance Optimization",
      startDate: "Jun 8, 2024",
      endDate: "Jun 22, 2024",
      progress: 80,
      status: "In Progress",
      totalIssues: 12,
      completedIssues: 10,
      team: ["Mike", "Anna"],
      owner: "Mike",
    },
  ];

  const handleCreateCycle = (cycleData: any) => {
    console.log("Creating cycle:", cycleData);
    toast({
      title: "Cycle created successfully",
      description: `${cycleData.title} has been created and is now active.`,
    });
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Active Cycles</h2>
          <p className="text-gray-600 mt-1">Current sprints and cycles in progress</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="font-dm-sans">
          <Plus className="w-4 h-4 mr-2" />
          Create New Cycle
        </Button>
      </div>

      {/* Filters and Sorting */}
      <CycleFilters />

      {/* Active Cycles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeCycles.map((cycle) => (
          <CycleCard key={cycle.id} cycle={cycle} />
        ))}
      </div>

      {/* Summary Stats */}
      <CycleSummaryStats activeCycles={activeCycles} />

      {/* Create Cycle Modal */}
      <CreateCycleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCycle}
      />
    </div>
  );
};

export default Active;
