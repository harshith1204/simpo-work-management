
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, BarChart3 } from "lucide-react";
import BarChart from "@/components/BarChart";
import DonutChart from "@/components/DonutChart";

const Analytics = () => {
  // Dummy data for charts
  const issuesClosedData = [
    { name: "Week 1", value: 12 },
    { name: "Week 2", value: 8 },
    { name: "Week 3", value: 15 },
    { name: "Week 4", value: 10 },
    { name: "Week 5", value: 18 },
  ];

  const tasksCompletedData = [
    { name: "Alex", value: 24 },
    { name: "Maya", value: 18 },
    { name: "Rohan", value: 32 },
    { name: "Sarah", value: 16 },
    { name: "Dev Team", value: 28 },
  ];

  const projectStatusData = [
    { name: "In Progress", value: 45, color: "#3D5AFE" },
    { name: "Completed", value: 30, color: "#4CAF50" },
    { name: "On Hold", value: 15, color: "#FF9800" },
    { name: "Planning", value: 10, color: "#9C27B0" },
  ];

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600 mt-1">Performance insights and metrics</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Issues Resolved</p>
                <p className="text-2xl font-bold text-gray-900">63</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Team Productivity</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
                <p className="text-xs text-green-600">+5% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-blue-600">3 due this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues Closed Over Time - Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Issues Closed Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={issuesClosedData} 
              color="#3D5AFE"
            />
          </CardContent>
        </Card>

        {/* Project Status Distribution - Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Project Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={projectStatusData} />
          </CardContent>
        </Card>
      </div>

      {/* Tasks Completed by Team - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Tasks Completed by Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart 
            data={tasksCompletedData} 
            color="#4CAF50"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
