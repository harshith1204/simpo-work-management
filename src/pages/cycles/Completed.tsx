
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, CheckCircle } from "lucide-react";

const Completed = () => {
  const completedCycles = [
    {
      id: 1,
      name: "May Sprint",
      startDate: "May 1, 2024",
      endDate: "May 31, 2024",
      owner: "Sarah",
      progress: 100,
      totalIssues: 18,
      completedIssues: 18,
      status: "Completed",
      completedOn: "May 31, 2024"
    }
  ];

  return (
    <div className="space-y-6 font-dm-sans">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Completed Cycles</h2>
        <p className="text-gray-600 mt-1">Review your finished development cycles</p>
      </div>

      <div className="grid gap-6">
        {completedCycles.map((cycle) => (
          <Card key={cycle.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{cycle.name}</CardTitle>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {cycle.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Start: {cycle.startDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">End: {cycle.endDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Owner: {cycle.owner}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Final Results</span>
                    <span className="text-sm text-gray-600">{cycle.completedIssues}/{cycle.totalIssues} issues completed</span>
                  </div>
                  <Progress value={cycle.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{cycle.progress}% complete</span>
                    <span>Completed on {cycle.completedOn}</span>
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
