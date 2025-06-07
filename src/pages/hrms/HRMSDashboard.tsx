
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Clock, Banknote, AlertTriangle, FileText, TrendingUp, CheckCircle } from "lucide-react";

const HRMSDashboard = () => {
  const stats = [
    {
      title: "Total Employees",
      value: "248",
      icon: Users,
      color: "bg-blue-500",
      change: "+12 this month"
    },
    {
      title: "On Leave Today",
      value: "18",
      icon: Calendar,
      color: "bg-orange-500",
      change: "3 pending approval"
    },
    {
      title: "Late Check-ins",
      value: "7",
      icon: Clock,
      color: "bg-red-500",
      change: "Today's count"
    },
    {
      title: "Payroll Status",
      value: "95%",
      icon: Banknote,
      color: "bg-green-500",
      change: "Processed for Nov"
    }
  ];

  const quickActions = [
    { title: "Add New Employee", icon: Users, color: "bg-blue-50 text-blue-600" },
    { title: "Process Payroll", icon: Banknote, color: "bg-green-50 text-green-600" },
    { title: "Leave Approvals", icon: Calendar, color: "bg-orange-50 text-orange-600" },
    { title: "Upload Documents", icon: FileText, color: "bg-purple-50 text-purple-600" }
  ];

  const recentActivities = [
    { action: "New employee onboarded", employee: "Priya Sharma", time: "2 hours ago", type: "success" },
    { action: "Leave request submitted", employee: "Rajesh Kumar", time: "4 hours ago", type: "pending" },
    { action: "Payroll processed", employee: "November 2024", time: "1 day ago", type: "success" },
    { action: "Document uploaded", employee: "Anita Desai", time: "2 days ago", type: "info" }
  ];

  const complianceStatus = [
    { item: "PF Returns", status: "Filed", dueDate: "15 Nov 2024", statusColor: "text-green-600" },
    { item: "ESI Returns", status: "Pending", dueDate: "21 Nov 2024", statusColor: "text-orange-600" },
    { item: "TDS Returns", status: "Due", dueDate: "30 Nov 2024", statusColor: "text-red-600" },
    { item: "PT Returns", status: "Filed", dueDate: "15 Nov 2024", statusColor: "text-green-600" }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">HRMS Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your workforce today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-900">{action.title}</span>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'pending' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.employee}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Compliance Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">{item.item}</p>
                  <p className="text-xs text-gray-500">Due: {item.dueDate}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: "Engineering", count: 85, percentage: 34 },
                { dept: "Sales", count: 45, percentage: 18 },
                { dept: "Marketing", count: 32, percentage: 13 },
                { dept: "Operations", count: 28, percentage: 11 },
                { dept: "HR", count: 15, percentage: 6 },
                { dept: "Finance", count: 43, percentage: 17 }
              ].map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{dept.dept}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{dept.count} employees</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full" 
                        style={{ width: `${dept.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: "Team Building Activity", date: "Dec 15, 2024", type: "Company Event" },
                { event: "Performance Reviews Q4", date: "Dec 20-31, 2024", type: "HR Process" },
                { event: "Holiday Party", date: "Dec 22, 2024", type: "Celebration" },
                { event: "New Year Break", date: "Jan 1-2, 2025", type: "Holiday" }
              ].map((event, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100">
                  <Calendar className="w-4 h-4 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{event.event}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HRMSDashboard;
