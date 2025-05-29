
import { CheckSquare, ArrowUpDown, Check } from "lucide-react";
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

const AssignedToMe = () => {
  const tasks = [
    {
      id: 1,
      name: "Design wireframes for mobile app",
      project: "Product Launch",
      dueDate: "2024-02-15",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Fix mobile responsiveness issues",
      project: "Website Redesign",
      dueDate: "2024-02-20",
      priority: "Medium",
      status: "To Do",
    },
    {
      id: 3,
      name: "Implement user authentication flow",
      project: "Onboarding System",
      dueDate: "2024-02-18",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 4,
      name: "Write API documentation",
      project: "Product Launch",
      dueDate: "2024-02-22",
      priority: "Medium",
      status: "To Do",
    },
    {
      id: 5,
      name: "Create email campaign templates",
      project: "Marketing Q3",
      dueDate: "2024-02-10",
      priority: "Low",
      status: "Done",
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
          <h2 className="text-2xl font-bold text-gray-900">Assigned to Me</h2>
          <p className="text-gray-600 mt-1">Tasks currently assigned to you</p>
        </div>
        <div className="text-sm text-gray-600">
          {tasks.filter(task => task.status !== "Done").length} active tasks
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
                    Due Date
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                    Priority
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
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
                    {task.status !== "Done" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Mark Done
                      </Button>
                    )}
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

export default AssignedToMe;
