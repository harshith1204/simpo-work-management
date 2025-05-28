
import { TrendingUp, BarChart3, Clock, Target } from "lucide-react";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";
import DonutChart from "@/components/DonutChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analytics = () => {
  const sprintVelocityData = [
    { name: 'Sprint 1', value: 24 },
    { name: 'Sprint 2', value: 32 },
    { name: 'Sprint 3', value: 28 },
    { name: 'Sprint 4', value: 35 },
    { name: 'Sprint 5', value: 42 },
    { name: 'Sprint 6', value: 38 }
  ];

  const taskCompletionData = [
    { name: 'Completed', value: 65, color: '#10B981' },
    { name: 'In Progress', value: 20, color: '#3B82F6' },
    { name: 'Pending', value: 15, color: '#F59E0B' }
  ];

  const teamPerformanceData = [
    { name: 'John Doe', value: 42 },
    { name: 'Jane Smith', value: 38 },
    { name: 'Mike Johnson', value: 35 },
    { name: 'Sarah Wilson', value: 40 },
    { name: 'Alex Brown', value: 33 }
  ];

  const weeklyProgressData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 19 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 22 },
    { name: 'Fri', value: 18 },
    { name: 'Sat', value: 8 },
    { name: 'Sun', value: 5 }
  ];

  return (
    <div className="space-y-8">
      {/* Header with Date Range Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your team's performance and project insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Clock className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button>
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Sprint Velocity"
          value="38"
          icon={TrendingUp}
          description="Story points per sprint"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Task Completion Rate"
          value="87%"
          icon={Target}
          description="This month"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Average Cycle Time"
          value="4.2 days"
          icon={Clock}
          description="Time to complete tasks"
          trend={{ value: -8, isPositive: false }}
        />
        <StatCard
          title="Active Projects"
          value="12"
          icon={BarChart3}
          description="Currently in progress"
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="velocity">Sprint Velocity</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="tasks">Task Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Task Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart data={taskCompletionData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={weeklyProgressData} title="" color="#007BFF" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="velocity" className="space-y-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Sprint Velocity Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={sprintVelocityData} title="" color="#10B981" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance (Tasks Completed)</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={teamPerformanceData} title="" color="#8B5CF6" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart data={taskCompletionData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Task Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium">Today</span>
                    <span className="text-lg font-bold text-green-600">8 completed</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium">Yesterday</span>
                    <span className="text-lg font-bold text-blue-600">12 completed</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium">This Week</span>
                    <span className="text-lg font-bold text-purple-600">45 completed</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium">This Month</span>
                    <span className="text-lg font-bold text-orange-600">156 completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
