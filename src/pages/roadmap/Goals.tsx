
import { Target, CheckCircle2, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Goals = () => {
  const goals = [
    {
      id: 1,
      title: "Increase User Engagement",
      description: "Improve daily active users and session duration",
      target: 75,
      current: 62,
      deadline: "2024-06-30",
      status: "On Track",
      metrics: [
        { name: "Daily Active Users", target: "10,000", current: "8,300" },
        { name: "Session Duration", target: "15 min", current: "12 min" },
        { name: "Page Views per Session", target: "8", current: "6.5" }
      ]
    },
    {
      id: 2,
      title: "Improve Platform Performance",
      description: "Reduce load times and optimize user experience",
      target: 90,
      current: 85,
      deadline: "2024-05-15",
      status: "Nearly Complete",
      metrics: [
        { name: "Page Load Time", target: "< 2s", current: "2.1s" },
        { name: "API Response Time", target: "< 200ms", current: "180ms" },
        { name: "Uptime", target: "99.9%", current: "99.8%" }
      ]
    },
    {
      id: 3,
      title: "Expand Market Reach",
      description: "Launch in 3 new geographical markets",
      target: 33,
      current: 11,
      deadline: "2024-12-31",
      status: "Behind Schedule",
      metrics: [
        { name: "New Markets", target: "3", current: "1" },
        { name: "Localization", target: "100%", current: "33%" },
        { name: "Regional Partnerships", target: "6", current: "2" }
      ]
    },
    {
      id: 4,
      title: "Customer Satisfaction",
      description: "Achieve industry-leading customer satisfaction scores",
      target: 95,
      current: 88,
      deadline: "2024-08-31",
      status: "On Track",
      metrics: [
        { name: "NPS Score", target: "70", current: "65" },
        { name: "Support Rating", target: "4.8/5", current: "4.6/5" },
        { name: "Feature Requests", target: "< 50", current: "62" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nearly Complete": return "bg-green-100 text-green-800";
      case "On Track": return "bg-blue-100 text-blue-800";
      case "Behind Schedule": return "bg-red-100 text-red-800";
      case "At Risk": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 70) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const overallProgress = goals.reduce((sum, goal) => sum + (goal.current / goal.target) * 100, 0) / goals.length;

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">2024 Goals & Objectives</h2>
          <p className="text-gray-600 mt-1">Track progress towards key strategic goals</p>
        </div>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Goals</p>
                <p className="text-2xl font-bold text-blue-600">{goals.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold text-green-600">{overallProgress.toFixed(0)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On Track</p>
                <p className="text-2xl font-bold text-purple-600">
                  {goals.filter(g => g.status === "On Track" || g.status === "Nearly Complete").length}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Behind Schedule</p>
                <p className="text-2xl font-bold text-orange-600">
                  {goals.filter(g => g.status === "Behind Schedule" || g.status === "At Risk").length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals */}
      <div className="space-y-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {goal.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {goal.deadline}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>Target: {goal.target}%</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                  {goal.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">Overall Progress</span>
                    <span className="text-gray-600">{((goal.current / goal.target) * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                </div>

                {/* Metrics */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-3">Key Metrics</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {goal.metrics.map((metric, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs font-medium text-gray-600 mb-1">{metric.name}</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-900">{metric.current}</span>
                          <span className="text-xs text-gray-500">of {metric.target}</span>
                        </div>
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

export default Goals;
