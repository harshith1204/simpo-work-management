
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Roadmap = () => {
  const milestones = [
    { name: "User Research", start: "Mar 1", end: "Mar 15", color: "bg-blue-500", project: "Website Redesign" },
    { name: "Design Phase", start: "Mar 16", end: "Apr 5", color: "bg-purple-500", project: "Website Redesign" },
    { name: "Development", start: "Apr 6", end: "May 1", color: "bg-green-500", project: "Website Redesign" },
    { name: "App Wireframes", start: "Mar 10", end: "Mar 25", color: "bg-orange-500", project: "Mobile App" },
    { name: "App Development", start: "Mar 26", end: "May 15", color: "bg-red-500", project: "Mobile App" },
  ];

  const months = ["March 2024", "April 2024", "May 2024"];

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">Filter by Project</Button>
          <Button variant="outline" size="sm">Filter by Team</Button>
          <Button variant="outline" size="sm">Filter by Owner</Button>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <Card className="swiss-card">
        <CardHeader>
          <CardTitle>Project Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Timeline Header */}
              <div className="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-gray-200">
                {months.map((month, index) => (
                  <div key={index} className="text-center">
                    <h3 className="font-semibold text-gray-900">{month}</h3>
                  </div>
                ))}
              </div>

              {/* Milestones */}
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-32 text-sm font-medium text-gray-600">
                      {milestone.project}
                    </div>
                    <div className="flex-1 relative">
                      <div className="grid grid-cols-3 gap-4 h-12">
                        <div className="relative">
                          {milestone.start.includes("Mar") && (
                            <div className={`absolute left-2 top-2 h-8 rounded px-3 flex items-center text-white text-xs font-medium ${milestone.color}`}>
                              {milestone.name}
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          {milestone.start.includes("Apr") && (
                            <div className={`absolute left-2 top-2 h-8 rounded px-3 flex items-center text-white text-xs font-medium ${milestone.color}`}>
                              {milestone.name}
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          {milestone.start.includes("May") && (
                            <div className={`absolute left-2 top-2 h-8 rounded px-3 flex items-center text-white text-xs font-medium ${milestone.color}`}>
                              {milestone.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="swiss-card">
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Website Redesign</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm">Mobile App</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Roadmap;
