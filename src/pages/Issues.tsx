
import { Bug, Plus, Eye, CheckCircle, RotateCcw, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Issues = () => {
  const issues = [
    {
      id: "ISS-001",
      title: "Login page not responsive on mobile",
      priority: "High",
      status: "Open",
      reporter: "John Doe",
      assignee: "Jane Smith",
      created: "2024-01-10",
    },
    {
      id: "ISS-002",
      title: "Payment gateway timeout error",
      priority: "Critical",
      status: "In Progress",
      reporter: "Mike Johnson",
      assignee: "John Doe",
      created: "2024-01-12",
    },
    {
      id: "ISS-003",
      title: "Incorrect validation message",
      priority: "Medium",
      status: "Resolved",
      reporter: "Sarah Wilson",
      assignee: "Mike Johnson",
      created: "2024-01-08",
    },
    {
      id: "ISS-004",
      title: "Dashboard loading performance",
      priority: "Low",
      status: "Open",
      reporter: "Alex Brown",
      assignee: "Sarah Wilson",
      created: "2024-01-14",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Open": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAction = (action: string, issueId?: string) => {
    console.log(`${action} issue ${issueId || ""}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Issues</h2>
          <p className="text-gray-600 mt-1">Track bugs and issues in your projects</p>
        </div>
        <Button 
          onClick={() => handleAction("create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Report Issue
        </Button>
      </div>

      {/* Issues Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bug className="w-5 h-5 text-red-600" />
            <span>All Issues</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600">
                    {issue.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Bug className="w-4 h-4 text-red-500" />
                      <span>{issue.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(issue.priority)}>
                      {issue.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(issue.status)}>
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{issue.reporter}</TableCell>
                  <TableCell>{issue.assignee}</TableCell>
                  <TableCell>{issue.created}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction("view", issue.id)}
                        className="p-1 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {issue.status !== "Resolved" ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAction("resolve", issue.id)}
                          className="p-1 hover:bg-green-50 hover:text-green-600"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAction("reopen", issue.id)}
                          className="p-1 hover:bg-yellow-50 hover:text-yellow-600"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction("delete", issue.id)}
                        className="p-1 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Issues;
