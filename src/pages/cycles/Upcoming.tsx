
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock } from "lucide-react";

const Upcoming = () => {
  const upcomingCycles = [
    {
      id: 1,
      name: "July Sprint",
      startDate: "July 1, 2024",
      endDate: "July 31, 2024",
      owner: "Rahul",
      plannedIssues: 25,
      status: "Planned"
    }
  ];

  return (
    <div className="space-y-6 font-dm-sans">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Upcoming Cycles</h2>
        <p className="text-gray-600 mt-1">Plan and prepare for future development cycles</p>
      </div>

      <div className="grid gap-6">
        {upcomingCycles.map((cycle) => (
          <Card key={cycle.id} className="hover:shadow-md transition-shadow border-dashed">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{cycle.name}</CardTitle>
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  <Clock className="w-3 h-3 mr-1" />
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
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">Planned Issues</span>
                    <span className="text-lg font-bold text-blue-900">{cycle.plannedIssues}</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">Issues will be assigned when cycle starts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
