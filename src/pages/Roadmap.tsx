
import { MapPin, Plus, Edit, Trash2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Roadmap = () => {
  const milestones = [
    {
      id: 1,
      title: "MVP Launch",
      description: "Launch the minimum viable product with core features",
      dueDate: "2024-03-15",
      status: "In Progress",
      progress: 60,
      tasks: 12,
      completedTasks: 7,
    },
    {
      id: 2,
      title: "Beta Testing",
      description: "Conduct comprehensive beta testing with selected users",
      dueDate: "2024-04-30",
      status: "Planned",
      progress: 0,
      tasks: 8,
      completedTasks: 0,
    },
    {
      id: 3,
      title: "Production Release",
      description: "Full production release with all features and optimizations",
      dueDate: "2024-06-15",
      status: "Planned",
      progress: 0,
      tasks: 15,
      completedTasks: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planned": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAction = (action: string, milestoneId?: number) => {
    console.log(`${action} milestone ${milestoneId || ""}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Roadmap</h2>
          <p className="text-gray-600 mt-1">Plan and track your project milestones</p>
        </div>
        <Button 
          onClick={() => handleAction("create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Milestone
        </Button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative flex items-start space-x-6">
              {/* Timeline dot */}
              <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white border-4 border-blue-600 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              
              {/* Milestone card */}
              <Card className="flex-1 hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {milestone.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{milestone.dueDate}</span>
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction("edit", milestone.id)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction("delete", milestone.id)}
                        className="p-2 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{milestone.description}</p>
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Progress ({milestone.completedTasks}/{milestone.tasks} tasks)
                      </span>
                      <span className="font-medium text-gray-900">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
