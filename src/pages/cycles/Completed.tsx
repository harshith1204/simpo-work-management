
import { Calendar, Download, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Completed = () => {
  const completedCycles = [
    {
      id: 1,
      name: "April Sprint",
      completionDate: "April 30, 2024",
      startDate: "April 1, 2024",
      endDate: "April 30, 2024",
      successRate: 92,
      totalIssues: 25,
      completedIssues: 23,
      missedIssues: 2,
      completedEarly: true,
      team: "Development Team",
    },
  ];

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getSuccessRateBg = (rate: number) => {
    if (rate >= 90) return "bg-green-100";
    if (rate >= 75) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Completed Cycles</h2>
          <p className="text-gray-600 mt-1">Recently finished sprints and cycles</p>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{completedCycles.length}</div>
            <div className="text-sm text-gray-600">Cycles Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(completedCycles.reduce((acc, cycle) => acc + cycle.successRate, 0) / completedCycles.length)}%
            </div>
            <div className="text-sm text-gray-600">Average Success Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {completedCycles.reduce((acc, cycle) => acc + cycle.completedIssues, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Issues Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {completedCycles.reduce((acc, cycle) => acc + cycle.missedIssues, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Issues Missed</div>
          </CardContent>
        </Card>
      </div>

      {/* Completed Cycles List */}
      <div className="space-y-4">
        {completedCycles.map((cycle) => (
          <Card key={cycle.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {cycle.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Completed: {cycle.completionDate}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          Status: Completed
                        </Badge>
                        {cycle.completedEarly && (
                          <Badge className="bg-green-100 text-green-800">
                            Completed Early
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`text-right p-3 rounded-lg ${getSuccessRateBg(cycle.successRate)}`}>
                        <div className={`text-2xl font-bold ${getSuccessRateColor(cycle.successRate)}`}>
                          {cycle.successRate}%
                        </div>
                        <div className="text-xs text-gray-600">Completion Rate</div>
                      </div>
                      
                      <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                        <Download className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-semibold text-gray-900">{cycle.completedIssues}</div>
                        <div className="text-sm text-gray-600">Completed Issues</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <div className="font-semibold text-gray-900">{cycle.missedIssues}</div>
                        <div className="text-sm text-gray-600">Missed Issues</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-semibold text-gray-900">{cycle.totalIssues}</div>
                        <div className="text-sm text-gray-600">Total Issues</div>
                      </div>
                    </div>
                  </div>

                  {/* Team and Duration */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Team:</span> {cycle.team}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Duration:</span> {cycle.startDate} → {cycle.endDate}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Completed;
