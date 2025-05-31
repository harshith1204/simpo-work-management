
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Clock } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  priority: string;
  dueDate: string;
  blockedBy: string | null;
  status: string;
}

interface IssueTableProps {
  issues: Issue[];
}

const IssueTable = ({ issues }: IssueTableProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Issue ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Blocked By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                No issues found
              </TableCell>
            </TableRow>
          ) : (
            issues.map((issue) => (
              <TableRow key={issue.id} className="hover:bg-gray-50">
                <TableCell className="font-mono text-sm text-blue-600">
                  {issue.id}
                </TableCell>
                <TableCell className="font-medium">
                  {issue.title}
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(issue.priority)}>
                    {issue.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {isOverdue(issue.dueDate) && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                    <span className={isOverdue(issue.dueDate) ? "text-red-600" : "text-gray-600"}>
                      {issue.dueDate}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {issue.blockedBy ? (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span className="text-yellow-600 font-mono text-sm">
                        {issue.blockedBy}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssueTable;
