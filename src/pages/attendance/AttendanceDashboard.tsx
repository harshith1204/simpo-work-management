
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
  Settings,
  TrendingUp,
  TrendingDown,
  Eye,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AttendanceDashboard = () => {
  const kpiData = [
    { 
      title: "Total Employees", 
      value: "253", 
      change: "+5%",
      trend: "up",
      icon: Users, 
      color: "text-blue-600",
      bgColor: "bg-blue-50" 
    },
    { 
      title: "Present Today", 
      value: "235", 
      change: "+2.3%",
      trend: "up",
      icon: Clock, 
      color: "text-green-600",
      bgColor: "bg-green-50" 
    },
    { 
      title: "Late Arrivals", 
      value: "7", 
      change: "-1.2%",
      trend: "down",
      icon: AlertTriangle, 
      color: "text-orange-600",
      bgColor: "bg-orange-50" 
    },
    { 
      title: "On Leave", 
      value: "8", 
      change: "+0.5%",
      trend: "up",
      icon: Calendar, 
      color: "text-purple-600",
      bgColor: "bg-purple-50" 
    },
    { 
      title: "Remote Work", 
      value: "3", 
      change: "+12%",
      trend: "up",
      icon: Home, 
      color: "text-cyan-600",
      bgColor: "bg-cyan-50" 
    },
  ];

  const recentActivities = [
    { 
      employee: "Priya Sharma", 
      action: "Checked in", 
      time: "9:15 AM",
      status: "on-time",
      avatar: "PS" 
    },
    { 
      employee: "Rajesh Kumar", 
      action: "Late arrival", 
      time: "9:45 AM",
      status: "late",
      avatar: "RK" 
    },
    { 
      employee: "Anita Desai", 
      action: "Requested regularization", 
      time: "10:30 AM",
      status: "pending",
      avatar: "AD" 
    },
    { 
      employee: "Vikram Singh", 
      action: "Checked out", 
      time: "6:00 PM",
      status: "completed",
      avatar: "VS" 
    },
  ];

  const departmentStats = [
    { name: "Engineering", present: 45, total: 50, percentage: 90 },
    { name: "Sales", present: 28, total: 30, percentage: 93 },
    { name: "Marketing", present: 18, total: 20, percentage: 90 },
    { name: "HR", present: 8, total: 10, percentage: 80 },
    { name: "Finance", present: 12, total: 15, percentage: 80 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Overview</h1>
          <p className="text-gray-600 mt-1">Monitor and manage employee attendance across your organization</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <div className="text-right">
            <p className="text-sm text-gray-500">Today, {new Date().toLocaleDateString()}</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{kpi.value}</p>
                  <div className="flex items-center space-x-1">
                    <TrendIcon className={`w-4 h-4 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last week</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trends */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Attendance Trends</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center border border-blue-100">
              <div className="text-center text-gray-600">
                <Clock className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                <p className="font-medium">Weekly Attendance Chart</p>
                <p className="text-sm">Integration with charting library</p>
              </div>
            </div>
            
            {/* Department Stats */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Department Attendance</h4>
              <div className="space-y-3">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-gray-900">{dept.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{dept.present}/{dept.total}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${dept.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-10">{dept.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Live Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-700">{activity.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.employee}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <Badge 
                      variant="outline" 
                      className={
                        activity.status === "on-time" ? "border-green-200 text-green-700 bg-green-50" :
                        activity.status === "late" ? "border-orange-200 text-orange-700 bg-orange-50" :
                        activity.status === "pending" ? "border-yellow-200 text-yellow-700 bg-yellow-50" :
                        "border-blue-200 text-blue-700 bg-blue-50"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg font-semibold">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Attention Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">5 employees missed check-out</p>
                    <p className="text-sm text-gray-600">Yesterday</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">3 regularization requests pending</p>
                    <p className="text-sm text-gray-600">Awaiting approval</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Shift change request</p>
                    <p className="text-sm text-gray-600">Marketing team</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
                <Download className="w-5 h-5" />
                <span className="text-sm">Download Report</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
                <Bell className="w-5 h-5" />
                <span className="text-sm">Send Notifications</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
                <Settings className="w-5 h-5" />
                <span className="text-sm">Mark Exception</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">Bulk Update</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
