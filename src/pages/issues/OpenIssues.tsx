import { useState } from "react";
import { Bug, ArrowUpDown, Eye, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import CreateIssueModal from "@/components/CreateIssueModal";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const OpenIssues = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const [issues, setIssues] = useState([
    {
      id: "ISS-001",
      title: "Login page not responsive on mobile devices",
      reporter: "Sarah Chen",
      assignee: "Alex Rodriguez",
      priority: "High",
      status: "In Progress",
      created: "2024-02-15",
      labels: ["bug", "frontend"],
    },
    {
      id: "ISS-002", 
      title: "API rate limiting causing timeouts",
      reporter: "Mike Johnson",
      assignee: "David Park",
      priority: "Critical",
      status: "Open",
      created: "2024-02-14",
      labels: ["backend", "performance"],
    },
    {
      id: "ISS-003",
      title: "User profile images not loading correctly",
      reporter: "Emily Davis",
      assignee: "Lisa Wang",
      priority: "Medium",
      status: "Open",
      created: "2024-02-13",
      labels: ["bug", "ui"],
    },
    {
      id: "ISS-004",
      title: "Database connection pooling optimization",
      reporter: "Tom Wilson",
      assignee: "James Lee",
      priority: "Low",
      status: "Open",
      created: "2024-02-12",
      labels: ["enhancement", "backend"],
    },
    {
      id: "ISS-005",
      title: "Email notifications not being sent",
      reporter: "Anna Martinez",
      assignee: "Kevin Brown",
      priority: "High",
      status: "In Progress",
      created: "2024-02-11",
      labels: ["bug", "email"],
    },
  ]);

  const { toast } = useToast();

  const handleCreateIssue = (newIssue: any) => {
    setIssues([newIssue, ...issues]);
    toast({
      title: "Issue created successfully",
      description: `Issue ${newIssue.id} has been created and added to the list.`,
    });
  };

  const handleViewDetails = (issueId: string) => {
    navigate(`/issues/${issueId}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Open": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Open Issues</h2>
          <p className="text-gray-600 mt-1">{issues.length} active issues need attention</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <AlertCircle className="w-4 h-4 mr-2" />
          Create Issue
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600">Critical</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">3</div>
            <div className="text-sm text-gray-600">Unassigned</div>
          </CardContent>
        </Card>
      </div>

      {/* Issues Table */}
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
                <TableHead>Assignee</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-[#270E2B]">{issue.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900 hover:text-[#270E2B] cursor-pointer">
                        {issue.title}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {issue.labels.map((label) => (
                          <Badge key={label} variant="outline" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{issue.reporter}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{issue.assignee}</span>
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
                  <TableCell className="text-gray-600">
                    <span>{issue.created}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(issue.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateIssueModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateIssue}
      />
    </div>
  );
};

export default OpenIssues;
