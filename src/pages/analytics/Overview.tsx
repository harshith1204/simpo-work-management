
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const Overview = () => {
  const completionData = [
    { month: "Jan", completed: 45, total: 60 },
    { month: "Feb", completed: 52, total: 65 },
    { month: "Mar", completed: 48, total: 55 },
    { month: "Apr", completed: 61, total: 70 },
    { month: "May", completed: 55, total: 62 },
    { month: "Jun", completed: 58, total: 68 },
  ];

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-600 mt-1">Project completion trends and key metrics</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Task Completion Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">5d</div>
            <p className="text-xs text-gray-500 mt-1">2 days faster than last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Open Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">14</div>
            <p className="text-xs text-gray-500 mt-1">3 new issues this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Closed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">75</div>
            <p className="text-xs text-gray-500 mt-1">12% increase from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Project Completion Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Project Completion Trends</CardTitle>
          <p className="text-sm text-gray-600">Monthly completion rates over the past 6 months</p>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Completed Tasks"
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#E5E7EB" 
                  strokeWidth={2}
                  name="Total Tasks"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
