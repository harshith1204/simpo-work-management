
import { Users, User, ArrowUpDown, Filter } from "lucide-react";
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

const TeamTasks = () => {
  const teamTasks = [
    {
      id: 1,
      title: "Design system component library",
      assignee: "Emily Davis",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-02-18",
      project: "Design System",
      progress: 65,
      team: "Design",
    },
    {
      id: 2,
      title: "API security audit",
      assignee: "David Park",
      status: "Open",
      priority: "Critical",
      dueDate: "2024-02-16",
      project: "Security",
      progress: 0,
      team: "Backend",
    },
    {
      id: 3,
      title: "Mobile app performance optimization",
      assignee: "Alex Rodriguez",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2024-02-20",
      project: "Mobile App",
      progress: 40,
      team: "Mobile",
    },
    {
      id: 4,
      title: "User feedback analysis",
      assignee: "Sarah Chen",
      status: "Review",
      priority: "Medium",
      dueDate: "2024-02-19",
      project: "Research",
      progress: 90,
      team: "Product",
    },
    {
      id: 5,
      title: "Database migration planning",
      assignee: "Mike Johnson",
      status: "Open",
      priority: "Low",
      dueDate: "2024-02-25",
      project: "Infrastructure",
      progress: 0,
      team: "DevOps",
    },
    {
      id: 6,
      title: "Marketing automation setup",
      assignee: "Lisa Wang",
      status: "Completed",
      priority: "Medium",
      dueDate: "2024-02-14",
      project: "Marketing",
      progress: 100,
      team: "Marketing",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Review": return "bg-purple-100 text-purple-800";
      case "Open": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
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

  const getTeamColor = (team: string) => {
    const colors = {
      "Design": "bg-pink-100 text-pink-800",
      "Backend": "bg-blue-100 text-blue-800",
      "Mobile": "bg-purple-100 text-purple-800",
      "Product": "bg-indigo-100 text-indigo-800",
      "DevOps": "bg-gray-100 text-gray-800",
      "Marketing": "bg-green-100 text-green-800",
    };
    return colors[team as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const teams = [...new Set(teamTasks.map(task => task.team))];

  return (
    <div className="space-y-6 font-dm-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Tasks</h2>
          <p className="text-gray-600 mt-1">{teamTasks.length} tasks across {teams.length} teams</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="px-4 py-2 rounded-lg">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Team
          </Button>
          <Button className="bg-[#270E2B] hover:bg-[#270E2B]/90 text-white px-6 py-2 rounded-lg font-medium">
            <Users className="w-4 h-4 mr-2" />
            Assign Task
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {teams.map((team) => {
          const teamTaskCount = teamTasks.filter(task => task.team === team).length;
          return (
            <Card key={team}>
              <CardContent className="p-3 text-center">
                <Badge className={getTeamColor(team)} variant="outline">
                  {team}
                </Badge>
                <div className="text-lg font-bold text-gray-900 mt-2">{teamTaskCount}</div>
                <div className="text-xs text-gray-600">Tasks</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tasks Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                    Task
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                    Assignee
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamTasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900 hover:text-[#270E2B] cursor-pointer">
                        {task.title}
                      </div>
                      <div className="text-sm text-gray-500">{task.project}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-[#270E2B] rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-600">{task.assignee}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTeamColor(task.team)} variant="outline">
                      {task.team}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#270E2B] transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{task.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{task.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamTasks;
