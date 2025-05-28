
import { useState } from "react";
import { Bug, Plus, Eye, CheckCircle, RotateCcw, Trash2, Filter, Search, List, Calendar, Grid3X3, Table, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Issues = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priority: "all",
    state: "all",
    assignee: "all",
    label: "all",
  });

  const issues = [
    {
      id: "ISS-001",
      title: "Login page not responsive on mobile",
      priority: "High",
      status: "Open",
      reporter: "John Doe",
      assignee: "Jane Smith",
      created: "2024-01-10",
      labels: ["UI", "Mobile"],
    },
    {
      id: "ISS-002",
      title: "Payment gateway timeout error",
      priority: "Critical",
      status: "In Progress",
      reporter: "Mike Johnson",
      assignee: "John Doe",
      created: "2024-01-12",
      labels: ["Backend", "Payment"],
    },
    {
      id: "ISS-003",
      title: "Incorrect validation message",
      priority: "Medium",
      status: "Resolved",
      reporter: "Sarah Wilson",
      assignee: "Mike Johnson",
      created: "2024-01-08",
      labels: ["Frontend", "Validation"],
    },
    {
      id: "ISS-004",
      title: "Dashboard loading performance",
      priority: "Low",
      status: "Open",
      reporter: "Alex Brown",
      assignee: "Sarah Wilson",
      created: "2024-01-14",
      labels: ["Performance", "Dashboard"],
    },
  ];

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filters.priority === "all" || issue.priority === filters.priority;
    const matchesState = filters.state === "all" || issue.status === filters.state;
    const matchesAssignee = filters.assignee === "all" || issue.assignee === filters.assignee;
    const matchesLabel = filters.label === "all" || issue.labels.includes(filters.label);

    return matchesSearch && matchesPriority && matchesState && matchesAssignee && matchesLabel;
  });

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
    if (action === "view" && issueId) {
      navigate(`/issues/${issueId}`);
    } else {
      console.log(`${action} issue ${issueId || ""}`);
    }
  };

  const handleCreateIssue = () => {
    console.log("Create new issue");
  };

  const viewOptions = [
    { id: "list", label: "List", icon: List },
    { id: "kanban", label: "Kanban", icon: Grid3X3 },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "spreadsheet", label: "Spreadsheet", icon: Table },
  ];

  const renderListView = () => (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bug className="w-5 h-5 text-red-600" />
          <span>All Issues ({filteredIssues.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TableComponent>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Labels</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIssues.map((issue) => (
              <TableRow key={issue.id} className="hover:bg-gray-50 transition-colors duration-200">
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
                  <div className="flex flex-wrap gap-1">
                    {issue.labels.map((label) => (
                      <Badge key={label} variant="outline" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAction("view", issue.id)}
                      className="p-1 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {issue.status !== "Resolved" ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction("resolve", issue.id)}
                        className="p-1 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction("reopen", issue.id)}
                        className="p-1 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAction("delete", issue.id)}
                      className="p-1 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableComponent>
      </CardContent>
    </Card>
  );

  const renderKanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      {["Open", "In Progress", "Resolved"].map((status) => (
        <Card key={status} className="hover-scale transition-transform duration-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              {status} ({filteredIssues.filter(issue => issue.status === status).length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredIssues
              .filter(issue => issue.status === status)
              .map((issue) => (
                <Card key={issue.id} className="p-3 hover:shadow-md cursor-pointer transition-all duration-200 hover-scale" onClick={() => handleAction("view", issue.id)}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600">{issue.id}</span>
                      <Badge className={getPriorityColor(issue.priority)} variant="outline">
                        {issue.priority}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{issue.title}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{issue.assignee}</span>
                      <div className="flex gap-1">
                        {issue.labels.slice(0, 2).map((label) => (
                          <Badge key={label} variant="outline" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderCalendarView = () => (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Calendar View</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="p-2">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 6;
            const issuesForDay = day > 0 && day <= 31 ? 
              filteredIssues.filter(issue => new Date(issue.created).getDate() === day) : [];
            
            return (
              <div key={i} className="min-h-[100px] p-2 border rounded transition-colors duration-200 hover:bg-gray-50">
                {day > 0 && day <= 31 && (
                  <>
                    <div className="text-sm font-medium mb-1">{day}</div>
                    {issuesForDay.map(issue => (
                      <div key={issue.id} className="text-xs p-1 bg-blue-100 rounded mb-1 cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                           onClick={() => handleAction("view", issue.id)}>
                        {issue.id}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const renderSpreadsheetView = () => (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Spreadsheet View</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">ID</th>
                <th className="text-left p-2 font-medium">Title</th>
                <th className="text-left p-2 font-medium">Priority</th>
                <th className="text-left p-2 font-medium">Status</th>
                <th className="text-left p-2 font-medium">Reporter</th>
                <th className="text-left p-2 font-medium">Assignee</th>
                <th className="text-left p-2 font-medium">Created</th>
                <th className="text-left p-2 font-medium">Labels</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="border-b hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={() => handleAction("view", issue.id)}>
                  <td className="p-2 text-blue-600 font-medium">{issue.id}</td>
                  <td className="p-2">{issue.title}</td>
                  <td className="p-2">{issue.priority}</td>
                  <td className="p-2">{issue.status}</td>
                  <td className="p-2">{issue.reporter}</td>
                  <td className="p-2">{issue.assignee}</td>
                  <td className="p-2">{issue.created}</td>
                  <td className="p-2">{issue.labels.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case "kanban":
        return renderKanbanView();
      case "calendar":
        return renderCalendarView();
      case "spreadsheet":
        return renderSpreadsheetView();
      default:
        return renderListView();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Issues</h2>
        </div>
        <Button 
          onClick={handleCreateIssue}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Issue
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="transition-colors duration-200 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 animate-scale-in">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Priority</label>
                  <Select value={filters.priority} onValueChange={(value) => setFilters({...filters, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Priorities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">State</label>
                  <Select value={filters.state} onValueChange={(value) => setFilters({...filters, state: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Assignee</label>
                  <Select value={filters.assignee} onValueChange={(value) => setFilters({...filters, assignee: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Assignees" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assignees</SelectItem>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                      <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Labels</label>
                  <Select value={filters.label} onValueChange={(value) => setFilters({...filters, label: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Labels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Labels</SelectItem>
                      <SelectItem value="UI">UI</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Performance">Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* View Segment Control */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          {viewOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.id}
                variant={currentView === option.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView(option.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
                  currentView === option.id 
                    ? "bg-white shadow-sm text-blue-600" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden md:inline">{option.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {renderCurrentView()}
    </div>
  );
};

export default Issues;
