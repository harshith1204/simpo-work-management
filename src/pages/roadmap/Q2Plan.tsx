
import { Target, Calendar, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Q2Plan = () => {
  const q2Initiatives = [
    {
      id: 1,
      title: "Advanced Analytics Dashboard",
      description: "Build comprehensive analytics and reporting capabilities",
      owner: "Data Team",
      progress: 15,
      status: "Planning",
      startDate: "2024-04-01",
      endDate: "2024-05-30",
      budget: "$85,000",
      priority: "High",
      objectives: [
        "Real-time data visualization",
        "Custom report builder",
        "Export functionality",
        "Performance metrics tracking"
      ]
    },
    {
      id: 2,
      title: "Multi-language Support",
      description: "Internationalization and localization for global markets",
      owner: "Frontend Team",
      progress: 0,
      status: "Not Started",
      startDate: "2024-04-15",
      endDate: "2024-06-15",
      budget: "$65,000",
      priority: "Medium",
      objectives: [
        "Translation infrastructure",
        "RTL language support",
        "Currency localization",
        "Date/time formatting"
      ]
    },
    {
      id: 3,
      title: "Advanced Search & Filtering",
      description: "Implement intelligent search with AI-powered recommendations",
      owner: "Product Team",
      progress: 30,
      status: "In Progress",
      startDate: "2024-04-01",
      endDate: "2024-05-15",
      budget: "$55,000",
      priority: "Critical",
      objectives: [
        "Elasticsearch integration",
        "Fuzzy search capabilities",
        "Smart filters and suggestions",
        "Search analytics"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Near Completion": return "bg-purple-100 text-purple-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      case "Not Started": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const totalBudget = q2Initiatives.reduce((sum, initiative) => sum + parseInt(initiative.budget.replace(/[$,]/g, '')), 0);
  const averageProgress = q2Initiatives.reduce((sum, initiative) => sum + initiative.progress, 0) / q2Initiatives.length;

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Q2 2024 Plan</h2>
          <p className="text-gray-600 mt-1">Strategic initiatives and key projects for second quarter</p>
        </div>
      </div>

      {/* Q2 Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Initiatives</p>
                <p className="text-2xl font-bold text-blue-600">{q2Initiatives.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Progress</p>
                <p className="text-2xl font-bold text-green-600">{averageProgress.toFixed(0)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-purple-600">${totalBudget.toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Teams Involved</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Initiatives */}
      <div className="space-y-6">
        {q2Initiatives.map((initiative) => (
          <Card key={initiative.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {initiative.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm mb-3">{initiative.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{initiative.owner}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{initiative.startDate} - {initiative.endDate}</span>
                    </div>
                    <div className="font-medium text-gray-900">{initiative.budget}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getPriorityColor(initiative.priority)}>
                    {initiative.priority}
                  </Badge>
                  <Badge className={getStatusColor(initiative.status)}>
                    {initiative.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">Progress</span>
                    <span className="text-gray-600">{initiative.progress}%</span>
                  </div>
                  <Progress value={initiative.progress} className="h-2" />
                </div>

                {/* Objectives */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Key Objectives</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {initiative.objectives.map((objective, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-[#270E2B] rounded-full"></div>
                        <span>{objective}</span>
                      </div>
                    ))}
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

export default Q2Plan;
