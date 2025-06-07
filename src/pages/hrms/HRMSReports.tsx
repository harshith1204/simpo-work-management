
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, TrendingUp, Users, Calendar } from "lucide-react";

const HRMSReports = () => {
  const reportTypes = [
    { name: "Employee Demographics", description: "Age, gender, department distribution", icon: Users },
    { name: "Attendance Reports", description: "Monthly attendance and punctuality", icon: Calendar },
    { name: "Payroll Summary", description: "Salary costs and deductions analysis", icon: TrendingUp },
    { name: "Leave Analytics", description: "Leave patterns and utilization", icon: BarChart3 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Generate insights and reports for strategic HR decisions</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export All Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">{report.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <Button variant="outline" size="sm">Generate Report</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Analytics Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
            <p className="text-gray-600 mb-4">Interactive charts and insights will appear here</p>
            <Button variant="outline">
              Configure Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRMSReports;
