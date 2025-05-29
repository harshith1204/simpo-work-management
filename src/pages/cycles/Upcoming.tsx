
import { Calendar, Users, Edit, Play, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Upcoming = () => {
  const upcomingCycles = [
    {
      id: 1,
      name: "Q1 2025 Planning Sprint",
      startDate: "Dec 1, 2024",
      duration: "2 weeks",
      endDate: "Dec 15, 2024",
      goal: "Plan and prioritize features for Q1 2025 roadmap",
      teamMembers: ["Alex", "Maya", "Riya", "Karan", "Aditi"],
      plannedIssues: 25,
      status: "Ready to Start",
    },
    {
      id: 2,
      name: "Holiday Season Maintenance",
      startDate: "Dec 20, 2024",
      duration: "1 week",
      endDate: "Dec 27, 2024",
      goal: "Critical bug fixes and system maintenance during holiday period",
      teamMembers: ["Tom", "Sarah"],
      plannedIssues: 8,
      status: "Scheduled",
    },
    {
      id: 3,
      name: "New Year Feature Launch",
      startDate: "Jan 2, 2025",
      duration: "3 weeks",
      endDate: "Jan 23, 2025",
      goal: "Launch major new features planned for the new year",
      teamMembers: ["Mike", "Anna", "Lisa", "David"],
      plannedIssues: 35,
      status: "In Planning",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready to Start": return "bg-green-100 text-green-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "In Planning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Cycles</h2>
          <p className="text-gray-600 mt-1">Scheduled cycles that haven't started yet</p>
        </div>
        <Button 
          className="px-6 py-2 rounded-lg font-medium bg-[#3A0044] hover:bg-[#3A0044]/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Cycle
        </Button>
      </div>

      {/* Upcoming Cycles */}
      {upcomingCycles.length > 0 ? (
        <div className="space-y-6">
          {upcomingCycles.map((cycle) => (
            <Card key={cycle.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                      {cycle.name}
                    </CardTitle>
                    <Badge className={getStatusColor(cycle.status)}>
                      {cycle.status}
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-[#3A0044] hover:bg-[#3A0044]/90 text-white"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start Now
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Goal */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Objective</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {cycle.goal}
                  </p>
                </div>

                {/* Timeline and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium text-gray-900">Start Date</div>
                      <div className="text-sm text-gray-600">{cycle.startDate}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">Duration</div>
                      <div className="text-sm text-gray-600">{cycle.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="font-medium text-gray-900">End Date</div>
                      <div className="text-sm text-gray-600">{cycle.endDate}</div>
                    </div>
                  </div>
                </div>

                {/* Team and Issues */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Team:</span>
                      <div className="flex space-x-1">
                        {cycle.teamMembers.slice(0, 3).map((member, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {member}
                          </span>
                        ))}
                        {cycle.teamMembers.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            +{cycle.teamMembers.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{cycle.plannedIssues}</span> planned issues
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="text-center p-12">
          <CardContent>
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No upcoming cycles created yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start planning your next sprint or cycle to keep your team organized and productive.
            </p>
            <Button 
              className="px-6 py-2 rounded-lg font-medium bg-[#3A0044] hover:bg-[#3A0044]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Cycle
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{upcomingCycles.length}</div>
            <div className="text-sm text-gray-600">Upcoming Cycles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {upcomingCycles.reduce((acc, cycle) => acc + cycle.plannedIssues, 0)}
            </div>
            <div className="text-sm text-gray-600">Planned Issues</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {[...new Set(upcomingCycles.flatMap(cycle => cycle.teamMembers))].length}
            </div>
            <div className="text-sm text-gray-600">Team Members</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upcoming;
