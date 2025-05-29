
import { Calendar, TrendingUp, Users, Eye, Filter, ArrowUpDown, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import CreateCycleModal from "@/components/CreateCycleModal";
import { useToast } from "@/hooks/use-toast";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Blocked": return "bg-red-100 text-red-800";
      case "On Track": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="rounded-full bg-blue-50 text-blue-600 border-blue-300">
                All cycles
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Assigned to me
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
              <option>Sort by start date</option>
              <option>Sort by progress %</option>
              <option>Sort by end date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Cycles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeCycles.map((cycle) => (
          <Card key={cycle.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {cycle.name}
                  </CardTitle>
                  <Badge className={getStatusColor(cycle.status)}>
                    {cycle.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-semibold text-gray-900">{cycle.progress}%</span>
                </div>
                <Progress value={cycle.progress} className="h-2" />
              </div>

              {/* Issues Stats */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {cycle.completedIssues} of {cycle.totalIssues} issues completed
                </span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>

              {/* Dates */}
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{cycle.startDate}</span>
                </div>
                <span>→</span>
                <span>{cycle.endDate}</span>
              </div>

              {/* Owner */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">Owner:</span> {cycle.owner}
              </div>

              {/* Team */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <div className="flex space-x-1">
                    {cycle.team.map((member, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                  <Eye className="w-4 h-4 mr-1" />
                  View Cycle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{activeCycles.length}</div>
            <div className="text-sm text-gray-600">Active Cycles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(activeCycles.reduce((acc, cycle) => acc + cycle.progress, 0) / activeCycles.length)}%
            </div>
            <div className="text-sm text-gray-600">Average Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {activeCycles.reduce((acc, cycle) => acc + cycle.totalIssues, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Issues</div>
          </CardContent>
        </Card>
      </div>

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
