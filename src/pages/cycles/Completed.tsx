
import { Calendar, CheckCircle, Users, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Completed = () => {
  const completedCycles = [
    {
      id: 1,
      name: "May Sprint",
      startDate: "May 1, 2024",
      endDate: "May 31, 2024",
      completionRate: 85,
      status: "Completed",
      totalIssues: 24,
      completedIssues: 20,
      team: ["Anjali", "Rohan", "Sarah", "+3"],
      owner: "Rohan",
    },
    {
      id: 2,
      name: "April Sprint - Feature Development",
      startDate: "Apr 1, 2024",
      endDate: "Apr 30, 2024",
      completionRate: 92,
      status: "Completed",
      totalIssues: 18,
      completedIssues: 17,
      team: ["Dev Team", "QA"],
      owner: "Dev Team",
    },
    {
      id: 3,
      name: "March Bug Fixes",
      startDate: "Mar 15, 2024",
      endDate: "Mar 31, 2024",
      completionRate: 100,
      status: "Completed",
      totalIssues: 12,
      completedIssues: 12,
      team: ["Karan", "Aditi", "QA Team"],
      owner: "Karan",
    },
  ];

  const getCompletionColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 75) return "text-blue-600";
    return "text-yellow-600";
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Completed Cycles</h2>
          <p className="text-gray-600 mt-1">Past sprints and cycles that have been finished</p>
        </div>
      </div>

      {/* Completed Cycles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {completedCycles.map((cycle) => (
          <Card key={cycle.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {cycle.name}
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {cycle.status}
                  </Badge>
                </div>
                <div className={`text-2xl font-bold ${getCompletionColor(cycle.completionRate)}`}>
                  {cycle.completionRate}%
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Completion Stats */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">Completion Rate:</span> {cycle.completedIssues} of {cycle.totalIssues} issues completed
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
                  View Details
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
            <div className="text-2xl font-bold text-green-600">{completedCycles.length}</div>
            <div className="text-sm text-gray-600">Completed Cycles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(completedCycles.reduce((acc, cycle) => acc + cycle.completionRate, 0) / completedCycles.length)}%
            </div>
            <div className="text-sm text-gray-600">Average Completion</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {completedCycles.reduce((acc, cycle) => acc + cycle.completedIssues, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Issues Resolved</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Completed;
