
import { FolderOpen, CheckSquare, Bug, TrendingUp } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const quickAccessCards = [
    { title: "New Task", icon: CheckSquare, action: () => console.log("Create new task") },
    { title: "View Projects", icon: FolderOpen, action: () => console.log("View projects") },
    { title: "Report Issue", icon: Bug, action: () => console.log("Report issue") },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
        <p className="text-gray-600">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={12}
          icon={FolderOpen}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Active Tasks"
          value={48}
          icon={CheckSquare}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Open Issues"
          value={6}
          icon={Bug}
          trend={{ value: 3, isPositive: false }}
        />
        <StatCard
          title="Completed This Week"
          value={23}
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickAccessCards.map((card) => {
              const Icon = card.icon;
              return (
                <Button
                  key={card.title}
                  variant="outline"
                  onClick={card.action}
                  className="h-24 flex flex-col items-center justify-center space-y-2 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <Icon className="w-6 h-6 text-gray-600" />
                  <span className="font-medium text-gray-700">{card.title}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Task completed", item: "Fix login bug", time: "2 hours ago" },
              { action: "Project created", item: "Mobile App Redesign", time: "5 hours ago" },
              { action: "Issue reported", item: "Payment gateway error", time: "1 day ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
