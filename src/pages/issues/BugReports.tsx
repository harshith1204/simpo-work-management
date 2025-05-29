
import { Bug, AlertTriangle, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BugReports = () => {
  const bugReports = [
    {
      id: "BUG-001",
      title: "Memory leak in image processing component",
      severity: "Critical",
      reporter: "Alex Rodriguez",
      status: "Open",
      created: "2024-02-15",
      affectedUsers: 850,
      environment: "Production",
      browser: "Chrome, Firefox",
    },
    {
      id: "BUG-002", 
      title: "Form validation errors not displaying",
      severity: "High",
      reporter: "Sarah Chen",
      status: "In Progress",
      created: "2024-02-14",
      affectedUsers: 234,
      environment: "Production",
      browser: "Safari",
    },
    {
      id: "BUG-003",
      title: "Inconsistent button styling across pages",
      severity: "Medium",
      reporter: "Emily Davis",
      status: "Open",
      created: "2024-02-13",
      affectedUsers: 45,
      environment: "Staging",
      browser: "All Browsers",
    },
    {
      id: "BUG-004",
      title: "Tooltip positioning incorrect on mobile",
      severity: "Low",
      reporter: "Mike Johnson",
      status: "Confirmed",
      created: "2024-02-12",
      affectedUsers: 12,
      environment: "Production",
      browser: "Mobile Safari",
    },
    {
      id: "BUG-005",
      title: "API response caching not working properly",
      severity: "High",
      reporter: "David Park",
      status: "Open",
      created: "2024-02-11",
      affectedUsers: 567,
      environment: "Production",
      browser: "All Browsers",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800 border-red-300";
      case "High": return "bg-orange-100 text-orange-800 border-orange-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Low": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Confirmed": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
      case "High":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Bug className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bug Reports</h2>
          <p className="text-gray-600 mt-1">{bugReports.length} bugs reported and tracked</p>
        </div>
        <Button className="bg-[#270E2B] hover:bg-[#270E2B]/90 text-white px-6 py-2 rounded-lg font-medium">
          <Bug className="w-4 h-4 mr-2" />
          Report Bug
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600">Critical Bugs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <div className="text-sm text-gray-600">High Severity</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">1,708</div>
            <div className="text-sm text-gray-600">Affected Users</div>
          </CardContent>
        </Card>
      </div>

      {/* Bug Reports List */}
      <div className="space-y-4">
        {bugReports.map((bug) => (
          <Card key={bug.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className={getSeverityColor(bug.severity)}>
                      {getSeverityIcon(bug.severity)}
                      <span className="ml-1">{bug.severity}</span>
                    </Badge>
                    <Badge className={getStatusColor(bug.status)}>
                      {bug.status}
                    </Badge>
                    <span className="text-sm font-medium text-[#270E2B]">{bug.id}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#270E2B] cursor-pointer">
                    {bug.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{bug.reporter}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{bug.created}</span>
                    </div>
                    <div>
                      <span className="font-medium">Environment:</span> {bug.environment}
                    </div>
                    <div>
                      <span className="font-medium">Browser:</span> {bug.browser}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{bug.affectedUsers}</div>
                  <div className="text-sm text-gray-600">Affected Users</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BugReports;
