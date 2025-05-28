
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card className="swiss-card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Welcome back, John Doe</CardTitle>
          <p className="text-gray-600">Here's what's happening with your projects today.</p>
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="swiss-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">12</div>
            <p className="text-sm text-gray-500">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="swiss-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">24</div>
            <p className="text-sm text-gray-500">-5 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="swiss-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Upcoming Sprints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">3</div>
            <p className="text-sm text-gray-500">Starting next week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Timeline */}
        <Card className="swiss-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Project Alpha updated", time: "2 hours ago", user: "Sarah Wilson" },
                { action: "New task assigned", time: "4 hours ago", user: "Mike Johnson" },
                { action: "Sprint planning completed", time: "1 day ago", user: "Team Lead" },
                { action: "Code review finished", time: "2 days ago", user: "David Chen" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Productivity Chart Placeholder */}
        <Card className="swiss-card">
          <CardHeader>
            <CardTitle>Productivity Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
              <p className="text-gray-500">Productivity Chart</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
