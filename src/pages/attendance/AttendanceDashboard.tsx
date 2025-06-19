
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Home, 
  Download,
  Bell,
  Settings
} from "lucide-react";

const AttendanceDashboard = () => {
  const kpiData = [
    { title: "Total Employees", value: "253", icon: Users, color: "text-blue-600" },
    { title: "Present Today", value: "235", icon: Clock, color: "text-green-600" },
    { title: "Late Comers", value: "7", icon: AlertTriangle, color: "text-orange-600" },
    { title: "On Leave", value: "8", icon: Calendar, color: "text-purple-600" },
    { title: "Working Remotely", value: "3", icon: Home, color: "text-cyan-600" },
  ];

  const recentAlerts = [
    { employee: "Priya Sharma", issue: "Missed check-out", time: "2 hours ago" },
    { employee: "Rajesh Kumar", issue: "Late arrival", time: "3 hours ago" },
    { employee: "Anita Desai", issue: "Shift change request", time: "5 hours ago" },
  ];

  const quickActions = [
    { label: "Download Report", icon: Download },
    { label: "Send Notifications", icon: Bell },
    { label: "Mark Exception", icon: Settings },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and manage employee attendance at a glance</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today, {new Date().toLocaleDateString()}</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-2" />
                <p>Attendance chart will be displayed here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Status */}
        <Card>
          <CardHeader>
            <CardTitle>Live Check-in Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Present</span>
                <Badge className="bg-green-100 text-green-800">235</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Late</span>
                <Badge className="bg-orange-100 text-orange-800">7</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Absent</span>
                <Badge className="bg-red-100 text-red-800">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">On Leave</span>
                <Badge className="bg-blue-100 text-blue-800">8</Badge>
              </div>
            </div>
            <div className="mt-4 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-sm">Pie Chart</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Recent Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{alert.employee}</p>
                    <p className="text-sm text-gray-600">{alert.issue}</p>
                  </div>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button key={index} variant="outline" className="justify-start h-12">
                    <Icon className="w-4 h-4 mr-3" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-2" />
              <p>Monthly attendance heatmap will be displayed here</p>
              <p className="text-sm">Shows irregularities and patterns</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceDashboard;
