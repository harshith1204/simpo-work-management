
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
  Users, 
  Filter, 
  Download, 
  Search,
  Calendar,
  Clock,
  MoreHorizontal,
  Eye,
  MapPin,
  Wifi,
  Camera,
  Bell,
  UserCheck,
  UserX,
  Send
} from "lucide-react";
import TeamMemberActionModal from "@/components/attendance/TeamMemberActionModal";

const TeamAttendance = () => {
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const teamData = [
    {
      id: 1,
      name: "Priya Sharma",
      designation: "Senior Developer",
      department: "Engineering",
      checkIn: "09:15 AM",
      checkOut: "-",
      status: "Present",
      workingHours: "7h 23m",
      location: "Office",
      mode: "Mobile App",
      shift: "General (9 AM - 6 PM)",
      avatar: "PS"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      designation: "Product Manager",
      department: "Product",
      checkIn: "09:45 AM",
      checkOut: "-",
      status: "Late",
      workingHours: "6h 53m",
      location: "Office",
      mode: "Biometric",
      shift: "General (9 AM - 6 PM)",
      avatar: "RK"
    },
    {
      id: 3,
      name: "Anita Desai",
      designation: "UX Designer",
      department: "Design",
      checkIn: "10:00 AM",
      checkOut: "07:30 PM",
      status: "WFH",
      workingHours: "8h 30m",
      location: "Remote",
      mode: "Mobile App",
      shift: "Flexible",
      avatar: "AD"
    },
    {
      id: 4,
      name: "Vikram Singh",
      designation: "Sales Executive",
      department: "Sales",
      checkIn: "-",
      checkOut: "-",
      status: "On Leave",
      workingHours: "-",
      location: "-",
      mode: "-",
      shift: "General (9 AM - 6 PM)",
      avatar: "VS"
    },
    {
      id: 5,
      name: "Neha Patel",
      designation: "HR Manager",
      department: "HR",
      checkIn: "08:45 AM",
      checkOut: "06:15 PM",
      status: "Present",
      workingHours: "9h 30m",
      location: "Office",
      mode: "Biometric",
      shift: "Early (8:30 AM - 5:30 PM)",
      avatar: "NP"
    },
  ];

  const departmentSummary = [
    { name: "Engineering", present: 15, total: 18, late: 2, absent: 1 },
    { name: "Sales", present: 8, total: 12, late: 1, absent: 3 },
    { name: "Marketing", present: 6, total: 8, late: 0, absent: 2 },
    { name: "HR", present: 4, total: 5, late: 0, absent: 1 },
    { name: "Finance", present: 3, total: 4, late: 1, absent: 0 },
  ];

  const handleMemberAction = (employee: any) => {
    setSelectedEmployee(employee);
    setShowActionModal(true);
  };

  const handleSelectMember = (id: number) => {
    setSelectedMembers(prev => 
      prev.includes(id) 
        ? prev.filter(memberId => memberId !== id)
        : [...prev, id]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing bulk action: ${action} for members:`, selectedMembers);
    setSelectedMembers([]);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Attendance</h1>
          <p className="text-gray-600 mt-1">Monitor and manage team attendance across departments</p>
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
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Calendar View
          </Button>
        </div>
      </div>

      {/* Department Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {departmentSummary.map((dept, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Present</span>
                  <span className="font-medium text-green-600">{dept.present}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Late</span>
                  <span className="font-medium text-orange-600">{dept.late}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Absent</span>
                  <span className="font-medium text-red-600">{dept.absent}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Total</span>
                    <span>{dept.total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search employees..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>HR</option>
              <option>Finance</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Present</option>
              <option>Late</option>
              <option>Absent</option>
              <option>WFH</option>
              <option>On Leave</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Today</option>
              <option>Yesterday</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Custom Range</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedMembers.length > 0 && (
        <Card className="border-0 shadow-sm bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-blue-900">
                  {selectedMembers.length} member(s) selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('notify')}>
                  <Bell className="w-4 h-4 mr-2" />
                  Send Reminder
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('mark-present')}>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Mark Present
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('mark-absent')}>
                  <UserX className="w-4 h-4 mr-2" />
                  Mark Absent
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedMembers([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Attendance Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Team Members</span>
            <Badge variant="outline">{teamData.length} employees</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedMembers.length === teamData.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMembers(teamData.map(emp => emp.id));
                      } else {
                        setSelectedMembers([]);
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Working Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamData.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-gray-50">
                  <TableCell>
                    <input 
                      type="checkbox" 
                      checked={selectedMembers.includes(employee.id)}
                      onChange={() => handleSelectMember(employee.id)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">{employee.avatar}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.designation}</div>
                        <div className="text-xs text-gray-400">{employee.department}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{employee.checkIn}</div>
                    {employee.mode !== "-" && (
                      <div className="flex items-center space-x-1 mt-1">
                        {employee.mode === "Mobile App" ? 
                          <Camera className="w-3 h-3 text-gray-400" /> : 
                          <Wifi className="w-3 h-3 text-gray-400" />
                        }
                        <span className="text-xs text-gray-500">{employee.mode}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{employee.checkOut}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{employee.workingHours}</div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        employee.status === "Present" ? "bg-green-100 text-green-800" :
                        employee.status === "Late" ? "bg-orange-100 text-orange-800" :
                        employee.status === "WFH" ? "bg-blue-100 text-blue-800" :
                        employee.status === "On Leave" ? "bg-purple-100 text-purple-800" :
                        "bg-red-100 text-red-800"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{employee.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">{employee.shift}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleMemberAction(employee)}>
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
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
            <Button onClick={() => handleBulkAction('mark-attendance')}>
              <Clock className="w-4 h-4 mr-2" />
              Mark Attendance
            </Button>
            <Button variant="outline" onClick={() => handleBulkAction('bulk-notify')}>
              <Send className="w-4 h-4 mr-2" />
              Send Reminders
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Member Action Modal */}
      <TeamMemberActionModal 
        isOpen={showActionModal} 
        onClose={() => setShowActionModal(false)}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default TeamAttendance;
