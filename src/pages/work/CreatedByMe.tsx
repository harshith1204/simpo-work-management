
import { CheckSquare, ArrowUpDown, Edit, Trash2, User } from "lucide-react";
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

const CreatedByMe = () => {
  const tasks = [
    {
      id: 1,
      name: "Create mobile app wireframes",
      project: "Product Launch",
      dueDate: "2024-02-15",
      priority: "High",
      status: "In Progress",
      assignedTo: "Riya Sharma",
    },
    {
      id: 2,
      name: "Setup user analytics dashboard",
      project: "Analytics Platform",
      dueDate: "2024-02-20",
      priority: "Medium",
      status: "To Do",
      assignedTo: "Alex Johnson",
    },
    {
      id: 3,
      name: "Conduct user research interviews",
      project: "UX Research",
      dueDate: "2024-02-18",
      priority: "High",
      status: "Done",
      assignedTo: "Maya Gupta",
    },
    {
      id: 4,
      name: "Optimize database queries",
      project: "Performance Improvement",
      dueDate: "2024-02-22",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Karan Patel",
    },
    {
      id: 5,
      name: "Write integration test cases",
      project: "Quality Assurance",
      dueDate: "2024-02-25",
      priority: "Low",
      status: "To Do",
      assignedTo: "Aditi Singh",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "To Do": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Created by Me</h2>
          <p className="text-gray-600 mt-1">Tasks and issues you have created</p>
        </div>
        <div className="text-sm text-gray-600">
          {tasks.length} total tasks
        </div>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                    Task Name
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                    Project
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                    Assigned To
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                    Due Date
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                        {task.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{task.project}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-[#3A0044] rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-600">{task.assignedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{task.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-red-50 hover:text-red-600"
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

export default CreatedByMe;
