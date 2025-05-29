
import { Calendar, Plus, User, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Roadmap = () => {
  const milestones = [
    {
      id: 1,
      title: "New Website Launch",
      targetDate: "July 10, 2024",
      owner: "Product Team",
      status: "In Progress",
      description: "Complete redesign and launch of the company website with new features",
      progress: 65,
    },
    {
      id: 2,
      title: "Onboarding Flow Revamp",
      targetDate: "August 1, 2024",
      owner: "UX Team",
      status: "Planned",
      description: "Improve user onboarding experience with guided tutorials and simplified signup",
      progress: 0,
    },
    {
      id: 3,
      title: "Mobile App Beta Release",
      targetDate: "September 15, 2024",
      owner: "Mobile Team",
      status: "Planned",
      description: "Release beta version of mobile application for testing",
      progress: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planned": return "bg-gray-100 text-gray-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Delayed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress": return <Clock className="w-4 h-4 text-blue-600" />;
      case "Completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Delayed": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Roadmap</h2>
          <p className="text-gray-600 mt-1">Strategic milestones and project timeline</p>
        </div>
        <Button className="px-6 py-2 rounded-lg font-medium">
          <Plus className="w-4 h-4 mr-2" />
          Add Roadmap Item
        </Button>
      </div>

      {/* Timeline View */}
      <div className="space-y-6">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="relative">
            {/* Timeline Line */}
            {index < milestones.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-24 bg-gray-200"></div>
            )}
            
            {/* Timeline Dot */}
            <div className="absolute left-4 top-8 w-4 h-4 bg-white border-4 border-blue-500 rounded-full"></div>
            
            {/* Milestone Card */}
            <Card className="ml-12 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(milestone.status)}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(milestone.status)}
                          <span>{milestone.status}</span>
                        </span>
                      </Badge>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Target: {milestone.targetDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {milestone.description}
                </p>
                
                {/* Progress Bar (only for In Progress items) */}
                {milestone.status === "In Progress" && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Owner */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      <span className="font-medium">Owner:</span> {milestone.owner}
                    </span>
                  </div>
                  
                  <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {milestones.filter(m => m.status === "In Progress").length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">
              {milestones.filter(m => m.status === "Planned").length}
            </div>
            <div className="text-sm text-gray-600">Planned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {milestones.filter(m => m.status === "Completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Roadmap;
