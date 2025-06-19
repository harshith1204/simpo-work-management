
import { useState } from "react";
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
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Plus,
  Eye,
  MessageCircle,
  Download,
  UserCheck,
  UserX,
  Send
} from "lucide-react";

const RequestsManagement = () => {
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const requests = [
    {
      id: 1,
      employee: "Priya Sharma",
      department: "Engineering",
      type: "Regularisation",
      date: "Dec 19, 2024",
      time: "09:45 AM - 06:30 PM",
      reason: "Traffic jam due to heavy rain",
      status: "Pending",
      submittedOn: "Dec 20, 2024 10:30 AM",
      approver: "Rajesh Kumar",
      avatar: "PS",
      priority: "Normal"
    },
    {
      id: 2,
      employee: "Vikram Singh",
      department: "Sales",
      type: "Permission",
      date: "Dec 20, 2024",
      time: "02:00 PM - 04:00 PM",
      reason: "Doctor appointment",
      status: "Approved",
      submittedOn: "Dec 19, 2024 09:15 AM",
      approver: "Neha Patel",
      avatar: "VS",
      priority: "High"
    },
    {
      id: 3,
      employee: "Anita Desai",
      department: "Design",
      type: "Regularisation",
      date: "Dec 18, 2024",
      time: "10:15 AM - 07:00 PM",
      reason: "Client meeting ran longer than expected",
      status: "Rejected",
      submittedOn: "Dec 19, 2024 11:45 AM",
      approver: "Rajesh Kumar",
      avatar: "AD",
      priority: "Normal"
    },
    {
      id: 4,
      employee: "Rohit Sharma",
      department: "Marketing",
      type: "Permission",
      date: "Dec 21, 2024",
      time: "10:00 AM - 12:00 PM",
      reason: "Bank work",
      status: "Pending",
      submittedOn: "Dec 20, 2024 08:30 AM",
      approver: "Neha Patel",
      avatar: "RS",
      priority: "Low"
    },
    {
      id: 5,
      employee: "Kavita Gupta",
      department: "HR",
      type: "Regularisation",
      date: "Dec 17, 2024",
      time: "08:30 AM - 05:45 PM",
      reason: "Forgot to check out",
      status: "Approved",
      submittedOn: "Dec 18, 2024 09:00 AM",
      approver: "Neha Patel",
      avatar: "KG",
      priority: "Normal"
    },
  ];

  const stats = [
    { title: "Total Requests", value: "23", icon: FileText, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Pending", value: "8", icon: Clock, color: "text-orange-600", bgColor: "bg-orange-50" },
    { title: "Approved", value: "12", icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "Rejected", value: "3", icon: XCircle, color: "text-red-600", bgColor: "bg-red-50" },
  ];

  const handleSelectRequest = (id: number) => {
    setSelectedRequests(prev => 
      prev.includes(id) 
        ? prev.filter(requestId => requestId !== id)
        : [...prev, id]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing bulk action: ${action} for requests:`, selectedRequests);
    setSelectedRequests([]);
  };

  const filteredRequests = requests.filter(request => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return request.status === "Pending";
    if (activeTab === "approved") return request.status === "Approved";
    if (activeTab === "rejected") return request.status === "Rejected";
    return true;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Requests Management</h1>
          <p className="text-gray-600 mt-1">Review and manage attendance regularisation and permission requests</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Request
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="flex border-b">
            {[
              { id: "all", label: "All Requests", count: requests.length },
              { id: "pending", label: "Pending", count: requests.filter(r => r.status === "Pending").length },
              { id: "approved", label: "Approved", count: requests.filter(r => r.status === "Approved").length },
              { id: "rejected", label: "Rejected", count: requests.filter(r => r.status === "Rejected").length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search requests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Types</option>
              <option>Regularisation</option>
              <option>Permission</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Sales</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>HR</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Priority</option>
              <option>High</option>
              <option>Normal</option>
              <option>Low</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedRequests.length > 0 && (
        <Card className="border-0 shadow-sm bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-blue-900">
                  {selectedRequests.length} request(s) selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('approve')}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Bulk Approve
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('reject')}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Bulk Reject
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('comment')}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Add Comments
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedRequests([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requests Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Requests</span>
            <Badge variant="outline">{filteredRequests.length} requests</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedRequests.length === filteredRequests.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRequests(filteredRequests.map(req => req.id));
                      } else {
                        setSelectedRequests([]);
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-gray-50">
                  <TableCell>
                    <input 
                      type="checkbox" 
                      checked={selectedRequests.includes(request.id)}
                      onChange={() => handleSelectRequest(request.id)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">{request.avatar}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{request.employee}</div>
                        <div className="text-sm text-gray-500">{request.department}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        request.type === "Regularisation" 
                          ? "border-blue-200 text-blue-700 bg-blue-50"
                          : "border-purple-200 text-purple-700 bg-purple-50"
                      }
                    >
                      {request.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{request.date}</div>
                      <div className="text-sm text-gray-500">{request.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-600 truncate" title={request.reason}>
                        {request.reason}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        request.priority === "High" ? "border-red-200 text-red-700 bg-red-50" :
                        request.priority === "Normal" ? "border-yellow-200 text-yellow-700 bg-yellow-50" :
                        "border-gray-200 text-gray-700 bg-gray-50"
                      }
                    >
                      {request.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        request.status === "Approved" ? "bg-green-100 text-green-800" :
                        request.status === "Rejected" ? "bg-red-100 text-red-800" :
                        "bg-orange-100 text-orange-800"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm text-gray-600">{request.submittedOn}</div>
                      <div className="text-xs text-gray-500">by {request.approver}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {request.status === "Pending" && (
                        <>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => handleBulkAction('approve-all-pending')}>
              <UserCheck className="w-4 h-4 mr-2" />
              Approve All Pending
            </Button>
            <Button variant="outline" onClick={() => handleBulkAction('send-reminders')}>
              <Send className="w-4 h-4 mr-2" />
              Send Reminders
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <AlertCircle className="w-4 h-4 mr-2" />
              View Policies
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestsManagement;
