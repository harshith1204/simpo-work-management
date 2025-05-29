
import { CheckSquare, Clock, User, ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClosedIssues = () => {
  const closedIssues = [
    {
      id: "ISS-010",
      title: "Fix navigation menu dropdown on Safari",
      reporter: "Lisa Wang",
      resolvedBy: "Alex Rodriguez", 
      priority: "Medium",
      closedDate: "2024-02-10",
      resolution: "Fixed",
      timeToResolve: "3 days",
    },
    {
      id: "ISS-009",
      title: "Implement dark mode toggle",
      reporter: "David Park",
      resolvedBy: "Emily Davis",
      priority: "Low",
      closedDate: "2024-02-08",
      resolution: "Completed",
      timeToResolve: "5 days",
    },
    {
      id: "ISS-008",
      title: "Security vulnerability in auth system",
      reporter: "Mike Johnson",
      resolvedBy: "James Lee",
      priority: "Critical",
      closedDate: "2024-02-06",
      resolution: "Fixed",
      timeToResolve: "1 day",
    },
    {
      id: "ISS-007",
      title: "Performance optimization for search feature",
      reporter: "Sarah Chen",
      resolvedBy: "Kevin Brown",
      priority: "High",
      closedDate: "2024-02-05",
      resolution: "Completed",
      timeToResolve: "4 days",
    },
    {
      id: "ISS-006",
      title: "Update user onboarding flow",
      reporter: "Tom Wilson",
      resolvedBy: "Anna Martinez",
      priority: "Medium",
      closedDate: "2024-02-03",
      resolution: "Completed",
      timeToResolve: "7 days",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getResolutionColor = (resolution: string) => {
    switch (resolution) {
      case "Fixed": return "bg-green-100 text-green-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Closed Issues</h2>
          <p className="text-gray-600 mt-1">{closedIssues.length} issues resolved successfully</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{closedIssues.length}</div>
            <div className="text-sm text-gray-600">Total Resolved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4.2</div>
            <div className="text-sm text-gray-600">Avg Days to Resolve</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <div className="text-sm text-gray-600">Resolution Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <div className="text-sm text-gray-600">Critical Fixed</div>
          </CardContent>
        </Card>
      </div>

      {/* Closed Issues Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                    Issue ID
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="w-[300px]">
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                    Title
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Resolved By</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Resolution</TableHead>
                <TableHead>Closed Date</TableHead>
                <TableHead>Time to Resolve</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {closedIssues.map((issue) => (
                <TableRow key={issue.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-[#270E2B]">{issue.id}</TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{issue.title}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-[#270E2B] rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-600">{issue.reporter}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-600">{issue.resolvedBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(issue.priority)}>
                      {issue.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getResolutionColor(issue.resolution)}>
                      <CheckSquare className="w-3 h-3 mr-1" />
                      {issue.resolution}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{issue.closedDate}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{issue.timeToResolve}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClosedIssues;
